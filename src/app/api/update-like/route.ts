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
  const { uuid, userUuid, postOrComment } = body;

  if (
    !uuid ||
    !userUuid ||
    !postOrComment ||
    (postOrComment !== "post" && postOrComment !== "comment")
  ) {
    return NextResponse.json("Bad Request", { status: 400 });
  }

  try {
    const alreadyLiked = await isLikedByUser(uuid, userUuid, postOrComment);

    if (alreadyLiked) {
      return NextResponse.json("Already Liked", { status: 400 });
    }

    if (postOrComment === "post") {
      await postAddLike(uuid, userUuid);
      return NextResponse.json("Success, post has been liked and saved", {
        status: 200,
      });
    } else if (postOrComment === "comment") {
      await commentAddLike(uuid, userUuid);
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
  const { uuid, userUuid, postOrComment } = body;

  if (!uuid || !userUuid) {
    return NextResponse.json("Bad Request", { status: 400 });
  }

  try {
    if (postOrComment === "post") {
      await postRemoveLike(uuid, userUuid);
      return NextResponse.json("Success, post has been unliked and unsaved", {
        status: 200,
      });
    } else if (postOrComment === "comment") {
      await commentRemoveLike(uuid, userUuid);
      return NextResponse.json("Success, comment has been unliked", {
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json("Bad Request", { status: 400 });
  }
}
