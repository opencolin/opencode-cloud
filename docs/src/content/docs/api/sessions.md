---
title: Sessions API
description: Session CRUD endpoints
---

# Sessions API

Manage your coding environments programmatically.

## Create Session

`POST /api/sessions`

```bash
curl -X POST https://api.opencode.cloud/api/sessions \
  -H 'Authorization: Bearer <token>' \
  -d '{"repoUrl": "https://github.com/user/project.git"}'
```

Response (201):

```json
{
  "ok": true,
  "data": {
    "session": { "id": "...", "status": "provisioning" },
    "webUrl": "https://opencode.cloud/s/..."
  }
}
```

## List Sessions

`GET /api/sessions`

```bash
curl https://api.opencode.cloud/api/sessions \
  -H 'Authorization: Bearer <token>'
```

## Get Session

`GET /api/sessions/:id`

## Destroy Session

`DELETE /api/sessions/:id`

⚠️ This is permanent.

## Status Values

| Status | Meaning |
|--------|---------|
| provisioning | Starting up |
| running | Ready to use |
| paused | Idle |
| destroyed | Deleted |
