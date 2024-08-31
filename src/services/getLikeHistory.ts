import prisma from "@/lib/prisma";

const getLikeHistory = async (userId: string) => {
  const likeHistory = await prisma.likeHistory.findMany({
    where: {
      userId,
    },
    include: {
      post: true,
      comment: true,
    },
  });
  return likeHistory;
};

export default getLikeHistory;
