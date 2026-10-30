# Daymark and small utilities

Daymark is a personal daily-tracking app built with Next.js, Better Auth, Drizzle ORM, and Neon Postgres. It supports email/password accounts and private check-ins for meditation, wake-up/bedtime, completed tasks, water, and notes. The existing QR generator and memory-game routes remain available.

## Local setup

1. Configure `.env` with `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL`. See `.sample.env` for variable names; never commit real environment values.
2. Install project dependencies with `npm install`.
3. Generate and apply the database migration with `npm run db:generate` and `npm run db:migrate`.
4. Run `npm run dev`, then create an account at `/sign-up` and visit `/dashboard`.

See [ACTION_PLAN.md](ACTION_PLAN.md) for deployment steps, security boundaries, and the next product increments.

## API reference and smoke checks

- Swagger UI: visit `/api-docs` after starting the app.
- OpenAPI JSON: `/api/auth/open-api/generate-schema`.
- REST Client request inventory and smoke calls: [api-tests.rest](api-tests.rest).
- The only HTTP route handler is Better Auth's `/api/auth/*` catch-all. Daily tracking uses authenticated Next.js Server Actions, not a separately published REST API.
