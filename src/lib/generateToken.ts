import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET as string;

export async function generateTokenAndSetCookie(
  id: number | undefined,
  response: NextResponse
) {
  // ✅ Add expiresIn: 7 days (matches cookie maxAge)
  const token = await jwt.sign({ id }, SECRET_KEY, {
    expiresIn: "7d", // Or use "1h", "2d", etc.
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
  });

  return response;
}

export async function getToken() {
  const token = (await cookies()).get("token")?.value;
  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as { id: number };
      return decoded.id;
    } catch (err) {
      return null;
    }
  }
  return null;
}
