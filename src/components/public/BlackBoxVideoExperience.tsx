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
      // Master ScrollTrigger timeline pinned across the 240vh scroll volume
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=160%",
          pin: stage,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Initial state
      gsap.set(line1, {
        x: "-28vw",
        z: -180,
        opacity: 0,
        scale: 0.92,
      });

      gsap.set(line2, {
        x: "28vw",
        z: -180,
        opacity: 0,
        scale: 0.92,
      });

      gsap.set(wrapper, {
        scale: 0.94,
        opacity: 0.9,
      });

      gsap.set(exitStatement, {
        opacity: 0,
        scale: 0.94,
        y: 30,
      });

      // 1. Kinetic Typography Entrance (0.0 -> 0.32)
      // Large typography sweeps in from depth/sides while video scales up to focal presence
      tl.to(
        line1,
        {
          x: "0vw",
          z: 0,
          opacity: 0.92,
          scale: 1,
          ease: "power2.out",
          duration: 0.3,
        },
        0
      )
        .to(
          line2,
          {
            x: "0vw",
            z: 0,
            opacity: 0.88,
            scale: 1,
            ease: "power2.out",
            duration: 0.3,
          },
          0.04
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

        // 2. Collision Window: Purge Competing Text (0.34 -> 0.65)
        // Typography fades and recedes deep into Z-space so vehicle impact is 100% unobstructed
        .to(
          [line1, line2],
          {
            opacity: 0,
            scale: 0.82,
            z: -350,
            ease: "power2.in",
            duration: 0.2,
          },
          0.36
        )

        // Hold purely on the video during collision
        .to({}, { duration: 0.15 })

        // 3. Black Box Exit Statement (0.72 -> 0.95)
        // Video gently recedes and final statement emerges with human review focus
        .to(
          wrapper,
          {
            opacity: 0.25,
            scale: 0.94,
            filter: "blur(2px)",
            ease: "power1.inOut",
            duration: 0.2,
          },
          0.72
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
          0.75
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
      className="relative w-full bg-[#000000] text-white selection:bg-white selection:text-black"
    >
      {/* Pinned Stage Viewport (100vh) */}
      <div
        ref={stageRef}
        className="relative w-full h-[100vh] min-h-[640px] flex items-center justify-center overflow-hidden bg-[#000000]"
        style={{ perspective: "1400px" }}
      >
        {/* Subtle radial depth gradient in the background void */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(35,37,42,0.45)_0%,rgba(0,0,0,1)_100%)] pointer-events-none" />

        {/* KINETIC TYPOGRAPHY LAYER 1 (Positioned in 3D upper-half behind/around video) */}
        <div
          ref={textLine1Ref}
          aria-hidden="true"
          className="absolute z-10 top-[18%] sm:top-[16%] lg:top-[14%] w-full text-center pointer-events-none select-none px-4"
          style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
        >
          <div className="font-bold tracking-[-0.035em] uppercase text-white/90 leading-none whitespace-nowrap text-[12vw] sm:text-[13vw] lg:text-[13.5vw]">
            {isIt ? "OGNI FRAMMENTO." : "EVERY FRAGMENT."}
          </div>
        </div>

        {/* CENTRAL VIDEO CONTAINER (Continuous Autoplay, Seamless Edge Masking) */}
        <div
          ref={videoWrapperRef}
          className="relative z-20 w-full h-full max-w-[1540px] max-h-[920px] flex items-center justify-center px-4 sm:px-8 pointer-events-none select-none"
          style={{
            willChange: "transform, opacity",
            maskImage:
              "radial-gradient(ellipse 92% 88% at 50% 50%, black 72%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 92% 88% at 50% 50%, black 72%, transparent 100%)",
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

        {/* KINETIC TYPOGRAPHY LAYER 2 (Positioned in 3D lower-half behind/around video) */}
        <div
          ref={textLine2Ref}
          aria-hidden="true"
          className="absolute z-10 bottom-[16%] sm:bottom-[15%] lg:bottom-[13%] w-full text-center pointer-events-none select-none px-4"
          style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
        >
          <div className="font-bold tracking-[-0.03em] uppercase text-neutral-300/85 leading-none whitespace-nowrap text-[8.5vw] sm:text-[9.5vw] lg:text-[10vw]">
            {isIt ? "UN UNICO RECORD DA VERIFICARE." : "ONE REVIEWABLE RECORD."}
          </div>
        </div>

        {/* BLACK BOX EXIT STATEMENT (Appears as video closes, before next chapter) */}
        <div
          ref={exitStatementRef}
          className="absolute z-30 inset-0 flex items-center justify-center pointer-events-none select-none px-6 text-center"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="max-w-4xl space-y-3">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-neutral-400 font-mono block">
              {isIt ? "STATO FINALE DEL SINISTRO" : "SYNTHESIZED CLAIM STATE"}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-[1.08]">
              {isIt ? "PRONTO PER LA REVISIONE UMANA." : "READY FOR HUMAN REVIEW."}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
