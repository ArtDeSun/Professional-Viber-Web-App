"use client";

import ImageTabs from "@/components/image-tabs";
import SignUpSection from "@/components/sign-up-section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView();
};

export default function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
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
          <div
            className="absolute inset-0 
            bg-[url('../public/hero-images/AI_Generated_Basement_Studio.png')]
            bg-cover bg-center"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div
            className={`flex flex-col justify-center container mx-auto max-w-4xl text-center relative z-10
                          transition-all ease-out duration-1000 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} 
                          `}
          >
            <h1
              className={`font-great-vibes font-bold tracking-wider text-amber-400 mb-8 text-8xl [text-shadow:0_5px_10px_rgba(255,215,0,0.5),5px_0_10px_rgba(255,215,0,0.5)]`}
            >
              Steven Sun
            </h1>
            {/* text-amber-100 */}
            <h2 className="font-poppins font-bold text-gray-300 italic mb-6 text-2xl">
              Keywords · describing · Steven's · Core · Skills
            </h2>
            {/* text-amber-100 */}
            <h1 className="font-poppins text-gray-300 mb-3 text-xl">
              Something about Steven's role as Professional Vibemaster
            </h1>
            {/* text-amber-100 */}
            <p className="font-poppins text-gray-300 mb-6 text-xl">
              15-word-max introduction to Steven's artistry
            </p>
            <div className="font-redHatDisplay flex flex-col items-center gap-6">
              <Link href="/music">
                <Button
                  /* size="lg" */
                  className="h-12 px-8 text-xl font-bold text-gray-300 bg-destructive hover:text-black cursor-pointer rounded-full"
                >
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

                {/* asChild makes the Link look like a Button */}
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
              {/* <p className="text-sm text-muted-foreground">
                professionalvibemaster@stevensun.com
              </p> */}
            </div>
          </div>
        </section>

        {/* Hero Image Section with Tabs */}
        <ImageTabs />

        {/* Features Section */}
        <section className="border-t bg-white py-24">
          <div className="container mx-auto px-4">
            {/* Apply md only when the screen is at least the Medium breakpoint (768px and wider). */}
            <div className="grid gap-12 md:grid-cols-3">
              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
                  <Briefcase className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Organize Applications
                </h3>
                <p className="text-muted-foreground">
                  Create custom boards and columns to track your job
                  applications at every stage of the process.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
                  <TrendingUp className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Track Progress
                </h3>
                <p className="text-muted-foreground">
                  Monitor your application status from applied to interview to
                  offer with visual Kanban boards.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
                  <CheckCircle2 className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Stay Organized
                </h3>
                <p className="text-muted-foreground">
                  Never lose track of an application. Keep all your job search
                  information in one centralized place.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sign Up Section */}
        <SignUpSection />
      </main>
    </div>
  );
}
