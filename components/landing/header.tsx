import Link from "next/link";
import { cn, type TStatus } from "@/utils/functions";

interface HeaderProps {
  status: TStatus;
}

export function Header({ status }: HeaderProps) {
  return (
    <header className="fixed z-50 text-gray-800 flex items-center w-full px-4 border-b-[0.75px] sm:border-b-[0.5px] border-gray-300 bg-gray-50/90 backdrop-blur-md lg:px-6 h-14">
      <Link className="flex items-center justify-center" href="#">
        <img alt="Logo" className="mr-2 size-6" src="/logo.svg" />
        <span className="hidden text-xl font-bold text-black sm:block">
          Better Lyrics
        </span>
      </Link>
      <nav className="flex items-center gap-4 ml-auto sm:gap-6">
        <Link
          className={
            "hidden text-sm font-medium hover:underline underline-offset-4 sm:block"
          }
          href="#features"
        >
          Features
        </Link>
        <Link
          className="hidden text-sm font-medium hover:underline underline-offset-4 sm:block"
          href="#testimonials"
        >
          Testimonials
        </Link>
        <Link
          className={cn(
            "inline-flex items-center justify-center px-3 py-2 text-sm font-medium transition-colors border rounded-xl shadow h-9 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50",
            status === "operational" &&
              "text-green-800 bg-green-50 border-green-600/40 hover:bg-green-100",
            status === "degraded" &&
              "text-yellow-800 bg-yellow-50 border-yellow-600/40 hover:bg-yellow-100",
            status === "downtime" &&
              "text-red-800 bg-red-50 border-red-600/40 hover:bg-red-100"
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
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors bg-gray-900 shadow rounded-xl h-9 text-gray-50 hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 "
          href="https://github.com/boidushya/better-lyrics"
          target="_blank"
        >
          <svg
            viewBox="0 0 256 250"
            className="w-4 h-4 mr-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
          >
            <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z" />
          </svg>
          Source Code
        </Link>

        <Link
          className="inline-flex items-center justify-center p-2 text-sm font-medium transition-colors bg-[#5865F2] rounded-xl shadow h-9 text-gray-50 hover:bg-[#4053D6] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="https://discord.gg/UsHE3d5fWF"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[1.25rem] h-[1.25rem]"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12"
            />
          </svg>
        </Link>
      </nav>
    </header>
  );
}
