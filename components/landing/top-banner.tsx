"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/utils/functions";

export function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollThreshold = 100;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (currentScrollY < scrollThreshold) {
        setIsVisible(true);
      } else if (scrollDelta < -10) {
        setIsVisible(true);
      } else if (scrollDelta > 5) {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "-mt-12 sticky z-20 flex items-center justify-between w-full h-12 gap-4 px-4 py-4 text-sm whitespace-pre text-slate-800 sm:px-6 bg-gradient-to-r from-slate-200/75 via-slate-200/75 to-slate-200 top-14 border-y border-t-slate-800/5 border-b-slate-800/10 backdrop-blur transition-transform duration-300",
        !isVisible && "-translate-y-full",
      )}
    >
      Help translate Better Lyrics to your language! 🌍
      <Link
        href="https://crowdin.com/project/better-lyrics?utm_source=badge&utm_medium=referral&utm_campaign=badge-add-on"
        target="_blank"
        rel="nofollow"
        className="transition-transform origin-right hover:scale-[1.025] group"
        data-umami-event="crowdin-link"
      >
        <img
          src="https://support.crowdin.com/assets/logos/plate/svg/crowdin-logo-with-plate.svg"
          alt="Crowdin"
          className="h-9 rounded-xl squircle border border-[#263238]/50 shadow-md bg-white group-hover:shadow-lg transition-[box-shadow,border] group-hover:border-[#263238]/60"
        />
      </Link>
    </div>
  );
}
