# Prerana — Frontend Architecture Docs

> Phase 2 planning and architecture for the Prerana application (Frontend).
> These documents define the **target architecture**. Implementation begins in Phase 3.

## Quick Start

```bash
cd Frontend
npm run dev        # start dev server
npm run build      # type-check + production build
npm run lint       # eslint (zero warnings allowed)
```

## Document Index

### 01 · Architecture

| Document | What it defines |
|---|---|
| [Route Architecture](01-architecture/route-architecture.md) | Full URL hierarchy, zones, guards, role visibility, migration path |
| [Navigation Architecture](01-architecture/navigation-architecture.md) | Desktop / tablet / mobile navigation model |
| [Feature Architecture](01-architecture/feature-architecture.md) | The 13 feature modules, ownership, dependency rules |
| [Folder Architecture](01-architecture/folder-architecture.md) | Target folder tree, current vs target, placement guide |
| [API Boundaries](01-architecture/api-boundaries.md) | Future frontend service layer (defined, not implemented) |

### 02 · Information Architecture

| Document | What it defines |
|---|---|
| [User Roles](02-information-architecture/user-roles.md) | The 4 roles and capability matrix |
| [Learning Journey](02-information-architecture/learning-journey.md) | How users move through the app (core loop) |
| [User Flows](02-information-architecture/user-flows.md) | Step-by-step flows for every primary journey |

### 03 · Planning

| Document | What it defines |
|---|---|
| [Implementation Roadmap](03-planning/implementation-roadmap.md) | Ordered UI build plan (Phase 3 → 12) |
| [Conventions](03-planning/conventions.md) | Coding conventions & definition of done |

## Reading Order

1. `learning-journey.md` — understand the product motion.
2. `route-architecture.md` — where everything lives.
3. `feature-architecture.md` + `folder-architecture.md` — how code is organized.
4. `navigation-architecture.md` — how users get around.
5. `conventions.md` — how to write code that fits.
6. `implementation-roadmap.md` — what to build next.
