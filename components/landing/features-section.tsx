"use client";

import { motion } from "motion/react";
import { useRef, useState } from "react";

import { EarthIcon, type EarthIconHandle } from "@/components/icons/earth";
import { MusicIcon, type MusicIconHandle } from "@/components/icons/music";
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

type IconHandle =
  | SettingsIconHandle
  | TimeIconHandle
  | SeekIconHandle
  | EarthIconHandle
  | MusicIconHandle
  | TranslationIconHandle;

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const iconRefs = useRef<(IconHandle | null)[]>([]);

  const features = [
    {
      icon: SettingsIcon,
      title: "Zero Config",
      description:
        "No configuration required. Just install the extension and enjoy the benefits.",
      gradient: "from-rose-300 to-red-300",
    },
    {
      icon: TimeIcon,
      title: "Time-synced Lyrics",
      description:
        "Get beautiful time-synced lyrics that follow along perfectly with your favorite songs.",
      gradient: "from-rose-300 to-red-300",
    },
    {
      icon: SeekIcon,
      title: "Seek",
      description:
        "Seamlessly seek through sections of the song by clicking on the lines of the lyrics.",
      gradient: "from-rose-300 to-red-300",
    },
    {
      icon: EarthIcon,
      title: "Multiple Languages",
      description:
        "Get gorgeous lyrics irrespective of the language of the song.",
      gradient: "from-rose-300 to-red-300",
    },
    {
      icon: MusicIcon,
      title: "Lightweight",
      description:
        "Better Lyrics is lightweight and won't slow down your browser.",
      gradient: "from-rose-300 to-red-300",
    },
    {
      icon: TranslationIcon,
      title: "Translations",
      description:
        "Get real-time translations for lyrics in languages you don't understand.",
      gradient: "from-rose-300 to-red-300",
    },
  ];

  return (
    <section
      className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-white to-gray-200 md:py-32"
      id="features"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-gray-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="container px-4 mx-auto md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600 md:text-xl">
            Everything you need to elevate your YouTube Music experience
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => {
                  setHoveredIndex(index);
                  iconRefs.current[index]?.startAnimation();
                }}
                onHoverEnd={() => {
                  setHoveredIndex(null);
                  iconRefs.current[index]?.stopAnimation();
                }}
                className="relative group"
              >
                <div
                  className={`
                  relative h-full p-8 transition-all duration-300 bg-gradient-to-b from-white to-gray-100 border-[0.5px] border-gray-300 hover:border-red-300/75 rounded-3xl overflow-hidden embossed-object
                  ${hoveredIndex === index ? "scale-[1.02] -translate-y-1" : ""}
                `}
                >
                  {/* Gradient background on hover */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: hoveredIndex === index ? 0.15 : 0,
                      clipPath:
                        hoveredIndex === index
                          ? "circle(150% at 25% 25%)"
                          : "circle(0% at 25% 25%)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 19,
                      mass: 1.2,
                    }}
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient}`}
                  />

                  {/* Icon */}
                  <div className="relative mb-6">
                    <IconComponent
                      ref={(el) => {
                        iconRefs.current[index] = el;
                      }}
                      size={40}
                      className="text-gray-800"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="mb-3 text-xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="leading-relaxed text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
