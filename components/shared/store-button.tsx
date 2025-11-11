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
}

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
}: StoreButtonProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={FADE_IN_UP}
      transition={{ delay }}
    >
      <Link
        className={cn(
          "flex items-center h-12 px-4 overflow-hidden transition-[border-color,box-shadow] border rounded-md shadow-md border-black/15 hover:border-black/20 hover:shadow-lg",
          bgColor,
          className
        )}
        href={href}
        target="_blank"
        data-umami-event={eventName}
      >
        <img src={imgSrc} alt={alt} className="h-full mx-auto" />
      </Link>
    </motion.div>
  );
});
