---
title: Deployment
description: Deploy opencode.cloud to production
---

# Deployment

Deploy opencode.cloud to Cloudflare Workers and production Contree.

## Prerequisites

- Cloudflare account
- Wrangler CLI (`npm install -g wrangler`)
- Contree API key
- KV and D1 namespaces configured

## 1. Login to Cloudflare

```bash
wrangler login
```

## 2. Create KV Namespaces

```bash
wrangler kv:namespace create "opencode-cloud-kv"
wrangler kv:namespace create "opencode-cloud-kv" --preview
```

## 3. Set Secrets

```bash
wrangler secret put CONTREE_API_KEY
# Paste your production key when prompted
```

## 4. Deploy

```bash
cd apps/worker
wrangler deploy
```

You should see: `Uploaded opencode-cloud-worker`

## 5. Verify

```bash
curl https://opencode-cloud-worker.workers.dev/api/health
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

## 6. Custom Domain

Configure in Cloudflare dashboard.

## Troubleshooting

**KV namespace not found** — Update `wrangler.toml` with correct IDs

**Secret not set** — Re-run `wrangler secret put CONTREE_API_KEY`

**Deploy timeout** — Check internet and retry
