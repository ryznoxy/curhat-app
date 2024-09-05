"use client";
import CurhatanListPage from "@/components/page/curhatanListPage";
import { useUserSession } from "@/lib/auth";

export default function Home() {
  const { user }: any = useUserSession();

  //bikin custom pages untuk next auth

  return (
    <div className="my-4">
      <CurhatanListPage user={user} />
    </div>
  );
}
