/**
 * Animation duration constants for consistent timing across the app
 */
export const ANIMATION_DURATION = {
  veryFast: 0.15,
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.5,
} as const;

/**
 * Stagger delay for list animations
 */
export const STAGGER_DELAY = 0.1;

/**
 * Spring animation configuration presets
 */
export const SPRING_CONFIG = {
  default: {
    type: "spring" as const,
    stiffness: 150,
    damping: 19,
    mass: 1.2,
  },
  gentle: {
    type: "spring" as const,
    stiffness: 50,
    damping: 10,
  },
  snappy: {
    type: "spring" as const,
    stiffness: 320,
    damping: 20,
    mass: 0.4,
  },
  bouncy: {
    type: "spring",
    stiffness: 800,
    damping: 38,
    mass: 1.25,
  },
} as const;

/**
 * Common animation variants
 */
export const FADE_IN_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
} as const;

export const FADE_IN_UP_LIGHT = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4, transition: { duration: 0.15 } },
} as const;

export const HOVER_FADE_IN = {
  idle: { y: -64, opacity: 0 },
  hover: { y: 0, opacity: 1 },
};

export const FADE_IN = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
} as const;
