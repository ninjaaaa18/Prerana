# Implementation Roadmap

> **Phase 2 · Planning Document** — an ordered plan for the UI implementation phases.
> Phase 3 onward builds the screens defined by these architecture docs.

## Sequencing Principles

1. **Shell first, screens after.** Layouts, guards, and navigation are built before any feature content — every future screen drops into an existing shell.
2. **Foundations over features.** Auth context and shared infrastructure land once, early.
3. **Student path first.** The primary learner loop (dashboard → subjects → chapters → assessments → progress) is the spine.
4. **Authoring last.** Teacher/Admin surfaces depend on the same domain modules already existing.

## Phased Plan

### Phase 3 — Shell & Foundations
- `context/auth-context.tsx` + `hooks/use-auth.ts` (session shape only, backend contract follows API boundaries).
- `routes/guards.tsx` (`RequireAuth`, `RequireRole`, `GuestOnly`).
- `layouts/AppShell.tsx`, `layouts/AdminShell.tsx`, `layouts/PublicLayout.tsx` (migrate `MainLayout`).
- `config/navigation.ts` + `config/breakpoints.ts`; responsive sidebar/rail/bottom-bar components.
- Wire `/app` subtree into the route registry.
- Move `pages/HomePage` → `features/landing`; `pages/LoginPage` → `features/auth`.

### Phase 4 — Dashboard & Subjects
- `features/dashboard` (role-aware overview, Continue Learning).
- `features/subjects` (catalog grid, subject detail, chapter list).
- Breadcrumbs + top-bar search shell.

### Phase 5 — Chapters & Lessons (core learning)
- `features/chapters` (study screen, lesson reader, reading-position sync).
- Inline "Ask AI" entry (shared trigger component).

### Phase 6 — Assessments
- `features/assessments` (list, detail, take flow with timer/autosave, results report).

### Phase 7 — Progress & Library
- `features/progress` (overview, per-subject detail, parent child-switcher, teacher drill-down).
- `features/library` (resource grid, detail, uploads for teacher/admin).

### Phase 8 — AI Studio
- `features/ai-studio` (session list, composer, streaming message thread).

### Phase 9 — Profile, Settings, Account flows
- `features/profile`, `features/settings`, password flows in `features/auth`.

### Phase 10 — Teacher Workspace
- `features/teach` (classes, rosters, content authoring, assessment authoring, monitoring).

### Phase 11 — Admin Console
- `features/admin` (users, content governance, reports, AI policy).

### Phase 12 — Polish
- Empty/loading/error states audit, a11y pass, design-system parity review, docs refresh.

## Dependency Order

```
shell (3) → dashboard/subjects (4) → chapters (5) → assessments (6)
                                        → progress (7) → ai-studio (8)
                                        → profile/settings (9) → teach (10) → admin (11)
```

## Definition of Done per phase

- Every route is guarded and lazy-loaded.
- Screens use the existing design system only (no new UI primitives unless approved).
- Module obeys `feature-architecture.md` rules (no cross-imports).
- `npm run build` and `npm run lint` pass.
- Backend contract changes are documented in `api-boundaries.md` first.
