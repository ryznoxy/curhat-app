import supabase from "@/lib/supabase";

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return console.log(error);
  }

  // window.location.reload();
};
