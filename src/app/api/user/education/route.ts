import { getToken } from "@/lib/generateToken";
import prisma from "@/lib/prisma";
import { addEducation } from "@/lib/zod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const id = await getToken();
  try {
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }
    const validatedData = addEducation.safeParse(data);
    if (!validatedData.success) {
      return NextResponse.json(
        { msg: "Some Fields are missing" },
        { status: 422 }
      );
    }
    const { school, degree, fieldOfStudy, startDate, endDate } =
      validatedData.data;
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }
    const parsedStartDate = parseInt(startDate);
    const parsedEndDate = parseInt(endDate);
    const newEducation = await prisma.education.create({
      data: {
        school,
        degree,
        fieldOfStudy,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        userId: id,
      },
    });

    if (!newEducation) {
      return NextResponse.json(
        { msg: "Unable to add education" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { msg: "Education added successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
export async function GET(req: Request) {
  const id = await getToken();
  const eduId = new URL(req.url).searchParams.get("eduId");

  try {
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }
    if (!eduId) {
      return NextResponse.json(
        { msg: "Education ID is required" },
        { status: 422 }
      );
    }
    const parsedEduId = parseInt(eduId);
    if (isNaN(parsedEduId)) {
      return NextResponse.json(
        { msg: "Invalid Education ID" },
        { status: 422 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }
    const education = await prisma.education.findUnique({
      where: { id: parsedEduId },
    });
    if (!education) {
      return NextResponse.json({ msg: "Education not found" }, { status: 404 });
    }
    if (education.userId !== id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(education, { status: 200 });
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
export async function PUT(req: Request) {
  const data = await req.json();
  const id = await getToken();
  const eduId = new URL(req.url).searchParams.get("eduId");
  try {
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }
    if (!eduId) {
      return NextResponse.json(
        { msg: "Education ID is required" },
        { status: 422 }
      );
    }
    const parsedEduId = parseInt(eduId);
    if (isNaN(parsedEduId)) {
      return NextResponse.json(
        { msg: "Invalid Education ID" },
        { status: 422 }
      );
    }
    const validatedData = addEducation.safeParse(data);
    if (!validatedData.success) {
      return NextResponse.json(
        { msg: "Some Fields are missing" },
        { status: 422 }
      );
    }
    const { school, degree, fieldOfStudy, startDate, endDate } =
      validatedData.data;
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }
    const parsedStartDate = parseInt(startDate);
    const parsedEndDate = parseInt(endDate);
    const education = await prisma.education.findUnique({
      where: { id: parsedEduId },
    });
    if(!education){
      return NextResponse.json({ msg: "Education not found" }, { status: 404 });
    }
    if(education.userId !== id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }
    await prisma.education.update({
      where: { id: parsedEduId },
      data: {
        school,
        degree,
        fieldOfStudy,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        userId: id,
      },
    });

    return NextResponse.json(
      { msg: "Education updated successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const id = await getToken();
  const eduId = new URL(req.url).searchParams.get("eduId");

  try {
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }
    if (!eduId) {
      return NextResponse.json(
        { msg: "Education ID is required" },
        { status: 422 }
      );
    }
    const parsedEduId = parseInt(eduId);
    if (isNaN(parsedEduId)) {
      return NextResponse.json(
        { msg: "Invalid Education ID" },
        { status: 422 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }
    const education = await prisma.education.findUnique({
      where: { id: parsedEduId },
    });
    if (!education) {
      return NextResponse.json({ msg: "Education not found" }, { status: 404 });
    }
    if (education.userId !== id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    await prisma.education.delete({
      where: { id: parsedEduId },
    });

    return NextResponse.json(
      { msg: "Education deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
