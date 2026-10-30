import Link from "next/link";
import { SwaggerReference } from "@/components/SwaggerReference";

export default function ApiDocsPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-8">
        <Link href="/" className="text-sm font-extrabold tracking-[0.16em] text-teal-900">DAYMARK</Link>
        <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-teal-800">Back to home</Link>
      </header>
      <div className="mx-auto max-w-7xl px-3 py-8 sm:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">API documentation</h1>
          <p className="mt-2 text-slate-600">Authentication endpoints are generated from the active Better Auth configuration.</p>
          <p className="mt-2 text-sm text-slate-500">OpenAPI JSON: <Link className="text-teal-800 underline" href="/api/auth/open-api/generate-schema">/api/auth/open-api/generate-schema</Link></p>
          <p className="mt-1 text-sm text-slate-500">REST Client requests: open the workspace file <strong>api-tests.rest</strong> in VS Code.</p>
        </div>
        <SwaggerReference />
      </div>
    </main>
  );
}