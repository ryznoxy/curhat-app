import { makeComment, deleteComment } from "@/services/Comments";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { content, postId, userUuid } = body;
  if (!content || !postId || !userUuid) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  await makeComment({ content, postId, userUuid });
  return NextResponse.json(
    {
      success: true,
      content,
      postId,
      userUuid,
    },
    { status: 200 }
  );
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { commentId, userUuid } = body;
  if (!commentId || !userUuid) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  try {
    await deleteComment(commentId);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
