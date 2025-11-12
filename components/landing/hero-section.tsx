import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { AnimatedText } from "../animated-text";
import { motion } from "motion/react";
import { StoreButton } from "@/components/shared/store-button";
import {
  FADE_IN_UP,
  HOVER_FADE_IN,
  SPRING_CONFIG,
} from "@/constants/animations";

const HeroVideo = memo(function HeroVideo() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCanPlay = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener("canplay", handleCanPlay);

    if (video.readyState >= 3) {
      setVideoLoaded(true);
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [handleCanPlay]);

  return (
    <motion.div
      className="relative overflow-hidden bg-black rounded-xl shadow-video lg:rounded-2xl"
      initial="idle"
      whileHover="hover"
    >
      <motion.p
        className="z-10 absolute px-3 pl-2 py-1.5 pb-2 text-xs text-gray-600 bg-gradient-to-b from-white to-gray-200 rounded-lg pointer-events-none select-none top-4 left-4 embossed-object-small"
        variants={HOVER_FADE_IN}
        transition={{ ...SPRING_CONFIG.bouncy, delay: 0.2 }}
      >
        <span className="flex items-center gap-1 font-medium text-gray-900">
          <img
            src="/logo.svg"
            alt="Better Lyrics Logo"
            className="mr-0.5 size-4"
          />
          EvenBetterLyrics+
          <span className="text-gray-500/75 text-[0.5rem]">✦</span> ⛶ Fullscreen
        </span>
      </motion.p>
      <motion.video
        ref={videoRef}
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={{
          opacity: videoLoaded ? 1 : 0,
          filter: videoLoaded ? "blur(0px)" : "blur(8px)",
        }}
        playsInline
        autoPlay
        muted
        loop
        preload="auto"
        className="object-cover w-full h-full"
      >
        {/* Mobile - Low-res WebM */}
        <source
          src="/hero-bg-alt.webm"
          type="video/webm"
          media="(max-width: 768px)"
        />
        {/* Mobile - Low-res MP4 fallback */}
        <source
          src="/hero-bg-alt.mp4"
          type="video/mp4"
          media="(max-width: 768px)"
        />
        {/* Desktop - High-res WebM */}
        <source src="/hero-bg.webm" type="video/webm" />
        {/* Desktop - High-res MP4 fallback */}
        <source src="/hero-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>
    </motion.div>
  );
});

export function HeroSection() {
  return (
    <section className="w-full grid place-items-center hero-bg min-h-[calc(100vh_-_6.5rem)] relative py-12 lg:py-0">
      <div className="container px-4 md:px-6">
        <div className="grid gap-28 lg:-mt-4 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center flex-shrink-0 space-y-4">
            <div className="space-y-6 max-w-[600px] text-center sm:text-left">
              <AnimatedText
                text="Elevate Your Lyrical Experience"
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                hiddenX={-8}
                hiddenBlur="blur(2px)"
              />
              <AnimatedText
                text="Better Lyrics is the ultimate extension to step up your Youtube Music experience. Get beautiful time-synced lyrics, real-time translations, and more."
                className="text-gray-500 md:text-xl dark:text-gray-400"
                delayChildren={0.45}
                staggerChildren={0}
                hiddenX={0}
                hiddenY={-8}
                hiddenBlur="blur(4px)"
              />
            </div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={FADE_IN_UP}
              className="flex flex-col items-end gap-2 pt-4 sm:flex-row"
            >
              <StoreButton
                href="https://chromewebstore.google.com/detail/better-lyrics/effdbpeggelllpfkjppbokhmmiinhlmg"
                imgSrc="/cws.png"
                alt="Chrome Web Store"
                eventName="chrome-btn"
                delay={0.9}
                imgClassName="mt-1 h-10"
              />
              <StoreButton
                href="https://addons.mozilla.org/en-US/firefox/addon/better-lyrics/"
                imgSrc="/ff.svg"
                alt="Firefox Add-On Store"
                bgColor="bg-[#0E9AD6]"
                eventName="firefox-btn"
                delay={1}
                className="px-10"
                imgClassName="mt-1"
              />
            </motion.div>
          </div>
          <HeroVideo />
        </div>
      </div>
    </section>
  );
}
