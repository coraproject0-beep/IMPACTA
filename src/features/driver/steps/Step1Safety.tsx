"use client";

import React from "react";
import { AlertTriangleIcon, CheckCircleIcon } from "@/components/icons/Icons";

interface Step1SafetyProps {
  onConfirmSafe: () => void;
}

export function Step1Safety({ onConfirmSafe }: Step1SafetyProps) {
  return (
    <div className="space-y-6 py-2">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 mx-auto rounded-xl bg-[#0E0F10] text-white flex items-center justify-center">
          <AlertTriangleIcon size={22} />
        </div>
        <h2 className="text-lg font-bold text-slate-950 tracking-tight">
          Is everyone safe?
        </h2>
        <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
          Before reporting an accident, please ensure yourself and all passengers are in a safe location away from oncoming traffic.
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3 text-xs">
        <div className="font-semibold text-slate-800">
          Immediate Safety Checklist:
        </div>
        <ul className="space-y-2 text-slate-600">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0 mt-1.5" />
            <span>Turn on vehicle hazard warning lights</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0 mt-1.5" />
            <span>Wear high-visibility reflective vest before exiting</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0 mt-1.5" />
            <span>Place warning triangle ~50 meters behind your car</span>
          </li>
        </ul>
      </div>

      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={onConfirmSafe}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <CheckCircleIcon size={16} />
          <span>Yes, everyone is safe — Continue</span>
        </button>

        <button
          type="button"
          onClick={() => alert("Demo simulation: In a real-world emergency, dial 112.")}
          className="w-full py-2.5 px-4 bg-white border border-rose-300 text-rose-700 hover:bg-rose-50 rounded-md text-xs font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <span>Emergency Assistance • 112 Demo</span>
        </button>
      </div>

      <p className="text-[11px] text-center text-slate-400 leading-tight">
        IMPACTA does not provide medical or legal advice. If anyone is injured, call 112 immediately.
      </p>
    </div>
  );
}
