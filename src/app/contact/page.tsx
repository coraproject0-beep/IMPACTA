"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { CheckCircleIcon, ArrowRightIcon } from "@/components/icons/Icons";

export default function ContactPage() {
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
    // Client-side prototype acknowledgment
    setSubmitted(true);
  };

  return (
    <PublicShell>
      {/* Header */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
              Contact the IMPACTA research &amp; design team.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We welcome evaluation feedback, academic collaboration, and inquiries from insurance claims professionals and mobility researchers.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Form + Fictional Address Details */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-slate-950">
                  Send a Research or Evaluation Message
                </h2>
                <p className="text-xs text-slate-500">
                  Client-side prototype interface. Your submission triggers a simulated confirmation.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircleIcon size={18} className="text-emerald-600" />
                    <span>Message Recorded in Local Prototype</span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Thank you, {formState.name || "Colleague"}. In this evaluation environment, your feedback has been acknowledged. For direct inquiries, email us at <span className="font-mono font-semibold">hello@impacta-demo.eu</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-semibold text-emerald-800 hover:underline pt-2"
                  >
                    ← Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-800 block">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Dr. Laura Conti"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-800 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="laura.conti@university.it"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-800 block">
                        Organization / University
                      </label>
                      <input
                        type="text"
                        value={formState.organization}
                        onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                        placeholder="e.g. Politecnico di Milano"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-800 block">
                        Inquiry Topic
                      </label>
                      <select
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                      >
                        <option value="Academic Inquiry">Academic Research &amp; Evaluation</option>
                        <option value="Claims Carrier Feedback">Insurance Carrier Evaluation</option>
                        <option value="Mobility Telemetry">Automotive Telematics Protocol</option>
                        <option value="General Feedback">General User Interface Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-800 block">
                      Message Content
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Please enter your evaluation notes or inquiry details..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 resize-y"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
                    >
                      <span>Submit Inquiry</span>
                      <ArrowRightIcon size={14} />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Fictional Office & Details (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Fictional Details Box */}
              <div className="p-7 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                  Demonstration Entity
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-950">IMPACTA Labs</h3>
                  <p className="text-slate-600 mt-1">
                    Via della Mobilità 24<br />
                    20121 Milano, Italy
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Research Inquiries:</span>
                    <a href="mailto:hello@impacta-demo.eu" className="font-mono text-blue-600 hover:underline">
                      hello@impacta-demo.eu
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Prototype Support:</span>
                    <a href="mailto:support@impacta-demo.eu" className="font-mono text-blue-600 hover:underline">
                      support@impacta-demo.eu
                    </a>
                  </div>
                </div>

                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-[11px] text-amber-900 leading-relaxed">
                  <strong>Academic Prototype Notice:</strong> The company name, street address, and email domains above are fictional demonstration placeholders. They must be updated with authentic legal entity credentials prior to commercial deployment.
                </div>
              </div>

              {/* Evaluation Quick Links */}
              <div className="p-6 bg-slate-100/70 rounded-2xl border border-slate-200 text-xs space-y-3">
                <span className="font-bold text-slate-900 block">Direct Demonstration Links</span>
                <div className="flex flex-col gap-2">
                  <a
                    href="mailto:hello@impacta-demo.eu?subject=IMPACTA%20Prototype%20Feedback"
                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-medium hover:border-slate-300 transition-colors flex items-center justify-between"
                  >
                    <span>Launch Default Mail Client</span>
                    <span className="text-slate-400">↗</span>
                  </a>
                  <Link
                    href="/privacy"
                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-medium hover:border-slate-300 transition-colors flex items-center justify-between"
                  >
                    <span>Inspect Privacy &amp; Data Disclosures</span>
                    <span className="text-slate-400">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
