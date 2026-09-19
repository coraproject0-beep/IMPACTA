"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDriverDraft } from "@/context/DriverDraftContext";
import { DriverHeader } from "@/features/driver/components/DriverHeader";

// Step Components
import { Step1Safety } from "@/features/driver/steps/Step1Safety";
import { Step2IncidentBasics } from "@/features/driver/steps/Step2IncidentBasics";
import { Step3Evidence } from "@/features/driver/steps/Step3Evidence";
import { Step4Counterparty } from "@/features/driver/steps/Step4Counterparty";
import { Step5Statement } from "@/features/driver/steps/Step5Statement";
import { Step6Analysis } from "@/features/driver/steps/Step6Analysis";
import { Step7Reconstruction } from "@/features/driver/steps/Step7Reconstruction";
import { Step8CAIReview } from "@/features/driver/steps/Step8CAIReview";
import { Step9Submitted } from "@/features/driver/steps/Step9Submitted";

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

  const currentStep = draft.step;

  // Step numeric mapping for clean progress header
  const stepMap: Record<typeof currentStep, { num: number; title: string }> = {
    SAFETY: { num: 1, title: "Safety Check" },
    INCIDENT_BASICS: { num: 2, title: "Incident Details" },
    EVIDENCE: { num: 3, title: "Accident Evidence" },
    COUNTERPARTY: { num: 4, title: "Counterparty" },
    STATEMENT: { num: 5, title: "Driver Statement" },
    ANALYSIS: { num: 6, title: "Evidence Analysis" },
    RECONSTRUCTION: { num: 7, title: "Reconstruction" },
    CAI_REVIEW: { num: 8, title: "CAI Review" },
    SUBMITTED: { num: 9, title: "Report Confirmed" },
  };

  const handleBack = () => {
    switch (currentStep) {
      case "INCIDENT_BASICS":
        goToStep("SAFETY");
        break;
      case "EVIDENCE":
        goToStep("INCIDENT_BASICS");
        break;
      case "COUNTERPARTY":
        goToStep("EVIDENCE");
        break;
      case "STATEMENT":
        goToStep("COUNTERPARTY");
        break;
      case "ANALYSIS":
        goToStep("STATEMENT");
        break;
      case "RECONSTRUCTION":
        goToStep("STATEMENT");
        break;
      case "CAI_REVIEW":
        goToStep(draft.isDemoIncident ? "RECONSTRUCTION" : "STATEMENT");
        break;
      default:
        router.push("/app");
    }
  };

  const handleReturnHome = () => {
    resetDraft();
    router.push("/app");
  };

  return (
    <div className="flex-1 flex flex-col justify-between">
      <DriverHeader
        stepNumber={currentStep !== "SUBMITTED" ? stepMap[currentStep].num : undefined}
        totalSteps={8}
        title={stepMap[currentStep].title}
        showBack={currentStep !== "SAFETY" && currentStep !== "SUBMITTED"}
        onBack={handleBack}
      />

      <div className="flex-1 py-4">
        {currentStep === "SAFETY" && (
          <Step1Safety
            onConfirmSafe={() => {
              updateDraft({ safetyConfirmed: true });
              goToStep("INCIDENT_BASICS");
            }}
          />
        )}

        {currentStep === "INCIDENT_BASICS" && (
          <Step2IncidentBasics
            draft={draft}
            onUpdate={updateDraft}
            onNext={() => goToStep("EVIDENCE")}
          />
        )}

        {currentStep === "EVIDENCE" && (
          <Step3Evidence
            draft={draft}
            onAddEvidence={addEvidenceItem}
            onRemoveEvidence={removeEvidenceItem}
            onNext={() => goToStep("COUNTERPARTY")}
          />
        )}

        {currentStep === "COUNTERPARTY" && (
          <Step4Counterparty
            draft={draft}
            onUpdate={updateDraft}
            onNext={() => goToStep("STATEMENT")}
          />
        )}

        {currentStep === "STATEMENT" && (
          <Step5Statement
            draft={draft}
            onUpdate={updateDraft}
            onNext={() => goToStep("ANALYSIS")}
          />
        )}

        {currentStep === "ANALYSIS" && (
          <Step6Analysis
            draft={draft}
            onProceedToReconstruction={() => goToStep("RECONSTRUCTION")}
            onProceedToCAI={() => goToStep("CAI_REVIEW")}
          />
        )}

        {currentStep === "RECONSTRUCTION" && (
          <Step7Reconstruction
            draft={draft}
            onConfirm={() => {
              updateDraft({ reconstructionConfirmed: true });
              goToStep("CAI_REVIEW");
            }}
            onEditStatement={() => goToStep("STATEMENT")}
          />
        )}

        {currentStep === "CAI_REVIEW" && (
          <Step8CAIReview
            draft={draft}
            onUpdate={updateDraft}
            onSubmit={async () => {
              await submitReport();
            }}
          />
        )}

        {currentStep === "SUBMITTED" && (
          <Step9Submitted
            draft={draft}
            onReturnHome={handleReturnHome}
          />
        )}
      </div>
    </div>
  );
}
