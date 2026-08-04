// components/landing/landing-auth-provider.tsx
"use client";

import { useSession } from "@/lib/auth/auth-client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type LandingAuth = {
  initialAuthChecked: boolean;
  isLoggedIn: boolean;
};

const LandingAuthContext = createContext<LandingAuth | null>(null);

export function LandingAuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();
  const [initialAuthChecked, setInitialAuthChecked] = useState(false);

  useEffect(() => {
    if (!isPending) {
      setInitialAuthChecked(true);
    }
  }, [isPending]);

  return (
    <LandingAuthContext.Provider
      value={{
        initialAuthChecked,
        isLoggedIn: Boolean(session?.user),
      }}
    >
      {children}
    </LandingAuthContext.Provider>
  );
}

export function useLandingAuth() {
  const context = useContext(LandingAuthContext);

  if (!context) {
    throw new Error("useLandingAuth must be used inside LandingAuthProvider");
  }

  return context;
}
