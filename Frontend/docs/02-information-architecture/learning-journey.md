# Learning Journey (Information Architecture)

> **Phase 2 · Planning Document** — how a user moves through Prerana end-to-end.

## 1. The Core Loop (Student)

Prerana's information architecture is built around one loop, repeated every study session:

```
Dashboard
   │  continue / explore
   ▼
Subjects ──► Chapters ──► Lessons ──┐
   │                                 │  "Ask AI" inline
   │                                 ▼
   └──────────► Assessments ◄── AI Studio (on-demand help)
                   │
                   ▼
                Results ──► Progress (feed the loop)
```

**Discover → Learn → Practise → Assess → Reflect → Repeat.**

## 2. Stage Map

| Stage | Screens | Module |
|---|---|---|
| **Enter** | Landing → Sign up/in | `landing`, `auth` |
| **Orient** | Role-aware Dashboard, Continue Learning | `dashboard` |
| **Discover** | Subject catalog → Subject detail → Chapter list | `subjects` |
| **Learn** | Chapter study screen, lesson reader, inline AI | `chapters` |
| **Assist** | AI Studio sessions (conversational help) | `ai-studio` |
| **Reinforce** | Library resources attached to topics | `library` |
| **Assess** | Assessment list → detail → take → submit | `assessments` |
| **Reflect** | Result report, answer review, mastery deltas | `assessments` |
| **Track** | Progress overview, per-subject detail, streaks | `progress` |
| **Steward** | Profile, Settings, notifications | `profile`, `settings` |

## 3. Movement Patterns

### 3.1 Linear (guided study)
```
/app/subjects/:subjectId/chapters/:chapterId
  → /app/learn/:subjectId/:chapterId/:lessonId (prev/next)
  → "Continue" returns you exactly where you stopped
```
Used for a focused study session; every screen offers forward + back.

### 3.2 Radial (reference / assist)
From any lesson, the learner can branch out (AI help, library lookup, glossary) and return without losing place:
```
Lesson ──► AI Studio (context preloaded with the lesson)
Lesson ──► Library (attached resources)
Lesson ──► Assessments (check yourself on this chapter)
```

### 3.3 Recursive (mastery loop)
```
Assess → Weak topics identified → Progress highlights gaps
      → Dashboard recommends: re-study chapter X → retake
```
The system funnels learners back into content they scored low on.

## 4. Entry & Exit Points

| Entry | Route | Note |
|---|---|---|
| First visit | `/` | Landing / marketing |
| Returning (signed in) | `/app` | Dashboard with Continue Learning |
| Deep link | any `/app/*` | Guards redirect to login if needed |

| Exit | Behaviour |
|---|---|
| Log out | Top-bar user menu → `POST /auth/logout` → `/login` |
| Session expiry | Axios interceptor → refresh token; fail → `/login` with notice |

## 5. Role-Variant Journeys

### Teacher
```
Dashboard (class snapshot)
  → Teach workspace: Classes → roster
  → Content authoring: draft subject/chapter/lesson
  → Assessments: author → assign → monitor live attempts
  → Progress: class/student drill-down → intervene
```

### Parent
```
Dashboard (child overview, child switcher)
  → Progress: child's mastery, time, streak, weak topics
  → Notifications: milestones & concerns
  → (limited) AI Studio + Library
```

### Admin
```
Admin console → users → reports → content governance → AI policy
```

## 6. Anti-Patterns (what IA forbids)

- No orphan screens: every screen is reachable from navigation, a parent screen, or a deep link.
- No dead ends after a completed task: assessment results always offer "Review answers" and "Back to subject".
- No more than ~3 clicks to reach any primary feature from the Dashboard.
- Mobile never requires the sidebar: bottom tab bar + drawer covers all primary destinations.
