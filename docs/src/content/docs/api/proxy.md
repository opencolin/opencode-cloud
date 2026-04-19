---
title: Proxy API
description: Forward HTTP requests and WebSocket connections to your sandbox
---

# Proxy API

Access your opencode sandbox through the proxy endpoint.

## HTTP Proxy

`GET/POST/PUT/DELETE /s/:sessionId/*`

Forward HTTP requests to the opencode server running in your sandbox.

### Examples

#### Get File Contents

```bash
curl https://opencode.cloud/s/session_123/api/files/src/main.ts \
  -H 'Authorization: Bearer <token>'
```

#### List Files

```bash
curl https://opencode.cloud/s/session_123/api/files \
  -H 'Authorization: Bearer <token>'
```

#### Edit File

```bash
curl -X PUT https://opencode.cloud/s/session_123/api/files/src/main.ts \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"content": "new content"}'
```

#### Run Command

```bash
curl -X POST https://opencode.cloud/s/session_123/api/exec \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"command": "npm test"}'
```

## WebSocket Proxy

`GET /s/:sessionId/ws` (upgrade to WebSocket)

Open a WebSocket connection to the sandbox for real-time communication.

### Connect

```javascript
const ws = new WebSocket(
  'wss://opencode.cloud/s/session_123/ws?token=<token>'
);

ws.onmessage = (event) => {
  console.log('Message from sandbox:', event.data);
};
```

## Authentication

All proxy requests require the same authentication as the main API.

## Latency

The proxy adds minimal latency:

| Component | Latency |
|-----------|---------|
| Client → Proxy | <50ms |
| Proxy → Sandbox | <50ms |
| Total (p95) | **<200ms** |
