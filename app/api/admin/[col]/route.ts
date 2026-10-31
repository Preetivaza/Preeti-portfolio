import { NextResponse as R } from "next/server";
import { revalidatePath } from "next/cache";
import { db, LISTS, SINGLES } from "@/lib/db";
import { defaults } from "@/lib/defaults";
export async function GET(_: Request, { params }: any) {
  const c = params.col, d = await db();
  if (SINGLES.includes(c)) { const x = await d.collection("singles").findOne({ _id: c } as any); return R.json(x?.data ?? defaults[c]); }
  if (!LISTS.includes(c)) return R.json({ error: "Not found" }, { status: 404 });
  const r = await d.collection(c).find().sort(c === "messages" ? { createdAt: -1 } : { order: 1, _id: 1 }).toArray();
  return R.json(r.map(x => ({ ...x, _id: String(x._id) })));
}
export async function POST(req: Request, { params }: any) {
  if (!LISTS.includes(params.col)) return R.json({ error: "Not found" }, { status: 404 });
  const { _id, ...b } = await req.json();
  const r = await (await db()).collection(params.col).insertOne(b);
  revalidatePath("/"); return R.json({ _id: String(r.insertedId) });
}
export async function PUT(req: Request, { params }: any) {
  if (!SINGLES.includes(params.col)) return R.json({ error: "Not found" }, { status: 404 });
  await (await db()).collection("singles").updateOne({ _id: params.col } as any, { $set: { data: await req.json() } }, { upsert: true });
  revalidatePath("/"); return R.json({ ok: true });
}
