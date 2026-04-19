---
title: Branching
description: Explore multiple approaches with branching
---

# Branching

**Branching** lets you checkpoint your progress and explore multiple approaches in parallel.

## Why Branching?

- **Explore safely** — No fear of losing progress
- **Try multiple strategies** — Run them in parallel
- **Compare outcomes** — Keep the best result
- **Understand failures** — Rollback and see what went wrong

## Core Operations

### Create Snapshot

```bash
curl -X POST https://api.opencode.cloud/api/sessions/{sessionId}/snapshot \
  -H 'Authorization: Bearer <token>'
```

### Create Branch

```bash
curl -X POST https://api.opencode.cloud/api/sessions/{sessionId}/branch \
  -H 'Authorization: Bearer <token>' \
  -d '{"snapshotId": "snapshot_123", "name": "try-approach-a"}'
```

### Rollback

```bash
curl -X POST https://api.opencode.cloud/api/sessions/{sessionId}/rollback \
  -H 'Authorization: Bearer <token>' \
  -d '{"snapshotId": "snapshot_123"}'
```

⚠️ Rollback is permanent.

## Limits

| Limit | Value |
|-------|-------|
| Max snapshots | 1000 |
| Max branch depth | Unlimited |
| Retention | 7 days |
| Snapshot time | < 5s |
| Rollback time | < 2s |
