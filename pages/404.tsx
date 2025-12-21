"use client";

import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { type TStatus } from "@/utils/functions";
import { Header } from "@/components/landing/header";
import Kawarp from "@kawarp/react";

function AnimatedWord({
  word,
  isHovered,
}: {
  word: { default: string; hover: string };
  isHovered: boolean;
}) {
  return (
    <span className="relative inline-block">
      <span className="invisible">{word.hover}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={isHovered ? "hover" : "default"}
          initial={{ opacity: 0, y: 48, scale: 0.9, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -24, scale: 0.9, filter: "blur(8px)" }}
          className="absolute inset-0 flex items-start"
        >
          {isHovered ? word.hover : word.default}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function NotFound() {
  const [status, setStatus] = React.useState<TStatus>("operational");
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const statusResponse = await fetch("/api/status");
      const { status } = await statusResponse.json();
      setStatus(status);
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Page Not Found - Better Lyrics</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist."
        />
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <div className="relative z-10 flex flex-col min-h-screen overflow-y-hidden">
        <Header status={status} />
        <main className="flex flex-col items-center justify-center flex-1 gap-8 px-6 md:px-14 pt-14">
          <p
            className="text-5xl font-bold tracking-tight text-center cursor-default md:text-7xl"
            style={{
              color: "color(display-p3 1 1 1 / 1)",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            No{" "}
            <AnimatedWord
              word={{ default: "page", hover: "lyrics" }}
              isHovered={isHovered}
            />{" "}
            found for this{" "}
            <AnimatedWord
              word={{ default: "URL", hover: "song" }}
              isHovered={isHovered}
            />
          </p>
          <div className="flex items-end h-12 gap-6">
            <Link
              href="/"
              data-state="neutral"
              className="group flex items-center justify-center h-12 px-6 pb-1 font-medium text-gray-800 transition-[border-color,box-shadow,height] bg-white border rounded-xl squircle embossed-object shadow-lg border-black/15 hover:border-black/20 hover:shadow-2xl active:h-[46px]"
            >
              <span className="transition-transform -translate-y-px group-active:translate-y-px">
                Go Home
              </span>
            </Link>
            <Link
              href="https://discord.gg/UsHE3d5fWF"
              data-state="neutral"
              className="group flex items-center justify-center h-12 px-6 pb-1 font-medium text-white transition-[border-color,box-shadow,height] bg-[#5865F2] border rounded-xl squircle embossed-object-dark shadow-lg border-black/15 hover:border-black/20 hover:shadow-2xl active:h-[46px]"
            >
              <span className="transition-transform -translate-y-px group-active:translate-y-px">
                Join Discord
              </span>
            </Link>
          </div>
        </main>
      </div>
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10 font-black select-none pointer-events-none text-center cursor-default text-[50vw] leading-none tracking-tighter z-[1] mix-blend-overlay">
        404
      </p>
      <div className="fixed inset-0">
        <Kawarp
          src="/textures/art.jpg"
          blurPasses={8}
          animationSpeed={4}
          saturation={2}
          warpIntensity={1}
          dithering={0.1}
          transitionDuration={0}
          className="w-full h-full"
        />
      </div>
    </>
  );
}
