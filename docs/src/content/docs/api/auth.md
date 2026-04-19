---
title: Authentication
description: Authenticate API requests
---

# Authentication

All API requests require authentication via JWT tokens or API keys.

## JWT Token

```bash
curl https://api.opencode.cloud/api/sessions \
  -H 'Authorization: Bearer eyJhbGc...'
```

**Lifetime:** 24 hours

## API Key

```bash
curl https://api.opencode.cloud/api/sessions \
  -H 'Authorization: Bearer oc_live_abc123...'
```

**Format:** `oc_live_...` (production) or `oc_test_...` (testing)

## Rate Limiting

| Plan | Requests/min | Concurrent |
|------|-------------|-----------|
| Free | 60 | 5 |
| Pro | 600 | 50 |
| Enterprise | Unlimited | 500+ |

## Best Practices

1. Never commit API keys to version control
2. Rotate keys regularly
3. Use environment-specific keys
4. Monitor key usage

## Errors

**401 Unauthorized** — Invalid or missing token

**403 Forbidden** — Insufficient permissions
