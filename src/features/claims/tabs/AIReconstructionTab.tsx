"use client";

import React, { useState } from "react";
import { Claim, AIInference } from "@/types";
import { useClaims } from "@/context/ClaimsContext";
import {
  CheckCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
  ActivityIcon,
  CameraIcon,
  CpuIcon,
} from "@/components/icons/Icons";
import { getConfidenceBadgeClass } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface AIReconstructionTabProps {
  claim: Claim;
}

export function AIReconstructionTab({ claim }: AIReconstructionTabProps) {
  const { confirmInference } = useClaims();
  const { aiAnalysis } = claim;
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleToggleConfirmation = async (inference: AIInference) => {
    setTogglingId(inference.id);
    try {
      await confirmInference(claim.id, inference.id, !inference.isConfirmedByReviewer);
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Prominent Legal & Epistemic Disclaimer Banner */}
      <div className="bg-slate-50 border border-slate-300 rounded p-4 flex items-start gap-3">
        <InfoIcon size={18} className="text-slate-500 flex-shrink-0 mt-0.5" />
        <div className="text-xs">
          <div className="font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>EVIDENTIARY RECONSTRUCTION DISCLAIMER</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-white text-slate-600 border border-slate-200 rounded">
              DECISION SUPPORT
            </span>
          </div>
          <p className="mt-1 text-slate-600 leading-relaxed text-[11px]">
            IMPACTA does not determine legal liability or assign legal fault. This interface synthesizes observed physical evidence, kinematics, and calibrated machine inference to propose a probable accident sequence for human claims review.
          </p>
        </div>
      </div>

      {/* Confidence Header Bar */}
      <div className="bg-white border border-slate-200 rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
            <CpuIcon size={18} />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">
              Multimodal Kinematic Pipeline v2.4
            </div>
            <div className="text-[11px] text-slate-500">
              Evaluated {claim.evidence?.length || 0} artifacts • Telemetry: {claim.telemetry?.hasTelemetry ? "Available (10Hz)" : "None"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] font-semibold text-slate-400 uppercase">Composite AI Confidence</div>
            <div className="text-sm font-bold text-slate-900 font-mono flex items-center gap-1.5 justify-end">
              <span>{aiAnalysis?.overallConfidence || 70}%</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded border font-semibold ${getConfidenceBadgeClass(aiAnalysis?.overallConfidence || 70)}`}>
                {aiAnalysis?.confidenceBand || "MEDIUM"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Split: Observed Facts vs AI Inferences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. OBSERVED FACTS */}
        <div className="bg-white border border-slate-200 rounded p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  1. Observed Physical Facts
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-teal-50 text-teal-800 border border-teal-200 rounded font-semibold">
                DIRECT EVIDENCE
              </span>
            </div>

            <p className="text-[11px] text-slate-500 mb-3">
              Factual indicators isolated directly from photographs, telemetry packets, or official police notices without speculative extrapolation:
            </p>

            {!aiAnalysis?.observations || aiAnalysis.observations.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No direct visual or sensor observations recorded.
              </div>
            ) : (
              <div className="space-y-3">
                {aiAnalysis.observations.map((obs) => (
                  <div
                    key={obs.id}
                    className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">{obs.target}</span>
                      <span className="text-[10px] font-mono text-teal-700 font-medium">
                        {obs.id}
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-[11px]">
                      {obs.statement}
                    </p>
                    {obs.supportingEvidenceIds.length > 0 && (
                      <div className="pt-1.5 border-t border-slate-200/60 flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                        <CameraIcon size={11} className="text-slate-400" />
                        <span>Supporting Artifacts: {obs.supportingEvidenceIds.join(", ")}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 italic">
            Ground-truth verification relies on optical tamper-detection and GPS metadata matching.
          </div>
        </div>

        {/* 2. AI INFERENCES */}
        <div className="bg-white border border-slate-200 rounded p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  2. AI Inferences &amp; Dynamics
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-sky-50 text-sky-800 border border-sky-200 rounded font-semibold">
                PROBABILISTIC
              </span>
            </div>

            <p className="text-[11px] text-slate-500 mb-3">
              Algorithmic interpretations of vehicle trajectories, deceleration rates, and contact vectors. Requires adjuster confirmation where uncertainty exists:
            </p>

            <div className="space-y-3">
              {(aiAnalysis?.inferences || []).map((inf) => (
                <div
                  key={inf.id}
                  className="p-3.5 bg-slate-50 rounded border border-slate-200 text-xs space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{inf.title}</h4>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        Inference {inf.id} • Model Confidence: {inf.confidence}%
                      </div>
                    </div>
                    {inf.isConfirmedByReviewer ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300">
                        <CheckCircleIcon size={11} />
                        <span>Adjuster Validated</span>
                      </span>
                    ) : inf.requiresConfirmation ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-300">
                        <AlertTriangleIcon size={11} />
                        <span>Requires Confirmation</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        Standard Assessment
                      </span>
                    )}
                  </div>

                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    {inf.inference}
                  </p>

                  {inf.alternativeHypothesis && (
                    <div className="p-2 bg-amber-50/70 border border-amber-200 rounded text-[10px] text-amber-900">
                      <strong>Alternative Hypothesis: </strong>
                      {inf.alternativeHypothesis}
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500">
                      Evidence: {inf.supportingEvidenceIds.join(", ") || "Physical model only"}
                    </span>
                    <Button
                      size="sm"
                      variant={inf.isConfirmedByReviewer ? "outline" : "secondary"}
                      onClick={() => handleToggleConfirmation(inf)}
                      disabled={togglingId === inf.id}
                      className="text-[10px] py-0.5 px-2"
                    >
                      {inf.isConfirmedByReviewer ? "Revoke Validation" : "Confirm Inference"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 italic">
            Inferences are derived from conservation of momentum and multi-point impact morphology.
          </div>
        </div>
      </div>

      {/* 3. PROBABLE SEQUENCE TIMELINE */}
      <div className="bg-white border border-slate-200 rounded p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              3. Probable Collision Sequence Timeline
            </h3>
            <p className="text-[11px] text-slate-500">
              Chronological micro-steps reconstructed from telemetry timestamps and vehicle damage vectors
            </p>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {aiAnalysis?.probableSequence?.length || 0} chronological milestones
          </span>
        </div>

        {!aiAnalysis?.probableSequence || aiAnalysis.probableSequence.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            Insufficient temporal or telemetry data to formulate a multi-step sequence.
          </div>
        ) : (
          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {aiAnalysis.probableSequence.map((step) => (
              <div key={step.stepNumber} className="relative group">
                <span className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-blue-600 text-white font-mono text-[10px] font-bold flex items-center justify-center ring-4 ring-white shadow-xs">
                  {step.stepNumber}
                </span>

                <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-blue-700 text-[11px]">
                      {step.timeOffset}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Step Confidence: {step.confidence}%
                    </span>
                  </div>
                  <p className="text-slate-800 text-[11px] leading-relaxed">
                    {step.description}
                  </p>
                  {step.supportingEvidenceIds.length > 0 && (
                    <div className="text-[10px] font-mono text-slate-400 pt-1">
                      Artifacts: {step.supportingEvidenceIds.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. UNCERTAINTIES & LIMITATIONS */}
      <div className="bg-white border border-slate-200 rounded p-5 space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
          <AlertTriangleIcon size={14} className="text-amber-600" />
          <span>4. Analysis Uncertainties &amp; Limitations</span>
        </h3>
        <p className="text-[11px] text-slate-500">
          The following boundary conditions and unobserved variables constrain the certainty of this automated model:
        </p>

        <ul className="space-y-2">
          {(aiAnalysis?.uncertaintiesAndLimitations || []).map((item, idx) => (
            <li
              key={idx}
              className="text-xs text-slate-700 bg-amber-50/40 border border-amber-200/70 p-2.5 rounded flex items-start gap-2"
            >
              <span className="text-amber-700 font-bold text-xs select-none">—</span>
              <span className="text-[11px] leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
