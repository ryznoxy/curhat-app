"use client";
import CurhatanListPage from "@/components/page/curhatanListPage";
import LoginPage from "@/components/page/LoginPage";
import LogoutPage from "@/components/page/LogoutPage";
import MakeCurhatanPage from "@/components/page/makeCurhatanPage";
import UseAuth from "@/hooks/useAuth";
import { signOut } from "@/services/signOut";

export default function Home() {
  const { user }: any = UseAuth();

  return (
    <div className="my-4">
      <div>
        <CurhatanListPage user={user} />
      </div>
    </div>
  );
}
