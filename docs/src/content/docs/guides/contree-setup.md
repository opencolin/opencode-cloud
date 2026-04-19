---
title: Contree Setup
description: Configure Contree integration
---

# Contree Setup

Configure Contree for your development environment.

## Get Your API Key

1. Sign up at [https://contree.co](https://contree.co)
2. Go to **Settings → API Keys**
3. Create a new key
4. Copy immediately (you won't see it again)

Format: `contree_live_...` or `contree_test_...`

## Configure Environment

Create `.dev.vars` in `apps/worker/`:

```bash
cd apps/worker
echo "CONTREE_API_KEY=contree_live_your_key_here" > .dev.vars
echo "CONTREE_BASE_URL=https://api.contree.co" >> .dev.vars
```

**Do NOT commit `.dev.vars`**

## Build Base Image

```bash
docker build -f Dockerfile.base -t opencode-cloud-base:latest .
docker tag opencode-cloud-base:latest \
  docker.io/opencolin/opencode-cloud-base:latest
docker push docker.io/opencolin/opencode-cloud-base:latest
```

## Test

```bash
cd apps/worker
pnpm dev
```

Then:

```bash
curl http://localhost:8787/api/health
```

## Performance

Session creation typically takes:

- Import image: 10-30s (first time only)
- Clone repo: 5-15s
- Start opencode: 2-5s
- **Total: ~30-50s**
