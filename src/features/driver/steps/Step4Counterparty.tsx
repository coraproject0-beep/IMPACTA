"use client";

import React from "react";
import { DriverDraft } from "@/types/driver";

interface Step4CounterpartyProps {
  draft: DriverDraft;
  onUpdate: (patch: Partial<DriverDraft>) => void;
  onNext: () => void;
}

export function Step4Counterparty({ draft, onUpdate, onNext }: Step4CounterpartyProps) {
  const { counterparty } = draft;

  const updateCp = (patch: Partial<typeof counterparty>) => {
    onUpdate({ counterparty: { ...counterparty, ...patch } });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 py-2">
      <div className="space-y-1">
        <h2 className="text-base font-bold text-slate-950">
          Other Driver &amp; Vehicle
        </h2>
        <p className="text-xs text-slate-500">
          Exchange information with the other party involved.
        </p>
      </div>

      {/* Toggle if details are available */}
      <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
        <div>
          <span className="font-semibold text-slate-800">Was another vehicle involved?</span>
          <p className="text-[11px] text-slate-500">Disable if this was an isolated single-vehicle incident</p>
        </div>
        <button
          type="button"
          onClick={() => updateCp({ hasInfo: !counterparty.hasInfo })}
          className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
            counterparty.hasInfo
              ? "bg-slate-900 text-white"
              : "bg-slate-200 text-slate-700"
          }`}
        >
          {counterparty.hasInfo ? "Yes" : "No / Unknown"}
        </button>
      </div>

      {counterparty.hasInfo ? (
        <div className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Vehicle License Plate
            </label>
            <input
              type="text"
              placeholder="e.g. EM829KC"
              value={counterparty.plate}
              onChange={(e) => updateCp({ plate: e.target.value.toUpperCase() })}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs font-mono font-semibold text-slate-900 placeholder:text-slate-400 uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Other Driver&apos;s Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Andrea Galli"
              value={counterparty.driverName}
              onChange={(e) => updateCp({ driverName: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+39 ..."
                value={counterparty.phone}
                onChange={(e) => updateCp({ phone: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Make &amp; Model
              </label>
              <input
                type="text"
                placeholder="e.g. Fiat 500X"
                value={counterparty.makeModel}
                onChange={(e) => updateCp({ makeModel: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Insurance Company
              </label>
              <input
                type="text"
                placeholder="e.g. Tirrena Polizze"
                value={counterparty.insurer}
                onChange={(e) => updateCp({ insurer: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Policy Number
              </label>
              <input
                type="text"
                placeholder="From green card / slip"
                value={counterparty.policyNumber}
                onChange={(e) => updateCp({ policyNumber: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600 leading-relaxed">
          No counterparty information recorded. An institutional ANIA lookup will be initiated if a license plate is provided later.
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Continue to Statement →
        </button>
      </div>
    </form>
  );
}
