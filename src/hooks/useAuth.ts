import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";

const UseAuth = () => {
  const [user, setUser] = useState(null as any);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setLoading(false);
      if (user) {
        setUser(user);
      }
    };

    getUser();
  }, []);

  const userData = {
    name: user?.user_metadata?.preferred_username,
    email: user?.user_metadata?.email,
    uuid: user?.id,
    pfpUrl: user?.user_metadata?.avatar_url,
  };

  if (user) return { user: userData, loading };
  if (!user) return { user: null };
};

export default UseAuth;
