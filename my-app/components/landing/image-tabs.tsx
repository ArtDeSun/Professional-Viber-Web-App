"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

const tabs = [
  {
    id: "AI_Basement_Music_Studio_1",
    label: "Vibes",
    src: "/hero-images/AI_Generated_Basement_Studio.webp",
    isSquare: false,
  },
  {
    id: "Steven_Sun_Logo_2",
    label: "More Vibes",
    src: "/hero-images/icon.webp",
    isSquare: true,
  },
] as const;
type Tab = (typeof tabs)[number];
type TabId = Tab["id"];

const DEFAULT_TAB = tabs[0];
const STORAGE_KEY = "activeTab";

export default function ImageTabs() {
  const [activeTab, setActiveTab] = useState<TabId>(DEFAULT_TAB.id);
  const [displayedHeroImage, setDisplayedHeroImage] =
    useState<Tab>(DEFAULT_TAB);
  const [animationState, setAnimationState] = useState<
    "entering" | "visible" | "exiting"
  >("entering");
  const storageInitialized = useRef(false);
  const activeImage = tabs.find((tab) => tab.id === activeTab) ?? DEFAULT_TAB;

  useEffect(() => {
    const savedTabId = localStorage.getItem(STORAGE_KEY);
    const savedTab = tabs.find((tab) => tab.id === savedTabId);
    if (savedTab) {
      setActiveTab(savedTab.id);
    }
    storageInitialized.current = true;
  }, []);

  useEffect(() => {
    if (!storageInitialized.current) return;
    localStorage.setItem(STORAGE_KEY, activeTab);
  }, [activeTab]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setAnimationState("visible");
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (displayedHeroImage.id === activeImage.id) return;

    setAnimationState("exiting");

    const exitTimer = window.setTimeout(() => {
      setDisplayedHeroImage(activeImage);
      setAnimationState("entering");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimationState("visible");
        });
      });
    }, 300);

    return () => window.clearTimeout(exitTimer);
  }, [activeImage, displayedHeroImage.id]);

  return (
    <section className="bg-black px-4 py-12 min-h-[850px]">
      <div className="container mx-auto max-w-6xl">
        <div
          className="
                      mb-6 flex flex-col justify-center gap-1
                      font-marcellus
                      sm:items-center
                      md:flex-row md:justify-center md:mx-0
                      lg:gap-2
                    "
        >
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                          group relative w-1/2 mx-auto overflow-hidden rounded-lg px-6 py-1 text-sm font-bold
                          md:mx-0 md:w-auto md:text-lg
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
                      mx-auto h-[480px] w-full max-w-5xl
                      sm:h-[560px]
                      lg:h-[700px]
                      flex items-center justify-center
                      overflow-hidden rounded-4xl
                      
                      bg-neutral-950
                      border border-white/5

                      ring-1 ring-white/10

                      hover:shadow-[0_0_50px_rgba(245,158,11,0.5)]
                      transition-all duration-300
                    "
        >
          <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-8 lg:p-12">
            <div
              className="
                          absolute inset-0
                          bg-[radial-gradient(ellipse_at_center,rgba(255,220,120,0.35)_0%,rgba(245,158,11,0.22)_50%,rgb(48,48,48)_100%)]
                          blur-2xl
                        "
            />

            <div
              key={displayedHeroImage.id}
              className={`relative z-10 hover:scale-102 active:scale-105
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
                className={`
                            relative overflow-hidden rounded-[50%]
                            ${
                              displayedHeroImage.isSquare
                                ? `
                                  h-[270px] w-[270px]
                                  sm:h-[340px] sm:w-[340px]
                                  md:h-[440px] md:w-[440px]
                                  lg:h-[520px] lg:w-[520px]
                                `
                                : `
                                  h-[400px] w-[270px]
                                  sm:h-[460px] sm:w-[460px]
                                  md:h-[480px] md:w-[480px]
                                  lg:h-[480px] lg:w-[720px]
                                  xl:h-[540px] xl:w-[860px]
                                `
                            }
                          `}
              >
                {displayedHeroImage && (
                  <Image
                    src={displayedHeroImage.src}
                    alt={displayedHeroImage.label}
                    fill
                    quality={70}
                    sizes={
                      displayedHeroImage.isSquare
                        ? `
                        (max-width: 639px) 270px,
                        (max-width: 767px) 340px,
                        (max-width: 1023px) 440px,
                        520px
                      `
                        : `
                        (max-width: 639px) 270px,
                        (max-width: 767px) 460px,
                        (max-width: 1023px) 480px,
                        (max-width: 1279px) 720px,
                        860px
                      `
                    }
                    className={`
                                ${
                                  displayedHeroImage.isSquare
                                    ? "object-contain"
                                    : "object-cover"
                                }
                              `}
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
