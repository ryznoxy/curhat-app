"use client";
import React, { useEffect } from "react";
// import { signInWithGithub } from "@/services/signIn";
import { saveUserToDB } from "@/services/saveUserToDB";
import { FaGithub } from "react-icons/fa6";
import { login } from "@/lib/auth";

export default function LoginPage() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSignIn = async () => {
    login();
  };

  useEffect(() => {
    saveUserToDB();
  }, [handleSignIn]);

  return (
    <div className="h-80 w-full flex flex-col items-center justify-center text-center">
      <div className="border-2 rounded-xl">
        <h1 className="border-b px-4 py-3">You need to login</h1>
        <div className="w-full p-4">
          <button
            onClick={handleSignIn}
            className="flex items-center px-4 py-2 rounded-md text-center bg-neutral-700 text-white  hover:bg-neutral-800 transition-colors duration-300"
          >
            <FaGithub className="mr-2" /> Login With Github
          </button>
        </div>
      </div>
    </div>
  );
}
