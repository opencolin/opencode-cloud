---
title: Sessions
description: Understanding opencode.cloud sessions
---

# Sessions

A **session** is an isolated opencode instance running in a Contree sandbox.

## What is a Session?

Each session:
- Runs in its own **Contree MicroVM** (VM-level isolation)
- Has a **persistent filesystem**
- Can be **branched** into parallel exploration paths
- Can be **shared** with other users for collaboration
- Has a **web URL** for browser access

## Session Lifecycle

```
Created → Provisioning → Running → Idle → Destroyed
```

## Common Operations

### Create Session

```bash
curl -X POST https://api.opencode.cloud/api/sessions \
  -H 'Authorization: Bearer <token>' \
  -d '{"repoUrl": "https://github.com/user/project.git"}'
```

### List Sessions

```bash
curl https://api.opencode.cloud/api/sessions \
  -H 'Authorization: Bearer <token>'
```

### Destroy Session

```bash
curl -X DELETE https://api.opencode.cloud/api/sessions/{sessionId} \
  -H 'Authorization: Bearer <token>'
```

## Limits

| Limit | Value |
|-------|-------|
| Max sessions per user | 100 |
| Max idle time | 24 hours |
| Max filesystem | 100 GB |
| Max concurrent users | 10 |

## Costs

| Operation | Cost |
|-----------|------|
| Session creation | $0.10 |
| Per hour running | $0.50 |
| Per GB stored | $0.01/month |
