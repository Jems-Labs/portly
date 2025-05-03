import { getToken } from "@/lib/generateToken";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const id = await getToken();
  const data = await req.json();

  try {
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    const { profileId } = data;

    if (!profileId) {
      return NextResponse.json(
        { msg: "No profile id provided" },
        { status: 400 }
      );
    }

    const parsedProfileId = parseInt(profileId);

    if (isNaN(parsedProfileId)) {
      return NextResponse.json({ msg: "Id is not a number" }, { status: 400 });
    }
    if (parsedProfileId === id) {
      return NextResponse.json(
        { msg: "Profile view not tracked for your own profile" },
        { status: 200 }
      );
    }
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ msg: "No user found" }, { status: 404 });
    }

    const profile = await prisma.user.findUnique({
      where: { id: parsedProfileId },
    });
    if (!profile) {
      return NextResponse.json({ msg: "No profile found" }, { status: 404 });
    }

    const existingView = await prisma.profileView.findFirst({
      where: {
        viewerId: id,
        viewedId: parsedProfileId,
      },
    });

    if (existingView) {
      // Update the viewedAt timestamp
      await prisma.profileView.update({
        where: { id: existingView.id },
        data: { viewedAt: new Date() },
      });
    } else {
      // Create a new view record
      await prisma.profileView.create({
        data: {
          viewerId: id,
          viewedId: parsedProfileId,
          viewedAt: new Date(),
        },
      });
    }

    return NextResponse.json({ msg: "Profile view tracked" }, { status: 200 });
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
