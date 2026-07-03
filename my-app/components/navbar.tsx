"use client";

import { Piano } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarRightCorner from "./navbar-right-corner";
import { Button } from "./ui/button";

export default function Navbar() {
  const pathname = usePathname();

  /* const router = useRouter(); */

  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(false);

  const triggerNavbarAnimation = () => {
    setAnimate(false);
    setVisible(false);

    const timer = setTimeout(() => {
      setAnimate(true);
      setVisible(true);
    }, 100);

    return timer;
  };

  useEffect(() => {
    const timer = triggerNavbarAnimation();

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    /* border-b border-gray-200  */
    /* <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xs 
    bg-gradient-to-b from-black/80 via-black/80 via-20% to-transparent"> */
    <nav
      className={`fixed top-0 left-0 w-[100vw] z-50 backdrop-blur-xs
                  bg-gradient-to-b from-black/80 via-black/80 via-20% to-transparent
                  ${
                    animate
                      ? "transition-all duration-1000 ease-[cubic-bezier(0.30,1,0.50,1)]"
                      : "transition-none"
                  }
                  ${visible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"}`}
    >
      <div className="container mx-auto flex items-center h-24 px-4 justify-between font-playfairDisplay">
        <Link
          href="/"
          className="w-60 flex items-center gap-2 text-xl font-semibold text-gray-300"
          onClick={(e) => {
            if (pathname !== "/") {
              e.preventDefault();
              window.location.href = "/";
              return;
            }

            if (window.scrollY === 0) {
              e.preventDefault();
              window.location.reload();
              return;
            }

            e.preventDefault();
            history.replaceState(null, "", "/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Piano />
          Steven Sun
        </Link>
        {/* CONSIDER THIS: className="md:grid-cols-4" */}
        <div className="flex gap-5">
          <Link
            href="/about"
            onClick={(e) => {
              if (pathname !== "/about") {
                e.preventDefault();
                window.location.href = "/about";
                return;
              }

              if (window.scrollY === 0) {
                e.preventDefault();
                window.location.reload();
                return;
              }

              e.preventDefault();
              history.replaceState(null, "", "/about");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Button className="h-10 w-28 text-gray-300 text-xl hover:font-bold cursor-pointer">
              About
            </Button>
          </Link>
          <a href="https://www.youtube.com/@stevensun2000" target="_blank">
            <Button
              className="h-10 w-28 bg-destructive text-gray-300 text-xl rounded-xl 
                         hover:text-black cursor-pointer"
            >
              Youtube
            </Button>
          </a>
          {/* <Link href="/youtube">
            <Button
              variant="ghost"
              className="bg-destructive text-white text-xl cursor-pointer"
            >
              Youtube
            </Button>
          </Link> */}
          <Link href="/music">
            <Button className="h-10 w-28 text-gray-300 text-xl hover:font-bold cursor-pointer">
              Music
            </Button>
          </Link>
          {/* <Link href="/shows">
            <Button className="text-gray-700 text-xl hover:text-black cursor-pointer">
              Shows
            </Button>
          </Link> */}
          <Link href="/updates">
            <Button className="h-10 w-28 text-gray-300 text-xl hover:font-bold cursor-pointer">
              Updates
            </Button>
          </Link>
        </div>

        <div className="w-60 flex items-center gap-4">
          {/* Should disappear once a user has signed in*/}
          <NavbarRightCorner />
        </div>
      </div>
    </nav>
  );
}
