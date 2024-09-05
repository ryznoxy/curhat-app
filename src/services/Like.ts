import prisma from "@/lib/prisma";

const postAddLike = async (postId: string, userEmail: string) => {
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
      userEmail,
      postId,
    },
  });
};

const postRemoveLike = async (postId: string, userEmail: string) => {
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
        userEmail,
        postId,
      },
    },
  });
};

const commentAddLike = async (commentId: string, userEmail: string) => {
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
      userEmail,
      commentId,
    },
  });
};

const commentRemoveLike = async (commentId: string, userEmail: string) => {
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
      userEmail,
    },
  });
};

const isLikedByUser = async (
  uuid: string,
  userEmail: string,
  postOrComment: "post" | "comment"
) => {
  if (!userEmail) {
    return false;
  }

  if (postOrComment === "post") {
    return await prisma.likeHistory.findFirst({
      where: {
        postId: uuid,
        userEmail,
      },
    });
  } else if (postOrComment === "comment") {
    return await prisma.likeHistory.findFirst({
      where: {
        commentId: uuid,
        userEmail,
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
