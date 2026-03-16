# Missed / Unmatched APIs

This document tracks APIs from the OpenAPI spec that are **not used** in the frontend,
and frontend-only API calls that have **no corresponding spec endpoint**.

---

## 1. Spec endpoints with no matching business use in this frontend

These endpoints exist in the backend spec but the frontend does not consume or expose
UI for them (they are low-level infrastructure not surfaced to the super-admin dashboard).

| Endpoint | Reason not used |
|---|---|
| `GET /health` | Server health check — not needed in UI |

---

## 2. Frontend API calls NOT present in the OpenAPI spec

These calls exist in the frontend code but have no matching route in the spec.
They may be planned, removed, or belong to a different API version.

### Auth (src/api/auth.ts)

| Frontend call | Notes |
|---|---|
| `POST /auth/phone-login` | Phone-based login flow — not in spec |
| `POST /auth/verify-otp` | OTP verification step — not in spec |
| `POST /auth/resend-otp` | OTP resend — not in spec |
| `POST /auth/logout` | Logout endpoint — not in spec |

> The spec only defines `POST /auth/signup` and `POST /auth/signin`.
> The frontend's `login()` was previously calling `/auth/login`; it now calls `/auth/signin`.

### Notifications (src/api/notifications.ts)

| Frontend call | Notes |
|---|---|
| `PATCH /notifications/{id}/read` | Mark single notification read — not in spec |
| `PATCH /notifications/read-all` | Mark all notifications read — not in spec |

> The spec defines full CRUD via `PUT /notifications/{id}` and `DELETE /notifications/{id}`.
> The read-marking helpers are kept for backward compatibility with the existing UI.

### Dashboard (src/api/dashboard.ts)

| Frontend call | Notes |
|---|---|
| `GET /dashboard/stats` | Aggregate stats — not in spec |
| `GET /dashboard/appointments` | Appointments over time chart data — not in spec |
| `GET /dashboard/payment-status` | Payment status breakdown — not in spec |

> These dashboard aggregation endpoints are needed by the UI but missing from the spec.
> They are currently mock-only and should be added to the backend spec.

---

## 3. Spec schemas with incomplete / empty definitions

These resources are in the spec but their schema only has an `id` field.
The frontend uses richer types derived from business requirements.

| Resource | Spec schema fields | Frontend type adds |
|---|---|---|
| `Category` | `id` only | `name`, `description`, `isActive`, `createdAt`, `updatedAt` |
| `Log` | `id` only | `createdAt`, `updatedAt` |
| `Notification` | `id` only | `userId`, `title`, `message`, `type`, `isRead`, `createdAt` |

---

## 4. HTTP method mismatches (spec vs original frontend)

The spec uses `PUT` for all updates. The original frontend used `PATCH`.
All API files have been updated to use `PUT` for real API calls.

| Resource | Original method | Spec method | Status |
|---|---|---|---|
| Users | `PATCH /users/{id}` | `PUT /users/{id}` | Fixed |
| Organizations | `PATCH /organizations/{id}` | `PUT /organizations/{id}` | Fixed |
| Schedules | `PATCH /schedules/{id}` | `PUT /schedules/{id}` | Fixed |
| Visits | `PATCH /visits/{id}` | `PUT /visits/{id}` | Fixed |
| Transactions | `PATCH /transactions/{id}` | `PUT /transactions/{id}` | Fixed |
| Categories | `PATCH /categories/{id}` | `PUT /categories/{id}` | Fixed |
| Notifications | `PATCH /notifications/{id}` | `PUT /notifications/{id}` | Fixed |
| Profiles | N/A (new) | `PUT /profiles/{id}` | Implemented |
| History | N/A (new) | `PUT /history/{id}` | Implemented |
| Logs | N/A (new) | `PUT /logs/{id}` | Implemented |
| OTPs | N/A (new) | `PUT /otps/{id}` | Implemented |
