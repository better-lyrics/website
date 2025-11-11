import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MotionConfig } from "motion/react";
import { GlobalSVGFilters } from "@/components/svg-filters";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MotionConfig reducedMotion="user">
      <GlobalSVGFilters />
      <Component {...pageProps} />
    </MotionConfig>
  );
}
