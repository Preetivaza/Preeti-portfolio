import { NextResponse } from "next/server";
import { sign } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    // Check environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    console.log("Admin Login Debug:", {
      adminEmailLoaded: !!adminEmail,
      adminPasswordLoaded: !!adminPassword,
      emailMatch:
        email.trim().toLowerCase() === adminEmail?.trim().toLowerCase(),
      passwordMatch: password === adminPassword,
    });

    if (!adminEmail || !adminPassword) {
      console.error("Admin credentials are missing from environment variables");

      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    // Verify credentials
    const emailMatch =
      email.trim().toLowerCase() === adminEmail.trim().toLowerCase();

    const passwordMatch = password === adminPassword;

    if (!emailMatch || !passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Generate authentication token
    const token = await sign();

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    // Set secure authentication cookie
    response.cookies.set("t", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { error: "Something went wrong during login" },
      { status: 500 },
    );
  }
}

// Admin logout
export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  response.cookies.delete("t");

  return response;
}
