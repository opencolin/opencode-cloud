---
title: Branching API
description: Create snapshots, branches, and manage exploration history
---

# Branching API

Use snapshots and branches to explore multiple approaches safely.

## Create Snapshot

`POST /api/sessions/:id/snapshot`

### Request

```bash
curl -X POST https://api.opencode.cloud/api/sessions/session_123/snapshot \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Before refactoring auth"
  }'
```

### Response (201)

```json
{
  "ok": true,
  "data": {
    "id": "snapshot_abc123",
    "sessionId": "session_123",
    "description": "Before refactoring auth",
    "createdAt": "2026-04-18T10:30:45.123Z"
  }
}
```

## Create Branch

`POST /api/sessions/:id/branch`

### Request

```bash
curl -X POST https://api.opencode.cloud/api/sessions/session_123/branch \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "snapshotId": "snapshot_abc123",
    "name": "try-approach-a"
  }'
```

### Response (201)

```json
{
  "ok": true,
  "data": {
    "id": "branch_xyz789",
    "name": "try-approach-a",
    "parentSnapshotId": "snapshot_abc123",
    "createdAt": "2026-04-18T10:30:45.123Z"
  }
}
```

## Rollback to Snapshot

`POST /api/sessions/:id/rollback`

### Request

```bash
curl -X POST https://api.opencode.cloud/api/sessions/session_123/rollback \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "snapshotId": "snapshot_abc123"
  }'
```

### Response (200)

```json
{
  "ok": true,
  "data": {
    "snapshotId": "snapshot_abc123",
    "rolledBackAt": "2026-04-18T10:35:20.456Z"
  }
}
```

⚠️ Rollback is permanent. All changes after the snapshot are discarded.

## View Branch Tree

`GET /api/sessions/:id/branches`

### Request

```bash
curl https://api.opencode.cloud/api/sessions/session_123/branches \
  -H 'Authorization: Bearer <token>'
```

### Response (200)

```json
{
  "ok": true,
  "data": [
    {
      "snapshotId": "snapshot_1",
      "parentSnapshotId": null,
      "createdAt": "2026-04-18T10:00:00.000Z",
      "children": [
        {
          "snapshotId": "snapshot_2",
          "parentSnapshotId": "snapshot_1",
          "children": []
        }
      ]
    }
  ]
}
```

## Limits

| Limit | Value |
|-------|-------|
| Max snapshots per session | 1000 |
| Max branch depth | Unlimited |
| Snapshots retained | 7 days or 1000 snapshots |
| Time to snapshot | < 5 seconds |
| Time to rollback | < 2 seconds |
