---
title: Contree Setup
description: Configure Contree integration for your development environment
---

# Contree Setup

Configure your environment to use Contree sandboxes.

## Prerequisites

- Node.js 18+ and pnpm
- Contree account and API key
- Git

## Get Your Contree API Key

1. Sign up at [https://contree.co](https://contree.co)
2. Navigate to **Settings → API Keys**
3. Create a new API key
4. Copy the key immediately (you won't see it again)

**Format:** `contree_live_...` (production) or `contree_test_...` (development)

## Configure Environment Variables

### Development (Local)

Create `.dev.vars` in `apps/worker/`:

```bash
cd apps/worker
cat > .dev.vars << EOF
CONTREE_API_KEY=contree_live_your_key_here
CONTREE_BASE_URL=https://api.contree.co
EOF
```

**Do NOT commit `.dev.vars` to git.**

## Base Image Setup

The `opencode-cloud-base` image is the starting point for all sessions.

### Build Locally

```bash
# Build the base image
docker build -f Dockerfile.base -t opencode-cloud-base:latest .

# Tag for Docker Hub
docker tag opencode-cloud-base:latest \
  docker.io/opencolin/opencode-cloud-base:latest

# Push (requires Docker Hub account)
docker push docker.io/opencolin/opencode-cloud-base:latest
```

## Test the Integration

### Start Dev Server

```bash
cd apps/worker
pnpm dev
```

### Create a Test Session

```bash
curl -X POST http://localhost:8787/api/sessions \
  -H 'Authorization: Bearer demo_token' \
  -d '{}'
```

### Monitor Status

```bash
curl http://localhost:8787/api/sessions/session_id \
  -H 'Authorization: Bearer demo_token'
```

## Troubleshooting

### "CONTREE_API_KEY not found"

```bash
echo "CONTREE_API_KEY=your_key" > apps/worker/.dev.vars
cd apps/worker
pnpm dev
```

### "Invalid API key"

- Verify the key is correct
- Check it hasn't expired
- Create a new key in Contree dashboard

### "Image not found"

1. Build and push the base image
2. Wait a few minutes for registry to sync
3. Retry session creation

## Performance Tuning

Contree session creation typically takes:

| Phase | Time |
|-------|------|
| Import base image | 10-30s (first time) |
| Clone repository | 5-15s (depends on size) |
| Start opencode | 2-5s |
| **Total** | **~30-50s** |

**To optimize:**

1. Cache base image (only imported once)
2. Use smaller repos
3. Pre-create warm instances
