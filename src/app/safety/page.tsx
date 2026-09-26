"use client";

import React from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";
import { RevealText } from "@/components/motion/RevealText";
import { PerspectiveCard } from "@/components/motion/PerspectiveCard";
import { useLanguage } from "@/context/LanguageContext";

export default function SafetyPage() {
  return (
    <PublicShell>
      <SafetyContent />
    </PublicShell>
  );
}

function SafetyContent() {
  const { language } = useLanguage();
  const isIt = language === "it";

  const safetyPillars = [
    {
      num: "01",
      tag: isIt ? "PRIORITÀ DI SOCCORSO" : "EMERGENCY ESCALATION",
      title: isIt ? "Chiamata Rapida 112" : "112 Direct Access",
      desc: isIt
        ? "Se ci sono feriti o pericoli imminenti, l'interfaccia blocca qualsiasi richiesta documentale e offre un tasto diretto di chiamata verso il Numero Unico di Emergenza Europeo."
        : "If physical injuries are detected, all questionnaire inputs are halted in favor of an instant dialer connecting directly to European Emergency 112.",
    },
    {
      num: "02",
      tag: isIt ? "PROTEZIONE ATTIVA" : "ROADWAY REFUGING",
      title: isIt ? "Incolumità Fuori Carreggiata" : "Safe Refuge Protocol",
      desc: isIt
        ? "I conducenti vengono istruiti a indossare il giubbotto catarifrangente e a posizionarsi dietro il guardrail prima di scattare qualsiasi fotografia."
        : "Drivers are prompted to don high-visibility vests and retreat behind roadside barriers before attempting any photographic capture.",
    },
    {
      num: "03",
      tag: isIt ? "SUPERVISIONE PERITALE" : "HUMAN GOVERNANCE",
      title: isIt ? "Nessuna Sentenza Automatica" : "Zero Automated Decrees",
      desc: isIt
        ? "IMPACTA non assegna mai percentuali di colpa. La nostra tecnologia organizza i fatti metrici a supporto esclusivo dei periti umani abilitati."
        : "IMPACTA never outputs automated legal fault percentages. Machine models structure empirical facts for licensed human adjusters.",
    },
  ];

  return (
    <>
      {/* Header */}
      <section className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-6">
          <TechnicalReveal className="text-xs sm:text-sm font-medium text-[#555555]">
            {isIt ? "Sicurezza, etica e governo del dato" : "Safety, ethics & evidentiary governance"}
          </TechnicalReveal>
          <EditorialReveal
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0F10] leading-[1.04] uppercase max-w-5xl"
          >
            {isIt ? (
              <>
                La vita umana precede i dati.
                <br />
                La responsabilità peritale governa i fatti.
              </>
            ) : (
              <>
                Human life precedes data.
                <br />
                Human judgment governs claims.
              </>
            )}
          </EditorialReveal>
          <p className="text-lg sm:text-2xl text-[#666666] leading-relaxed max-w-3xl font-light">
            {isIt
              ? "Sul ciglio della strada, la sicurezza fisica è l'unica priorità. Nella gestione del sinistro, il rigore probatorio non può mai essere delegato a sentenze automatizzate."
              : "At roadside collisions, physical safety is absolute. In insurance claims processing, evidentiary rigor and legal governance must never be abdicated to automated black boxes."}
          </p>
        </div>
      </section>

      {/* Roadside Safety Protocol Narrative - Cards */}
      <section className="py-24 sm:py-36 bg-[#F7F7F6] border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-12">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#777777] font-medium">
              {isIt ? "TRE PRINCIPI INDEROGABILI" : "THREE NON-NEGOTIABLE TENETS"}
            </span>
            <RevealText
              as="h2"
              mode="word"
              variant="vertical-mask"
              className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#0E0F10]"
            >
              {isIt ? "I cardini operativi di IMPACTA" : "Operational Core of IMPACTA"}
            </RevealText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safetyPillars.map((pillar) => (
              <PerspectiveCard key={pillar.num} maxTilt={4} className="h-full">
                <div className="h-full bg-white border border-[#E5E5E3] rounded-2xl p-8 flex flex-col justify-between space-y-6 shadow-sm hover:border-[#0E0F10] transition-colors">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E3]">
                      <span className="text-2xl font-bold text-[#0E0F10]">
                        {pillar.num}
                      </span>
                      <span className="text-[11px] font-medium uppercase tracking-wider text-[#777777]">
                        {pillar.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold uppercase text-[#0E0F10]">
                      {pillar.title}
                    </h3>
                    <p className="text-[#666666] font-light text-sm sm:text-base leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#E5E5E3] text-[11px] uppercase tracking-wider text-[#777777] font-medium">
                    VERIFIED ETHICAL GOVERNANCE
                  </div>
                </div>
              </PerspectiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-20 bg-white">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold uppercase text-[#0E0F10]">
              {isIt ? "Approfondisci la nostra architettura" : "Learn more about our architecture"}
            </h3>
            <p className="text-sm text-[#666666] mt-1 font-light">
              {isIt ? "Consulta la specifica tecnica browser-local e carrier roadmap." : "Review our browser-local technical specification and carrier roadmap."}
            </p>
          </div>
          <Link
            href="/technology"
            className="group inline-flex items-center justify-center gap-2 min-h-[52px] px-8 bg-[#0E0F10] text-white text-xs font-bold tracking-wider uppercase hover:bg-black transition-colors"
          >
            <span>{isIt ? "Architettura Tecnologica" : "Technical Architecture"}</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
