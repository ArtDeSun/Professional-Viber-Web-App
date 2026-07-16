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
      text: "Professional Vibemaster · Agentic Vibecoder",
      icon: Sparkles,
    },
  ];
  const textSizes = [
    "text-2xl sm:text-3xl xl:text-5xl",
    "text-xl sm:text-2xl xl:text-4xl",
    "text-lg sm:text-xl xl:text-3xl",
    "text-base sm:text-lg xl:text-2xl",
    "text-sm sm:text-base xl:text-xl",
  ];

  const currentActivties = [
    {
      icon: BookOpen,
      title: "Curated Learning",
      titleFont: "font-marcellus",
      text: "Explore a catalogue of recordings, discover contemporary keyboard styles, and create music on your own terms.",
    },
    {
      icon: Music2,
      title: "Collaborative Work",
      titleFont: "font-marcellus",
      text: "Steven is open to collaborating with musicians, directors, and engineers on commercial projects in the Ottawa area.",
    },
    {
      icon: MicVocal,
      title: "Ottawa Music Life",
      titleFont: "font-marcellus",
      text: "During the day, he teaches piano at Capital City Keyboards. During the night, he jams at Jazz@248.",
    },
  ];

  return (
    <div className="bg-black text-neutral-100">
      <main className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-24 font-redHatDisplay sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <section className="relative">
          <div
            className="
                        relative overflow-hidden rounded-[2rem]
                        bg-gradient-to-b from-neutral-950 via-neutral-900 to-amber-950/50
                        sm:rounded-[3rem]
                        lg:overflow-visible
                      "
          >
            <div
              className="
                              relative grid min-w-0 gap-8 p-4
                              sm:p-6
                              md:p-8
                              lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]
                              lg:gap-10 lg:overflow-visible lg:p-12
                              xl:p-14
                            "
            >
              <div className="min-w-0 space-y-8 lg:space-y-10">
                {/* About Steven */}
                <Reveal>
                  <div
                    className="
                                rounded-[2rem] bg-neutral-900 p-5 text-center
                                shadow-[0_0_20px_rgba(245,158,11,0.5)]
                                sm:min-h-[320px] sm:rounded-[3rem] sm:p-8
                              "
                  >
                    <div className="mb-1 flex items-center justify-center gap-3 sm:gap-4">
                      <span
                        className="
                          h-[3px] w-24 rounded-full
                          bg-gradient-to-r
                          from-transparent
                          via-amber-300
                          to-amber-500
                          shadow-[0_0_8px_rgba(251,191,36,0.35)]
                        "
                      />

                      <p className="shrink-0 font-marcellus text-2xl text-amber-500 sm:text-3xl lg:text-4xl">
                        About
                      </p>

                      <span
                        className="
                          h-[3px] w-24 rounded-full
                          bg-gradient-to-r
                          from-amber-500
                          via-amber-300
                          to-transparent
                          shadow-[0_0_8px_rgba(251,191,36,0.35)]
                        "
                      />
                    </div>
                    <p
                      className="
                                    mb-5 break-words font-marcellus text-5xl font-black
                                    tracking-wide text-amber-500
                                    sm:mb-8 sm:text-6xl sm:tracking-wider
                                    lg:text-7xl
                                    xl:text-8xl
                                  "
                    >
                      STEVEN
                    </p>
                    <h1 className="font-marcellus text-xl leading-tight text-neutral-50 sm:text-2xl lg:text-3xl">
                      Meet Your Professional Vibemaster
                    </h1>
                    <p className="mt-4 text-base leading-7 text-neutral-400 sm:text-lg sm:leading-8 lg:text-xl">
                      As an{" "}
                      <span className="underline transition-colors duration-300 hover:text-amber-500">
                        <a
                          href="https://www.rcmusic.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          RCM-certified
                        </a>
                      </span>{" "}
                      pianist and a{" "}
                      <span className="underline transition-colors duration-300 hover:text-amber-500">
                        <a
                          href="https://catalogue.uottawa.ca/en/undergrad/joint-honours-bsc-computer-science-mathematics/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          degreed software engineer
                        </a>
                      </span>
                      , Steven excels at performing, digitalizing, and coaching
                      immersive entertainment experiences.
                    </p>
                  </div>
                </Reveal>

                {/* Bullet Points */}
                <div className="relative min-w-0 lg:min-h-[360px] lg:overflow-visible">
                  <Reveal
                    as="ul"
                    delay="delay-400"
                    className="
                      relative z-20 w-full min-w-0 space-y-4
                      overflow-hidden rounded-[2rem] p-5
                      font-marcellus font-bold tracking-wide text-neutral-300
                      shadow-[0_0_20px_rgba(245,158,11,0.5)]
                      bg-gradient-to-tr from-neutral-950 via-amber-950 to-red-950
                      sm:space-y-5 sm:rounded-[2.5rem] sm:p-7 sm:tracking-wider
                      lg:absolute lg:left-0 lg:top-0 lg:w-[calc(100%+8rem)]
                      lg:max-w-[calc(100vw-8rem)] lg:overflow-visible
                      lg:rounded-l-[3rem] lg:rounded-r-none lg:p-8
                      xl:w-[calc(100%+11rem)]
                    "
                  >
                    <Piano
                      className="
                        pointer-events-none absolute right-3 top-4 h-14 w-14
                        text-amber-300/15
                        sm:right-6 sm:top-6 sm:h-20 sm:w-20 sm:text-amber-300/20
                      "
                    />

                    <Code2
                      className="
                        pointer-events-none absolute bottom-3 left-3 h-12 w-12
                        text-red-300/15
                        sm:bottom-4 sm:left-6 sm:h-16 sm:w-16 sm:text-red-300/20
                      "
                    />

                    {bullets.map((item, i) => {
                      const Icon = item.icon;

                      return (
                        <li
                          key={item.text}
                          className={`
                            relative z-10 flex min-w-0 items-center gap-3
                            sm:gap-4
                            lg:gap-5
                            ${i === 1 ? "lg:ml-8" : ""}
                            ${i === 2 ? "lg:ml-16" : ""}
                            ${i === 3 ? "lg:ml-24" : ""}
                            ${i === 4 ? "lg:ml-32" : ""}
                          `}
                        >
                          <Icon
                            className="
                              h-6 w-6 shrink-0 text-amber-400
                              drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]
                              sm:h-7 sm:w-7
                              lg:h-8 lg:w-8
                            "
                          />

                          <span
                            className={`
                              min-w-0 break-words leading-tight
                              [text-shadow:0_2px_10px_rgba(0,0,0,0.55)]
                              ${textSizes[i]}
                            `}
                          >
                            {item.text}
                          </span>
                        </li>
                      );
                    })}
                  </Reveal>
                </div>
              </div>

              <Reveal
                delay="delay-200"
                className="min-w-0 lg:flex lg:justify-end"
              >
                <AboutImageGallery />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="grid items-stretch gap-6 py-12 sm:gap-8 sm:py-16 md:grid-cols-2">
          <Reveal className="h-full overflow-hidden rounded-[2rem]">
            <div
              className="
                pointer-events-none absolute inset-0
                bg-[radial-gradient(ellipse_at_center,rgba(255,220,120,0.35)_0%,rgba(245,158,11,0.22)_50%,rgb(48,48,48)_100%)]
                blur-2xl
              "
            />
            <div className="relative z-10 h-full rounded-[2rem] p-6 ring-1 ring-amber-500/20 sm:p-8">
              <Music2 className="mb-5 h-9 w-9 text-amber-500 sm:h-10 sm:w-10" />
              <h2
                className="
                            mb-4 bg-gradient-to-tr from-amber-500 via-neutral-300 to-amber-500
                            bg-clip-text font-marcellus text-3xl font-bold leading-tight
                            text-transparent
                            sm:text-4xl
                          "
              >
                Performance & Production
              </h2>
              <p className="text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8">
                You can find Steven singing jazz standards in live venues while
                accompanying himself on the piano. Steven mixes and produces all
                of his music videos independently.
              </p>
            </div>
          </Reveal>

          <Reveal
            delay="delay-200"
            className="relative h-full overflow-hidden rounded-[2rem]"
          >
            <div
              className="
                pointer-events-none absolute inset-0
                bg-[radial-gradient(ellipse_at_center,rgba(255,220,120,0.35)_0%,rgba(245,158,11,0.22)_50%,rgb(48,48,48)_100%)]
                blur-2xl
              "
            />
            <div className="rounded-[2rem] p-8 ring-1 ring-amber-500/20 relative z-10 h-full">
              <MicVocal className="mb-5 h-10 w-10 text-amber-500" />
              <h2
                className="
                            mb-4 bg-gradient-to-tr from-amber-500 via-neutral-300 to-amber-500
                            bg-clip-text font-marcellus text-3xl font-bold leading-tight
                            text-transparent
                            sm:text-4xl
                          "
              >
                Independent Artist Vision
              </h2>
              <p className="text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8">
                Striving to reinvent the independent artist in the streaming
                era, Steven draws from his unique background to craft a rich
                sound informed by popular culture and music legends of the past.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="py-12 sm:py-16">
          <Reveal
            delay="delay-200"
            className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]"
          >
            <div
              className="
                absolute inset-0
                bg-[radial-gradient(ellipse_at_center,rgba(255,220,120,0.35)_0%,rgba(245,158,11,0.22)_50%,rgb(48,48,48)_100%)]
                blur-2xl
              "
            />
            <div
              className="
                relative z-10 rounded-[2rem] p-5
                shadow-[0_0_20px_rgba(245,158,11,0.5)]
                ring-1 ring-amber-500/20
                sm:rounded-[2.5rem] sm:p-8
                lg:p-10
              "
            >
              <GraduationCap className="mb-6 h-12 w-12 text-amber-500" />
              <h2
                className="
                            mb-6 break-words bg-gradient-to-tr from-amber-500 via-neutral-300
                            to-amber-500 bg-clip-text pb-2 font-marcellus text-3xl
                            font-bold leading-tight text-transparent
                            sm:text-4xl
                            lg:text-5xl
                          "
              >
                Credentials | Lessons
              </h2>
              <div className="grid min-w-0 gap-4 leading-8 sm:gap-6 md:grid-cols-2">
                <div
                  className="rounded-2xl bg-gradient-to-tl from-amber-100 via-orange-200 to-yellow-300
                               shadow-lg ring-1 ring-amber-500/20
                               min-w-0 overflow-hidden p-5 sm:p-6"
                >
                  <p className="break-words text-base font-semibold leading-7 text-gray-700 sm:text-lg lg:text-xl">
                    Started piano at age 5, Steven earned{" "}
                    <span className="font-black text-gray-900">
                      RCM Grade 10 Piano Certification
                    </span>{" "}
                    and has 3+ years of experience teaching students of all ages
                    and levels.
                  </p>
                </div>

                <div
                  className="rounded-2xl bg-gradient-to-tr from-amber-100 via-orange-200 to-yellow-300
                               shadow-lg ring-1 ring-amber-500/20
                               min-w-0 overflow-hidden p-5 sm:p-6"
                >
                  <p className="break-words text-base font-semibold leading-7 text-gray-700 sm:text-lg lg:text-xl">
                    With a{" "}
                    <span className="font-black text-gray-900">
                      BSc in Computer Science from the University of Ottawa
                    </span>
                    , he connects music learning with digital creativity and
                    intentional problem-solving.
                  </p>
                </div>

                <div
                  className="rounded-2xl bg-gradient-to-bl from-amber-100 via-orange-200 to-yellow-300
                               shadow-lg ring-1 ring-amber-500/20
                               min-w-0 overflow-hidden p-5 sm:p-6"
                >
                  <p className="break-words text-base font-semibold leading-7 text-gray-700 sm:text-lg lg:text-xl">
                    He teaches{" "}
                    <span className="font-black text-gray-900">
                      all courses and grades from the{" "}
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
                               shadow-lg ring-1 ring-amber-500/20
                               min-w-0 overflow-hidden p-5 sm:p-6"
                >
                  <p className="break-words text-base font-semibold leading-7 text-gray-700 sm:text-lg lg:text-xl">
                    <span className="font-black  text-gray-900">
                      Hour-long lessons
                    </span>{" "}
                    can include popular songs, accompaniment, improvisation, and
                    ear training. Steven also gigs at weddings and other live
                    settings.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section
          className="grid items-stretch
                            grid-cols-1 gap-5 py-10
                            sm:gap-6 sm:py-12
                            md:grid-cols-2 md:py-14
                            lg:gap-8
                            xl:grid-cols-3 xl:py-16"
        >
          {currentActivties.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal
                key={item.title}
                delay={
                  index === 1 ? "delay-200" : index === 2 ? "delay-400" : ""
                }
                className={`
                            h-full
                            ${index === currentActivties.length - 1 ? "md:col-span-2 xl:col-span-1" : ""}
                          `}
              >
                <div
                  className="relative h-full overflow-hidden
                                rounded-[1.5rem] p-5
                                ring-1 ring-amber-500/20
                                sm:rounded-[1.75rem] sm:p-6
                                lg:p-7
                                xl:rounded-[2rem] xl:p-8"
                >
                  <div
                    className="
                                absolute inset-0
                                bg-[radial-gradient(ellipse_at_center,rgba(255,220,120,0.35)_0%,rgba(245,158,11,0.22)_50%,rgb(48,48,48)_100%)]
                                blur-2xl
                              "
                  />

                  <div className="relative z-10 flex h-full flex-col">
                    <Icon
                      className="
                                  mb-4 h-8 w-8 text-amber-500
                                  sm:h-9 sm:w-9
                                  xl:mb-5 xl:h-10 xl:w-10"
                    />

                    <h3
                      className={`
                                  mb-3 bg-gradient-to-tr
                                  from-amber-500 via-neutral-300 to-amber-500
                                  bg-clip-text pb-1
                                  text-2xl font-bold leading-tight text-transparent
                                  sm:text-3xl
                                  lg:text-[2rem]
                                  xl:mb-4 xl:pb-2 xl:text-4xl
                                  ${item.titleFont ?? ""}
                                `}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                      text-base leading-7 text-neutral-300
                      sm:text-lg sm:leading-8"
                    >
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
