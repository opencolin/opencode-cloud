---
title: Proxy API
description: HTTP and WebSocket proxy to sandbox
---

# Proxy API

Access your sandbox through the proxy endpoint.

## HTTP Proxy

`GET/POST/PUT/DELETE /s/:sessionId/*`

Forward requests to the opencode server in your sandbox.

### Examples

Get file:

```bash
curl https://opencode.cloud/s/{sessionId}/api/files/src/main.ts \
  -H 'Authorization: Bearer <token>'
```

Edit file:

```bash
curl -X PUT https://opencode.cloud/s/{sessionId}/api/files/src/main.ts \
  -H 'Authorization: Bearer <token>' \
  -d '{"content": "new content"}'
```

Run command:

```bash
curl -X POST https://opencode.cloud/s/{sessionId}/api/exec \
  -H 'Authorization: Bearer <token>' \
  -d '{"command": "npm test"}'
```

## WebSocket Proxy

`GET /s/:sessionId/ws` (upgrade)

```javascript
const ws = new WebSocket(
  'wss://opencode.cloud/s/{sessionId}/ws?token=<token>'
);
```

## Latency

| Component | Latency |
|-----------|---------|
| Client → Proxy | <50ms |
| Proxy → Sandbox | <50ms |
| **Total** | **<200ms** |
