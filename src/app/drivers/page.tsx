"use client";

import React from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";
import { RevealText } from "@/components/motion/RevealText";
import { FullBleedImage } from "@/components/motion/FullBleedImage";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

import { DriverVehicleScene3D } from "@/components/motion/DriverVehicleScene3D";

export default function DriversPage() {
  return (
    <PublicShell>
      <DriversContent />
    </PublicShell>
  );
}

function DriversContent() {
  const { language, t } = useLanguage();
  const { isDriverAuthenticated } = useAuth();
  const isIt = language === "it";
  const reportLink = isDriverAuthenticated ? "/app/report" : "/login?redirect=/app/report";

  const workflowSteps = [
    {
      step: "01",
      title: isIt ? "Sicurezza e Chiamata 112" : "Physical Safety & 112 Access",
      desc: isIt
        ? "Verifica l'incolumità delle persone, chiama i soccorsi se necessario e posiziona il triangolo prima di ogni altra operazione."
        : "Verify physical well-being, call emergency services if required, and retreat to a safe refuge before any documentation.",
    },
    {
      step: "02",
      title: isIt ? "Quattro Inquadrature Guidate" : "Four Guided Perspectives",
      desc: isIt
        ? "Il mirino a schermo suggerisce come posizionare la fotocamera per documentare veicoli, targhe, punti d'urto e contesto."
        : "Clear on-screen framing helps you capture scene context, vehicle plates, contact areas, and road markings with ease.",
    },
    {
      step: "03",
      title: isIt ? "Dati Controparte Semplificati" : "Streamlined Counterparty Info",
      desc: isIt
        ? "Inserisci o acquisisci rapidamente targa, assicurazione e dettagli dell'altro veicolo senza moduli illeggibili."
        : "Easily record or capture registration, insurance details, and driver accounts without deciphering messy paper forms.",
    },
    {
      step: "04",
      title: isIt ? "Conferma e Fascicolo Pronto" : "Immediate Dossier Generation",
      desc: isIt
        ? "Tutti gli elementi vengono ordinati in un riepilogo chiaro pronto per la compagnia assicurativa e per la perizia."
        : "All captured evidence is structured into a clean chronological file ready for your insurance provider.",
    },
  ];

  return (
    <>
      {/* Hero Header */}
      <section className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-6">
          <TechnicalReveal className="text-xs sm:text-sm font-medium text-[#555555]">
            {isIt ? "Assistenza per il conducente" : "Driver roadside support"}
          </TechnicalReveal>
          <EditorialReveal
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0F10] leading-[1.04] uppercase max-w-5xl"
          >
            {isIt ? (
              <>
                Nessuna confusione.
                <br />
                Solo guida calma sul posto.
              </>
            ) : (
              <>
                Zero confusion.
                <br />
                Calm guidance at the roadside.
              </>
            )}
          </EditorialReveal>
          <p className="text-lg sm:text-2xl text-[#666666] leading-relaxed max-w-3xl font-light">
            {isIt
              ? "Un incidente è un momento di forte tensione. IMPACTA ti guida passo dopo passo: verifica la tua sicurezza fisica, ti assiste nelle fotografie e ordina i fatti prima che subentri l'incertezza."
              : "Collisions are disorienting and stressful. IMPACTA provides gentle, step-by-step guidance: safeguarding your physical well-being first, guiding your photos, and organizing the facts before memory fades."}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              href={reportLink}
              className="group inline-flex items-center justify-center gap-2 min-h-[52px] px-8 bg-[#0E0F10] text-white text-xs font-bold tracking-wider uppercase hover:bg-black transition-colors"
            >
              <span>{t("nav.reportAccident")}</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                →
              </span>
            </Link>
            <Link
              href="/app"
              className="inline-flex items-center justify-center min-h-[52px] px-8 border border-[#E5E5E3] text-[#0E0F10] text-xs font-semibold tracking-wider uppercase hover:border-[#0E0F10] transition-colors"
            >
              {isIt ? "Accedi all'Area Personale" : "Open Driver Personal Area"}
            </Link>
          </div>
        </div>
      </section>

      {/* Atmospheric Context Scene */}
      <section className="relative w-full bg-[#0E0F10] text-white">
        <FullBleedImage
          src="/images/hero-car.jpg"
          alt="Driver vehicle inspection"
          overlayClassName="bg-gradient-to-t from-[#0E0F10] via-[#0E0F10]/50 to-transparent"
        >
          <div className="max-w-4xl space-y-6">
            <span className="text-xs font-medium text-white/60">
              {isIt ? "Rilievo fotografico assistito" : "Guided photographic capture"}
            </span>
            <RevealText
              as="h2"
              mode="word"
              variant="rotate-plane"
              className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-tight"
            >
              {isIt ? "Quattro inquadrature semplici e chiare" : "Four Simple, Reassuring Steps"}
            </RevealText>
            <p className="text-base sm:text-xl text-white/70 font-light leading-relaxed max-w-2xl">
              {isIt
                ? "Senza formulari incomprensibili sul ciglio della strada: lo schermo ti mostra esattamente come posizionare la fotocamera per documentare la scena in pochi minuti."
                : "No complex legal paperwork on the shoulder of the road. Your phone indicates exactly how to frame the vehicles and roadway in just a few minutes."}
            </p>
          </div>
        </FullBleedImage>
      </section>

      {/* Major Spatial Scene with Vehicle Damage Animation & Step Progression */}
      <section className="py-24 sm:py-36 bg-[#F7F7F6] border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Driver 3D Vehicle Scene with Stylized Damage Animation */}
          <div className="lg:col-span-6">
            <DriverVehicleScene3D />
          </div>

          {/* Right: Step Progression Narrative */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-[#777777] font-medium">
                {isIt ? "IL PERCORSO GUIDATO" : "CALM STEP PROGRESSION"}
              </span>
              <RevealText
                as="h2"
                mode="word"
                variant="rotate-plane"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#0E0F10] leading-tight"
              >
                {isIt
                  ? "Semplice, umano e rassicurante."
                  : "Simple, calm, and reassuring."}
              </RevealText>
            </div>

            <div className="space-y-6 pt-2">
              {workflowSteps.map((s) => (
                <div key={s.step} className="flex gap-5 items-start">
                  <span className="text-sm font-medium text-[#888888] pt-0.5">
                    {s.step}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#0E0F10] uppercase tracking-tight">
                      {s.title}
                    </h3>
                    <p className="text-sm text-[#666666] leading-relaxed font-light">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href={reportLink}
                className="group inline-flex items-center gap-3 text-sm font-semibold text-[#0E0F10] border-b border-[#0E0F10] pb-1 hover:text-black transition-colors"
              >
                <span>{isIt ? "Inizia la segnalazione ora" : "Begin accident report"}</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Human Safety Protocol */}
      <section className="py-20 sm:py-28 bg-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-600">
              {isIt ? "Numero Unico Europeo 112" : "European Emergency 112"}
            </span>
            <RevealText
              as="h2"
              mode="word"
              variant="rotate-plane"
              className="text-3xl sm:text-4xl font-bold uppercase text-[#0E0F10]"
            >
              {isIt ? "La salute prima di ogni dato" : "Human safety precedes data"}
            </RevealText>
          </div>

          <div className="lg:col-span-7 space-y-4 text-base sm:text-lg text-[#666666] font-light leading-relaxed">
            <p>
              {isIt
                ? "Il primo passo del sistema verifica immediatamente se ci sono persone ferite. In caso di necessità, un pulsante diretto consente di contattare subito il 112 senza costringerti a compilare schermate o moduli."
                : "The first step of our protocol evaluates whether anyone requires medical attention. If necessary, a direct one-tap button connects with European Emergency 112 without forcing any form completion."}
            </p>
            <p>
              {isIt
                ? "Solo una volta accertata la sicurezza di tutti gli occupanti l'applicazione sblocca il rilievo fotografico."
                : "Only once the physical safety of all occupants is verified does the interface unlock photographic evidence intake."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
