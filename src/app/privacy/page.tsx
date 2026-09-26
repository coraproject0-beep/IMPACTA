"use client";

import React from "react";
import { PublicShell } from "@/components/public/PublicShell";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";

import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
  return (
    <PublicShell>
      <PrivacyContent />
    </PublicShell>
  );
}

function PrivacyContent() {
  const { language } = useLanguage();
  const isIt = language === "it";

  return (
    <>
      <section className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-4xl mx-auto space-y-4">
          <TechnicalReveal className="text-xs sm:text-sm uppercase tracking-wider text-[#666666] font-semibold">
            {isIt ? "GOVERNANCE & TRASPARENZA" : "GOVERNANCE & DISCLOSURE"}
          </TechnicalReveal>
          <EditorialReveal
            as="h1"
            className="text-4xl sm:text-6xl font-bold tracking-tight text-[#0E0F10] uppercase"
          >
            {isIt ? "Informativa sulla Privacy & Archiviazione Locale" : "Privacy Policy & Storage Architecture"}
          </EditorialReveal>
          <p className="text-sm font-medium text-[#666666]">
            {isIt ? "Data di efficacia: Settembre 2026 • Specifica Prototipo" : "Effective Date: September 2026 • Prototype Specification"}
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-32 bg-[#F7F7F6]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-4xl mx-auto bg-white border border-[#E5E5E3] rounded-2xl p-8 sm:p-16 space-y-12 text-base sm:text-lg text-[#0E0F10] leading-relaxed font-light">
          <div className="space-y-3 pb-8 border-b border-[#E5E5E3]">
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#0E0F10]">
              {isIt ? "1. Ambito del Prototipo & Persistenza Locale" : "1. Prototype Scope & Local Persistence"}
            </h2>
            <p>
              {isIt
                ? "IMPACTA è un prototipo accademico e ingegneristico. Questo software non gestisce un database commerciale esterno. Tutti i dati inseriti nell'applicazione — comprese date di collisione, coordinate, targhe e dichiarazioni dei conducenti — sono elaborati e memorizzati esclusivamente all'interno del browser locale dell'utente."
                : "IMPACTA is an academic and engineering prototype. This software does not operate an external commercial database. All data entered into the application—including accident dates, coordinates, license plates, and driver statements—is processed and persisted exclusively inside your local browser instance."}
            </p>
          </div>

          <div className="space-y-3 pb-8 border-b border-[#E5E5E3]">
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#0E0F10]">
              {isIt ? "2. Tecnologie di Archiviazione nel Browser" : "2. Browser Storage Technologies"}
            </h2>
            <p>
              {isIt
                ? "Utilizziamo due tecnologie standard W3C di salvataggio lato client:"
                : "We utilize two standard W3C client-side storage technologies:"}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-[#444444]">
              <li>
                <strong>`localStorage`:</strong> {isIt ? "memorizza i fascicoli di sinistro (`impacta_claims_v1`), le bozze del conducente (`impacta_driver_draft_v1`), la lingua selezionata (`impacta_language_preference`) e le credenziali demo (`impacta_driver_session`, `impacta_insurer_session`)." : "Stores claims records (`impacta_claims_v1`), draft states (`impacta_driver_draft_v1`), language choices (`impacta_language_preference`), and demo credentials (`impacta_driver_session`, `impacta_insurer_session`)."}
              </li>
              <li>
                <strong>`IndexedDB` (`impacta_media_db`):</strong> {isIt ? "memorizza i blob fotografici in locale sul dispositivo per evitare il consumo eccessivo di memoria di sistema." : "Stores photographic image blobs locally on device to prevent browser memory exhaustion."}
              </li>
            </ul>
            <p className="pt-2 text-sm text-[#666666]">
              {isIt
                ? "Nessun dato viene trasmesso a server cloud o tracker di terze parti durante l'esecuzione del prototipo."
                : "Data is never transmitted to cloud servers or third-party trackers during prototype operation."}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#0E0F10]">
              {isIt ? "3. Cancellazione dei Dati" : "3. Data Erasure"}
            </h2>
            <p>
              {isIt
                ? "È possibile azzerare immediatamente tutti i sinistri registrati, le fotografie e i token di sessione cliccando sul comando «Ripristina Stato Demo» all'interno della Console Sinistri, oppure cancellando i dati del sito dal browser."
                : "You can instantly purge all stored claims, photographs, and session tokens by clicking the Reset Demo State command located in the Claims Console or by clearing your browser site data."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
