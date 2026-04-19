---
title: Architecture
description: Deep dive into opencode.cloud's architecture
---

# Architecture

opencode.cloud is built on three core layers:

## Control Plane (Cloudflare Workers)

**Responsibility:** Route requests, manage authentication, orchestrate Contree, persist session state

```
HTTP Request
    ↓
[Auth Middleware] — JWT/API key validation
    ↓
[Router] — Route to handler
    ↓
[Handler] — Business logic (CRUD, branching)
    ↓
[KV Store] — Session persistence
    ↓
[Contree Client] — API calls to sandboxes
```

### Key Components

- **Auth Middleware** — JWT verification via `jose`
- **Session Routes** — POST/GET/DELETE sessions
- **Branching Routes** — snapshot/branch/rollback operations
- **Proxy Routes** — HTTP/WebSocket proxying
- **Session Provisioner** — Contree orchestration

## Compute Layer (Contree Sandboxes)

**Responsibility:** Run isolated opencode instances with mutable filesystem state

Each session gets its own MicroVM:

```
┌──────────────────────────────┐
│ Contree MicroVM              │
├──────────────────────────────┤
│ • opencode server (port 3000)│
│ • Real Linux filesystem      │
│ • Git, npm, Python, etc.     │
│ • Network access             │
│ • Full root permissions      │
└──────────────────────────────┘
```

### Why Contree?

- **Real Linux** — opencode needs native tools
- **Immutable snapshots** — Perfect for branching
- **VM-level isolation** — Stronger than containers
- **No infrastructure** — Contree handles scaling

## Collaboration Layer (Yjs CRDT)

**Responsibility:** Sync document edits across multiple users without conflicts

```
User A edits line 5        User B edits line 10
    ↓                           ↓
  Yjs Update A            Yjs Update B
    ↓                           ↓
    └──────────────────────────┘
            CRDT Merge
              ↓
        Conflict-free result
```

### Why Yjs?

- **CRDT** — Merges without coordination
- **Offline-first** — Syncs when reconnecting
- **Minimal bandwidth** — Only changes sent
- **Proven** — Used by Figma, Notion, others

## Storage Layers

### KV (Session Store)

Fast distributed key-value store:

```
Keys:
  session:{id}           → Session object
  user-sessions:{userId} → List of session IDs
  snapshot:{id}          → Snapshot metadata
```

### D1 (SQLite Database)

Relational database for:
- User accounts
- API keys
- Usage metrics
- Billing data

### R2 (Object Storage)

Large file storage for exports and backups.

## Request Flow: Example

### Create Session with Repo

```
1. POST /api/sessions with repoUrl
2. Auth middleware validates JWT
3. Generate session ID
4. Create session record in KV
5. provisionSession():
   ├─ Contree: import opencode base image
   ├─ Contree: git clone repo
   ├─ Contree: run opencode serve
   └─ Return sandbox URL
6. Return web URL to user
```

### User Makes Edit

```
1. User edits file in opencode web UI
2. WebSocket message to /s/session-id/collab
3. Yjs update message
4. Broadcast to other users
5. Other users' browsers apply update (CRDT merge)
6. UI reflects change (no conflicts)
```

## Scaling

| Component | Bottleneck | Solution |
|-----------|-----------|----------|
| Workers | CPU/memory | Auto-scales |
| KV | Eventually consistent | Polling for critical data |
| Contree | Sandbox creation | Pre-warmed images |

## Security

### Defense in Depth

1. **Auth** — JWT + API key before any action
2. **Isolation** — Each user's sessions in separate KV keys
3. **Sandboxing** — Contree's VM-level isolation
4. **Rate limiting** — Throttles per user
5. **Encryption** — HTTPS for all traffic
6. **Audit** — Immutable snapshots log changes

## Deployment

### Development

```bash
cd apps/worker
pnpm dev
```

### Production

```bash
cd apps/worker
pnpm deploy
```

Requires Cloudflare account with KV/D1 namespaces configured.
