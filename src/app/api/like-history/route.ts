import getLikeHistory from "@/services/getLikeHistory";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const likeHistory = await getLikeHistory(userId);
  const likeHistoryJSON = JSON.parse(JSON.stringify(likeHistory));

  const postsLiked = likeHistoryJSON
    ?.filter((like: any) => like.postId)
    ?.map((like: any) => like.postId);

  const commentsLiked = likeHistoryJSON
    ?.filter((like: any) => like.commentId)
    ?.map((like: any) => like.commentId);

  const data = {
    postsLiked,
    commentsLiked,
  };

  return NextResponse.json(data);
}
