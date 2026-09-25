"use client";

import React from "react";
import { PublicShell } from "@/components/public/PublicShell";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";

export default function PrivacyPage() {
  return (
    <PublicShell>
      <section className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-4xl mx-auto space-y-4">
          <TechnicalReveal className="text-xs sm:text-sm uppercase tracking-wider text-[#666666] font-semibold">
            GOVERNANCE &amp; DISCLOSURE
          </TechnicalReveal>
          <EditorialReveal
            as="h1"
            className="text-4xl sm:text-6xl font-bold tracking-tight text-[#0E0F10] uppercase"
          >
            Privacy Policy &amp; Storage Architecture
          </EditorialReveal>
          <p className="text-sm font-mono text-[#666666]">
            Effective Date: September 2026 • Prototype Specification
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-32 bg-[#F7F7F6]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-4xl mx-auto bg-white border border-[#E5E5E3] rounded-2xl p-8 sm:p-16 space-y-12 text-base sm:text-lg text-[#0E0F10] leading-relaxed font-light">
          <div className="space-y-3 pb-8 border-b border-[#E5E5E3]">
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#0E0F10]">
              1. Prototype Scope &amp; Local Persistence
            </h2>
            <p>
              IMPACTA is an academic and engineering prototype. This software does not operate an external commercial database. All data entered into the application—including accident dates, coordinates, license plates, and driver statements—is processed and persisted <strong>exclusively inside your local browser instance</strong>.
            </p>
          </div>

          <div className="space-y-3 pb-8 border-b border-[#E5E5E3]">
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#0E0F10]">
              2. Browser Storage Technologies
            </h2>
            <p>
              We utilize two standard W3C client-side storage technologies:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm font-mono text-[#666666]">
              <li>
                <strong>`localStorage`:</strong> Stores claims records (`impacta_claims_v1`), draft states (`impacta_driver_draft_v1`), language choices (`impacta_language_preference`), and demo credentials (`impacta_driver_session`, `impacta_insurer_session`).
              </li>
              <li>
                <strong>`IndexedDB` (`impacta_media_db`):</strong> Stores photographic image blobs locally on device to prevent browser memory exhaustion.
              </li>
            </ul>
            <p className="pt-2 text-sm text-[#666666]">
              Data is never transmitted to cloud servers or third-party trackers during prototype operation.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#0E0F10]">
              3. Data Erasure
            </h2>
            <p>
              You can instantly purge all stored claims, photographs, and session tokens by clicking the <strong>Reset Demo State</strong> command located in the Claims Console or by clearing your browser site data.
            </p>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
