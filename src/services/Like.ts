import prisma from "@/lib/prisma";

const postAddLike = async (postId: string, userUuid: string) => {
  await prisma.post.update({
    where: {
      uuid: postId,
    },
    data: {
      likes: {
        increment: 1,
      },
    },
  });

  return await prisma.likeHistory.create({
    data: {
      userUuid,
      postId,
    },
  });
};

const postRemoveLike = async (postId: string, userUuid: string) => {
  await prisma.post.update({
    where: {
      uuid: postId,
    },
    data: {
      likes: {
        decrement: 1,
      },
    },
  });

  return await prisma.likeHistory.delete({
    where: {
      LikeHistory_userId_postId_key: {
        userUuid,
        postId,
      },
    },
  });
};

const commentAddLike = async (commentId: string, userUuid: string) => {
  await prisma.comment.updateMany({
    where: {
      uuid: commentId,
    },
    data: {
      likes: {
        increment: 1,
      },
    },
  });

  return await prisma.likeHistory.createMany({
    data: {
      userUuid,
      commentId,
    },
  });
};

const commentRemoveLike = async (commentId: string, userUuid: string) => {
  await prisma.comment.update({
    where: {
      uuid: commentId,
    },
    data: {
      likes: {
        decrement: 1,
      },
    },
  });

  return await prisma.likeHistory.deleteMany({
    where: {
      commentId,
      userUuid,
    },
  });
};

const isLikedByUser = async (
  uuid: string,
  userUuid: string,
  postOrComment: "post" | "comment"
) => {
  if (!userUuid) {
    return false;
  }

  if (postOrComment === "post") {
    return await prisma.likeHistory.findFirst({
      where: {
        postId: uuid,
        userUuid,
      },
    });
  } else if (postOrComment === "comment") {
    return await prisma.likeHistory.findFirst({
      where: {
        commentId: uuid,
        userUuid,
      },
    });
  }

  return null;
};

export {
  postAddLike,
  postRemoveLike,
  commentAddLike,
  commentRemoveLike,
  isLikedByUser,
};
