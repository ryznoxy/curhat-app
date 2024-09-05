import {
  commentAddLike,
  commentRemoveLike,
  postAddLike,
  postRemoveLike,
  isLikedByUser, 
} from "@/services/Like";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { uuid, userEmail, postOrComment } = body;

  if (
    !uuid ||
    !userEmail ||
    !postOrComment ||
    (postOrComment !== "post" && postOrComment !== "comment")
  ) {
    return NextResponse.json("Bad Request", { status: 400 });
  }

  try {
    const alreadyLiked = await isLikedByUser(uuid, userEmail, postOrComment);

    if (alreadyLiked) {
      return NextResponse.json("Already Liked", { status: 400 });
    }

    if (postOrComment === "post") {
      await postAddLike(uuid, userEmail);
      return NextResponse.json("Success, post has been liked and saved", {
        status: 200,
      });
    } else if (postOrComment === "comment") {
      await commentAddLike(uuid, userEmail);
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
  const { uuid, userEmail, postOrComment } = body;

  if (!uuid || !userEmail) {
    return NextResponse.json("Bad Request", { status: 400 });
  }

  try {
    if (postOrComment === "post") {
      await postRemoveLike(uuid, userEmail);
      return NextResponse.json("Success, post has been unliked and unsaved", {
        status: 200,
      });
    } else if (postOrComment === "comment") {
      await commentRemoveLike(uuid, userEmail);
      return NextResponse.json("Success, comment has been unliked", {
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json("Bad Request", { status: 400 });
  }
}
