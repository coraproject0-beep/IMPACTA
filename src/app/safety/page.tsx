"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";
import { FullBleedImage } from "@/components/motion/FullBleedImage";
import { useLanguage } from "@/context/LanguageContext";

export default function SafetyPage() {
  const { language } = useLanguage();

  return (
    <PublicShell>
      {/* Header */}
      <section className="py-24 sm:py-36 bg-white border-b border-[#D7D9D8]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-6">
          <TechnicalReveal className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-[#DC2626]">
            {language === "it" ? "SICUREZZA, ETICA & GOVERNANCE" : "SAFETY, ETHICS & GOVERNANCE"}
          </TechnicalReveal>
          <EditorialReveal
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#090A0A] leading-[1.04] uppercase max-w-5xl"
          >
            {language === "it" ? (
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
          <p className="text-lg sm:text-2xl text-[#6F7375] leading-relaxed max-w-3xl font-light">
            {language === "it"
              ? "Sul ciglio della strada, la sicurezza fisica è l'unica priorità. Nella gestione del sinistro, il rigore probatorio non può mai essere delegato a sentenze automatizzate."
              : "At roadside collisions, physical safety is absolute. In insurance claims processing, evidentiary rigor and legal governance must never be abdicated to automated black boxes."}
          </p>
        </div>
      </section>

      {/* Roadside Safety Protocol Narrative */}
      <section className="py-24 sm:py-36 bg-[#F4F5F3] border-b border-[#D7D9D8]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm font-mono">
            <div className="space-y-3 pb-6 border-b border-[#D7D9D8] md:border-b-0 md:border-r md:pr-8">
              <span className="text-xs text-[#DC2626] font-bold uppercase tracking-wider block">
                EMERGENCY ESCALATION
              </span>
              <h3 className="text-xl font-bold uppercase text-[#090A0A]">
                {language === "it" ? "Chiamata Rapida 112" : "112 Direct Access"}
              </h3>
              <p className="text-[#6F7375] font-light font-sans text-base leading-relaxed">
                {language === "it"
                  ? "Se ci sono feriti, l'interfaccia blocca qualsiasi richiesta documentale e offre un tasto diretto di chiamata verso il Numero Unico di Emergenza Europeo."
                  : "If physical injuries are detected, all questionnaire inputs are halted in favor of an instant dialer connecting directly to European Emergency 112."}
              </p>
            </div>

            <div className="space-y-3 pb-6 border-b border-[#D7D9D8] md:border-b-0 md:border-r md:pr-8">
              <span className="text-xs text-[#090A0A] font-bold uppercase tracking-wider block">
                ROADWAY REFUGING
              </span>
              <h3 className="text-xl font-bold uppercase text-[#090A0A]">
                {language === "it" ? "Incolumità Fuori Carreggiata" : "Safe Refuge Protocol"}
              </h3>
              <p className="text-[#6F7375] font-light font-sans text-base leading-relaxed">
                {language === "it"
                  ? "I conducenti vengono istruiti a indossare il giubbotto catarifrangente e a posizionarsi dietro il guardrail prima di scattare qualsiasi fotografia."
                  : "Drivers are prompted to don high-visibility vests and retreat behind roadside barriers before attempting any photographic capture."}
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs text-[#090A0A] font-bold uppercase tracking-wider block">
                HUMAN GOVERNANCE
              </span>
              <h3 className="text-xl font-bold uppercase text-[#090A0A]">
                {language === "it" ? "Nessuna Sentenza Automatica" : "Zero Automated Decrees"}
              </h3>
              <p className="text-[#6F7375] font-light font-sans text-base leading-relaxed">
                {language === "it"
                  ? "IMPACTA non assegna mai percentuali di colpa. La nostra intelligenza artificiale organizza le prove a supporto dei periti umani abilitati."
                  : "IMPACTA never outputs automated legal fault percentages. Machine models structure empirical facts for licensed human adjusters."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
