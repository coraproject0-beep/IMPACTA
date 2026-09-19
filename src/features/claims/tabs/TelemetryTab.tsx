"use client";

import React from "react";
import { Claim } from "@/types";
import { ActivityIcon, AlertTriangleIcon, InfoIcon, CheckCircleIcon, MapPinIcon } from "@/components/icons/Icons";

interface TelemetryTabProps {
  claim: Claim;
}

export function TelemetryTab({ claim }: TelemetryTabProps) {
  const { telemetry } = claim;

  if (!telemetry.hasTelemetry || telemetry.points.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-12 text-center space-y-3">
        <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
          <ActivityIcon size={24} />
        </div>
        <h3 className="text-sm font-bold text-slate-900">
          No On-Board Telemetry Available
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          This policyholder vehicle is not equipped with an active connected telematics unit or crash data recorder (EDR). Analysis relies on photographic damage morphology, OCR document extraction, and witness testimony.
        </p>
        <div className="pt-2">
          <span className="text-[11px] font-mono px-2 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200">
            Policy Option: RCA Standard (No Telematics Box)
          </span>
        </div>
      </div>
    );
  }

  // Visual SVG chart coordinates calculation
  // Times range from min timeSec to max timeSec
  const pts = telemetry.points;
  const minTime = Math.min(...pts.map((p) => p.timeSec));
  const maxTime = Math.max(...pts.map((p) => p.timeSec));
  const timeSpan = maxTime - minTime || 1;

  const maxSpeed = Math.max(...pts.map((p) => p.speedKmh), 50);

  // SVG dimensions
  const svgWidth = 600;
  const svgHeight = 180;
  const padLeft = 40;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 30;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const getX = (t: number) => padLeft + ((t - minTime) / timeSpan) * plotW;
  const getY = (speed: number) => padTop + plotH - (speed / maxSpeed) * plotH;

  // Build speed SVG path
  const speedPathD = pts.reduce((acc, p, idx) => {
    const x = getX(p.timeSec);
    const y = getY(p.speedKmh);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, "");

  // Find impact point (time closest to 0)
  const impactPoint = pts.reduce((prev, curr) =>
    Math.abs(curr.timeSec) < Math.abs(prev.timeSec) ? curr : prev
  );

  return (
    <div className="space-y-6">
      {/* Synthetic Black-Box Disclaimer & Hardware Header */}
      <div className="bg-slate-900 text-white rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-bold tracking-tight">
              Synchronous Black-Box Telemetry Ingestion
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-800 text-slate-300 border border-slate-700 rounded">
              SYNTHETIC BLACK-BOX TELEMETRY
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Device ID: <span className="font-mono text-slate-200">{telemetry.deviceId}</span> • Firmware:{" "}
            <span className="font-mono text-slate-200">{telemetry.firmwareVersion}</span> • Sampling:{" "}
            <span className="font-mono text-slate-200">{telemetry.samplingRateHz} Hz</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] uppercase text-slate-400 font-semibold">Principal Delta-V</div>
            <div className="text-xl font-bold font-mono text-white">
              {telemetry.deltaVKmh} <span className="text-xs font-normal text-slate-400">km/h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Telemetry Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded p-3.5">
          <div className="text-[10px] font-semibold text-slate-400 uppercase">Impact Speed</div>
          <div className="mt-1 font-mono font-bold text-lg text-slate-900">
            {impactPoint.speedKmh.toFixed(1)} <span className="text-xs text-slate-500 font-normal">km/h</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">At contact marker T=0</div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-3.5">
          <div className="text-[10px] font-semibold text-slate-400 uppercase">Peak Deceleration</div>
          <div className="mt-1 font-mono font-bold text-lg text-rose-700">
            {telemetry.peakDecelerationG ? `${telemetry.peakDecelerationG.toFixed(2)} G` : "N/A"}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Longitudinal deceleration pulse</div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-3.5">
          <div className="text-[10px] font-semibold text-slate-400 uppercase">Impact Angle Vector</div>
          <div className="mt-1 font-mono font-bold text-lg text-slate-900">
            {telemetry.impactAngleDeg}°
          </div>
          <div className="text-[10px] text-slate-500 mt-1 truncate">
            {telemetry.impactVectorDescription || "Angular contact"}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-3.5">
          <div className="text-[10px] font-semibold text-slate-400 uppercase">Vehicle Heading</div>
          <div className="mt-1 font-mono font-bold text-lg text-slate-900">
            {impactPoint.headingDeg}°
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Compass azimuth relative to North</div>
        </div>
      </div>

      {/* Speed & Brake Line SVG Chart */}
      <div className="bg-white border border-slate-200 rounded p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Kinematics Timeline: Velocity &amp; Brake Engagement
            </h4>
            <p className="text-[11px] text-slate-500">
              Evolution of speed (km/h) and deceleration leading into impact point (T = 0s)
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 text-blue-600 font-semibold font-mono">
              <span className="w-3 h-0.5 bg-blue-600" /> Velocity (km/h)
            </span>
            <span className="flex items-center gap-1 text-rose-600 font-semibold font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-600" /> Impact T=0
            </span>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-[500px]">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-48 select-none">
              {/* Background Grid */}
              <rect x={padLeft} y={padTop} width={plotW} height={plotH} fill="#f8fafc" stroke="#e2e8f0" />
              
              {/* Horizontal Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = padTop + plotH * (1 - ratio);
                const val = Math.round(maxSpeed * ratio);
                return (
                  <g key={ratio}>
                    <line x1={padLeft} y1={y} x2={padLeft + plotW} y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                    <text x={padLeft - 6} y={y + 3} textAnchor="end" fontSize="9" fill="#94a3b8" fontFamily="monospace">
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Zero Time / Impact Vertical Marker */}
              <line
                x1={getX(0)}
                y1={padTop}
                x2={getX(0)}
                y2={padTop + plotH}
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <text x={getX(0) + 4} y={padTop + 14} fontSize="9" fill="#ef4444" fontFamily="monospace" fontWeight="bold">
                T=0 Impact
              </text>

              {/* Speed Path Line */}
              <path d={speedPathD} fill="none" stroke="#2563eb" strokeWidth="2.5" />

              {/* Points */}
              {pts.map((p, idx) => (
                <circle
                  key={idx}
                  cx={getX(p.timeSec)}
                  cy={getY(p.speedKmh)}
                  r={p.timeSec === 0 ? "5" : "3"}
                  fill={p.timeSec === 0 ? "#ef4444" : p.brakeActive ? "#f59e0b" : "#2563eb"}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              ))}

              {/* X-axis labels */}
              {pts.map((p, idx) => {
                if (idx % 2 === 0 || idx === pts.length - 1) {
                  return (
                    <text
                      key={idx}
                      x={getX(p.timeSec)}
                      y={padTop + plotH + 16}
                      textAnchor="middle"
                      fontSize="9"
                      fill="#64748b"
                      fontFamily="monospace"
                    >
                      {p.timeSec > 0 ? `+${p.timeSec}s` : `${p.timeSec}s`}
                    </text>
                  );
                }
                return null;
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Two-Column Detail: Vector Diagram + Raw Sample Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schematic Impact Direction Compass */}
        <div className="bg-white border border-slate-200 rounded p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 mb-3">
              Directional Impact Vector
            </h4>
            <div className="h-44 flex items-center justify-center relative">
              {/* Compass circle */}
              <svg viewBox="0 0 160 160" className="w-40 h-40">
                <circle cx="80" cy="80" r="70" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1="80" y1="10" x2="80" y2="150" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="10" y1="80" x2="150" y2="80" stroke="#e2e8f0" strokeDasharray="3 3" />
                <text x="80" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#64748b">
                  FRONT (0°)
                </text>
                <text x="142" y="84" textAnchor="end" fontSize="10" fontWeight="bold" fill="#64748b">
                  90°
                </text>
                <text x="80" y="145" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#64748b">
                  180° REAR
                </text>
                <text x="18" y="84" textAnchor="start" fontSize="10" fontWeight="bold" fill="#64748b">
                  270°
                </text>

                {/* Car footprint */}
                <rect x="70" y="55" width="20" height="50" rx="4" fill="#0f172a" />

                {/* Vector pointer */}
                {(() => {
                  const angleRad = ((telemetry.impactAngleDeg || 0) - 90) * (Math.PI / 180);
                  const tipX = 80 + Math.cos(angleRad) * 60;
                  const tipY = 80 + Math.sin(angleRad) * 60;
                  return (
                    <g>
                      <line x1="80" y1="80" x2={tipX} y2={tipY} stroke="#ef4444" strokeWidth="2.5" />
                      <circle cx={tipX} cy={tipY} r="4" fill="#ef4444" />
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>
          <div className="text-[11px] text-slate-500 text-center font-mono mt-2">
            Vector: {telemetry.impactVectorDescription}
          </div>
        </div>

        {/* Chronological Sensor Points Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded p-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 mb-3">
            Discrete Sample Points (CAN Bus Decoded)
          </h4>
          <div className="overflow-x-auto max-h-52">
            <table className="w-full text-left text-xs font-mono">
              <thead className="sticky top-0 bg-slate-100 text-[10px] text-slate-600 uppercase border-b border-slate-200">
                <tr>
                  <th className="py-1.5 px-3">Time (s)</th>
                  <th className="py-1.5 px-3">Speed (km/h)</th>
                  <th className="py-1.5 px-3">Brake Status</th>
                  <th className="py-1.5 px-3">Brake Press (bar)</th>
                  <th className="py-1.5 px-3">Long. G</th>
                  <th className="py-1.5 px-3">Lat. G</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pts.map((p, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50 ${
                      p.timeSec === 0 ? "bg-rose-50 font-bold text-rose-900" : ""
                    }`}
                  >
                    <td className="py-1.5 px-3 font-semibold">
                      {p.timeSec > 0 ? `+${p.timeSec.toFixed(1)}` : p.timeSec.toFixed(1)}
                    </td>
                    <td className="py-1.5 px-3">{p.speedKmh.toFixed(1)}</td>
                    <td className="py-1.5 px-3">
                      {p.brakeActive ? (
                        <span className="text-amber-700 font-semibold">Active</span>
                      ) : (
                        <span className="text-slate-400">Off</span>
                      )}
                    </td>
                    <td className="py-1.5 px-3">{p.brakePressureBar} bar</td>
                    <td className="py-1.5 px-3">
                      {p.longitudinalG > 0 ? `+${p.longitudinalG}` : p.longitudinalG}
                    </td>
                    <td className="py-1.5 px-3">{p.lateralG}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
