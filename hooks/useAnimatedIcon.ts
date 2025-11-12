import { useCallback, useImperativeHandle, useRef } from "react";
import { useAnimation } from "motion/react";

export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UseAnimatedIconReturn {
  controls: ReturnType<typeof useAnimation>;
  handleMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
  getImperativeHandle: () => AnimatedIconHandle;
}

interface UseAnimatedIconOptions {
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Shared hook for animated icon components
 * Handles animation controls and mouse events
 */
export function useAnimatedIcon({
  onMouseEnter,
  onMouseLeave,
}: UseAnimatedIconOptions = {}): UseAnimatedIconReturn {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        controls.start("animate");
      } else {
        onMouseEnter?.(e);
      }
    },
    [controls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        controls.start("normal");
      } else {
        onMouseLeave?.(e);
      }
    },
    [controls, onMouseLeave]
  );

  const getImperativeHandle = useCallback((): AnimatedIconHandle => {
    isControlledRef.current = true;

    return {
      startAnimation: () => controls.start("animate"),
      stopAnimation: () => controls.start("normal"),
    };
  }, [controls]);

  return {
    controls,
    handleMouseEnter,
    handleMouseLeave,
    getImperativeHandle,
  };
}
