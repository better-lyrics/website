import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useCallback } from "react";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimatedGridItem } from "@/components/shared/animated-grid-item";
import { NoiseOverlay } from "@/components/shared/noise-overlay";
import type { Testimonial } from "@/types/landing";

const testimonials: Testimonial[] = [
  {
    id: "mike",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjVLsqGJxXxKrCVE1PbuoHnTKxSBQeNCHBOAtx11bmjhYN63yEum=s256-w256-h256",
    name: "Mike",
    fallback: "M",
    quote: (
      <span>
        This is a <span className="font-semibold">must have</span> if you listen
        to YouTube Music a lot, trust me.
      </span>
    ),
  },
  {
    id: "nethercookiez",
    avatar:
      "https://i.redd.it/snoovatar/avatars/a71b88a3-9086-40a9-b926-8e16bac43bd5.png",
    name: "NetherCookiez",
    fallback: "NC",
    quote: (
      <span>
        This is really great! Love the little animation where the lyrics get
        bigger. Already works as well (or{" "}
        <span className="font-semibold">even better</span>) than YTM&apos;s
        lyrics.
      </span>
    ),
  },
  {
    id: "kevin-patel",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjVrYLipC28NxGa2S190dbX1DvUEnJbt7TUT64u4VFx9pYqG5ovj4A=s256-w256-h256",
    name: "Kevin Patel",
    fallback: "KP",
    quote: (
      <span>
        A much needed extension for YouTube Music.{" "}
        <span className="font-semibold">It just works!!!</span> Highly
        recommended.
      </span>
    ),
  },
  {
    id: "just-people",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjU8KdSsvcWrRkc76vHBLNQV7u-rfopdygy0yKmpCdAIefBmv90=s256-w256-h256",
    name: "Just People",
    fallback: "JP",
    quote: (
      <span>
        I love this extension, I can sing Japanese songs without worrying about{" "}
        <span className="font-semibold">kanji and hiragana</span>, and{" "}
        <span className="font-semibold">synchronized lyrics</span> make this
        even better and also can{" "}
        <span className="font-semibold">translate lyrics</span>, loveee ittt
        thanks dev, for making this extension.
      </span>
    ),
  },
  {
    id: "johnathon-deal",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjUrNbAnetlMljWodq-Crcgxwax5Q_sxcYKpw-SiNV3bllyTqxEUCA=s96-w96-h96",
    name: "Johnathon Deal",
    fallback: "JD",
    quote: (
      <span>
        I actually smiled and giggled, it was amazing having{" "}
        <span className="font-semibold">beautiful lyrics</span> on the website.
        Thank you to all the devs, designers and whoever was involved in this
        project for making this.
      </span>
    ),
  },
  {
    id: "sortingfarmer",
    avatar: "/images/sf.png",
    name: "SortingFarmer",
    fallback: "SF",
    quote: (
      <span>
        One of the <span className="font-semibold">best add-ons</span> there
        are. It ain&apos;t trying to be the next gen whatever, it{" "}
        <span className="font-semibold">just makes the lyrics better</span>.
        That&apos;s all it wants to do and it does it in ways I didn&apos;t even
        know I needed.
      </span>
    ),
  },
  {
    id: "param-bedi",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjVGaRVEG3vDgT6z0UE7jMigdZeEnPf18qLwJEEeywAGPtiIdjtFyA=s96-w96-h96",
    name: "Param Bedi",
    fallback: "PB",
    quote: (
      <span>
        God, I was thinking of writing an extension because I am sick of YouTube
        being a d**k and not writing a simple piece of code that makes lyrics
        appear the way Spotify does. You Sir, just saved me a lot of trouble
        figuring out how to do the same. 1 search and <em>bang</em> there was
        your extension. AND <span className="font-semibold">I LOVE IT!!!!</span>
      </span>
    ),
  },
  {
    id: "wttexe",
    avatar: "/images/w.jpeg",
    name: "WTTexe",
    fallback: "W",
    quote: (
      <span>
        I&apos;ve been using YouTube Music for so long but I&apos;ve always felt
        that Google never put in real work into making this platform a great
        site/app with pure design and focus on User Experience. This changed
        with Better Lyrics. This was the YouTube Music we wanted, it was what I
        wanted, I searched for months for a proper word-synced lyrics
        alternative and there it was, and it was just{" "}
        <span className="font-semibold">far better than amazing!</span> Absolute
        game changer for any YTM user.
      </span>
    ),
  },
  {
    id: "andi",
    avatar: "/images/a.png",
    name: "Andi",
    fallback: "A",
    quote: (
      <span>
        I have been bribed to write this positive testimonial.{" "}
        <span className="font-semibold">This is the best extension</span> money
        can buy and boy do I have money now thank you Better Lyrics, pleasure
        doing business.
      </span>
    ),
  },
];

const DISCLAIMER_IDS = ["andi"];

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
            {testimonials.map((testimonial, index) => {
              const isDisclaimer = DISCLAIMER_IDS.includes(testimonial.id);
              return (
                <AnimatedGridItem
                  key={testimonial.id}
                  index={index}
                  isHovered={hoveredIndex === index}
                  onHoverStart={() => handleHoverStart(index)}
                  onHoverEnd={handleHoverEnd}
                  gradient="from-rose-300 to-red-300"
                  clipPathOrigin="20% 20%"
                  renderGradientInside={true}
                  className="flex flex-col px-6 py-8 space-y-4"
                >
                  <NoiseOverlay gradientDirection="vertical" />

                  <div className="h-full relative space-y-2 !mt-0 z-10 flex flex-col">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8 rounded-md border-[0.75px] md:[0.5px] border-gray-300 shadow-md bg-gray-50">
                        <img
                          className="flex-shrink-0 object-contain w-8"
                          src={testimonial.avatar}
                          alt="User Avatar"
                        />
                        <AvatarFallback>{testimonial.fallback}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">
                        {testimonial.name}
                        {isDisclaimer && (
                          <strong className="text-red-400"> *</strong>
                        )}
                      </div>
                    </div>
                    <p className="relative flex flex-col justify-between h-full py-2 text-left text-gray-500 transition-colors group-hover:text-gray-600 text-pretty duration-800">
                      {testimonial.quote}
                      <span
                        className={`relative inline-block mt-6 pl-2 text-xs text-gray-500/50 group-hover:text-red-900/50 transition-colors duration-800 ${
                          isDisclaimer ? "inline-block" : "hidden"
                        }`}
                      >
                        <strong className="absolute mr-1 transition-colors -translate-x-2 duration-800 text-red-400/50 group-hover:text-red-400">
                          *
                        </strong>
                        This individual may or may not be a close personal
                        friend of the developer.
                      </span>
                    </p>
                  </div>
                </AnimatedGridItem>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
