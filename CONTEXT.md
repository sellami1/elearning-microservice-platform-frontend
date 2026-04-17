# E-Learning Frontend Context

## Project Snapshot
- Frontend app: `elearning-microservice-platform-frontend`
- Status: Freshly initialized Next.js app (App Router)
- Stack: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- Goal: Build a role-based e-learning web app for learners and instructors

## Platform Architecture (Microservices)
The frontend will consume three backend services:

1. User Service
	- Purpose: authentication, registration, profile and account management
	- Contract source: `elearning-microservice-platform-backend/backend/user-service/REST_API_CONTRACT.md`
2. Course Service
	- Purpose: course catalog, instructor course management, enrollments, lessons
	- Contract source: `elearning-microservice-platform-backend/backend/course-service/REST_API_CONTRACT.md`
3. Analytics Service
	- Purpose: event tracking and course metrics
	- Contract source: `elearning-microservice-platform-backend/backend/analytics-service/REST_API_CONTRACT.md`

## Product Model
- Roles: `learner` and `instructor`
- Platform behavior is role-based (different capabilities and UI per role)
- Access control should follow API contracts and JWT role claims

## Current Delivery Scope (Phase 1)
Focus only on consuming the User Service.

In scope now:
- User registration
- Email verification and verification resend
- Login
- Forgot/reset password
- Authenticated user profile retrieval (`/me`)
- Authenticated profile updates (`/update-me`)
- Authenticated email update flow
- Authenticated password update flow

Out of scope for now:
- Course browsing, enrollment, lesson consumption/authoring
- Analytics event emission and metrics dashboards

## User Service Integration Contract (Frontend-Relevant)
Base mount: `/api/v1/users`

### Auth Model
- Auth header format: `Authorization: Bearer <jwt>`
- JWT carries: `userId`, `role`
- Protected endpoints require valid token, existing user, and verified account

### Public Endpoints to Wire First
- `POST /register`
- `PUT /verify-email/{token}`
- `POST /resend-verification-email`
- `POST /login`
- `POST /forgotPassword`
- `PUT /resetPassword/{token}`

### Private Endpoints to Wire First
- `GET /me`
- `PUT /update-me`
- `POST /request-email-update`
- `PUT /verify-email-update/{token}`
- `PUT /update-my-password`

### Error Handling Rules
- Validation errors may return:
  - `400` with `errors: [{ type, msg, path, location }]`
- Business/auth/rate-limit errors may return:
  - `400`, `401`, `403`, `404`, `429`, `500`
  - body shape: `{ status: "fail|error", message: "..." }`

Frontend should normalize these shapes into one UI-friendly error model.

## Frontend RBAC Direction
- `learner`
  - can access learner experience and learner-only actions
- `instructor`
  - can access instructor experience and instructor-only actions

During phase 1, role usage is mainly for:
- post-login routing
- route protection
- conditional navigation/menu rendering

## Initial Frontend Technical Direction
- Use a centralized API client layer for User Service calls
- Store JWT securely for session continuity (implementation strategy to be finalized)
- Build auth-aware route guards for protected screens
- Keep role and auth state accessible via shared app state/context
- Keep service base URL configurable via environment variables

Suggested env names:
- `NEXT_PUBLIC_USER_SERVICE_URL`
- `NEXT_PUBLIC_COURSE_SERVICE_URL` (reserved for later phases)
- `NEXT_PUBLIC_ANALYTICS_SERVICE_URL` (reserved for later phases)

## Phase 1 Deliverables
1. Auth screens and flows
	- Register
	- Login
	- Email verification callback page
	- Forgot password
	- Reset password
2. Account screens
	- Profile view/edit
	- Update password
	- Request email change + verify email change callback
3. Auth infrastructure
	- User Service API module
	- Auth state/session management
	- Route guards (authenticated + role-aware)
	- Global error handling for API contracts

## Deferred to Phase 2+
- Course discovery and course details
- Instructor course CRUD
- Enrollment workflows and lesson access
- Analytics event tracking and reporting pages

## Notes for Contributors
- Treat this context as the current source of truth for frontend scope.
- Keep role-based behavior aligned with backend JWT claims and contracts.
- Do not implement Course/Analytics integrations until phase 1 User Service integration is stable.
