---
title: Collaboration
description: Real-time collaboration with multiple users
---

# Collaboration

**Collaboration** lets multiple users edit the same files simultaneously without conflicts.

## How It Works

opencode.cloud uses **Yjs** — a CRDT (Conflict-free Replicated Data Type) that automatically merges concurrent edits.

No manual merge required. No conflicts. No "yours vs. theirs" resolution.

## Features

- **See collaborators' cursors** — Real-time cursor position visibility
- **View presence** — Who's online and where they are
- **Chat in session** — Discuss changes in real-time

## Concurrent Edits Example

```
User A edits: function add(a, b) { return a + b + 0; }
User B edits: function add(a, b) { // Add two numbers
              return a + b; }

Yjs Result:   function add(a, b) { // Add two numbers
              return a + b + 0; }  ← Both changes merged!
```

## Limits

| Limit | Value |
|-------|-------|
| Max concurrent users | 10 |
| Max chat history | 1000 messages |
| Cursor update frequency | 100ms |
| Sync latency p95 | <200ms |

## Use Cases

**Pair Programming** — Two developers editing simultaneously.

**Code Review Live** — Author and reviewer collaborate in real-time.

**Teaching** — Everyone sees code being written.
