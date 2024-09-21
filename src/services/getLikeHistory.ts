import prisma from "@/lib/prisma";

const getLikeHistory = async (userUuid: string) => {
  const likeHistory = await prisma.likeHistory.findMany({
    where: {
      userUuid,
    },
    include: {
      post: true,
      comment: true,
    },
  });
  return likeHistory;
};

export default getLikeHistory;
