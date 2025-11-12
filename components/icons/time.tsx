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

export type TimeIconHandle = AnimatedIconHandle;

interface TimeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const handVariants: Variants = {
  normal: {
    rotate: 0,
    originX: "0%",
    originY: "100%",
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  animate: {
    rotate: 300,
    originX: "0%",
    originY: "100%",
    transition: {
      delay: 0.1,
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const buttonVariants: Variants = {
  normal: {
    scale: 1,
    y: 0,
  },
  animate: {
    scale: [0.9, 1],
    y: [0, 1, 0],
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const TimeIcon = forwardRef<TimeIconHandle, TimeIconProps>(
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
          <motion.line
            x1="10"
            x2="14"
            y1="2"
            y2="2"
            animate={controls}
            variants={buttonVariants}
          />
          <motion.line
            x1="12"
            x2="15"
            y1="14"
            y2="11"
            initial="normal"
            animate={controls}
            variants={handVariants}
          />
          <circle cx="12" cy="14" r="8" />
        </svg>
      </div>
    );
  }
);

TimeIcon.displayName = "TimeIcon";

export { TimeIcon };
