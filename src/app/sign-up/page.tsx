import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export default function SignUpPage() {
  return <main className="auth-shell"><div className="auth-card"><Link href="/" className="text-sm font-bold tracking-wide text-teal-800">DAYMARK</Link><p className="eyebrow mt-8">A BETTER DAILY RHYTHM</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Start with one day.</h1><p className="mt-3 mb-8 text-slate-500">Create an account and build a routine that feels like yours.</p><AuthForm mode="sign-up" /></div></main>;
}