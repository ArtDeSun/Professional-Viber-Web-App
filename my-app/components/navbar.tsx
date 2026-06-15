"use client";

import { Piano } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    /* border-b border-gray-200  */
    /* <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xs bg-gradient-to-b from-black/80 via-black/80 via-20% to-transparent"> */
    <nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xs 
                     bg-gradient-to-b from-black/80 via-black/80 via-20% to-transparent
                     fixed top-0 left-0 right-0 transition-all duration-2000 
                     ease-[cubic-bezier(0.22,1,0.36,1)]
                     ${visible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"}`}
    >
      <div className="container mx-auto flex items-center h-24 px-4 justify-between font-playfairDisplay">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold text-gray-300"
          onClick={(e) => {
            if (isHomePage) {
              e.preventDefault();
              history.pushState(null, "", "/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <Piano />
          Home
        </Link>
        {/* CONSIDER THIS: className="md:grid-cols-4" */}
        <div className="flex gap-5">
          {/* <Link href="/home">Home</Link> */}
          <Link href="/about">
            <Button className="h-10 w-28 text-gray-300 text-xl hover:font-semibold cursor-pointer">
              About
            </Button>
          </Link>
          <Link href="/youtube">
            <Button className="h-10 w-28 bg-destructive text-gray-300 text-xl rounded-xl hover:text-black cursor-pointer">
              Youtube
            </Button>
          </Link>
          {/* <Link href="/youtube">
            <Button
              variant="ghost"
              className="bg-destructive text-white text-xl cursor-pointer"
            >
              Youtube
            </Button>
          </Link> */}
          <Link href="/music">
            <Button className="h-10 w-28 text-gray-300 text-xl hover:font-semibold cursor-pointer">
              Music
            </Button>
          </Link>
          {/* <Link href="/shows">
            <Button className="text-gray-700 text-xl hover:text-black cursor-pointer">
              Shows
            </Button>
          </Link> */}
          <Link href="/updates">
            <Button className="h-10 w-28 text-gray-300 text-xl hover:font-semibold cursor-pointer">
              Updates
            </Button>
          </Link>
        </div>
        <div className="flex">
          <Link href="/lessons">
            <Button className="h-10 w-28 bg-amber-600 text-gray-300 text-xl rounded-xl hover:bg-amber-600/70 cursor-pointer">
              Lessons
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
