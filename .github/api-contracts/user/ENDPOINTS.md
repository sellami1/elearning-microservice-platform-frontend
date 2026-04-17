# User Service — Endpoints
For morte details about the API contract, see [User Service REST API Contract](./USER_REST_API_CONTRACT.md).

Base URL: `http://localhost:8002` <!-- confirm -->

## Auth Routes `/auth`
| Method | Path | Auth | Role | Description |
|--------|------|------|------|-------------|
| POST | /users/register | No | Any | Register user and send verification email |
| PUT | /users/verify-email/:token | No | Any | Verify email using token |
| POST | /users/resend-verification-email | No | Any | Resend verification email |
| POST | /users/login | No | Any | Login with email and password |
| POST | /users/forgotPassword | No | Any | Request password reset link |
| PUT | /users/resetPassword/:token | No | Any | Reset password and issue token |

---
## User Routes `/users`
| Method | Path | Auth | Role | Description |
|--------|------|------|------|-------------|
| GET | /users/me | Yes | Any authenticated + verified user | Get current user profile |
| PUT | /users/update-me | Yes | Any authenticated + verified user | Update current user profile/address |
| POST | /users/request-email-update | Yes | Any authenticated + verified user | Request account email change |
| PUT | /users/verify-email-update/:token | Yes | Any authenticated + verified user | Confirm pending email update |
| PUT | /users/update-my-password | Yes | Any authenticated + verified user | Change password and issue new token |
