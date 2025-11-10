import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card } from "../ui/card";
import { motion } from "motion/react";
import { useState } from "react";

export function TestimonialsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const testimonials = [
    {
      avatar:
        "https://styles.redditmedia.com/t5_4245r2/styles/profileIcon_thorr38dpvj91.jpg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=47712e9bb5030c41b249691a1194b0d84ee1898e",
      name: "MisterMew151",
      fallback: "JD",
      quote:
        "Love this! 10/10 works even better than I expected. I've wanted this for ages!",
    },
    {
      avatar:
        "https://i.redd.it/snoovatar/avatars/a71b88a3-9086-40a9-b926-8e16bac43bd5.png",
      name: "NetherCookiez",
      fallback: "NC",
      quote:
        "This is really great! Love the little animation where the lyrics get bigger. Already works as well (or even better) than YTM's lyrics.",
    },
    {
      avatar:
        "https://lh3.googleusercontent.com/a-/ALV-UjVrYLipC28NxGa2S190dbX1DvUEnJbt7TUT64u4VFx9pYqG5ovj4A=s96-w96-h96",
      name: "Kevin Patel",
      fallback: "KP",
      quote:
        "A much needed extension for YouTube Music. It just works!!! Highly recommended.",
    },
  ];

  return (
    <section
      id="testimonials"
      className="w-full py-12 bg-gradient-to-b from-gray-200 to-white md:py-24 lg:py-32 dark:bg-gray-800"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              What Our Users Say
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Hear from our users about how Better Lyrics has transformed their
              Youtube Music experience.
            </p>
          </div>
          <div className="grid max-w-5xl grid-cols-1 gap-6 pt-12 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative group"
              >
                <Card className="relative flex flex-col h-full p-6 space-y-4 overflow-hidden transition-all duration-300 bg-gradient-to-b from-white to-gray-50 border-[0.5px] border-gray-300 rounded-3xl hover:border-gray-400 hover:scale-[1.02] hover:-translate-y-1 hover:border-red-300/75 embossed-object dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700">
                  {/* Noise texture overlay */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15 mix-blend-multiply">
                    <defs>
                      <filter id={`noise-testimonial-${index}`}>
                        <feTurbulence
                          type="fractalNoise"
                          baseFrequency="0.6"
                          numOctaves="4"
                          seed="15"
                          stitchTiles="stitch"
                        />
                        <feColorMatrix type="saturate" values="0" />
                        <feComponentTransfer>
                          <feFuncR type="linear" slope="1.2" intercept="-0.1" />
                          <feFuncG type="linear" slope="1.2" intercept="-0.1" />
                          <feFuncB type="linear" slope="1.2" intercept="-0.1" />
                        </feComponentTransfer>
                      </filter>
                      <linearGradient
                        id={`noise-fade-testimonial-${index}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="white" />
                        <stop
                          offset="70%"
                          stopColor="rgba(255, 255, 255, 0.6)"
                        />
                        <stop offset="100%" stopColor="black" />
                      </linearGradient>
                      <mask id={`noise-mask-testimonial-${index}`}>
                        <rect
                          width="100%"
                          height="100%"
                          fill={`url(#noise-fade-testimonial-${index})`}
                        />
                      </mask>
                    </defs>
                    <rect
                      width="100%"
                      height="100%"
                      filter={`url(#noise-testimonial-${index})`}
                      mask={`url(#noise-mask-testimonial-${index})`}
                    />
                  </svg>

                  {/* Gradient background on hover */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: hoveredIndex === index ? 0.15 : 0,
                      clipPath:
                        hoveredIndex === index
                          ? "circle(150% at 20% 20%)"
                          : "circle(0% at 20% 20%)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 19,
                      mass: 1.2,
                    }}
                    className="absolute inset-0 !mt-0 pointer-events-none rounded-3xl bg-gradient-to-br from-rose-300 to-red-300"
                  />

                  <div className="relative space-y-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <img src={testimonial.avatar} alt="User Avatar" />
                        <AvatarFallback>{testimonial.fallback}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{testimonial.name}</div>
                    </div>
                    <p className="py-2 text-left text-gray-500 dark:text-gray-400">
                      {testimonial.quote}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
