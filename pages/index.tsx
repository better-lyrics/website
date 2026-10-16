import Head from "next/head";
import { Landing } from "@/components/landing";

export default function Home() {
  const title = "Better Lyrics: Synced Lyrics Extension for YouTube Music";
  const description =
    "Free, open-source browser extension that adds time-synced lyrics, real-time translations and romanization to YouTube Music. For Chrome, Firefox and Edge.";
  const ogImage = "https://betterlyrics.org/images/og.png";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="better lyrics, youtube music, lyrics extension, synced lyrics, youtube music lyrics, music extension ,youtube music extension, chrome extension, firefox addon, better lyrics extension"
        />
        <meta name="author" content="Better Lyrics" />
        <meta
          name="google-site-verification"
          content="hsxkLtNCoahD0HV2cRmDi9op-0LMgf7wPrcehV7vEyU"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://betterlyrics.org/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Better Lyrics" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://betterlyrics.org/" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Favicon */}
        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-512.png" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://betterlyrics.org/" />

        {/* Analytics */}
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="f9fdefc7-b1fe-49fd-973f-c312f9c824b6"
        />
      </Head>
      <Landing />
    </>
  );
}
