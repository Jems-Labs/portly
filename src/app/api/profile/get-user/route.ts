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
      where: { username },
      include: {
        image: true,
        skills: true,
        socialLinks: true,
        projects: true,
        education: true,
        workExperience: true,
        certifications: true,
        volunteerExperience: true,
        views: true
      },
    });

    if (!user) {
      return NextResponse.json({ msg: "No user found" }, { status: 404 });
    }

    return NextResponse.json({
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
        education: user?.education,
        workExperience: user?.workExperience,
        certifications: user?.certifications,
        volunteerExperience: user?.volunteerExperience,
        views: user?.views
      },
      { status: 200 });
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
