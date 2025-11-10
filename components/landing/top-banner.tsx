import Link from "next/link";

export function TopBanner() {
  return (
    <div className="absolute z-10 flex items-center justify-between w-full h-12 gap-4 px-6 py-4 text-sm text-yellow-800 whitespace-pre bg-yellow-200 top-14 border-y border-yellow-800/10">
      Better Lyrics is on Product Hunt! 🚀
      <Link
        href="https://www.producthunt.com/posts/better-lyrics?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-better&#0045;lyrics"
        target="_blank"
        className="transition-transform hover:scale-105"
        data-umami-event="ph-btn"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=463141&theme=light"
          alt="Better&#0032;Lyrics - Upgrade&#0032;YouTube&#0032;music&#0032;with&#0032;stunning&#0044;&#0032;synced&#0032;lyrics | Product Hunt"
          width="166.67"
          height="36"
          className=""
        />
      </Link>
    </div>
  );
}
