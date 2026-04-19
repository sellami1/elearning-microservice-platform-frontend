# Dark/Light Theme Switch

## How it was created

The theme switch was implemented as a lightweight, dependency-free system that works with the current Next.js App Router structure and avoids hydration issues.

### 1. Theme state lives in the browser only

The active theme is stored in `localStorage` under the `theme` key. The system supports two values only:
- `light`
- `dark`

If no value is stored, the system falls back to the user’s OS preference via `prefers-color-scheme`.

Implementation reference:
- [src/lib/theme.ts](../../src/lib/theme.ts)

### 2. Theme is applied before React hydrates

To prevent a flash of the wrong theme on first paint, a small inline bootstrap script runs in the root layout before the app fully hydrates. It:
- reads `localStorage.theme`
- falls back to the system preference
- sets `document.documentElement.dataset.theme`
- sets `document.documentElement.style.colorScheme`

This keeps the browser UI and native form controls aligned with the selected mode.

Implementation reference:
- [src/components/ThemeBootstrap.tsx](../../src/components/ThemeBootstrap.tsx)
- [app/layout.tsx](../../app/layout.tsx)

### 3. The toggle is a client component

The visible switch is a client component because it needs browser APIs and user interaction. It:
- reads the resolved theme on mount
- updates the DOM theme attribute immediately
- persists the selection in `localStorage`
- toggles between light and dark in one click

Implementation reference:
- [src/components/ThemeToggle.tsx](../../src/components/ThemeToggle.tsx)

### 4. Styling is driven by semantic CSS variables

The app uses CSS custom properties instead of hard-coded colors in key UI primitives. There are two variable sets:
- default values in `:root`
- dark overrides in `:root[data-theme="dark"]`

Core variables include:
- `--background`
- `--foreground`
- `--surface`
- `--border`
- `--muted-foreground`
- `--primary`
- `--primary-foreground`
- `--ring`

That lets components stay simple and theme-agnostic.

Implementation reference:
- [app/globals.css](../../app/globals.css)
- [src/components/ui.tsx](../../src/components/ui.tsx)

### 5. Shared UI components use the theme variables

Instead of restyling every page separately, shared building blocks were updated to consume the variables directly:
- `Card`
- `Input`
- `Label`
- `Button`
- `CourseCard`

This keeps the visual system consistent and minimizes duplicated styling logic. Hard-coded values like `text-slate-900`, `bg-white`, and `border-slate-200` were globally replaced with `text-[var(--foreground)]`, `bg-[var(--surface)]`, and `border-[var(--border)]` respectively.

### 6. Third-party components are theme-aware

External components like toasts (`sonner`) dynamically read the `data-theme` state using a `MutationObserver` in the providers layer, syncing the toast theme to automatically render darker error/success statuses for dark themes without reloading.

Implementation reference:
- [app/providers.tsx](../../app/providers.tsx)

### 7. The toggle is exposed in the topbar for everyone

The topbar is rendered from the root shell and includes the theme toggle so it is always visible. That means the switch is available on public, protected, learner, and instructor screens.

Implementation reference:
- [src/components/AuthenticatedTopbar.tsx](../../src/components/AuthenticatedTopbar.tsx)
- [app/layout.tsx](../../app/layout.tsx)

## Why this approach

This design was chosen because it is:
- simple: no third-party theme package required
- fast: theme is applied immediately, with no runtime theme provider overhead
- maintainable: colors are centralized in CSS variables
- safe for Next.js hydration: the initial theme is set before the app renders
- easy to extend: new components only need to use the shared variables

## Result

The app now supports a persistent, system-aware dark/light mode that is controlled from the topbar and does not break the current frontend structure.
