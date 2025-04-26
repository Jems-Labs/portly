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
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
