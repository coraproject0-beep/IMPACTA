"use client";

import React from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { TextReveal } from "@/components/motion/TextReveal";

export default function PrivacyPage() {
  return (
    <PublicShell>
      <section className="py-20 sm:py-32 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <TextReveal delayMs={0}>
            <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-slate-500">
              Academic Prototype Disclosure
            </p>
          </TextReveal>
          <TextReveal delayMs={80} as="h1" className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950">
            Privacy Policy &amp; Data Disclosures
          </TextReveal>
          <TextReveal delayMs={140} as="p" className="text-sm sm:text-base text-slate-500 font-mono">
            Effective Date: September 2026 · Version 2.0 (Prototype)
          </TextReveal>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-14 rounded-2xl border border-slate-200 shadow-xs space-y-10 text-base sm:text-lg text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
              1. Prototype Status &amp; Scope
            </h2>
            <p>
              IMPACTA is an academic and technical evaluation prototype developed by the Token Titans research team. This software is provided solely for interface demonstration, accessibility evaluation, and product architecture assessment. It is not an active commercial service, does not operate commercial databases, and is not connected to any live emergency response or public safety network.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
              2. Browser-Local Storage Architecture
            </h2>
            <p>
              All data entered into the application—including accident dates, location coordinates, vehicle registrations, and driver narratives—is processed and persisted <strong>exclusively inside your local web browser</strong>. We utilize two standard HTML5 client-side storage technologies:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>
                <strong>`localStorage`:</strong> Stores structured text fields, draft reporting states, claims ledgers (`impacta_claims_v1`, `impacta_driver_draft_v1`), language preference (`impacta_language_preference`), and local demo session tokens (`impacta_driver_session`, `impacta_insurer_session`).
              </li>
              <li>
                <strong>`IndexedDB` (Database: `impacta_media_db`, Store: `evidence_blobs`):</strong> Stores photographic binary blobs locally to prevent browser quota overflow.
              </li>
            </ul>
            <p>
              At no point during standard usage are these records transmitted to an external web server, cloud host, or analytics provider.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
              3. Handling of Photographic Evidence
            </h2>
            <p>
              Photos captured via device cameras or uploaded from local disks remain entirely on your device. Previews are generated via temporary object URLs (`URL.createObjectURL`), and binary files are stored in your device&apos;s IndexedDB sandbox. No optical facial recognition, external biometric profiling, or automated license-plate lookup is performed against third-party governmental or commercial registers.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
              4. No Carrier Transmission
            </h2>
            <p>
              Clicking &ldquo;Submit Claim Report&rdquo; compiles the dossier and saves it into your browser&apos;s local storage ledger. It does <strong>not</strong> send an electronic notice of loss to any real insurance company (such as Allianz, Generali, or UnipolSai), nor does it file a report with police or judicial authorities.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
              5. Synthetic &amp; Fictional Demonstrations
            </h2>
            <p>
              Pre-configured profiles (such as &ldquo;Matteo Bianchi&rdquo;) and all 14 baseline claim dossiers in the Claims Operations Console are entirely synthetic, fictional records constructed for evaluation purposes. Any resemblance to real persons, actual vehicle collisions, or existing insurance policy numbers is purely coincidental.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
              6. Data Deletion &amp; Reset Hook
            </h2>
            <p>
              You maintain total sovereignty over all data created during your evaluation. You may purge all local data at any time by:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-600">
              <li>Navigating to the <strong>Driver Profile</strong> (`/app/profile`) and clicking &ldquo;Reset Prototype Data&rdquo;.</li>
              <li>Or clicking &ldquo;Reset Demo Data&rdquo; in the Claims Operations sidebar.</li>
              <li>Or clearing cookies and site data for this origin in your browser settings.</li>
            </ol>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
