import Link from "next/link";
import { memo } from "react";
import DiscordIcon from "@/components/icons/discord";
import TwitterIcon from "@/components/icons/twitter";
import RedditIcon from "@/components/icons/reddit";
import BetterLyricsLogo from "@/components/icons/better-lyrics";
import { NoiseOverlay } from "@/components/shared/noise-overlay";
import GithubIcon from "@/components/icons/github";

export const Footer = memo(function Footer() {
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
      href: "https://www.reddit.com/r/betterlyrics/",
      label: "Reddit",
      event: "reddit-link",
      target: "_blank",
      group: "social",
      icon: <RedditIcon />,
    },
    {
      href: "https://www.github.com/better-lyrics",
      label: "GitHub",
      event: "github-link",
      target: "_blank",
      group: "social",
      icon: <GithubIcon />,
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
    <footer
      data-disable-hover
      className="relative flex flex-col md:flex-row items-center justify-between gap-2 py-8 pl-6 pr-6 md:pr-10 mx-2 md:mx-6 mb-2 md:mb-6 overflow-hidden border-[0.5px] rounded-3xl border-gray-300 embossed-object bg-gradient-to-b from-white to-gray-100 shrink-0"
    >
      <NoiseOverlay gradientDirection="vertical" className="md:hidden" />
      <NoiseOverlay
        gradientDirection="horizontal"
        className="hidden md:block"
      />

      <BetterLyricsLogo className="absolute inline-block h-10 -translate-x-32 -translate-y-1/2 md:h-16 text-gray-400/80 aspect-square top-14 md:top-1/2 left-1/2 md:translate-x-0 md:left-8" />
      <h4 className="z-10 text-4xl font-black !leading-snug tracking-tight whitespace-pre pl-14 md:pl-24 md:text-5xl engraved">
        Better Lyrics
      </h4>
      <div className="flex flex-col items-center justify-between gap-2 mt-6 md:gap-4 md:items-end md:mt-0">
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
          &copy; {new Date().getFullYear()} Better Lyrics. All rights reserved.
        </p>
      </div>
    </footer>
  );
});
