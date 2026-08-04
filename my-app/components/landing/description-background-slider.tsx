// components/landing/description-background-slider.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/hero-images/AI_Generated_Basement_Studio.webp",
  "/hero-images/icon.webp",
];

const SLIDE_MS = 1200;
const HOLD_MS = 4000;

export default function DescriptionBackgroundSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [sliding, setSliding] = useState(false);
  const [canAnimate, setCanAnimate] = useState(true);

  useEffect(() => {
    const holdTimer = window.setTimeout(() => {
      setSliding(true);

      const finishTimer = window.setTimeout(() => {
        setCanAnimate(false);
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % images.length);
        setSliding(false);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setCanAnimate(true);
          });
        });
      }, SLIDE_MS);

      return () => window.clearTimeout(finishTimer);
    }, HOLD_MS);

    return () => window.clearTimeout(holdTimer);
  }, [nextIndex]);

  return (
    <div className="absolute inset-0">
      <Image
        src={images[currentIndex]}
        alt=""
        fill
        sizes="100vw"
        quality={55}
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
        src={images[nextIndex]}
        alt=""
        fill
        sizes="100vw"
        quality={55}
        className={`
              object-cover object-center brightness-[0.85] opacity-85
              ${
                canAnimate
                  ? "transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  : "transition-none"
              }
              ${sliding ? "translate-x-0" : "translate-x-full"}
            `}
      />
    </div>
  );
}
