"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useDriverDraft } from "@/context/DriverDraftContext";
import { ReportHeader } from "@/features/driver/components/ReportHeader";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import { CheckCircleIcon } from "@/components/icons/Icons";

// 4 Macro Phase Components + Submitted Receipt
import { Phase1Safety } from "@/features/driver/phases/Phase1Safety";
import { Phase2Accident } from "@/features/driver/phases/Phase2Accident";
import { Phase3Capture } from "@/features/driver/phases/Phase3Capture";
import { Phase4Review } from "@/features/driver/phases/Phase4Review";
import { Phase5Submitted } from "@/features/driver/phases/Phase5Submitted";

export default function ReportWizardPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const {
    draft,
    updateDraft,
    addEvidenceItem,
    removeEvidenceItem,
    goToStep,
    submitReport,
    resetDraft,
  } = useDriverDraft();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Map step values to 4 Macro Phases (1 to 4) and 5 (Submitted)
  const getMacroPhase = (): number => {
    switch (draft.step) {
      case "SAFETY":
        return 1;
      case "INCIDENT_BASICS":
        return 2;
      case "EVIDENCE":
      case "COUNTERPARTY":
      case "STATEMENT":
      case "ANALYSIS":
      case "RECONSTRUCTION":
        return 3;
      case "CAI_REVIEW":
        return 4;
      case "SUBMITTED":
        return 5;
      default:
        return 1;
    }
  };

  const macroPhase = getMacroPhase();

  const phaseMeta: Record<number, { title: string; image: string; hint: string }> = {
    1: {
      title: t.wizard.phase1Title,
      image: "/images/road-context.jpg",
      hint: "Secure yourself, your passengers, and the vehicle before capturing information.",
    },
    2: {
      title: t.wizard.phase2Title,
      image: "/images/road-context.jpg",
      hint: "Position the accident on the road network with date, time, and road junction type.",
    },
    3: {
      title: t.wizard.phase3Title,
      image: "/images/evidence-scene.jpg",
      hint: "Document the scene overview, contact damage on both vehicles, and record your statement.",
    },
    4: {
      title: t.wizard.phase4Title,
      image: "/images/hero-car.jpg",
      hint: "Verify summarized accident circumstances and confirm the declaration for insurer intake.",
    },
    5: {
      title: t.wizard.phase5Subheader,
      image: "/images/hero-car.jpg",
      hint: "Your report has been safely persisted in local browser storage.",
    },
  };

  const handleBack = () => {
    switch (macroPhase) {
      case 2:
        goToStep("SAFETY");
        break;
      case 3:
        goToStep("INCIDENT_BASICS");
        break;
      case 4:
        goToStep("EVIDENCE");
        break;
      default:
        router.push("/app");
    }
  };

  const handleSaveAndExit = () => {
    setToastMessage("Report draft saved to device");
    setTimeout(() => {
      router.push("/app");
    }, 500);
  };

  const handleReturnHome = () => {
    resetDraft();
    router.push("/app");
  };

  return (
    <div className="-mx-4 sm:-mx-6 md:-mx-8 -my-6 md:-my-8 min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-fade-in">
          <CheckCircleIcon size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Phase Header with Back and Save & Exit */}
      <ReportHeader
        phaseNumber={macroPhase <= 4 ? macroPhase : 4}
        totalPhases={4}
        phaseTitle={phaseMeta[macroPhase]?.title || "Incident Report"}
        showBack={macroPhase > 1 && macroPhase <= 4}
        showSaveAndExit={macroPhase <= 4}
        onBack={handleBack}
        onSaveAndExit={handleSaveAndExit}
      />

      {/* Main Content Area: Responsive Two-Column on Desktop */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8 py-6 md:py-10 flex-1">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
          {/* Left Column: Context, Visual Anchor & Phase Roadmap (Desktop only) */}
          <aside className="hidden lg:block lg:col-span-5 space-y-6 sticky top-20">
            {/* Editorial Context Photo */}
            <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xs">
              <Image
                src={phaseMeta[macroPhase]?.image || "/images/road-context.jpg"}
                alt="Context photography"
                fill
                priority
                className="object-cover transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 block font-bold">
                  Phase {macroPhase <= 4 ? macroPhase : 4} of 4
                </span>
                <span className="text-lg font-bold block mt-0.5">{phaseMeta[macroPhase]?.title}</span>
              </div>
            </div>

            {/* 4 Macro Phases Roadmap */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm font-bold text-slate-900">Intake Progress</span>
                <span className="text-xs font-mono font-semibold text-emerald-600">
                  Autosaved
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  { num: 1, title: t.wizard.phase1Title },
                  { num: 2, title: t.wizard.phase2Title },
                  { num: 3, title: t.wizard.phase3Title },
                  { num: 4, title: t.wizard.phase4Title },
                ].map((p) => {
                  const isPast = macroPhase > p.num;
                  const isCurrent = macroPhase === p.num;
                  return (
                    <div
                      key={p.num}
                      className={`flex items-center gap-3 p-3 rounded-xl text-sm transition-colors ${
                        isCurrent
                          ? "bg-blue-50 text-blue-900 font-bold"
                          : isPast
                          ? "text-slate-700 font-medium"
                          : "text-slate-400"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                          isPast
                            ? "bg-emerald-100 text-emerald-800"
                            : isCurrent
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {isPast ? "✓" : p.num}
                      </div>
                      <span className="truncate">{p.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Vehicle & Emergency Reference */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 text-sm space-y-3 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 font-medium">
                <span>Insured Driver</span>
                <span className="font-mono text-slate-900 font-bold">
                  {SYNTHETIC_DRIVER_PROFILE.vehicle.plate}
                </span>
              </div>
              <div className="text-slate-900 font-bold text-base">
                {SYNTHETIC_DRIVER_PROFILE.fullName} • {SYNTHETIC_DRIVER_PROFILE.vehicle.make} {SYNTHETIC_DRIVER_PROFILE.vehicle.model}
              </div>
              <div className="text-xs text-slate-500">
                Policy: {SYNTHETIC_DRIVER_PROFILE.policy.insurerName} ({SYNTHETIC_DRIVER_PROFILE.policy.policyNumber})
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Emergency Hotline:</span>
                <a href="tel:112" className="text-rose-600 font-bold hover:underline">
                  Dial 112
                </a>
              </div>
            </div>
          </aside>

          {/* Right Column: Active Phase Content */}
          <main className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs">
            {macroPhase === 1 && (
              <Phase1Safety
                draft={draft}
                onUpdate={updateDraft}
                onNext={() => goToStep("INCIDENT_BASICS")}
              />
            )}

            {macroPhase === 2 && (
              <Phase2Accident
                draft={draft}
                onUpdate={updateDraft}
                onNext={() => goToStep("EVIDENCE")}
              />
            )}

            {macroPhase === 3 && (
              <Phase3Capture
                draft={draft}
                onUpdate={updateDraft}
                onAddEvidence={addEvidenceItem}
                onRemoveEvidence={removeEvidenceItem}
                onNext={() => goToStep("CAI_REVIEW")}
              />
            )}

            {macroPhase === 4 && (
              <Phase4Review
                draft={draft}
                onUpdate={updateDraft}
                onSubmit={async () => {
                  await submitReport();
                }}
                onEditSection={(section) => {
                  if (section === "accident") {
                    goToStep("INCIDENT_BASICS");
                  } else {
                    goToStep("EVIDENCE");
                  }
                }}
              />
            )}

            {macroPhase === 5 && (
              <Phase5Submitted draft={draft} onReturnHome={handleReturnHome} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
