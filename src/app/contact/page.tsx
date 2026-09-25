"use client";

import React, { useState } from "react";
import { PublicShell } from "@/components/public/PublicShell";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";
import { CheckCircleIcon } from "@/components/icons/Icons";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { language } = useLanguage();
  const isIt = language === "it";
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "Academic Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PublicShell>
      {/* Header */}
      <section className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-6">
          <TechnicalReveal className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#666666]">
            {isIt ? "CONTATTI & COLLABORAZIONI" : "CONTACT & EVALUATION"}
          </TechnicalReveal>
          <EditorialReveal
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0F10] leading-[1.04] uppercase max-w-5xl"
          >
            {isIt ? (
              <>
                Entra in contatto con
                <br />
                il team IMPACTA.
              </>
            ) : (
              <>
                Contact the IMPACTA
                <br />
                research &amp; design team.
              </>
            )}
          </EditorialReveal>
          <p className="text-lg sm:text-2xl text-[#666666] leading-relaxed max-w-3xl font-light">
            {isIt
              ? "Siamo aperti al confronto con periti assicurativi, compagnie, centri di ricerca sulla mobilità e ingegneri forensi."
              : "We welcome academic collaboration, design critique, and inquiries from insurance carriers and forensic researchers."}
          </p>
        </div>
      </section>

      {/* Main Form & Office Composition */}
      <section className="py-24 sm:py-36 bg-[#F7F7F6]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Form */}
            <div className="lg:col-span-7 bg-white border border-[#E5E5E3] rounded-xl p-8 sm:p-14 space-y-8">
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#666666]">
                  {isIt ? "MODULO DI CONTATTO" : "DIRECT INQUIRY FORM"}
                </span>
                <h2 className="text-2xl font-bold uppercase text-[#0E0F10]">
                  {isIt ? "Invia un messaggio" : "Send a message"}
                </h2>
              </div>

              {submitted ? (
                <div className="p-8 border border-[#0E0F10] bg-[#F7F7F6] rounded-xl space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon size={22} className="text-[#0E0F10]" />
                    <span className="text-lg font-bold uppercase text-[#0E0F10]">
                      {isIt ? "Messaggio Inviato con Successo" : "Message Sent Successfully"}
                    </span>
                  </div>
                  <p className="text-sm text-[#666666] font-light leading-relaxed">
                    {isIt
                      ? "Grazie per aver contattato IMPACTA Labs. Risponderemo al più presto."
                      : "Thank you for contacting IMPACTA Labs. We will review your inquiry shortly."}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: "", email: "", organization: "", subject: "Academic Inquiry", message: "" });
                    }}
                    className="text-xs font-bold uppercase tracking-wider text-[#0E0F10] underline pt-2"
                  >
                    {isIt ? "Invia un altro messaggio" : "Send another message"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                      {isIt ? "Nome e Cognome *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Dr. Roberto Ferrari"
                      className="w-full min-h-[50px] px-4 border border-[#E5E5E3] rounded-lg bg-white text-[#0E0F10] text-sm focus:outline-none focus:border-[#0E0F10] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                        {isIt ? "Indirizzo Email *" : "Work Email *"}
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="name@organization.eu"
                        className="w-full min-h-[50px] px-4 border border-[#E5E5E3] rounded-lg bg-white text-[#0E0F10] text-sm focus:outline-none focus:border-[#0E0F10] transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                        {isIt ? "Organizzazione" : "Organization"}
                      </label>
                      <input
                        type="text"
                        value={formState.organization}
                        onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                        placeholder="e.g. Aura Mutua / Politecnico"
                        className="w-full min-h-[50px] px-4 border border-[#E5E5E3] rounded-lg bg-white text-[#0E0F10] text-sm focus:outline-none focus:border-[#0E0F10] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                      {isIt ? "Messaggio *" : "Message *"}
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder={isIt ? "Descrivi la tua richiesta, ambito di ricerca o valutazione..." : "Describe your inquiry, research area, or carrier evaluation..."}
                      className="w-full p-4 border border-[#E5E5E3] rounded-lg bg-white text-[#0E0F10] text-sm focus:outline-none focus:border-[#0E0F10] transition-colors font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[52px] bg-[#0E0F10] text-white text-xs font-bold tracking-wider uppercase rounded-lg hover:bg-[#1A1B1C] transition-colors"
                  >
                    {isIt ? "Invia Richiesta" : "Submit Inquiry"}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Laboratory Details */}
            <div className="lg:col-span-5 space-y-10 text-sm">
              <div className="space-y-3 pb-8 border-b border-[#E5E5E3]">
                <span className="text-xs text-[#666666] uppercase tracking-wider font-semibold block">
                  LABORATORY HEADQUARTERS
                </span>
                <h3 className="text-xl font-bold uppercase text-[#0E0F10]">
                  IMPACTA Mobility Intelligence
                </h3>
                <p className="text-[#666666] font-light text-base leading-relaxed">
                  Corso Magenta 85<br />
                  20123 Milano (MI) • Italy
                </p>
              </div>

              <div className="space-y-3 pb-8 border-b border-[#E5E5E3]">
                <span className="text-xs text-[#666666] uppercase tracking-wider font-semibold block">
                  DIRECT CHANNELS
                </span>
                <div className="space-y-1 text-sm text-[#0E0F10]">
                  <div>Research: <span className="font-mono text-xs">research@impacta.mobility.eu</span></div>
                  <div>Carrier Pilot: <span className="font-mono text-xs">claims@impacta.mobility.eu</span></div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#666666] leading-relaxed font-light">
                <span className="font-semibold uppercase tracking-wider block text-[#0E0F10]">GOVERNANCE NOTE</span>
                <p>
                  Academic evaluation prototype. Inquiries handled under GDPR Art. 6(1)(f) legitimate interest for academic and scientific validation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
