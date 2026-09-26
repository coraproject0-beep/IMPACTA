"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlackBoxVideoExperience() {
  const { language } = useLanguage();
  const isIt = language === "it";

  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const textLine1Ref = useRef<HTMLDivElement>(null);
  const textLine2Ref = useRef<HTMLDivElement>(null);
  const exitStatementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Native continuous autoplay loop: never interrupted by scroll
      video.play().catch(() => {});
    }

    const container = containerRef.current;
    const stage = stageRef.current;
    const wrapper = videoWrapperRef.current;
    const line1 = textLine1Ref.current;
    const line2 = textLine2Ref.current;
    const exitStatement = exitStatementRef.current;

    if (!container || !stage || !wrapper || !line1 || !line2 || !exitStatement) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([line1, line2], { opacity: 0 });
      gsap.set(exitStatement, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Master ScrollTrigger timeline pinned across the stage
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=170%",
          pin: stage,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // Initial state: lines positioned along their respective upper & lower safe corridors
      gsap.set(line1, {
        x: "-14vw",
        z: -120,
        opacity: 0,
        scale: 0.95,
      });

      gsap.set(line2, {
        x: "14vw",
        z: -120,
        opacity: 0,
        scale: 0.95,
      });

      gsap.set(wrapper, {
        scale: 0.95,
        opacity: 0.95,
        filter: "blur(0px)",
      });

      gsap.set(exitStatement, {
        opacity: 0,
        scale: 0.92,
        y: 25,
      });

      // 1. Kinetic Typography Entrance (0.0 -> 0.32)
      // Line 1 drifts upper-left -> upper-right; Line 2 counter-travels lower-right -> lower-left
      // Both stay strictly in their upper/lower bands outside the central 56vw x 62vh safe zone
      tl.to(
        line1,
        {
          x: "3vw",
          z: 0,
          opacity: 0.95,
          scale: 1,
          ease: "power2.out",
          duration: 0.32,
        },
        0
      )
        .to(
          line2,
          {
            x: "-3vw",
            z: 0,
            opacity: 0.9,
            scale: 1,
            ease: "power2.out",
            duration: 0.32,
          },
          0.02
        )
        .to(
          wrapper,
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            duration: 0.3,
          },
          0
        )

        // 2. Collision Window: Total Clearance (0.34 -> 0.66)
        // Typography completely fades and recedes backward in Z-space so vehicular impact is 100% unobstructed
        .to(
          [line1, line2],
          {
            opacity: 0,
            scale: 0.84,
            z: -300,
            ease: "power2.in",
            duration: 0.16,
          },
          0.34
        )

        // Pure video focus during collision & reconstruction
        .to({}, { duration: 0.18 })

        // 3. Black Box Exit Statement (0.70 -> 0.92)
        // Video gently recedes and dims into the dark void; final statement appears dead-center without any technical labels
        .to(
          wrapper,
          {
            opacity: 0.22,
            scale: 0.94,
            filter: "blur(2px)",
            ease: "power1.inOut",
            duration: 0.2,
          },
          0.7
        )
        .to(
          exitStatement,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.2,
          },
          0.72
        )

        // 4. Cinematic Exit Handoff (0.92 -> 1.0)
        // Scene recedes gracefully into the deep darkness toward the next chapter
        .to(
          [exitStatement, wrapper],
          {
            opacity: 0.85,
            scale: 0.96,
            ease: "power1.in",
            duration: 0.08,
          },
          0.92
        );
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="black-box"
      ref={containerRef}
      className="relative w-full bg-[#000000] text-white selection:bg-white selection:text-black overflow-hidden"
    >
      {/* Pinned Stage Viewport (100vh) */}
      <div
        ref={stageRef}
        className="relative w-full h-[100vh] min-h-[640px] flex items-center justify-center overflow-hidden bg-[#000000]"
        style={{ perspective: "1400px" }}
      >
        {/* Subtle radial depth gradient in the background void matching video tone */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(18,19,22,0.45)_0%,rgba(0,0,0,1)_100%)] pointer-events-none" />

        {/* KINETIC TYPOGRAPHY LAYER WITH CENTRAL EXCLUSION MASK */}
        {/* The mask cuts out the central 56vw x 62vh footprint so letters CANNOT touch the Black Box geometry */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none select-none overflow-hidden z-10"
          style={{
            maskImage:
              "radial-gradient(ellipse 58vw 62vh at 50% 50%, transparent 58%, black 88%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 58vw 62vh at 50% 50%, transparent 58%, black 88%)",
          }}
        >
          {/* Upper Horizon Corridor (Line 1) */}
          <div
            ref={textLine1Ref}
            className="absolute top-[6%] sm:top-[7%] lg:top-[8%] w-full text-center px-4"
            style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
          >
            <div className="font-bold tracking-[-0.035em] uppercase text-white/95 leading-none whitespace-nowrap text-[6.5vw] sm:text-[7vw] lg:text-[7.2vw]">
              {isIt ? "OGNI FRAMMENTO." : "EVERY FRAGMENT."}
            </div>
          </div>

          {/* Lower Horizon Corridor (Line 2) */}
          <div
            ref={textLine2Ref}
            className="absolute bottom-[6%] sm:bottom-[7%] lg:bottom-[8%] w-full text-center px-4"
            style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
          >
            <div className="font-bold tracking-[-0.03em] uppercase text-neutral-300/90 leading-none whitespace-nowrap text-[5vw] sm:text-[5.4vw] lg:text-[5.6vw]">
              {isIt ? "UN UNICO RECORD DA VERIFICARE." : "ONE REVIEWABLE RECORD."}
            </div>
          </div>
        </div>

        {/* CENTRAL VIDEO CONTAINER (Continuous Autoplay, Seamless Feathered Dissolve) */}
        {/* Soft feathered radial mask completely dissolves the top-left flare & all 4 outer edges into #000000 */}
        <div
          ref={videoWrapperRef}
          className="relative z-20 w-full h-full max-w-[1480px] max-h-[880px] flex items-center justify-center px-4 sm:px-8 pointer-events-none select-none"
          style={{
            willChange: "transform, opacity",
            maskImage:
              "radial-gradient(ellipse 78% 74% at 50% 50%, black 46%, rgba(0,0,0,0.85) 62%, transparent 88%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 78% 74% at 50% 50%, black 46%, rgba(0,0,0,0.85) 62%, transparent 88%)",
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

        {/* BLACK BOX EXIT STATEMENT (Clean, authorial, zero technical eyebrows) */}
        <div
          ref={exitStatementRef}
          className="absolute z-30 inset-0 flex items-center justify-center pointer-events-none select-none px-6 text-center"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[1.05]">
              {isIt ? "PRONTO PER LA REVISIONE UMANA." : "READY FOR HUMAN REVIEW."}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
