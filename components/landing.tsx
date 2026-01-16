import React from "react";
import { type TStatus, STATUS_API_URL } from "@/utils/functions";
import { Header } from "./landing/header";
import { TopBanner } from "./landing/top-banner";
import { HeroSection } from "./landing/hero-section";
import { FeaturesSection } from "./landing/features-section";
import { ThemePreviewSection } from "./landing/theme-preview-section";
import { DemoSection } from "./landing/demo-section";
import { TestimonialsSection } from "./landing/testimonials-section";
import { Footer } from "./landing/footer";

export function Landing() {
  const [status, setStatus] = React.useState<TStatus>("operational");

  React.useEffect(() => {
    const fetchData = async () => {
      const statusResponse = await fetch(STATUS_API_URL);

      const { status } = await statusResponse.json();

      setStatus(status);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header status={status} />

      <main className="flex-1 pt-[6.5rem]">
        <TopBanner />
        <HeroSection />
        <FeaturesSection />
        <ThemePreviewSection />
        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  );
}
