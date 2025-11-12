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

export type FeatherIconHandle = AnimatedIconHandle;

interface FeatherIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const featherVariants: Variants = {
  normal: {
    rotate: 45,
    y: 0,
    x: 4,
  },
  animate: {
    rotate: [45, 45 - 8, 45 + 5, 45 - 3, 45],
    y: [0, -6, -3, -1, 0],
    x: [4, 4 + 2, 4 - 2, 4 + 1, 4],
    transition: {
      duration: 1.6,
      ease: "easeInOut",
    },
  },
};

const FeatherIcon = forwardRef<FeatherIconHandle, FeatherIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const {
      controls,
      handleMouseEnter,
      handleMouseLeave,
      getImperativeHandle,
    } = useAnimatedIcon({ onMouseEnter, onMouseLeave });

    useImperativeHandle(ref, getImperativeHandle, [getImperativeHandle]);

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={featherVariants}
          animate={controls}
          initial="normal"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1zM16 8L2 22m15.5-7H9"
          />
        </motion.svg>
      </div>
    );
  }
);

FeatherIcon.displayName = "FeatherIcon";

export { FeatherIcon };
