"use client";
import { useUserSession } from "@/lib/auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const { user }: any = useUserSession();

  const router = useRouter();
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (!user)
    return (
      <div className="text-center mt-32 font-medium text-3xl">
        You must be logged in!
      </div>
    );

  return (
    <div className="h-80 w-full flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-6 p-8 rounded-2xl text-center border dark:border-neutral-900 bg-gradient-to-br from-neutral-200 from-10% to-90% to-white dark:from-neutral-900 dark:to-black transition-colors ease-in-out duration-500">
        <h1 className="font-bold text-xl">Logout</h1>

        <div className="inline-flex flex-col gap-2">
          <p>
            Hi, <span className="font-semibold">{user?.name}</span>
          </p>
          <p>Are you sure you want to logout ?</p>
        </div>

        <div className="flex gap-4 w-full">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 border w-full border-red-200 dark:border-red-900 rounded-lg bg-gradient-to-b from-red-200 to-white dark:from-red-900/50 dark:to-black text-black dark:text-white hover:scale-105 transition-all ease-in-out"
          >
            No
          </button>
          <button
            onClick={() => handleLogout()}
            className="px-6 py-3 border w-full rounded-lg bg-gradient-to-b from-red-400 to-red-500 dark:from-red-500 dark:to-red-700 text-white  hover:scale-105 transition-all ease-in-out"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
