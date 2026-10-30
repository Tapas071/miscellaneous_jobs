import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { db } from "@/lib/db";
import { dailyEntries } from "@/lib/db/schema";
import { requireUser } from "@/lib/auth-session";
import { DailyEntryForm } from "@/components/DailyEntryForm";
import { SignOutButton } from "@/components/SignOutButton";

function displayTime(value: string | null) {
  if (!value) return "—";
  const [hour, minute] = value.split(":").map(Number);
  return new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(new Date(2000, 0, 1, hour, minute));
}

export default async function DashboardPage() {
  const session = await requireUser();
  const entries = await db.select().from(dailyEntries).where(eq(dailyEntries.userId, session.user.id)).orderBy(desc(dailyEntries.entryDate)).limit(14);
  const today = new Date().toLocaleDateString("en-CA");
  const averageMeditation = entries.length ? Math.round(entries.reduce((sum, entry) => sum + entry.meditationMinutes, 0) / entries.length) : 0;
  return (
    <main className="min-h-screen bg-[#f7f8f5] text-slate-900">
      <header className="border-b border-slate-200/80 bg-white/80"><div className="page-width flex items-center justify-between py-5"><Link href="/" className="text-sm font-extrabold tracking-[0.16em] text-teal-900">DAYMARK</Link><div className="flex items-center gap-4"><span className="hidden text-sm text-slate-500 sm:block">{session.user.name}</span><SignOutButton /></div></div></header>
      <div className="page-width py-12">
        <p className="eyebrow">YOUR PERSONAL SPACE</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">A little better, every day.</h1><p className="mt-3 text-slate-500">Notice your patterns. Celebrate showing up.</p>
        <section className="mt-9 grid gap-4 sm:grid-cols-3"><article className="stat-card"><span className="stat-label">Check-ins logged</span><strong>{entries.length}</strong><span className="text-sm text-slate-500">Latest 14 entries</span></article><article className="stat-card"><span className="stat-label">Daily meditation average</span><strong>{averageMeditation}<small> min</small></strong><span className="text-sm text-slate-500">Across logged days</span></article><article className="stat-card"><span className="stat-label">Keep your streak alive</span><strong>Today</strong><span className="text-sm text-slate-500">One check-in at a time</span></article></section>
        <section className="surface-card mt-8"><div className="mb-7"><p className="eyebrow">DAILY REFLECTION</p><h2 className="mt-2 text-2xl font-semibold">How was your day?</h2><p className="mt-2 text-sm text-slate-500">Save one check-in per date. You can update it any time.</p></div><DailyEntryForm today={today} /></section>
        <section className="mt-10"><div className="mb-5 flex items-end justify-between"><div><p className="eyebrow">YOUR HISTORY</p><h2 className="mt-2 text-2xl font-semibold">Recent check-ins</h2></div><span className="text-sm text-slate-500">Latest 14 days</span></div>
          {entries.length === 0 ? <div className="surface-card py-10 text-center text-slate-500">Your first check-in is a great place to start.</div> : <div className="space-y-3">{entries.map((entry) => <article key={entry.id} className="surface-card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold">{new Intl.DateTimeFormat("en", { dateStyle: "full", timeZone: "UTC" }).format(new Date(`${entry.entryDate}T00:00:00Z`))}</p>{entry.notes && <p className="mt-1 max-w-2xl text-sm text-slate-500">{entry.notes}</p>}</div><div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-600 sm:grid-cols-4"><span>🧘 {entry.meditationMinutes} min</span><span>☀️ {displayTime(entry.wakeUpTime)}</span><span>🌙 {displayTime(entry.bedTime)}</span><span>✓ {entry.tasksCompleted} tasks · 💧 {entry.waterGlasses}</span></div></article>)}</div>}
        </section>
      </div>
    </main>
  );
}