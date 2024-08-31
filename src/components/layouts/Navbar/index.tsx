import React from "react";
import Profile from "./profile";
import Link from "next/link";
import ThemeToggle from "./themeToggle";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="max-w-4xl mx-auto sticky top-0 z-[99]">
      <div className="p-2 border-b  bg-white dark:bg-black ">
        <div className="flex items-center justify-between ">
          <Link href="/" className="text-xl font-bold inline-flex items-center">
            <Image
              src="/logo.webp"
              alt="logo"
              width={50}
              height={50}
              className="dark:invert"
            />
            Curhatify
          </Link>

          <div className="inline-flex items-center gap-4">
            <ThemeToggle />
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
}
