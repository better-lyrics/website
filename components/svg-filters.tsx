/**
 * Global SVG filters used across the application
 * Define once, use everywhere with filter="url(#filter-id)"
 */
export function GlobalSVGFilters() {
  return (
    <svg
      width="0"
      height="0"
      className="absolute"
      aria-hidden="true"
    >
      <defs>
        {/* Noise texture filter */}
        <filter id="noise-texture">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            numOctaves="4"
            seed="15"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.2" intercept="-0.1" />
            <feFuncG type="linear" slope="1.2" intercept="-0.1" />
            <feFuncB type="linear" slope="1.2" intercept="-0.1" />
          </feComponentTransfer>
        </filter>

        {/* Noise fade gradient - horizontal */}
        <linearGradient id="noise-fade-horizontal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" />
          <stop offset="60%" stopColor="rgba(255, 255, 255, 0.8)" />
          <stop offset="100%" stopColor="black" />
        </linearGradient>

        {/* Noise fade gradient - diagonal */}
        <linearGradient id="noise-fade-diagonal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="70%" stopColor="rgba(255, 255, 255, 0.6)" />
          <stop offset="100%" stopColor="black" />
        </linearGradient>

        {/* Noise mask - horizontal */}
        <mask id="noise-mask-horizontal">
          <rect width="100%" height="100%" fill="url(#noise-fade-horizontal)" />
        </mask>

        {/* Noise mask - diagonal */}
        <mask id="noise-mask-diagonal">
          <rect width="100%" height="100%" fill="url(#noise-fade-diagonal)" />
        </mask>
      </defs>
    </svg>
  );
}
