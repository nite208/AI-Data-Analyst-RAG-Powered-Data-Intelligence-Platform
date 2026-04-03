import { supabase } from './supabase';

const handleAuthError = (error) => {
  if (error?.message === "Failed to fetch") return "Network error";
  if (error?.message?.includes("Invalid login credentials") || error?.message?.includes("Invalid email or password")) return "Invalid credentials";
  return error?.message || "An unknown error occurred.";
};

export const login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return error ? { error: handleAuthError(error) } : { data };
  } catch (err) {
    if (err.message === "Supabase not configured") return { error: "Supabase not configured" };
    return { error: handleAuthError(err) };
  }
};

export const signup = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    return error ? { error: handleAuthError(error) } : { data };
  } catch (err) {
    if (err.message === "Supabase not configured") return { error: "Supabase not configured" };
    return { error: handleAuthError(err) };
  }
};

export const logout = async () => {
  try {
    await supabase.auth.signOut();
  } catch(err) {
    console.error(err);
  }
};
