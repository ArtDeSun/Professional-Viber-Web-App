// components/landing/hero-section.tsx
// SERVER COMPONENT

import Image from "next/image";
import HeroInteractions from "./hero-interactions";

export default function HeroSection() {
  return (
    <section
      className="flex bg-black relative min-h-screen overflow-hidden
                     px-4 pb-6 pt-16
                     sm:px-6 sm:pb-12
                     lg:px-8 lg:py-46"
    >
      <Image
        src="/hero-images/AI_Generated_Basement_Studio.png"
        alt=""
        fill
        preload
        fetchPriority="high"
        sizes="100vw"
        quality={70}
        className={`object-cover object-center animate-[heroFade_1400ms_ease-out]`}
      />

      <div className="absolute inset-0 bg-black/60" />

      <HeroInteractions />
    </section>
  );
}
