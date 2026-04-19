---
title: Introduction
description: Welcome to opencode.cloud
---

# opencode.cloud

**Host isolated AI coding environments in the cloud with branching and collaboration.**

opencode.cloud lets teams spin up personal coding sessions instantly—each with a real Linux environment, full git support, and instant branching. No local installation. No infrastructure management. No conflicts.

## Features

✅ **Instant Sessions** — Create a coding environment in <30 seconds  
✅ **Real Linux** — Full filesystem, git, npm, Python, shell  
✅ **Branching** — Fork your work and explore multiple approaches  
✅ **Collaboration** — Real-time editing with conflict-free CRDT sync  
✅ **Snapshots** — Immutable checkpoints for safe rollback  
✅ **Zero Setup** — Access from browser, nothing to install  

## How It Works

```
┌─────────────────┐
│ Your Browser    │
│ opencode.cloud  │
└────────┬────────┘
         │
    HTTP/WebSocket
         │
┌────────v─────────────────┐
│ Cloudflare Workers API   │
│ • Session CRUD           │
│ • Branching Logic        │
│ • WebSocket Proxy        │
└────────┬─────────────────┘
         │
      Contree API
         │
┌────────v──────────────────┐
│ Contree MicroVM           │
│ • Real Linux filesystem   │
│ • opencode server         │
│ • Git repo                │
│ • Your code               │
└───────────────────────────┘
```

## Three Core Concepts

### Sessions
An isolated coding environment running in a Contree sandbox. Each session has:
- Real Linux filesystem
- Git repository (optional)
- Full network access
- 2-32 vCPU + 2-128 GB RAM (configurable)

**Access:** `https://opencode.cloud/s/{sessionId}`

### Branching
Git-like checkpointing system using Contree's immutable snapshots:
- Create a snapshot before risky changes
- Branch from it to explore different approaches
- Rollback instantly if needed
- Compare outcomes and keep the best

### Collaboration
Real-time multi-user editing powered by Yjs CRDT:
- Multiple users edit the same files simultaneously
- No merge conflicts (Yjs handles it automatically)
- See collaborators' cursors in real-time
- Chat panel for discussion

## Use Cases

### Pair Programming
Two developers editing the same codebase simultaneously with instant conflict resolution.

### AI-Assisted Development
opencode analyzes your codebase and suggests changes. Accept, modify, or rollback with zero friction.

### Code Review Live
Author and reviewer collaborate in real-time. Reviewer suggests edits, author implements and compares approaches instantly.

### Teaching
Instructor shares a session with students. Everyone sees code being written. Instructor can rollback if needed.

### Multi-Approach Exploration
Try approach A in branch 1, approach B in branch 2, approach C in branch 3. Compare results and keep the best.

## Architecture

**Three Layers:**

1. **Control Plane** (Cloudflare Workers)
   - Routes requests globally
   - Manages authentication
   - Orchestrates Contree
   - Stores session metadata in KV

2. **Compute Layer** (Contree MicroVMs)
   - Real Linux environment per session
   - Immutable snapshots for branching
   - VM-level isolation
   - Global data centers

3. **Collaboration Layer** (Yjs CRDT)
   - Conflict-free document sync
   - Cursor presence tracking
   - Chat channel per session
   - Works offline + reconnects

## Getting Started

### Create a Session

```bash
curl -X POST https://api.opencode.cloud/api/sessions \
  -H 'Authorization: Bearer <your_token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "repoUrl": "https://github.com/user/project.git"
  }'
```

### Visit in Browser

```
https://opencode.cloud/s/{sessionId}
```

### Start Coding

opencode loads the web UI. Edit files, run commands, collaborate—all in the browser.

## Next Steps

- **[Quickstart](/quickstart)** — Get up and running in 5 minutes
- **[Architecture](/architecture)** — Deep dive into how it works
- **[Sessions](/concepts/sessions)** — Understand session lifecycle
- **[Branching](/concepts/branching)** — Explore multiple approaches safely
- **[Collaboration](/concepts/collaboration)** — Real-time multi-user editing

---

**Questions?** Open an issue on [GitHub](https://github.com/opencolin/opencode-cloud) or [read the docs](/api/auth).
