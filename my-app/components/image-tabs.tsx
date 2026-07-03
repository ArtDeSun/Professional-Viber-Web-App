"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ImageTabs() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    setActiveTab(savedTab ?? "AI_Basement_Music_Studio_1");
  }, []);

  useEffect(() => {
    if (activeTab !== null) {
      localStorage.setItem("activeTab", activeTab);
    }
  }, [activeTab]);

  /* if (activeTab === null) {
    return null; // or a loading spinner/skeleton
  } */

  const tabs = [
    { id: "AI_Basement_Music_Studio_1", label: "Studio" },
    { id: "MV_UI_Cards_Inspiration_2", label: "MV Card Template" },
    { id: "AI_Basement_Music_Studio_3", label: "Studio" },
    { id: "MV_UI_Cards_Inspiration_4", label: "MV Card Template" },
    { id: "AI_Basement_Music_Studio_5", label: "Studio" },
  ];

  return (
    <section className="bg-black px-4 py-16 min-h-[850px]">
      <div className="container mx-auto max-w-6xl">
        {/* Tabs */}
        {/* CONSIDER THIS: className="md:grid-cols-4" */}
        <div className="flex gap-2 justify-center mb-8 font-redHatDisplay">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-6 py-3 text-lg font-bold
                          transition-all duration-400 ease-out
                          hover:cursor-pointer
                          ${
                            activeTab === tab.id
                              ? "text-gray-100 bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-400"
                              : "text-gray-700 bg-gradient-to-r from-white via-amber-100 to-white hover:from-amber-300 hover:via-yellow-200 hover:to-orange-300"
                          }`}
            >
              {tab.label}
            </Button>
          ))}

          {/*  <Button
            onClick={() => setActiveTab("AI_Basement_Music_Studio_1")}
            className={`rounded-lg px-6 py-3 text-lg font-bold
                    transition-colors hover:cursor-pointer ${
                      activeTab === "AI_Basement_Music_Studio_1"
                        ? "bg-amber-500 text-gray-100 hover:bg-amber-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                    }`}
          >
            Studio
          </Button>
          <Button
            onClick={() => setActiveTab("MV_UI_Cards_Inspiration_2")}
            className={`rounded-lg px-6 py-3 text-lg font-bold 
                    transition-colors hover:cursor-pointer ${
                      activeTab === "MV_UI_Cards_Inspiration_2"
                        ? "bg-amber-500 text-gray-100 hover:bg-amber-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                    }`}
          >
            MV Card Template
          </Button>
          <Button
            onClick={() => setActiveTab("AI_Basement_Music_Studio_3")}
            className={`rounded-lg px-6 py-3 text-lg font-bold 
                    transition-colors hover:cursor-pointer ${
                      activeTab === "AI_Basement_Music_Studio_3"
                        ? "bg-amber-500 text-gray-100 hover:bg-amber-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                    }`}
          >
            Studio
          </Button>
          <Button
            onClick={() => setActiveTab("MV_UI_Cards_Inspiration_4")}
            className={`rounded-lg px-6 py-3 text-lg font-bold 
                    transition-colors hover:cursor-pointer ${
                      activeTab === "MV_UI_Cards_Inspiration_4"
                        ? "bg-amber-500 text-gray-100 hover:bg-amber-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                    }`}
          >
            MV Card Template
          </Button>
          <Button
            onClick={() => setActiveTab("AI_Basement_Music_Studio_5")}
            className={`rounded-lg px-6 py-3 text-lg font-bold 
                    transition-colors hover:cursor-pointer ${
                      activeTab === "AI_Basement_Music_Studio_5"
                        ? "bg-amber-500 text-gray-100 hover:bg-amber-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                    }`}
          >
            Studio
          </Button> */}
        </div>
        <div
          className="
                      relative mx-auto h-[700px] max-w-5xl
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
                          bg-[radial-gradient(ellipse_at_center,#000_0%,#333_45%,#999_75%,transparent_100%)]
                          blur-3xl
                        "
            />

            {activeTab === "AI_Basement_Music_Studio_1" && (
              <Image
                src="/hero-images/AI_Generated_Basement_Studio.png"
                alt="AI_Basement_Music_Studio"
                width={1200}
                height={800}
                className="relative z-10 max-h-[580px] w-auto object-contain"
              />
            )}

            {activeTab === "MV_UI_Cards_Inspiration_2" && (
              <Image
                src="/hero-images/MV_UI_Cards_Inspiration.png"
                alt="MV_UI_Cards_Inspiration"
                width={1200}
                height={800}
                className="relative z-10 max-h-[580px] w-auto object-contain"
              />
            )}

            {activeTab === "AI_Basement_Music_Studio_3" && (
              <Image
                src="/hero-images/AI_Generated_Basement_Studio.png"
                alt="AI_Basement_Music_Studio"
                width={1200}
                height={800}
                className="relative z-10 max-h-[580px] w-auto object-contain"
              />
            )}

            {activeTab === "MV_UI_Cards_Inspiration_4" && (
              <Image
                src="/hero-images/MV_UI_Cards_Inspiration.png"
                alt="MV_UI_Cards_Inspiration"
                width={1200}
                height={800}
                className="relative z-10 max-h-[580px] w-auto object-contain"
              />
            )}

            {activeTab === "AI_Basement_Music_Studio_5" && (
              <Image
                src="/hero-images/AI_Generated_Basement_Studio.png"
                alt="AI_Basement_Music_Studio"
                width={1200}
                height={800}
                className="relative z-10 max-h-[580px] w-auto object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
