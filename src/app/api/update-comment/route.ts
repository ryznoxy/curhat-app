import { makeComment, deleteComment } from "@/services/Comments";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { content, postId, userEmail } = body;
  if (!content || !postId || !userEmail) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  await makeComment({ content, postId, userEmail });
  return NextResponse.json(
    {
      success: true,
      content,
      postId,
      userEmail,
    },
    { status: 200 }
  );
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { commentId, userEmail } = body;
  if (!commentId || !userEmail) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  try {
    await deleteComment(commentId);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
