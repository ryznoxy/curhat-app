import prisma from "@/lib/prisma";

export const getUserByUUID = async (uuid: string) => {
  return await prisma.user.findUnique({
    where: {
      uuid,
    },
  });
};
