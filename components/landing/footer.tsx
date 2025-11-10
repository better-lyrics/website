import Link from "next/link";
import DiscordIcon from "@/components/icons/discord";
import TwitterIcon from "@/components/icons/twitter";
import RedditIcon from "@/components/icons/reddit";
import BetterLyricsLogo from "@/components/icons/better-lyrics";

export function Footer() {
  const links = [
    {
      href: "https://better-lyrics-status.boidu.dev/",
      label: "Status",
      event: "status-link",
      group: "general",
    },
    {
      href: "https://discord.gg/UsHE3d5fWF",
      label: "Discord",
      event: "discord-link",
      target: "_blank",
      group: "social",
      icon: <DiscordIcon />,
    },
    {
      href: "https://twitter.com/boidushya",
      label: "Twitter",
      event: "twitter-link",
      target: "_blank",
      group: "social",
      icon: <TwitterIcon />,
    },
    {
      href: "https://www.reddit.com/r/betterlyrics/",
      label: "Reddit",
      event: "reddit-link",
      target: "_blank",
      group: "social",
      icon: <RedditIcon />,
    },
    {
      href: "https://github.com/boidushya/better-lyrics/blob/master/PRIVACY.md",
      label: "Privacy",
      group: "general",
    },
    {
      href: "https://boidu.dev",
      label: "Contact",
      group: "general",
    },
  ];

  return (
    <footer className="relative flex flex-col md:flex-row items-center justify-between gap-2 py-8 pl-6 pr-6 md:pr-10 mx-4 md:mx-8 mb-4 md:mb-8 overflow-hidden border-[0.5px] rounded-3xl border-gray-300 embossed-object bg-gradient-to-b from-white to-gray-100 shrink-0">
      {/* Noise texture overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15 mix-blend-multiply">
        <defs>
          <filter id="noise-footer">
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
          <linearGradient id="noise-fade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" />
            <stop offset="60%" stopColor="rgba(255, 255, 255, 0.8)" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>
          <mask id="noise-mask">
            <rect width="100%" height="100%" fill="url(#noise-fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          filter="url(#noise-footer)"
          mask="url(#noise-mask)"
        />
      </svg>

      <BetterLyricsLogo className="absolute inline-block h-10 -translate-x-32 -translate-y-1/2 md:h-16 text-gray-400/80 aspect-square top-14 md:top-1/2 left-1/2 md:translate-x-0 md:left-8" />
      <h4 className="z-10 text-4xl font-black !leading-snug tracking-tight whitespace-pre pl-14 md:pl-24 md:text-5xl engraved">
        Better Lyrics
      </h4>
      <div className="flex flex-col items-center justify-between gap-2 mt-6 md:items-end md:mt-0">
        <div className="flex flex-col items-center gap-2 md:items-end">
          <nav className="z-10 flex gap-4 md:ml-auto md:gap-6">
            {links
              .filter((item) => item.group === "general")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs hover:underline underline-offset-4"
                  prefetch={false}
                  target={link.target}
                  data-umami-event={link.event}
                >
                  {link.label}
                </Link>
              ))}
          </nav>
          <nav className="z-10 flex gap-4 md:ml-auto md:gap-4">
            {links
              .filter((item) => item.group === "social")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-gray-500 transition-colors hover:underline underline-offset-4 hover:text-gray-600"
                  prefetch={false}
                  target={link.target}
                  data-umami-event={link.event}
                >
                  {link.icon}
                </Link>
              ))}
          </nav>
        </div>
        <p className="z-10 mt-6 text-xs text-gray-500 dark:text-gray-400 md:mt-0">
          &copy; 2025 Better Lyrics. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
