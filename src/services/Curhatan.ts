import prisma from "@/lib/prisma";

const deleteCurhatan = async (uuid: string) => {
  //delete all comments
  await prisma.comment.deleteMany({
    where: {
      postId: uuid,
    },
  });

  //delete all liked post and comment
  await prisma.likeHistory.deleteMany({
    where: {
      postId: uuid,
    },
  });

  return await prisma.post.delete({
    where: {
      uuid,
    },
  });
};

export { deleteCurhatan };
