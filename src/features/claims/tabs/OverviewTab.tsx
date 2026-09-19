"use client";

import React, { useState } from "react";
import { Claim, ClaimStatus } from "@/types";
import { useClaims } from "@/context/ClaimsContext";
import { Button } from "@/components/ui/Button";
import { CheckCircleIcon, AlertTriangleIcon, UserIcon, EditIcon } from "@/components/icons/Icons";
import { formatDate, getStatusBadgeClass, getStatusLabel } from "@/lib/utils";

interface OverviewTabProps {
  claim: Claim;
}

export function OverviewTab({ claim }: OverviewTabProps) {
  const { reviewers, updateNotes, updateStatus, assignReviewer } = useClaims();
  const [notes, setNotes] = useState(claim.reviewerNotes);
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSavedNotice, setNotesSavedNotice] = useState(false);

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    await updateNotes(claim.id, notes);
    setIsSavingNotes(false);
    setNotesSavedNotice(true);
    setTimeout(() => setNotesSavedNotice(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Incident Summary Card */}
      <div className="bg-white border border-slate-200 rounded p-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Accident Incident Summary
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            {claim.incident.location.city} • {claim.incident.location.junctionType}
          </span>
        </div>
        <p className="text-xs text-slate-800 leading-relaxed bg-slate-50 p-3.5 rounded border border-slate-200">
          {claim.incident.summary}
        </p>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2 bg-slate-50 rounded border border-slate-200">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Weather</span>
            <div className="font-semibold text-slate-800 mt-0.5">{claim.incident.weatherCondition}</div>
          </div>
          <div className="p-2 bg-slate-50 rounded border border-slate-200">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Road Surface</span>
            <div className="font-semibold text-slate-800 mt-0.5">{claim.incident.roadCondition}</div>
          </div>
          <div className="p-2 bg-slate-50 rounded border border-slate-200">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Police Attended</span>
            <div className="font-semibold text-slate-800 mt-0.5">
              {claim.incident.policeIntervention ? "Yes (Report Filed)" : "No (Autonomous CAI)"}
            </div>
          </div>
          <div className="p-2 bg-slate-50 rounded border border-slate-200">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Drivable State</span>
            <div className="font-semibold text-slate-800 mt-0.5">
              {claim.vehicleA.drivable ? "Drivable (Operational)" : "Immobilized / Tow Truck"}
            </div>
          </div>
        </div>
      </div>

      {/* Dual Vehicle Comparison: Party A vs Party B */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Party A (Insured) */}
        <div className="bg-white border border-slate-200 rounded p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-blue-100 text-blue-800 font-mono font-bold text-xs flex items-center justify-center">
                A
              </span>
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Vehicle A • Insured Policyholder
                </h3>
                <p className="text-[10px] text-slate-500">First-party subscriber dossier</p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded">
              VERIFIED POLICY
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400">Driver</span>
              <div className="font-bold text-slate-900 text-sm mt-0.5">{claim.driverA.fullName}</div>
              <div className="text-slate-500 font-mono text-[11px]">
                CF: {claim.driverA.taxCode} • Patente: {claim.driverA.drivingLicenseNumber}
              </div>
              <div className="text-slate-500 text-[11px]">{claim.driverA.phone}</div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="text-[10px] uppercase font-semibold text-slate-400">Vehicle</span>
              <div className="font-mono font-bold text-slate-900 text-sm mt-0.5 flex items-center gap-2">
                <span>{claim.vehicleA.plate}</span>
                <span className="font-sans text-xs font-normal text-slate-600">
                  {claim.vehicleA.make} {claim.vehicleA.model} ({claim.vehicleA.year})
                </span>
              </div>
              <div className="text-slate-500 text-[11px]">Color: {claim.vehicleA.color}</div>
              <div className="mt-1 text-slate-700 bg-slate-50 p-2 rounded border border-slate-200 text-[11px]">
                <strong>Damages:</strong> {claim.vehicleA.damageDescription} (Zone: {claim.vehicleA.impactZone})
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="text-[10px] uppercase font-semibold text-slate-400">Coverage</span>
              <div className="font-medium text-slate-900 mt-0.5">
                {claim.policyA.insurerName} • Pol. {claim.policyA.policyNumber}
              </div>
              <div className="text-slate-500 text-[11px]">
                Form: {claim.policyA.coverageType} • Valid until: {claim.policyA.validUntil}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="text-[10px] uppercase font-semibold text-slate-400">Driver A Statement</span>
              <p className="mt-1 italic text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200 text-[11px] leading-relaxed">
                &ldquo;{claim.driverA.statement}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Party B (Counterparty) */}
        <div className="bg-white border border-slate-200 rounded p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-slate-200 text-slate-800 font-mono font-bold text-xs flex items-center justify-center">
                B
              </span>
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Vehicle B • Counterparty
                </h3>
                <p className="text-[10px] text-slate-500">Second vehicle in collision dynamics</p>
              </div>
            </div>
            {claim.policyB ? (
              <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                IDENTIFIED
              </span>
            ) : (
              <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-300 rounded font-semibold">
                LOOKUP PENDING
              </span>
            )}
          </div>

          {claim.driverB || claim.vehicleB ? (
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400">Driver</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">
                  {claim.driverB?.fullName || "Identity Pending SITA Inquiry"}
                </div>
                {claim.driverB && (
                  <>
                    <div className="text-slate-500 font-mono text-[11px]">
                      CF: {claim.driverB.taxCode} • Patente: {claim.driverB.drivingLicenseNumber}
                    </div>
                    <div className="text-slate-500 text-[11px]">{claim.driverB.phone}</div>
                  </>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] uppercase font-semibold text-slate-400">Vehicle</span>
                <div className="font-mono font-bold text-slate-900 text-sm mt-0.5 flex items-center gap-2">
                  <span>{claim.vehicleB?.plate || "Plate unknown"}</span>
                  <span className="font-sans text-xs font-normal text-slate-600">
                    {claim.vehicleB?.make} {claim.vehicleB?.model}
                  </span>
                </div>
                {claim.vehicleB?.damageDescription && (
                  <div className="mt-1 text-slate-700 bg-slate-50 p-2 rounded border border-slate-200 text-[11px]">
                    <strong>Damages:</strong> {claim.vehicleB.damageDescription} (Zone: {claim.vehicleB.impactZone})
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] uppercase font-semibold text-slate-400">Coverage</span>
                {claim.policyB ? (
                  <>
                    <div className="font-medium text-slate-900 mt-0.5">
                      {claim.policyB.insurerName} • Pol. {claim.policyB.policyNumber}
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      Valid until: {claim.policyB.validUntil}
                    </div>
                  </>
                ) : (
                  <div className="text-amber-800 text-[11px] font-medium mt-0.5 bg-amber-50 p-2 rounded border border-amber-200">
                    Counterparty insurance details missing. Automated ANIA / CARD request queued.
                  </div>
                )}
              </div>

              {claim.driverB?.statement && (
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Driver B Statement</span>
                  <p className="mt-1 italic text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200 text-[11px] leading-relaxed">
                    &ldquo;{claim.driverB.statement}&rdquo;
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              No counterparty information recorded for this unilateral incident.
            </div>
          )}
        </div>
      </div>

      {/* Reviewer Notes & Operational Assignment Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notes (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <EditIcon size={14} className="text-slate-400" />
              <span>Reviewer Working Notes</span>
            </h3>
            {notesSavedNotice && (
              <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircleIcon size={12} /> Notes saved locally
              </span>
            )}
          </div>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Record technical notes, counterparty contacts, or adjuster instructions..."
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
          />
          <div className="flex justify-end">
            <Button
              size="sm"
              onClick={handleSaveNotes}
              disabled={isSavingNotes || notes === claim.reviewerNotes}
            >
              {isSavingNotes ? "Saving..." : "Save Working Note"}
            </Button>
          </div>
        </div>

        {/* Operational Workflow Panel (1 col) */}
        <div className="bg-white border border-slate-200 rounded p-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
            Workflow Control
          </h3>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Workflow Status
            </label>
            <select
              value={claim.status}
              onChange={(e) => updateStatus(claim.id, e.target.value as ClaimStatus)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="NEW">New Ingest</option>
              <option value="IN_REVIEW">In Review</option>
              <option value="CAI_READY">CAI Ready</option>
              <option value="REVIEWED">Reviewed</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Assigned Adjuster
            </label>
            <select
              value={claim.assignee?.id || ""}
              onChange={(e) => assignReviewer(claim.id, e.target.value || null)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Unassigned</option>
              {reviewers.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.role})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
            <div className="flex justify-between">
              <span>Intake Date:</span>
              <span className="font-mono text-slate-800">{formatDate(claim.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span>CAI Draft Status:</span>
              <span className="font-mono text-slate-800">
                {claim.caiDraftGenerated ? "Draft Compiled" : "Awaiting Review"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
