import { SignJWT, jwtVerify } from "jose";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not configured");
}

const key = () => new TextEncoder().encode(secret);

export const sign = async () =>
  new SignJWT({ a: 1 })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(key());

export const verify = async (token?: string): Promise<boolean> => {
  try {
    if (!token) return false;

    await jwtVerify(token, key());
    return true;
  } catch {
    return false;
  }
};
