import { memo, useCallback, useState, type ReactNode } from "react";
import { SectionHeader } from "@/components/shared/section-header";
import { cn } from "@/utils/functions";
import type { FaqEntry } from "@/types/landing";

const GITHUB_REPO_URL = "https://github.com/better-lyrics/better-lyrics";
const PRIVACY_POLICY_URL = `${GITHUB_REPO_URL}/blob/master/PRIVACY.md`;
const COMPOSER_URL = "https://composer.betterlyrics.org";
const GITHUB_SPONSORS_URL = "https://github.com/sponsors/boidushya";
const BUY_ME_A_COFFEE_URL = "https://buymeacoffee.com/boidu";

function AnswerLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 hover:text-gray-900 dark:hover:text-gray-100"
    >
      {children}
    </a>
  );
}

const faqEntries: FaqEntry[] = [
  {
    id: "free",
    question: "Is Better Lyrics free?",
    answer: (
      <>
        Yes. Better Lyrics is free and open source under the GPL-3.0 licence.
        There are no ads and you don&apos;t need an account. The code is on{" "}
        <AnswerLink href={GITHUB_REPO_URL}>GitHub</AnswerLink>.
      </>
    ),
  },
  {
    id: "premium",
    question: "Do I need YouTube Music Premium?",
    answer:
      "No. Better Lyrics works the same on free and Premium YouTube Music accounts.",
  },
  {
    id: "browsers",
    question: "Which browsers does it work on?",
    answer:
      "Chrome, Firefox and Edge, from each browser's extension store. Other Chromium browsers such as Brave, Opera and Vivaldi can install it from the Chrome Web Store.",
  },
  {
    id: "mobile",
    question: "Does it work on Android or iPhone?",
    answer:
      "Better Lyrics is made for desktop. Android browsers that support extensions, such as Firefox for Android, can install it, but mobile isn't officially supported. iPhone isn't supported.",
  },
  {
    id: "sources",
    question: "Where do the lyrics come from?",
    answer:
      "From several sources, including Better Lyrics' own lyrics, Unison (lyrics made by the community), Musixmatch and LRCLib. Better Lyrics tries the most precisely synced lyrics first and falls back to the next source if a song is missing. You can reorder or turn off sources in the settings.",
  },
  {
    id: "translation",
    question: "Can it translate or romanize lyrics?",
    answer:
      "Yes. Lyrics can be translated into your language in real time, and songs in Japanese, Korean, Chinese and other scripts can show a romanized line so you can sing along.",
  },
  {
    id: "themes",
    question: "Can I change how the lyrics look?",
    answer:
      "Yes. Install a theme from the Theme Marketplace, or write your own with custom CSS.",
  },
  {
    id: "composer",
    question: "Can I make synced lyrics myself?",
    answer: (
      <>
        Yes. <AnswerLink href={COMPOSER_URL}>Composer</AnswerLink> is a free
        editor for word-synced TTML lyrics, with tap-to-sync and a live
        preview. Submit your lyrics to Unison and everyone using Better Lyrics
        gets them.
      </>
    ),
  },
  {
    id: "privacy",
    question: "What data does Better Lyrics collect?",
    answer: (
      <>
        Only what it needs to find lyrics: the song title, artist, album and
        video ID. Your IP address is used temporarily to send the lyrics back,
        and request logs are deleted within 7 days. Nothing is sold. Read the
        full <AnswerLink href={PRIVACY_POLICY_URL}>privacy policy</AnswerLink>.
      </>
    ),
  },
  {
    id: "support",
    question: "How can I support Better Lyrics?",
    answer: (
      <>
        Better Lyrics is free, with no ads and no paywall, and it will stay
        that way. It&apos;s built by an independent developer with help from
        the open-source community, but running it isn&apos;t free: the lyrics
        servers, the Unison community database and real-time translations all
        cost money every month. If Better Lyrics has become part of how you
        listen to music, you can sponsor the project on{" "}
        <AnswerLink href={GITHUB_SPONSORS_URL}>GitHub Sponsors</AnswerLink> or
        buy a coffee on{" "}
        <AnswerLink href={BUY_ME_A_COFFEE_URL}>Buy Me a Coffee</AnswerLink>.
        It pays for those servers and the time that goes into new features, and
        every bit helps keep Better Lyrics free for everyone.
      </>
    ),
  },
];

interface FaqItemProps {
  entry: FaqEntry;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

const FaqItem = memo(function FaqItem({ entry, isOpen, onToggle }: FaqItemProps) {
  const buttonId = `faq-question-${entry.id}`;
  const panelId = `faq-answer-${entry.id}`;

  return (
    <div>
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(entry.id)}
          className="flex items-center justify-between w-full gap-6 py-5 text-lg font-medium text-left"
        >
          <span>{entry.question}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "w-5 h-5 shrink-0 text-stone-400 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
              isOpen && "rotate-180"
            )}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "grid transition-[grid-template-rows,opacity,visibility] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          isOpen
            ? "grid-rows-[1fr] opacity-100 visible"
            : "grid-rows-[0fr] opacity-0 invisible"
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-5 leading-relaxed text-gray-500 dark:text-gray-400">
            {entry.answer}
          </p>
        </div>
      </div>
    </div>
  );
});

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 mx-auto md:px-6">
        <SectionHeader
          title="Frequently Asked Questions"
          description="Everything you need to know about Better Lyrics"
          className="max-w-3xl mx-auto mb-12 text-center"
          descriptionClassName="text-lg md:text-xl"
        />

        <div className="max-w-3xl mx-auto border-y border-stone-200 divide-y divide-stone-200 dark:border-stone-800 dark:divide-stone-800">
          {faqEntries.map((entry) => (
            <FaqItem
              key={entry.id}
              entry={entry}
              isOpen={openId === entry.id}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
