import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card } from "../ui/card";
import { useState, useCallback } from "react";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimatedGridItem } from "@/components/shared/animated-grid-item";
import { NoiseOverlay } from "@/components/shared/noise-overlay";
import type { Testimonial } from "@/types/landing";

const testimonials: Testimonial[] = [
  {
    id: "mistermew151",
    avatar:
      "https://styles.redditmedia.com/t5_4245r2/styles/profileIcon_thorr38dpvj91.jpg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=47712e9bb5030c41b249691a1194b0d84ee1898e",
    name: "MisterMew151",
    fallback: "JD",
    quote:
      "Love this! 10/10 works even better than I expected. I've wanted this for ages!",
  },
  {
    id: "nethercookiez",
    avatar:
      "https://i.redd.it/snoovatar/avatars/a71b88a3-9086-40a9-b926-8e16bac43bd5.png",
    name: "NetherCookiez",
    fallback: "NC",
    quote:
      "This is really great! Love the little animation where the lyrics get bigger. Already works as well (or even better) than YTM's lyrics.",
  },
  {
    id: "kevin-patel",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjVrYLipC28NxGa2S190dbX1DvUEnJbt7TUT64u4VFx9pYqG5ovj4A=s96-w96-h96",
    name: "Kevin Patel",
    fallback: "KP",
    quote:
      "A much needed extension for YouTube Music. It just works!!! Highly recommended.",
  },
  {
    id: "just-people",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjU8KdSsvcWrRkc76vHBLNQV7u-rfopdygy0yKmpCdAIefBmv90=s96-w96-h96",
    name: "Just People",
    fallback: "JP",
    quote:
      "i love this extension, i can singing japanese song without worry about kanji and hiragana, and synchronize lyrics make this better and also can translate lyrics, loveee ittt thanks dev, for making this extension",
  },
  {
    id: "param-bedi",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjVGaRVEG3vDgT6z0UE7jMigdZeEnPf18qLwJEEeywAGPtiIdjtFyA=s96-w96-h96",
    name: "Param Bedi",
    fallback: "PB",
    quote:
      "God, I was thinking of writing an extension because I am sick of youtube being a d**k and not writing a simple piece of code that makes lyrics appear the way spotify does. You Sir, just saved me a lots of trouble of figuring out how to do the same. 1 search and bang there was your extension. AND I LOVE IT!!!!",
  },
  {
    id: "johnathon-deal",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjUrNbAnetlMljWodq-Crcgxwax5Q_sxcYKpw-SiNV3bllyTqxEUCA=s96-w96-h96",
    name: "Johnathon Deal",
    fallback: "JD",
    quote:
      "I actually smiled and giggled, it was amazing having beautiful lyrics on the website. Thank you to all the devs, designers and whoever was involved in this project for making this.",
  },
  {
    id: "sortingfarmer",
    avatar: "/sf.png",
    name: "SortingFarmer",
    fallback: "SF",
    quote:
      "One of the best add-ons there are. It ain't trying to be the next gen whatever it just makes the lyrics better. That's all it wants to do and it does it in ways I didn't even know I needed.",
  },
  {
    id: "wttexe",
    avatar: "/w.jpeg",
    name: "WTTexe",
    fallback: "W",
    quote:
      "I've been using Youtube Music for so long but I've always felt that Google never put in real work into making this platform a great site/app with pure design and focus on User Experience. This changed with Better Lyrics. This was the Youtube music we wanted, It was what I wanted, I searched for months for a proper Word Synced lyrics alternative and there it was, and it was just far better than amazing! Absolute game changer for any YTM user",
  },
];

export function TestimonialsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleHoverStart = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  return (
    <section
      id="testimonials"
      className="w-full py-12 bg-gradient-to-b from-gray-200 to-white md:py-24 lg:py-32 dark:bg-gray-800"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          {/* Header */}
          <SectionHeader
            title="What Our Users Say"
            description="Hear from our users about how Better Lyrics has transformed their Youtube Music experience."
            descriptionClassName="max-w-[900px]"
          />

          {/* Testimonials Grid */}
          <div className="grid max-w-5xl grid-cols-1 gap-6 pt-12 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedGridItem
                key={testimonial.id}
                index={index}
                isHovered={hoveredIndex === index}
                onHoverStart={() => handleHoverStart(index)}
                onHoverEnd={handleHoverEnd}
                gradient="from-rose-300 to-red-300"
                clipPathOrigin="20% 20%"
                renderGradientInside={true}
              >
                <Card className="relative flex flex-col h-full py-8 px-6 space-y-4 overflow-hidden bg-gradient-to-b from-white to-gray-50 border-0 rounded-3xl dark:border-gray-800 dark:bg-gray-950">
                  <NoiseOverlay id={`testimonial-${index}`} gradientDirection="diagonal" />

                  <div className="relative space-y-2 !mt-0 z-10">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8 rounded-md border-[0.5px] border-gray-300 shadow-md bg-gray-50">
                        <img
                          className="flex-shrink-0 object-contain w-8"
                          src={testimonial.avatar}
                          alt="User Avatar"
                        />
                        <AvatarFallback>{testimonial.fallback}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{testimonial.name}</div>
                    </div>
                    <p className="py-2 text-left text-gray-500 dark:text-gray-400 text-pretty">
                      {testimonial.quote}
                    </p>
                  </div>
                </Card>
              </AnimatedGridItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
