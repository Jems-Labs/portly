import { getToken } from "@/lib/generateToken";
import prisma from "@/lib/prisma";
import { addExperience } from "@/lib/zod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const id = await getToken();
  try {
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }
    const validatedData = addExperience.safeParse(data);
    if (!validatedData.success) {
      return NextResponse.json(
        { msg: validatedData.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const {
      company,
      title,
      companyWebsite,
      description,
      fromMonth,
      fromYear,
      toMonth,
      toYear,
      isCurrentlyWorking,
    } = validatedData.data;
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        workExperience: true,
      },
    });
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }
    const isCompanyAlreadyAdded = user.workExperience.some(
      (exp) => exp.company.toLowerCase().trim() === company.toLowerCase().trim()
    );

    if (isCompanyAlreadyAdded) {
      return NextResponse.json(
        { msg: "This company is already added to your work experience." },
        { status: 409 }
      );
    }    
    const newExperience = await prisma.workExperience.create({
      data: {
        company,
        title,
        companyWebsite,
        description,
        fromMonth,
        fromYear,
        toMonth: isCurrentlyWorking ? null : toMonth,
        toYear: isCurrentlyWorking ? null : toYear,
        isCurrentlyWorking: isCurrentlyWorking || false,
        userId: id,
      },
    });
    if(!newExperience) {
        return NextResponse.json(
          { msg: "Failed to add experience" },
            { status: 500 }
        )
    }
    return NextResponse.json(
      { msg: "Experience added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
