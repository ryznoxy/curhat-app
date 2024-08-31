import prisma from "@/lib/prisma";

interface CurhatanProps {
  content: string;
  title: string;
  userId: string;
}

export const makeCurhatan = async ({
  content,
  title,
  userId,
}: CurhatanProps) => {
  return await prisma.post.create({
    data: {
      content,
      title,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};
