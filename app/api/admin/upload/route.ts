// import { NextResponse as R } from "next/server";
// import { v2 as c } from "cloudinary";
// export async function POST(req: Request) {
//   const f = (await req.formData()).get("file") as File | null;
//   if (!f) return R.json({ error: "No file" }, { status: 400 });
//   if (!process.env.CLOUDINARY_URL) return R.json({ error: "CLOUDINARY_URL is not set" }, { status: 500 });
//   const buf = Buffer.from(await f.arrayBuffer());
//   const r: any = await new Promise((ok, no) => c.uploader.upload_stream({ folder: "portfolio", resource_type: "auto" }, (e, x) => (e ? no(e) : ok(x))).end(buf));
//   return R.json({ url: r.secure_url });
// }

import { NextResponse as R } from "next/server";
import { v2 as c } from "cloudinary";
import { isAuthorized } from "@/lib/admin-auth";

export async function POST(req: Request) {
  if (!(await isAuthorized())) {
    return R.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (!process.env.CLOUDINARY_URL) {
      return R.json(
        { error: "CLOUDINARY_URL is not configured" },
        { status: 500 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return R.json({ error: "Invalid file" }, { status: 400 });
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      return R.json({ error: "Unsupported file type" }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      return R.json({ error: "File size must be below 5 MB" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result: any = await new Promise((resolve, reject) => {
      c.uploader
        .upload_stream(
          {
            folder: "portfolio",
            resource_type: "auto",
          },
          (error, uploaded) => {
            if (error) reject(error);
            else resolve(uploaded);
          },
        )
        .end(buffer);
    });

    return R.json({ url: result.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return R.json({ error: "File upload failed" }, { status: 500 });
  }
}