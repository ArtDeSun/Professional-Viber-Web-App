"use client";

import HeroDescriptionsSection from "@/components/hero-descriptions-section";
import ImageTabs from "@/components/image-tabs";
import SignUpSection from "@/components/sign-up-section";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth/auth-client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function Home() {
  const { data: session, isPending } = useSession();

  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [heroBackgroundVisible, setHeroBackgroundVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const [initialAuthChecked, setInitialAuthChecked] = useState(false);
  useEffect(() => {
    if (!isPending && !initialAuthChecked) {
      setInitialAuthChecked(true);
    }
  }, [isPending, initialAuthChecked]);

  //Maybe produce flicker after signing up, signing in, or signing out
  const isLoggedIn = Boolean(session?.user);

  //Text Animation
  const TEXT_SLIDE_MS = 700;
  const TEXT_HOLD_MS = 3000;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [nextTextIndex, setNextTextIndex] = useState(1);
  const [textSliding, setTextSliding] = useState(false);
  const [textCanAnimate, setTextCanAnimate] = useState(true);

  // 1. Save scroll position before unload,
  // and only force top-of-page on real refresh
  useEffect(() => {
    history.scrollRestoration = "manual";

    const navEntry = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;

    const isReload = navEntry?.type === "reload";

    if (!isReload) {
      sessionStorage.removeItem("homeScrollY");
    } else {
      window.scrollTo(0, 0);
    }

    const handleBeforeUnload = () => {
      sessionStorage.setItem("homeScrollY", String(window.scrollY));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // 2. Start hero animations
  useEffect(() => {
    if (!initialAuthChecked || !heroImageLoaded) return;
    const backgroundTimer = setTimeout(() => {
      setHeroBackgroundVisible(true);
    }, 100);
    const contentTimer = setTimeout(() => {
      setVisible(true);
    }, 900);

    const destination = new URLSearchParams(window.location.search).get(
      "destination",
    );

    const signUpScrollTimer =
      destination === "signup"
        ? window.setTimeout(() => {
            history.replaceState(null, "", "/#signup");

            document.getElementById("signup")?.scrollIntoView({
              behavior: "smooth",
            });
          }, 2000)
        : undefined;

    return () => {
      window.clearTimeout(backgroundTimer);
      window.clearTimeout(contentTimer);

      if (signUpScrollTimer !== undefined) {
        window.clearTimeout(signUpScrollTimer);
      }
    };
  }, [initialAuthChecked, heroImageLoaded]);

  // 3. Restore scroll after intro animation
  useEffect(() => {
    if (!visible) return;

    const savedY = sessionStorage.getItem("homeScrollY");
    if (!savedY) return;

    const timer = setTimeout(() => {
      window.scrollTo({
        top: Number(savedY),
        behavior: "smooth",
      });

      sessionStorage.removeItem("homeScrollY");
    }, 1100);

    return () => clearTimeout(timer);
  }, [visible]);

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
    <div className="flex flex-col">
      <main className="flex-1">
        {/* Hero Section - Landing Page */}
        <section
          /* id="steven_sun" */
          className="flex bg-black relative min-h-screen overflow-hidden
                     px-4 pb-6 pt-16
                     sm:px-6 sm:pb-12
                     lg:px-8 lg:py-46"
        >
          <Image
            src="/hero-images/AI_Generated_Basement_Studio.png"
            alt=""
            fill
            sizes="100vw"
            priority
            onLoad={() => setHeroImageLoaded(true)}
            className={`object-cover object-center transition-all duration-[1400ms] ease-out
                        ${heroBackgroundVisible ? "opacity-100" : "opacity-0"}`}
          />
          <div className="absolute inset-0 bg-black/60" />

          <div
            className={`relative z-10 container mx-auto
                        grid items-center

                        grid-cols-[1rem_minmax(0,1fr)_1rem]
                        sm:grid-cols-[2rem_minmax(0,1fr)_2rem]
                        md:grid-cols-[5rem_minmax(0,1fr)_5rem]
                        lg:grid-cols-[8rem_minmax(0,1fr)_8rem]
                        xl:grid-cols-[12rem_minmax(0,1fr)_12rem]

                        transition-all ease-out duration-1000 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} 
                      `}
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

            <div className="flex min-w-0 flex-col items-center text-center">
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
                <Link
                  href="/#description-cards"
                  className="block whitespace-nowrap"
                  onClick={(e) => {
                    e.preventDefault();
                    history.pushState(null, "", "#description-cards");
                    document
                      .getElementById("description-cards")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                >
                  <span
                    className="bg-gradient-to-t from-gray-200 to-amber-300 bg-clip-text text-transparent 
                                  transition-color duration-300 hover:text-amber-300"
                  >
                    Piano
                  </span>
                </Link>
                <span className="mx-4 hidden shrink-0 text-gray-300 2xl:inline">
                  ·
                </span>
                <Link
                  href="/#description-cards"
                  className="block whitespace-nowrap"
                  onClick={(e) => {
                    e.preventDefault();
                    history.pushState(null, "", "#description-cards");
                    document
                      .getElementById("description-cards")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                >
                  <span
                    className="bg-gradient-to-t from-gray-200 to-violet-300 bg-clip-text text-transparent
                                  transition-color duration-300 hover:text-violet-300"
                  >
                    Professional Vibemaster
                  </span>
                </Link>
                <span className="mx-4 hidden shrink-0 text-gray-300 2xl:inline">
                  ·
                </span>
                <Link
                  href="/#description-cards"
                  className="block whitespace-nowrap"
                  onClick={(e) => {
                    e.preventDefault();
                    history.pushState(null, "", "#description-cards");
                    document
                      .getElementById("description-cards")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                >
                  <span
                    className="bg-gradient-to-t from-gray-200 to-rose-300 bg-clip-text text-transparent
                                  transition-color duration-300 hover:text-rose-300"
                  >
                    Creative Voice
                  </span>
                </Link>
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
                <Link href="/music">
                  <Button
                    className="
                      h-10 rounded-full
                      bg-destructive
                      px-5
                      text-base font-bold text-gray-300
                      cursor-pointer
                      hover:text-black
                      sm:h-12 sm:px-8 sm:text-xl
                    "
                  >
                    Music
                    <ArrowRight className="ml-1.5 h-4 w-4 sm:ml-2 sm:h-5 sm:w-5" />
                  </Button>
                </Link>

                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                  {!initialAuthChecked ? (
                    <></>
                  ) : (
                    !isLoggedIn && (
                      <Button
                        asChild
                        className="
                          h-8 rounded-full
                          border-white bg-transparent
                          px-4
                          text-sm text-gray-300
                          cursor-pointer
                          hover:border-amber-400 hover:text-amber-400
                          sm:h-9 sm:px-6 sm:text-base
                        "
                      >
                        <Link
                          href="/#signup"
                          onClick={(e) => {
                            e.preventDefault();
                            history.pushState(null, "", "#signup");
                            document.getElementById("signup")?.scrollIntoView({
                              behavior: "smooth",
                            });
                          }}
                        >
                          Sign Up
                        </Link>
                      </Button>
                    )
                  )}

                  <Button
                    asChild
                    className="
                      h-8 rounded-full
                      border-white bg-transparent
                      px-4
                      text-sm text-gray-300
                      cursor-pointer
                      hover:border-amber-400 hover:text-amber-400
                      sm:h-9 sm:px-6 sm:text-base
                    "
                  >
                    <Link
                      href="/#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        history.pushState(null, "", "#contact");
                        document.getElementById("contact")?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                    >
                      Contact
                    </Link>
                  </Button>
                </div>

                {!initialAuthChecked ? (
                  <></>
                ) : (
                  !isLoggedIn && (
                    <Link href="/lessons">
                      <div className="flex h-10 items-center sm:h-12">
                        <Button
                          className="
                            h-8 rounded-full
                            bg-gray-300
                            px-4
                            text-base font-bold text-black
                            cursor-pointer
                            transition-all duration-300
                            hover:bg-white
                            sm:h-9 sm:px-6 sm:text-lg
                            sm:hover:px-8 sm:hover:text-xl
                          "
                        >
                          Lessons
                        </Button>
                      </div>
                    </Link>
                  )
                )}
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
        </section>

        {/* Hero Image Section with Tabs */}
        <ImageTabs />

        {/* Hero Descriptions Section*/}
        <HeroDescriptionsSection />

        {/* Sign Up Section */}

        {initialAuthChecked && !isLoggedIn && <SignUpSection />}
        {/* {session?.user ? <></> : <SignUpSection />} */}
        {/*<SignUpSection />*/}
      </main>
    </div>
  );
}
