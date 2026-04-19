---
title: Quickstart
description: Get started with opencode.cloud in 5 minutes
---

# Quickstart

Get opencode.cloud running locally and test the API in 5 minutes.

## Prerequisites

- Node.js 18+ and pnpm
- Git
- Contree API key (for full functionality)

## 1. Clone the Repository

```bash
git clone https://github.com/opencolin/opencode-cloud.git
cd opencode-cloud
```

## 2. Install Dependencies

```bash
pnpm install
```

## 3. Start the Development Server

```bash
cd apps/worker
pnpm dev
```

You should see:

```
⛅️ wrangler 4.82.2
🔥 Rules enabled by environment
[wrangler] Listening on http://localhost:8787
```

## 4. Test the Health Endpoint

```bash
curl http://localhost:8787/api/health
```

Response:

```json
{
  "ok": true,
  "data": {
    "status": "healthy",
    "timestamp": "2026-04-18T10:30:45.123Z"
  }
}
```

✅ **You're running!**

## 5. Create a Session

All routes require authentication. For demo:

```bash
curl -X POST http://localhost:8787/api/sessions \
  -H 'Authorization: Bearer demo_token' \
  -H 'Content-Type: application/json' \
  -d '{
    "repoUrl": "https://github.com/opencode-ai/opencode.git"
  }'
```

Response (when Contree is configured):

```json
{
  "ok": true,
  "data": {
    "session": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "status": "provisioning",
      "webUrl": "https://opencode.cloud/s/550e8400-e29b-41d4-a716-446655440000"
    }
  }
}
```

## 6. List Sessions

```bash
curl http://localhost:8787/api/sessions \
  -H 'Authorization: Bearer demo_token'
```

## 7. Create a Snapshot

```bash
curl -X POST http://localhost:8787/api/sessions/:id/snapshot \
  -H 'Authorization: Bearer demo_token'
```

## 8. Branch from Snapshot

```bash
curl -X POST http://localhost:8787/api/sessions/:id/branch \
  -H 'Authorization: Bearer demo_token' \
  -H 'Content-Type: application/json' \
  -d '{
    "snapshotId": "snapshot_xyz789",
    "name": "experiment-1"
  }'
```

## Troubleshooting

### Port Already in Use

```bash
lsof -i :8787
kill -9 <PID>
```

### TypeScript Errors

```bash
pnpm turbo check
```

### Build Failures

```bash
pnpm install
pnpm turbo build
```

## What's Next

- **[Architecture](/architecture)** — Understand the system design
- **[Sessions](/concepts/sessions)** — Learn about session lifecycle
- **[Branching](/concepts/branching)** — Master the branching system
- **[Contree Setup](/guides/contree-setup)** — Configure Contree integration
