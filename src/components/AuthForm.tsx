"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const isSignUp = mode === "sign-up";

  async function submit(formData: FormData) {
    setError("");
    setBusy(true);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const result = isSignUp
      ? await authClient.signUp.email({ name: String(formData.get("name") ?? ""), email, password })
      : await authClient.signIn.email({ email, password });
    setBusy(false);
    if (result.error) {
      setError(result.error.message ?? "Authentication failed. Please try again.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form action={submit} className="space-y-5">
      {isSignUp && <label className="block text-sm font-medium text-slate-700">Your name<input name="name" required autoComplete="name" className="form-input mt-2" placeholder="Alex Morgan" /></label>}
      <label className="block text-sm font-medium text-slate-700">Email address<input name="email" type="email" required autoComplete="email" className="form-input mt-2" placeholder="you@example.com" /></label>
      <label className="block text-sm font-medium text-slate-700">Password<input name="password" type="password" required minLength={8} autoComplete={isSignUp ? "new-password" : "current-password"} className="form-input mt-2" placeholder="At least 8 characters" /></label>
      {error && <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
      <button disabled={busy} className="w-full rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:opacity-60">{busy ? "Please wait…" : isSignUp ? "Create account" : "Sign in"}</button>
      <p className="text-center text-sm text-slate-500">{isSignUp ? "Already have an account? " : "New to Daymark? "}<Link className="font-semibold text-teal-800 hover:underline" href={isSignUp ? "/sign-in" : "/sign-up"}>{isSignUp ? "Sign in" : "Create an account"}</Link></p>
    </form>
  );
}