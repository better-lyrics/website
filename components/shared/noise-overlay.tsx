import { memo } from "react";

interface NoiseOverlayProps {
  /**
   * Gradient direction: "diagonal", "horizontal", or "vertical"
   */
  gradientDirection?: "diagonal" | "horizontal" | "vertical";
}

/**
 * Reusable noise texture overlay component using static image
 * Much more performant than SVG filters - uses cached image + CSS masks
 */
export const NoiseOverlay = memo(function NoiseOverlay({
  gradientDirection = "diagonal",
}: NoiseOverlayProps) {
  const maskImage =
    gradientDirection === "horizontal"
      ? "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0) 100%)"
      : gradientDirection === "vertical"
      ? "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"
      : "linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 100%)";

  return (
    <div
      className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.03]"
      style={{
        backgroundImage: "url(/noise-texture.png)",
        backgroundSize: "512px 512px",
        backgroundRepeat: "repeat",
        WebkitMaskImage: maskImage,
        maskImage: maskImage,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  );
});
