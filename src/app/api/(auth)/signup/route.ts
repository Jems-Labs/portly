import { passwordHash } from "@/lib/passwordHash";
import prisma from "@/lib/prisma";
import { signupSchema } from "@/lib/zod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const validatedData = signupSchema.safeParse(data);
    if (!validatedData.success) {
      const formattedErrors = validatedData.error.format();

      return NextResponse.json(
        { msg: "Invalid Inputs", errors: formattedErrors },
        { status: 400 }
      );
    }
    const { username, email, password } = validatedData.data;
    const user = await prisma.user.findUnique({
      where: {
        username,
        email,
      },
    });

    if (user) {
      return NextResponse.json({ msg: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await passwordHash(password);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword, 
      },
    });
    if (!newUser) {
      return NextResponse.json(
        { msg: "Failed to create new user" },
        { status: 400 }
      );
    }

    return NextResponse.json({ msg: "Signup Successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
