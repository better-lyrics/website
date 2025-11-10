import Link from "next/link";

export function Footer() {
  const links = [
    {
      href: "https://better-lyrics-status.boidu.dev/",
      label: "Status",
      event: "status-link",
    },
    {
      href: "https://discord.gg/UsHE3d5fWF",
      label: "Discord",
      event: "discord-link",
      target: "_blank",
    },
    {
      href: "https://github.com/boidushya/better-lyrics/blob/master/PRIVACY.md",
      label: "Privacy",
    },
    {
      href: "https://boidu.dev",
      label: "Contact",
    },
  ];

  return (
    <footer className="flex flex-col items-center w-full gap-2 px-4 py-6 border-t sm:flex-row shrink-0 md:px-6">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        &copy; 2025 Better Lyrics. All rights reserved.
      </p>
      <nav className="flex gap-4 sm:ml-auto sm:gap-6">
        {links.map((link) => (
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
    </footer>
  );
}
