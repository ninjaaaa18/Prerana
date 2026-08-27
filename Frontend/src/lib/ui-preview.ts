// LOCAL UI PREVIEW ONLY — REMOVE BEFORE PRODUCTION
//
// This module provides a frontend-only bypass that lets you visually inspect
// the application UI during local development WITHOUT logging in.
//
// HOW IT WORKS
// - On local dev builds (`vite dev`), `UI_PREVIEW_ENABLED` is `true` and the
//   auth context is seeded with a minimal mock "teacher" user. This makes the
//   route guards (`RequireAuth`, `RequireRole`) pass and gives pages the user
//   context they need to render.
// - On production builds (`vite build` -> `import.meta.env.DEV === false`) this
//   is always disabled, so the real authentication flow is unchanged.
//
// TO DISABLE/REMOVE
// 1. Quick toggle without editing code: start the dev server with
//        VITE_UI_PREVIEW=false npm run dev
// 2. Permanently remove: set `UI_PREVIEW_ENABLED` to `false` here, OR delete
//    this file and delete the `usePreviewUser` usage in `auth-context.tsx`.
//
// No credentials, tokens, JWTs or secrets are used or printed anywhere.

import type { AuthUser } from '@/features/auth/services/auth.service';

/** Active only during local Vite dev, and never in production builds. */
export const UI_PREVIEW_ENABLED: boolean =
  import.meta.env.DEV && import.meta.env.VITE_UI_PREVIEW !== 'false';

/** Minimal mock authenticated user reused from the existing AuthUser type. */
export const previewUser: AuthUser | null = UI_PREVIEW_ENABLED
  ? {
      id: 'local-preview-user',
      name: 'Preview Teacher',
      email: 'preview@prerana.local',
      role: 'teacher',
      isActive: true,
      createdAt: new Date(0).toISOString(),
      updatedAt: new Date(0).toISOString(),
    }
  : null;

