# Conventions

> **Phase 2 · Planning Document** — coding conventions every future phase must follow.

## 1. Tooling

- **Package manager**: npm (lockfile `package-lock.json` exists).
- **Language**: TypeScript strict (`tsconfig.app.json` has `strict: true`).
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`; design tokens in `src/constants/`.
- **Lint**: `npm run lint` — ESLint with `--max-warnings 0` (zero warnings allowed).
- **Format**: `npm run format` — Prettier.
- **Build**: `npm run build` (`tsc -b && vite build`) must pass before a phase is done.

## 2. Imports & Aliasing

- Always use the `@/` alias: `import { Button } from '@/components/ui/button'`.
- Group imports: react → third-party → `@/` internal → relative (last resort).
- Prefer named exports (`export const X`) over default exports for components and hooks.

## 3. Naming

| Thing | Convention | Example |
|---|---|---|
| Files & folders | kebab-case | `subject-card.tsx`, `use-subject-query.ts` |
| Components | PascalCase | `SubjectCard` |
| Hooks | `use` + camelCase | `useSubjectQuery` |
| Constants | `UPPER_SNAKE` | `ROLE_TYPES` |
| Types & interfaces | PascalCase | `SubjectSummary` |
| Query keys | `camelCase` string literals | `'subjectDetail'` |
| Event handlers | `handle` + noun/verb | `handleSubmit` |

## 4. Component Patterns

- Function components with explicit `React.FC` return type (matches existing codebase).
- Design-system components from `components/ui` are used as-is; do not recreate them.
- Shared `cn()` helper (in `src/lib/utils.ts`) for all class merging.
- Default props via destructuring; never mutate props.

## 5. Data Fetching

- All server data via TanStack Query hooks (no raw `useEffect` + fetch).
- One module service + one query hook per resource.
- Query keys from a single typed registry (see `api-boundaries.md`).
- Loading → `Skeleton` components; empty → `EmptyState`; error → `ErrorState` (all exist in `components/ui`).

## 6. Forms

- `react-hook-form` + `zod` (resolvers already installed).
- Schema defined beside its usage in the module `schemas/` folder.
- Server errors map back to fields using the `ApiError.details` contract.

## 7. State Management

- Server state: TanStack Query (never duplicate server data in client state).
- App-wide client state: React Context in `src/context/` (`stores/` if it outgrows context).
- Local UI state: `useState` / `useReducer` inside the component.
- No prop drilling past two levels; prefer hooks.

## 8. Routing & Guards

- Every new route is lazy-loaded (`React.lazy`) — matches `src/routes/index.tsx`.
- Guards at the parent level only (see `route-architecture.md`).
- Navigate with `react-router-dom` hooks; no `window.location` unless truly external.

## 9. Accessibility

- All interactive elements keyboard-operable with visible focus.
- Icons (lucide-react) get `aria-hidden` when paired with text labels.
- Decorative motion (framer-motion) reduced via `prefers-reduced-motion` where cheap.

## 10. Module Boundary Discipline

- No `features/*` → `features/*` imports (enforced by review, not tooling yet).
- Public API of a module = its `index.ts`.
- New shared primitive → propose moving it to `components/common` / `hooks` / `lib` rather than duplicating.

## 11. Definition of Done

- `npm run build` passes.
- `npm run lint` passes with zero warnings.
- Formatted with Prettier.
- No design-system components recreated.
- No Backend code touched.
