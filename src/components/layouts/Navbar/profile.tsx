"use client";
import useCallbackUrl from "@/hooks/useCallbackUrl";
// import { login, logout } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useEffect, useState } from "react";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FiEdit, FiEdit3 } from "react-icons/fi";
import ThemeToggle from "./themeToggle";

export default function Profile({ user }: any) {
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const callbackUrl = useCallbackUrl();

  const username = user?.name;
  const pfpUrl = user?.image;

  const router = useRouter();

  const handleLogOut = async () => {
    router.push("/auth/logout");
  };

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const saveUserToDB = async () => {
      const res = await fetch("/api/save-user-to-db", {
        method: "POST",
      });

      if (!res.ok) {
        console.error("Failed to save user to DB");
      }
    };

    if (user) {
      saveUserToDB();
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".profile-image")
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex gap-4 items-center ">
      <ThemeToggle />

      {user && (
        <div>
          <Link
            href="/new"
            className="inline-flex items-center justify-center bg-neutral-700 hover:bg-neutral-900 text-white text-sm font-medium p-2 md:py-2 md:px-4 w-full rounded-xl dark:hover:bg-neutral-800 transition-all duration-300"
          >
            New
            <FiEdit3 className="ml-1" size={20} />
          </Link>
        </div>
      )}

      <div>
        {!user ? (
          <div className="mr-2">
            {/* <button
              onClick={() => {
                handleLogIn();
              }}
              className="py-2 px-6 bg-neutral-700 hover:bg-neutral-900 dark:hover:bg-neutral-800 text-white text-sm font-medium rounded inline-flex items-center hover:scale-105 transition-all duration-300"
            >
              <BiLogIn className="mr-1" size={20} /> Login
            </button> */}
            <Link
              href={`/auth/login?callbackUrl=${callbackUrl}`}
              className="inline-flex items-center justify-center bg-neutral-700 hover:bg-neutral-900 text-white text-sm font-medium p-2 md:py-2 md:px-4 w-full rounded-xl dark:hover:bg-neutral-800 transition-all duration-300"
            >
              Login
              <BiLogIn className="ml-1" size={20} />
            </Link>
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-hidden rounded-full border-2 border-neutral-400 w-12 md:w-fit">
              <Image
                src={pfpUrl ?? "/pfp.svg"}
                alt="profile"
                width={50}
                height={50}
                onClick={handleDropdown}
                className="profile-image cursor-pointer hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div
              ref={dropdownMenuRef}
              className={`absolute top-16 right-0 bg-neutral-50 dark:bg-neutral-900 border rounded-2xl space-y-2 ${
                isDropdownOpen ? "" : "hidden"
              }`}
            >
              <p className="border-b px-4 py-2">
                {(username?.length > 18
                  ? username.slice(0, 17) + "..."
                  : username) ?? "username"}
              </p>
              {/* <div className="px-2 pb-2 border-b">
                {user && (
                  <Link
                    href="/new"
                    className="inline-flex items-center justify-center bg-neutral-700 hover:bg-neutral-900 text-white text-sm font-medium py-2 px-4 w-full rounded dark:hover:bg-neutral-800 transition-all duration-300"
                  >
                    <FiEdit className="mr-1" size={20} />
                    New
                  </Link>
                )}
              </div> */}
              <div className="px-2 pb-2">
                <button
                  onClick={() => {
                    handleLogOut();
                  }}
                  className="inline-flex items-center justify-center bg-neutral-700 hover:bg-neutral-900 text-white text-sm font-medium p-2 md:py-2 md:px-4 w-full rounded-xl dark:hover:bg-neutral-800 transition-all duration-300"
                >
                  Logout <BiLogOut className="ml-1" size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
