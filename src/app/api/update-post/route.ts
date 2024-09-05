import { deleteCurhatan } from "@/services/Curhatan";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const body = await request.json();
  const { uuid, userEmail } = body;
  if (!uuid || !userEmail) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  try {
    await deleteCurhatan(uuid);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
