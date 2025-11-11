import { memo } from "react";
import { motion } from "motion/react";
import { ANIMATION_DURATION, FADE_IN_UP } from "@/constants/animations";
import { cn } from "@/utils/functions";

interface SectionHeaderProps {
  title: string;
  description: string;
  className?: string;
  descriptionClassName?: string;
}

/**
 * Reusable section header component with consistent animation
 */
export const SectionHeader = memo(function SectionHeader({
  title,
  description,
  className,
  descriptionClassName,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: ANIMATION_DURATION.normal }}
      variants={FADE_IN_UP}
      className={cn("space-y-2", className)}
    >
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
        {title}
      </h2>
      <p
        className={cn(
          "text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400",
          descriptionClassName
        )}
      >
        {description}
      </p>
    </motion.div>
  );
});
