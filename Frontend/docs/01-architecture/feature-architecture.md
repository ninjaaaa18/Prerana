# Feature Architecture

> **Phase 2 · Planning Document** — how Prerana is split into feature modules and what each one owns.

## 1. Module Model

Prerana uses **feature-sliced modules**. Each module is a self-contained slice under `src/features/<module>/` that owns its UI, hooks, services, and types for one business capability.

### Module anatomy (target)

```
src/features/<module>/
├── routes.tsx        # <Route> fragments this module contributes
├── components/       # module-private components
├── hooks/            # module-private hooks (query/mutation wrappers)
├── services/         # module-private API boundary (see api-boundaries.md)
├── schemas/          # zod schemas for forms/validation
├── types.ts          # module type definitions
└── index.ts          # public barrel: exports the module's public API
```

### Rules

- **No cross-imports between modules.** If two modules need the same thing, it moves up to a shared location (`components/common`, `hooks/`, `lib/`, `types/`).
- **A module's `index.ts` is its public API.** Everything else is internal.
- **Routes are contributed, not owned centrally** — `src/routes/` only composes them.

## 2. Module Registry

| Module | Ownership | Primary routes | Roles |
|---|---|---|---|
| `landing` | Public marketing home | `/` | all |
| `auth` | Sign-in, registration, password flows | `/login`, `/register`, `/forgot-password`, `/reset-password/:token` | guests |
| `dashboard` | Role-aware home after login | `/app` | all |
| `subjects` | Subject catalog & structure | `/app/subjects`, `/app/subjects/:subjectId` | all |
| `chapters` | Chapter study screen & lesson reader | `/app/subjects/:subjectId/chapters/:chapterId`, `/app/learn/:subjectId/:chapterId/:lessonId` | all |
| `ai-studio` | AI tutor sessions & prompt UI | `/app/ai-studio`, `/app/ai-studio/:sessionId` | student/teacher/parent |
| `library` | Resource library (files, references) | `/app/library`, `/app/library/:itemId` | all |
| `assessments` | Tests & quizzes: author, take, report | `/app/assessments/*` | all (authoring: teacher/admin) |
| `progress` | Analytics & learning progress | `/app/progress`, `/app/progress/:subjectId` | all |
| `teach` | Teacher workspace: classes, content authoring | `/app/teach/*` | teacher/admin |
| `admin` | Admin console: users, content governance, reports | `/app/admin/*` | admin |
| `profile` | Own profile & avatar | `/app/profile` | all |
| `settings` | Preferences, notifications, security | `/app/settings` | all |

## 3. Module Responsibilities Detail

### `dashboard`
- Greeting + role-specific quick actions.
- "Continue learning" cards (last opened subject/chapter).
- Today's plan, recent activity feed, streak/engagement summary.
- Teacher variant: class snapshot, pending reviews. Parent variant: child overview.

### `subjects`
- Subject catalog grid (`Card` grid from design system).
- Subject detail: description, chapters list (`Accordion`/list), teacher info.
- Parent role: read-only view of child-visible subjects.

### `chapters`
- Chapter detail: lesson list, objectives, estimated time.
- Lesson reader: content rendering, inline AI assistance entry point, previous/next navigation.
- Progress persistence (reading position → backend).

### `ai-studio`
- Session list (history), new session composer.
- Chat thread UI: messages, streaming states, suggested prompts.
- Inline embedding: "Ask AI" from within a lesson (shared cross-module entry, implemented in `chapters` via shared component).

### `library`
- Resource grid/list with type filter (video, pdf, link, notes).
- Item detail: metadata + content embed.
- Teacher/admin: upload + manage resources.

### `assessments`
- List: available, upcoming, completed.
- Detail: instructions, question count, time limit, best score.
- Take flow: question-by-question, timer, autosave, submit guard.
- Result report: score, per-topic breakdown, review answers, retake.
- Teacher/admin: authoring UI (question bank, draft/publish).

### `progress`
- Overview: mastery by subject, streak, time spent, recent achievements.
- Detail per subject: chapter-level completion, accuracy trends.
- Parent: child switcher; Teacher: class roster drill-down.

### `teach`
- Class management: create/edit classes, roster management.
- Content authoring: subjects/chapters/lessons CRUD (draft/publish lifecycle).
- Assessment authoring + monitoring live attempts.
- Student drill-down.

### `admin`
- Users: list, role changes, activate/deactivate.
- Content governance: approve/publish content, flag review.
- System reports: usage, adoption, AI usage.
- AI Studio policy config.

### `auth`
- Sign-in form (existing `LoginPage` evolves into this module).
- Registration with role selection (student/teacher/parent).
- Password reset request + reset with token.
- Session handling hooks (`useAuth`) — consumed by guards.

### `profile`
- View/edit profile (name, avatar, contact).
- Role metadata display.

### `settings`
- Preferences: appearance, notifications, privacy.
- Security: password change, active sessions.

## 4. Shared cross-cutting concerns (NOT modules)

| Concern | Home | Reason |
|---|---|---|
| Auth session state | `src/context/auth-context.tsx` + `src/hooks/use-auth.ts` | app-wide, consumed by guards |
| API client | `src/lib/axios.ts` (exists) | transport only |
| Server-state cache | `src/lib/query-client.ts` (exists) | TanStack Query config |
| Design system | `src/components/ui/*` (exists) | do not recreate |
| Shared UI primitives | `src/components/common/*` | cross-module widgets |
| Global types | `src/types/` | shared domain contracts |

## 5. Dependency Rules

```
features/*  →  components/ui, components/common, hooks, lib, types, services (shared)
features/*  ↛  features/*            (no module-to-module imports)
features/*  ↛  pages/*               (pages delegate TO features, never the reverse)
```

- `pages/` (existing) hosts transitional/cross-cutting screens; new screens live in features.
- Shared server-state helpers (query keys, mutation patterns) live in `lib/query-keys.ts` so modules stay consistent.
