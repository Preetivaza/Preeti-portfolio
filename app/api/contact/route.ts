import { NextResponse as R } from "next/server";
import { db } from "@/lib/db";
export async function POST(req: Request) {
  const { name, email, message, website } = await req.json();
  if (website) return R.json({ ok: true }); // honeypot
  if (!name?.trim() || !/^\S+@\S+\.\S+$/.test(email || "") || (message || "").trim().length < 5) return R.json({ error: "Please fill in all fields." }, { status: 400 });
  await (await db()).collection("messages").insertOne({ name: name.slice(0, 100), email: email.slice(0, 120), message: message.slice(0, 3000), createdAt: new Date().toISOString() });
  return R.json({ ok: true });
}
