"use client";

import React from "react";
import { DriverDraft } from "@/types/driver";

interface Step5StatementProps {
  draft: DriverDraft;
  onUpdate: (patch: Partial<DriverDraft>) => void;
  onNext: () => void;
}

export function Step5Statement({ draft, onUpdate, onNext }: Step5StatementProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 py-2">
      <div className="space-y-1">
        <h2 className="text-base font-bold text-slate-950">
          Tell us what happened
        </h2>
        <p className="text-xs text-slate-500">
          Describe the accident in your own words.
        </p>
      </div>

      <div>
        <textarea
          required
          rows={5}
          placeholder="e.g. I was driving along the outer lane of the roundabout when the other car entered without yielding..."
          value={draft.statement}
          onChange={(e) => onUpdate({ statement: e.target.value })}
          className="w-full p-3 bg-white border border-slate-300 rounded-md text-xs text-slate-900 leading-relaxed placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs space-y-1.5">
        <div className="font-semibold text-slate-700 text-[11px] uppercase tracking-wider">
          Helpful details to mention:
        </div>
        <ul className="space-y-1 text-slate-500 text-[11px]">
          <li>• What direction were you travelling?</li>
          <li>• What was the other vehicle doing prior to contact?</li>
          <li>• Did either vehicle brake or sound their horn?</li>
        </ul>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Review &amp; Analyze →
        </button>
      </div>
    </form>
  );
}
