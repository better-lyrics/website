"use client";

import { memo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionHeader } from "@/components/shared/section-header";
import { NoiseOverlay } from "@/components/shared/noise-overlay";
import { ANIMATION_DURATION, STAGGER_DELAY } from "@/constants/animations";
import { useVideoCarousel } from "@/hooks/useVideoCarousel";
import { cn } from "@/utils/functions";

interface Theme {
  id: string;
  name: string;
  color: string;
  textColor: string;
}

const themes: Theme[] = [
  {
    id: "default",
    name: "Default",
    color: "bg-stone-500",
    textColor: "text-stone-700",
  },
  {
    id: "spotlight",
    name: "Spotlight",
    color: "bg-amber-600/80",
    textColor: "text-amber-700",
  },
  {
    id: "even-better-lyrics-plus",
    name: "Even Better Lyrics Plus",
    color: "bg-cyan-500/80",
    textColor: "text-cyan-700",
  },
  {
    id: "minimal",
    name: "Minimal",
    color: "bg-gray-400",
    textColor: "text-gray-600",
  },
  {
    id: "dynamic-background",
    name: "Dynamic Background",
    color: "bg-teal-600/80",
    textColor: "text-teal-700",
  },
  {
    id: "apple-music",
    name: "Apple Music",
    color: "bg-rose-600/80",
    textColor: "text-rose-600",
  },
];

const videoTransition = {
  duration: 0.75,
  ease: [0.4, 0, 0.2, 1] as const,
};

interface LoadingOverlayProps {
  progress: number;
}

const LoadingOverlay = memo(function LoadingOverlay({
  progress,
}: LoadingOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/90"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-48 h-1 overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="absolute inset-y-0 left-0 bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
});

interface ThemeIndicatorProps {
  theme: Theme;
  isActive: boolean;
  isPast: boolean;
  progress: number;
  index: number;
  onClick: () => void;
}

const indicatorVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

const ThemeIndicator = memo(function ThemeIndicator({
  theme,
  isActive,
  isPast,
  progress,
  index,
  onClick,
}: ThemeIndicatorProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative flex flex-col items-center flex-1 w-full gap-2 group focus:outline-none"
      variants={indicatorVariants}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div
        className={cn(
          "relative h-2 w-12 md:w-full rounded-[2px] overflow-hidden transition-colors duration-300 group-hover:bg-gray-400/35",
          index === 0 && "rounded-[8px_2px_2px_8px]",
          index === themes.length - 1 && "rounded-[2px_8px_8px_2px]",
          isActive ? "bg-gray-300" : "bg-gray-300/75"
        )}
      >
        <motion.div
          className={cn("absolute inset-y-0 left-0 bg-gray-600")}
          initial={false}
          animate={{
            width: isActive ? `${progress * 100}%` : isPast ? "100%" : "0%",
            opacity: isActive ? 1 : 0,
          }}
          transition={{
            width: isActive
              ? { duration: 0.05, ease: "linear" }
              : { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
          }}
        />
      </div>
      <motion.span
        className={cn(
          "text-xs font-medium whitespace-nowrap transition-colors duration-300",
          isActive ? "text-gray-600" : "text-gray-400 group-hover:text-gray-500"
        )}
        animate={{ scale: isActive ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {theme.name}
      </motion.span>
    </motion.button>
  );
});

export const ThemePreviewSection = memo(function ThemePreviewSection() {
  const {
    activeIndex,
    previousIndex,
    isLoaded,
    loadingProgress,
    registerVideoRef,
    jumpToTheme,
    getSegmentProgress,
  } = useVideoCarousel({ themes });

  const handleThemeClick = useCallback(
    (index: number) => {
      jumpToTheme(index);
    },
    [jumpToTheme]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLoaded) return;

      if (e.key === "ArrowRight") {
        const nextIndex = (activeIndex + 1) % themes.length;
        jumpToTheme(nextIndex);
      } else if (e.key === "ArrowLeft") {
        const prevIndex = (activeIndex - 1 + themes.length) % themes.length;
        jumpToTheme(prevIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoaded, activeIndex, jumpToTheme]);

  return (
    <section
      id="themes"
      className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-gray-200 via-white to-gray-200 md:py-32"
    >
      <div className="container px-4 mx-auto md:px-6">
        <SectionHeader
          title="Beautiful Themes"
          description="Make YouTube Music yours with stunning themes crafted by the community"
          className="max-w-3xl mx-auto mb-12 text-center"
          descriptionClassName="text-lg md:text-xl"
        />

        <div className="max-w-3xl mx-auto group">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: ANIMATION_DURATION.normal }}
            className="relative overflow-hidden bg-black rounded-2xl squircle shadow-video aspect-video"
          >
            <div className="absolute z-[100] bottom-4 left-4 justify-end items-end flex gap-1 text-xs text-gray-100/75 opacity-0 duration-400 translate-y-4 group-hover:delay-200 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
              <kbd className="grid pb-[2.5px] font-mono text-gray-600 bg-gray-200 rounded size-5 place-items-center embossed-object-small">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-3"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"
                  />
                </svg>
              </kbd>
              <kbd className="grid pb-[2.5px] font-mono text-gray-600 bg-gray-200 rounded size-5 place-items-center embossed-object-small">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-3"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"
                  />
                </svg>
              </kbd>
              <span className="ml-1">to switch themes quickly</span>
            </div>
            <AnimatePresence mode="sync">
              {!isLoaded && (
                <LoadingOverlay key="loading" progress={loadingProgress} />
              )}
            </AnimatePresence>

            {themes.map((theme, index) => {
              const isActive = activeIndex === index;
              const isPrevious = previousIndex === index;
              const isVisible = isActive || isPrevious;

              return (
                <motion.video
                  key={theme.id}
                  ref={(el) => registerVideoRef(index, el)}
                  src={`/videos/themes/${theme.id}.mp4`}
                  muted
                  playsInline
                  preload="auto"
                  initial={false}
                  animate={{
                    opacity: isVisible && isLoaded ? 1 : 0,
                    filter: isActive && isLoaded ? "blur(0px)" : "blur(12px)",
                    scale: isActive && isLoaded ? 1 : isPrevious ? 1 : 1.02,
                    zIndex: isActive ? 10 : isPrevious ? 5 : 1,
                  }}
                  transition={videoTransition}
                  className="absolute inset-0 object-cover w-full h-full"
                />
              );
            })}

            <NoiseOverlay
              gradientDirection="diagonal"
              className="z-20 opacity-[0.02]"
            />

            <div className="absolute flex items-center justify-center text-gray-500 bottom-4 right-4 -z-10">
              <span className="text-sm">Loading…</span>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{
              staggerChildren: STAGGER_DELAY,
              delayChildren: 0.75,
            }}
            className="flex gap-2 mt-12 justify-evenly scrollbar-hide md:gap-1"
          >
            {themes.map((theme, index) => (
              <ThemeIndicator
                key={theme.id}
                index={index}
                theme={theme}
                isActive={activeIndex === index}
                isPast={index < activeIndex}
                progress={getSegmentProgress(index)}
                onClick={() => handleThemeClick(index)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});
