export function DemoSection() {
  return (
    <section id="demo" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="mb-12 space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Watch Better Lyrics in Action
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              See how the Better Lyrics Extension can enhance your Youtube Music
              experience.
            </p>
          </div>
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
}
