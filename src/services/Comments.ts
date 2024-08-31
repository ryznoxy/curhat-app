import prisma from "@/lib/prisma";

interface CommentProps {
  content: string;
  postId: string;
  userId: string;
}

const getComments = async (postId: string) => {
  return await prisma.comment.findMany({
    where: {
      postId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const makeComment = async ({ content, postId, userId }: CommentProps) => {
  return await prisma.comment.create({
    data: {
      content,
      postId,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

const deleteComment = async (commentId: string) => {
  return await prisma.comment.delete({
    where: {
      uuid: commentId,
    },
  });
};

export { getComments, deleteComment, makeComment };
