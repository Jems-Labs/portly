import { getToken } from "@/lib/generateToken";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const id = await getToken();
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        image: true,
        skills: true,
        socialLinks: true,
        projects: true
      },
    });
    if (!user) {
      return NextResponse.json({ msg: "No User found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        id: user?.id,
        username: user?.username,
        email: user?.email,
        firstName: user?.firstName,
        lastName: user?.lastName,
        image: user?.image,
        bio: user?.bio,
        status: user?.status,
        pronouns: user?.pronouns,
        skills: user?.skills,
        socialLinks: user?.socialLinks,
        projects: user?.projects,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
