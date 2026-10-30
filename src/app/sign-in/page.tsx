import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export default function SignInPage() {
  return <main className="auth-shell"><div className="auth-card"><Link href="/" className="text-sm font-bold tracking-wide text-teal-800">DAYMARK</Link><p className="eyebrow mt-8">WELCOME BACK</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Make today count.</h1><p className="mt-3 mb-8 text-slate-500">Sign in to pick up where you left off.</p><AuthForm mode="sign-in" /></div></main>;
}