import { cookies } from "next/headers";
import { verify } from "@/lib/auth";

export async function isAuthorized(): Promise<boolean> {
  try {
    const token = cookies().get("t")?.value;

    if (!token) return false;

    return await verify(token);
  } catch (error) {
    console.error("Authorization error:", error);
    return false;
  }
}
