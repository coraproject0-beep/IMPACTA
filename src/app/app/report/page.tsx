"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useDriverDraft } from "@/context/DriverDraftContext";
import { ReportHeader } from "@/features/driver/components/ReportHeader";
import { CheckCircleIcon } from "@/components/icons/Icons";

// 4 Macro Phase Components + Submitted Receipt
import { Phase1Safety } from "@/features/driver/phases/Phase1Safety";
import { Phase2Accident } from "@/features/driver/phases/Phase2Accident";
import { Phase3Capture } from "@/features/driver/phases/Phase3Capture";
import { Phase4Review } from "@/features/driver/phases/Phase4Review";
import { Phase5Submitted } from "@/features/driver/phases/Phase5Submitted";

export default function ReportWizardPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const isIt = language === "it";
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

  const phaseMeta: Record<number, { title: string }> = {
    1: {
      title: isIt ? "Sicurezza e Incolumità" : "Human Safety Check",
    },
    2: {
      title: isIt ? "Luogo e Circostanze" : "Location & Basics",
    },
    3: {
      title: isIt ? "Rilievi e Controparte" : "Evidence & Counterparty",
    },
    4: {
      title: isIt ? "Verifica e Conferma" : "Review & Declaration",
    },
    5: {
      title: isIt ? "Dossier Inviato" : "Report Filed",
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
    setToastMessage(isIt ? "Bozza del sinistro salvata sul dispositivo" : "Report draft saved to device");
    setTimeout(() => {
      router.push("/app");
    }, 600);
  };

  const handleReturnHome = () => {
    resetDraft();
    router.push("/app");
  };

  return (
    <div className="-mx-4 sm:-mx-6 md:-mx-8 -my-6 md:-my-8 min-h-screen bg-[#F4F5F3] flex flex-col justify-between selection:bg-[#090A0A] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#090A0A] text-white text-xs font-semibold px-5 py-2.5 shadow-xl flex items-center gap-2 animate-fade-in border border-white/10">
          <CheckCircleIcon size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Minimal Navigation Bar: Back, Title, Progress Line, Save & Exit */}
      <ReportHeader
        phaseNumber={macroPhase <= 4 ? macroPhase : 4}
        totalPhases={4}
        phaseTitle={phaseMeta[macroPhase]?.title || (isIt ? "Segnalazione Incidente" : "Accident Report")}
        showBack={macroPhase > 1 && macroPhase <= 4}
        showSaveAndExit={macroPhase <= 4}
        onBack={handleBack}
        onSaveAndExit={handleSaveAndExit}
      />

      {/* Main Content Area: Focused Open Document Layout (No left sidebar, no card soup) */}
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex-1">
        <div className="bg-white border border-[#D7D9D8] p-6 sm:p-10 shadow-xs">
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
        </div>
      </div>
    </div>
  );
}
