"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MotionDividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  origin?: "left" | "right" | "center" | "top" | "bottom";
  delay?: number;
  duration?: number;
}

/**
 * MotionDivider: Animated structural rails and dividers (Section 13)
 * Draws into frame smoothly on viewport entrance with zero layout shift.
 */
export function MotionDivider({
  className = "w-full h-[1px] bg-white/15",
  orientation = "horizontal",
  origin = "left",
  delay = 0,
  duration = 0.9,
}: MotionDividerProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const isHorizontal = orientation === "horizontal";
    const originMap = {
      left: "0% 50%",
      right: "100% 50%",
      center: "50% 50%",
      top: "50% 0%",
      bottom: "50% 100%",
    };

    gsap.set(el, {
      scaleX: isHorizontal ? 0 : 1,
      scaleY: isHorizontal ? 1 : 0,
      transformOrigin: originMap[origin],
      opacity: 0,
    });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
        });
      },
    });

    return () => st.kill();
  }, [delay, duration, orientation, origin]);

  return <div ref={lineRef} className={`will-change-transform ${className}`} />;
}
