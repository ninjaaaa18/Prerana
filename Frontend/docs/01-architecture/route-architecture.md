# Route Architecture

> **Phase 2 · Planning Document** — the target routing model for Prerana.
> This document defines *where* every screen lives. Nothing here is implemented yet.

## 1. Routing Model

- **React Router v7** (already installed) with a single `<BrowserRouter>` mounted in `src/App.tsx`.
- One **route registry** in `src/routes/` that composes route groups contributed by each feature module.
- **Lazy loading** via `React.lazy` for every route chunk (already the convention in `src/routes/index.tsx`).
- **Three route zones**, each guarded by its own layout and access rules:

| Zone | Layout | Access |
|---|---|---|
| Public | `PublicLayout` | No auth required |
| App | `AppShell` | Authenticated (all roles) |
| Management | `AdminShell` | Teacher / Admin only, role-filtered per route |

## 2. URL Conventions

- All authenticated experience lives under a single `/app` prefix — one shell, one navigation context.
- Teacher tooling lives under `/app/teach/*`; admin tooling under `/app/admin/*`.
- Resource routes use stable id segments: `/app/subjects/:subjectId/chapters/:chapterId`.
- Action/verb routes stay flat and obvious: `/take`, `/results`.

## 3. Full Route Hierarchy

### 3.1 Public zone (`PublicLayout`)

```
/                        Landing page (marketing)
/login                   Sign in
/register                Create account + role selection
/forgot-password         Request password reset
/reset-password/:token   Complete password reset
```

### 3.2 App zone (`AppShell`, authenticated)

```
/app                               Dashboard (role-aware)
/app/subjects                      Subject catalog
/app/subjects/:subjectId           Subject detail + chapter list
/app/subjects/:subjectId/chapters/:chapterId    Chapter detail / study screen
/app/learn/:subjectId/:chapterId/:lessonId      Lesson reader & activities
/app/ai-studio                     AI Studio home (sessions + new prompt)
/app/ai-studio/:sessionId          Active AI tutor session
/app/library                       Library (resources)
/app/library/:itemId               Library item detail
/app/assessments                   Assessment list
/app/assessments/:assessmentId     Assessment detail
/app/assessments/:assessmentId/take            Taking an assessment
/app/assessments/:assessmentId/results/:attemptId   Result report
/app/progress                      Progress overview (role-aware)
/app/progress/:subjectId           Progress detail per subject
/app/profile                       Profile
/app/settings                      Settings
```

### 3.3 Management zone (`AdminShell`, Teacher/Admin)

Teacher & shared content tooling:

```
/app/teach                         Teacher workspace home
/app/teach/classes                 Class list
/app/teach/classes/:classId        Class detail + roster
/app/teach/content                 Subject / chapter / lesson authoring
/app/teach/assessments             Assessment authoring
/app/teach/students                Class rosters across classes
/app/teach/students/:studentId     Student detail (progress, activity)
```

Admin-only tooling:

```
/app/admin                         Admin console home
/app/admin/users                   User management (all roles)
/app/admin/subjects                Content governance
/app/admin/reports                 System & usage reports
/app/admin/ai-studio               AI Studio configuration & review
```

### 3.4 Error & fallback

```
/403      Forbidden (authenticated but insufficient role)
/404      Not found
*         Catch-all → /404
```

## 4. Route Guards

Guards are **declarative wrappers**, not business logic. They are defined once in `src/routes/` and reused.

| Guard | Behaviour |
|---|---|
| `RequireAuth` | Redirects unauthenticated users to `/login` |
| `RequireRole` | Restricts to `student` / `teacher` / `parent` / `admin` |
| `RequireAdmin` | Restricts to `admin` (used by `/app/admin/*`) |
| `GuestOnly` | Redirects authenticated users away from public-only screens (login/register) |

Rule of thumb: **guard the parent, never the leaf.** `/app/teach` is guarded once; every child inherits the guard.

## 5. Role → Route Visibility Matrix

| Route group | Student | Teacher | Parent | Admin |
|---|---|---|---|---|
| `/` `/login` `/register` | ✓ | ✓ | ✓ | ✓ |
| `/app` dashboard | ✓ | ✓ | ✓ | ✓ |
| `/app/subjects`, `/app/learn/*` | ✓ | ✓ | view | ✓ |
| `/app/ai-studio` | ✓ | ✓ | limited | ✓ |
| `/app/library` | ✓ | ✓ | ✓ | ✓ |
| `/app/assessments` | take | author+monitor | view results | ✓ |
| `/app/progress` | own | students' | children's | all |
| `/app/teach/*` | ✗ | ✓ | ✗ | ✓ |
| `/app/admin/*` | ✗ | ✗ | ✗ | ✓ |

## 6. Route Registration Pattern

Each feature module owns a `routes.tsx` that returns its `<Route>` fragments. `src/routes/index.tsx` composes them:

```tsx
// src/routes/index.tsx (target shape)
<Routes>
  <Route element={<PublicLayout />}>
    {landingRoutes}
    {authRoutes}
  </Route>
  <Route element={<RequireAuth />}>
    <Route element={<AppShell />}>
      {dashboardRoutes}
      {subjectsRoutes}
      {chaptersRoutes}
      {aiStudioRoutes}
      {libraryRoutes}
      {assessmentsRoutes}
      {progressRoutes}
      {profileRoutes}
      {settingsRoutes}
    </Route>
    <Route element={<RequireRole roles={['teacher', 'admin']} />}>
      <Route element={<AdminShell />}>{teachRoutes}{adminRoutes}</Route>
    </Route>
  </Route>
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

## 7. Migration from Current State

Current `src/routes/index.tsx` has three routes under `MainLayout` (Home, Login, Design System). Migration path:

1. **Phase 3+**: add `AppShell` + `/app` subtree as new routes; keep existing routes untouched.
2. Rename `MainLayout` → `PublicLayout` when the public shell is built; existing pages keep working.
3. Feature modules progressively register their own `routes.tsx`; nothing is rewritten, only added.

## 8. Deep-linking & 404 behaviour

- Every route is deep-linkable (no client-side state required to render).
- Unknown routes fall through to `/404`.
- Guard failures are distinct from 404s: `/403` explains the *why*.
