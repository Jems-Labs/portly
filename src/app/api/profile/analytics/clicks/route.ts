import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const data = await req.json();
  const { id } = data; // social link id
  try {
    if (!id) {
      return NextResponse.json(
        { msg: "No social link id provided" },
        { status: 400 }
      );
    }
    const socialLink = await prisma.socialLink.findUnique({
      where: {
        id,
      },
    });
    if (!socialLink) {
      return NextResponse.json(
        { msg: "No social link found" },
        { status: 404 }
      );
    }

    await prisma.socialLink.update({
      where: {
        id,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });
    return NextResponse.json({ msg: "Updated click count" }, { status: 200 });
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
