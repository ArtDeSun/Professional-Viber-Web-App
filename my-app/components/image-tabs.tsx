"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const tabs = [
  {
    id: "AI_Basement_Music_Studio_1",
    label: "Studio",
    imgName: "AI_Generated_Basement_Studio",
  },
  {
    id: "Steven_Sun_Logo_2",
    label: "Steven Sun Logo",
    imgName: "icon",
  },
  {
    id: "AI_Basement_Music_Studio_3",
    label: "Studio",
    imgName: "AI_Generated_Basement_Studio",
  },
  {
    id: "Steven_Sun_Logo_4",
    label: "Steven Sun Logo",
    imgName: "icon",
  },
  {
    id: "AI_Basement_Music_Studio_5",
    label: "Studio",
    imgName: "AI_Generated_Basement_Studio",
  },
];

export default function ImageTabs() {
  //Tabs
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");

    const validTab = tabs.some((tab) => tab.id === savedTab)
      ? savedTab
      : "AI_Basement_Music_Studio_1";

    setActiveTab(validTab);
  }, []);

  useEffect(() => {
    if (activeTab !== null) {
      localStorage.setItem("activeTab", activeTab);
    }
  }, [activeTab]);

  //Images
  const activeImage = tabs.find((tab) => tab.id === activeTab);

  const [displayedHeroImage, setDisplayedHeroImage] = useState<
    (typeof tabs)[number] | null
  >(null);

  //const [heroImageVisible, setHeroImageVisible] = useState(false);

  const [animationState, setAnimationState] = useState<
    "entering" | "visible" | "exiting"
  >("entering");

  useEffect(() => {
    if (!activeImage) return;

    // First load
    if (!displayedHeroImage) {
      setDisplayedHeroImage(activeImage);
      setAnimationState("entering");

      requestAnimationFrame(() => {
        setAnimationState("visible");
      });

      return;
    }

    // Same tab, do nothing
    if (displayedHeroImage.id === activeImage.id) return;

    // Exit old image first
    setAnimationState("exiting");

    const exitTimer = setTimeout(() => {
      setDisplayedHeroImage(activeImage);
      setAnimationState("entering");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimationState("visible");
        });
      });
    }, 300);

    return () => clearTimeout(exitTimer);
  }, [activeImage, displayedHeroImage]);

  return (
    <section className="bg-black px-4 py-16 min-h-[850px]">
      <div className="container mx-auto max-w-6xl">
        {/* Tabs */}
        {/* CONSIDER THIS: className="md:grid-cols-4" */}
        <div className="flex gap-2 justify-center mb-8 font-marcellus">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                          group relative overflow-hidden rounded-lg px-6 py-3 text-lg font-bold
                          transition-all duration-400 ease-out
                          hover:cursor-pointer
                          ${
                            activeTab === tab.id
                              ? "text-gray-100 bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-400"
                              : "text-gray-700 bg-gradient-to-r from-white via-amber-100 to-white"
                          }
                        `}
            >
              {activeTab !== tab.id && (
                <span
                  className="
                              absolute inset-0
                              bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-300
                              opacity-0 transition-opacity duration-400 ease-out
                              group-hover:opacity-100
                            "
                />
              )}

              <span className="relative z-10">{tab.label}</span>
            </Button>
          ))}
        </div>
        <div
          className="
                      mx-auto h-[700px] max-w-5xl
                      flex items-center justify-center
                      overflow-hidden rounded-4xl
                      
                      bg-neutral-950
                      border border-white/5

                      ring-1 ring-white/10

                      hover:shadow-[0_0_50px_rgba(245,158,11,0.5)]
                      transition-all duration-300
                    "
        >
          <div className="relative flex items-center justify-center p-12">
            <div
              className="
                          absolute inset-0
                          bg-[radial-gradient(ellipse_at_center,rgba(255,220,120,0.35)_0%,rgba(245,158,11,0.22)_50%,rgb(48,48,48)_100%)]
                          blur-2xl
                        "
            />

            <div
              key={displayedHeroImage?.id}
              className={`relative z-10 hover:scale-102
                          [filter:drop-shadow(0_0_30px_rgba(225,29,72,0.5))]
                            transition-all duration-800 ease-[cubic-bezier(0.25,0.5,0.4,1)]
                              ${
                                animationState === "visible"
                                  ? "translate-y-0 opacity-100"
                                  : animationState === "exiting"
                                    ? "translate-y-[440px] opacity-0"
                                    : "-translate-y-[440px] opacity-0"
                              }
                            `}
            >
              <div
                className="overflow-hidden"
                style={{
                  clipPath: "ellipse(50% 50% at 50% 50%)",
                }}
              >
                {displayedHeroImage && (
                  <Image
                    src={`/hero-images/${displayedHeroImage.imgName}.png`}
                    alt={displayedHeroImage.imgName}
                    width={1200}
                    height={800}
                    className="max-h-[580px] w-auto object-contain"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
