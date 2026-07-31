# User Flows

> **Phase 2 · Planning Document** — step-by-step flows for the primary journeys.
> Flows are written as ordered steps; each step maps to a screen (see `route-architecture.md`).

## 1. Onboarding (new user)

```
1. Landing page        → tap "Get Started"
2. /register           → choose role: Student | Teacher | Parent
3. Register form       → name, email, password (zod-validated)
4. Email verification  → confirm → redirected to /login (or session start)
5. /app                → role-aware Dashboard with empty-state guidance
```

## 2. Sign in & restore

```
1. /login (or guard redirect)
2. Credentials → POST /auth/login → session stored (context + token)
3. Redirect → /app
4. On app load → GET /auth/me restores session; 401 → interceptor → /login
```

## 3. Study a chapter (primary student flow)

```
1. /app Dashboard         → "Continue Learning" card (or Subjects)
2. /app/subjects          → pick subject
3. /app/subjects/:id      → chapter list
4. /app/subjects/:id/chapters/:chapterId → study screen (objectives, lesson list)
5. /app/learn/:subjectId/:chapterId/:lessonId → lesson reader
   · reading position autosaved (mutation, optimistic)
   · inline "Ask AI" opens contextual prompt
6. Previous / Next lessons → completes chapter
7. Progress updated → Dashboard reflects mastery
```

## 4. AI Studio

```
1. /app/ai-studio              → session list + "New chat"
2. Composer → send prompt → POST create/send (streamed response)
3. Messages render streaming; history persists per session
4. From a lesson: "Ask AI" → preloaded context → returns to lesson after
```

## 5. Take an assessment

```
1. /app/assessments            → list (available/upcoming/completed)
2. /app/assessments/:id        → instructions, time limit, best score
3. Start attempt               → POST startAttempt → /take
4. Answer question-by-question → autosave + timer
5. Submit (guard: unanswered confirm) → POST submitAttempt
6. /results/:attemptId         → score, topic breakdown, review answers
   → CTA: retake | back to subject
```

## 6. Teacher: class + content

```
1. /app/teach                    → workspace home
2. Create class                  → name, grade, students (roster)
3. /app/teach/content            → draft subject → chapter → lesson
4. Publish request               → goes to admin for approval
5. /app/teach/assessments        → author → assign to class
6. Monitor live attempts         → /app/teach/students/:studentId
```

## 7. Parent: monitor child

```
1. /app Dashboard                → child switcher → child overview
2. /app/progress                 → selected child's mastery/streaks
3. /app/progress/:subjectId      → chapter-level detail
4. Notifications                 → milestones & concerns
```

## 8. Admin: governance

```
1. /app/admin                    → system health home
2. /app/admin/users              → list, role change, activate/deactivate
3. /app/admin/subjects           → approve/publish teacher drafts
4. /app/admin/reports            → usage, adoption, AI usage
5. /app/admin/ai-studio          → policy & review
```

## 9. Account & recovery

```
Forgot password:
  1. /forgot-password → email → reset link
  2. /reset-password/:token → new password → /login

Settings:
  /app/settings → appearance, notifications, privacy, security (password, sessions)

Logout:
  top-bar user menu → POST /auth/logout → /login
```

## 10. Failure paths (defined behaviour)

| Failure | Behaviour |
|---|---|
| Guard fails (not authed) | redirect `/login` (preserve `from` intent) |
| Guard fails (wrong role) | `/403` with "return to dashboard" |
| Session expired mid-task | intercept → refresh → retry; else `/login` |
| Assessment autosave fails | retry with backoff + banner; answers kept locally |
| AI stream disconnects | message marked failed, retry prompt |
| Unknown route | `/404` |
