"use client";
import UseAuth from "@/hooks/useAuth";
import { signInWithGithub } from "@/services/signIn";
import { signOut } from "@/services/signOut";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import { BiExit, BiLogIn, BiLogOut } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";

export default function Profile() {
  const { user }: any = UseAuth();
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown visibility

  const username = user?.name;
  const pfpUrl = user?.pfpUrl;

  const handleLogIn = async () => {
    await signInWithGithub();
  };

  const handleLogOut = async () => {
    const yes = confirm("Are you sure you want to logout?");
    if (!yes) {
      return;
    }

    await signOut();
  };

  const handleDropdown = () => {
    // Toggle dropdown visibility using state
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle click outside to close the dropdown
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
    <div className="flex gap-2 items-center">
      <div>
        {user && (
          <Link
            href="/new"
            className="inline-flex items-center bg-neutral-500 dark:bg-neutral-600 hover:bg-neutral-700 dark:hover:bg-neutral-800 text-white text-sm font-medium p-2 md:py-2 md:px-4 rounded transition-colors duration-300"
          >
            <FiEdit className="mr-1" size={20} />
            New
          </Link>
        )}
      </div>

      <div>
        {!user ? (
          <div className="p-2">
            <button
              onClick={() => {
                handleLogIn();
              }}
              className="py-2 px-6 bg-neutral-700 hover:bg-neutral-900 dark:hover:bg-neutral-800 text-white text-sm font-medium rounded inline-flex items-center hover:scale-105 transition-all duration-300"
            >
              <BiLogIn className="mr-1" size={20} /> Login
            </button>
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-hidden rounded-full border-2 border-neutral-400 w-10 md:w-fit">
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
              className={`absolute top-16 right-0 bg-neutral-50 dark:bg-neutral-900 border rounded-md space-y-2 ${
                isDropdownOpen ? "" : "hidden"
              }`}
            >
              <p className="border-b px-4 py-2">
                {(username?.length > 18
                  ? username.slice(0, 17) + "..."
                  : username) ?? "username"}
              </p>
              <div className="px-2 pb-2">
                <button
                  onClick={() => {
                    handleLogOut();
                  }}
                  className="inline-flex items-center bg-neutral-700 hover:bg-neutral-900 text-white text-sm font-medium py-2 px-4 w-full rounded dark:hover:bg-neutral-800 transition-all duration-300"
                >
                  <BiLogOut className="mr-1" size={20} /> Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
