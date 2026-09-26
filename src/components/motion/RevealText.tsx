"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface RevealTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  mode?: "char" | "word" | "line";
  delay?: number;
  triggerOnScroll?: boolean;
}

export function RevealText({
  children,
  className = "",
  as = "h2",
  mode = "word",
  delay = 0,
  triggerOnScroll = true,
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const targets = el.querySelectorAll(".reveal-unit");
    if (!targets.length) return;

    // Initial state: hidden slightly below baseline with subtle 3D tilt
    gsap.set(targets, {
      yPercent: 110,
      opacity: 0,
      rotateX: -12,
      transformOrigin: "50% 100% -20px",
    });

    const animProps = {
      yPercent: 0,
      opacity: 1,
      rotateX: 0,
      duration: mode === "char" ? 0.75 : 0.85,
      stagger: mode === "char" ? 0.022 : 0.045,
      ease: "power3.out",
      delay,
    };

    if (triggerOnScroll) {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(targets, animProps);
        },
      });
      return () => st.kill();
    } else {
      const tween = gsap.to(targets, animProps);
      return () => {
        tween.kill();
      };
    }
  }, [delay, mode, triggerOnScroll]);

  const Component = as as React.ElementType;

  // Split text into lines, words, or characters while preserving accessibility
  const renderContent = () => {
    if (mode === "char") {
      const words = children.split(" ");
      return words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, cIdx) => (
            <span key={cIdx} className="inline-block overflow-hidden align-top">
              <span className="reveal-unit inline-block will-change-transform">
                {char}
              </span>
            </span>
          ))}
        </span>
      ));
    }

    if (mode === "word") {
      const words = children.split(" ");
      return words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden align-top mr-[0.25em]">
          <span className="reveal-unit inline-block will-change-transform">
            {word}
          </span>
        </span>
      ));
    }

    // Default: line or block
    return (
      <span className="inline-block overflow-hidden align-top w-full">
        <span className="reveal-unit inline-block will-change-transform">
          {children}
        </span>
      </span>
    );
  };

  return (
    <Component
      ref={containerRef}
      className={`relative inline-block ${className}`}
      aria-label={children}
    >
      <span aria-hidden="true" className="inline-block">
        {renderContent()}
      </span>
    </Component>
  );
}
