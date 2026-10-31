import { MongoClient } from "mongodb";
import { defaults } from "./defaults";
const g = global as any;
export const db = async () => { if (!g._m) g._m = new MongoClient(process.env.MONGODB_URI!).connect(); return (await g._m).db(); };
export const LISTS = ["projects","skills","experience","education","achievements","certifications","messages"];
export const SINGLES = ["profile","sections"];
// Public data: DB content, falling back to defaults when a collection is empty or DB is unavailable
export async function getPortfolio() {
  const out: any = {};
  try {
    const d = await db();
    for (const c of LISTS.filter(c => c !== "messages")) {
      const r = await d.collection(c).find().sort({ order: 1, _id: 1 }).toArray();
      out[c] = r.length ? r.map(({ _id, ...x }) => x) : defaults[c];
    }
    for (const c of SINGLES) { const x = await d.collection("singles").findOne({ _id: c } as any); out[c] = x?.data ?? defaults[c]; }
    // Preserve existing section preferences while introducing Certifications to older databases.
    if (Array.isArray(out.sections) && !out.sections.some((s: any) => s.id === "certifications")) {
      out.sections = [...out.sections, { id: "certifications", label: "Certifications", visible: true }];
    }
    return out;
  } catch { return defaults; }
}
