import { getUserServer } from "@/lib/auth";
import supabase from "@/lib/supabase";
import { getSession } from "next-auth/react";
import { headers } from "next/headers";

export const saveUserToDB = async () => {
  fetch("/api/save-user-to-db", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ok: true }),
  });
};
