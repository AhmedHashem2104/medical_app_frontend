# Role Definitions — MedAdmin

This document describes the three system roles, their responsibilities, and their intended access scope.

---

## Admin

**Who:** System administrator, clinic director, or IT manager.

**Responsibilities:**
- Full read/write access to all system resources
- Manage user accounts: create, update, deactivate users of any role
- Assign roles (`admin`, `doctor`, `staff`) to users
- Manage organizations: create, edit, deactivate clinic/hospital records, configure services and appointment modes
- Manage categories (visit/service categories)
- View all visits, schedules, and transactions across the entire system
- View all notifications
- Access application settings (appearance, API mode)
- Audit trail visibility — can see who created/updated records

**Access summary:** Everything. No restrictions.

---

## Doctor

**Who:** Licensed medical practitioner registered in the system.

**Responsibilities:**
- View and manage their own schedule (availability, time slots, days of week)
- View visits assigned to them — scheduled, in-progress, completed, cancelled
- View patient profiles associated with their visits
- Record visit outcomes and notes
- View transactions related to their visits (read-only)
- Receive and read notifications sent to them
- Update their own profile

**Access summary:** Own schedule + own visits + related patient data. Cannot manage users, organizations, or system-wide settings.

---

## Staff

**Who:** Front-desk staff, clinic coordinator, billing administrator.

**Responsibilities:**
- Create and manage appointments/visits on behalf of doctors or patients
- View all schedules (to book against available slots)
- View and search patient/user records (read-only, no role changes)
- Process and record transactions (payments, refunds)
- View all organizations and their contact information
- Manage categories (can create/edit visit categories)
- Receive and read notifications
- Update their own profile

**Access summary:** Operational access — scheduling, billing, and patient lookup. Cannot manage user accounts, assign roles, or change system settings.

---

## Login Methods

Both login methods authenticate the **same account**:

| Method | Flow |
|---|---|
| **Email + Password** | User enters email and password → redirected to dashboard (or OTP page if 2FA is enabled on the account) |
| **Phone + OTP** | User enters phone number → OTP sent via SMS → user enters 6-digit code on OTP page → redirected to dashboard |

The phone number must be registered on the user's account. Both methods resolve to the same `userId` and `role`.

---

## Role Enforcement

Role-based access is enforced at two levels:

1. **API level** — the backend validates the JWT role claim and rejects unauthorized operations.
2. **Frontend level** — UI elements and routes are conditionally rendered based on `role` from the auth store (soft enforcement; API is the source of truth).

Future work: add a `useRoleGuard(requiredRole)` hook and a `<RoleGate>` component to declaratively hide sections of the UI per role.
