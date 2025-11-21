import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uccayukjjrvnsnotfxhz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjY2F5dWtqanJ2bnNub3RmeGh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTE2NDIsImV4cCI6MjA2OTkyNzY0Mn0.y6Lmk5ffKSPg0A-lwTCUmb3IXsPPKPp-MzoKE2PfzfE";

export const supabase = createClient(supabaseUrl, supabaseKey);
