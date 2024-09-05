"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FiGithub } from "react-icons/fi";

export default function LoginButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleLogin = async () => {
    await signIn("github", { callbackUrl });
  };
  return (
    <button
      onClick={handleLogin}
      className="flex items-center px-4 py-2 gap-4 border rounded-lg bg-gradient-to-b from-slate-800 to-slate-950 text-white hover:scale-105 transition-all ease-in-out"
    >
      <FiGithub /> Login with Github
    </button>
  );
}
