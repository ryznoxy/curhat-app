import { makeCurhatan } from "@/services/makeCurhatan";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { content, title, userUuid } = body;

  if (!content || !title || !userUuid) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  await makeCurhatan({ content, title, userUuid });

  return new NextResponse("OK", { status: 200 });
}
