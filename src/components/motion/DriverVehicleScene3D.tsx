"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function DriverVehicleScene3D() {
  const { locale } = useLanguage();
  const isIt = locale === "it";

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const carGroupRef = useRef<SVGGElement>(null);
  const damageContourRef = useRef<SVGPathElement>(null);
  const focusBracketRef = useRef<SVGGElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    const carGroup = carGroupRef.current;
    const damageContour = damageContourRef.current;
    const focusBracket = focusBracketRef.current;
    const cta = ctaRef.current;

    if (!container || !card) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (damageContour) gsap.set(damageContour, { opacity: 1 });
      if (focusBracket) gsap.set(focusBracket, { opacity: 1, scale: 1 });
      if (cta) gsap.set(cta, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Initial 3D stance: turned away in space
      gsap.set(card, {
        rotateY: -16,
        rotateX: 10,
        z: -30,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      });

      // 2. Initial state of animated vehicle elements
      if (carGroup) {
        gsap.set(carGroup, { y: 20, opacity: 0 });
      }
      if (damageContour) {
        gsap.set(damageContour, { opacity: 0, strokeDashoffset: 100 });
      }
      if (focusBracket) {
        gsap.set(focusBracket, { opacity: 0, scale: 1.15 });
      }
      if (cta) {
        gsap.set(cta, { opacity: 0, y: 10 });
      }

      // 3. ScrollTrigger Choreography Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 78%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      });

      // Step A: Card rotates toward viewer in 3D
      tl.to(
        card,
        {
          rotateY: -5,
          rotateX: 3,
          z: 0,
          duration: 1.1,
          ease: "power3.out",
        },
        0
      );

      // Step B: Car silhouette slides in from depth
      if (carGroup) {
        tl.to(
          carGroup,
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
          },
          0.2
        );
      }

      // Step C: Damage contour appears & panel geometry shifts subtly
      if (damageContour) {
        tl.to(
          damageContour,
          {
            opacity: 1,
            strokeDashoffset: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          0.6
        );
      }

      // Step D: Optical viewfinder brackets slide and lock into place around impact point
      if (focusBracket) {
        tl.to(
          focusBracket,
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.4)",
          },
          0.8
        );
      }

      // Step E: CTA appears last
      if (cta) {
        tl.to(
          cta,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          1.0
        );
      }

      // 4. Subtle exit rotation as user scrolls past
      ScrollTrigger.create({
        trigger: container,
        start: "bottom 40%",
        end: "bottom -20%",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(card, {
            rotateY: -5 + p * 12,
            rotateX: 3 - p * 8,
            z: -p * 40,
          });
        },
      });
    }, container);

    // Mouse parallax tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMouseOffset({ x, y });
    };

    const handleMouseLeave = () => {
      setMouseOffset({ x: 0, y: 0 });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      ctx.revert();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-center [perspective:1200px] select-none py-4"
    >
      <div
        ref={cardRef}
        style={{
          transform: `rotateY(${-5 + mouseOffset.x * 10}deg) rotateX(${
            3 - mouseOffset.y * 8
          }deg)`,
          transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-sm sm:max-w-md bg-[#0F1013] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] text-white"
      >
        {/* Layer 1: Minimalist Clean Header (Zero noise, no status dots or fake step pills) */}
        <div
          className="pb-5 border-b border-white/10 space-y-1"
          style={{ transform: "translateZ(18px)" }}
        >
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/50 block">
            {isIt ? "RILIEVO GUIDATO" : "GUIDED CAPTURE"}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
            {isIt ? "Inquadra l'area dell'impatto." : "Capture the impact area."}
          </h3>
        </div>

        {/* Layer 2: Central Stylized Automotive Damage Animation Plane */}
        <div
          className="py-6 flex flex-col items-center justify-center"
          style={{ transform: "translateZ(35px)" }}
        >
          <div className="relative w-full aspect-[4/3] max-w-[320px] rounded-xl bg-[#090A0C] border border-white/10 flex items-center justify-center overflow-hidden">
            {/* Fine architectural coordinate watermark */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-white/30 tracking-widest">
              45.464° N • 9.190° E
            </div>
            <div className="absolute top-3 right-3 text-[10px] font-mono text-white/30 tracking-widest">
              ANG 42°
            </div>

            {/* Stylized Vehicle Silhouette SVG */}
            <svg
              viewBox="0 0 240 160"
              className="w-[85%] h-[85%] overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g ref={carGroupRef}>
                {/* Vehicle Chassis Outline (Minimal Top-Down Silhouette) */}
                <path
                  d="M 50,80 C 50,56 62,48 90,48 L 155,48 C 185,48 195,58 195,80 C 195,102 185,112 155,112 L 90,112 C 62,112 50,104 50,80 Z"
                  stroke="#3A3D45"
                  strokeWidth="1.5"
                  fill="#121316"
                />

                {/* Windshield & Cabin Glass contour */}
                <path
                  d="M 85,58 L 140,58 C 148,58 155,64 155,80 C 155,96 148,102 140,102 L 85,102 C 82,90 82,70 85,58 Z"
                  stroke="#26282E"
                  strokeWidth="1.2"
                  fill="#0D0E10"
                />

                {/* Roof & Hood structural character lines */}
                <line x1="90" y1="80" x2="165" y2="80" stroke="#222429" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 68,60 C 72,70 72,90 68,100" stroke="#2E3038" strokeWidth="1" />
                <path d="M 175,60 C 172,70 172,90 175,100" stroke="#2E3038" strokeWidth="1" />

                {/* Front Left Fender / Contact Panel (Subtly highlighted) */}
                <path
                  d="M 50,80 C 50,65 56,52 74,50"
                  stroke="#5A5E6B"
                  strokeWidth="2"
                />

                {/* Animated Damage Highlight Contour */}
                <path
                  ref={damageContourRef}
                  d="M 51,78 C 52,66 58,54 75,51"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="transition-all"
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(255,255,255,0.6))",
                  }}
                />

                {/* Dynamic Contact Angle Vector Arrow */}
                <g style={{ transform: "translate(42px, 42px)" }}>
                  <line x1="0" y1="0" x2="14" y2="14" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 14,8 L 14,14 L 8,14" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </g>

              {/* Viewfinder Brackets aligning around damage zone */}
              <g ref={focusBracketRef} style={{ transformOrigin: "60px 60px" }}>
                {/* Top-left corner */}
                <path d="M 36,46 L 36,36 L 46,36" stroke="#FFFFFF" strokeWidth="1.5" fill="none" strokeLinecap="square" />
                {/* Top-right corner */}
                <path d="M 82,36 L 92,36 L 92,46" stroke="#FFFFFF" strokeWidth="1.5" fill="none" strokeLinecap="square" />
                {/* Bottom-left corner */}
                <path d="M 36,80 L 36,90 L 46,90" stroke="#FFFFFF" strokeWidth="1.5" fill="none" strokeLinecap="square" />
                {/* Bottom-right corner */}
                <path d="M 92,80 L 92,90 L 82,90" stroke="#FFFFFF" strokeWidth="1.5" fill="none" strokeLinecap="square" />
              </g>
            </svg>

            {/* Subtle calibration indicator pill */}
            <div className="absolute bottom-3 text-center">
              <span className="text-[11px] font-mono text-white/70 bg-black/60 backdrop-blur px-2.5 py-0.5 rounded border border-white/10">
                {isIt ? "Punto d'urto localizzato" : "Contact zone aligned"}
              </span>
            </div>
          </div>
        </div>

        {/* Layer 3: Minimal Primary Action (No redundant technical claims) */}
        <div
          ref={ctaRef}
          className="pt-4 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm"
          style={{ transform: "translateZ(24px)" }}
        >
          <span className="text-white/40 font-mono text-[11px]">
            {isIt ? "Orientamento verificato" : "Heading aligned"}
          </span>
          <span className="font-semibold text-white tracking-wide">
            {isIt ? "Scatta foto" : "Take photo"} →
          </span>
        </div>
      </div>
    </div>
  );
}
