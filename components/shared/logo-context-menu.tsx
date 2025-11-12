"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/utils/functions";
import {
  FADE_IN_UP,
  ANIMATION_DURATION,
  FADE_IN_UP_LIGHT,
  SPRING_CONFIG,
} from "@/constants/animations";

interface Position {
  x: number;
  y: number;
}

interface LogoContextMenuProps {
  children: React.ReactNode;
  svgPath: string;
}

export function LogoContextMenu({ children, svgPath }: LogoContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [copiedFeedback, setCopiedFeedback] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setCopiedFeedback(false);
  }, []);

  const handleDownload = useCallback(async () => {
    try {
      const response = await fetch(svgPath);
      const svgText = await response.text();
      const blob = new Blob([svgText], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "better-lyrics-logo.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      handleClose();
    } catch (error) {
      console.error("Failed to download SVG:", error);
    }
  }, [svgPath, handleClose]);

  const handleCopy = useCallback(async () => {
    try {
      const response = await fetch(svgPath);
      const svgText = await response.text();
      await navigator.clipboard.writeText(svgText);
      setCopiedFeedback(true);
      setTimeout(handleClose, 3000);
    } catch (error) {
      console.error("Failed to copy SVG:", error);
    }
  }, [svgPath, handleClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };

    const handleScroll = () => {
      handleClose();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", handleScroll);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isOpen, handleClose]);

  return (
    <>
      <div ref={containerRef} onContextMenu={handleContextMenu}>
        {children}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: ANIMATION_DURATION.veryFast }}
            className="fixed z-[100] min-w-32 rounded-lg border-[0.75px] sm:border-[0.5px] border-gray-200 bg-white backdrop-blur-md shadow-lg origin-top-left"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
            }}
          >
            <div className="p-1">
              <button
                onClick={handleDownload}
                className={cn(
                  "w-full flex items-center gap-2 px-2 py-2 text-xs font-medium text-gray-600 rounded-t-md rounded-b-sm transition-colors",
                  "hover:bg-gray-100 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950",
                  "disabled:pointer-events-none disabled:opacity-50"
                )}
              >
                <DownloadIcon className="size-3" />
                Download logo as SVG
              </button>
              <button
                onClick={handleCopy}
                className={cn(
                  "w-full flex items-center gap-2 px-2 py-2 text-xs font-medium text-gray-600 rounded-b-md rounded-t-sm transition-colors overflow-hidden",
                  "hover:bg-gray-100 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950",
                  "disabled:pointer-events-none disabled:opacity-50"
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copiedFeedback ? (
                    <motion.span
                      variants={FADE_IN_UP_LIGHT}
                      transition={SPRING_CONFIG.snappy}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="inline-flex items-center gap-2"
                      key="copied"
                    >
                      <CheckIcon className="text-green-600 size-3" />
                      <span className="text-green-600"> Copied!</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      variants={FADE_IN_UP_LIGHT}
                      transition={SPRING_CONFIG.snappy}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="inline-flex items-center gap-2"
                      key="copy"
                    >
                      <CopyIcon className="size-3" />
                      Copy logo as SVG
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <g fill="none">
        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
        <path
          fill="currentColor"
          d="M20 15a1 1 0 0 1 1 1v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a1 1 0 1 1 2 0v4h14v-4a1 1 0 0 1 1-1M12 2a1 1 0 0 1 1 1v10.243l2.536-2.536a1 1 0 1 1 1.414 1.414l-4.066 4.066a1.25 1.25 0 0 1-1.768 0L7.05 12.121a1 1 0 1 1 1.414-1.414L11 13.243V3a1 1 0 0 1 1-1"
        />
      </g>
    </svg>
  );
}
function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <g fill="none" fillRule="evenodd">
        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
        <path
          fill="currentColor"
          d="M9 2a2 2 0 0 0-2 2v1a1 1 0 0 0 2 0V4h1a1 1 0 1 0 0-2zm5 0a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2zm5 0a1 1 0 1 0 0 2h1v1a1 1 0 1 0 2 0V4a2 2 0 0 0-2-2zm3 7a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0zm0 5a1 1 0 1 0-2 0v1h-1a1 1 0 1 0 0 2h1a2 2 0 0 0 2-2zM4 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm0 2h11v11H4z"
        />
      </g>
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <g fill="none" fillRule="evenodd">
        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
        <path
          fill="currentColor"
          d="M21.546 5.111a1.5 1.5 0 0 1 0 2.121L10.303 18.475a1.6 1.6 0 0 1-2.263 0L2.454 12.89a1.5 1.5 0 1 1 2.121-2.121l4.596 4.596L19.424 5.111a1.5 1.5 0 0 1 2.122 0"
        />
      </g>
    </svg>
  );
}
