# User Service — Data Models

## User
**Collection:** `users` <!-- confirm -->

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| email | String | Yes | — | unique, lowercase, trimmed |
| password | String | Yes | — | min length 8, `select: false` |
| role | String | Yes | learner | enum: `learner`, `instructor` |
| profile.firstName | String | Yes | — | trimmed |
| profile.lastName | String | Yes | — | trimmed |
| profile.phone | String | Yes | — | trimmed |
| profile.avatar | String | Yes | /media/users/default-avatar.jpg | stored path; post-init may prepend backend URL |
| profile.dateOfBirth | Date | No | — | optional |
| address.street | String | Yes | — | trimmed |
| address.city | String | Yes | — | trimmed |
| address.state | String | Yes | — | trimmed |
| address.country | String | Yes | — | trimmed |
| address.zipCode | String | Yes | — | trimmed |
| isVerified | Boolean | No | false | account verification state |
| lastLogin | Date | No | — | last successful login |
| emailVerificationToken | String | No | — | hashed token |
| emailVerificationTokenExpires | Date | No | — | token expiry |
| passwordChangedAt | Date | No | — | used to invalidate older JWTs |
| passwordResetToken | String | No | — | hashed token |
| passwordResetTokenExpires | Date | No | — | token expiry |
| pendingEmail | String | No | — | lowercased, trimmed |
| emailUpdateToken | String | No | — | hashed token |
| emailUpdateTokenExpires | Date | No | — | token expiry |
| createdAt | Date | Auto | now | from timestamps |
| updatedAt | Date | Auto | now | from timestamps |

## Rules
- Pre-save hook: hashes `password` with bcrypt (salt rounds 10) when modified
- Virtual fields: none defined
- Indexes: `{ role: 1 }` and unique index on `email`

## Exposed vs Internal Fields
**Never expose:** `password`, token fields (`emailVerificationToken`, `passwordResetToken`, `emailUpdateToken`), token expiry fields, `pendingEmail`
**Always expose:** `_id`, `email`, `role`, `profile`, `address`, `isVerified`, `createdAt`, `updatedAt`
