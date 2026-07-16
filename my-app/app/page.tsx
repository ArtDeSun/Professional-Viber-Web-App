"use client";

import ImageTabs from "@/components/image-tabs";
import SignUpSection from "@/components/sign-up-section";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth/auth-client";
import { ArrowRight, AudioLines, Ear, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const heroDescriptions = [
  "Ottawa-Based, Canadian-Born, and Chinese-Raised Musician",
  "Piano Instructor, Software Developer, and Digital Creator",
  "Modern Creativity, Diverse Cultures, and Personal Expression",
];

const featureBackgroundImages = [
  { src: "/hero-images/AI_Generated_Basement_Studio.png", title: "Studio" },
  { src: "/hero-images/icon.png", title: "Steven Sun Logo" },
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

  const isLoggedIn = Boolean(session?.user);

  //Text Animation
  const TEXT_SLIDE_MS = 700;
  const TEXT_HOLD_MS = 3000;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [nextTextIndex, setNextTextIndex] = useState(1);
  const [textSliding, setTextSliding] = useState(false);
  const [textCanAnimate, setTextCanAnimate] = useState(true);

  //Image Animation
  const SLIDE_MS = 1200;
  const HOLD_MS = 4000;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [sliding, setSliding] = useState(false);
  const [canAnimate, setCanAnimate] = useState(true);

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
    return () => {
      clearTimeout(backgroundTimer);
      clearTimeout(contentTimer);
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

  useEffect(() => {
    const holdTimer = setTimeout(() => {
      //setCanAnimate(true);
      setSliding(true);

      const finishTimer = setTimeout(() => {
        setCanAnimate(false);

        const newCurrentIndex = nextIndex;
        const newNextIndex = (nextIndex + 1) % featureBackgroundImages.length;

        setCurrentIndex(newCurrentIndex);
        setNextIndex(newNextIndex);
        setSliding(false);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setCanAnimate(true);
          });
        });
      }, SLIDE_MS);

      return () => clearTimeout(finishTimer);
    }, HOLD_MS);

    return () => clearTimeout(holdTimer);
  }, [currentIndex, nextIndex]);

  /* return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  ); */

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section
          /* id="steven_sun" */
          className="flex bg-black relative min-h-screen overflow-hidden
                     px-4 pb-12 pt-46
                     sm:px-6 sm:pb-16
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

                        grid-cols-[3.5rem_minmax(0,1fr)_3.5rem]
                        sm:grid-cols-[5rem_minmax(0,1fr)_5rem]
                        md:grid-cols-[7rem_minmax(0,1fr)_7rem]
                        lg:grid-cols-[9.5rem_minmax(0,1fr)_9.5rem]
                        xl:grid-cols-[12.5rem_minmax(0,1fr)_12.5rem]

                        transition-all ease-out duration-1000 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} 
                      `}
          >
            <div className="flex flex-col h-full justify-between items-center">
              <div
                aria-label="Treble clef"
                className={`
                  h-28 w-14
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
                  h-28 w-14
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
                            mt-4 mb-7
                            font-great-vibes text-8xl font-bold tracking-wide text-amber-400
                            [text-shadow:0_5px_10px_rgba(255,215,0,0.5),5px_0_10px_rgba(255,215,0,0.5)]
                            sm:mt-8 sm:mb-9
                            md:text-9xl
                            lg:mt-12 lg:mb-12 lg:tracking-widest
                          "
              >
                Steven Sun
              </h1>
              <h2
                className="
                            mb-8 flex w-full flex-col items-center gap-1
                            font-marcellus text-3xl font-semibold tracking-wide
                            [text-shadow:0_2px_10px_rgba(245,158,11,0.1)]
                            sm:text-4xl
                            md:mb-10 md:text-5xl
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
                            mb-10 grid h-[3.5rem] w-full min-w-0 overflow-hidden text-center
                            md:mb-12 md:h-[4rem]
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

                              font-poppins text-xs font-light tracking-tighter
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
                  {heroDescriptions[nextTextIndex]}
                </p>

                {/* Current text */}
                <p
                  className={`
                              col-start-1 row-start-1 m-0
                              flex h-full w-full min-w-0 items-center justify-center
                              text-center
                              whitespace-nowrap

                              font-poppins text-xs font-light tracking-tighter
                              sm:text-sm
                              md:text-lg
                              lg:text-xl
                              2xl:text-2xl

                              bg-gradient-to-r
                              from-gray-100 via-amber-300 to-gray-100
                              bg-clip-text text-transparent
                              ${textCanAnimate ? "transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]" : "transition-none"}
                              ${textSliding ? "translate-y-12 opacity-0" : "translate-y-0 opacity-100"}
                            `}
                >
                  {heroDescriptions[currentTextIndex]}
                </p>
              </div>

              <div className="relative z-20 flex flex-col items-center gap-3 font-redHatDisplay">
                <Link href="/music">
                  <Button className="h-12 px-8 text-xl font-bold text-gray-300 bg-destructive hover:text-black cursor-pointer rounded-full">
                    Music <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <div className="flex gap-4">
                  {/* <Link href="/updates">
                    <Button
                      size="lg"
                      border border-solid border-black/[.08]
                      className="h-9 px-6 text-base text-gray-300 bg-transparent border-white hover:text-amber-400 hover:border-amber-400 cursor-pointer rounded-full"
                    >
                      Updates
                    </Button>
                  </Link> */}

                  {!initialAuthChecked ? (
                    <></>
                  ) : (
                    !isLoggedIn && (
                      <Button
                        asChild
                        className="h-9 px-6 text-base text-gray-300 bg-transparent border-white hover:text-amber-400 hover:border-amber-400 cursor-pointer rounded-full"
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
                    className="h-9 px-6 text-base text-gray-300 bg-transparent border-white hover:text-amber-400 hover:border-amber-400 cursor-pointer rounded-full"
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
                      <div className="flex h-12 items-center">
                        <Button className="py-1 px-6 text-lg font-bold text-black bg-gray-300 hover:bg-white hover:py-5 hover:px-8 hover:text-xl cursor-pointer rounded-full">
                          Lessons
                        </Button>
                      </div>
                    </Link>
                  )
                )}
                {/* <p className="text-sm text-muted-foreground">
                  professionalvibemaster@stevensun.com
                </p> */}
              </div>
            </div>

            <div className="flex flex-col h-full justify-between items-center">
              <div
                aria-label="Treble clef"
                className={`
                  h-28 w-14
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
                  h-28 w-14
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

        {/* Features Section: featureBackgroundImages */}
        <section
          id="description-cards"
          className="relative overflow-hidden border-t border-white/15 bg-neutral-950 py-36"
        >
          {/* Background slideshow */}
          <Image
            src={featureBackgroundImages[currentIndex].src}
            alt=""
            fill
            priority={currentIndex === 0}
            sizes="100vw"
            className={`
                        object-cover object-center brightness-[0.85] opacity-85
                        ${
                          canAnimate
                            ? "transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                            : "transition-none"
                        }
                        ${sliding ? "-translate-x-full" : "translate-x-0"}
                      `}
          />

          <Image
            src={featureBackgroundImages[nextIndex].src}
            alt=""
            fill
            sizes="100vw"
            className={`
                        object-cover brightness-[0.85] opacity-85
                        ${
                          canAnimate
                            ? "transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                            : "transition-none"
                        }
                        ${sliding ? "translate-x-0" : "translate-x-full"}
                      `}
          />

          {/* Content */}
          <div className="relative z-10 container mx-auto px-6">
            {/* Apply md only when the screen is at least the Medium breakpoint (768px and wider). */}
            <div className="grid items-stretch gap-6 sm:gap-5 md:grid-cols-3 md:gap-4 lg:gap-6 font-redHatDisplay">
              <div className="group relative h-full">
                {/* hidden layers */}
                <div
                  className="absolute inset-0 translate-x-2 -translate-y-3 rounded-3xl md:translate-x-3 md:-translate-y-4
                                bg-gradient-to-br from-amber-400/80 via-yellow-300/80 to-orange-400/80
                                transition-all duration-300"
                />
                <div
                  className="absolute inset-0 translate-x-1 -translate-y-1.5 rounded-3xl md:translate-x-1.5 md:-translate-y-2
                                bg-gradient-to-br from-amber-300 via-yellow-200 to-orange-300
                                transition-all duration-300"
                />
                {/* main card */}
                {/* Teaching */}
                <div
                  className="relative z-10 group h-full flex flex-col rounded-3xl p-4 md:p-3 lg:p-5 xl:p-6
                     bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-200
                     border border-amber-300/50
                     ring-1 ring-amber-300/50
                     transition-all duration-300
                     hover:-translate-y-2
                     hover:shadow-[0_0_36px_rgba(245,158,11,0.95)]"
                >
                  <div
                    className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl
                       bg-gradient-to-br from-amber-500 via-yellow-300 to-orange-100
                       ring-1 ring-amber-300/50
                       shadow-[0_0_24px_rgba(245,158,11,0.95)]"
                  >
                    <Ear className="h-7 w-7 text-amber-800" />
                  </div>
                  <h3 className="mb-3 text-3xl font-bold font-marcellus text-gray-700">
                    Innovative Piano Learning
                  </h3>
                  <p className="mt-auto text-muted-foreground text-lg font-semibold">
                    Practice theory with{" "}
                    <span className="font-black">Steven</span> through real
                    songs, ear training, and inspired playing from day one.
                  </p>
                </div>
              </div>

              <div className="group relative h-full">
                {/* hidden layers */}
                <div
                  className="absolute inset-0 translate-x-2 -translate-y-3 rounded-3xl md:translate-x-3 md:-translate-y-4
                                bg-gradient-to-br from-violet-400/80 via-purple-300/80 to-fuchsia-400/80
                                transition-all duration-300"
                />
                <div
                  className="absolute inset-0 translate-x-1 -translate-y-1.5 rounded-3xl md:translate-x-1.5 md:-translate-y-2
                                bg-gradient-to-br from-violet-300 via-purple-200 to-fuchsia-300
                                transition-all duration-300"
                />
                {/* main card */}
                {/* Content Creation */}
                <div
                  className="relative z-10 group h-full flex flex-col rounded-3xl p-4 md:p-3 lg:p-5 xl:p-6
                              bg-gradient-to-br from-violet-200 via-purple-100 to-fuchsia-200
                              border border-violet-300/50
                              ring-1 ring-violet-300/50
                              transition-all duration-300
                              hover:-translate-y-2
                              hover:shadow-[0_0_36px_rgba(139,92,246,0.95)]"
                >
                  <div
                    className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl
                                bg-gradient-to-br from-violet-500 via-purple-300 to-fuchsia-100
                                ring-1 ring-violet-300/50
                                shadow-[0_0_24px_rgba(139,92,246,0.95)]"
                  >
                    <Video className="h-7 w-7 text-violet-800" />
                  </div>
                  <h3 className="mb-3 text-3xl font-bold font-marcellus text-gray-700">
                    Professional Vibemaster
                  </h3>
                  <p className="mt-auto text-muted-foreground text-lg font-semibold">
                    Crafting immersive musical experiences through performance,
                    personality, and digital storytelling.
                  </p>
                </div>
              </div>

              <div className="group relative h-full">
                {/* hidden layers */}
                <div
                  className="absolute inset-0 translate-x-2 -translate-y-3 rounded-3xl md:translate-x-3 md:-translate-y-4
                                bg-gradient-to-br from-rose-400/80 via-pink-300/80 to-red-400/80
                                transition-all duration-300"
                />
                <div
                  className="absolute inset-0 translate-x-1 -translate-y-1.5 rounded-3xl md:translate-x-1.5 md:-translate-y-2
                                bg-gradient-to-br from-rose-300 via-pink-200 to-red-300
                                transition-all duration-300"
                />
                {/* Musicianship */}
                <div
                  className="relative z-10 group h-full flex flex-col rounded-3xl p-4 md:p-3 lg:rounded-3xl lg:p-5 xl:p-6
                              bg-gradient-to-br
                              from-rose-200
                              via-pink-100
                              to-red-200
                              border border-rose-300/50
                              ring-1 ring-rose-300/50
                              transition-all duration-300
                              hover:-translate-y-2
                              hover:shadow-[0_0_36px_rgba(244,63,94,0.95)]"
                >
                  <div
                    className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl
                                bg-gradient-to-br
                                from-rose-500
                                via-pink-300
                                to-red-100
                                ring-1 ring-rose-300/50
                                shadow-[0_0_24px_rgba(244,63,94,0.95)]"
                  >
                    <AudioLines className="h-7 w-7 text-rose-700" />
                  </div>
                  <h3 className="mb-3 text-3xl font-bold font-marcellus text-gray-700">
                    Genre-Spanning Creativity
                  </h3>
                  <p className="mt-auto text-muted-foreground text-lg font-semibold">
                    Internalizing jazz, R&B, rock, East-Asian pop, and
                    classical, into a distinctive creative voice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sign Up Section */}

        {initialAuthChecked && !isLoggedIn && <SignUpSection />}
        {/* {session?.user ? <></> : <SignUpSection />} */}
        {/*<SignUpSection />*/}
      </main>
    </div>
  );
}
