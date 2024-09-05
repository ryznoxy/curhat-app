import prisma from "@/lib/prisma";

const getLikeHistory = async (userEmail: string) => {
  const likeHistory = await prisma.likeHistory.findMany({
    where: {
      userEmail,
    },
    include: {
      post: true,
      comment: true,
    },
  });
  return likeHistory;
};

export default getLikeHistory;
