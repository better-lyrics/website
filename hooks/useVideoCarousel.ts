"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Theme {
  id: string;
  name: string;
}

interface UseVideoCarouselOptions {
  themes: Theme[];
  autoPlay?: boolean;
}

interface UseVideoCarouselReturn {
  activeIndex: number;
  previousIndex: number | null;
  currentTime: number;
  segmentDuration: number;
  isLoaded: boolean;
  loadingProgress: number;
  isTransitioning: boolean;
  registerVideoRef: (index: number, el: HTMLVideoElement | null) => void;
  jumpToTheme: (index: number) => void;
  getSegmentProgress: (index: number) => number;
}

const TRANSITION_DURATION = 750;
const SEGMENT_DURATION = 7.5;

export function useVideoCarousel({
  themes,
  autoPlay = true,
}: UseVideoCarouselOptions): UseVideoCarouselReturn {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const loadedCount = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);
  const hasStartedRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const themeCount = themes.length;

  const checkAllLoaded = useCallback(() => {
    if (loadedCount.current >= 1 && !isLoaded) {
      setIsLoaded(true);
    }
  }, [isLoaded]);

  const registerVideoRef = useCallback(
    (index: number, el: HTMLVideoElement | null) => {
      const existingEl = videoRefs.current[index];

      if (existingEl === el) return;

      videoRefs.current[index] = el;

      if (el) {
        if (index !== 0) {
          el.pause();
        }

        const handleCanPlay = () => {
          loadedCount.current += 1;
          setLoadingProgress(loadedCount.current / themeCount);
          checkAllLoaded();
        };

        el.addEventListener("canplay", handleCanPlay, {
          once: true,
        });

        if (el.readyState >= 3) {
          handleCanPlay();
        }
      }
    },
    [themeCount, checkAllLoaded]
  );

  const transitionToTheme = useCallback(
    (targetIndex: number, fromIndex: number) => {
      setIsTransitioning(true);
      setPreviousIndex(fromIndex);
      setActiveIndex(targetIndex);

      const targetVideo = videoRefs.current[targetIndex];
      const currentVideo = videoRefs.current[fromIndex];

      if (currentVideo) {
        currentVideo.pause();
      }

      if (targetVideo) {
        targetVideo.currentTime = 0;
        targetVideo.play().catch(() => {});
      }

      isPlayingRef.current = true;

      setTimeout(() => {
        setIsTransitioning(false);
        setPreviousIndex(null);
      }, TRANSITION_DURATION);
    },
    []
  );

  const jumpToTheme = useCallback(
    (targetIndex: number) => {
      if (!isLoaded) return;

      transitionToTheme(targetIndex, activeIndex);
      setCurrentTime(0);
    },
    [isLoaded, activeIndex, transitionToTheme]
  );

  const getSegmentProgress = useCallback(
    (index: number): number => {
      if (index !== activeIndex) return 0;
      return Math.min(currentTime / SEGMENT_DURATION, 1);
    },
    [currentTime, activeIndex]
  );

  useEffect(() => {
    if (!isLoaded || !autoPlay || hasStartedRef.current) return;

    const activeVideo = videoRefs.current[0];
    if (activeVideo) {
      hasStartedRef.current = true;
      isPlayingRef.current = true;
      activeVideo.currentTime = 0;
      activeVideo.play().catch((e) => {
        console.warn("Autoplay failed:", e);
      });
    }
  }, [isLoaded, autoPlay]);

  useEffect(() => {
    if (!isLoaded) return;

    let lastTime = performance.now();
    let lastVideoTime = 0;

    const tick = (now: number) => {
      const delta = now - lastTime;

      if (delta < 16) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      lastTime = now;

      const activeVideo = videoRefs.current[activeIndex];
      if (!activeVideo) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const time = activeVideo.currentTime;
      setCurrentTime(time);

      const videoLooped = lastVideoTime > 1 && time < lastVideoTime - 1;
      const shouldTransition =
        (time >= SEGMENT_DURATION || videoLooped) && !isTransitioning;

      if (shouldTransition) {
        const nextIndex = (activeIndex + 1) % themeCount;
        transitionToTheme(nextIndex, activeIndex);
        setCurrentTime(0);
        lastVideoTime = 0;
      } else {
        lastVideoTime = time;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isLoaded, activeIndex, themeCount, isTransitioning, transitionToTheme]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPlayingRef.current = false;
        videoRefs.current.forEach((video) => {
          if (video && !video.paused) {
            video.pause();
          }
        });
      } else if (isLoaded) {
        isPlayingRef.current = true;
        const activeVideo = videoRefs.current[activeIndex];
        if (activeVideo) {
          activeVideo.play().catch(() => {});
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [activeIndex, isLoaded]);

  return {
    activeIndex,
    previousIndex,
    currentTime,
    segmentDuration: SEGMENT_DURATION,
    isLoaded,
    loadingProgress,
    isTransitioning,
    registerVideoRef,
    jumpToTheme,
    getSegmentProgress,
  };
}
