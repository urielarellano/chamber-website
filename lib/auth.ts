import { supabase } from "@/lib/supabase";

export const loginAdmin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login failed:", error.message);
    return null;
  }

  console.log("Admin logged in:", data.user);
  return data.user;
};