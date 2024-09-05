"use client";
import LoginPage from "@/components/page/LoginPage";
import MakeCurhatanPage from "@/components/page/makeCurhatanPage";
import UseAuth from "@/hooks/useAuth";
import { useUserSession } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const { user }: any = useUserSession();

  const router = useRouter();

  if (!user) return router.push("/auth/login?callbackUrl=/new");

  return <div>{user && <MakeCurhatanPage user={user} />}</div>;
}
