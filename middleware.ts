import { NextRequest, NextResponse } from "next/server";
import { verify } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Allow login page and login API
  if (path === "/admin/login" || path === "/api/admin/login") {
    return NextResponse.next();
  }

  const token = req.cookies.get("t")?.value;

  if (await verify(token)) {
    return NextResponse.next();
  }

  if (path.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.redirect(new URL("/admin/login", req.url));
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
