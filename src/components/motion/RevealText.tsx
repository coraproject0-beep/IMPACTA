"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type RevealVariant =
  | "depth"
  | "depth-convergence"
  | "slide-lateral"
  | "lateral-assembly"
  | "rotate-plane"
  | "fragment"
  | "tracking-spread"
  | "vertical-mask"
  | "mask-vertical"
  | "lock-in"
  | "clip-wipe"
  | "micro-track";

export interface RevealTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  mode?: "char" | "word" | "line";
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerOnScroll?: boolean;
}

/**
 * RevealText: Authored Motion Typography System (V5.5 Motion Vocabulary)
 *
 * Implements Section 3 & 4:
 * 10 distinct, purposeful motion families with character, word, and line modes.
 * Zero unreadable effects; settles into pristine legibility.
 */
export function RevealText({
  children,
  className = "",
  as = "h2",
  mode = "word",
  variant = "depth",
  delay = 0,
  duration,
  stagger,
  triggerOnScroll = true,
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const targets = el.querySelectorAll(".reveal-unit");
    if (!targets.length) return;

    // Apply distinct motion configuration based on motion family
    let initialProps: gsap.TweenVars = {};
    let animProps: gsap.TweenVars = {};

    switch (variant) {
      case "depth-convergence": // BIG BRAND STATEMENT: characters converge from deep Z with counter-angles
        initialProps = {
          yPercent: 120,
          opacity: 0,
          rotateX: 25,
          rotateY: (i) => (i % 2 === 0 ? 12 : -12),
          z: -120,
          transformOrigin: "50% 100% -60px",
        };
        animProps = {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          duration: duration ?? (mode === "char" ? 0.95 : 1.1),
          stagger: stagger ?? (mode === "char" ? 0.024 : 0.05),
          ease: "power3.out",
          delay,
        };
        break;

      case "lateral-assembly":
      case "slide-lateral": // EVIDENCE STATEMENT: alternating characters enter laterally with clip
        initialProps = {
          x: (i) => (i % 2 === 0 ? -45 : 45),
          opacity: 0,
          skewX: (i) => (i % 2 === 0 ? -8 : 8),
        };
        animProps = {
          x: 0,
          opacity: 1,
          skewX: 0,
          duration: duration ?? 0.85,
          stagger: stagger ?? (mode === "char" ? 0.018 : 0.04),
          ease: "power2.out",
          delay,
        };
        break;

      case "rotate-plane": // DRIVERS / SPATIAL: letters rotate subtly from angled depth planes
        initialProps = {
          rotateY: -22,
          rotateX: 14,
          z: -50,
          yPercent: 40,
          opacity: 0,
          transformOrigin: "0% 50% -40px",
        };
        animProps = {
          rotateY: 0,
          rotateX: 0,
          z: 0,
          yPercent: 0,
          opacity: 1,
          duration: duration ?? 0.85,
          stagger: stagger ?? (mode === "char" ? 0.02 : 0.04),
          ease: "power3.out",
          delay,
        };
        break;

      case "fragment": // WORDS BREAK INTO FRAGMENTS AND RECONSTRUCT
        initialProps = {
          x: (i) => (i % 3 === 0 ? -20 : i % 3 === 1 ? 25 : 0),
          y: (i) => (i % 2 === 0 ? 18 : -14),
          opacity: 0,
          scale: 0.9,
        };
        animProps = {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: duration ?? 0.8,
          stagger: stagger ?? (mode === "char" ? 0.016 : 0.035),
          ease: "power2.out",
          delay,
        };
        break;

      case "tracking-spread": // COMPRESS FROM EXPANDED TRACKING
        initialProps = {
          opacity: 0,
          letterSpacing: "0.15em",
          y: -10,
        };
        animProps = {
          opacity: 1,
          letterSpacing: "normal",
          y: 0,
          duration: duration ?? 0.8,
          stagger: stagger ?? (mode === "char" ? 0.018 : 0.035),
          ease: "power3.out",
          delay,
        };
        break;

      case "lock-in": // HUMAN REVIEW STATEMENT: characters rotate into sharp focal alignment
        initialProps = {
          rotateZ: (i) => (i % 2 === 0 ? -4 : 4),
          scale: 1.15,
          opacity: 0,
          z: 30,
        };
        animProps = {
          rotateZ: 0,
          scale: 1,
          opacity: 1,
          z: 0,
          duration: duration ?? 0.75,
          stagger: stagger ?? (mode === "char" ? 0.022 : 0.04),
          ease: "back.out(1.5)",
          delay,
        };
        break;

      case "clip-wipe": // LETTERS REVEAL THROUGH MOVING CLIPPING PLANE
        initialProps = {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          y: 20,
          opacity: 0,
        };
        animProps = {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          y: 0,
          opacity: 1,
          duration: duration ?? 0.85,
          stagger: stagger ?? (mode === "char" ? 0.02 : 0.04),
          ease: "power2.out",
          delay,
        };
        break;

      case "micro-track": // DATA LABELS & MICROCOPY: subtle baseline slide and tracking expand
        initialProps = {
          opacity: 0,
          y: 8,
          letterSpacing: "0.05em",
        };
        animProps = {
          opacity: 1,
          y: 0,
          letterSpacing: "inherit",
          duration: duration ?? 0.6,
          stagger: stagger ?? 0.015,
          ease: "power2.out",
          delay,
        };
        break;

      case "mask-vertical":
      case "vertical-mask": // TECHNICAL HEADLINE / SAFETY: crisp vertical overflow reveal
        initialProps = {
          yPercent: 110,
          opacity: 0,
        };
        animProps = {
          yPercent: 0,
          opacity: 1,
          duration: duration ?? 0.95,
          stagger: stagger ?? (mode === "char" ? 0.022 : 0.045),
          ease: "power3.out",
          delay,
        };
        break;

      case "depth": // EMERGE FROM Z-DEPTH
      default:
        initialProps = {
          yPercent: 110,
          opacity: 0,
          rotateX: 18,
          z: -60,
          transformOrigin: "50% 100% -40px",
        };
        animProps = {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          z: 0,
          duration: duration ?? (mode === "char" ? 0.85 : 0.95),
          stagger: stagger ?? (mode === "char" ? 0.02 : 0.045),
          ease: "power3.out",
          delay,
        };
        break;
    }

    gsap.set(targets, initialProps);

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
  }, [delay, duration, mode, stagger, triggerOnScroll, variant]);

  const Component = as as React.ElementType;

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
