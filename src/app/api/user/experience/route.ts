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
        { msg: "Some Fields are missing" },
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
    if (!newExperience) {
      return NextResponse.json(
        { msg: "Failed to add experience" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { msg: "Experience added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const id = await getToken();
  const { searchParams } = new URL(req.url);
  const expId = searchParams.get("expId");
  if (!expId) {
    return NextResponse.json(
      { msg: "Experience ID is required" },
      { status: 400 }
    );
  }
  try {
    const parsedExpId = parseInt(expId as string, 10);
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return NextResponse.json({ msg: "User Not Found" }, { status: 404 });
    }

    const experience = await prisma.workExperience.findUnique({
      where: {
        id: parsedExpId,
      },
    });
    if (!experience) {
      return NextResponse.json(
        { msg: "Experience Not Found" },
        { status: 404 }
      );
    }
    if (experience?.userId !== user.id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(experience, { status: 200 });
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
export async function PUT(req: Request) {
  const data = await req.json();
  const id = await getToken();
  const { searchParams } = new URL(req.url);
  const expId = searchParams.get("expId");
  if (!expId) {
    return NextResponse.json(
      { msg: "Experience ID is required" },
      { status: 400 }
    );
  }

  try {
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }
    const parsedExpId = parseInt(expId);
    if (isNaN(parsedExpId)) {
      return NextResponse.json(
        { msg: "Invalid Experience ID" },
        { status: 400 }
      );
    }

    if (typeof data.fromYear === "number")
      data.fromYear = data.fromYear.toString();
    if (typeof data.toYear === "number") data.toYear = data.toYear.toString();

    const validatedData = addExperience.safeParse(data);
    if (!validatedData.success) {
      return NextResponse.json(
        { msg: "Some Fields are missing" },
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
    });
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }
    const experience = await prisma.workExperience.findUnique({
      where: {
        id: parsedExpId,
      },
    });
    if (!experience) {
      return NextResponse.json(
        { msg: "Experience Not Found" },
        { status: 404 }
      );
    }
    if (experience?.userId !== user.id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }
    await prisma.workExperience.update({
      where: {
        id: parsedExpId,
      },
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
    return NextResponse.json(
      { msg: "Experience Updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const id = await getToken();
  const { searchParams } = new URL(req.url);
  const expId = searchParams.get("expId");
  if (!expId) {
    return NextResponse.json(
      { msg: "Experience ID is required" },
      { status: 400 }
    );
  }
  try {
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }
    const parsedExpId = parseInt(expId);
    if (isNaN(parsedExpId)) {
      return NextResponse.json(
        { msg: "Invalid Experience ID" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return NextResponse.json({ msg: "User Not Found" }, { status: 404 });
    }

    const experience = await prisma.workExperience.findUnique({
      where: {
        id: parsedExpId,
      },
    });
    if (!experience) {
      return NextResponse.json(
        { msg: "Experience Not Found" },
        { status: 404 }
      );
    }
    if (experience?.userId !== user.id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }
    await prisma.workExperience.delete({
      where: {
        id: parsedExpId,
      },
    });

    return NextResponse.json(
      { msg: "Experience Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
