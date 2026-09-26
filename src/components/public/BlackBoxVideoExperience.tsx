"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlackBoxVideoExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Ensure video plays continuously as a normal autoplay video
      video.play().catch(() => {
        // Autoplay policy fallback: muted autoplay is supported in all modern browsers
      });
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const section = sectionRef.current;
    const wrapper = videoWrapperRef.current;
    if (!section || !wrapper) return;

    // Cinematic entry and exit scale/fade transition without interfering with video playback
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapper,
        { scale: 0.94, opacity: 0.85 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        wrapper,
        { scale: 1, opacity: 1 },
        {
          scale: 0.95,
          opacity: 0.8,
          duration: 1.2,
          ease: "power2.in",
          scrollTrigger: {
            trigger: section,
            start: "bottom 60%",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="black-box"
      ref={sectionRef}
      className="relative w-full h-[100vh] lg:h-[110vh] min-h-[640px] bg-[#000000] flex items-center justify-center overflow-hidden select-none"
    >
      <div
        ref={videoWrapperRef}
        className="relative w-full h-full max-w-[1600px] max-h-[960px] flex items-center justify-center px-4 sm:px-8"
        style={{
          maskImage:
            "radial-gradient(ellipse 96% 92% at 50% 50%, black 82%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 96% 92% at 50% 50%, black 82%, transparent 100%)",
        }}
      >
        <video
          ref={videoRef}
          src="/media/blackbox-motion-study.mp4"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>
    </section>
  );
}
