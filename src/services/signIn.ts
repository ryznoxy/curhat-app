import supabase from "@/lib/supabase";

export const signInWithGithub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error) {
    console.log("Error during GitHub sign-in:", error);
    return;
  }
};
