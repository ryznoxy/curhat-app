import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { user } = body;

  if (!user) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  try {
    await prisma.user.create({
      data: {
        name: user.user_metadata?.preferred_username,
        email: user.user_metadata?.email,
        uuid: user.id,
        pfp: user.user_metadata?.avatar_url,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    return new NextResponse("Bad Request", { status: 400 });
  }
  return new NextResponse("OK", { status: 200 });
}
