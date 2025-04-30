import { getToken } from "@/lib/generateToken";
import prisma from "@/lib/prisma";
import { addVolunteer } from "@/lib/zod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const id = await getToken();
  try {
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }
    const validatedData = addVolunteer.safeParse(data);
    if (!validatedData.success) {
      return NextResponse.json(
        { msg: "Some Fields are missing" },
        { status: 422 }
      );
    }

    const {
      role,
      organization,
      organizationWebsite,
      fromMonth,
      fromYear,
      toMonth,
      toYear,
      description,
      isCurrentlyWorking,
    } = validatedData.data;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    await prisma.volunteerExperience.create({
      data: {
        role,
        organization,
        organizationWebsite,
        fromMonth,
        fromYear,
        description,
        toMonth: isCurrentlyWorking ? null : toMonth,
        toYear: isCurrentlyWorking ? null : toYear,
        isCurrentlyWorking: isCurrentlyWorking || false,
        userId: id,
      },
    });

    return NextResponse.json(
      { msg: "Volunteer experience added successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const id = await getToken();
  const { searchParams } = new URL(req.url);
  const volId = searchParams.get("volId");

  if (!volId) {
    return NextResponse.json(
      { msg: "Volunteer Experience ID is required" },
      { status: 400 }
    );
  }

  try {
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    const parsedVolId = parseInt(volId);
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return NextResponse.json({ msg: "User Not Found" }, { status: 404 });
    }

    const experience = await prisma.volunteerExperience.findUnique({
      where: { id: parsedVolId },
    });

    if (!experience || experience.userId !== user.id) {
      return NextResponse.json(
        { msg: "Unauthorized or Not Found" },
        { status: 401 }
      );
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
  const volId = searchParams.get("volId");

  if (!volId) {
    return NextResponse.json(
      { msg: "Volunteer Experience ID is required" },
      { status: 400 }
    );
  }

  try {
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    const parsedVolId = parseInt(volId);
    if (isNaN(parsedVolId)) {
      return NextResponse.json({ msg: "Invalid ID" }, { status: 400 });
    }

    const validatedData = addVolunteer.safeParse(data);
    if (!validatedData.success) {
      return NextResponse.json(
        { msg: "Some Fields are missing" },
        { status: 422 }
      );
    }

    const {
      role,
      organization,
      organizationWebsite,
      fromMonth,
      fromYear,
      toMonth,
      toYear,
      isCurrentlyWorking,
    } = validatedData.data;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user)
      return NextResponse.json({ msg: "User not found" }, { status: 404 });

    const experience = await prisma.volunteerExperience.findUnique({
      where: { id: parsedVolId },
    });

    if (!experience || experience.userId !== user.id) {
      return NextResponse.json(
        { msg: "Unauthorized or Not Found" },
        { status: 401 }
      );
    }

    await prisma.volunteerExperience.update({
      where: { id: parsedVolId },
      data: {
        role,
        organization,
        organizationWebsite,
        fromMonth,
        fromYear,
        toMonth: isCurrentlyWorking ? null : toMonth,
        toYear: isCurrentlyWorking ? null : toYear,
        isCurrentlyWorking: isCurrentlyWorking || false,
        userId: id,
      },
    });

    return NextResponse.json(
      { msg: "Volunteer Experience Updated successfully" },
      { status: 200 }
    );
  } catch  {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const id = await getToken();
  const { searchParams } = new URL(req.url);
  const volId = searchParams.get("volId");

  if (!volId) {
    return NextResponse.json(
      { msg: "Volunteer Experience ID is required" },
      { status: 400 }
    );
  }

  try {
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    const parsedVolId = parseInt(volId);
    if (isNaN(parsedVolId)) {
      return NextResponse.json({ msg: "Invalid ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ msg: "User Not Found" }, { status: 404 });
    }

    const experience = await prisma.volunteerExperience.findUnique({
      where: { id: parsedVolId },
    });

    if (!experience || experience.userId !== user.id) {
      return NextResponse.json(
        { msg: "Unauthorized or Not Found" },
        { status: 401 }
      );
    }

    await prisma.volunteerExperience.delete({
      where: { id: parsedVolId },
    });

    return NextResponse.json(
      { msg: "Volunteer Experience Deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
