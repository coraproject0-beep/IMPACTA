"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { CameraIcon, CheckCircleIcon, ShieldIcon } from "@/components/icons/Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type StationKey = "driver" | "buffer" | "insurer";

const STATION_OFFSETS: Record<StationKey, number> = {
  driver: -28,
  buffer: 0,
  insurer: 28,
};

export function HomeClosingTransition() {
  const { t, language } = useLanguage();
  const isIt = language === "it";

  const [activeStation, setActiveStation] = useState<StationKey>("buffer");
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.to(card, {
      xPercent: STATION_OFFSETS[activeStation],
      rotateY: activeStation === "driver" ? 6 : activeStation === "insurer" ? -6 : 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, [activeStation]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        title,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
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
      ref={sectionRef}
      className="relative w-full bg-[#0A0A0C] text-white py-28 sm:py-40 px-6 sm:px-12 lg:px-20 overflow-hidden select-none border-t border-white/10"
      style={{ perspective: "1200px" }}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(35,38,45,0.35)_0%,rgba(10,10,12,1)_100%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto space-y-16 lg:space-y-24">
        {/* 1. KINETIC ENDING TYPOGRAPHY */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-neutral-400 font-mono block">
            {t("homeClosing.tag")}
          </span>

          <h2
            ref={titleRef}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-[-0.035em] text-white leading-[0.95]"
          >
            <span className="block">{t("homeClosing.titleLine1")}</span>
            <span className="block text-neutral-400">{t("homeClosing.titleLine2")}</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto pt-2">
            {t("homeClosing.subtitle")}
          </p>
        </div>

        {/* 2. SPATIAL THREE-STATION CONTINUUM */}
        <div className="space-y-8">
          {/* Interactive Station Segment Switcher */}
          <div className="flex flex-wrap justify-center items-center gap-3">
            {(["driver", "buffer", "insurer"] as StationKey[]).map((station) => {
              const isActive = activeStation === station;
              const label =
                station === "driver"
                  ? t("homeClosing.stageDriver")
                  : station === "buffer"
                  ? t("homeClosing.stageUnified")
                  : t("homeClosing.stageInsurer");

              return (
                <button
                  key={station}
                  type="button"
                  onClick={() => setActiveStation(station)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? "bg-white text-black shadow-lg scale-105"
                      : "bg-white/5 hover:bg-white/10 text-neutral-400 border border-white/10"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* 3D Visual Stage with Traveling Evidence Plane */}
          <div
            className="relative w-full min-h-[380px] sm:min-h-[440px] rounded-3xl bg-[#111215] border border-white/10 p-6 sm:p-10 flex flex-col justify-between overflow-hidden shadow-2xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Background Grid Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

            {/* Station Anchors */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs border-b border-white/10 pb-6">
              <div
                onClick={() => setActiveStation("driver")}
                className={`cursor-pointer p-4 rounded-xl transition-all duration-300 ${
                  activeStation === "driver" ? "bg-white/10 text-white" : "opacity-40 hover:opacity-75 text-neutral-400"
                }`}
              >
                <div className="flex items-center gap-2 font-mono uppercase tracking-wider text-[11px] mb-1">
                  <CameraIcon size={14} />
                  <span>1. {t("homeClosing.stageDriver")}</span>
                </div>
                <p className="text-[11px] font-light leading-relaxed">{t("homeClosing.stageDriverDesc")}</p>
              </div>

              <div
                onClick={() => setActiveStation("buffer")}
                className={`cursor-pointer p-4 rounded-xl transition-all duration-300 ${
                  activeStation === "buffer" ? "bg-white/10 text-white" : "opacity-40 hover:opacity-75 text-neutral-400"
                }`}
              >
                <div className="flex items-center gap-2 font-mono uppercase tracking-wider text-[11px] mb-1">
                  <ShieldIcon size={14} />
                  <span>2. {t("homeClosing.stageUnified")}</span>
                </div>
                <p className="text-[11px] font-light leading-relaxed">{t("homeClosing.stageUnifiedDesc")}</p>
              </div>

              <div
                onClick={() => setActiveStation("insurer")}
                className={`cursor-pointer p-4 rounded-xl transition-all duration-300 ${
                  activeStation === "insurer" ? "bg-white/10 text-white" : "opacity-40 hover:opacity-75 text-neutral-400"
                }`}
              >
                <div className="flex items-center gap-2 font-mono uppercase tracking-wider text-[11px] mb-1">
                  <CheckCircleIcon size={14} />
                  <span>3. {t("homeClosing.stageInsurer")}</span>
                </div>
                <p className="text-[11px] font-light leading-relaxed">{t("homeClosing.stageInsurerDesc")}</p>
              </div>
            </div>

            {/* Traveling 3D Dossier Card */}
            <div className="relative z-20 my-auto py-6 flex items-center justify-center">
              <div
                ref={cardRef}
                className="w-full max-w-md bg-[#18191E]/95 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-4 transition-shadow hover:shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                      VERIFIABLE CLAIM RECORD
                    </span>
                    <div className="text-sm font-bold font-mono text-white">IMP-260925-014</div>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">14:22:08 UTC</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-neutral-300 py-1 border-b border-white/5">
                    <span className="text-neutral-400 font-light">{isIt ? "Stato rilievo" : "Intake status"}</span>
                    <span className="font-semibold text-white">{isIt ? "4 prospetti verificati" : "4 angles verified"}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300 py-1 border-b border-white/5">
                    <span className="text-neutral-400 font-light">{isIt ? "Modulo CAI" : "CAI Circumstance"}</span>
                    <span className="font-semibold text-white">{isIt ? "Casella 12 • Stesso senso" : "Box 12 • Same direction"}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300 py-1">
                    <span className="text-neutral-400 font-light">{isIt ? "Destinazione" : "Destination"}</span>
                    <span className="font-semibold text-neutral-200">{isIt ? "Perizia umana abilitata" : "Licensed adjuster desk"}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-white/10">
                  <span>SHA-256: 7f8a...c91e</span>
                  <span className="text-neutral-300">
                    {activeStation === "driver"
                      ? "STATION: ROADSIDE"
                      : activeStation === "buffer"
                      ? "STATION: LOCAL BUFFER"
                      : "STATION: ADJUSTER DESK"}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Dual Entry CTAs */}
            <div className="relative z-10 pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 text-xs">
              <Link
                href="/app/report"
                className="group inline-flex items-center gap-2 text-neutral-300 hover:text-white font-medium transition-colors"
              >
                <span>{isIt ? "Prova l'interfaccia conducente" : "Explore driver workflow"}</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>

              <Link
                href="/insurers"
                className="group inline-flex items-center gap-2 text-neutral-300 hover:text-white font-medium transition-colors"
              >
                <span>{isIt ? "Esplora banco liquidatori" : "Explore claims desk"}</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Truthful Academic/Demo Disclosure */}
        <div className="text-center pt-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-neutral-500">
            {isIt
              ? "CONTINUUM PROBATORIO DIMOSTRATIVO • SIMULAZIONE ACCADEMICA LOCALE"
              : "CONCEPTUAL DATA CONTINUUM • LOCAL DEMONSTRATION RECORD"}
          </span>
        </div>
      </div>
    </section>
  );
}
