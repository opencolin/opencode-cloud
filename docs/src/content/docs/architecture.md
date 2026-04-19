---
title: Architecture  
description: Deep dive into opencode.cloud
---

# Architecture

opencode.cloud is built on three core layers.

## Control Plane (Cloudflare Workers)

Routes requests, manages auth, orchestrates Contree, persists session state.

- **Auth Middleware** — JWT/API key validation
- **Session Routes** — CRUD operations
- **Branching Routes** — Snapshot/branch/rollback
- **Proxy Routes** — HTTP/WebSocket forwarding

## Compute Layer (Contree Sandboxes)

Isolated opencode instances with real Linux filesystem.

Each session gets its own MicroVM with:
- Real Linux filesystem
- opencode server (port 3000)
- Git, npm, Python, shell
- Full root permissions

## Collaboration Layer (Yjs CRDT)

Conflict-free document sync across multiple users.

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

## Storage

- **KV** — Session metadata
- **D1** — User accounts, API keys, metrics
- **R2** — File storage, backups

## Request Flow

1. Client sends request to Worker
2. Auth middleware validates token
3. Handler processes request
4. Worker calls Contree API if needed
5. Response returned to client
