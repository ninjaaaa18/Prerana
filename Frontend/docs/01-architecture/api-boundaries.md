# API Boundaries

> **Phase 2 · Planning Document** — the future frontend service layer.
> **Defined here, NOT implemented.** No backend changes, no API calls, no auth wiring.

## 1. Transport Foundation (exists)

| File | Role |
|---|---|
| `src/lib/axios.ts` | Axios instance, `baseURL = VITE_API_BASE_URL \|\| http://localhost:5000/api`, JSON headers, 10s timeout |
| `src/lib/query-client.ts` | TanStack Query client: 5 min stale time, no refetch on focus, 1 retry |
| `src/services/api.service.ts` | Health check (existing example) |

## 2. Service Layer Contract

- **One service module per backend resource group.**
- Services return typed data only; all errors bubble as normalized `ApiError`.
- No components call `apiClient` directly — always through a service + query hook.

### Response envelope (target)

```ts
interface ApiEnvelope<T> {
  data: T;
  message?: string;
}
```

### Normalized error (target)

```ts
interface ApiError {
  code: string;      // machine-readable, e.g. 'UNAUTHORIZED'
  message: string;   // human-readable
  details?: Record<string, string[]>; // field-level validation errors
}
```

Error normalization lands in `src/lib/axios.ts` (response interceptor), once, and every service inherits it.

## 3. Service Boundaries

### `services/auth.service.ts` (shared — cross-cutting)

| Function | Method / Path | Purpose |
|---|---|---|
| `login(credentials)` | `POST /auth/login` | Session start |
| `register(payload)` | `POST /auth/register` | Account + role |
| `requestPasswordReset(email)` | `POST /auth/forgot-password` | Reset email |
| `resetPassword(token, password)` | `POST /auth/reset-password` | Complete reset |
| `getCurrentUser()` | `GET /auth/me` | Restore session |
| `logout()` | `POST /auth/logout` | End session |
| `refreshToken()` | `POST /auth/refresh` | Token rotation |

### `features/<module>/services/<module>.service.ts` (module-owned)

| Module | Functions (illustrative) |
|---|---|
| `dashboard` | `getDashboardOverview(role)` → `GET /dashboard/overview` |
| `subjects` | `listSubjects()`, `getSubject(id)` → `/subjects`, `/subjects/:id` |
| `chapters` | `getChapter(subjectId, chapterId)`, `getLesson(...)`, `saveReadingPosition(...)` |
| `ai-studio` | `listSessions()`, `createSession()`, `getSession(id)`, `sendMessage(sessionId, prompt)` |
| `library` | `listLibraryItems(filter)`, `getLibraryItem(id)`, `uploadResource(file)` |
| `assessments` | `listAssessments()`, `getAssessment(id)`, `startAttempt(id)`, `submitAttempt(id, answers)`, `getResult(attemptId)` |
| `progress` | `getProgressOverview()`, `getSubjectProgress(id)`, `getClassProgress(classId)` |
| `teach` | `listClasses()`, `createClass()`, `getClass(id)`, `updateRoster(...)`, content CRUD (`subjects`, `chapters`, `lessons`) |
| `admin` | `listUsers()`, `updateUserRole(...)`, `listReports()`, AI config |
| `profile` | `updateProfile(payload)`, `uploadAvatar(file)` |
| `settings` | `updatePreferences(...)`, `changePassword(...)` |

### `services/uploads.service.ts` (shared — cross-cutting)

| Function | Method / Path | Purpose |
|---|---|---|
| `uploadFile(file, scope)` | `POST /uploads` | Library, avatar, lesson media |

## 4. Query Key Convention

Keys are **hierarchical, typed, and colocated with their service** (defined in `src/lib/query-keys.ts`):

```
['subjects']
['subjects', subjectId]
['subjects', subjectId, 'chapters', chapterId]
['assessments', assessmentId, 'attempts', attemptId]
['progress', 'overview']
['ai-studio', 'sessions']
['ai-studio', 'sessions', sessionId]
```

Every query uses its key object; mutations invalidate the exact parent keys.

## 5. Mutation Rules

- All mutations go through `useMutation` (TanStack Query) + module service.
- On success, invalidate/update the relevant query keys — never a full `invalidateQueries()` without a key.
- Optimistic updates allowed for: reading position, chat send, toggle toggles. Everything else refetches.

## 6. Pagination & Filtering (target)

- Lists are paginated server-side: `?page=1&limit=20`.
- Filters serialized as query params with a shared `buildQueryString(filters)` util.
- TanStack Query `keepPreviousData` for smooth pagination.

## 7. Streaming (AI Studio)

- AI responses stream. The AI service returns a **readable stream** (not plain JSON) for chat completion; UI consumes it via a dedicated streaming hook in `features/ai-studio/hooks/`.

## 8. What is intentionally out of scope here

- No endpoint is called; no `fetch`/`axios` code is written.
- Contract changes must be coordinated with Backend phases.
