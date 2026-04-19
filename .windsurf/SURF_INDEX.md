# Frontend Surf Index

Quick-nav map for codebase crawling. Auto-generated conventions enforced on all new code.

## App Router Structure (@/app)

```
app/
├── page.tsx                    # Landing page (public)
├── layout.tsx                  # Root layout + providers
├── providers.tsx               # QueryClient + auth init
├── globals.css                 # Tailwind imports
├── (public)/                   # Unauthenticated routes
│   ├── layout.tsx              # PublicOnlyRoute wrapper
│   ├── login/page.tsx
│   ├── register/page.tsx
│   └── courses/                # Browse courses (public view)
│       ├── page.tsx
│       └── [courseId]/page.tsx
└── (protected)/                # Authenticated routes
    ├── layout.tsx              # ProtectedRoute wrapper
    ├── account/page.tsx        # Profile management
    ├── enrollments/page.tsx    # My courses (learner)
    └── instructor/             # Instructor dashboard
        ├── courses/page.tsx
        ├── courses/new/page.tsx
        ├── courses/[courseId]/edit/page.tsx
        ├── courses/[courseId]/lessons/page.tsx
        ├── courses/[courseId]/lessons/new/page.tsx
        └── courses/[courseId]/lessons/[lessonId]/edit/page.tsx
```

## Feature Modules (@/src/features)

Pattern: `features/{domain}/{api|hooks|schemas|components|types}.ts`

| Domain | API | Hooks | Schemas | Components |
|--------|-----|-------|---------|------------|
| **auth** | login.ts, register.ts | useLogin.ts, useRegister.ts | login.schema.ts, register.schema.ts | LoginForm.tsx, RegisterForm.tsx |
| **account** | getMe.ts, updateMe.ts | useMe.ts, useUpdateMe.ts | updateMe.schema.ts | ProfileForm.tsx |
| **course** | courses.ts, enrollments.ts, lessons.ts | useCourses.ts | course.schema.ts, enrollment.schema.ts, lesson.schema.ts | CourseCard.tsx, CourseList.tsx, CourseDetail.tsx, CourseForm.tsx, LessonForm.tsx, EnrollmentList.tsx, InstructorLessonManager.tsx |

## Core Lib (@/src/lib)

```
lib/
├── api/
│   ├── client.ts               # Axios + interceptors (Bearer token)
│   ├── course-client.ts          # Separate client for course service
│   ├── endpoints.ts              # User service URL builder
│   ├── course-endpoints.ts       # Course service URL builder
│   └── error.ts                  # normalizeError()
├── auth/
│   ├── token.ts                  # localStorage token CRUD
│   └── guards.ts                 # Role checking utils
├── config/
│   └── env.ts                    # NEXT_PUBLIC_* env vars
├── errors/
│   └── getErrorMessage.ts        # User-facing error messages
├── utils/
│   └── role.ts                   # Role type guards
└── theme.ts                      # Dark/light mode logic
```

## Shared Components (@/src/components)

| File | Purpose |
|------|---------|
| AuthenticatedTopbar.tsx | Nav header with auth state |
| ProtectedRoute.tsx | HOC for protected layouts |
| PublicOnlyRoute.tsx | HOC for auth-only pages (login/register) |
| ThemeBootstrap.tsx | Hydrates theme on mount |
| ThemeToggle.tsx | Dark/light toggle button |
| ui.tsx | Shared UI primitives (Button, Input, etc) |

## Store (@/src/store)

- `auth.store.ts` - Zustand + persist. Holds token, role, user, isAuthenticated.

## Conventions Checklist

- [ ] **Imports**: Use `@/src/...` path alias (never relative `../../`)
- [ ] **API**: All axios calls go through `apiClient` (auto-attaches Bearer)
- [ ] **Hooks**: React Query mutations wrapped in `features/{x}/hooks/`
- [ ] **Schemas**: Zod schemas in `features/{x}/schemas/`
- [ ] **Forms**: Use `react-hook-form` + `@hookform/resolvers/zod`
- [ ] **Types**: Export from `features/{x}/types.ts`, import across features
- [ ] **Routes**: Page components stay thin, delegate to feature components
- [ ] **Auth guards**: Use `ProtectedRoute`/`PublicOnlyRoute` wrappers in layouts
- [ ] **Error handling**: Use `normalizeError()` + `getErrorMessage()`
- [ ] **Styling**: Tailwind only, no CSS-in-JS

## Quick Snippets

### New Feature API Call

```ts
// src/features/x/api/action.ts
import { apiClient } from "@/src/lib/api/client";
import type { X } from "@/src/features/x/types";

export async function action(payload: X): Promise<X> {
  const { data } = await apiClient.post("/endpoint", payload);
  return data;
}
```

### New Hook

```ts
// src/features/x/hooks/useAction.ts
"use client";
import { useMutation } from "@tanstack/react-query";
import { action } from "@/src/features/x/api/action";

export function useAction() {
  return useMutation({ mutationFn: action });
}
```

### New Page (Protected)

```tsx
// app/(protected)/new/page.tsx
import { ProtectedRoute } from "@/src/components/ProtectedRoute";
import { FeatureComponent } from "@/src/features/x/components/FeatureComponent";

export default function NewPage() {
  return (
    <ProtectedRoute>
      <FeatureComponent />
    </ProtectedRoute>
  );
}
```

## Backend Services (Reference)

| Service | URL (dev) | Purpose |
|---------|-----------|---------|
| User Service | http://localhost:5000 | Auth, accounts |
| Course Service | http://localhost:5001 | Courses, lessons, enrollments |

Both use `/api/v1/` prefix.
