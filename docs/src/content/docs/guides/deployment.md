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

## 1. Configure Wrangler

```bash
wrangler login
```

## 2. Create KV Namespaces

```bash
wrangler kv:namespace create "dockingstation-cloud-kv"
wrangler kv:namespace create "dockingstation-cloud-kv" --preview
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

You should see:

```
Uploaded dockingstation-cloud-worker
```

## 5. Verify Deployment

```bash
curl https://dockingstation-cloud-worker.workers.dev/api/health
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

```bash
wrangler publish --compatibility-date 2024-04-12
```

Then configure your domain in Cloudflare dashboard.

## Environment Variables

Configure per environment in `wrangler.toml`:

```toml
[env.production]
vars = { ENVIRONMENT = "production" }
```

## Monitoring

### Check Logs

```bash
wrangler tail
```

### Monitor Usage

Check Cloudflare Workers Analytics in dashboard.

## Rollback

If deployment fails:

```bash
wrangler rollback
```

## Troubleshooting

### "KV namespace not found"

Update `wrangler.toml` with correct namespace IDs.

### "Secret not set"

Re-run: `wrangler secret put CONTREE_API_KEY`

### "Deploy timeout"

Check internet connection and try again.
