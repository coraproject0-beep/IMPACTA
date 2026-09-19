"use client";

import React from "react";
import { Claim } from "@/types";
import { formatDateTime } from "@/lib/utils";
import { ShieldIcon, UserIcon, CpuIcon, ActivityIcon } from "@/components/icons/Icons";

interface AuditTrailTabProps {
  claim: Claim;
}

export function AuditTrailTab({ claim }: AuditTrailTabProps) {
  const getActorIcon = (actor: string) => {
    switch (actor) {
      case "AI_ENGINE":
        return <CpuIcon size={14} className="text-blue-600" />;
      case "REVIEWER":
        return <UserIcon size={14} className="text-emerald-700" />;
      case "TELEMETRY_PIPELINE":
        return <ActivityIcon size={14} className="text-indigo-600" />;
      default:
        return <ShieldIcon size={14} className="text-slate-600" />;
    }
  };

  const getActorBadge = (actor: string) => {
    switch (actor) {
      case "AI_ENGINE":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "REVIEWER":
        return "bg-emerald-50 text-emerald-800 border-emerald-300";
      case "TELEMETRY_PIPELINE":
        return "bg-indigo-50 text-indigo-800 border-indigo-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded p-4 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Audit Trail &amp; Human Oversight Ledger
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Timestamped event history tracking automated intake events, sensor synchronization, and manual adjuster overrides
          </p>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          {claim.auditTrail?.length || 0} recorded events
        </span>
      </div>

      {/* Chronological Audit Events Timeline */}
      <div className="bg-white border border-slate-200 rounded p-5">
        <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {(claim.auditTrail || []).map((ev) => (
            <div key={ev.id} className="relative group">
              {/* Actor node marker */}
              <span className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white border border-slate-300 flex items-center justify-center shadow-xs">
                {getActorIcon(ev.actor)}
              </span>

              <div className="bg-slate-50 border border-slate-200 rounded p-3.5 text-xs space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-medium px-1.5 py-0.2 rounded border ${getActorBadge(ev.actor)}`}>
                      {ev.actor.replace(/_/g, " ")}
                    </span>
                    <span className="font-semibold text-slate-900">{ev.actorName}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {formatDateTime(ev.timestamp)}
                  </span>
                </div>

                <div className="text-slate-800 font-medium text-xs pt-1">
                  {ev.action}
                </div>

                <div className="pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Object: <code className="text-slate-700 bg-slate-100 px-1 py-0.5 rounded">{ev.objectAffected}</code></span>
                  <span className="text-[10px] text-slate-400">ID: {ev.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
