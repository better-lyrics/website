import React from "react";
import { type TStatus } from "../utils/functions";
import { Header } from "./landing/header";
import { TopBanner } from "./landing/top-banner";
import { HeroSection } from "./landing/hero-section";
import { FeaturesSection } from "./landing/features-section";
import { DemoSection } from "./landing/demo-section";
import { TestimonialsSection } from "./landing/testimonials-section";
import { Footer } from "./landing/footer";

export function Landing() {
  const [status, setStatus] = React.useState<TStatus>("operational");

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/status");
      const { status: apiStatus } = await response.json();

      setStatus(apiStatus);
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
        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  );
}
