// import { NextResponse } from "next/server";
// import { revalidatePath } from "next/cache";
// import { ObjectId } from "mongodb";
// import { db, LISTS } from "@/lib/db";
// import { verify } from "@/lib/auth";

// async function authorized() {
//   try {
//     return await verify();
//   } catch {
//     return false;
//   }
// }

// export async function PUT(
//   req: Request,
//   { params }: { params: { col: string; id: string } },
// ) {
//   try {
//     if (!(await authorized())) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     if (!LISTS.includes(params.col) || !ObjectId.isValid(params.id)) {
//       return NextResponse.json({ error: "Not found" }, { status: 404 });
//     }

//     const { _id, ...body } = await req.json();

//     const result = await (await db())
//       .collection(params.col)
//       .updateOne({ _id: new ObjectId(params.id) }, { $set: body });

//     if (!result.matchedCount) {
//       return NextResponse.json({ error: "Item not found" }, { status: 404 });
//     }

//     revalidatePath("/");

//     return NextResponse.json({ ok: true });
//   } catch (error) {
//     console.error("Admin update error:", error);
//     return NextResponse.json(
//       { error: "Failed to update item" },
//       { status: 500 },
//     );
//   }
// }

// export async function DELETE(
//   req: Request,
//   { params }: { params: { col: string; id: string } },
// ) {
//   try {
//     if (!(await authorized())) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     if (!(LISTS.includes(params.col) && ObjectId.isValid(params.id))) {
//       return NextResponse.json({ error: "Not found" }, { status: 404 });
//     }

//     const result = await (await db())
//       .collection(params.col)
//       .deleteOne({ _id: new ObjectId(params.id) });

//     if (!result.deletedCount) {
//       return NextResponse.json({ error: "Item not found" }, { status: 404 });
//     }

//     revalidatePath("/");

//     return NextResponse.json({ ok: true });
//   } catch (error) {
//     console.error("Admin delete error:", error);
//     return NextResponse.json(
//       { error: "Failed to delete item" },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse as R } from "next/server";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { db, LISTS } from "@/lib/db";
import { isAuthorized } from "@/lib/admin-auth";

export async function PUT(
  req: Request,
  { params }: { params: { col: string; id: string } },
) {
  if (!(await isAuthorized())) {
    return R.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!LISTS.includes(params.col)) {
    return R.json({ error: "Not found" }, { status: 404 });
  }

  if (!ObjectId.isValid(params.id)) {
    return R.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const { _id, ...body } = await req.json();

    const result = await (await db())
      .collection(params.col)
      .updateOne({ _id: new ObjectId(params.id) }, { $set: body });

    if (!result.matchedCount) {
      return R.json({ error: "Record not found" }, { status: 404 });
    }

    revalidatePath("/");
    return R.json({ ok: true });
  } catch (error) {
    console.error("Admin update error:", error);
    return R.json({ error: "Failed to update record" }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { col: string; id: string } },
) {
  if (!(await isAuthorized())) {
    return R.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!LISTS.includes(params.col)) {
    return R.json({ error: "Not found" }, { status: 404 });
  }

  if (!ObjectId.isValid(params.id)) {
    return R.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const result = await (await db())
      .collection(params.col)
      .deleteOne({ _id: new ObjectId(params.id) });

    if (!result.deletedCount) {
      return R.json({ error: "Record not found" }, { status: 404 });
    }

    revalidatePath("/");
    return R.json({ ok: true });
  } catch (error) {
    console.error("Admin delete error:", error);
    return R.json({ error: "Failed to delete record" }, { status: 500 });
  }
}