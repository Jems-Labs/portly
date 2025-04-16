import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  try {
    if (!username) {
      return NextResponse.json(
        { msg: "No username provided" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (user) {
      return NextResponse.json({ isAvailable: false }, { status: 200 });
    }
    return NextResponse.json({ isAvailable: true }, { status: 200 });
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
