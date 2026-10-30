import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth-session";

export async function requireRole(role: "admin") {
  const session = await requireUser();
  if ((session.user as typeof session.user & { role?: string }).role !== role) {
    redirect("/dashboard");
  }
  return session;
}