"use client";

import { useRef, useState, useCallback } from "react";

import { ThemeIcon, type ThemeIconHandle } from "@/components/icons/theme";
import {
  FeatherIcon,
  type FeatherIconHandle,
} from "@/components/icons/feather";
import { SeekIcon, type SeekIconHandle } from "@/components/icons/seek";
import {
  SettingsIcon,
  type SettingsIconHandle,
} from "@/components/icons/settings";
import { TimeIcon, type TimeIconHandle } from "@/components/icons/time";
import {
  TranslationIcon,
  type TranslationIconHandle,
} from "@/components/icons/translation";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimatedGridItem } from "@/components/shared/animated-grid-item";
import { NoiseOverlay } from "@/components/shared/noise-overlay";
import type { Feature } from "@/types/landing";

type IconHandle =
  | SettingsIconHandle
  | TimeIconHandle
  | SeekIconHandle
  | FeatherIconHandle
  | TranslationIconHandle
  | ThemeIconHandle;

const features: Feature[] = [
  {
    id: "zero-config",
    icon: SettingsIcon,
    title: "Zero Setup Required",
    description:
      "Better Lyrics works out of the box. Smart defaults, fully customizable.",
  },
  {
    id: "time-synced",
    icon: TimeIcon,
    title: "Time-synced Lyrics",
    description:
      "Beautiful synced lyrics that follow along perfectly with your favorite songs.",
  },
  {
    id: "seek",
    icon: SeekIcon,
    title: "Seek",
    description:
      "Jump to any section by clicking lyrics. Navigate songs seamlessly.",
  },
  {
    id: "lightweight",
    icon: FeatherIcon,
    title: "Lightweight",
    description:
      "Lightweight and fast. Better Lyrics runs smoothly without impacting performance.",
  },
  {
    id: "translations",
    icon: TranslationIcon,
    title: "Languages & Translations",
    description:
      "Gorgeous lyrics in any language. Translations & transliterations as needed.",
  },
  {
    id: "theme",
    icon: ThemeIcon,
    title: "Themes",
    description:
      "Make YouTube Music yours. Choose from built-in themes or customize everything.",
  },
];

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const iconRefs = useRef<(IconHandle | null)[]>([]);

  const handleHoverStart = useCallback((index: number) => {
    setHoveredIndex(index);
    iconRefs.current[index]?.startAnimation();
  }, []);

  const handleHoverEnd = useCallback((index: number) => {
    setHoveredIndex(null);
    iconRefs.current[index]?.stopAnimation();
  }, []);

  return (
    <section
      className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-white to-gray-200 md:py-32"
      id="features"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-gray-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="container px-4 mx-auto md:px-6">
        {/* Header */}
        <SectionHeader
          title="Powerful Features"
          description="Everything you need to elevate your YouTube Music experience"
          className="max-w-3xl mx-auto mb-16 text-center"
          descriptionClassName="text-lg md:text-xl"
        />

        {/* Features Grid */}
        <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <AnimatedGridItem
                key={feature.id}
                index={index}
                isHovered={hoveredIndex === index}
                onHoverStart={() => handleHoverStart(index)}
                onHoverEnd={() => handleHoverEnd(index)}
                clipPathOrigin="25% 25%"
                className="p-8"
              >
                <NoiseOverlay gradientDirection="vertical" />

                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <IconComponent
                    ref={(el: IconHandle | null) => {
                      iconRefs.current[index] = el;
                    }}
                    size={40}
                    className="text-gray-700"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </AnimatedGridItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}
