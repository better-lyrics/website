import { memo } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { FADE_IN_UP } from "@/constants/animations";
import { cn } from "@/utils/functions";

interface StoreButtonProps {
  href: string;
  imgSrc: string;
  alt: string;
  bgColor?: string;
  delay?: number;
  eventName: string;
  className?: string;
  imgClassName?: string;
}

const MotionLink = motion.create(Link);

/**
 * Reusable store button component for Chrome/Firefox download links
 */
export const StoreButton = memo(function StoreButton({
  href,
  imgSrc,
  alt,
  bgColor = "bg-white",
  delay = 0,
  eventName,
  className,
  imgClassName,
}: StoreButtonProps) {
  return (
    <MotionLink
      data-state="neutral"
      className={cn(
        "flex w-full sm:w-auto items-center h-12 sm:active:h-[46px] px-4 justify-center overflow-hidden pb-1 group transition-[border-color,box-shadow,height] border rounded-xl squircle embossed-object shadow-md border-black/15 hover:border-black/20 hover:shadow-lg",
        bgColor,
        className
      )}
      href={href}
      target="_blank"
      data-umami-event={eventName}
      initial="hidden"
      animate="visible"
      variants={FADE_IN_UP}
      transition={{ delay }}
    >
      <img
        src={imgSrc}
        alt={alt}
        className={cn(
          "h-8 mx-auto -translate-y-0.5 group-active:translate-y-0 pointer-events-none select-none transition-transform",
          imgClassName
        )}
      />
    </MotionLink>
  );
});
