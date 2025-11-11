"use client";

import type { Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { motion } from "motion/react";

import { cn } from "@/utils/functions";
import {
  useAnimatedIcon,
  type AnimatedIconHandle,
} from "@/hooks/useAnimatedIcon";

export type SeekIconHandle = AnimatedIconHandle;

interface SeekIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const dashVariants: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, 1, 0],
    transition: {
      duration: 0.4,
    },
  },
};

const arrowVariants: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, 3, 0],
    transition: {
      duration: 0.4,
    },
  },
};

const SeekIcon = forwardRef<SeekIconHandle, SeekIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const { controls, handleMouseEnter, handleMouseLeave, getImperativeHandle } =
      useAnimatedIcon({ onMouseEnter, onMouseLeave });

    useImperativeHandle(ref, getImperativeHandle, [getImperativeHandle]);

  return (
    <div
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path d="M5 9v6" variants={dashVariants} animate={controls} />
        <motion.path
          d="M9 9h3V5l7 7-7 7v-4H9V9z"
          variants={arrowVariants}
          animate={controls}
        />
      </svg>
    </div>
  );
});

SeekIcon.displayName = "SeekIcon";

export { SeekIcon };
