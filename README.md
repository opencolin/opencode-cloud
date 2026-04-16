# opencode.cloud

**Hosted AI coding agent with branching execution and real-time collaboration**

A serverless platform that brings [opencode](https://github.com/anomalyco/opencode) — the open-source AI coding agent — to the web, powered by [Contree](https://contree.dev/) microVM sandboxes.

## The Problem

opencode is a powerful AI agent that helps developers write code. But today it requires:

- **Local installation** on every machine
- **Your own compute** — agent execution runs on your hardware
- **Manual environment setup** — API keys, credentials, dependencies
- **Linear execution only** — no way to explore multiple approaches in parallel

There's no hosted offering. No way to share a session. No branching. No collaboration.

## The Solution

**opencode.cloud** is a fully managed platform that solves this:

```
Browser → Cloudflare Workers → Contree Sandbox → opencode → AI Models
```

Every user gets an **isolated microVM sandbox** running opencode, accessible from any browser with zero local setup. And unlike other hosted coding environments, opencode.cloud adds something unique:

### 🌳 **Branching Execution** (The Differentiator)

The AI agent can:
- **Checkpoint** state at any point
- **Fork** into parallel exploration branches
- **Try multiple approaches** from the same starting point
- **Rollback** instantly if an approach fails
- **Compare outcomes** and keep the best one

This enables **Monte Carlo Tree Search over solution strategies** — something no other hosted coding agent platform offers.

### 👥 **Real-Time Collaboration**

- Share a session URL with your team
- Multiple users edit the same files simultaneously (Yjs CRDT)
- See collaborators' cursor positions
- Chat with the AI together
- No conflicts, no merge headaches

### ⚡ **Zero Setup**

- No installation needed
- No API key juggling
- No environment configuration
- Click → Code with AI

## Why Contree?

Most cloud IDE platforms use containers or Durable Objects. We chose **Contree** because:

1. **Real Linux environments** — opencode needs a real shell, package managers, and native tools. Contree's microVMs provide this natively.

2. **Immutable snapshots** — Contree's core strength is git-like branching with immutable filesystem snapshots. This is *exactly* what we need for exploring multiple solution paths.

3. **VM-level isolation** — Stronger security than containers. Users' code and AI experiments are fully isolated at the hypervisor level.

4. **No infrastructure to manage** — We don't want to run Kubernetes clusters. Contree handles all the scaling, networking, and resource management.

5. **Audit trail** — Every execution creates an immutable snapshot. Perfect for understanding what the AI tried and why.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│ Browser (User)                                                  │
└──────────────────────┬──────────────────────────────────────────┘
                       │ HTTPS + WebSocket
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ Cloudflare Workers (Control Plane)                              │
│ • Session management (create, resume, destroy)                  │
│ • Authentication (JWT + API keys)                               │
│ • Branching orchestration (snapshot, fork, rollback)            │
│ • HTTP/WebSocket proxy to sandbox                               │
│ • Rate limiting & abuse prevention                              │
└──────────────────────┬──────────────────────────────────────────┘
                       │ Contree API
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ Contree Sandbox (MicroVM)                                       │
│ • opencode server (headless API via `opencode serve`)           │
│ • Real Linux filesystem                                         │
│ • Git, npm, shell — everything native                           │
│ • Immutable snapshots for branching                             │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ AI Models + Tool Execution                                      │
│ • OpenAI, Anthropic, Google, Groq, etc.                         │
│ • File operations, shell commands, diagnostics                  │
│ • Everything opencode already supports                          │
└─────────────────────────────────────────────────────────────────┘
```

### Key Design Decisions

**We don't rebuild opencode.** The platform is a thin layer that:
- Provisions Contree sandboxes with opencode pre-installed
- Manages session lifecycle and branching via Contree's immutable snapshots
- Adds collaboration (Yjs CRDT) on top of opencode's existing web UI
- Handles auth, rate limiting, and multi-tenancy

opencode provides: AI integrations, tool execution, prompt management, session logic. We provide: the hosting, branching, collaboration, and zero-setup experience.

## Current Status

### ✅ Built (M0 + M1)

- **Monorepo** with pnpm + Turbo + TypeScript (strict mode)
- **5 packages**:
  - `packages/shared` — 200 LOC of shared types
  - `packages/contree-client` — 400 LOC typed Contree API wrapper (zero external deps)
  - `packages/collab` — 250 LOC Yjs collaboration layer
  - `apps/worker` — 600 LOC Cloudflare Worker control plane
- **10 API routes**:
  - Session CRUD (create, list, get, delete)
  - Branching (snapshot, branch, rollback, view tree)
  - HTTP/WebSocket proxy to sandbox
  - Health check
- **Auth middleware** (JWT + API key support)
- **All TypeScript checks passing**
- **Wrangler build produces 28KB gzipped Worker**

### 🔑 Blocked on (M0 Spike)

We need to validate Contree integration:
- Cold start time with pre-built opencode image (<5s target)
- Latency between Worker and Contree sandbox (<200ms target)
- Snapshot/resume behavior (immutable state recovery)
- End-to-end provisioning workflow

All Contree API calls are centralized in `session-provisioner.ts`. Once we have the API key, validation should take <1 hour.

### 📋 Not Yet Built (M2+)

- User registration / login
- API key management
- Session sharing & permissions
- Usage tracking / billing
- Performance monitoring
- Pre-built Docker image

## How to Validate

### 1. Get Started (No API Key Needed)

```bash
git clone https://github.com/colygon/opencode-cloud.git
cd opencode-cloud
pnpm install
pnpm turbo check    # TypeScript checks
pnpm turbo build    # Build all packages
cd apps/worker
pnpm dev            # Start Worker on localhost:8787
```

### 2. Test Routes

```bash
# Health check
curl http://localhost:8787/api/health
# { "ok": true, "data": { "status": "healthy", "timestamp": "..." } }

# Try to create a session (will fail auth, but shows structure)
curl -X POST http://localhost:8787/api/sessions \
  -H 'Content-Type: application/json' \
  -d '{"repoUrl": "https://github.com/opencode-ai/opencode"}'
# Response: 401 UNAUTHORIZED (as expected without token)
```

### 3. Wire Contree (When API Key Available)

```bash
# Add to .dev.vars
CONTREE_API_KEY=your_key_here
JWT_SECRET=test_secret

# Create a JWT token (or use an API key from KV)
# Then test POST /api/sessions with real provisioning
```

The code is ready. We just need to validate it works with Contree's API.

## Why This Matters for Contree

1. **Use case validation** — opencode.cloud is a real-world application of Contree's core strength: git-like branching with immutable snapshots.

2. **Reference implementation** — Shows how to build a multi-tenant platform on top of Contree. We handle auth, routing, lifecycle management, and state persistence.

3. **Developer experience** — The typed Contree client (`packages/contree-client`) demonstrates clean API usage without external dependencies. Could be a reference for SDK design.

4. **Competitive moat** — Branching execution for AI agents is novel. No other platform (GitHub Codespaces, Gitpod, Replit) offers this. Contree is the enabler.

5. **Adoption story** — If we ship opencode.cloud, it becomes a flagship use case for Contree's marketing: "Hosting the future of AI-assisted coding."

## Tech Stack

| Component | Technology | Why |
|-----------|-----------|-----|
| Frontend | opencode's web UI (as-is) | Already built, maintained upstream |
| Collaboration | Yjs CRDT | Handles concurrent edits without conflicts |
| Control Plane | Cloudflare Workers | Edge routing, zero infrastructure |
| Compute | Contree Sandboxes | Real Linux, immutable snapshots, git-like branching |
| Database | D1 + KV + R2 | Cloudflare ecosystem, zero ops |
| Auth | jose (JWT) | Lightweight, edge-compatible |
| Runtime | TypeScript + Hono | Type safety, minimal deps |

## Metrics & Targets

| Metric | Target |
|--------|--------|
| Time to first interaction | <10 seconds |
| Cold start (new session) | <5 seconds |
| Cold start (resume from snapshot) | <2 seconds |
| Collaboration sync latency p95 | <200ms |
| Session crash rate | <0.1% |
| Initial bundle size | <200KB |

## Competitive Advantage

**vs. GitHub Codespaces / Gitpod:**
- Those are cloud IDEs. We're a cloud **agent** — the AI codes, not just the developer.
- We add branching — explore multiple approaches in parallel.

**vs. Cursor / Windsurf (cloud):**
- No branching. Linear execution only.
- No real collaboration (just presence indicators).

**vs. Self-hosted opencode:**
- Eliminates setup & infrastructure management.
- Enables team collaboration.
- Adds branching for exploration.

**vs. ChatGPT / Claude (artifacts):**
- Those generate code, we execute it in a real environment.
- Real tools, real package managers, real output.

## What's Next

1. **Get Contree API key** → run M0 spike (1 week)
2. **Validate cold starts & snapshots** → if valid, proceed to M2 (1 week)
3. **M2: User management** → registration, login, API keys (2 weeks)
4. **M3: Collaboration & sharing** → multi-user sessions, permissions (2 weeks)
5. **M4: Polish & launch** → monitoring, CI/CD, landing page (2 weeks)

**Total path to MVP: ~8 weeks**

## For Contree Team

This project demonstrates:

- ✅ **Clean API integration** — typed client with no external deps
- ✅ **Complex orchestration** — session lifecycle, branching, snapshots
- ✅ **Production-grade code** — TypeScript strict, error handling, auth
- ✅ **Scalable architecture** — multi-tenant, isolated sandboxes
- ✅ **Novel use case** — AI agent execution with branching exploration

**We're betting on Contree as the compute layer for the future of AI-assisted coding.**

---

## Getting Help

- **Architecture questions?** See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)
- **Build status?** See [BUILD_STATUS.md](./BUILD_STATUS.md)
- **Product details?** See [opencode-cloud-prd.md](./.sisyphus/drafts/opencode-cloud-prd.md)
- **Claude Code notes?** See [AGENTS.md](./AGENTS.md)

## License

MIT — we believe in open infrastructure for open-source AI tools.

---

**Ready to ship the future of AI coding.** 🚀

Questions? Issues? Ideas? Open an issue or reach out.
