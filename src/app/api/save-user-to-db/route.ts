import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { user }: any = await getServerSession(authOptions);

  if (!user) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  try {
    await prisma.user.create({
      data: {
        name: user.name,
        uuid: user.uuid,
        email: user.email,
        pfp: user.image,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    return new NextResponse("Bad Request", { status: 400 });
  }
  return new NextResponse("OK", { status: 200 });
}
