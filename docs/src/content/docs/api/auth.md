---
title: Authentication
description: Authenticate API requests with JWT or API keys
---

# Authentication

All API requests require authentication via either JWT tokens or API keys.

## Authentication Methods

### JWT Token

Use a JSON Web Token:

```bash
curl https://api.opencode.cloud/api/sessions \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

**Token Lifetime:** 24 hours

### API Key

Use an API key for server-to-server authentication:

```bash
curl https://api.opencode.cloud/api/sessions \
  -H 'Authorization: Bearer oc_live_abc123xyz789...'
```

**Key Format:** 
- Prefix: `oc_live_` (production) or `oc_test_` (testing)
- Length: 32 random characters

## Rate Limiting

All authenticated requests are rate-limited:

| Plan | Requests/minute | Concurrent Sessions |
|------|-----------------|-------------------|
| Free | 60 | 5 |
| Pro | 600 | 50 |
| Enterprise | Unlimited | 500+ |

## Best Practices

1. **Never commit API keys to version control**
   ```bash
   echo ".env" >> .gitignore
   ```

2. **Rotate keys regularly**
   - Create new key
   - Update applications
   - Delete old key

3. **Use environment-specific keys**
   - `oc_test_` for development
   - `oc_live_` for production

4. **Monitor key usage**
   - Check activity logs
   - Set up alerts for unusual patterns

## Error Responses

### 401 Unauthorized

```json
{
  "ok": false,
  "error": "invalid_token",
  "message": "Token signature is invalid or expired"
}
```

### 403 Forbidden

```json
{
  "ok": false,
  "error": "insufficient_permissions",
  "message": "Your API key does not have permission for this action"
}
```
