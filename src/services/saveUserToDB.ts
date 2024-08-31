import supabase from "@/lib/supabase";

export const saveUserToDB = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  fetch("/api/save-user-to-db", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
};
