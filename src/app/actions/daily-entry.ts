"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { dailyEntries } from "@/lib/db/schema";
import { requireUser } from "@/lib/auth-session";

const entrySchema = z.object({
  entryDate: z.iso.date(),
  meditationMinutes: z.coerce.number().int().min(0).max(1440),
  wakeUpTime: z.union([z.literal(""), z.iso.time({ precision: -1 })]).optional(),
  bedTime: z.union([z.literal(""), z.iso.time({ precision: -1 })]).optional(),
  tasksCompleted: z.coerce.number().int().min(0).max(1000),
  waterGlasses: z.coerce.number().int().min(0).max(100),
  notes: z.string().max(2000),
});

export async function saveDailyEntry(_previousState: unknown, formData: FormData) {
  const session = await requireUser();
  const input = entrySchema.safeParse(Object.fromEntries(formData.entries()));
  if (!input.success) return { error: "Please check the entry and try again." };

  const { entryDate, meditationMinutes, wakeUpTime, bedTime, tasksCompleted, waterGlasses, notes } = input.data;
  await db
    .insert(dailyEntries)
    .values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      entryDate,
      meditationMinutes,
      wakeUpTime: wakeUpTime || null,
      bedTime: bedTime || null,
      tasksCompleted,
      waterGlasses,
      notes: notes.trim() || null,
    })
    .onConflictDoUpdate({
      target: [dailyEntries.userId, dailyEntries.entryDate],
      set: {
        meditationMinutes,
        wakeUpTime: wakeUpTime || null,
        bedTime: bedTime || null,
        tasksCompleted,
        waterGlasses,
        notes: notes.trim() || null,
        updatedAt: new Date(),
      },
    });

  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteDailyEntry(formData: FormData) {
  const session = await requireUser();
  const id = z.uuid().safeParse(formData.get("id"));
  if (!id.success) return { error: "Invalid entry." };

  await db.delete(dailyEntries).where(and(eq(dailyEntries.id, id.data), eq(dailyEntries.userId, session.user.id)));
  revalidatePath("/dashboard");
  return { success: true };
}