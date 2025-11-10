import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card } from "../ui/card";

export function TestimonialsSection() {
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
      className="w-full py-12 bg-gray-100 md:py-24 lg:py-32 dark:bg-gray-800"
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
              <Card
                key={index}
                className="flex flex-col p-6 space-y-4 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700"
              >
                <div className="space-y-2">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
