import type { ComponentType } from "react";

/**
 * Props for animated icon components
 */
export interface IconProps {
  size?: number;
  className?: string;
}

/**
 * Feature item for the features section
 */
export interface Feature {
  id: string;
  icon: ComponentType<IconProps & { ref?: any }>;
  title: string;
  description: string;
}

/**
 * Testimonial item for the testimonials section
 */
export interface Testimonial {
  id: string;
  avatar: string;
  name: string;
  fallback: string;
  quote: string;
}

/**
 * Store platform for download buttons
 */
export type StorePlatform = "chrome" | "firefox";

/**
 * Store button configuration
 */
export interface StoreButtonConfig {
  platform: StorePlatform;
  href: string;
  imgSrc: string;
  alt: string;
  bgColor?: string;
  eventName: string;
}
