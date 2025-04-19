import {
  deleteFromCloudinary,
  getPublicIdFromUrl,
  uploadToCloudinary,
} from "@/lib/cloudinary";
import { getToken } from "@/lib/generateToken";
import prisma from "@/lib/prisma";
import { personalPronouns, Status } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const formData = await req.formData();
  const id = await getToken();
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const bio = formData.get("bio") as string;
    const pronounsStr = formData.get("pronouns") as string;
    const statusStr = formData.get("status") as string;
    const image = formData.get("image") as File;
    const pronouns = pronounsStr as personalPronouns;
    const status = statusStr as Status;
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }
    await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        bio,
        pronouns,
        status,
      },
    });

    if (image && image.size > 0) {
      const profileImage = await prisma.profileImage.findUnique({
        where: {
          userId: user.id,
        },
      });
      if (profileImage) {
        const publicId = getPublicIdFromUrl(profileImage?.url);
        if (publicId) {
          await deleteFromCloudinary(publicId);
          await prisma.profileImage.delete({
            where: {
              id: profileImage.id,
            },
          });
        }
        let imageUrl: string = "";
        if (image) {
          imageUrl = (await uploadToCloudinary(image, "portly/user")) || "";
        }
        await prisma.profileImage.create({
          data: {
            url: imageUrl,
            userId: user.id,
          },
        });
      } else {
        let imageUrl: string = "";
        if (image) {
          imageUrl = (await uploadToCloudinary(image, "portly/user")) || "";
        }
        await prisma.profileImage.create({
          data: {
            url: imageUrl,
            userId: user.id,
          },
        });
      }
    }

    return NextResponse.json({ msg: "Updated successfully" }, { status: 200 });
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
