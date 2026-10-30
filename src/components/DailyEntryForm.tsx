"use client";

import { useActionState } from "react";
import { saveDailyEntry } from "@/app/actions/daily-entry";

const initialState: { success?: boolean; error?: string } = {};

export function DailyEntryForm({ today }: { today: string }) {
  const [state, action, pending] = useActionState(saveDailyEntry, initialState);
  return (
    <form action={action} className="grid gap-5 sm:grid-cols-2">
      <label className="field-label">Date<input className="form-input mt-2" name="entryDate" type="date" defaultValue={today} required /></label>
      <label className="field-label">Meditation (minutes)<input className="form-input mt-2" name="meditationMinutes" type="number" min="0" max="1440" defaultValue="0" required /></label>
      <label className="field-label">Wake-up time<input className="form-input mt-2" name="wakeUpTime" type="time" /></label>
      <label className="field-label">Bedtime<input className="form-input mt-2" name="bedTime" type="time" /></label>
      <label className="field-label">Tasks completed<input className="form-input mt-2" name="tasksCompleted" type="number" min="0" max="1000" defaultValue="0" required /></label>
      <label className="field-label">Glasses of water<input className="form-input mt-2" name="waterGlasses" type="number" min="0" max="100" defaultValue="0" required /></label>
      <label className="field-label sm:col-span-2">Notes<textarea className="form-input mt-2 min-h-24 resize-y" name="notes" maxLength={2000} placeholder="What went well today?" /></label>
      <div className="sm:col-span-2">
        <button disabled={pending} className="rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-teal-800 disabled:opacity-60">{pending ? "Saving…" : "Save daily check-in"}</button>
        {state.error && <p role="alert" className="mt-3 text-sm text-rose-700">{state.error}</p>}
        {state.success && <p role="status" className="mt-3 text-sm text-teal-800">Your daily check-in is saved.</p>}
      </div>
    </form>
  );
}