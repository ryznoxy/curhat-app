import { signOut } from "@/services/signOut";
import React from "react";

export default function LogoutPage() {
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="border my-3 p-4">
      <h1>Logout Page</h1>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
