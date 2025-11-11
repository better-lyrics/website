import { memo } from "react";

interface NoiseOverlayProps {
  /**
   * Gradient direction: "diagonal" or "horizontal"
   */
  gradientDirection?: "diagonal" | "horizontal";
  /**
   * Unique ID for local mask to avoid conflicts
   */
  id: string;
}

/**
 * Reusable noise texture overlay component
 * Uses global filter, defines local mask for gradient
 */
export const NoiseOverlay = memo(function NoiseOverlay({
  gradientDirection = "diagonal",
  id,
}: NoiseOverlayProps) {
  const gradientId = `noise-gradient-${id}`;
  const maskId = `noise-mask-${id}`;

  const isHorizontal = gradientDirection === "horizontal";

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply opacity-15">
      <defs>
        <linearGradient
          id={gradientId}
          x1="0%"
          y1="0%"
          x2={isHorizontal ? "100%" : "100%"}
          y2={isHorizontal ? "0%" : "100%"}
        >
          <stop offset="0%" stopColor="white" />
          <stop
            offset={isHorizontal ? "60%" : "70%"}
            stopColor={isHorizontal ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.6)"}
          />
          <stop offset="100%" stopColor="black" />
        </linearGradient>
        <mask id={maskId}>
          <rect width="100%" height="100%" fill={`url(#${gradientId})`} />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        filter="url(#noise-texture)"
        mask={`url(#${maskId})`}
      />
    </svg>
  );
});
