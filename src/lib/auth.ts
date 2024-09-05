import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

export const getUserServer = async () => {
  const { user }: any = await getServerSession(authOptions);

  return user;
};

export const useUserSession = () => {
  const { data }: any = useSession();

  return { user: data?.user };
};

export const login = () => {
  return (location.pathname = "/api/auth/signin");
};

export const logout = () => {
  return (location.pathname = "/api/auth/signout");
};
