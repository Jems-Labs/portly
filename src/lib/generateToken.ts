import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
const SECRET_KEY = process.env.JWT_SECRET as string;
export async function generateTokenAndSetCookie(
  id: number | undefined,
  response: NextResponse
) {
  const token = await jwt.sign({ id }, SECRET_KEY);
  response.cookies.set("token",token,{
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: process.env.isProduction? "none" : "lax",
  });
  return response;
}
export async function getToken(){
    const token = (await cookies()).get("token")?.value;
    if(token){
        const decoded = await jwt.verify(token, SECRET_KEY) as { id: number };
        return decoded.id;
    }
}