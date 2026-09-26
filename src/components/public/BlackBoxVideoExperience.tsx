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

  const topRailRef = useRef<HTMLDivElement>(null);
  const bottomRailRef = useRef<HTMLDivElement>(null);
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
    const topRail = topRailRef.current;
    const bottomRail = bottomRailRef.current;
    const exitStatement = exitStatementRef.current;

    if (!container || !stage || !wrapper || !topRail || !bottomRail || !exitStatement) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([topRail, bottomRail], { opacity: 0 });
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

      // Initial state: top and bottom atmospheric overlays staged outside collision zone
      gsap.set(topRail, {
        x: "-5vw",
        z: -25,
        opacity: 0,
        filter: "blur(4px)",
        scale: 0.98,
      });

      gsap.set(bottomRail, {
        x: "5vw",
        z: -25,
        opacity: 0,
        filter: "blur(4px)",
        scale: 0.98,
      });

      gsap.set(wrapper, {
        scale: 0.98,
        opacity: 1,
        filter: "blur(0px)",
      });

      gsap.set(exitStatement, {
        opacity: 0,
        scale: 0.94,
        y: 20,
      });

      // 1. Kinetic Typography Entrance (0.0 -> 0.32)
      // Atmosphere overlays appear gently with subtle drift; never dominate or compete with video
      tl.to(
        topRail,
        {
          x: "0vw",
          z: 0,
          opacity: 0.35,
          filter: "blur(0px)",
          scale: 1,
          ease: "power2.out",
          duration: 0.32,
        },
        0
      )
        .to(
          bottomRail,
          {
            x: "0vw",
            z: 0,
            opacity: 0.35,
            filter: "blur(0px)",
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

        // 2. Collision Window: Total Atmospheric Clearance (0.34 -> 0.66)
        // Overlays vanish completely during impact so the Black Box has 100% stage dominance
        .to(
          topRail,
          {
            opacity: 0,
            y: -18,
            filter: "blur(4px)",
            ease: "power2.in",
            duration: 0.16,
          },
          0.34
        )
        .to(
          bottomRail,
          {
            opacity: 0,
            y: 18,
            filter: "blur(4px)",
            ease: "power2.in",
            duration: 0.16,
          },
          0.34
        )

        // Pure video focus during collision & reassembly
        .to({}, { duration: 0.18 })

        // 3. Black Box Exit Statement (0.70 -> 0.92)
        // Video gently recedes and dims into the dark void; final statement appears dead-center
        .to(
          wrapper,
          {
            opacity: 0.16,
            scale: 0.94,
            filter: "blur(3px)",
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
            scale: 0.97,
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
      style={{ backgroundColor: "var(--blackbox-void, #000000)" }}
    >
      {/* Pinned Stage Viewport (100vh) */}
      <div
        ref={stageRef}
        className="relative w-full h-[100vh] min-h-[640px] flex items-center justify-center overflow-hidden bg-[#000000]"
        style={{
          perspective: "1400px",
          backgroundColor: "var(--blackbox-void, #000000)",
        }}
      >
        {/* Subtle radial depth gradient in the background void matching video tone */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(18,19,22,0.45)_0%,rgba(0,0,0,1)_100%)] pointer-events-none" />

        {/* TOP TYPOGRAPHIC OVERLAY: Subtle Atmospheric Whisper */}
        <div
          ref={topRailRef}
          aria-hidden="true"
          className="absolute z-30 w-full text-center px-6 pointer-events-none select-none"
          style={{
            top: "clamp(96px, 14vh, 180px)",
            transformStyle: "preserve-3d",
            willChange: "transform, opacity, filter",
          }}
        >
          <div className="font-bold tracking-tight uppercase text-white/35 leading-none whitespace-nowrap text-[clamp(1.35rem,3.2vw,2.75rem)]">
            {isIt ? "OGNI FRAMMENTO." : "EVERY FRAGMENT."}
          </div>
        </div>

        {/* CENTRAL HERO BLACK BOX VIDEO (Large Dominant Footprint, Seamless Void Dissolve) */}
        <div
          ref={videoWrapperRef}
          className="relative z-20 w-[125vw] h-[68vh] -mx-[12.5vw] sm:w-[88vw] sm:h-[80vh] sm:mx-0 sm:min-h-[580px] sm:max-h-[820px] flex items-center justify-center pointer-events-none select-none"
          style={{
            willChange: "transform, opacity",
            maskImage:
              "radial-gradient(ellipse 76% 72% at 50% 50%, #000000 48%, rgba(0,0,0,0.92) 64%, rgba(0,0,0,0.45) 80%, rgba(0,0,0,0.1) 90%, transparent 98%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 76% 72% at 50% 50%, #000000 48%, rgba(0,0,0,0.92) 64%, rgba(0,0,0,0.45) 80%, rgba(0,0,0,0.1) 90%, transparent 98%)",
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

        {/* BOTTOM TYPOGRAPHIC OVERLAY: Subtle Atmospheric Whisper */}
        <div
          ref={bottomRailRef}
          aria-hidden="true"
          className="absolute z-30 w-full text-center px-6 pointer-events-none select-none"
          style={{
            bottom: "clamp(48px, 12vh, 140px)",
            transformStyle: "preserve-3d",
            willChange: "transform, opacity, filter",
          }}
        >
          <div className="font-bold tracking-tight uppercase text-neutral-300/35 leading-none whitespace-nowrap text-[clamp(1.2rem,2.8vw,2.2rem)]">
            {isIt ? "UN UNICO RECORD DA VERIFICARE." : "ONE REVIEWABLE RECORD."}
          </div>
        </div>

        {/* BLACK BOX EXIT STATEMENT (Clean, authorial, zero technical eyebrows) */}
        <div
          ref={exitStatementRef}
          className="absolute z-40 inset-0 flex items-center justify-center pointer-events-none select-none px-6 text-center"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="max-w-4xl space-y-4">
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[1.05]">
              {isIt ? "PRONTO PER LA REVISIONE UMANA." : "READY FOR HUMAN REVIEW."}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-white/60 font-light max-w-2xl mx-auto">
              {isIt
                ? "Sinistro ricostruito da telemetria, evidenze visive e testimonianza del conducente."
                : "Incident reconstructed from telemetry, visual evidence, and driver testimony."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
