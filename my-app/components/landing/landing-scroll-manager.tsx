"use client";

import { useEffect } from "react";

const SCROLL_KEY = "homeScrollY";
const INTRO_VISIBLE_EVENT = "landing-intro-visible";

export default function LandingScrollManager() {
  useEffect(() => {
    history.scrollRestoration = "manual";

    const navEntry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    const isReload = navEntry?.type === "reload";

    if (!isReload) {
      sessionStorage.removeItem(SCROLL_KEY);
    } else {
      window.scrollTo(0, 0);
    }

    function saveScrollPosition() {
      sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    }

    function restoreScrollPosition() {
      const savedY = sessionStorage.getItem(SCROLL_KEY);
      if (!savedY) return;

      window.setTimeout(() => {
        window.scrollTo({
          top: Number(savedY),
          behavior: "smooth",
        });

        sessionStorage.removeItem(SCROLL_KEY);
      }, 800);
    }

    window.addEventListener("beforeunload", saveScrollPosition);
    window.addEventListener(INTRO_VISIBLE_EVENT, restoreScrollPosition);

    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
      window.removeEventListener(INTRO_VISIBLE_EVENT, restoreScrollPosition);
    };
  }, []);

  return null;
}
