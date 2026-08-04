// components/landing/hero-auth-buttons.tsx
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLandingAuth } from "./landing-auth-provider";
import SmoothAnchorLink from "./smooth-anchor-link";

const secondaryButtonClasses = `
  h-8 rounded-full
  border-white bg-transparent
  px-4
  text-sm text-gray-300
  cursor-pointer
  hover:border-amber-400 hover:text-amber-400
  active:transition-none
  active:border-amber-400 active:text-amber-400
  sm:h-9 sm:px-6 sm:text-base
`;

export default function HeroAuthButtons() {
  const { initialAuthChecked, isLoggedIn } = useLandingAuth();
  const showGuestActions = initialAuthChecked && !isLoggedIn;

  return (
    <>
      <div className="flex min-h-8 flex-wrap items-center justify-center gap-2 sm:min-h-9 sm:gap-4">
        {showGuestActions && (
          <Button asChild className={secondaryButtonClasses}>
            <SmoothAnchorLink href="#signup">Sign Up</SmoothAnchorLink>
          </Button>
        )}

        <Button asChild className={secondaryButtonClasses}>
          <SmoothAnchorLink href="#contact">Contact</SmoothAnchorLink>
        </Button>
      </div>

      <div className="min-h-10 sm:min-h-12">
        {showGuestActions && (
          <div className="flex h-10 items-center sm:h-12">
            <Button
              asChild
              className="
                h-8 rounded-full
                bg-gray-300
                px-4
                text-base font-bold text-black
                cursor-pointer
                transition-all duration-300
                hover:bg-white
                active:transition-none active:bg-white
                sm:h-9 sm:px-6 sm:text-lg
                sm:hover:h-10 sm:hover:px-7 sm:hover:text-xl
                sm:active:h-10 sm:active:px-7 sm:active:text-xl
              "
            >
              <Link href="/lessons">Lessons</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
