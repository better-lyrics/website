import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { AnimatedText } from "../animated-text";
import { motion } from "motion/react";

export function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
    };

    video.addEventListener("canplay", handleCanPlay);

    if (video.readyState >= 3) {
      setVideoLoaded(true);
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  return (
    <section className="w-full grid place-items-center hero-bg lg:min-h-[calc(100vh_-_6.5rem)] relative py-12 lg:py-0">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:-mt-4 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center flex-shrink-0 space-y-4">
            <div className="space-y-6 max-w-[600px]">
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
              initial={{
                opacity: 0,
                y: 8,
                scale: 1.025,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                delay: 0.9,
              }}
              className="flex flex-col pt-4 gap-2 min-[400px]:flex-row"
            >
              <Link
                className="h-12 px-4 overflow-hidden transition-all bg-white border rounded-md shadow-md border-black/15 hover:border-black/20 hover:shadow-lg"
                href="https://chromewebstore.google.com/detail/better-lyrics/effdbpeggelllpfkjppbokhmmiinhlmg"
                target="_blank"
                data-umami-event="chrome-btn"
              >
                <img
                  src="/cws.png"
                  alt="Chrome Web Store"
                  className="h-full mx-auto"
                />
              </Link>
              <Link
                className="h-12 overflow-hidden px-10 py-1 bg-[#0E9AD6] border border-black/5 rounded-md shadow-md hover:border-black/20 hover:shadow-lg transition-all"
                href="https://addons.mozilla.org/en-US/firefox/addon/better-lyrics/"
                target="_blank"
                data-umami-event="firefox-btn"
              >
                <img
                  src="/ff.svg"
                  alt="Firefox Add-On Store"
                  className="h-full mx-auto"
                />
              </Link>
            </motion.div>
          </div>
          <div className="overflow-hidden bg-black rounded-md shadow-2xl lg:border-4 lg:border-white/20 lg:rounded-2xl">
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
          </div>
        </div>
      </div>
    </section>
  );
}
