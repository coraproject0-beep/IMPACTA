"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  PhoneIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
} from "@/components/icons/Icons";
import { Emergency112DemoModal } from "@/features/driver/components/Emergency112DemoModal";
import { formatDate } from "@/lib/dateUtils";

type GuidanceStage = "BEFORE" | "SCENE" | "AFTER";

export default function DriverInsurancePage() {
  const { t, language } = useLanguage();
  const isIt = language === "it";

  const [activeStage, setActiveStage] = useState<GuidanceStage>("SCENE");
  const [show112Demo, setShow112Demo] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto py-2 sm:py-6 space-y-12 lg:space-y-16 selection:bg-[#0E0F10] selection:text-white">
      {/* 1. Header: Policy Identity & Active Standing */}
      <section className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-8 border-b border-[#E5E5E3] gap-4">
        <div className="space-y-2">
          <span className="text-xs font-medium text-[#555555] block">
            {t("insurance.title")}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0E0F10]">
            Generali Italia
          </h1>
          <p className="text-base text-[#555555] max-w-xl font-normal leading-relaxed">
            {t("insurance.subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-2.5 py-1.5 px-4 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>{t("insurance.statusActive")}</span>
        </div>
      </section>

      {/* 2. Policy Details: Open Aligned Information (No Generic Card Boxes) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Contract Terms & Coverage Schedule (7 cols) */}
        <div className="lg:col-span-7 space-y-10">
          {/* Contract Metadata */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-[#0E0F10]">
              {t("insurance.contractDetails")}
            </h2>

            <div className="border-t border-[#E5E5E3] divide-y divide-[#E5E5E3] text-sm">
              <div className="py-4 flex items-center justify-between">
                <span className="text-[#555555]">{t("insurance.policyNumber")}</span>
                <span className="font-mono font-bold text-[#0E0F10]">GEN-2026-9812</span>
              </div>

              <div className="py-4 flex items-center justify-between">
                <span className="text-[#555555]">{t("insurance.insurer")}</span>
                <span className="font-medium text-[#0E0F10]">Generali Italia S.p.A.</span>
              </div>

              <div className="py-4 flex items-center justify-between">
                <span className="text-[#555555]">{t("insurance.coverageType")}</span>
                <span className="font-medium text-[#0E0F10]">{t("insurance.coverageTypeVal")}</span>
              </div>

              <div className="py-4 flex items-center justify-between">
                <span className="text-[#555555]">{t("insurance.validity")}</span>
                <span className="text-[#0E0F10]">
                  {formatDate("2026-04-01", language)} — {formatDate("2027-03-31", language)}
                </span>
              </div>

              <div className="py-4 flex items-center justify-between">
                <span className="text-[#555555]">{t("insurance.paymentSchedule")}</span>
                <span className="text-[#0E0F10]">{t("insurance.annualSettled")}</span>
              </div>
            </div>
          </div>

          {/* Guarantees & Limits Schedule */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-[#0E0F10]">
              {t("insurance.coverageLimits")}
            </h2>

            <div className="border-t border-[#E5E5E3] divide-y divide-[#E5E5E3] text-sm">
              <div className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5 max-w-md">
                  <div className="font-bold text-[#0E0F10]">{t("insurance.mandatoryRCA")}</div>
                  <p className="text-xs text-[#555555] leading-relaxed">{t("insurance.coverageRCADesc")}</p>
                </div>
                <span className="font-mono font-bold text-[#0E0F10] text-sm sm:text-right">
                  {t("insurance.rcaCeiling")}
                </span>
              </div>

              <div className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5 max-w-md">
                  <div className="font-bold text-[#0E0F10]">{t("insurance.coverageKasko")}</div>
                  <p className="text-xs text-[#555555] leading-relaxed">{t("insurance.coverageKaskoDesc")}</p>
                </div>
                <span className="font-medium text-emerald-800 text-sm sm:text-right">
                  {t("insurance.included")}
                </span>
              </div>

              <div className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5 max-w-md">
                  <div className="font-bold text-[#0E0F10]">{t("insurance.coverageAssistance")}</div>
                  <p className="text-xs text-[#555555] leading-relaxed">{t("insurance.coverageAssistanceDesc")}</p>
                </div>
                <span className="font-medium text-emerald-800 text-sm sm:text-right">
                  {t("insurance.assistance247")}
                </span>
              </div>

              <div className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5 max-w-md">
                  <div className="font-bold text-[#0E0F10]">{t("insurance.legalProtection")}</div>
                  <p className="text-xs text-[#555555] leading-relaxed">{t("insurance.legalProtectionDesc")}</p>
                </div>
                <span className="font-mono font-bold text-[#0E0F10] text-sm sm:text-right">
                  {t("insurance.legalLimit")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Vehicle Preview & Immediate Action Hub (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Associated Vehicle Preview Card with subtle perspective */}
          <div className="space-y-3">
            <span className="text-xs font-medium text-[#555555] block">
              {t("insurance.associatedVehicle")}
            </span>

            <Link
              href="/app/vehicle"
              className="group block relative overflow-hidden rounded-2xl border border-[#E5E5E3] bg-white transition-all hover:border-[#0E0F10] hover:shadow-md"
              style={{
                perspective: "1000px",
              }}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                <Image
                  src="/images/hero-car.jpg"
                  alt="Insured vehicle context"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between">
                  <div>
                    <div className="font-bold text-lg">Audi A3 Sportback</div>
                    <div className="font-mono text-xs text-white/80">AB 123 CD</div>
                  </div>
                  <ChevronRightIcon size={18} className="text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>

          {/* Immediate Assistance Hotline & 112 Demo Action */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#0E0F10] text-white space-y-6 shadow-sm">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider block">
                {t("insurance.immediateAssistance")}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                {t("insurance.accidentNowQuestion")}
              </h3>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                {t("insurance.accidentNowGuidance")}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                data-testid="trigger-112-demo"
                onClick={() => setShow112Demo(true)}
                className="w-full py-4 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.99] focus:outline-none"
              >
                <PhoneIcon size={18} />
                <span>{t("insurance.emergencyDemoCta")}</span>
              </button>

              <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs text-neutral-400">
                <span>{t("insurance.generaliHotlineLabel")}</span>
                <span className="font-mono font-bold text-white text-sm">800 880 880</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Roadside Incident Narrative: Spatial 3-Stage Interactive Progression */}
      <section className="pt-10 border-t border-[#E5E5E3] space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-medium text-[#555555] block">
            {t("insurance.guidanceTitle")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0F10]">
            {isIt ? "Come operare in caso di sinistro." : "Roadside incident workflow."}
          </h2>
          <p className="text-base text-[#555555] max-w-2xl font-light leading-relaxed">
            {t("insurance.guidanceSubtitle")}
          </p>
        </div>

        {/* Spatial Stage Selector (Interactive Tabs with Animated Progression) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-[#E5E5E3] pb-4">
          <button
            type="button"
            onClick={() => setActiveStage("BEFORE")}
            className={`text-left py-3 px-4 rounded-xl transition-all ${
              activeStage === "BEFORE"
                ? "bg-[#0E0F10] text-white shadow-sm font-semibold"
                : "bg-white text-[#555555] hover:text-[#0E0F10] border border-[#E5E5E3] font-medium"
            }`}
          >
            <span className="text-xs block opacity-70">A</span>
            <span className="text-sm sm:text-base">{t("insurance.stageBeforeTab")}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStage("SCENE")}
            className={`text-left py-3 px-4 rounded-xl transition-all ${
              activeStage === "SCENE"
                ? "bg-[#0E0F10] text-white shadow-sm font-semibold"
                : "bg-white text-[#555555] hover:text-[#0E0F10] border border-[#E5E5E3] font-medium"
            }`}
          >
            <span className="text-xs block opacity-70">B</span>
            <span className="text-sm sm:text-base">{t("insurance.stageAtSceneTab")}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStage("AFTER")}
            className={`text-left py-3 px-4 rounded-xl transition-all ${
              activeStage === "AFTER"
                ? "bg-[#0E0F10] text-white shadow-sm font-semibold"
                : "bg-white text-[#555555] hover:text-[#0E0F10] border border-[#E5E5E3] font-medium"
            }`}
          >
            <span className="text-xs block opacity-70">C</span>
            <span className="text-sm sm:text-base">{t("insurance.stageAfterTab")}</span>
          </button>
        </div>

        {/* Active Stage Spatial Display Plane (CSS 3D depth transition) */}
        <div
          className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E5E5E3] transition-all duration-300"
          style={{
            transform: "translateZ(0)",
          }}
        >
          {activeStage === "BEFORE" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-semibold text-[#555555] uppercase tracking-wider block">
                  {t("insurance.stageBeforeTab")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0E0F10]">
                  {t("insurance.stageBeforeTitle")}
                </h3>
                <p className="text-base text-[#555555] font-light leading-relaxed">
                  {t("insurance.stageBeforeDesc")}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowChecklist(!showChecklist)}
                    className="inline-flex items-center gap-2 py-3 px-5 rounded-xl bg-[#0E0F10] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1A1B1C] transition-colors"
                  >
                    <span>{t("insurance.stageBeforeAction")}</span>
                    <ArrowRightIcon size={16} />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#F7F7F6] border border-[#E5E5E3] space-y-3 text-xs sm:text-sm text-[#555555]">
                <div className="font-bold text-[#0E0F10] text-sm">
                  {isIt ? "Dotazione obbligatoria di bordo:" : "Mandatory onboard items:"}
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircleIcon size={16} className="text-emerald-700 flex-shrink-0" />
                  <span>{isIt ? "Giubbotto catarifrangente ad alta visibilità" : "High-visibility reflective vest"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircleIcon size={16} className="text-emerald-700 flex-shrink-0" />
                  <span>{isIt ? "Triangolo di segnalazione omologato" : "Approved warning triangle"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircleIcon size={16} className="text-emerald-700 flex-shrink-0" />
                  <span>{isIt ? "Certificato di assicurazione digitale sincronizzato" : "Synchronized digital insurance certificate"}</span>
                </div>
              </div>
            </div>
          )}

          {activeStage === "SCENE" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider block">
                  {t("insurance.stageAtSceneTab")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0E0F10]">
                  {t("insurance.stageAtSceneTitle")}
                </h3>
                <p className="text-base text-[#555555] font-light leading-relaxed">
                  {t("insurance.stageAtSceneDesc")}
                </p>
                <div className="pt-2 flex flex-wrap gap-4 items-center">
                  <button
                    type="button"
                    onClick={() => setShow112Demo(true)}
                    className="inline-flex items-center gap-2 py-3 px-5 rounded-xl bg-rose-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-rose-700 transition-colors shadow-sm"
                  >
                    <PhoneIcon size={16} />
                    <span>{t("insurance.stageAtSceneAction")}</span>
                  </button>
                  <Link
                    href="/app/report"
                    className="inline-flex items-center gap-2 py-3 px-5 rounded-xl border border-[#E5E5E3] text-[#0E0F10] text-xs font-bold uppercase tracking-wider hover:border-[#0E0F10] transition-colors"
                  >
                    <span>{isIt ? "Inizia Segnalazione" : "Start Accident Intake"}</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-bold text-rose-900">
                  <AlertTriangleIcon size={18} className="text-rose-600 flex-shrink-0" />
                  <span>{isIt ? "Regola d'oro di sicurezza:" : "Safety First Principle:"}</span>
                </div>
                <p className="text-xs leading-relaxed text-rose-800">
                  {isIt
                    ? "Non rimanere mai all'interno della corsia di marcia. Posizionati oltre il guardrail prima di usare lo smartphone per fotografare la scena."
                    : "Never remain inside an active traffic lane. Step behind roadside barriers before using your phone to capture scene evidence."}
                </p>
              </div>
            </div>
          )}

          {activeStage === "AFTER" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
                  {t("insurance.stageAfterTab")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0E0F10]">
                  {t("insurance.stageAfterTitle")}
                </h3>
                <p className="text-base text-[#555555] font-light leading-relaxed">
                  {t("insurance.stageAfterDesc")}
                </p>
                <div className="pt-2">
                  <Link
                    href="/app/reports"
                    className="inline-flex items-center gap-2 py-3 px-5 rounded-xl bg-[#0E0F10] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1A1B1C] transition-colors"
                  >
                    <span>{t("insurance.stageAfterAction")}</span>
                    <ArrowRightIcon size={16} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#F7F7F6] border border-[#E5E5E3] space-y-3 text-xs sm:text-sm text-[#555555]">
                <div className="font-bold text-[#0E0F10] text-sm">
                  {isIt ? "Stato della pratica digitale:" : "Digital Claim Dossier:"}
                </div>
                <div className="flex items-center justify-between text-xs py-1 border-b border-[#E5E5E3]">
                  <span>{isIt ? "Modulo CAI Generato" : "CAI Form Generated"}</span>
                  <span className="font-semibold text-emerald-800">{isIt ? "Confermato" : "Ready"}</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1 border-b border-[#E5E5E3]">
                  <span>{isIt ? "Rilievi Fotografici" : "Photo Evidence"}</span>
                  <span className="font-semibold text-emerald-800">{isIt ? "Verificati" : "Verified"}</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1">
                  <span>{isIt ? "Assegnazione Perito" : "Adjuster Assignment"}</span>
                  <span className="font-semibold text-[#0E0F10]">{isIt ? "In corso" : "Queued"}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Emergency 112 Demo Modal */}
      <Emergency112DemoModal
        isOpen={show112Demo}
        onClose={() => setShow112Demo(false)}
      />
    </div>
  );
}
