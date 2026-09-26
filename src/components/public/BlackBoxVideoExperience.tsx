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

  const statement1Ref = useRef<HTMLDivElement>(null);
  const statement2Ref = useRef<HTMLDivElement>(null);
  const statement3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Native continuous autoplay loop: never interrupted or scrubbed by scroll
      video.play().catch(() => {});
    }

    const container = containerRef.current;
    const stage = stageRef.current;
    const wrapper = videoWrapperRef.current;
    const s1 = statement1Ref.current;
    const s2 = statement2Ref.current;
    const s3 = statement3Ref.current;

    if (!container || !stage || !wrapper || !s1 || !s2 || !s3) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([s1, s2], { display: "none" });
      gsap.set(s3, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Initialize statement elements
      gsap.set([s1, s2, s3], {
        opacity: 0,
        y: 28,
        pointerEvents: "none",
      });

      gsap.set(wrapper, {
        scale: 1,
        opacity: 1,
      });

      // Master ScrollTrigger timeline mapped across the genuine 400vh scroll container
      // Four distinct sub-scenes with generous resting / dwell windows:
      // Sub-scene 1 (0.00 -> 0.22): Black Box visual establishes in stillness
      // Sub-scene 2 (0.24 -> 0.46): Statement 1 ("EVERY FRAGMENT") enters, rests, exits
      // Sub-scene 3 (0.48 -> 0.72): Statement 2 ("ONE REVIEWABLE RECORD") enters, rests, exits
      // Sub-scene 4 (0.74 -> 1.00): Statement 3 ("READY FOR HUMAN REVIEW") enters, settles, rests
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      // SUB-SCENE 1: Visual establishes (0.00 -> 0.22)
      // Dwell period on raw video object
      tl.to({}, { duration: 0.22 });

      // SUB-SCENE 2: Statement 1 entrance & dwell (0.22 -> 0.46)
      tl.to(
        s1,
        {
          opacity: 1,
          y: 0,
          duration: 0.06,
          ease: "power2.out",
        },
        0.22
      )
        // Dwell while user reads
        .to({}, { duration: 0.14 })
        // Fade out before next scene
        .to(
          s1,
          {
            opacity: 0,
            y: -24,
            duration: 0.05,
            ease: "power2.in",
          },
          0.42
        );

      // SUB-SCENE 3: Statement 2 entrance & dwell (0.48 -> 0.72)
      tl.to(
        s2,
        {
          opacity: 1,
          y: 0,
          duration: 0.06,
          ease: "power2.out",
        },
        0.48
      )
        // Dwell while user reads
        .to({}, { duration: 0.14 })
        // Fade out before next scene
        .to(
          s2,
          {
            opacity: 0,
            y: -24,
            duration: 0.05,
            ease: "power2.in",
          },
          0.68
        );

      // SUB-SCENE 4: Statement 3 entrance & settle (0.74 -> 1.00)
      tl.to(
        wrapper,
        {
          opacity: 0.2,
          scale: 0.94,
          duration: 0.08,
          ease: "power2.out",
        },
        0.74
      ).to(
        s3,
        {
          opacity: 1,
          y: 0,
          duration: 0.08,
          ease: "power2.out",
        },
        0.76
      );
      // Holds steady at 100% through the end of the chapter
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="black-box"
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[#000000] text-white selection:bg-white selection:text-black"
    >
      {/* Pinned / Sticky Stage Viewport (100vh) */}
      <div
        ref={stageRef}
        className="sticky top-0 w-full h-[100vh] min-h-[640px] flex items-center justify-center overflow-hidden bg-[#000000]"
      >
        {/* Subtle radial depth gradient in the background void matching video tone */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_50%,rgba(20,21,25,0.5)_0%,rgba(0,0,0,1)_100%)] pointer-events-none" />

        {/* CENTRAL HERO BLACK BOX VIDEO (Native autoplaying loop, seamless void dissolve) */}
        <div
          ref={videoWrapperRef}
          className="relative z-10 w-[95vw] sm:w-[85vw] max-w-5xl h-[65vh] sm:h-[75vh] max-h-[780px] flex items-center justify-center pointer-events-none select-none will-change-transform"
          style={{
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

        {/* SUB-SCENE 2 STATEMENT: Huge Editorial Typography */}
        <div
          ref={statement1Ref}
          className="absolute z-20 inset-0 flex items-center justify-center pointer-events-none select-none px-6 text-center"
        >
          <div className="max-w-5xl">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white uppercase leading-[0.95] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
              {isIt ? "OGNI FRAMMENTO." : "EVERY FRAGMENT."}
            </h2>
          </div>
        </div>

        {/* SUB-SCENE 3 STATEMENT: Huge Editorial Typography */}
        <div
          ref={statement2Ref}
          className="absolute z-20 inset-0 flex items-center justify-center pointer-events-none select-none px-6 text-center"
        >
          <div className="max-w-5xl">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white uppercase leading-[0.98] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
              {isIt ? "UN UNICO RECORD DA VERIFICARE." : "ONE REVIEWABLE RECORD."}
            </h2>
          </div>
        </div>

        {/* SUB-SCENE 4 STATEMENT: Human Review Settle */}
        <div
          ref={statement3Ref}
          className="absolute z-20 inset-0 flex items-center justify-center pointer-events-none select-none px-6 text-center"
        >
          <div className="max-w-5xl space-y-6">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white uppercase leading-[1.02] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
              {isIt ? "PRONTO PER LA REVISIONE UMANA." : "READY FOR HUMAN REVIEW."}
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
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
