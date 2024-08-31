import {
  commentAddLike,
  commentRemoveLike,
  postAddLike,
  postRemoveLike,
  isLikedByUser, // Add this utility to check if a user has liked the post/comment
} from "@/services/Like";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { uuid, userId, postOrComment } = body;

  if (
    !uuid ||
    !userId ||
    !postOrComment ||
    (postOrComment !== "post" && postOrComment !== "comment")
  ) {
    return NextResponse.json("Bad Request", { status: 400 });
  }

  try {
    // Check if the user has already liked the post or comment
    const alreadyLiked = await isLikedByUser(uuid, userId, postOrComment);

    if (alreadyLiked) {
      return NextResponse.json("Already Liked", { status: 400 });
    }

    if (postOrComment === "post") {
      await postAddLike(uuid, userId);
      return NextResponse.json("Success, post has been liked and saved", {
        status: 200,
      });
    } else if (postOrComment === "comment") {
      await commentAddLike(uuid, userId);
      return NextResponse.json("Success, comment has been liked", {
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json("Bad Request", { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { uuid, userId, postOrComment } = body;

  if (!uuid || !userId) {
    return NextResponse.json("Bad Request", { status: 400 });
  }

  try {
    if (postOrComment === "post") {
      await postRemoveLike(uuid, userId);
      return NextResponse.json("Success, post has been unliked and unsaved", {
        status: 200,
      });
    } else if (postOrComment === "comment") {
      await commentRemoveLike(uuid, userId);
      return NextResponse.json("Success, comment has been unliked", {
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json("Bad Request", { status: 400 });
  }
}
