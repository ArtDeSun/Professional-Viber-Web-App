"use client";
import AboutImageGallery from "@/components/about-image-gallery";
//import Link from "next/link";
//import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Code2,
  GraduationCap,
  Guitar,
  Laptop,
  MicVocal,
  Music2,
  Piano,
  Sparkles,
} from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";

type RevealProps<T extends React.ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  delay?: string;
  className?: string;
};

function Reveal<T extends React.ElementType = "div">({
  as,
  children,
  delay = "",
  className = "",
}: RevealProps<T>) {
  const Component = as ?? "div";

  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShow(true),
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={`${className} transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${delay}
        ${show ? "translate-y-0 opacity-100" : "translate-y-14 opacity-0"}`}
    >
      {children}
    </Component>
  );
}

export default function getAbout() {
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    history.scrollRestoration = "manual";

    const navEntry = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;

    const isReload = navEntry?.type === "reload";

    if (!isReload) {
      sessionStorage.removeItem("aboutScrollY");
    } else {
      window.scrollTo(0, 0);
    }

    const handleBeforeUnload = () => {
      sessionStorage.setItem("aboutScrollY", String(window.scrollY));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!pageReady) return;

    const savedY = sessionStorage.getItem("aboutScrollY");
    if (!savedY) return;

    const timer = setTimeout(() => {
      window.scrollTo({
        top: Number(savedY),
        behavior: "smooth",
      });

      sessionStorage.removeItem("aboutScrollY");
    }, 300);

    return () => clearTimeout(timer);
  }, [pageReady]);

  const bullets = [
    { text: "Pianist · Singer", icon: MicVocal },
    { text: "Music Educator", icon: GraduationCap },
    { text: "Tech-Savvy Content Creator", icon: Laptop },
    { text: "Accompanist · Collaborative Artist", icon: Guitar },
    {
      text: "Professional Vibemaster · Seasoned Vibecoder",
      icon: Sparkles,
    },
  ];
  const textSizes = [
    "text-5xl",
    "text-4xl",
    "text-3xl",
    "text-2xl",
    "text-1xl",
  ];

  const currentActivties = [
    {
      icon: BookOpen,
      title: "Curated Learning",
      text: "Explore a catalogue of recordings, discover contemporary keyboard styles, and create music on your own terms.",
    },
    {
      icon: Music2,
      title: "Collaborative Work",
      text: "Steven is open to collaborating with musicians, directors, and engineers on commercial projects in the Ottawa area.",
    },
    {
      icon: MicVocal,
      title: "Ottawa Music Life",
      text: "During the day, he teaches piano at Capital City Keyboards. During the night, he jams at Jazz@248.",
    },
  ];

  return (
    <div className="bg-black text-neutral-100">
      <main className="mx-auto max-w-7xl px-6 py-32 font-redHatDisplay">
        <section className="relative">
          <div
            className="relative rounded-[3rem] 
                       bg-gradient-to-b from-neutral-950 via-neutral-900 to-amber-950/50
                       "
          >
            <div className="relative grid gap-10 p-16 lg:grid-cols-[1.1fr_0.9fr] lg:p-14 overflow-visible">
              <div className="space-y-25">
                {/* About Steven */}
                <Reveal>
                  <div
                    className="h-[320px]
                                  rounded-[3rem] bg-neutral-900 p-8 
                                  shadow-[0_0_20px_rgba(245,158,11,0.5)] text-center"
                  >
                    <p className="mb-8 text-5xl font-black leading-tight text-amber-500">
                      About Steven
                    </p>
                    <h1 className="text-2xl leading-tight text-neutral-50">
                      Meet Your Professional Vibemaster
                    </h1>
                    <p className="mt-4 text-xl leading-8 text-neutral-400">
                      As a trained software developer and as an{" "}
                      <span className="underline transition-color duration-300 hover:text-amber-500">
                        <a href="https://www.rcmusic.com/" target="_blank">
                          RCM-certified
                        </a>
                      </span>{" "}
                      pianist, Steven excels at performing, digitalizing, and
                      coaching immersive entertainment experiences.
                    </p>
                  </div>
                </Reveal>

                {/* Bullet Points */}
                <div className="relative h-[360px] overflow-visible">
                  <Reveal
                    as="ul"
                    delay="delay-400"
                    className="absolute z-20 w-max
                                   space-y-7 rounded-l-[3rem] p-8 text-xl font-bold leading-tight
                                   text-neutral-300 shadow-[0_0_20px_rgba(245,158,11,0.5)]
                                   bg-gradient-to-tr from-neutral-950 via-amber-950 to-red-950"
                  >
                    {/* Top-right decoration */}
                    <Piano
                      className="absolute top-6 right-6 h-20 w-20
                                  text-amber-300/20"
                    />
                    {/* Bottom-left decoration */}
                    <Code2
                      className="absolute bottom-4 left-6 h-16 w-16
                                  text-red-300/20"
                    />
                    {bullets.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <li
                          key={item.text}
                          className="flex items-center gap-5 mb-6"
                          style={{
                            marginLeft: `${i * 2}rem`,
                          }}
                        >
                          <Icon
                            className="h-8 w-8 shrink-0
                              text-amber-400
                              drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                          />
                          <span
                            className={`${textSizes[i]} [text-shadow:0_2px_10px_rgba(0,0,0,0.55)]`}
                          >
                            {item.text}
                          </span>
                        </li>
                      );
                    })}
                  </Reveal>
                </div>
              </div>

              <Reveal delay="delay-200">
                {/* <div className="relative z-10 h-[820px] overflow-hidden rounded-[4rem] shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                  <Image
                    src="/hero-images/AI_Generated_Basement_Studio.png"
                    alt="Steven Sun profile portrait"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div> */}
                <AboutImageGallery />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="grid items-stretch gap-8 py-16 md:grid-cols-2">
          <Reveal className="h-full">
            <div
              className="
                absolute inset-0
                bg-[radial-gradient(ellipse_at_center,rgba(255,220,120,0.35)_0%,rgba(245,158,11,0.22)_50%,rgb(48,48,48)_100%)]
                blur-2xl
              "
            />
            <div className="rounded-[2rem] p-8 ring-1 ring-amber-500/20 relative z-10 h-full">
              <Music2 className="mb-5 h-10 w-10 text-amber-500" />
              <h2
                className="mb-4 text-4xl font-bold bg-gradient-to-tr
                             from-amber-500 via-neutral-300 to-amber-500 bg-clip-text
                             text-transparent"
              >
                Performance & Production
              </h2>
              <p className="text-lg leading-8 text-neutral-300">
                You can find Steven singing jazz standards in live venues while
                accompanying himself on the piano. Steven mixes and produces all
                of his music videos independently.
              </p>
            </div>
          </Reveal>

          <Reveal delay="delay-200" className="h-full">
            <div
              className="
                absolute inset-0
                bg-[radial-gradient(ellipse_at_center,rgba(255,220,120,0.35)_0%,rgba(245,158,11,0.22)_50%,rgb(48,48,48)_100%)]
                blur-2xl
              "
            />
            <div className="rounded-[2rem] p-8 ring-1 ring-amber-500/20 relative z-10 h-full">
              <MicVocal className="mb-5 h-10 w-10 text-amber-500" />
              <h2
                className="mb-4 text-4xl font-bold bg-gradient-to-tr
                             from-amber-500 via-neutral-300 to-amber-500 bg-clip-text
                             text-transparent"
              >
                Independent Artist Vision
              </h2>
              <p className="text-lg leading-8 text-neutral-300">
                Striving to reinvent the independent artist in the streaming
                era, Steven draws from his unique background to craft a rich
                sound informed by popular culture and music legends of the past.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="py-16">
          <Reveal delay="delay-200">
            <div
              className="
                absolute inset-0
                bg-[radial-gradient(ellipse_at_center,rgba(255,220,120,0.35)_0%,rgba(245,158,11,0.22)_50%,rgb(48,48,48)_100%)]
                blur-2xl
              "
            />
            <div className="rounded-[2.5rem] p-10 shadow-[0_0_20px_rgba(245,158,11,0.5)] ring-1 ring-amber-500/20 relative z-10">
              <GraduationCap className="mb-6 h-12 w-12 text-amber-500" />
              <h2
                className="mb-6 pb-2 text-5xl font-bold bg-gradient-to-tr
                             from-amber-500 via-neutral-300 to-amber-500 bg-clip-text
                             text-transparent"
              >
                Credentials | Lessons | Avaliability
              </h2>
              <div className="grid gap-6 text-lg leading-8 md:grid-cols-2">
                <div
                  className="rounded-2xl bg-gradient-to-tl from-amber-100 via-orange-200 to-yellow-300
                               p-6 shadow-lg ring-1 ring-amber-500/20"
                >
                  <p className="text-gray-700 text-xl font-semibold">
                    Started piano at age 5, Steven earned{" "}
                    <span className="font-black">
                      RCM Grade 10 Piano Certification
                    </span>{" "}
                    and has 3+ years of experience teaching students of all ages
                    and levels.
                  </p>
                </div>

                <div
                  className="rounded-2xl bg-gradient-to-tr from-amber-100 via-orange-200 to-yellow-300
                               p-6 shadow-lg ring-1 ring-amber-500/20"
                >
                  <p className="text-gray-700 text-xl font-semibold">
                    With a{" "}
                    <span className="font-black">
                      BSc in Computer Science from the University of Ottawa
                    </span>
                    , he connects music learning with digital creativity and
                    intentional problem-solving.
                  </p>
                </div>

                <div
                  className="rounded-2xl bg-gradient-to-bl from-amber-100 via-orange-200 to-yellow-300
                               p-6 shadow-lg ring-1 ring-amber-500/20"
                >
                  <p className="text-gray-700 text-xl font-semibold">
                    He teaches{" "}
                    <span className="font-black">
                      all course and grades from the{" "}
                      <span className="underline transition-color duration-300 hover:text-amber-500">
                        <a
                          href="https://rcmusic-kentico-cdn.s3.amazonaws.com/rcm/media/main/about%20us/rcm%20publishing/piano-syllabus-2022-edition.pdf"
                          target="_blank"
                        >
                          RCM syllabus
                        </a>
                      </span>
                    </span>
                    , including{" "}
                    <span className="underline transition-color duration-300 hover:text-amber-500">
                      <a
                        href="https://rcmusic-production-strapi-media.s3.ca-central-1.amazonaws.com/s44_theorysyl_2016_online_rcm_v2_f_649983999a.pdf"
                        target="_blank"
                      >
                        theory
                      </a>
                    </span>
                    , while keeping lessons beginner friendly and aligned with
                    student goals.
                  </p>
                </div>

                <div
                  className="rounded-2xl bg-gradient-to-br from-amber-100 via-orange-200 to-yellow-300
                               p-6 shadow-lg ring-1 ring-amber-500/20"
                >
                  <p className="text-gray-700 text-xl font-semibold">
                    <span className="font-black">Hour-long lessons</span> can
                    include popular songs, accompaniment, improvisation, and ear
                    training. Steven also gigs at weddings and other live
                    settings.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="grid gap-8 py-16 lg:grid-cols-3 items-stretch">
          {currentActivties.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal
                key={item.title}
                delay={
                  index === 1 ? "delay-200" : index === 2 ? "delay-400" : ""
                }
                className="h-full"
              >
                <div className="relative overflow-hidden rounded-[2rem] p-8 ring-1 ring-amber-500/20 h-full">
                  <div
                    className="
                                absolute inset-0
                                bg-[radial-gradient(ellipse_at_center,rgba(255,220,120,0.35)_0%,rgba(245,158,11,0.22)_50%,rgb(48,48,48)_100%)]
                                blur-2xl
                              "
                  />

                  <div className="relative z-10 h-full">
                    <Icon className="mb-5 h-10 w-10 text-amber-500" />

                    <h3
                      className="mb-4 text-4xl font-bold bg-gradient-to-tr
                         from-amber-500 via-neutral-300 to-amber-500 bg-clip-text
                         text-transparent"
                    >
                      {item.title}
                    </h3>

                    <p className="text-lg leading-8 text-neutral-300">
                      {item.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </section>
      </main>
    </div>
  );
}
