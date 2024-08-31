import prisma from "@/lib/prisma";

const postAddLike = async (postId: string, userId: string) => {
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
      userId,
      postId,
    },
  });
};

const postRemoveLike = async (postId: string, userId: string) => {
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
        userId,
        postId,
      },
    },
  });
};

const commentAddLike = async (commentId: string, userId: string) => {
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
      userId,
      commentId,
    },
  });
};

const commentRemoveLike = async (commentId: string, userId: string) => {
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
      userId,
    },
  });
};

const isLikedByUser = async (
  uuid: string,
  userId: string,
  postOrComment: "post" | "comment"
) => {
  if (!userId) {
    return false;
  }

  if (postOrComment === "post") {
    return await prisma.likeHistory.findFirst({
      where: {
        postId: uuid,
        userId,
      },
    });
  } else if (postOrComment === "comment") {
    return await prisma.likeHistory.findFirst({
      where: {
        commentId: uuid,
        userId,
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
