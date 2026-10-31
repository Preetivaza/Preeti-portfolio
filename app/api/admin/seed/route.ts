// import { NextResponse as R } from "next/server";
// import { db, LISTS, SINGLES } from "@/lib/db";
// import { defaults } from "@/lib/defaults";
// export async function POST() {
//   const d = await db();
//   for (const c of LISTS.filter(c => c !== "messages"))
//     if (!(await d.collection(c).countDocuments())) await d.collection(c).insertMany(defaults[c].map((x: any, i: number) => ({ ...x, order: i })));
//   for (const c of SINGLES) await d.collection("singles").updateOne({ _id: c } as any, { $setOnInsert: { data: defaults[c] } }, { upsert: true });
//   const savedSections = await d.collection("singles").findOne({ _id: "sections" } as any);
//   const sectionData = savedSections?.data ?? defaults.sections;
//   if (!sectionData.some((s: any) => s.id === "certifications")) {
//     await d.collection("singles").updateOne({ _id: "sections" } as any, { $set: { data: [...sectionData, { id: "certifications", label: "Certifications", visible: true }] } }, { upsert: true });
//   }
//   return R.json({ ok: true });
// }

import { NextResponse as R } from "next/server";
import { db, LISTS, SINGLES } from "@/lib/db";
import { defaults } from "@/lib/defaults";
import { isAuthorized } from "@/lib/admin-auth";

export async function POST() {
  if (!(await isAuthorized())) {
    return R.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const d = await db();

    for (const c of LISTS.filter((c) => c !== "messages")) {
      if (!(await d.collection(c).countDocuments())) {
        await d.collection(c).insertMany(
          defaults[c].map((x: any, i: number) => ({
            ...x,
            order: i,
          })),
        );
      }
    }

    for (const c of SINGLES) {
      await d
        .collection("singles")
        .updateOne(
          { _id: c } as any,
          { $setOnInsert: { data: defaults[c] } },
          { upsert: true },
        );
    }

    const savedSections = await d.collection("singles").findOne({
      _id: "sections",
    } as any);

    const sectionData = savedSections?.data ?? defaults.sections;

    if (!sectionData.some((s: any) => s.id === "certifications")) {
      await d.collection("singles").updateOne(
        { _id: "sections" } as any,
        {
          $set: {
            data: [
              ...sectionData,
              {
                id: "certifications",
                label: "Certifications",
                visible: true,
              },
            ],
          },
        },
        { upsert: true },
      );
    }

    return R.json({ ok: true });
  } catch (error) {
    console.error("Seed error:", error);
    return R.json({ error: "Seeding failed" }, { status: 500 });
  }
}