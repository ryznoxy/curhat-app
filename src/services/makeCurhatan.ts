import prisma from "@/lib/prisma";

interface CurhatanProps {
  content: string;
  title: string;
  userEmail: string;
}

export const makeCurhatan = async ({
  content,
  title,
  userEmail,
}: CurhatanProps) => {
  return await prisma.post.create({
    data: {
      content,
      title,
      userEmail,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};
