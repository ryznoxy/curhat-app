import React, { Suspense } from "react";
import Profile from "./profile";
import Link from "next/link";
import Image from "next/image";
import { useUserSession } from "@/lib/auth";

export default function Navbar() {
  const { user }: any = useUserSession();

  return (
    <div className="max-w-4xl mx-auto sticky top-2 z-[49]">
      <div className="p-2 border rounded-3xl mt-2 mx-2  bg-white dark:bg-[#0a0a0a] backdrop-blur-md ">
        <div className="flex items-center justify-between ">
          <Link
            href="/"
            className="text-base md:text-xl font-bold inline-flex items-center"
          >
            <Image
              src="/logo.webp"
              alt="logo"
              width={50}
              height={50}
              className="dark:invert w-10 h-10 md:w-14 md:h-14"
            />
            Curhatify
          </Link>

          <div className="inline-flex items-center gap-2">
            <Suspense fallback={<div>Loading...</div>}>
              <Profile user={user} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
