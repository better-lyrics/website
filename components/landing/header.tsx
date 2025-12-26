import Link from "next/link";
import { cn, type TStatus } from "@/utils/functions";
import GithubIcon from "@/components/icons/github";
import DiscordIcon from "@/components/icons/discord";
import { LogoContextMenu } from "@/components/shared/logo-context-menu";

interface HeaderProps {
  status: TStatus;
}

export function Header({ status }: HeaderProps) {
  return (
    <header className="fixed z-50 text-gray-800 flex items-center w-full px-4 border-b-[0.75px] sm:border-b-[0.5px] border-gray-300 bg-gray-50/90 backdrop-blur-md lg:px-6 h-14">
      <Link className="flex items-center justify-center" href="/">
        <LogoContextMenu svgPath="/icons/logo.svg">
          <img alt="Logo" className="mr-2 size-6" src="/icons/logo.svg" />
        </LogoContextMenu>
        <span className="hidden text-xl font-bold text-black sm:block">
          Better Lyrics
        </span>
      </Link>
      <nav className="flex items-center gap-4 ml-auto">
        <Link
          className={
            "hidden text-sm font-medium hover:underline underline-offset-4 sm:block"
          }
          href="#features"
        >
          Features
        </Link>
        <Link
          className={
            "hidden text-sm font-medium hover:underline underline-offset-4 sm:block"
          }
          href="#themes"
        >
          Themes
        </Link>
        <Link
          className="hidden text-sm font-medium hover:underline underline-offset-4 sm:block"
          href="#testimonials"
        >
          Testimonials
        </Link>
        <Link
          className={cn(
            "inline-flex items-center justify-center px-3 py-2 text-sm font-medium transition-colors border rounded-xl squircle h-9 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50",
            status === "operational" &&
              "text-green-800 bg-green-100/60 border-green-600/50 hover:bg-green-100",
            status === "degraded" &&
              "text-yellow-800 bg-yellow-100/60 border-yellow-600/50 hover:bg-yellow-100",
            status === "downtime" &&
              "text-red-800 bg-red-100/60 border-red-600/50 hover:bg-red-100"
          )}
          href="https://better-lyrics-status.boidu.dev"
          target="_blank"
        >
          <span className="relative flex w-2 h-2 mr-2">
            <span
              className={cn(
                "absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping",
                status === "operational" && "bg-green-400",
                status === "degraded" && "bg-yellow-400",
                status === "downtime" && "bg-red-400"
              )}
            ></span>
            <span
              className={cn(
                "relative inline-flex w-2 h-2 rounded-full",
                status === "operational" && "bg-green-500",
                status === "degraded" && "bg-yellow-500",
                status === "downtime" && "bg-red-500"
              )}
            ></span>
          </span>
          Status
        </Link>

        <Link
          className="relative inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors bg-gray-900 shadow group rounded-xl squircle h-9 text-gray-50 hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 "
          href="https://github.com/boidushya/better-lyrics"
          target="_blank"
        >
          <GithubIcon />
          Source Code
        </Link>

        <Link
          className="inline-flex items-center justify-center p-2 aspect-square text-sm font-medium transition-colors bg-[#5865F2] rounded-xl squircle shadow h-9 text-gray-50 hover:bg-[#4053D6] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="https://discord.gg/UsHE3d5fWF"
          target="_blank"
        >
          <DiscordIcon className="size-5" />
        </Link>
      </nav>
    </header>
  );
}
