# Folder Architecture

> **Phase 2 · Planning Document** — the scalable folder layout for `Frontend/src`.

## 1. Target Tree (top level)

```
src/
├── app/                     # App bootstrap & provider composition (App.tsx moves here)
├── assets/                  # static images, fonts (exists)
├── components/
│   ├── ui/                  # Design System — DO NOT RECREATE (exists)
│   ├── common/              # shared cross-module widgets (exists)
│   └── features/            # shared feature-specific widgets (exists)
├── config/                  # app-level config: navigation, roles, feature flags
├── constants/               # design tokens & static values (exists)
├── context/                 # app-level contexts: auth, theme, toasts (exists)
├── features/                # FEATURE MODULES (new — created in Phase 2)
│   ├── <module>/            # one folder per module (13 modules)
├── hooks/                   # shared reusable hooks (exists)
├── layouts/                 # public/app/admin shell layouts (exists)
├── lib/                     # infrastructure: axios, query-client, utils (exists)
├── pages/                   # transitional & cross-cutting screens (exists)
├── routes/                  # route registry & guards (exists)
├── services/                # shared cross-module API services (auth, uploads)
├── stores/                  # global client state (non-server state)
├── styles/                  # global CSS (exists)
├── types/                   # shared domain types (exists)
├── utils/                   # pure helper functions (exists)
└── vite-env.d.ts            # env typing (exists)
```

## 2. Current state vs Target state

| Folder | Status now | Target |
|---|---|---|
| `components/ui` | ✅ 25 components | unchanged |
| `components/common` | empty (`.gitkeep`) | shared widgets |
| `components/features` | empty (`.gitkeep`) | cross-module feature widgets |
| `constants` | ✅ tokens | add breakpoints, route paths |
| `context` | empty (`.gitkeep`) | auth context |
| `features` | **created (13 `.gitkeep`)** | module slices |
| `hooks` | empty (`.gitkeep`) | `use-debounce`, `use-media-query`, `use-auth` |
| `layouts` | `MainLayout` | + `PublicLayout`, `AppShell`, `AdminShell` |
| `pages` | Home/Login/DesignSystem | shrinks as features absorb screens |
| `routes` | `index.tsx` | + guards, lazy route composition |
| `services` | `api.service.ts` | auth/upload shared services |
| `types` | empty (`.gitkeep`) | shared contracts |
| `utils` | empty (`.gitkeep`) | pure helpers |

## 3. Feature Module Skeleton

Created in Phase 2 (each module has `.gitkeep`); populated from Phase 3 onward:

```
src/features/<module>/
├── routes.tsx        # contributes <Route> fragments
├── components/       # module-private components
├── hooks/            # module-private hooks (wrappers over module services)
├── services/         # module API boundary functions
├── schemas/          # zod schemas
├── types.ts          # module types
└── index.ts          # public barrel
```

Module folders currently present: `admin`, `ai-studio`, `assessments`, `auth`, `chapters`, `dashboard`, `landing`, `library`, `profile`, `progress`, `settings`, `subjects`, `teach`.

## 4. Naming & conventions

- **Files**: kebab-case (`subject-card.tsx`, `use-subject-query.ts`).
- **Components**: PascalCase exports, kebab-case filenames.
- **Folders**: kebab-case, singular (`component/`, `hook/` optional; default to plural `components/`, `hooks/`).
- **Barrels**: each module exports a single `index.ts`.
- **Path alias**: `@/*` → `src/*` (configured in `vite.config.ts` + `tsconfig.app.json`). Always import with `@/`.

## 5. What lives where — decision guide

| I have… | …it goes in |
|---|---|
| A screen for a business capability | `features/<module>/routes.tsx` + components |
| A widget reused by 2+ modules | `components/common/` |
| A design-system primitive | `components/ui/` (existing) |
| A hook reused by 2+ modules | `hooks/` |
| A hook used by one module only | `features/<module>/hooks/` |
| A fetch/API function for one module | `features/<module>/services/` |
| A fetch/API function used everywhere (auth, uploads) | `services/` |
| A domain type shared app-wide | `types/` |
| A type used by one module | `features/<module>/types.ts` |
| App-level config (nav, roles) | `config/` |
| Pure helpers | `utils/` |

## 6. Enforced boundaries

- Feature modules never import each other (documented in `feature-architecture.md`).
- `pages/` never imports from `features/` internals beyond the public barrel.
- Global state lives in `context/`/`stores/`, never in `lib/` (lib = infrastructure only).
