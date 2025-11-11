import { SectionHeader } from "@/components/shared/section-header";
import { memo } from "react";

export const DemoSection = memo(function DemoSection() {
  return (
    <section id="demo" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <SectionHeader
            title="Watch Better Lyrics in Action"
            description="See how the Better Lyrics Extension can enhance your Youtube Music experience."
            className="mb-12"
            descriptionClassName="max-w-[900px]"
          />
          <div className="w-full max-w-2xl overflow-hidden rounded-lg aspect-video">
            <iframe
              src="https://www.youtube.com/embed/GACsqMfhDVE"
              title="Better Lyrics for Youtube Music | Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
});
