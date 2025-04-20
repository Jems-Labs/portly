import { uploadToCloudinary } from "@/lib/cloudinary";
import { getToken } from "@/lib/generateToken";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const id = await getToken();
  try {
    const tools = JSON.parse(formData.get("tools") as string);
    const name = formData.get("name") as string;
    const tagline = formData.get("tagline") as string;
    const projectUrl = formData.get("projectUrl") as string;
    const videoUrl = formData.get("videoUrl") as string;
    const logo = formData.get("logo") as File;


    if (logo.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { msg: "File exceeds 10MB size limit" },
        { status: 400 }
      );
    }

    const fileUrl = await uploadToCloudinary(logo, "portly/projects");
    if (!fileUrl)
      return NextResponse.json({ msg: "File Upload Failed" }, { status: 500 });
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return NextResponse.json({ msg: "User Not Found" }, { status: 404 });

    await prisma.project.create({
      data: {
        name,
        tagline,
        projectUrl,
        videoUrl,
        logo: fileUrl,
        tools,
        userId: user.id,
      },
    });

    return NextResponse.json({ msg: "Project Added" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
