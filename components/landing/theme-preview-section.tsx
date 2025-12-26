"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
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

const SHADERS_CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/better-lyrics-shaders/mffpncjphfmkppebdoaehdlnagnlpfai";

interface ShadersPromoProps {
  isVisible: boolean;
}

const ShadersPromo = memo(function ShadersPromo({
  isVisible,
}: ShadersPromoProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldAnimate = isVisible && isInView;

  return (
    <motion.a
      ref={ref}
      href={SHADERS_CHROME_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{ pointerEvents: shouldAnimate ? "auto" : "none" }}
      initial={{ opacity: 0 }}
      animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay: shouldAnimate ? 0.3 : 0 }}
      className="absolute flex-col items-end hidden w-full mr-16 top-4 max-w-48 text-pretty right-full xl:flex group/promo"
    >
      <div className="w-[50px] h-[40px] flex-shrink-0 mb-4">
        <svg
          width="50"
          height="40"
          viewBox="0 0 149 122"
          fill="none"
          className="text-gray-400/40 duration-500 translate-x-6 -rotate-[20deg] group-hover/promo:text-gray-400 transition-colors"
        >
          <defs>
            <clipPath id="arrow-reveal">
              <motion.rect
                x="0"
                y="0"
                width="149"
                height="122"
                initial={{ x: -149 }}
                animate={shouldAnimate ? { x: 0 } : { x: -149 }}
                transition={{ duration: 0.75, delay: 0.4, ease: "easeOut" }}
              />
            </clipPath>
          </defs>
          <path
            clipPath="url(#arrow-reveal)"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M137.863 0.579489C137.792 0.790681 137.722 1.35386 137.722 1.84664C137.722 2.33943 137.558 4.1463 137.346 5.88277C136.877 9.8485 137.041 15.8792 137.722 19.3287C137.98 20.6193 138.191 21.7222 138.191 21.7926C138.168 21.9804 137.182 20.7601 134.86 17.733C131.763 13.65 130.355 12.0778 127.54 9.59038C119.399 2.38636 111.869 -0.523407 104.408 0.696818C100.584 1.30693 94.9773 3.77085 91.4113 6.37556C83.6695 12.0778 77.734 22.9659 76.4672 33.8072C76.1856 36.1537 76.3029 43.0762 76.6548 46.2675L76.7956 47.6286L75.4115 46.995C68.2795 43.7332 64.6432 42.3722 59.482 41.0346C53.9688 39.6032 48.7372 39.087 43.529 39.439C25.3239 40.6592 10.0982 57.4842 3.55276 83.6252C2.49705 87.896 0.854832 96.0386 0.362167 99.5585C-0.623162 106.434 0.479469 115.609 2.73165 119.246C3.5293 120.514 4.46771 121.523 4.86653 121.523C5.33574 121.523 5.2419 121.077 4.32695 119.246C2.96625 116.477 2.49705 113.755 2.49705 108.499C2.47359 103.454 2.56743 102.891 4.37387 95.0061C7.16564 82.8743 9.32398 76.4916 13.3591 68.5601C16.5497 62.2713 19.5292 58.0709 23.7989 53.8235C29.0775 48.5672 34.661 45.4932 40.8545 44.4137C44.1155 43.8505 50.7078 44.0852 54.5788 44.883C60.655 46.1737 64.9717 47.7459 73.1827 51.7116C78.3674 54.2225 79.4701 54.5041 80.8073 53.6124C82.4495 52.5564 82.6372 51.1954 81.9803 45.6809C81.7692 43.9444 81.5815 40.5419 81.5815 37.9841C81.558 34.0653 81.6284 33.0797 82.0742 31.0382C83.4114 24.8432 86.0624 19.4226 90.0272 14.7294C93.7808 10.2709 99.9509 6.77447 105.37 6.04703C109.499 5.48385 114.168 6.98567 119.024 10.4821C121.769 12.4298 126.766 17.4514 129.088 20.6193L131.083 23.3179L130.215 23.4822C129.745 23.5526 127.235 23.7638 124.678 23.9046C119.306 24.2096 118.555 24.3739 117.429 25.336C115.575 26.9786 115.904 29.9822 118.086 31.0147C119.212 31.5544 123.012 32.0472 127.282 32.2349C129.229 32.3053 133.945 32.5869 137.769 32.8685C145.511 33.4317 145.98 33.3848 147.458 32.0941C149.288 30.475 149.194 28.4569 147.059 23.5291C146.214 21.5814 145.112 18.7421 144.643 17.1933C142.602 10.5994 139.974 2.59755 139.458 1.44773C138.895 0.180568 138.168 -0.218351 137.863 0.579489Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="text-right">
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
          transition={{ duration: 0.3, delay: shouldAnimate ? 0.8 : 0 }}
          className="text-sm font-medium transition-colors duration-500 text-gray-600/40 group-hover/promo:text-gray-800"
        >
          Loving the background?
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
          transition={{ duration: 0.3, delay: shouldAnimate ? 1.0 : 0 }}
          className="mt-1 text-xs leading-relaxed transition-colors duration-500 text-gray-500/40 group-hover/promo:text-gray-500"
        >
          All these themes use{" "}
          <span className="font-medium underline transition-colors duration-500 text-gray-600/40 decoration-gray-400/40 group-hover/promo:text-gray-600 group-hover/promo:decoration-gray-400 underline-offset-2">
            Better Lyrics Shaders
          </span>{" "}
          for gorgeous dynamic visuals. Give it a try!
        </motion.p>
      </div>
    </motion.a>
  );
});

const SONG_URL = "https://music.youtube.com/watch?v=5CYMK6aqX88";

const SongPromo = memo(function SongPromo({ isVisible }: ShadersPromoProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldAnimate = isVisible && isInView;

  return (
    <motion.a
      ref={ref}
      href={SONG_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{ pointerEvents: shouldAnimate ? "auto" : "none" }}
      initial={{ opacity: 0 }}
      animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay: shouldAnimate ? 0.5 : 0 }}
      className="absolute flex-col items-start hidden w-full ml-10 top-16 max-w-56 text-pretty left-full xl:flex group/song"
    >
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={{ duration: 0.3, delay: shouldAnimate ? 0.9 : 0 }}
        className="relative inline-block"
      >
        <span className="flex items-center gap-1 text-sm font-medium transition-colors duration-500 text-gray-600/40 group-hover/song:text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M10 21q-1.65 0-2.825-1.175T6 17t1.175-2.825T10 13q.575 0 1.063.138t.937.412V4q0-.425.288-.712T13 3h4q.425 0 .713.288T18 4v2q0 .425-.288.713T17 7h-3v10q0 1.65-1.175 2.825T10 21"
            />
          </svg>
          Flocky Flocky・Don Toliver
        </span>
        <svg
          viewBox="0 0 340 38"
          fill="none"
          className="absolute left-0 w-full h-[5px] -bottom-1.5 text-gray-400/30 transition-colors duration-500 group-hover/song:text-gray-400"
          preserveAspectRatio="none"
        >
          <defs>
            <clipPath id="underline-reveal">
              <motion.rect
                x="0"
                y="0"
                width="340"
                height="38"
                initial={{ x: -340 }}
                animate={shouldAnimate ? { x: 0 } : { x: -340 }}
                transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
              />
            </clipPath>
          </defs>
          <path
            clipPath="url(#underline-reveal)"
            d="M42.7009 9.74074C48.056 9.50278 52.3488 11.7633 54.89 16.5522C56.8138 20.2107 58.9817 20.8354 62.571 19.4969C71.7882 16.0614 81.0485 12.7449 90.3662 9.65151C96.1377 7.733 101.306 8.75916 105.542 13.8603C106.561 15.0798 109.045 15.8829 110.61 15.5558C118.649 13.8603 126.618 11.7187 134.615 9.75558C143.602 7.5545 152.561 5.16013 161.62 3.28624C167.205 2.12621 172.488 4.40163 175.92 8.65506C180.916 14.827 187.032 14.5295 193.206 13.1018C204.849 10.4248 216.292 6.88529 227.906 4.07446C233.85 2.64673 239.966 1.59077 246.054 1.24872C248.839 1.08512 252.084 2.51285 254.51 4.17853C259.65 7.68835 265.335 7.43552 270.748 6.82577C285.751 5.13034 300.754 3.21187 315.585 0.401038C323.725 -1.14566 330.344 2.08155 337.221 4.96675C338.585 5.54676 340.365 8.68481 339.934 9.54739C338.915 11.5849 336.905 13.5629 334.838 14.4255C333.086 15.1691 330.502 14.8419 328.635 14.0983C318.944 10.2166 309.555 13.8454 300.079 14.9906C288.421 16.3886 276.821 18.2922 265.149 19.3779C261.631 19.705 257.224 19.125 254.496 17.1024C247.03 11.57 239.493 13.3993 231.812 15.288C219.536 18.3071 207.319 21.5343 195.072 24.6575C184.979 27.2304 176.121 25.3713 168.483 17.4891C166.846 15.7937 163.199 14.827 160.902 15.3921C149.833 18.0542 138.893 21.3261 127.91 24.4195C120.516 26.4868 113.266 29.8776 105.369 26.7842C104.393 26.3975 103.201 26.2191 102.484 25.5349C94.7881 18.1584 87.2794 22.1738 79.6415 25.6837C74.3581 28.1078 69.046 30.532 63.5473 32.3017C56.6415 34.5326 51.3869 31.7664 46.3188 24.2262C44.5386 21.5641 42.9736 20.4784 39.9012 21.1179C30.8994 22.9621 23.1035 27.3493 16.0829 33.2238C9.72277 38.5629 4.85571 39.6188 0.807033 35.41C-0.111816 34.4582 -0.298432 31.0376 0.519919 30.2643C10.1822 21.0287 28.4443 10.5141 42.7296 9.75558L42.7009 9.74074Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>
    </motion.a>
  );
});

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
          "relative h-2 w-24 md:w-full rounded-full md:rounded-[2px] overflow-hidden transition-colors duration-300 group-hover:bg-gray-400/35",
          index === 0 && "md:rounded-[8px_4px_4px_8px]",
          index === themes.length - 1 && "md:rounded-[4px_8px_8px_4px]",
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

        <div className="relative max-w-3xl mx-auto group">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: ANIMATION_DURATION.normal }}
            className="relative overflow-hidden bg-black rounded-2xl squircle shadow-video aspect-video"
          >
            <div className="absolute z-[100] bottom-4 left-4 justify-end items-end hidden gap-1 text-xs text-gray-100/75 opacity-0 duration-400 translate-y-4 group-hover:delay-200 group-hover:translate-y-0 group-hover:opacity-100 transition-all md:flex">
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
                  autoPlay
                  muted
                  loop
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
                >
                  <source
                    src={`/videos/themes/${theme.id}.webm`}
                    type="video/webm"
                  />
                  <source
                    src={`/videos/themes/${theme.id}.mp4`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </motion.video>
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

          <ShadersPromo isVisible={isLoaded} />
          <SongPromo isVisible={isLoaded} />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{
              staggerChildren: STAGGER_DELAY,
              delayChildren: 0.75,
            }}
            className="flex flex-wrap justify-between gap-2 mt-12 gap-y-4 md:flex-nowrap scrollbar-hide md:gap-1 md:gap-y-1"
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
