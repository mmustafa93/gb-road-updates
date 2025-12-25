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

/* ======================
   Phone (SMS OTP) auth
====================== */

/**
 * Step 1: Send OTP to phone number
 * Phone must be in E.164 format: +923001234567
 */
export async function sendPhoneOtp(phone: string) {
  return supabase.auth.signInWithOtp({
    phone,
  });
}

/**
 * Step 2: Verify OTP
 * This completes BOTH signup & login
 */
export async function verifyPhoneOtp(
  phone: string,
  token: string
) {
  return supabase.auth.verifyOtp({
    phone,
    token,
    type: "sms",
  });
}
