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

## Getting Started

- **[Quickstart](/quickstart)** — Get up and running in 5 minutes
- **[Architecture](/architecture)** — Understand how it works
- **[Sessions](/concepts/sessions)** — Learn about sessions

## Key Concepts

### Sessions
An isolated coding environment running in a Contree sandbox with real Linux filesystem and git support.

### Branching
Git-like checkpointing system. Create snapshots, branch from them to explore different approaches, rollback instantly if needed.

### Collaboration
Real-time multi-user editing powered by Yjs CRDT. Multiple users edit simultaneously with automatic conflict resolution.

## Use Cases

**Pair Programming** — Two developers editing simultaneously with instant conflict resolution.

**AI-Assisted Development** — opencode analyzes your codebase and suggests changes. Accept, modify, or rollback seamlessly.

**Code Review Live** — Author and reviewer collaborate in real-time. Suggest edits and compare approaches instantly.

**Teaching** — Instructor shares a session with students. Everyone sees code being written. Instructor can rollback if needed.

## Architecture Overview

```
User Browser
    ↓
Cloudflare Workers (API)
    ↓
Contree MicroVMs (Sandboxes)
    ↓
Real Linux + opencode server
```

---

**Next:** [Quickstart](/quickstart)
