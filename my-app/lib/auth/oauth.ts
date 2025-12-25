"use client";

import { supabase } from "@/lib/supabase/client";

/* ======================
   OAuth providers
====================== */

export async function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/`,
    },
  });
}

export async function signInWithFacebook() {
  return supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: `${window.location.origin}/`,
    },
  });
}

