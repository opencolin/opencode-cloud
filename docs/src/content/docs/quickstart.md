---
title: Quickstart
description: Get started with opencode.cloud in 5 minutes
---

# Quickstart

Get opencode.cloud running in 5 minutes.

## Prerequisites

- Node.js 18+, pnpm
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

## 3. Start Development Server

```bash
cd apps/worker
pnpm dev
```

You should see: `[wrangler] Listening on http://localhost:8787`

## 4. Test Health Endpoint

```bash
curl http://localhost:8787/api/health
```

Response:

```json
{
  "ok": true,
  "data": {
    "status": "healthy",
    "timestamp": "2026-04-19T10:30:45.123Z"
  }
}
```

✅ **You're running!**

## 5. Create a Session

```bash
curl -X POST http://localhost:8787/api/sessions \
  -H 'Authorization: Bearer demo_token' \
  -H 'Content-Type: application/json' \
  -d '{
    "repoUrl": "https://github.com/opencode-ai/opencode.git"
  }'
```

## Next Steps

- **[Architecture](/architecture)** — Understand the system
- **[Sessions](/concepts/sessions)** — Learn about sessions
- **[Branching](/concepts/branching)** — Master branching
- **[Contree Setup](/guides/contree-setup)** — Configure Contree
