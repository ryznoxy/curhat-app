import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "./authOptions";

export const getUserServer = async () => {
  const { user }: any = await getServerSession(authOptions);

  return user;
};

export const useUserSession = () => {
  const { data }: any = useSession();

  return { user: data?.user };
};
