# User Roles

> **Phase 2 · Planning Document** — the four roles and what each can do.

## 1. Roles

| Role | Identity | Core intent |
|---|---|---|
| **Student** | Learner | Study, practise, assess, grow |
| **Teacher** | Educator | Author content, manage classes, monitor learners |
| **Parent** | Guardian | Track a child's learning, support progress |
| **Admin** | Operator | Govern users, content, and system health |

One account, one role. Role determines navigation, routes (see `route-architecture.md`), and capabilities.

## 2. Capability Matrix

| Capability | Student | Teacher | Parent | Admin |
|---|---|---|---|---|
| Browse subjects & chapters | ✓ | ✓ | view | ✓ |
| Study lessons / learning content | ✓ | ✓ | — | ✓ |
| Ask AI tutor (AI Studio) | ✓ | ✓ | limited | ✓ |
| Access library resources | ✓ | ✓ | ✓ | ✓ |
| Take assessments | ✓ | — | — | ✓ |
| Author subjects/chapters/lessons | — | ✓ | — | ✓ |
| Author assessments | — | ✓ | — | ✓ |
| Manage classes & rosters | — | ✓ | — | ✓ |
| View own progress | ✓ | ✓ | ✓ | ✓ |
| View children's progress | — | — | ✓ | — |
| View class/student progress | — | ✓ | — | ✓ |
| View all-system progress | — | — | — | ✓ |
| Manage users & roles | — | — | — | ✓ |
| Content governance / publish | — | draft | — | approve |
| System reports | — | class-level | — | ✓ |

## 3. Role Behaviour Nuances

- **Parent is read-mostly.** Primary surfaces: dashboard (child overview), progress (child detail), notifications. AI Studio access is limited/curated.
- **Teacher sees two modes**: their own learning surfaces plus `/app/teach/*`. Content authored by a teacher is a **draft** until admin approves/publishes.
- **Student** is the primary target: the full learn → practise → assess → review loop.
- **Admin** has every student/teacher capability plus `/app/admin/*`; admin's dashboard defaults to system health, not personal learning.

## 4. Frontend Enforcement (future)

- Role is part of the auth session (`context/auth-context.tsx`).
- Navigation config filters items by `roles` (see `navigation-architecture.md`).
- Route guards enforce role at the parent route level (see `route-architecture.md`).
- All checks are UI-level; real authorization lives on the Backend. The frontend never trusts itself for security.

## 5. Where roles live in code (target)

| Concern | Location |
|---|---|
| Role type definition | `src/types/auth.ts` (`'student' \| 'teacher' \| 'parent' \| 'admin'`) |
| Current user session | `src/context/auth-context.tsx` |
| Session hook | `src/hooks/use-auth.ts` |
| Route guards | `src/routes/guards.tsx` |
| Navigation filtering | `src/config/navigation.ts` |
| Dashboard variance | `features/dashboard/` (role-switched views) |
