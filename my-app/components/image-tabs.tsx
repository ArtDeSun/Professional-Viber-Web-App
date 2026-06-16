"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ImageTabs() {
  // const [activeTab, setActiveTab] = useState("organize"); //organize, hired, boards, MV_UI_Cards_Inspiration, Stay_In_Touch_Template

  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    setActiveTab(savedTab ?? "organize");
  }, []);

  useEffect(() => {
    if (activeTab !== null) {
      localStorage.setItem("activeTab", activeTab);
    }
  }, [activeTab]);

  /* if (activeTab === null) {
    return null; // or a loading spinner/skeleton
  } */

  return (
    <section className="border-t bg-white px-4 py-16 min-h-[850px]">
      <div className="container mx-auto max-w-6xl">
        {/* Tabs */}
        {/* CONSIDER THIS: className="md:grid-cols-4" */}
        <div className="flex gap-2 justify-center mb-8">
          <Button
            onClick={() => setActiveTab("organize")}
            /* className="bg-amber-500" */
            className={`rounded-lg px-6 py-3 text-sm font-medium 
                    transition-colors hover:cursor-pointer ${
                      activeTab === "organize"
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
          >
            Organize Applications
          </Button>
          <Button
            onClick={() => setActiveTab("hired")}
            className={`rounded-lg px-6 py-3 text-sm font-medium 
                    transition-colors hover:cursor-pointer ${
                      activeTab === "hired"
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
                    }`}
          >
            Get Hired
          </Button>
          <Button
            onClick={() => setActiveTab("boards")}
            className={`rounded-lg px-6 py-3 text-sm font-medium 
                    transition-colors hover:cursor-pointer ${
                      activeTab === "boards"
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
                    }`}
          >
            Manage Boards
          </Button>
          <Button
            onClick={() => setActiveTab("MV_UI_Cards_Inspiration")}
            className={`rounded-lg px-6 py-3 text-sm font-medium 
                    transition-colors hover:cursor-pointer ${
                      activeTab === "MV_UI_Cards_Inspiration"
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
                    }`}
          >
            Inspiration for MV Cards
          </Button>
          <Button
            onClick={() => setActiveTab("Stay_In_Touch_Template")}
            className={`rounded-lg px-6 py-3 text-sm font-medium 
                    transition-colors hover:cursor-pointer ${
                      activeTab === "Stay_In_Touch_Template"
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
                    }`}
          >
            Mock Sign Up
          </Button>
        </div>
        <div className="relative mx-auto max-h-[700px] max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-2xl">
          {activeTab === "organize" && (
            <Image
              src="/hero-images/hero1.png"
              alt="Organize Applications"
              width={1200}
              height={800}
            />
          )}
          {activeTab === "hired" && (
            <Image
              src="/hero-images/hero2.png"
              alt="Get Hired"
              width={1200}
              height={800}
            />
          )}
          {activeTab === "boards" && (
            <Image
              src="/hero-images/hero3.png"
              alt="Manage Boards"
              width={1200}
              height={800}
            />
          )}
          {activeTab === "MV_UI_Cards_Inspiration" && (
            <Image
              src="/hero-images/MV_UI_Cards_Inspiration.png"
              alt="Inspiration for MV Cards"
              width={1200}
              height={800}
            />
          )}
          {activeTab === "Stay_In_Touch_Template" && (
            <Image
              src="/hero-images/Stay_In_Touch_Template.png"
              alt="Mock Template for Signing Up"
              width={1200}
              height={800}
            />
          )}
        </div>
      </div>
    </section>
  );
}
