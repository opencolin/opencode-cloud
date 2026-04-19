---
title: Sessions
description: Understanding opencode.cloud sessions
---

# Sessions

A **session** is an isolated opencode instance running in a Contree sandbox.

## What is a Session?

```
Session = User's AI Coding Environment
├─ opencode server (running on port 3000)
├─ Real Linux filesystem
├─ Git repository
├─ Isolated from other users
└─ Persistent across disconnects
```

Each session:
- Runs in its own **Contree MicroVM** (VM-level isolation)
- Has a **persistent filesystem** (survives restarts)
- Can be **branched** into parallel exploration paths
- Can be **shared** with other users for collaboration
- Has a **web URL** for browser access

## Session Lifecycle

```
Created
  ↓
Provisioning (importing image, cloning repo, starting opencode)
  ↓
Running (ready for use)
  ↓
Idle → Auto-cleanup (after TTL)
  ↓
Destroyed (explicit user action or cleanup)
```

## Session State

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "user_abc123",
  "status": "running",
  "contreeInstanceId": "instance_xyz789",
  "snapshotId": "snapshot_latest",
  "createdAt": "2026-04-18T10:30:45.123Z",
  "updatedAt": "2026-04-18T10:45:30.456Z"
}
```

## Session Limits

| Limit | Value |
|-------|-------|
| Max open sessions per user | 100 |
| Max idle time before auto-cleanup | 24 hours |
| Max filesystem size | 100 GB |
| Max concurrent users per session | 10 |
| Max API calls per minute | 600 |

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

### Get Session Details

```bash
curl https://api.opencode.cloud/api/sessions/{sessionId} \
  -H 'Authorization: Bearer <token>'
```

### Destroy Session

```bash
curl -X DELETE https://api.opencode.cloud/api/sessions/{sessionId} \
  -H 'Authorization: Bearer <token>'
```

⚠️ This is permanent. The sandbox is deleted.

## Session Costs

| Operation | Cost |
|-----------|------|
| Session creation | $0.10 |
| Per hour running | $0.50 |
| Per GB stored | $0.01/month |
| Per collaborator | Free (up to 10) |

Billed only while running. Destroyed sessions don't cost anything.
