"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { TextReveal } from "@/components/motion/TextReveal";
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
    setSubmitted(true);
  };

  return (
    <PublicShell>
      {/* Header */}
      <section className="py-20 sm:py-32 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <TextReveal delayMs={0}>
              <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-blue-700">
                Get in Touch
              </p>
            </TextReveal>
            <TextReveal delayMs={80} as="h1" className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 leading-tight">
              Contact the IMPACTA research &amp; design team.
            </TextReveal>
            <TextReveal delayMs={160} as="p" className="text-lg sm:text-xl text-slate-600 leading-relaxed">
              We welcome evaluation feedback, academic collaboration, and inquiries from insurance claims professionals and mobility researchers.
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Main Grid: Form + Address Details */}
      <section className="py-20 sm:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-xs space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-950">
                  Send a Research or Evaluation Message
                </h2>
                <p className="text-sm text-slate-500">
                  Client-side prototype interface. Your submission triggers a simulated confirmation.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-4">
                  <div className="flex items-center gap-2.5 font-bold text-base">
                    <CheckCircleIcon size={22} className="text-emerald-700" />
                    <span>Message Recorded in Local Prototype</span>
                  </div>
                  <p className="text-sm text-emerald-900 leading-relaxed">
                    Thank you, {formState.name || "Colleague"}. In this evaluation environment, your feedback has been acknowledged. For direct inquiries, email us at <span className="font-mono font-semibold">hello@impacta-demo.eu</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-sm font-semibold text-emerald-800 hover:underline pt-2 inline-block"
                  >
                    ← Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-800 block text-sm">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Dr. Laura Conti"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 text-base min-h-[46px]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-800 block text-sm">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="laura.conti@university.it"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 text-base min-h-[46px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-800 block text-sm">
                        Organization / University
                      </label>
                      <input
                        type="text"
                        value={formState.organization}
                        onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                        placeholder="e.g. Politecnico di Milano"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 text-base min-h-[46px]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-800 block text-sm">
                        Inquiry Topic
                      </label>
                      <select
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 text-base min-h-[46px]"
                      >
                        <option value="Academic Inquiry">Academic Research &amp; Evaluation</option>
                        <option value="Claims Carrier Feedback">Insurance Carrier Evaluation</option>
                        <option value="Mobility Telemetry">Automotive Telematics Protocol</option>
                        <option value="General Feedback">General User Interface Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-800 block text-sm">
                      Message Content
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Please enter your evaluation notes or inquiry details..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 text-base resize-y"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all active:scale-[0.98] flex items-center justify-center gap-2 min-h-[48px]"
                    >
                      <span>Submit Inquiry</span>
                      <ArrowRightIcon size={16} />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Details (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-5 text-sm">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Demonstration Entity
                </p>
                <div>
                  <h3 className="text-lg font-bold text-slate-950">IMPACTA Labs</h3>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    Via della Mobilità 24<br />
                    20121 Milano, Italy
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Research Inquiries:</span>
                    <a href="mailto:hello@impacta-demo.eu" className="font-mono text-blue-700 hover:underline font-medium">
                      hello@impacta-demo.eu
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Prototype Support:</span>
                    <a href="mailto:support@impacta-demo.eu" className="font-mono text-blue-700 hover:underline font-medium">
                      support@impacta-demo.eu
                    </a>
                  </div>
                </div>

                <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-950 leading-relaxed">
                  <strong>Academic Prototype Notice:</strong> The company name, street address, and email domains above are fictional demonstration placeholders. They must be updated with authentic legal entity credentials prior to commercial deployment.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
