# Copilot Instructions Blueprint

## Mission
Build a role-based e-learning frontend with Next.js App Router, focusing only on Phase 1 User Service integration until explicitly expanded.

## Source of Truth
- Product and scope rules: CONTEXT.md
- Technical implementation baseline: TECHNICAL_CONTEXT_FRONTEND.md
- Service API contracts: .github/api-contracts
- Agent guardrails for this repository: AGENTS.md

If conflicts exist:
1. AGENTS.md (execution/runtime constraints)
2. CONTEXT.md (product scope)
3. TECHNICAL_CONTEXT_FRONTEND.md (implementation guidance)
4. .github/api-contracts (service contract source)

## API Contract Review Rule
When a prompt asks about consuming, wiring, calling, or implementing any API, first inspect the relevant contract file in .github/api-contracts before proposing code or behavior.

If the relevant contract is not yet available or is unclear, state that assumption explicitly and avoid inventing endpoint shapes, payloads, or error contracts.

## Mandatory Phase 1 Scope
Implement only User Service flows.

In scope:
- Register
- Verify email and resend verification
- Login
- Forgot password and reset password
- Authenticated profile retrieval and update
- Authenticated email update request and verification
- Authenticated password update

Out of scope (do not implement yet):
- Course Service integration
- Analytics Service integration
- Course browsing, enrollment, lessons, dashboards

## Backend Contracts To Follow
User Service base mount:
- /api/v1/users

Public endpoints:
- POST /register
- PUT /verify-email/{token}
- POST /resend-verification-email
- POST /login
- POST /forgotPassword
- PUT /resetPassword/{token}

Private endpoints:
- GET /me
- PUT /update-me
- POST /request-email-update
- PUT /verify-email-update/{token}
- PUT /update-my-password

Auth expectations:
- Authorization header format: Bearer JWT
- JWT claims include userId and role
- Protected flows require valid token and verified account

## Coding and Architecture Rules
- Keep pages thin and delegate business logic to feature modules.
- Keep endpoint calls in feature api modules only.
- Keep reusable HTTP transport logic in a central api client layer.
- Use a single HTTP client instance with request/response interceptors.
- Add Authorization header from session token on protected requests.
- Normalize backend error shapes into one frontend error model.
- Treat learner and instructor as first-class role variants in guards and UI decisions.
- Build with TypeScript-first, explicit typing on API payloads and responses.
- Keep service URLs environment-driven.

## Error Normalization Contract
Map backend errors into a unified app error shape:
- statusCode
- message
- optional fieldErrors[] with path and message

Mapping rules:
- Validation payloads with errors[] map to fieldErrors
- Payloads with status/message map to message
- Unknown/network failures map to a safe fallback message

## Environment Rules
Use these env variables:
- NEXT_PUBLIC_USER_SERVICE_URL (active in Phase 1)
- NEXT_PUBLIC_COURSE_SERVICE_URL (reserved)
- NEXT_PUBLIC_ANALYTICS_SERVICE_URL (reserved)

Do not hardcode backend URLs.

## Recommended Package Baseline
When implementing Phase 1 flows, prefer this stack:
- @tanstack/react-query
- axios
- zod
- react-hook-form
- @hookform/resolvers
- zustand
- jwt-decode
- sonner
- clsx

## RBAC and Guard Rules
- Unauthenticated users are redirected to login for protected routes.
- Authenticated users can be redirected away from auth-only pages.
- Post-login routing and navigation must be role-aware.
- Role is derived from JWT claims and aligned with backend contracts.

## Implementation Order (Default)
1. Foundation: env config, API client, auth store, token helpers
2. Auth flows: register, login, forgot/reset, verify/resend
3. Protected account flows: me, update-me, update password, email update flow
4. Hardening: toasts, loading/disabled states, contract-focused tests

## Definition of Done For Phase 1
- All listed User Service endpoints are integrated.
- Protected routes enforce authentication.
- Role claim is available and used for role-aware behavior.
- Validation and API errors are surfaced consistently in forms.
- Core success/failure paths are covered by tests.

## Contribution Guardrails For Copilot Responses
- Refuse to add Course/Analytics integrations unless user explicitly changes phase scope.
- Prefer minimal, focused edits over large refactors.
- Preserve existing project patterns unless they conflict with explicit scope/contract requirements.
- Mention assumptions when backend contract details are missing.
- Keep generated code production-oriented: typed, testable, and error-aware.

## Next.js Version Note
This project uses a Next.js version with potentially breaking differences from older conventions.
Before introducing framework-level patterns, verify behavior against current local Next.js docs in node_modules/next/dist/docs/.
