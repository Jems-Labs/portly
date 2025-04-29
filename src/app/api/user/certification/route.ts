import { getToken } from "@/lib/generateToken";
import prisma from "@/lib/prisma";
import { addCertification } from "@/lib/zod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const id = await getToken();
  const data = await req.json();
  try {
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }
    const validatedData = addCertification.safeParse(data);
    if (!validatedData.success) {
      return NextResponse.json(
        { msg: "Some Fields are missing" },
        { status: 422 }
      );
    }
    const {
      name,
      certificationUrl,
      issuedBy,
      issueMonth,
      issueYear,
      expirationMonth,
      expirationYear,
    } = validatedData.data;

    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }
    let parsedExpirationYear;
    if (expirationYear) {
      parsedExpirationYear = parseInt(expirationYear);
    }
    await prisma.certification.create({
      data: {
        name,
        issuedBy,
        certificationUrl,
        issueMonth,
        issueYear: parseInt(issueYear),
        expirationMonth,
        expirationYear: parsedExpirationYear,
        userId: id,
      },
    });

    return NextResponse.json(
      { msg: "Certification added successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const id = await getToken();
  const { searchParams } = new URL(req.url);
  const cerId = searchParams.get("cerId");
  if (!cerId) {
    return NextResponse.json(
      { msg: "Certification ID is required" },
      { status: 400 }
    );
  }
  try {
    const parsedCerId = parseInt(cerId as string, 10);
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

    const certification = await prisma.certification.findUnique({
      where: {
        id: parsedCerId,
      },
    });
    if (!certification) {
      return NextResponse.json(
        { msg: "Certification Not Found" },
        { status: 404 }
      );
    }
    if (certification?.userId !== user.id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(certification, { status: 200 });
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
export async function PUT(req: Request) {
  const id = await getToken();
  const data = await req.json();
  console.log(data);
  const { searchParams } = new URL(req.url);
  const cerId = searchParams.get("cerId");
  if (!cerId) {
    return NextResponse.json(
      { msg: "Certification ID is required" },
      { status: 400 }
    );
  }
  try {
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }
    const parsedCerId = parseInt(cerId as string, 10);
    const validatedData = addCertification.safeParse(data);
    if (!validatedData.success) {
      console.error(validatedData.error);
      return NextResponse.json(
        { msg: "Some Fields are missing" },
        { status: 422 }
      );
    }

    const {
      name,
      certificationUrl,
      issuedBy,
      issueMonth,
      issueYear,
      expirationMonth,
      expirationYear,
    } = validatedData.data;

    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    const certification = await prisma.certification.findUnique({
      where: {
        id: parsedCerId,
      },
    });
    if (!certification) {
      return NextResponse.json(
        { msg: "Certification not found" },
        { status: 404 }
      );
    }
    if (certification?.userId !== user.id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }
    let parsedExpirationYear;
    let parsedIssueYear;
    if (issueYear && expirationYear) {
      parsedIssueYear = parseInt(issueYear);
      parsedExpirationYear = parseInt(expirationYear);
    }
    await prisma.certification.update({
      where: {
        id: parsedCerId,
      },
      data: {
        name,
        issuedBy,
        certificationUrl,
        issueMonth,
        issueYear: parsedIssueYear,
        expirationMonth,
        expirationYear: parsedExpirationYear,
      },
    });
    return NextResponse.json(
      { msg: "Certification updated successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  const id = await getToken();
  const { searchParams } = new URL(req.url);
  const cerId = searchParams.get("cerId");

  if (!cerId) {
    return NextResponse.json(
      { msg: "Certification ID is required" },
      { status: 400 }
    );
  }

  try {
    const parsedCerId = parseInt(cerId as string, 10);
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    const certification = await prisma.certification.findUnique({
      where: { id: parsedCerId },
    });

    if (!certification) {
      return NextResponse.json(
        { msg: "Certification not found" },
        { status: 404 }
      );
    }

    if (certification.userId !== user.id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    await prisma.certification.delete({
      where: { id: parsedCerId },
    });

    return NextResponse.json(
      { msg: "Certification deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
