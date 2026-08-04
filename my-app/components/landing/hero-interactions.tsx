// components/landing/hero-interactions.tsx
"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import HeroAuthButtons from "./hero-auth-buttons";
import { useLandingAuth } from "./landing-auth-provider";
import SmoothAnchorLink from "./smooth-anchor-link";

const heroDescriptions = [
  {
    mobile: ["Ottawa-Based, Canadian-Born,", "and Chinese-Raised Musician"],
    desktop: "Ottawa-Based, Canadian-Born, and Chinese-Raised Musician",
  },
  {
    mobile: ["Piano Instructor, Software Developer,", "and Digital Creator"],
    desktop: "Piano Instructor, Software Developer, and Digital Creator",
  },
  {
    mobile: ["Modern Creativity, Diverse Cultures,", "and Personal Expression"],
    desktop: "Modern Creativity, Diverse Cultures, and Personal Expression",
  },
];

//Text Animation
const TEXT_SLIDE_MS = 700;
const TEXT_HOLD_MS = 3000;

export default function HeroInteractions() {
  const { initialAuthChecked } = useLandingAuth();
  const [visible, setVisible] = useState(false);

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [nextTextIndex, setNextTextIndex] = useState(1);
  const [textSliding, setTextSliding] = useState(false);
  const [textCanAnimate, setTextCanAnimate] = useState(true);

  useEffect(() => {
    if (!initialAuthChecked) return;

    const contentTimer = window.setTimeout(() => {
      setVisible(true);

      window.dispatchEvent(new Event("landing-intro-visible"));
    }, 600);

    return () => window.clearTimeout(contentTimer);
  }, [initialAuthChecked]);

  useEffect(() => {
    const holdTimer = setTimeout(() => {
      setTextSliding(true);

      const finishTimer = setTimeout(() => {
        setTextCanAnimate(false);
        setCurrentTextIndex(nextTextIndex);
        setNextTextIndex((nextTextIndex + 1) % heroDescriptions.length);
        setTextSliding(false);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTextCanAnimate(true);
          });
        });
      }, TEXT_SLIDE_MS);

      return () => clearTimeout(finishTimer);
    }, TEXT_HOLD_MS);

    return () => clearTimeout(holdTimer);
  }, [currentTextIndex, nextTextIndex]);

  return (
    <div
      className={`relative z-10 container mx-auto
                        grid items-center

                        grid-cols-[1rem_minmax(0,1fr)_1rem]
                        sm:grid-cols-[2rem_minmax(0,1fr)_2rem]
                        md:grid-cols-[5rem_minmax(0,1fr)_5rem]
                        lg:grid-cols-[8rem_minmax(0,1fr)_8rem]
                        xl:grid-cols-[12rem_minmax(0,1fr)_12rem]
                        
                        transition-all duration-700 ease-out
                        ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    >
      <div className="flex flex-col h-full justify-between items-center">
        <div
          aria-label="Treble clef"
          className={`
                  md:h-40 md:w-20
                  lg:h-56 lg:w-24
                  xl:h-80 xl:w-32

                  bg-[linear-gradient(to_bottom_left,theme(colors.amber.100)_25%,theme(colors.red.300)_50%,theme(colors.fuchsia.500)_75%)]

                  transition-all duration-[1400ms]
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  ${
                    visible
                      ? "translate-x-0 opacity-75"
                      : "-translate-x-32 opacity-0"
                  }
                `}
          style={{
            WebkitMaskImage: "url('/hero-images/treble-clef.png')",
            WebkitMaskPosition: "center",
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",

            maskImage: "url('/hero-images/treble-clef.png')",
            maskPosition: "center",
            maskSize: "contain",
            maskRepeat: "no-repeat",
          }}
        />
        <div
          aria-label="Bass clef"
          className={`
                  md:h-40 md:w-20
                  lg:h-56 lg:w-24
                  xl:h-80 xl:w-32

                  bg-[linear-gradient(to_top_right,theme(colors.amber.100)_25%,theme(colors.red.300)_50%,theme(colors.fuchsia.500)_75%)]

                  transition-all duration-[1400ms]
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  ${
                    visible
                      ? "translate-x-0 opacity-75"
                      : "-translate-x-32 opacity-0"
                  }
                `}
          style={{
            WebkitMaskImage: "url('/hero-images/bass-clef.png')",
            WebkitMaskPosition: "center",
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",

            maskImage: "url('/hero-images/bass-clef.png')",
            maskPosition: "center",
            maskSize: "contain",
            maskRepeat: "no-repeat",
          }}
        />
      </div>
      <div className="min-w-0 text-center">
        <h1
          className="
                      mt-2 mb-3
                      font-great-vibes text-8xl font-bold tracking-wide text-amber-400
                      [text-shadow:0_5px_10px_rgba(255,215,0,0.5),5px_0_10px_rgba(255,215,0,0.5)]
                      sm:mt-4 sm:mb-5
                      md:text-9xl
                      lg:mt-12 lg:mb-12 lg:tracking-widest
                    "
        >
          Steven Sun
        </h1>
        <h2
          className="
                      mb-4 flex w-full flex-col items-center gap-1
                      font-marcellus text-2xl font-semibold
                      [text-shadow:0_2px_10px_rgba(245,158,11,0.1)]
                      sm:text-4xl
                      md:mb-6 md:text-5xl
                      lg:mb-12
                      2xl:flex-row 2xl:justify-center 2xl:gap-0
                    "
        >
          <SmoothAnchorLink
            href="#description-cards"
            className="block whitespace-nowrap"
          >
            <span
              className="bg-gradient-to-t from-gray-200 to-amber-300 bg-clip-text text-transparent 
                                          transition-color duration-300 hover:text-amber-300
                                          active:transition-none active:text-amber-300"
            >
              Piano
            </span>
          </SmoothAnchorLink>
          <span className="mx-4 hidden shrink-0 text-gray-300 2xl:inline">
            ·
          </span>
          <SmoothAnchorLink
            href="#description-cards"
            className="block whitespace-nowrap"
          >
            <span
              className="bg-gradient-to-t from-gray-200 to-violet-300 bg-clip-text text-transparent
                                          transition-color duration-300 hover:text-violet-300
                                          active:transition-none active:text-violet-300"
            >
              Professional Vibemaster
            </span>
          </SmoothAnchorLink>
          <span className="mx-4 hidden shrink-0 text-gray-300 2xl:inline">
            ·
          </span>
          <SmoothAnchorLink
            href="#description-cards"
            className="block whitespace-nowrap"
          >
            <span
              className="bg-gradient-to-t from-gray-200 to-rose-300 bg-clip-text text-transparent
                                          transition-color duration-300 hover:text-rose-300
                                          active:transition-none active:text-rose-300"
            >
              Creative Voice
            </span>
          </SmoothAnchorLink>
        </h2>
        <div
          className="
                      mb-5 grid h-[4.5rem] w-full min-w-0 overflow-hidden text-center
                      sm:h-[3.5rem]
                      md:mb-10 md:h-[4rem]
                      xl:mb-14 xl:h-auto
                    "
        >
          {/* Next text */}
          <p
            className={`
                        col-start-1 row-start-1 m-0
                        flex h-full w-full min-w-0 items-center justify-center
                        text-center
                        whitespace-nowrap

                        font-poppins text-xs font-light
                        sm:text-sm
                        md:text-lg
                        lg:text-xl
                        2xl:text-2xl

                        bg-gradient-to-r
                        from-gray-100 via-amber-300 to-gray-100
                        bg-clip-text text-transparent
                        ${textCanAnimate ? "transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]" : "transition-none"}
                        ${textSliding ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"}
                      `}
          >
            <>
              <span className="block sm:hidden">
                {heroDescriptions[nextTextIndex].mobile[0]}
                <br />
                {heroDescriptions[nextTextIndex].mobile[1]}
              </span>

              <span className="hidden sm:block">
                {heroDescriptions[nextTextIndex].desktop}
              </span>
            </>
          </p>

          {/* Current text */}
          <p
            className={`
                    col-start-1 row-start-1 m-0
                    flex h-full w-full min-w-0 items-center justify-center
                    text-center
                    whitespace-nowrap

                    font-poppins text-xs font-light
                    sm:text-sm
                    md:text-lg
                    lg:text-xl
                    2xl:text-2xl

                    bg-gradient-to-r
                    from-gray-100 via-amber-300 to-gray-100
                    bg-clip-text text-transparent
                    ${
                      textCanAnimate
                        ? "transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                        : "transition-none"
                    }
                    ${
                      textSliding
                        ? "translate-y-12 opacity-0"
                        : "translate-y-0 opacity-100"
                    }
                  `}
          >
            <span className="block sm:hidden">
              {heroDescriptions[currentTextIndex].mobile[0]}
              <br />
              {heroDescriptions[currentTextIndex].mobile[1]}
            </span>

            <span className="hidden sm:block">
              {heroDescriptions[currentTextIndex].desktop}
            </span>
          </p>
        </div>

        <div
          className="
                      relative z-20
                      flex flex-col items-center
                      gap-2
                      font-redHatDisplay
                      sm:gap-3
                    "
        >
          <Button
            asChild
            className="
                        h-10 rounded-full
                        bg-destructive
                        px-5
                        text-base font-bold text-gray-300
                        cursor-pointer
                        hover:text-black
                        active:transition-none active:text-black
                        sm:h-12 sm:px-8 sm:text-xl
                      "
          >
            <Link href="/music">
              Music
              <ArrowRight className="ml-1.5 h-4 w-4 sm:ml-2 sm:h-5 sm:w-5" />
            </Link>
          </Button>

          <HeroAuthButtons />
        </div>
      </div>
      <div className="flex flex-col h-full justify-between items-center">
        <div
          aria-label="Treble clef"
          className={`
                  md:h-40 md:w-20
                  lg:h-56 lg:w-24
                  xl:h-80 xl:w-32

                  bg-[linear-gradient(to_bottom_left,theme(colors.amber.100)_25%,theme(colors.red.300)_50%,theme(colors.fuchsia.500)_75%)]

                  transition-all duration-[1400ms]
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  ${
                    visible
                      ? "translate-x-0 opacity-75"
                      : "translate-x-32 opacity-0"
                  }
                `}
          style={{
            WebkitMaskImage: "url('/hero-images/treble-clef.png')",
            WebkitMaskPosition: "center",
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",

            maskImage: "url('/hero-images/treble-clef.png')",
            maskPosition: "center",
            maskSize: "contain",
            maskRepeat: "no-repeat",
          }}
        />
        <div
          aria-label="Bass clef"
          className={`
                  md:h-40 md:w-20
                  lg:h-56 lg:w-24
                  xl:h-80 xl:w-32

                  bg-[linear-gradient(to_top_right,theme(colors.amber.100)_25%,theme(colors.red.300)_50%,theme(colors.fuchsia.500)_75%)]

                  transition-all duration-[1400ms]
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  ${
                    visible
                      ? "translate-x-0 opacity-75"
                      : "translate-x-32 opacity-0"
                  }
                `}
          style={{
            WebkitMaskImage: "url('/hero-images/bass-clef.png')",
            WebkitMaskPosition: "center",
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",

            maskImage: "url('/hero-images/bass-clef.png')",
            maskPosition: "center",
            maskSize: "contain",
            maskRepeat: "no-repeat",
          }}
        />
      </div>
    </div>
  );
}
