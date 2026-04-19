---
title: Sessions API
description: Create, list, and manage sessions
---

# Sessions API

Manage your isolated coding environments programmatically.

## Create Session

`POST /api/sessions`

### Request

```bash
curl -X POST https://api.opencode.cloud/api/sessions \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "repoUrl": "https://github.com/user/project.git"
  }'
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `repoUrl` | string | No | Git repository URL to clone |
| `name` | string | No | Friendly name for the session |

### Response (201)

```json
{
  "ok": true,
  "data": {
    "session": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "userId": "user_123",
      "status": "provisioning",
      "createdAt": "2026-04-18T10:30:45.123Z"
    },
    "webUrl": "https://opencode.cloud/s/550e8400-e29b-41d4-a716-446655440000"
  }
}
```

## List Sessions

`GET /api/sessions`

### Request

```bash
curl https://api.opencode.cloud/api/sessions \
  -H 'Authorization: Bearer <token>'
```

### Response (200)

```json
{
  "ok": true,
  "data": [
    {
      "id": "session_1",
      "status": "running",
      "createdAt": "2026-04-18T10:00:00.000Z"
    }
  ]
}
```

## Get Session

`GET /api/sessions/:id`

### Request

```bash
curl https://api.opencode.cloud/api/sessions/550e8400-e29b-41d4-a716-446655440000 \
  -H 'Authorization: Bearer <token>'
```

### Status Values

| Status | Meaning |
|--------|---------|
| `provisioning` | Session is starting (1-2 minutes) |
| `running` | Ready to use |
| `paused` | Session paused (idle cleanup) |
| `destroyed` | Session deleted |

## Destroy Session

`DELETE /api/sessions/:id`

### Request

```bash
curl -X DELETE https://api.opencode.cloud/api/sessions/550e8400-e29b-41d4-a716-446655440000 \
  -H 'Authorization: Bearer <token>'
```

⚠️ This is permanent.

## Session Costs

| Operation | Cost |
|-----------|------|
| Session creation | $0.10 |
| Per hour running | $0.50 |
| Per GB stored | $0.01/month |
