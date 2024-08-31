import prisma from "@/lib/prisma";

export const getCurhatanDetail = async (postId: string) => {
  return await prisma.post.findUnique({
    where: {
      uuid: postId,
    },
  });
};
