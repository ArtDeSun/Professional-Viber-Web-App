// components/landing/sign-up-section-gate.tsx
"use client";

import SignUpSection from "@/components/sign-up-section";
import { useLandingAuth } from "./landing-auth-provider";

export default function SignUpSectionGate() {
  const { initialAuthChecked, isLoggedIn } = useLandingAuth();

  if (!initialAuthChecked || isLoggedIn) {
    return null;
  }

  return <SignUpSection />;
}
