import { getToken } from "@/lib/generateToken";
import prisma from "@/lib/prisma";
import { Platform } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const socialLinks = await req.json();
  const userId = await getToken();
  try {
    if (!userId || !Array.isArray(socialLinks)) {
      return NextResponse.json({ msg: "Invalid data" }, { status: 400 });
    }
    await Promise.all(
      socialLinks.map(async (link: { key: string; url: string }) => {
        const platformKey = link.key as Platform;

        // Delete existing link for same user & platform (if any)
        await prisma.socialLink.deleteMany({
          where: {
            userId,
            platform: platformKey,
          },
        });

        // Create new link
        return prisma.socialLink.create({
          data: {
            url: link.url,
            platform: platformKey,
            userId: userId,
          },
        });
      })
    );
    return NextResponse.json(
      { msg: "Social Links updated successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
