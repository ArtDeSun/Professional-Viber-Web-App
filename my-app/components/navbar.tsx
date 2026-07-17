"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MouseEvent,
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import NavbarRightCorner from "./navbar-right-corner";
import { Button } from "./ui/button";

type NavId =
  | "stevensun"
  | "about"
  | "youtube"
  | "music"
  | "updates"
  | "contact";

export default function Navbar() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(false);

  const navRailRef = useRef<HTMLDivElement>(null);

  const itemRefs: Record<NavId, RefObject<HTMLAnchorElement | null>> = {
    stevensun: useRef<HTMLAnchorElement>(null),
    about: useRef<HTMLAnchorElement>(null),
    youtube: useRef<HTMLAnchorElement>(null),
    music: useRef<HTMLAnchorElement>(null),
    updates: useRef<HTMLAnchorElement>(null),
    contact: useRef<HTMLAnchorElement>(null),
  };

  const [activeId, setActiveId] = useState<NavId | null>("stevensun");

  const previousActiveIdRef = useRef<NavId | null>(activeId);

  const [barStyle, setBarStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [hoverBarStyle, setHoverBarStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [barTransitionEnabled, setBarTransitionEnabled] = useState(false);

  const getRouteActiveId = (): NavId | null => {
    if (
      (pathname === "/dashboard" ||
        pathname === "/dashboard-landscape-videos") &&
      window.location.hash !== "#contact"
    ) {
      return null;
    }

    if (typeof window !== "undefined" && window.location.hash === "#contact") {
      return "contact";
    }

    if (pathname === "/") return "stevensun";
    if (pathname === "/about") return "about";
    if (pathname === "/music") return "music";
    if (pathname === "/updates") return "updates";

    return null;
  };

  const moveBarTo = (id: NavId) => {
    const rail = navRailRef.current;
    const item = itemRefs[id].current;

    if (!rail || !item) return;

    const railRect = rail.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    setBarStyle({
      left: itemRect.left - railRect.left,
      width: itemRect.width,
      opacity: 1,
    });
  };

  const moveHoverBarTo = (id: NavId) => {
    const rail = navRailRef.current;
    const item = itemRefs[id].current;

    if (!rail || !item) return;

    const railRect = rail.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    setHoverBarStyle({
      left: itemRect.left - railRect.left,
      width: itemRect.width,
      opacity: 0.75,
    });
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useLayoutEffect(() => {
    const id = getRouteActiveId();

    setBarTransitionEnabled(false);

    if (id === null) {
      setActiveId(null);
      setBarStyle((prev) => ({
        ...prev,
        opacity: 0,
      }));

      requestAnimationFrame(() => {
        setBarTransitionEnabled(true);
      });

      return;
    }

    setActiveId(id);

    requestAnimationFrame(() => {
      moveBarTo(id);

      requestAnimationFrame(() => {
        setBarTransitionEnabled(true);
      });
    });
  }, [pathname]);

  useEffect(() => {
    if (activeId === null) return;
    /* const handleResize = () => moveBarTo(activeId);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); */
    const rail = navRailRef.current;
    const item = itemRefs[activeId].current;

    if (!rail || !item) return;

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        moveBarTo(activeId);
      });
    });

    observer.observe(rail);
    observer.observe(item);

    return () => observer.disconnect();
  }, [activeId]);

  useLayoutEffect(() => {
    if (activeId === null) {
      previousActiveIdRef.current = null;
      return;
    }

    const cameFromHidden = previousActiveIdRef.current === null;

    if (cameFromHidden) {
      setBarTransitionEnabled(false);

      requestAnimationFrame(() => {
        moveBarTo(activeId);

        requestAnimationFrame(() => {
          setBarTransitionEnabled(true);
        });
      });
    } else {
      moveBarTo(activeId);
    }

    previousActiveIdRef.current = activeId;
  }, [activeId]);

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

  useEffect(() => {
    const syncActiveId = () => {
      const id = getRouteActiveId();

      setActiveId(id);

      if (id === null) {
        setBarStyle((prev) => ({
          ...prev,
          opacity: 0,
        }));
      }
    };

    window.addEventListener("navbar-route-change", syncActiveId);
    window.addEventListener("hashchange", syncActiveId);

    return () => {
      window.removeEventListener("navbar-route-change", syncActiveId);
      window.removeEventListener("hashchange", syncActiveId);
    };
  }, [pathname]);

  const NAVIGATION_KICKOFF_MS = 400;

  const handleTopNav = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string,
    id: NavId,
  ) => {
    e.preventDefault();

    setActiveId(id);

    // Already on this page
    if (pathname === href) {
      if (window.scrollY === 0) {
        window.location.reload();
        return;
      }

      history.replaceState(null, "", href);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    // Wait for a fraction of the neon bar animation
    setTimeout(() => {
      window.location.href = href;
    }, NAVIGATION_KICKOFF_MS);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setMobileMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    /* border-b border-gray-200  */
    /* <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xs 
    bg-gradient-to-b from-black/80 via-black/80 via-20% to-transparent"> */
    <nav
      className={`fixed left-0 top-0 z-50 w-full
                  ${
                    animate
                      ? "transition-all duration-1000 ease-[cubic-bezier(0.30,1,0.50,1)]"
                      : "transition-none"
                  }
                  ${visible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"}
                  `}
    >
      <div
        ref={navRailRef}
        className={`
                    relative grid h-20 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]
                    items-center px-2 font-playfairDisplay
                    transition-none
                    lg:flex lg:h-24 lg:justify-between lg:px-4
                    ${
                      mobileMenuOpen
                        ? "bg-black"
                        : "bg-gradient-to-b from-black/80 via-black/80 via-20% to-transparent backdrop-blur-xs"
                    }
                  `}
      >
        {/* Neon sliding bar */}
        {activeId !== null && (
          <span
            className={`
                        pointer-events-none absolute bottom-3 h-[2px] rounded-full
                        hidden lg:block
                        bg-white shadow-[0_0_8px_rgba(255,255,255,0.95),0_0_16px_rgba(255,255,255,0.75)]
                        ${
                          barTransitionEnabled
                            ? "transition-all duration-[500ms] ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                            : "transition-none"
                        }
                      `}
            style={{
              left: `${barStyle.left}px`,
              width: `${barStyle.width}px`,
              opacity: barStyle.opacity,
            }}
          />
        )}
        <span
          className="
                          pointer-events-none absolute bottom-3 h-[2px] rounded-full
                          hidden lg:block
                          bg-white shadow-[0_0_6px_rgba(255,255,255,0.65),0_0_12px_rgba(255,255,255,0.45)]
                          transition-all duration-[500ms] ease-[cubic-bezier(0.25,0.8,0.25,1)]
                        "
          style={{
            left: `${hoverBarStyle.left}px`,
            width: `${hoverBarStyle.width}px`,
            opacity: hoverBarStyle.opacity,
          }}
        />

        {/* Left item */}
        <div className="flex min-w-0 justify-center lg:w-60 lg:flex-none lg:justify-start">
          <Link
            ref={itemRefs.stevensun}
            href="/"
            onMouseEnter={() => moveHoverBarTo("stevensun")}
            onMouseLeave={() =>
              setHoverBarStyle((prev) => ({ ...prev, opacity: 0 }))
            }
            onClick={(e) => handleTopNav(e, "/", "stevensun")}
            className={`group flex min-w-0 items-center gap-1.5 text-lg font-semibold
                  transition-all duration-300 sm:text-xl lg:w-60 lg:gap-2 lg:text-2xl
                          hover:text-amber-300 group
                          ${
                            activeId === "stevensun"
                              ? "text-white"
                              : "text-gray-300"
                          }`}
          >
            <img
              src="/hero-images/icon.png"
              alt="Steven Sun Logo"
              className="h-9 w-9 shrink-0 transition duration-300 group-hover:scale-105 lg:h-12 lg:w-12"
            />
            <span className="whitespace-nowrap max-[319px]:text-base">
              Steven Sun
            </span>
          </Link>
        </div>

        <button
          type="button"
          aria-label={
            mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((previous) => !previous)}
          className="
                      flex h-9 w-9 shrink-0 cursor-pointer
                      items-center justify-center justify-self-center
                      rounded-xl text-gray-200
                      transition-colors hover:bg-white/10 hover:text-white
                      lg:hidden
                    "
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5 lg:h-7 lg:w-7" />
          ) : (
            <Menu className="h-5 w-5 lg:h-7 lg:w-7" />
          )}
        </button>

        {/* Centered buttons */}
        <div className="hidden gap-2 lg:flex xl:gap-5 mx-auto">
          <Link
            ref={itemRefs.about}
            href="/about"
            onMouseEnter={() => moveHoverBarTo("about")}
            onMouseLeave={() =>
              setHoverBarStyle((prev) => ({ ...prev, opacity: 0 }))
            }
            onClick={(e) => handleTopNav(e, "/about", "about")}
          >
            <Button
              className={`h-10 w-24 xl:w-28 cursor-pointer text-xl hover:font-bold hover:text-white ${
                activeId === "about" ? "text-white" : "text-gray-300"
              }`}
            >
              About
            </Button>
          </Link>
          <a
            href="https://www.youtube.com/@StevenVibemasterSun"
            target="_blank"
          >
            <Button
              className="h-10 w-24 xl:w-28 bg-destructive text-gray-300 text-xl rounded-xl 
                         hover:text-black cursor-pointer"
            >
              Youtube
            </Button>
          </a>
          <Link
            ref={itemRefs.music}
            href="/music"
            onMouseEnter={() => moveHoverBarTo("music")}
            onMouseLeave={() =>
              setHoverBarStyle((prev) => ({ ...prev, opacity: 0 }))
            }
            onClick={(e) => handleTopNav(e, "/music", "music")}
          >
            <Button
              className={`h-10 w-24 xl:w-28 cursor-pointer text-xl hover:font-bold hover:text-white ${
                activeId === "music" ? "text-white" : "text-gray-300"
              }`}
            >
              Music
            </Button>
          </Link>
          <Link
            ref={itemRefs.updates}
            href="/updates"
            onMouseEnter={() => moveHoverBarTo("updates")}
            onMouseLeave={() =>
              setHoverBarStyle((prev) => ({ ...prev, opacity: 0 }))
            }
            onClick={(e) => handleTopNav(e, "/updates", "updates")}
          >
            <Button
              className={`h-10 w-24 xl:w-28 cursor-pointer text-xl hover:font-bold hover:text-white ${
                activeId === "updates" ? "text-white" : "text-gray-300"
              }`}
            >
              Updates
            </Button>
          </Link>
          <Link
            ref={itemRefs.contact}
            href="#contact"
            onMouseEnter={() => moveHoverBarTo("contact")}
            onMouseLeave={() =>
              setHoverBarStyle((prev) => ({ ...prev, opacity: 0 }))
            }
            onClick={(e) => {
              //code
              e.preventDefault();
              setActiveId("contact");
              history.replaceState(null, "", `${pathname}#contact`);
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <Button
              className={`h-10 w-24 xl:w-28 cursor-pointer text-xl hover:font-bold hover:text-white ${
                activeId === "contact" ? "text-white" : "text-gray-300"
              }`}
            >
              Contact
            </Button>
          </Link>
        </div>

        {/* Right Corner */}
        <div className="flex min-w-0 items-center justify-center pr-1 lg:w-60 lg:flex-none lg:justify-end lg:pr-0 xl:w-64">
          <NavbarRightCorner />
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`
                    overflow-hidden
                    bg-gradient-to-b
                    from-black via-black/80 via-20% to-transparent
                    backdrop-blur-xs
                    font-playfairDisplay
                    transition-[max-height,opacity,padding]
                    duration-300 ease-out
                    lg:hidden
                    ${
                      mobileMenuOpen
                        ? "max-h-80 px-4 py-2 opacity-100"
                        : "pointer-events-none max-h-0 px-4 py-0 opacity-0"
                    }
                  `}
      >
        <div className="flex flex-col items-center gap-2">
          <Link
            href="/about"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleTopNav(e, "/about", "about");
            }}
          >
            <Button
              className={`h-8 w-40 justify-center px-4 text-md
                          hover:font-bold hover:text-white
                          cursor-pointer
                          ${activeId === "about" ? "text-white" : "text-gray-300"}`}
            >
              About
            </Button>
          </Link>

          <a
            href="https://www.youtube.com/@StevenVibemasterSun"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Button
              className="
                          h-8 w-40 justify-center rounded-xl bg-destructive
                          px-4 text-md text-gray-300 hover:text-black
                          cursor-pointer
                        "
            >
              YouTube
            </Button>
          </a>

          <Link
            href="/music"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleTopNav(e, "/music", "music");
            }}
          >
            <Button
              className={`h-8 w-40 justify-center px-4 text-md
                          hover:font-bold hover:text-white
                          cursor-pointer
                          ${activeId === "music" ? "text-white" : "text-gray-300"}`}
            >
              Music
            </Button>
          </Link>

          <Link
            href="/updates"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleTopNav(e, "/updates", "updates");
            }}
          >
            <Button
              className={`h-8 w-40 justify-center px-4 text-md
                          hover:font-bold hover:text-white
                          cursor-pointer
                          ${activeId === "updates" ? "text-white" : "text-gray-300"}`}
            >
              Updates
            </Button>
          </Link>

          <Link
            href="#contact"
            onClick={(e) => {
              e.preventDefault();

              setActiveId("contact");
              setMobileMenuOpen(false);

              history.replaceState(null, "", `${pathname}#contact`);

              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <Button
              className={`h-8 w-40 justify-center px-4 text-md
                          hover:font-bold hover:text-white
                          cursor-pointer
                          ${activeId === "contact" ? "text-white" : "text-gray-300"}`}
            >
              Contact
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
