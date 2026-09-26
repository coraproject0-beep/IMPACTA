"use client";

import React from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";
import { RevealText } from "@/components/motion/RevealText";
import { useLanguage } from "@/context/LanguageContext";

export default function PlatformPage() {
  return (
    <PublicShell>
      <PlatformContent />
    </PublicShell>
  );
}

function PlatformContent() {
  const { locale } = useLanguage();
  const isIt = locale === "it";

  const flowPhases = [
    {
      kicker: isIt ? "Ingresso prove sul campo" : "Field Evidence Ingestion",
      title: isIt ? "Rilievo guidato sul luogo dell'urto" : "Calm roadside evidence capture",
      actor: isIt ? "Conducente • Sensori smartphone nativi" : "Roadside driver • Native mobile sensors",
      description: isIt
        ? "Subito dopo l'impatto, l'interfaccia assiste l'automobilista nella messa in sicurezza fisica (chiamata d'emergenza 112 e collocazione del triangolo), per poi guidare quattro prospetti fotografici essenziali con geolocalizzazione e orientamento della carreggiata."
        : "Immediately post-collision, the web client prioritizes physical safety (direct 112 emergency access and safe refuge guidance), followed by four essential photographic perspectives enriched with localized GPS coordinates and roadway orientation.",
      detailHeader: isIt ? "Elementi acquisiti" : "Recorded elements",
      details: [
        { label: isIt ? "Inquadrature essenziali" : "Essential perspectives", val: isIt ? "Panoramica, punto d'urto, controparte, contesto" : "Overview, contact zone, counterparty, context" },
        { label: isIt ? "Geolocalizzazione" : "Geographic context", val: isIt ? "Coordinate GNSS e orientamento strada" : "GNSS coordinates & road heading" },
        { label: isIt ? "Timestamp" : "Local timestamp", val: isIt ? "Data e ora certificate sul dispositivo" : "Device localized timestamp" },
      ],
    },
    {
      kicker: isIt ? "Allineamento contestuale" : "Contextual Alignment",
      title: isIt ? "Sintesi coerente delle evidenze" : "Coherent multimodal synthesis",
      actor: isIt ? "Pipeline di normalizzazione dati" : "Data normalization pipeline",
      description: isIt
        ? "Le fotografie identificano le deformazioni della carrozzeria e la targa del veicolo antagonista. I dati di movimento registrati sul dispositivo vengono correlati con la dinamica dell'impatto, eliminando incongruenze tra dichiarazioni e danni visibili."
        : "Visual analysis isolates vehicle deformation zones and verifies counterparty registration. Motion signals recorded on the device correlate with the impact moment, resolving contradictions between driver recollections and physical damage.",
      detailHeader: isIt ? "Parametri verificati" : "Verified parameters",
      details: [
        { label: isIt ? "Identificazione controparte" : "Counterparty verification", val: isIt ? "Targa e modello veicolo allineati" : "Plate registration & vehicle match" },
        { label: isIt ? "Vettori di contatto" : "Contact vectors", val: isIt ? "Angolo e zona d'urto coerenti" : "Consistent angle & contact zone" },
        { label: isIt ? "Integrità metadati" : "Metadata consistency", val: isIt ? "EXIF e posizione temporale coerenti" : "Consistent EXIF & temporal alignment" },
      ],
    },
    {
      kicker: isIt ? "Strutturazione normativa" : "Regulatory Structuring",
      title: isIt ? "Allineamento allo Standard CAI Europeo" : "European CAI Box 12 alignment",
      actor: isIt ? "Regole standard • Constatazione Amichevole" : "Standard rules • Agreed Statement of Facts",
      description: isIt
        ? "Il sistema separa rigorosamente i fatti fisici osservati dalle dichiarazioni soggettive. Gli elementi del sinistro vengono mappati direttamente nelle caselle standard della Constatazione Amichevole Europea (Modulo CAI) per agevolare la liquidazione."
        : "Observed physical facts are strictly demarcated from subjective driver statements. Incident circumstances map directly into standard European Agreed Statement criteria (CAI Box 12), ensuring complete procedural alignment.",
      detailHeader: isIt ? "Mappatura standard" : "Standard formulation",
      details: [
        { label: isIt ? "Circostanze accertate" : "Documented circumstances", val: isIt ? "Casella 12 Modulo CAI allineata" : "Aligned European CAI Box 12" },
        { label: isIt ? "Demarcazione epistemica" : "Epistemic demarcation", val: isIt ? "Fatti separati dalle interpretazioni" : "Facts separated from narratives" },
        { label: isIt ? "Conflitti risolti" : "Ambiguity reduction", val: isIt ? "Dichiarazioni speculari verificate" : "Bilateral statements cross-checked" },
      ],
    },
    {
      kicker: isIt ? "Delibera e perizia" : "Adjuster Deliberation",
      title: isIt ? "Supervisione umana abilitata" : "Licensed human adjuster adjudication",
      actor: isIt ? "Perito liquidatore • Ufficio Sinistri" : "Licensed claims adjuster • Claims desk",
      description: isIt
        ? "Il liquidatore riceve nella Console Sinistri un fascicolo ordinato, trasparente e immediatamente valutabile. Nessun algoritmo impone decisioni di colpa: la responsabilità civile e la perizia economica restano al 100% umane."
        : "Claims adjusters receive an organized, transparent dossier inside the Claims Console. No opaque algorithm decrees fault: civil liability and monetary settlement remain 100% human-governed.",
      detailHeader: isIt ? "Riepilogo accertamenti" : "Verified summary",
      details: [
        { label: isIt ? "Fascicolo sinistro" : "Claim file", val: isIt ? "Strutturato e pronto per la perizia" : "Structured for prompt review" },
        { label: isIt ? "Tracciabilità" : "Audit trail", val: isIt ? "Cronologia completa e verificabile" : "Complete verifiable audit trail" },
        { label: isIt ? "Autorità deliberante" : "Final authority", val: isIt ? "Perito assicurativo umano" : "Human claims specialist" },
      ],
    },
  ];

  return (
    <>
      {/* Header Scene */}
      <section className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-6">
          <TechnicalReveal className="text-xs sm:text-sm font-medium text-[#555555]">
            {isIt ? "Il ciclo operativo del sinistro" : "The claim lifecycle"}
          </TechnicalReveal>
          <EditorialReveal
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0F10] leading-[1.04] uppercase max-w-5xl"
          >
            {isIt ? (
              <>
                Dalla collisione alla perizia.
                <br />
                Un processo continuo e verificabile.
              </>
            ) : (
              <>
                From roadside impact to claims desk.
                <br />
                A continuous, verifiable progression.
              </>
            )}
          </EditorialReveal>
          <p className="text-lg sm:text-2xl text-[#666666] leading-relaxed max-w-3xl font-light">
            {isIt
              ? "Nessuna modulistica confusa, nessun contenzioso prolungato. Un flusso armonico e strutturato progettato per proteggere automobilisti e facilitare i periti."
              : "Zero paperwork confusion, zero protracted dispute delays. A continuous spatial workflow engineered to support drivers and empower claims specialists."}
          </p>
        </div>
      </section>

      {/* Continuous Spatial Progression Flow */}
      <div className="w-full bg-[#F7F7F6]">
        {flowPhases.map((phase, idx) => (
          <section
            key={idx}
            className="w-full border-b border-[#E5E5E3] py-20 sm:py-28"
          >
            <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left Column: Narrative Statement */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#777777] block">
                    {phase.kicker}
                  </span>
                  <RevealText
                    as="h2"
                    mode="word"
                    variant="slide-lateral"
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#0E0F10] leading-tight"
                  >
                    {phase.title}
                  </RevealText>
                  <span className="text-xs text-[#888888] block pt-1">
                    {phase.actor}
                  </span>
                </div>

                <p className="text-base sm:text-xl text-[#555555] font-light leading-relaxed max-w-2xl">
                  {phase.description}
                </p>
              </div>

              {/* Right Column: Spatial Evidence Plane */}
              <div className="lg:col-span-5 [perspective:1000px]">
                <div className="bg-white border border-[#E5E5E3] rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm transition-transform duration-500 hover:[transform:rotateY(-2deg)_rotateX(2deg)]">
                  <div className="pb-3 border-b border-[#E5E5E3]">
                    <span className="text-xs font-semibold tracking-wider text-[#777777] uppercase">
                      {phase.detailHeader}
                    </span>
                  </div>

                  <div className="space-y-3.5 text-xs sm:text-sm">
                    {phase.details.map((d, dIdx) => (
                      <div key={dIdx} className="space-y-1">
                        <span className="text-[#888888] text-xs uppercase block">{d.label}</span>
                        <span className="font-semibold text-[#0E0F10] block">{d.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Closing CTA */}
      <section className="py-20 bg-white">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold uppercase text-[#0E0F10]">
              {isIt ? "Inizia la segnalazione" : "Begin roadside report"}
            </h3>
            <p className="text-sm text-[#666666] mt-1 font-light">
              {isIt ? "Sperimenta il flusso di segnalazione per automobilisti." : "Experience the consumer driver workflow."}
            </p>
          </div>
          <Link
            href="/app/report"
            className="group inline-flex items-center justify-center gap-2 min-h-[52px] px-8 bg-[#0E0F10] text-white text-xs font-bold tracking-wider uppercase hover:bg-black transition-colors"
          >
            <span>{isIt ? "Segnala un sinistro" : "Report an accident"}</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
