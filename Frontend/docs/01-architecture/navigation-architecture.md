# Navigation Architecture

> **Phase 2 · Planning Document** — how users navigate Prerana on every screen size.

## 1. Breakpoints

Navigation adapts at three tiers, driven by a shared **breakpoint config** (single source of truth in `src/constants/`):

| Tier | Width | Layout model |
|---|---|---|
| **Mobile** | `< 768px` | Top app bar + bottom tab bar + drawer |
| **Tablet** | `768px – 1023px` | Top app bar + collapsible icon rail |
| **Desktop** | `≥ 1024px` | Full sidebar + top bar |

## 2. Navigation Inventory

The app exposes exactly **three navigation surfaces**, each with defined responsibilities:

| Surface | Desktop | Tablet | Mobile |
|---|---|---|---|
| **Sidebar / rail** | Expanded 240px sidebar | Collapsed 64px icon rail (tooltip labels) | Off-canvas drawer from top bar menu |
| **Top bar** | Search, breadcrumbs, notifications, user menu | Search, notifications, user menu | App title, search icon, menu trigger |
| **Bottom tab bar** | — | — | 5 slots: Home, Subjects, AI Studio, Progress, More |

### 2.1 Primary navigation (context switching)

Role-filtered; rendered in the sidebar/rail/drawer.

| Item | Route | Student | Teacher | Parent | Admin |
|---|---|---|---|---|---|
| Dashboard | `/app` | ✓ | ✓ | ✓ | ✓ |
| Subjects | `/app/subjects` | ✓ | ✓ | ✓ | ✓ |
| AI Studio | `/app/ai-studio` | ✓ | ✓ | ✓ | ✓ |
| Library | `/app/library` | ✓ | ✓ | ✓ | ✓ |
| Assessments | `/app/assessments` | ✓ | ✓ | ✓ | ✓ |
| Progress | `/app/progress` | ✓ | ✓ | ✓ | ✓ |
| Teach | `/app/teach` | ✗ | ✓ | ✗ | ✓ |
| Admin Console | `/app/admin` | ✗ | ✗ | ✗ | ✓ |

### 2.2 Secondary navigation

Rendered in the sidebar footer (desktop/tablet) or drawer + user menu (mobile).

- **Settings** — `/app/settings`
- **Profile** — `/app/profile`
- **Help** — (future) support/info
- **Log out** — session end, inside the top-bar user menu only

## 3. Desktop Navigation (≥ 1024px)

```
┌──────────────┬──────────────────────────────────────────────┐
│  Sidebar     │  Top bar                                     │
│  (240px)     │  Search · Breadcrumbs · Notifications · User │
│  ─────────── │──────────────────────────────────────────────┤
│  Logo        │                                              │
│  ─────────── │                                              │
│  Dashboard   │         Active feature content                │
│  Subjects    │         (rendered via <Outlet />)             │
│  AI Studio   │                                              │
│  Library     │                                              │
│  Assessments │                                              │
│  Progress    │                                              │
│  ─────────── │                                              │
│  [Teach]     │                                              │
│  [Admin]     │                                              │
│  ─────────── │                                              │
│  Settings    │                                              │
│  Profile     │                                              │
└──────────────┴──────────────────────────────────────────────┘
```

- Sidebar is **collapsible** to the 64px rail via a toggle.
- Active item highlighted with the primary accent (`indigo` from the existing design system).
- Group headers (`Learn`, `Manage`) used when role exposes extra sections.

## 4. Tablet Navigation (768px – 1023px)

- Sidebar collapses to a **64px icon rail** by default; icons keep `tooltip` labels.
- Top bar keeps search, breadcrumbs, notifications, user menu.
- Tapping the menu toggle expands the rail into a full sidebar overlay.
- Active state = accent-tinted icon chip.

## 5. Mobile Navigation (< 768px)

```
┌──────────────────────────────┐
│  ☰  Prerana      🔍  🔔  👤  │  Top bar
├──────────────────────────────┤
│                              │
│          Content             │
│                              │
├──────────────────────────────┤
│  Home  Subjects  AI  Progress│  Bottom tab bar (5th = More)
└──────────────────────────────┘
```

- **Bottom tab bar** = primary frequent actions, max 5 slots.
- **More** opens the full drawer with all remaining primary + secondary items (Teach, Admin, Library, Assessments, Settings, Profile, Help).
- **Drawer** = slide-in from left; closes on selection or backdrop tap.
- Never hide the tab bar while the user is mid-task (reading/learning/assessing).

## 6. Breadcrumbs

Breadcrumbs follow the URL segment stack:

```
/app/subjects/:subjectId/chapters/:chapterId
  Home › Subjects › Algebra › Quadratic Equations
```

- Rendered in the top bar on desktop/tablet; hidden on mobile (back button instead).
- Uses the existing `Breadcrumb` design-system component.

## 7. Configuration-Driven Navigation

Navigation is **data, not markup.** One typed config in `src/config/navigation.ts` defines items (`label`, `route`, `icon`, `roles`, `group`). All three breakpoint surfaces render from it. Adding a nav item = editing config, not layouts.

## 8. Accessibility & behaviour rules

- Every nav item has visible focus states and `aria-current="page"`.
- Drawer & rail receive keyboard focus management (focus trap).
- Active route matching uses partial matching so nested routes stay highlighted.
- No animated entry for primary nav on initial load (content over motion).
