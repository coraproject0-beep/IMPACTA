import React from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";

export const metadata = {
  title: "Privacy Policy (Academic Prototype) — IMPACTA",
  description:
    "Privacy and data disclosure policy for the IMPACTA academic research and evaluation prototype.",
};

export default function PrivacyPage() {
  return (
    <PublicShell>
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            Academic Prototype Disclosure
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Privacy Policy &amp; Data Disclosures
          </h1>
          <p className="text-sm text-slate-500 font-mono">
            Effective Date: September 2026 · Version 2.0 (Prototype)
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-xs space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-950">
              1. Prototype Status &amp; Scope
            </h2>
            <p>
              IMPACTA is an academic and technical evaluation prototype developed by the Token Titans research team. This software is provided solely for interface demonstration, accessibility evaluation, and product architecture assessment. It is not an active commercial service, does not operate commercial databases, and is not connected to any live emergency response or public safety network.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-950">
              2. Browser-Local Storage Architecture
            </h2>
            <p>
              All data entered into the application—including accident dates, location coordinates, vehicle registrations, and driver narratives—is processed and persisted <strong>exclusively inside your local web browser</strong>. We utilize two standard HTML5 client-side storage technologies:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>
                <strong>`localStorage` (Keys: `impacta_claims_v1`, `impacta_driver_draft_v1`):</strong> Stores structured text fields, draft reporting states, and claims ledgers.
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
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-950">
              3. Handling of Photographic Evidence
            </h2>
            <p>
              Photos captured via device cameras or uploaded from local disks remain entirely on your device. Previews are generated via temporary object URLs (`URL.createObjectURL`), and binary files are stored in your device&apos;s IndexedDB sandbox. No optical facial recognition, external biometric profiling, or automated license-plate lookup is performed against third-party governmental or commercial registers.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-950">
              4. No Carrier Transmission
            </h2>
            <p>
              Clicking &ldquo;Submit Claim Report&rdquo; compiles the dossier and saves it into your browser&apos;s local storage ledger. It does <strong>not</strong> send an electronic notice of loss to any real insurance company (such as Allianz, Generali, or UnipolSai), nor does it file a report with police or judicial authorities.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-950">
              5. Synthetic &amp; Fictional Demonstrations
            </h2>
            <p>
              Pre-configured profiles (such as &ldquo;Matteo Bianchi&rdquo;) and all 14 baseline claim dossiers in the Claims Operations Console are entirely synthetic, fictional records constructed for evaluation purposes. Any resemblance to real persons, actual vehicle collisions, or existing insurance policy numbers is purely coincidental.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-950">
              6. Data Deletion &amp; Reset Hook
            </h2>
            <p>
              You maintain total sovereignty over all data created during your evaluation. You may purge all local data at any time by:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-slate-600">
              <li>Navigating to the <strong>Driver Profile</strong> (`/app/profile`) and clicking &ldquo;Reset Prototype Data&rdquo;.</li>
              <li>Or clearing your browser&apos;s site data and cookies for this origin.</li>
            </ol>
            <p>
              This action completely wipes `impacta_claims_v1`, `impacta_driver_draft_v1`, and clears the `evidence_blobs` store in IndexedDB.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-950">
              7. Future Production Security Requirements
            </h2>
            <p>
              Prior to any future commercial or production deployment, IMPACTA will implement full compliance with the European Union General Data Protection Regulation (GDPR / Regulation (EU) 2016/679), Italian Data Protection Code (D.Lgs. 196/2003 as amended), ANIA/IVASS regulatory security directives, ISO/IEC 27001 certification, end-to-end TLS 1.3 encryption, and data processing agreements with carrier partners.
            </p>
          </div>

          {/* Section 8 */}
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-950">
              8. Contact &amp; Questions
            </h2>
            <p>
              For academic or technical inquiries regarding this prototype, contact the research team at{" "}
              <span className="font-mono text-blue-600">hello@impacta-demo.eu</span> or consult our{" "}
              <Link href="/contact" className="text-blue-600 hover:underline">
                Contact Page
              </Link>.
            </p>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
