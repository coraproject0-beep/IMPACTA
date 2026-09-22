"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import BlackBoxScene from "@/components/3d/BlackBoxScene";
import { EvidenceClaimStory } from "@/components/public/EvidenceClaimStory";
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
      {/* SCENE 1: THE 3D BLACK BOX HERO (Native Scroll Scrubbing 320vh Pinned Experience) */}
      <BlackBoxScene />

      {/* SCENE 2: THE MOMENT AFTER IMPACT (Full-Viewport Edge-to-Edge Photographic Chapter) */}
      <section className="relative w-full bg-[#090A0A] text-white">
        <FullBleedImage
          src="/images/road-context.jpg"
          alt="Roadway incident context"
          overlayClassName="bg-gradient-to-t from-[#090A0A] via-[#090A0A]/60 to-transparent"
        >
          <div className="max-w-4xl space-y-6">
            <TechnicalReveal className="text-xs sm:text-sm font-mono tracking-widest text-white/50 uppercase">
              {language === "it" ? "SCENA 02 / LA STRADA" : "SCENE 02 / THE ROAD"}
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
                ? "Subito dopo l'impatto, lo stress cancella i dettagli. IMPACTA guida l'automobilista in una sequenza rilassata ma rigorosa: sicurezza personale, fotogrammi georeferenziati, e targa della controparte."
                : "Immediately following impact, adrenaline obscures critical facts. IMPACTA guides the driver through a calm, disciplined protocol: human safety first, georeferenced photographic angles, and counterparty intake."}
            </p>

            <div className="pt-4">
              <Link
                href="/drivers"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:text-white/70 border-b border-white pb-1 transition-colors"
              >
                <span>{language === "it" ? "Scopri l'esperienza Driver" : "Explore Driver Protocol"}</span>
                <ArrowRightIcon size={16} />
              </Link>
            </div>
          </div>
        </FullBleedImage>
      </section>

      {/* SCENE 3: EVIDENCE BECOMES STRUCTURE (Interactive Transformation Without Cards) */}
      <EvidenceClaimStory />

      {/* SCENE 4: DRIVER EXPERIENCE (Full-Bleed Product UI Showcase) */}
      <section className="py-28 sm:py-40 bg-white text-[#090A0A] border-b border-[#D7D9D8]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <TechnicalReveal className="text-xs sm:text-sm font-mono tracking-widest text-[#6F7375] uppercase">
              {language === "it" ? "SCENA 04 / CONDUCENTE" : "SCENE 04 / CONSUMER INTAKE"}
            </TechnicalReveal>
            <EditorialReveal
              as="h2"
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#090A0A] uppercase leading-[1.04]"
            >
              {language === "it" ? (
                <>
                  Nessuna app complessa.
                  <br />
                  Solo calma sul ciglio della strada.
                </>
              ) : (
                <>
                  Zero dashboard friction.
                  <br />
                  Quiet clarity at roadside.
                </>
              )}
            </EditorialReveal>
            <p className="text-lg sm:text-xl text-[#6F7375] font-normal leading-relaxed">
              {language === "it"
                ? "Un'interfaccia priva di rumore visivo. Grandi controlli tattili progettati per mani sotto stress, numeri di emergenza diretti e verifica istantanea delle coperture."
                : "An uncluttered intake workflow. Oversized touch controls engineered for cold or shaken hands, direct emergency dialers, and automatic policy verification."}
            </p>
          </div>

          {/* Product UI Viewport */}
          <ProductReveal className="border border-[#D7D9D8] bg-[#F4F5F3] p-6 sm:p-12 shadow-sm">
            <div className="max-w-4xl mx-auto bg-white border border-[#D7D9D8] p-8 sm:p-12 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D7D9D8] gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#6F7375]">
                    {language === "it" ? "PROTOCOLLO SINISTRO STRADALE" : "ROADSIDE INTAKE SPECIFICATION"}
                  </span>
                  <h3 className="text-2xl font-bold uppercase text-[#090A0A] mt-1">
                    {language === "it" ? "Fase 1: Sicurezza e Incolumità" : "Phase 1: Human Safety Check"}
                  </h3>
                </div>
                <div className="text-xs font-mono px-3 py-1.5 border border-[#090A0A] text-[#090A0A] font-semibold uppercase tracking-wider">
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
                      {language === "it" ? "Sì, tutti sono al sicuro" : "Yes, everyone is safe"}
                    </span>
                    <CheckCircleIcon size={18} className="text-[#090A0A]" />
                  </div>
                  <div className="p-5 border border-[#D7D9D8] text-[#6F7375] flex items-center justify-between opacity-80">
                    <span className="font-medium text-sm tracking-wider uppercase">
                      {language === "it" ? "Qualcuno è ferito (Chiama 112)" : "Someone needs help (Call 112)"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs font-mono text-[#6F7375] border-t border-[#D7D9D8]">
                <span>MATTEO BIANCHI • VW GOLF VIII</span>
                <Link
                  href="/app"
                  className="font-bold text-[#090A0A] hover:underline uppercase tracking-wider"
                >
                  {language === "it" ? "Apri Area Conducente →" : "Open Driver Area →"}
                </Link>
              </div>
            </div>
          </ProductReveal>
        </div>
      </section>

      {/* SCENE 5: INSURER INTELLIGENCE (Claims Console Workbench Preview) */}
      <section className="py-28 sm:py-40 bg-[#F4F5F3] text-[#090A0A] border-b border-[#D7D9D8]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <TechnicalReveal className="text-xs sm:text-sm font-mono tracking-widest text-[#6F7375] uppercase">
              {language === "it" ? "SCENA 05 / COMPAGNIE" : "SCENE 05 / CLAIMS OPERATIONS"}
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
                ? "Il perito riceve una perizia pre-calibrata: rilievi metrici, dinamica d'urto, CAI precompilato e audit crittografico immutabile."
                : "Forensic adjusters receive an audit-ready workbench: calibrated impact vectors, CAI Box 12 extraction, and continuous evidence provenance."}
            </p>
          </div>

          {/* Workbench Preview */}
          <ProductReveal className="border border-[#D7D9D8] bg-white p-6 sm:p-10 shadow-sm">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D7D9D8] gap-2">
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="font-bold text-[#090A0A]">DOSSIER #CLM-2026-0891</span>
                  <span className="text-[#6F7375]">• AURA MUTUA ASSICURAZIONI</span>
                </div>
                <div className="text-xs font-mono text-[#6F7375]">
                  PERIZIA UMANA: <span className="text-[#090A0A] font-bold">IN ATTESA DI CONVALIDA</span>
                </div>
              </div>

              {/* Typographic Data Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-4 border-b border-[#D7D9D8] text-xs font-mono">
                <div>
                  <span className="block text-[#6F7375]">VELOCITÀ IMPATTO</span>
                  <span className="text-xl font-bold text-[#090A0A]">48.2 KM/H</span>
                </div>
                <div>
                  <span className="block text-[#6F7375]">DECELERAZIONE</span>
                  <span className="text-xl font-bold text-[#090A0A]">-0.82 G</span>
                </div>
                <div>
                  <span className="block text-[#6F7375]">FOTOGRAFIE</span>
                  <span className="text-xl font-bold text-[#090A0A]">4 / 4 ANGOLI</span>
                </div>
                <div>
                  <span className="block text-[#6F7375]">INTEGRITÀ AUDIT</span>
                  <span className="text-xl font-bold text-emerald-700">100% SHA-256</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono">
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

      {/* SCENE 6: HUMAN REVIEW & DOCUMENTARY TRUTH */}
      <section className="py-28 sm:py-36 bg-[#090A0A] text-white">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-8">
          <TechnicalReveal className="text-xs sm:text-sm font-mono tracking-widest text-white/50 uppercase">
            {language === "it" ? "SCENA 06 / GOVERNANCE" : "SCENE 06 / ETHICAL REASONING"}
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
              ? "IMPACTA non liquida automaticamente i sinistri. Organizza le prove, demarca i fatti scientifici dalle congetture e mette i periti e i liquidatori umani nelle condizioni di decidere in modo equo e trasparente."
              : "IMPACTA does not execute automated settlement. We structure forensic facts, demarcate certainty from uncertainty, and empower human adjusters to decide claims equitably."}
          </p>

          <div className="pt-4 flex items-center gap-8 text-xs font-mono text-white/50 tracking-wider">
            <span>HUMAN-IN-THE-LOOP</span>
            <span>NO BLACK BOX LIABILITY</span>
            <span>EU AI ACT AUDITED</span>
          </div>
        </div>
      </section>

      {/* SCENE 7 & 8: FINAL DISCIPLINED CTA */}
      <section className="py-28 sm:py-36 bg-white text-[#090A0A]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-2xl space-y-4">
            <TechnicalReveal className="text-xs sm:text-sm font-mono tracking-widest text-[#6F7375] uppercase">
              {language === "it" ? "INIZIA ORA" : "GET STARTED"}
            </TechnicalReveal>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight uppercase text-[#090A0A] leading-tight">
              {language === "it" ? "Pronto per l'impatto." : "Engineered for impact."}
            </h2>
            <p className="text-lg sm:text-xl text-[#6F7375] font-normal leading-relaxed">
              {language === "it"
                ? "Avvia una segnalazione sinistro immediata come conducente o accedi all'infrastruttura peritale per compagnie."
                : "Report an immediate roadside incident as a driver, or explore the enterprise claims console for insurers."}
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
              {t("hero.insurerCta")}
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
