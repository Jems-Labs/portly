import { generateTokenAndSetCookie } from "@/lib/generateToken";
import { passwordCompare } from "@/lib/passwordHash";
import prisma from "@/lib/prisma";
import { loginSchema } from "@/lib/zod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const validatedData = loginSchema.safeParse(data);
    if (!validatedData.success) {
      const formattedErrors = validatedData.error.format();

      return NextResponse.json(
        { msg: "Invalid Inputs", errors: formattedErrors },
        { status: 400 }
      );
    }
    const { email, password } = validatedData.data;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const isMatch = passwordCompare(password, user?.password || "");
    if (!isMatch) {
      return NextResponse.json({ msg: "Invalid Credentials" }, { status: 400 });
    }
    const response = NextResponse.json({
      id: user?.id,
      username: user?.username,
      email: user?.email,
    },{ status: 200 });
    const res = generateTokenAndSetCookie(user?.id, response);
    return res;
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
