import prisma from "@/lib/prisma";

export const getCurhatanList = async () => {
  return await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
