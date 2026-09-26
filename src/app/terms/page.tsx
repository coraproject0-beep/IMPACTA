"use client";

import React from "react";
import { PublicShell } from "@/components/public/PublicShell";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";

import { useLanguage } from "@/context/LanguageContext";

export default function TermsPage() {
  return (
    <PublicShell>
      <TermsContent />
    </PublicShell>
  );
}

function TermsContent() {
  const { language } = useLanguage();
  const isIt = language === "it";

  return (
    <>
      <section className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-4xl mx-auto space-y-4">
          <TechnicalReveal className="text-xs sm:text-sm uppercase tracking-wider text-[#666666] font-semibold">
            {isIt ? "NOTE LEGALI & PROTOCOLLO" : "LEGAL DISCLAIMERS & PROTOCOL"}
          </TechnicalReveal>
          <EditorialReveal
            as="h1"
            className="text-4xl sm:text-6xl font-bold tracking-tight text-[#0E0F10] uppercase"
          >
            {isIt ? "Termini di Utilizzo & Note Legali" : "Terms of Use & Disclaimers"}
          </EditorialReveal>
          <p className="text-sm font-medium text-[#666666]">
            {isIt ? "Versione 2.0 • Prototipo Accademico e Dimostrativo" : "Version 2.0 • Academic & Demonstration Prototype"}
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-32 bg-[#F7F7F6]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-4xl mx-auto bg-white border border-[#E5E5E3] rounded-2xl p-8 sm:p-16 space-y-12 text-base sm:text-lg text-[#0E0F10] leading-relaxed font-light">
          <div className="space-y-3 pb-8 border-b border-[#E5E5E3]">
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#0E0F10]">
              {isIt ? "1. Dimostrazione Non Commerciale" : "1. Non-Commercial Demonstration"}
            </h2>
            <p>
              {isIt
                ? "IMPACTA è un prototipo accademico e concettuale di design. Non è autorizzato come compagnia assicurativa, fondo comune, studio legale o servizio di pronto intervento. In presenza di emergenze reali, chiamare sempre immediatamente il 112."
                : "IMPACTA is an academic and product design proof of concept. It is not licensed as an insurance company, mutual fund, law firm, or dispatch emergency service. In the event of real-world emergencies, always dial 112 immediately."}
            </p>
          </div>

          <div className="space-y-3 pb-8 border-b border-[#E5E5E3]">
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#0E0F10]">
              {isIt ? "2. Separazione dei Fatti Probatori & Assenza di Responsabilità Automatica" : "2. Evidence Separation & Zero Liability Automation"}
            </h2>
            <p>
              {isIt
                ? "In nessun caso questo software stabilisce colpe o responsabilità civili o penali né importi risarcitori vincolanti. Tutte le informazioni, angolazioni d'urto e corrispondenze al modulo CAI sono ausili tecnici strutturati a supporto esclusivo della valutazione peritale umana."
                : "Under no circumstances does this software determine legal civil liability, penal guilt, or binding financial compensation amounts. All data, collision angles, and CAI Box 12 mapping outputs are advisory technical structuring aids created for qualified human review."}
            </p>
          </div>

          <div className="space-y-3 pb-8 border-b border-[#E5E5E3]">
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#0E0F10]">
              {isIt ? "3. Accettazione delle Condizioni" : "3. Acceptance of Terms"}
            </h2>
            <p>
              {isIt
                ? "Accedendo a questo ambiente dimostrativo, l'utente riconosce che vengono impiegati dati simulati e memoria locale del browser, senza garanzie per usi commerciali o legali."
                : "By accessing and using this demonstration environment, you acknowledge that simulated data and local browser storage are utilized without warranty of commercial fitness."}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#0E0F10]">
              {isIt ? "4. Entità Fittizie e Relazioni Illustrative" : "4. Fictional Entities and Illustrative Relationships"}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#444444]">
              <strong>EN:</strong> Names, wordmarks, organizations, insurers, mobility companies, partners, customers, claims, vehicles and commercial relationships displayed in this academic prototype may be fictional or synthetic and are presented solely for demonstration purposes. Their appearance does not indicate any real affiliation, endorsement, partnership or commercial relationship.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-[#444444] pt-2">
              <strong>IT:</strong> Nomi, wordmark, organizzazioni, compagnie assicurative, società di mobilità, partner, clienti, sinistri, veicoli e relazioni commerciali mostrati in questo prototipo accademico possono essere fittizi o sintetici e sono presentati esclusivamente a scopo dimostrativo. La loro presenza non implica alcuna reale affiliazione, approvazione, partnership o relazione commerciale.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
