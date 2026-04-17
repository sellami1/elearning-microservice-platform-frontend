# Technical Context - Next.js Frontend (Phase 1: User Service)

## 1) Scope and Intent
This document defines the initial technical setup for the frontend project:
- Project: `elearning-microservice-platform-frontend`
- Framework: Next.js App Router
- Primary integration scope: User Service only
- Product model: role-based (`learner`, `instructor`)

This context is meant to be actionable for implementation and onboarding.

## 2) Current Dependency Baseline (from package.json)
Already present in the project:

### Runtime
- `next` (16.2.2)
- `react` (19.2.4)
- `react-dom` (19.2.4)

### Development
- `typescript`
- `eslint`, `eslint-config-next`
- `tailwindcss`, `@tailwindcss/postcss`
- `@types/node`, `@types/react`, `@types/react-dom`

These are enough to start, but not enough for efficient API contract consumption and auth-heavy forms.

## 3) Recommended Additional Packages

### Runtime packages
1. `axios`
   - Why: centralized HTTP client with interceptors for JWT and normalized API errors.
2. `zod`
   - Why: runtime validation/parsing of API payloads and UI form schemas.
3. `react-hook-form`
   - Why: performant form state for login/register/reset/update flows.
4. `@hookform/resolvers`
   - Why: direct Zod integration with React Hook Form.
5. `zustand`
   - Why: lightweight auth/session store (token, role, current user snapshot).
6. `jwt-decode`
   - Why: client-side extraction of JWT claims (`userId`, `role`, `exp`) for guard logic.
7. `sonner`
   - Why: clean toast notifications for success/error feedback.
8. `clsx`
   - Why: conditional class composition in UI components.

## 4) Install Commands

Runtime:
```bash
npm install @tanstack/react-query axios zod react-hook-form @hookform/resolvers zustand jwt-decode sonner clsx
```

## 5) Initial Project Structure (Simple and Scalable)
Suggested structure for App Router + feature modules:

```text
elearning-microservice-platform-frontend/
  app/
    (public)/
      login/page.tsx
      register/page.tsx
      forgot-password/page.tsx
      reset-password/[token]/page.tsx
      verify-email/[token]/page.tsx
    (protected)/
      account/page.tsx
      account/security/page.tsx
      request-email-update/page.tsx
      verify-email-update/[token]/page.tsx
    layout.tsx
    page.tsx
    providers.tsx

  src/
    features/
      auth/
        api/
          login.ts
          register.ts
          forgotPassword.ts
          resetPassword.ts
          verifyEmail.ts
          resendVerification.ts
        schemas/
          login.schema.ts
          register.schema.ts
          forgotPassword.schema.ts
          resetPassword.schema.ts
        hooks/
          useLogin.ts
          useRegister.ts
        components/
          LoginForm.tsx
          RegisterForm.tsx
        types.ts

      account/
        api/
          getMe.ts
          updateMe.ts
          requestEmailUpdate.ts
          verifyEmailUpdate.ts
          updateMyPassword.ts
        schemas/
          updateMe.schema.ts
          updateMyPassword.schema.ts
        hooks/
          useMe.ts
          useUpdateMe.ts
        components/
          ProfileForm.tsx
          PasswordForm.tsx
        types.ts

    lib/
      api/
        client.ts
        error.ts
        endpoints.ts
      auth/
        token.ts
        guards.ts
      config/
        env.ts
      utils/
        role.ts

    store/
      auth.store.ts

    middleware.ts

  public/
  package.jsonV
```

Notes:
- Keep endpoint calls in `features/*/api` only.
- Keep reusable low-level transport logic in `src/lib/api`.
- Keep page files thin; use feature components/hooks.

## 6) Environment Configuration
Use these variables from day 1:

```env
NEXT_PUBLIC_USER_SERVICE_URL=http://localhost:5000
NEXT_PUBLIC_COURSE_SERVICE_URL=
NEXT_PUBLIC_ANALYTICS_SERVICE_URL=
```

Phase 1 consumes only `NEXT_PUBLIC_USER_SERVICE_URL`.

## 7) User Service Contract Mapping
Base path: `/api/v1/users`

### Public endpoints to implement first
- `POST /register`
- `PUT /verify-email/{token}`
- `POST /resend-verification-email`
- `POST /login`
- `POST /forgotPassword`
- `PUT /resetPassword/{token}`

### Private endpoints to implement first
- `GET /me`
- `PUT /update-me`
- `POST /request-email-update`
- `PUT /verify-email-update/{token}`
- `PUT /update-my-password`

## 8) API Client and Error Strategy

### HTTP client rules
- One shared axios instance with base URL from env.
- Request interceptor adds `Authorization: Bearer <token>` when present.
- Response interceptor normalizes backend errors into a unified shape.

### Unified frontend error shape
```ts
type AppError = {
  statusCode: number;
  message: string;
  fieldErrors?: Array<{
    path: string;
    message: string;
  }>;
};
```

Mapping rules:
- If backend returns `errors[]` (validation): map to `fieldErrors`.
- If backend returns `{ status, message }`: map to `message`.
- Unknown/network errors: fallback message `Unexpected error. Please try again.`

## 9) Auth and RBAC Technical Direction

### Session state
- Store auth state in Zustand:
  - `token`
  - `user` (minimal profile)
  - `role`
  - `isAuthenticated`

### Guards
- Middleware and/or layout guards for protected routes.
- Redirect unauthenticated users to `/login`.
- Redirect authenticated users away from auth-only pages when appropriate.
- Role-aware rendering for instructor vs learner navigation.

### Post-login behavior
- Decode token claims (`userId`, `role`, `exp`).
- Optionally call `/me` immediately to hydrate full user state.

## 10) Phase 1 Implementation Order
1. Foundation
   - Install packages
   - Create env loader and API client
   - Create auth store and token helpers
2. Auth flows
   - Register
   - Login
   - Forgot/reset password
   - Email verification/resend
3. Protected account flows
   - Get profile (`/me`)
   - Update profile (`/update-me`)
   - Update password (`/update-my-password`)
   - Request and verify email update
4. Hardening
   - Global error handling + UX toasts
   - Loading/disabled states
   - Contract-focused tests with mocked responses

## 11) Non-Goals for Phase 1
- Course browsing/management integration
- Enrollment and lesson flows
- Analytics tracking or dashboards

## 12) Definition of Done (Phase 1)
- All user-service endpoints listed in this document are integrated.
- Authenticated routes are protected.
- Role claim is available for role-based UI switching.
- Validation and API errors are surfaced consistently in forms.
- Basic tests cover success and failure scenarios of core auth/account flows.