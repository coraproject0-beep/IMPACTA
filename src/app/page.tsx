"use client";

import React from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { HeroMedia } from "@/components/public/HeroMedia";
import BlackBoxScene from "@/components/3d/BlackBoxScene";
import { FullBleedImage } from "@/components/motion/FullBleedImage";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { StatementReveal } from "@/components/motion/StatementReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";
import { ProductReveal } from "@/components/motion/ProductReveal";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { ArrowRightIcon, CheckCircleIcon } from "@/components/icons/Icons";

export default function HomePage() {
  const { language, t } = useLanguage();
  const { isDriverAuthenticated } = useAuth();

  const reportLink = isDriverAuthenticated ? "/app/report" : "/login?redirect=/app/report";

  return (
    <PublicShell>
      {/* CHAPTER 1: MEDIA-FIRST SIGNATURE HERO */}
      <section className="relative w-full min-h-[92vh] sm:min-h-screen flex items-end pb-20 sm:pb-28 text-white bg-[#090A0A] overflow-hidden">
        <HeroMedia
          videoSrc="/media/impacta-hero.mp4"
          posterSrc="/images/road-context.jpg"
          fallbackImageSrc="/images/road-context.jpg"
          alt="IMPACTA Roadside Context"
          className="absolute inset-0"
        />

        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-8">
          <div className="max-w-4xl space-y-6">
            <TechnicalReveal className="text-xs sm:text-sm font-semibold tracking-widest text-white/70 uppercase">
              {language === "it" ? "INTELLIGENZA FORENSE STRADALE" : "ROADSIDE COLLISION INTELLIGENCE"}
            </TechnicalReveal>

            <EditorialReveal
              as="h1"
              className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.03em] uppercase leading-[0.96] text-white"
            >
              {language === "it" ? (
                <>
                  Ogni fatto dell&apos;urto.
                  <br />
                  Strutturato sul posto.
                </>
              ) : (
                <>
                  Every collision fact.
                  <br />
                  Structured at roadside.
                </>
              )}
            </EditorialReveal>

            <p className="text-lg sm:text-2xl text-white/80 max-w-2xl font-normal leading-relaxed">
              {language === "it"
                ? "IMPACTA guida l'automobilista in un protocollo calmo e rigoroso: trasforma il caos post-incidente in prove forensi verificate in pochi minuti."
                : "IMPACTA guides drivers through a calm, rigorous protocol—turning post-impact confusion into verified forensic evidence in minutes."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Link
              href={reportLink}
              className="inline-flex items-center justify-center min-h-[56px] px-8 bg-white text-[#090A0A] text-sm font-bold tracking-wider uppercase hover:bg-[#F4F5F3] transition-colors"
            >
              {t("hero.reportAccident")}
            </Link>
            <Link
              href="/console/login"
              className="inline-flex items-center justify-center min-h-[56px] px-8 border border-white/30 text-white text-sm font-semibold tracking-wider uppercase hover:border-white transition-colors"
            >
              {t("nav.insurerAccess")}
            </Link>
          </div>
        </div>
      </section>

      {/* CHAPTER 2: 3D BLACK BOX (Solid Black Satin Forensic Core & Trajectory Reconstruction) */}
      <BlackBoxScene />

      {/* CHAPTER 3: THE ROAD (Full-Bleed Photographic Chapter) */}
      <section className="relative w-full bg-[#090A0A] text-white">
        <FullBleedImage
          src="/images/road-context.jpg"
          alt="Roadway incident context"
          overlayClassName="bg-gradient-to-t from-[#090A0A] via-[#090A0A]/60 to-transparent"
        >
          <div className="max-w-4xl space-y-6">
            <TechnicalReveal className="text-xs sm:text-sm font-semibold tracking-widest text-white/60 uppercase">
              {language === "it" ? "IL CONTESTO STRADALE" : "THE ROADSIDE CONTEXT"}
            </TechnicalReveal>

            <EditorialReveal
              as="h2"
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[1.02]"
            >
              {language === "it" ? (
                <>
                  La strada non mente.
                  <br />
                  Se registrata con rigore.
                </>
              ) : (
                <>
                  The road does not lie.
                  <br />
                  When captured with precision.
                </>
              )}
            </EditorialReveal>

            <p className="text-lg sm:text-xl text-white/70 max-w-2xl font-light leading-relaxed">
              {language === "it"
                ? "Subito dopo l'impatto, lo stress cancella i dettagli. IMPACTA guida l'automobilista in una sequenza rilassata: sicurezza personale, fotogrammi georeferenziati e targa della controparte."
                : "Immediately after impact, adrenaline obscures facts. IMPACTA guides the driver through a calm sequence: human safety first, georeferenced angles, and counterparty intake."}
            </p>

            <div className="pt-4">
              <Link
                href="/drivers"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:text-white/70 border-b border-white pb-1 transition-colors"
              >
                <span>{language === "it" ? "Protocollo Conducente" : "Driver Protocol"}</span>
                <ArrowRightIcon size={16} />
              </Link>
            </div>
          </div>
        </FullBleedImage>
      </section>

      {/* CHAPTER 4: DRIVER EXPERIENCE (Document-Style Interface Showcase) */}
      <section className="py-28 sm:py-36 bg-white text-[#090A0A] border-b border-[#D7D9D8]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <TechnicalReveal className="text-xs sm:text-sm font-semibold tracking-widest text-[#6F7375] uppercase">
              {language === "it" ? "ESPERIENZA CONDUCENTE" : "DRIVER INTAKE"}
            </TechnicalReveal>
            <EditorialReveal
              as="h2"
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#090A0A] uppercase leading-[1.04]"
            >
              {language === "it" ? (
                <>
                  Zero attrito.
                  <br />
                  Calma sul ciglio della strada.
                </>
              ) : (
                <>
                  Zero friction.
                  <br />
                  Calm at the roadside.
                </>
              )}
            </EditorialReveal>
            <p className="text-lg sm:text-xl text-[#6F7375] font-normal leading-relaxed">
              {language === "it"
                ? "Un'interfaccia priva di rumore visivo. Controlli tattili grandi per mani sotto stress, chiamata diretta al 112 e verifica immediata della polizza."
                : "An interface free from visual noise. Large touch controls for cold hands, direct 112 emergency escalation, and immediate policy lookup."}
            </p>
          </div>

          {/* Product UI Viewport */}
          <ProductReveal className="border border-[#D7D9D8] bg-[#F4F5F3] p-6 sm:p-12">
            <div className="max-w-4xl mx-auto bg-white border border-[#D7D9D8] p-8 sm:p-12 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D7D9D8] gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#6F7375]">
                    {language === "it" ? "PROTOCOLLO SINISTRO STRADALE" : "ROADSIDE INTAKE PROTOCOL"}
                  </span>
                  <h3 className="text-2xl font-bold uppercase text-[#090A0A] mt-1">
                    {language === "it" ? "Fase 1: Sicurezza e Incolumità" : "Phase 1: Human Safety Check"}
                  </h3>
                </div>
                <div className="text-xs font-semibold px-3 py-1.5 border border-[#090A0A] text-[#090A0A] uppercase tracking-wider">
                  {language === "it" ? "EMERGENZA 112 ATTIVA" : "112 DIRECT ESCALATION"}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-base sm:text-lg text-[#6F7375]">
                  {language === "it"
                    ? "Voi e le altre persone coinvolte siete al sicuro e fuori dalla carreggiata?"
                    : "Are you and everyone around you safe and clear of moving traffic?"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 border border-[#090A0A] bg-[#F4F5F3] flex items-center justify-between">
                    <span className="font-bold text-sm tracking-wider uppercase">
                      {language === "it" ? "Sì, tutti al sicuro" : "Yes, everyone is safe"}
                    </span>
                    <CheckCircleIcon size={18} className="text-[#090A0A]" />
                  </div>
                  <div className="p-5 border border-[#D7D9D8] text-[#6F7375] flex items-center justify-between opacity-80">
                    <span className="font-medium text-sm tracking-wider uppercase">
                      {language === "it" ? "Richiedi soccorso (112)" : "Someone needs help (112)"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs text-[#6F7375] border-t border-[#D7D9D8]">
                <span className="font-mono text-[11px] text-[#090A0A]">MATTEO BIANCHI • VW GOLF VIII</span>
                <Link
                  href="/app"
                  className="font-bold text-[#090A0A] hover:underline uppercase tracking-wider text-xs"
                >
                  {language === "it" ? "Apri Area Conducente →" : "Open Driver Area →"}
                </Link>
              </div>
            </div>
          </ProductReveal>
        </div>
      </section>

      {/* CHAPTER 5: CLAIMS OPERATIONS (Forensic Inspection Workbench) */}
      <section className="py-28 sm:py-36 bg-[#F4F5F3] text-[#090A0A] border-b border-[#D7D9D8]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <TechnicalReveal className="text-xs sm:text-sm font-semibold tracking-widest text-[#6F7375] uppercase">
              {language === "it" ? "OPERAZIONI SINISTRI" : "CLAIMS WORKBENCH"}
            </TechnicalReveal>
            <EditorialReveal
              as="h2"
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#090A0A] uppercase leading-[1.04]"
            >
              {language === "it" ? (
                <>
                  Dossier strutturato.
                  <br />
                  Minuti, non quaranta giorni.
                </>
              ) : (
                <>
                  Structured claim dossiers.
                  <br />
                  Minutes, not forty days.
                </>
              )}
            </EditorialReveal>
            <p className="text-lg sm:text-xl text-[#6F7375] font-normal leading-relaxed">
              {language === "it"
                ? "Il perito riceve una perizia calibrata: rilievi metrici, dinamica d'urto, CAI normalizzato e audit trail immutabile."
                : "Adjusters receive an audit-ready dossier: calibrated impact vectors, CAI Box 12 extraction, and continuous evidence provenance."}
            </p>
          </div>

          {/* Workbench Strip */}
          <ProductReveal className="border border-[#D7D9D8] bg-white p-6 sm:p-10">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D7D9D8] gap-2">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono font-bold text-[#090A0A]">CLM-2026-0891</span>
                  <span className="text-[#6F7375]">• AURA MUTUA ASSICURAZIONI</span>
                </div>
                <div className="text-xs text-[#6F7375]">
                  PERIZIA UMANA: <span className="text-[#090A0A] font-bold">IN ATTESA DI CONVALIDA</span>
                </div>
              </div>

              {/* Typographic Data Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-4 border-b border-[#D7D9D8]">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#6F7375]">VELOCITÀ IMPATTO</span>
                  <span className="text-xl font-mono font-bold text-[#090A0A]">48.2 KM/H</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#6F7375]">DECELERAZIONE</span>
                  <span className="text-xl font-mono font-bold text-[#090A0A]">-0.82 G</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#6F7375]">FOTOGRAFIE</span>
                  <span className="text-xl font-mono font-bold text-[#090A0A]">4 / 4 ANGOLI</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#6F7375]">INTEGRITÀ AUDIT</span>
                  <span className="text-xl font-mono font-bold text-emerald-700">100% SHA-256</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-[#6F7375]">OPERATORE: ELENA ROSTAGNO</span>
                <Link
                  href="/console/claims"
                  className="font-bold text-[#090A0A] hover:underline uppercase tracking-wider"
                >
                  {language === "it" ? "Accedi alla Console Sinistri →" : "Open Claims Workbench →"}
                </Link>
              </div>
            </div>
          </ProductReveal>
        </div>
      </section>

      {/* CHAPTER 6: ETHICAL REASONING (Epistemic Demarcation) */}
      <section className="py-28 sm:py-36 bg-[#090A0A] text-white">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-8">
          <TechnicalReveal className="text-xs sm:text-sm font-semibold tracking-widest text-white/60 uppercase">
            {language === "it" ? "GOVERNANCE ETICA" : "ETHICAL DEMARCATION"}
          </TechnicalReveal>

          <StatementReveal
            as="h2"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[1.02] max-w-5xl"
          >
            {language === "it" ? (
              <>
                Nessuna intelligenza artificiale
                <br />
                deve decidere la colpa giuridica.
              </>
            ) : (
              <>
                No machine learning model
                <br />
                should decree legal fault.
              </>
            )}
          </StatementReveal>

          <p className="text-lg sm:text-2xl text-white/70 max-w-3xl font-light leading-relaxed">
            {language === "it"
              ? "IMPACTA non liquida automaticamente i sinistri. Organizza le prove fisiche, separa i fatti dalle supposizioni e lascia la decisione finale ai periti umani."
              : "IMPACTA does not automate liability. We structure forensic evidence, separate physical facts from narrative claims, and leave the legal ruling to human experts."}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-semibold text-white/50 tracking-wider uppercase">
            <span>HUMAN-IN-THE-LOOP</span>
            <span>NO BLACK BOX LIABILITY</span>
            <span>VERIFIABLE EVIDENCE</span>
          </div>
        </div>
      </section>

      {/* CHAPTER 7: FINAL ACTION */}
      <section className="py-28 sm:py-36 bg-white text-[#090A0A]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-2xl space-y-4">
            <TechnicalReveal className="text-xs sm:text-sm font-semibold tracking-widest text-[#6F7375] uppercase">
              {language === "it" ? "INIZIA ORA" : "GET STARTED"}
            </TechnicalReveal>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight uppercase text-[#090A0A] leading-tight">
              {language === "it" ? "Pronto per l'impatto." : "Engineered for impact."}
            </h2>
            <p className="text-lg sm:text-xl text-[#6F7375] font-normal leading-relaxed">
              {language === "it"
                ? "Avvia una segnalazione sinistro immediata come conducente o accedi all'infrastruttura peritale per compagnie."
                : "Report an immediate roadside incident as a driver, or explore the claims operations console for insurers."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href={reportLink}
              className="inline-flex items-center justify-center min-h-[56px] px-8 bg-[#090A0A] text-white text-sm font-bold tracking-wider uppercase hover:bg-[#171819] transition-colors"
            >
              {t("hero.reportAccident")}
            </Link>
            <Link
              href="/console/login"
              className="inline-flex items-center justify-center min-h-[56px] px-8 border border-[#D7D9D8] text-[#090A0A] text-sm font-semibold tracking-wider uppercase hover:border-[#090A0A] transition-colors"
            >
              {t("nav.insurerAccess")}
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
