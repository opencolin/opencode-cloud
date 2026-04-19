---
title: Branching API
description: Snapshot and branching endpoints
---

# Branching API

Explore multiple approaches safely.

## Create Snapshot

`POST /api/sessions/:id/snapshot`

```bash
curl -X POST https://api.opencode.cloud/api/sessions/{id}/snapshot \
  -H 'Authorization: Bearer <token>' \
  -d '{"description": "Before refactoring"}'
```

## Create Branch

`POST /api/sessions/:id/branch`

```bash
curl -X POST https://api.opencode.cloud/api/sessions/{id}/branch \
  -H 'Authorization: Bearer <token>' \
  -d '{
    "snapshotId": "snapshot_123",
    "name": "try-approach-a"
  }'
```

## Rollback

`POST /api/sessions/:id/rollback`

```bash
curl -X POST https://api.opencode.cloud/api/sessions/{id}/rollback \
  -H 'Authorization: Bearer <token>' \
  -d '{"snapshotId": "snapshot_123"}'
```

## View Branch Tree

`GET /api/sessions/:id/branches`

```bash
curl https://api.opencode.cloud/api/sessions/{id}/branches \
  -H 'Authorization: Bearer <token>'
```

Returns: Tree of snapshots and branches
