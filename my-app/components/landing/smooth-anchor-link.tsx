// components/landing/smooth-anchor-link.tsx
"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

type SmoothAnchorLinkProps = {
  href: `#${string}`;
  children: ReactNode;
  className?: string;
};

export default function SmoothAnchorLink({
  href,
  children,
  className,
}: SmoothAnchorLinkProps) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    history.pushState(null, "", href);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Link href={`/${href}`} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
