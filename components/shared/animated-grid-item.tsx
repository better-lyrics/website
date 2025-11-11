import { memo, ReactNode, useState } from "react";
import { motion } from "motion/react";
import {
  ANIMATION_DURATION,
  STAGGER_DELAY,
  SPRING_CONFIG,
} from "@/constants/animations";
import { cn } from "@/utils/functions";

interface AnimatedGridItemProps {
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onTap?: () => void;
  gradient?: string;
  clipPathOrigin?: string;
  className?: string;
  children: ReactNode;
  renderGradientInside?: boolean;
}

/**
 * Reusable animated grid item component with hover effects
 * Used for features and testimonials sections
 */
export const AnimatedGridItem = memo(function AnimatedGridItem({
  index,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onTap,
  gradient = "from-rose-300 to-red-300",
  clipPathOrigin = "25% 25%",
  className,
  children,
  renderGradientInside = false,
}: AnimatedGridItemProps) {
  const [isTapped, setIsTapped] = useState(false);
  const isActive = isHovered || isTapped;

  const handleTap = () => {
    setIsTapped(!isTapped);
    onTap?.();
  };

  const gradientElement = (
    <motion.div
      initial={false}
      animate={{
        opacity: isActive ? 0.15 : 0,
        clipPath: isActive
          ? `circle(150% at ${clipPathOrigin})`
          : `circle(0% at ${clipPathOrigin})`,
      }}
      transition={SPRING_CONFIG.default}
      className={cn(
        "absolute inset-0 rounded-3xl bg-gradient-to-br pointer-events-none !mt-0 z-0",
        gradient
      )}
    />
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: ANIMATION_DURATION.normal,
        delay: index * STAGGER_DELAY,
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onTap={handleTap}
      className="relative group"
    >
      <div
        className={cn(
          "relative h-full transition-[transform,border-color,box-shadow] duration-300 bg-gradient-to-b from-white to-gray-100 border-[0.5px] border-gray-300 hover:border-red-300/75 rounded-3xl overflow-hidden embossed-object",
          isActive && "scale-[1.02] -translate-y-1 border-red-300/75",
          className
        )}
      >
        {/* Gradient background on hover */}
        {!renderGradientInside && gradientElement}

        {/* Content */}
        {children}

        {/* Gradient after content if renderGradientInside is true */}
        {renderGradientInside && gradientElement}
      </div>
    </motion.div>
  );
});
