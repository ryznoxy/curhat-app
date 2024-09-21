import prisma from "@/lib/prisma";

interface CurhatanProps {
  content: string;
  title: string;
  userUuid: string;
}

export const makeCurhatan = async ({
  content,
  title,
  userUuid,
}: CurhatanProps) => {
  return await prisma.post.create({
    data: {
      content,
      title,
      userUuid,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};
