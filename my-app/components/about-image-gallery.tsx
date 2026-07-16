"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "./ui/button";

const images = [
  { src: "/hero-images/AI_Generated_Basement_Studio.png", title: "Studio" },
  {
    src: "/hero-images/icon.png",
    title: "Logo",
  },
];

const FADE_DURATION = 500;

export default function AboutImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentImage = images[currentIndex];
  const previousImage = previousIndex !== null ? images[previousIndex] : null;

  function changeImage(nextIndex: number) {
    if (nextIndex === currentIndex) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setPreviousIndex(currentIndex);
    setCurrentIndex(nextIndex);
    setIsTransitioning(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    });

    timeoutRef.current = setTimeout(() => {
      setPreviousIndex(null);
      setIsTransitioning(false);
    }, FADE_DURATION);
  }

  function goNext() {
    changeImage(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  }

  function goPrevious() {
    changeImage(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  }

  return (
    <div
      className="
        relative z-10 mx-auto
        h-[440px] w-full min-w-0 max-w-[520px]
        overflow-hidden rounded-[2rem]
        shadow-[0_0_20px_rgba(245,158,11,0.5)]
        sm:h-[560px] sm:rounded-t-[3rem]
        md:h-[680px]
        lg:mx-0 lg:h-[820px] lg:rounded-t-[4rem]
      "
    >
      {previousImage && (
        <Image
          key={previousImage.src}
          src={previousImage.src}
          alt={previousImage.title}
          sizes="(min-width: 1024px) 520px, (min-width: 640px) 90vw, 100vw"
          fill
          className={`
            object-cover object-center
            transition-opacity duration-700 ease-in-out
            ${isTransitioning ? "opacity-0" : "opacity-100"}
          `}
        />
      )}
      <Image
        key={currentImage.src}
        src={currentImage.src}
        alt={currentImage.title}
        sizes="(min-width: 1024px) 520px, (min-width: 640px) 90vw, 100vw"
        fill
        className={`
          object-cover object-center
          transition-opacity duration-700 ease-in-out
          ${previousImage && !isTransitioning ? "opacity-0" : "opacity-100"}
        `}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/15" />

      <Button
        onClick={goPrevious}
        className="absolute left-6 top-1/3 z-20 -translate-y-1/6 
                   h-10 w-10 rounded-full border border-white/30 
                   bg-black/35 backdrop-blur-sm 
                   text-white text-2xl shadow-lg transition-all
                   hover:scale-115 hover:bg-black/55 hover:border-white/60
                   cursor-pointer"
      >
        &lt;
      </Button>

      <Button
        onClick={goNext}
        className="absolute right-6 top-1/3 z-20 -translate-y-1/6 
                   h-10 w-10 rounded-full border border-white/30 
                   bg-black/35 backdrop-blur-sm 
                   text-white text-2xl shadow-lg transition-all
                   hover:scale-115 hover:bg-black/55 hover:border-white/60
                   cursor-pointer"
      >
        &gt;
      </Button>

      <div className="absolute top-8 left-8 right-8">
        <div className="flex gap-3">
          {images.map((image, index) => (
            <Button
              key={image.src}
              onClick={() => changeImage(index)}
              className={`h-2 flex-1 rounded-full p-0 transition-all duration-500 
                          ${
                            index === currentIndex
                              ? "bg-white shadow-sm"
                              : "bg-white/30 hover:bg-white/60"
                          } cursor-pointer`}
            />
          ))}
        </div>
      </div>
      <div
        className="absolute bottom-16 right-4 rounded-xl
                   border border-white/20 bg-black/30
                   px-6 py-3 backdrop-blur-md"
      >
        <h2
          className="text-xl font-semibold
                    tracking-wide text-white
                    drop-shadow-lg"
        >
          {currentImage.title}
        </h2>
      </div>
    </div>
  );
}
