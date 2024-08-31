"use client";
import LoginPage from "@/components/page/LoginPage";
import MakeCurhatanPage from "@/components/page/makeCurhatanPage";
import UseAuth from "@/hooks/useAuth";
import React from "react";

export default function Page() {
  const { user, loading }: any = UseAuth();

  if (!user) return <LoginPage />;
  if (loading) return <div>Loading...</div>;

  return <div>{user && <MakeCurhatanPage user={user} />}</div>;
}
