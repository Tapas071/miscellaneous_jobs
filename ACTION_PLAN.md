# Daymark authentication and daily tracking action plan

## Implemented foundation

- Better Auth email/password sign-up, sign-in, session handling, and sign-out.
- Drizzle ORM with the Neon serverless Postgres driver.
- Auth tables (`user`, `session`, `account`, `verification`) and a user-owned `daily_entry` table.
- Daily check-ins for meditation minutes, wake-up and bedtime, completed tasks, water, and notes. One entry per user/date can be updated.
- A protected dashboard, server-side session checks, ownership-scoped queries/writes, role field/helper, and an early navigation middleware check.
- Public landing page and a first pass at sign-in/sign-up and dashboard experiences.

## Setup before first run

1. Keep the existing `.env` private; never commit it. Confirm it contains `DATABASE_URL` for Neon. Add `BETTER_AUTH_SECRET` (a cryptographically random secret, at least 32 characters) and `BETTER_AUTH_URL` (the deployed origin; use `http://localhost:3000` locally).
2. Generate migrations with `npm run db:generate` and apply them to the intended Neon database with `npm run db:migrate`. Signup needs the `user`, `account`, `session`, and `verification` tables to exist first.
3. Start the app with `npm run dev`, create a test account, and verify sign-in, sign-out, session expiry, and dashboard redirects.
4. Verify entries persist across reloads and that two different accounts cannot read or alter each other's entries. Test date uniqueness and update behavior.
5. Before deployment, set the production auth secret and canonical HTTPS URL, restrict trusted origins, enable email verification/password recovery, and configure rate limiting and monitoring.

## Next product increments

1. **Routine insights:** add weekly/monthly charts, streaks, goals, and timezone-aware date handling. Make all metrics opt-in and explain how they are calculated.
2. **Personalization:** allow users to configure tracking fields, reminders, preferred units, and a daily check-in time.
3. **Privacy controls:** add export/delete-account workflows, retention policy, and clear privacy/terms pages. Do not expose private check-in data publicly by default.
4. **Authorization:** decide whether admin roles are needed; if so, add a real admin route and enforce role checks server-side for every protected operation. Never rely on middleware or a client-side role value as the authorization boundary.
5. **Quality:** add tests for auth redirects, validation limits, record ownership, duplicate dates, and database failures; add accessibility and responsive UI checks.

## Current boundaries and follow-ups

- Middleware only checks for the Better Auth session cookie to provide a quick redirect. It is not proof of a valid session; `requireUser()` verifies the session on the server in protected pages/actions.
- `role` defaults to `user` and is not user-editable. An admin experience is not included yet.
- Email verification and password reset require an email provider and are not enabled/configured in this foundation.
- The dashboard shows recent entries and a simple meditation average; analytics and timezone preferences remain follow-up work.