"use client";

import React, { useState, useEffect } from "react";
import { CheckCircleIcon } from "@/components/icons/Icons";

interface Stage {
  title: string;
  detail: string;
}

const STAGES: Stage[] = [
  { title: "Preparing evidence", detail: "6 evidentiary artifacts received" },
  { title: "Identifying vehicles", detail: "2 vehicles matched against registration records" },
  { title: "Reviewing visible damage", detail: "Front-right and front-left contact areas isolated" },
  { title: "Checking consistency", detail: "One circumstance item requires driver confirmation" },
  { title: "Preparing report", detail: "Standardized CAI workspace ready for review" },
];

interface DemoSimulationProps {
  onComplete: () => void;
}

export function DemoSimulation({ onComplete }: DemoSimulationProps) {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (currentStageIdx < STAGES.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStageIdx((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        setIsDone(true);
      }, 600);
      return () => clearTimeout(finishTimer);
    }
  }, [currentStageIdx]);

  return (
    <div className="space-y-6 py-4">
      <div className="text-center space-y-1">
        <h3 className="text-base font-bold text-slate-900">
          Structuring Accident Evidence
        </h3>
        <p className="text-xs text-slate-500">
          Transforming photos and telemetry into standardized claim records
        </p>
      </div>

      {/* Progress sequence */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3.5">
        {STAGES.map((stage, idx) => {
          const isPassed = idx < currentStageIdx || isDone;
          const isCurrent = idx === currentStageIdx && !isDone;

          return (
            <div key={stage.title} className="flex items-start gap-3 transition-opacity duration-300">
              <div className="mt-0.5 flex-shrink-0">
                {isPassed ? (
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px]">
                    <CheckCircleIcon size={13} />
                  </span>
                ) : isCurrent ? (
                  <span className="w-5 h-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin inline-block" />
                ) : (
                  <span className="w-5 h-5 rounded-full border border-slate-300 bg-white inline-block" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div
                  className={`text-xs font-semibold ${
                    isPassed || isCurrent ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {stage.title}
                </div>
                {(isPassed || isCurrent) && (
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {stage.detail}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Restrained disclosure */}
      <div className="text-center">
        <span className="text-[10px] font-mono text-slate-400 px-2 py-1 bg-slate-100 rounded border border-slate-200">
          Demo analysis based on a synthetic scenario
        </span>
      </div>

      {/* Action */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onComplete}
          disabled={!isDone}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-md text-xs font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isDone ? "Continue to Review →" : "Processing evidence..."}
        </button>
      </div>
    </div>
  );
}
