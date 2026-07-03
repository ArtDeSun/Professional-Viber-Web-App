/* import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function getAbout() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="mx-auto px-4 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-black mb-6 text-5xl font-bold [text-shadow:0_0_8px_rgba(255,215,0,0.5)]">
              Meet THE Professional Vibemaster You've Always Wanted
            </h1>
            <p className="text-muted-foreground mb-8 text-xl">
              As a computer-science graduate who earned a RCM Grade 10
              Certification in Piano Performance, Steven excels at performing
              and digitalizing immersive entertainment experiences. You can find
              Steven singing jazz standards in live venues while accompanying
              himself on the piano. You can also explore a curated catalogue of
              recordings and a practical guide to learning piano accompaniment
              for popular songs. Steven mixes and produces all of his music
              videos in house.
            </p>
            <p className="text-muted-foreground mb-8 text-xl">
              Striving to reinvent the independent artist in the streaming era,
              Steven leverages his unique background to craft a rich fusion
              sound informed by popular culture and music legends of the past.
              Furthermore, Steven's technical competence and versatility allows
              him to navigate through the expections of fellow musicians and the
              expectations of studio engineers with ease, leading to consistent
              delivery of engaging content.
            </p>
            <p className="text-muted-foreground mb-8 text-xl">
              During the day, he teaches piano to students of all ages at all
              levels at Capital City Keyboards. During the night, he jams at
              Ottawa's one-and-only jazz club &mdash; Jazz@248 — as a jazz
              keyboardist. He is open to collaborating with musicians,
              directors, and engineers based in Ottawa to co-create the next big
              hit in the local music scene.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link href="/music">
                <Button
                  size="lg"
                  className="h-12 px-8 text-lg font-bold bg-destructive hover:text-black cursor-pointer"
                >
                  Music <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                professionalvibemaster@stevensun.com
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} */

"use client";

//import { Button } from "@/components/ui/button";
import { GraduationCap, MicVocal, Music2 } from "lucide-react"; //ArrowRight, BookOpen, GraduationCap, MicVocal, Music2
import Image from "next/image";
//import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";

function Reveal({
  children,
  delay = "",
}: {
  children: ReactNode;
  delay?: string;
}) {
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
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${delay}
        ${show ? "translate-y-0 opacity-100" : "translate-y-14 opacity-0"}`}
    >
      {children}
    </div>
  );
}

export default function getAbout() {
  return (
    <div className="min-h-screen bg-black text-neutral-100">
      <main className="mx-auto max-w-7xl px-6 py-32 font-redHatDisplay">
        <section className="relative min-h-screen">
          <div
            className="absolute inset-0 rounded-[3rem] 
                       bg-gradient-to-b from-neutral-950 via-neutral-900 to-amber-950/50
                       "
          >
            <div className="relative grid gap-10 p-16 lg:grid-cols-[1.1fr_0.9fr] lg:p-14">
              <Reveal>
                <div className="space-y-10">
                  <div className="rounded-[2rem] bg-neutral-850 p-8 shadow-[0_0_20px_rgba(245,158,11,0.5)] text-center">
                    <p className="mb-8 text-5xl font-black leading-tight text-amber-500">
                      About Steven Sun
                    </p>
                    <h1 className="text-2xl leading-tight text-neutral-50">
                      Meet Your Professional Vibemaster
                    </h1>
                    <p className="mt-4 text-xl leading-8 text-neutral-400">
                      As a software developer who earned an RCM Grade 10
                      Certification in Piano Performance, Steven excels at
                      performing and digitalizing immersive entertainment
                      experiences.
                    </p>
                  </div>
                  <ul
                    className="space-y-7 rounded-[2rem] bg-neutral-850 p-8 text-3xl font-bold leading-tight 
                                 text-neutral-300 shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                  >
                    {[
                      "Pianist - Singer",
                      "Music Educator",
                      "Accompanist, Collaborative Artist",
                      "Tech-Savvy Creative",
                      "Blending Music, Education, and Technology",
                    ].map((item) => (
                      <li key={item} className="flex gap-4">
                        <span className="text-amber-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay="delay-150">
                <div className="relative min-h-[720px] overflow-hidden rounded-[2rem] shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                  <Image
                    src="/hero-images/AI_Generated_Basement_Studio.png"
                    alt="Steven Sun profile portrait"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="grid gap-8 py-16 md:grid-cols-2">
          <Reveal>
            <div
              className="
                absolute inset-0
                bg-[radial-gradient(ellipse_at_center,rgba(255,220,120,0.35)_0%,rgba(245,158,11,0.22)_50%,rgb(48,48,48)_100%)]
                blur-2xl
              "
            />
            <div className="rounded-[2rem] p-8 ring-1 ring-amber-500/20 relative z-10">
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
                of his music videos in house.
              </p>
            </div>
          </Reveal>

          <Reveal delay="delay-150">
            <div
              className="
                absolute inset-0
                bg-[radial-gradient(ellipse_at_center,rgba(255,220,120,0.35)_0%,rgba(245,158,11,0.22)_50%,rgb(48,48,48)_100%)]
                blur-2xl
              "
            />
            <div className="rounded-[2rem] p-8 ring-1 ring-amber-500/20 relative z-10">
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
                era, Steven leverages his unique background to craft a rich
                fusion sound informed by popular culture and music legends of
                the past.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="py-16">
          <Reveal delay="delay-150">
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
                Credentials | Teaching | Practical Musicianship
              </h2>
              <div className="grid gap-6 text-lg leading-8 md:grid-cols-2">
                <div
                  className="rounded-2xl bg-gradient-to-tl from-amber-100 via-orange-200 to-yellow-300
                               p-6 shadow-lg ring-1 ring-amber-500/20"
                >
                  <p className="text-gray-700 text-xl font-semibold">
                    Steven holds{" "}
                    <span className="font-black">
                      RCM Grade 10 Piano Certification
                    </span>{" "}
                    and has over three years of experience teaching piano to
                    students of all ages and levels.
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
                    , he connects music learning with digital creativity,
                    production, and practical problem-solving.
                  </p>
                </div>

                <div
                  className="rounded-2xl bg-gradient-to-bl from-amber-100 via-orange-200 to-yellow-300
                               p-6 shadow-lg ring-1 ring-amber-500/20"
                >
                  <p className="text-gray-700 text-xl font-semibold">
                    He can teach practical and theory{" "}
                    <span className="font-black">
                      courses from the RCM syllabus
                    </span>
                    , including exam preparation, while keeping lessons beginner
                    friendly and creatively useful.
                  </p>
                </div>

                <div
                  className="rounded-2xl bg-gradient-to-br from-amber-100 via-orange-200 to-yellow-300
                               p-6 shadow-lg ring-1 ring-amber-500/20"
                >
                  <p className="text-gray-700 text-xl font-semibold">
                    <span className="font-black">Hour-long lessons</span> can
                    include popular songs, accompaniment, ear training, theory,
                    jazz, weddings, and other real musical settings.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
