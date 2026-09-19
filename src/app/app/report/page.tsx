"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDriverDraft } from "@/context/DriverDraftContext";
import { ReportHeader } from "@/features/driver/components/ReportHeader";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import { CheckCircleIcon, ShieldCheckIcon } from "@/components/icons/Icons";

// 4 Macro Phase Components + Submitted Receipt
import { Phase1Safety } from "@/features/driver/phases/Phase1Safety";
import { Phase2Accident } from "@/features/driver/phases/Phase2Accident";
import { Phase3Capture } from "@/features/driver/phases/Phase3Capture";
import { Phase4Review } from "@/features/driver/phases/Phase4Review";
import { Phase5Submitted } from "@/features/driver/phases/Phase5Submitted";

export default function ReportWizardPage() {
  const router = useRouter();
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

  // Map legacy / internal step values to 4 Macro Phases (1 to 4) and 5 (Submitted)
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
      title: "Safety Check",
      image: "/images/road-context.jpg",
      hint: "Secure yourself, your passengers, and the vehicle before capturing information.",
    },
    2: {
      title: "Accident Details",
      image: "/images/road-context.jpg",
      hint: "Position the accident on the road network with date, time, and road junction type.",
    },
    3: {
      title: "Capture Evidence & Statement",
      image: "/images/evidence-scene.jpg",
      hint: "Document the scene overview, contact damage on both vehicles, and record your statement.",
    },
    4: {
      title: "Review & Confirmation",
      image: "/images/hero-car.jpg",
      hint: "Verify summarized accident circumstances and confirm the declaration for insurer intake.",
    },
    5: {
      title: "Report Confirmed",
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
    <div className="-mx-4 sm:-mx-6 md:-mx-8 -my-6 md:-my-8 min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-fade-in">
          <CheckCircleIcon size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Phase Header with Back and Save & Exit */}
      <ReportHeader
        phaseNumber={macroPhase <= 4 ? macroPhase : 4}
        totalPhases={4}
        phaseTitle={phaseMeta[macroPhase].title}
        showBack={macroPhase > 1 && macroPhase <= 4}
        onBack={handleBack}
        onSaveAndExit={handleSaveAndExit}
      />

      {/* Main Content Area: Responsive Two-Column on Desktop */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8 py-6 md:py-10 flex-1">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
          {/* Left Column: Context, Visual Anchor & Phase Roadmap (Desktop only) */}
          <aside className="hidden lg:block lg:col-span-5 space-y-6 sticky top-20">
            {/* Editorial Context Photo */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-200 border border-slate-200/80 shadow-xs">
              <Image
                src={phaseMeta[macroPhase].image}
                alt="Context photography"
                fill
                priority
                className="object-cover transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-200 block">
                  Phase {macroPhase <= 4 ? macroPhase : 4} of 4
                </span>
                <span className="text-sm font-bold block">{phaseMeta[macroPhase].title}</span>
              </div>
            </div>

            {/* 4 Macro Phases Roadmap */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-900">Intake Progress</span>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Autosaved</span>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { num: 1, title: "Safety Check" },
                  { num: 2, title: "Accident Details" },
                  { num: 3, title: "Capture Evidence & Statement" },
                  { num: 4, title: "Review & Confirmation" },
                ].map((p) => {
                  const isPast = macroPhase > p.num;
                  const isCurrent = macroPhase === p.num;
                  return (
                    <div
                      key={p.num}
                      className={`flex items-center gap-3 p-2 rounded-lg text-xs transition-colors ${
                        isCurrent
                          ? "bg-blue-50 text-blue-900 font-semibold"
                          : isPast
                          ? "text-slate-700"
                          : "text-slate-400"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold ${
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
            <div className="bg-slate-100/70 rounded-2xl p-4 border border-slate-200 text-xs space-y-2.5">
              <div className="flex items-center justify-between text-slate-500 font-medium">
                <span>Insured Driver</span>
                <span className="font-mono text-slate-800 font-semibold">
                  {SYNTHETIC_DRIVER_PROFILE.vehicle.plate}
                </span>
              </div>
              <div className="text-slate-800 font-semibold">
                {SYNTHETIC_DRIVER_PROFILE.fullName} • {SYNTHETIC_DRIVER_PROFILE.vehicle.make} {SYNTHETIC_DRIVER_PROFILE.vehicle.model}
              </div>
              <div className="text-[11px] text-slate-500">
                Policy: {SYNTHETIC_DRIVER_PROFILE.policy.insurerName} ({SYNTHETIC_DRIVER_PROFILE.policy.policyNumber})
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Emergency 112:</span>
                <a href="tel:112" className="text-rose-600 font-bold hover:underline">
                  Dial 112
                </a>
              </div>
            </div>
          </aside>

          {/* Right Column (or Full Width on Mobile): Active Phase Content */}
          <main className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs">
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
