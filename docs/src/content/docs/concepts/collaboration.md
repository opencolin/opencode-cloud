---
title: Collaboration
description: Real-time collaboration with multiple users
---

# Collaboration

**Collaboration** lets multiple users edit the same files in a session simultaneously without conflicts.

## How It Works

opencode.cloud uses **Yjs** — a CRDT (Conflict-free Replicated Data Type) that automatically merges concurrent edits:

```
User A edits line 5        User B edits line 10
    ↓                           ↓
  Yjs Update A            Yjs Update B
    ↓                           ↓
    └──────────────────────────┘
            CRDT Merge
              ↓
        Conflict-free result
            ↓
    Both users see the same state
```

No manual merge required. No conflicts. No "yours vs. theirs" resolution.

## Real-Time Features

### See Collaborators' Cursors

```
User A's cursor:  ▌ (red)
User B's cursor:  ▌ (blue)

document.js
  1 | function main() {
  2 |   const x = 5;  ▌ User A
  3 |   return x * 2; ▌ User B
  4 | }
```

You see each collaborator's cursor position and selection in real-time.

### View Presence

```bash
curl https://api.opencode.cloud/api/sessions/{sessionId}/presence \
  -H 'Authorization: Bearer <token>'
```

Response:

```json
{
  "ok": true,
  "data": {
    "clients": [
      {
        "userId": "user_123",
        "userName": "Alice",
        "cursorLine": 5,
        "cursorColumn": 12,
        "color": "#FF0000",
        "lastSeen": "2026-04-18T10:35:20.456Z"
      }
    ]
  }
}
```

### Chat in Session

```bash
curl -X POST https://api.opencode.cloud/api/sessions/{sessionId}/chat \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"message": "Try using async/await here"}'
```

Messages appear in the chat panel for all collaborators.

## Conflict Resolution (Automatic)

### Example: Concurrent Edits

```
Initial state:
  function add(a, b) { return a + b; }

User A edits:
  function add(a, b) { return a + b + 0; }

User B edits:
  function add(a, b) { // Add two numbers
    return a + b;
  }

Yjs CRDT Result:
  function add(a, b) { // Add two numbers
    return a + b + 0;
  }  ← Both changes merged!
```

Both edits are preserved. No conflicts. Both users see the same result.

## Why CRDT Works

- **Position-independent** — Changes tracked by content, not line numbers
- **Commutative** — Order doesn't matter (A+B = B+A)
- **Idempotent** — Applying same change twice has no effect
- **Atomic** — Each keystroke is its own unit

## Collaboration Limits

| Limit | Value |
|-------|-------|
| Max concurrent users per session | 10 |
| Max chat history | 1000 messages |
| Cursor update frequency | 100ms |
| Sync latency p95 | <200ms |

## Use Cases

### Pair Programming

```
Developer A: Writing implementation
Developer B: Writing tests simultaneously
  ↓
Changes merge automatically
Both see full picture
```

### Code Review Live

```
Author: Explaining changes
Reviewer: Suggesting edits
  ↓
Live discussion
CRDT merges suggestions
```

### Teaching

```
Instructor: Running opencode
Students: Joining session
  ↓
Everyone sees code being written
Instructor can revert if needed
```

## Best Practices

1. **Communicate**
   - Before large refactorings, let collaborators know
   - Use chat to coordinate on shared files

2. **Use Version Control**
   - Collaborate in opencode.cloud
   - Commit to Git when stable
   - Merge in GitHub (human review)

3. **Create Snapshots Before Major Changes**
   - Consensus on approach first
   - Snapshot as a reference point
   - Each user can branch to try ideas
   - Come back to main snapshot to sync
