import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Supabase URL defined:", supabaseUrl); // Temporary validation logging

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase not configured");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
