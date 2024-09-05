import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React from "react";
import LoginButton from "./loginButton";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session)
    return (
      <div className="text-center mt-32 font-medium text-3xl">
        You are already logged in!
      </div>
    );

  if (!session) {
    return (
      <div className="h-80 w-full flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center justify-center gap-6 p-8  rounded-2xl text-center border dark:border-slate-900 bg-gradient-to-br from-neutral-200 from-10% to-90% to-white dark:from-slate-900 dark:to-black transition-colors ease-in-out duration-500">
          <h1 className="font-bold text-xl">Login</h1>

          <div className="flex gap-4 w-full">
            <LoginButton />
          </div>
        </div>
      </div>
    );
  }
}
