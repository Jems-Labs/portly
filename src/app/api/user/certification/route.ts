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
