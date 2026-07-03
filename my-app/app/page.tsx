"use client";

import ImageTabs from "@/components/image-tabs";
import SignUpSection from "@/components/sign-up-section";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth/auth-client";
import { ArrowRight, AudioLines, Ear, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/* const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView();
}; */

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
          className="flex py-32 px-4 bg-black relative min-h-screen"
        >
          {/* <div
            className="absolute inset-0 
            bg-[url('../public/hero-images/AI_Generated_Basement_Studio.png')]
            bg-cover bg-center"
          /> */}
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
          <div className="absolute inset-0 bg-black/70" />
          <div
            className={`flex flex-col justify-center items-center container mx-auto max-w-4xl text-center relative z-10
                          transition-all ease-out duration-1000 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} 
                          `}
          >
            <div className="min-h-[8vh]" />
            <h1
              className={`font-great-vibes font-bold tracking-widest text-amber-400 mb-8 text-9xl [text-shadow:0_5px_10px_rgba(255,215,0,0.5),5px_0_10px_rgba(255,215,0,0.5)]`}
            >
              Steven Sun
            </h1>
            <h2 className="font-poppins font-semibold text-gray-300 italic mb-7 text-4xl">
              Piano · Professional Vibemaster · Creative Voice
            </h2>
            <h1
              className="font-poppins mb-3 text-2xl
                           bg-gradient-to-r
                           from-gray-300 via-amber-500 to-gray-300 bg-clip-text
                           text-transparent"
            >
              Reimagining Musical Creativity Beyond Expectations
            </h1>

            <div className="max-w-2xl">
              {" "}
              {/* 42rem */}
              <p className="font-poppins text-gray-300 mb-6 text-base font-light">
                An Ottawa-Based Musician, Educator, Content Creator, and
                Software Developer Fusing Modern Creativity and Diverse Cultures
                into a Distinctly Personal Artistic Voice
              </p>
            </div>
            <div className="font-redHatDisplay flex flex-col items-center gap-3">
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

                {/* asChild makes the Link look like a Button */}
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
                    <div className="h-11 flex items-center">
                      <Button
                        /* size="lg" */
                        className="h-9 px-6 text-lg font-bold text-black bg-gray-300 hover:bg-white hover:h-11 hover:px-8 hover:text-xl cursor-pointer rounded-full"
                      >
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
        </section>

        {/* Hero Image Section with Tabs */}
        <ImageTabs />

        {/* Features Section */}
        <section className="border-t border-white/15 bg-neutral-950 py-24">
          <div className="container mx-auto px-4">
            {/* Apply md only when the screen is at least the Medium breakpoint (768px and wider). */}
            <div className="grid gap-12 md:grid-cols-3 font-redHatDisplay">
              <div className="group relative">
                {/* hidden layers */}
                <div
                  className="absolute inset-0 translate-x-4 -translate-y-6 rounded-3xl
                                bg-gradient-to-br from-amber-400/80 via-yellow-300/80 to-orange-400/80
                                transition-all duration-300"
                />
                <div
                  className="absolute inset-0 translate-x-2 -translate-y-3 rounded-3xl
                                bg-gradient-to-br from-amber-300 via-yellow-200 to-orange-300
                                transition-all duration-300"
                />
                {/* main card */}
                {/* Teaching */}
                <div
                  className="relative z-10 group flex flex-col rounded-3xl p-6
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
                  <h3 className="mb-3 text-3xl font-bold text-gray-700">
                    Innovative Piano Learning
                  </h3>
                  <p className="text-muted-foreground text-lg font-semibold">
                    Practice theory with{" "}
                    <span className="font-black">Steven</span> through real
                    songs, ear training, and inspired playing from day one.
                  </p>
                </div>
              </div>

              <div className="group relative">
                {/* hidden layers */}
                <div
                  className="absolute inset-0 translate-x-4 -translate-y-6 rounded-3xl
                                bg-gradient-to-br from-violet-400/80 via-purple-300/80 to-fuchsia-400/80
                                transition-all duration-300"
                />
                <div
                  className="absolute inset-0 translate-x-2 -translate-y-3 rounded-3xl
                                bg-gradient-to-br from-violet-300 via-purple-200 to-fuchsia-300
                                transition-all duration-300"
                />
                {/* main card */}
                {/* Content Creation */}
                <div
                  className="relative z-10 group flex flex-col rounded-3xl p-6
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
                  <h3 className="mb-3 text-3xl font-bold text-gray-700">
                    Music Content Creation
                  </h3>
                  <p className="text-muted-foreground text-lg font-semibold">
                    Creating piano-vocal content reimagining performance,
                    personality, and digital storytelling.
                  </p>
                </div>
              </div>

              <div className="group relative">
                {/* hidden layers */}
                <div
                  className="absolute inset-0 translate-x-4 -translate-y-6 rounded-3xl
                                bg-gradient-to-br from-rose-400/80 via-pink-300/80 to-red-400/80
                                transition-all duration-300"
                />
                <div
                  className="absolute inset-0 translate-x-2 -translate-y-3 rounded-3xl
                                bg-gradient-to-br from-rose-300 via-pink-200 to-red-300
                                transition-all duration-300"
                />
                {/* Musicianship */}
                <div
                  className="relative z-10 group flex flex-col rounded-3xl p-6
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
                  <h3 className="mb-3 text-3xl font-bold text-gray-700">
                    Genre-Fusing Musicianship
                  </h3>
                  <p className="text-muted-foreground text-lg font-semibold">
                    Jazz, R&B, rock, East-Asian pop, classical, and production
                    internalized into one personal sound.
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
