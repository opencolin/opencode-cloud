---
title: Branching
description: Explore multiple approaches with branching execution
---

# Branching

**Branching** lets you checkpoint your progress and explore multiple approaches in parallel. It's like Git for your coding session.

## Why Branching?

Branching lets you:
- **Explore safely** — No fear of losing progress
- **Try multiple strategies** — Run them in parallel
- **Compare outcomes** — Keep the best result
- **Understand failures** — Rollback and see what went wrong

## How It Works

Every session has a **branch tree**:

```
Snapshot 1 (initial state)
    ↓
Snapshot 2 (after first edit)
    ├─ Snapshot 3 (main branch, current)
    │   ↓
    │ Snapshot 4 (after AI suggestion)
    │
    └─ Snapshot 2b (experimental branch)
        ↓
      Snapshot 2b-1 (first attempt)
```

Each snapshot is **immutable** and can be restored instantly.

## Core Operations

### Create a Snapshot

```bash
curl -X POST https://api.opencode.cloud/api/sessions/{sessionId}/snapshot \
  -H 'Authorization: Bearer <token>'
```

Response:

```json
{
  "ok": true,
  "data": {
    "snapshotId": "snapshot_abc123",
    "createdAt": "2026-04-18T10:30:45.123Z"
  }
}
```

### Branch from Snapshot

```bash
curl -X POST https://api.opencode.cloud/api/sessions/{sessionId}/branch \
  -H 'Authorization: Bearer <token>' \
  -d '{
    "snapshotId": "snapshot_abc123",
    "name": "try-approach-a"
  }'
```

### Rollback to Snapshot

```bash
curl -X POST https://api.opencode.cloud/api/sessions/{sessionId}/rollback \
  -H 'Authorization: Bearer <token>' \
  -d '{"snapshotId": "snapshot_abc123"}'
```

⚠️ Rollback is permanent. All changes after the snapshot are discarded.

### View Branch Tree

```bash
curl https://api.opencode.cloud/api/sessions/{sessionId}/branches \
  -H 'Authorization: Bearer <token>'
```

## Use Cases

### Parallel Exploration

```
Goal: Implement a feature

1. Create snapshot
2. Try approach A in branch 1
3. Try approach B in branch 2
4. Try approach C in branch 3
5. Compare results
6. Rollback to best approach
7. Continue from there
```

### Safe Experimentation

```
1. Checkpoint before refactoring
2. Refactor code
3. Run tests
4. If tests fail → rollback
5. Try different refactoring
```

## Limits

| Limit | Value |
|-------|-------|
| Max snapshots per session | 1000 |
| Max branch depth | Unlimited |
| Snapshots retained | 7 days or 1000 snapshots |
| Time to snapshot | < 5 seconds |
| Time to rollback | < 2 seconds |

## Best Practices

1. **Name snapshots meaningfully**
   ```bash
   ✅ "Before auth refactor"
   ❌ "snapshot-1"
   ```

2. **Create before risky operations**
   ```bash
   curl -X POST .../snapshot -d '{"description": "Before major refactoring"}'
   ```

3. **Use branching for parallel work**
   - Don't: Edit → Undo → Edit again (lossy)
   - Do: Snapshot → Branch A → Try → Rollback → Branch B → Try
