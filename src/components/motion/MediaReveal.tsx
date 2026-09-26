"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface MediaRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "bottom" | "left" | "right";
  delay?: number;
}

export function MediaReveal({
  children,
  className = "",
  direction = "bottom",
  delay = 0,
}: MediaRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const media = mediaRef.current;
    if (!container || !media) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Set initial clip path based on direction
    let initialClip = "inset(100% 0 0 0)";
    if (direction === "left") initialClip = "inset(0 100% 0 0)";
    if (direction === "right") initialClip = "inset(0 0 0 100%)";

    gsap.set(container, { clipPath: initialClip });
    gsap.set(media, { scale: 1.06 });

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(container, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power3.inOut",
          delay,
        });
        gsap.to(media, {
          scale: 1.0,
          duration: 1.4,
          ease: "power2.out",
          delay,
        });
      },
    });

    return () => st.kill();
  }, [delay, direction]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ willChange: "clip-path" }}
    >
      <div ref={mediaRef} className="w-full h-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
