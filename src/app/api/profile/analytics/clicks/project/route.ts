import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const data = await req.json();
  const { id } = data; // project id
  try {
    if (!id) {
      return NextResponse.json({ msg: "No project provided" }, { status: 400 });
    }
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });
    if (!project) {
      return NextResponse.json({ msg: "No project found" }, { status: 404 });
    }

    await prisma.project.update({
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
