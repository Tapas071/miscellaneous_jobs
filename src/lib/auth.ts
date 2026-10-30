import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

const secret = process.env.BETTER_AUTH_SECRET;
const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";
const configuredBaseURL = process.env.BETTER_AUTH_URL;

if (!secret && process.env.NODE_ENV === "production" && !isProductionBuild) {
  throw new Error("BETTER_AUTH_SECRET must be set in production.");
}

if (!configuredBaseURL && process.env.NODE_ENV === "production" && !isProductionBuild) {
  throw new Error("BETTER_AUTH_URL must be set in production.");
}

export const auth = betterAuth({
  // Next evaluates route modules during `next build`; this fallback is only for
  // that build phase. A deployed production server must provide the real secret.
  secret: secret ?? (isProductionBuild ? "build-only-secret-not-for-runtime-000000000000" : undefined),
  baseURL: configuredBaseURL ?? (isProductionBuild
    ? "http://localhost:3000"
    : {
        allowedHosts: ["localhost", "127.0.0.1"],
        fallback: "http://localhost:3000",
        protocol: "http",
      }),
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),
  emailAndPassword: { enabled: true },
  plugins: [openAPI()],
  user: {
    additionalFields: {
      role: { type: "string", required: false, defaultValue: "user", input: false },
    },
  },
  trustedOrigins: configuredBaseURL ? [configuredBaseURL] : (isProductionBuild ? ["http://localhost:3000"] : []),
});