import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import {
  CarIcon,
  CameraIcon,
  ShieldIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  AlertTriangleIcon,
} from "@/components/icons/Icons";

export const metadata = {
  title: "For Drivers — IMPACTA",
  description:
    "A calm, low-cognitive-load mobile PWA designed for policyholders immediately following a vehicle collision.",
};

export default function DriversPage() {
  return (
    <PublicShell>
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                Driver PWA Experience
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
                Calm guidance at the roadside when you need it most.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Accidents are disorienting and stressful. IMPACTA Driver replaces intimidating paper CAI forms and bureaucratic portals with a step-by-step assistant that prioritizes your physical safety, guides clear photo capture, and files your claim locally.
              </p>
              <div className="pt-2">
                <Link
                  href="/app"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all active:scale-[0.98]"
                >
                  <span>Launch Driver App</span>
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 shadow-md">
                <Image
                  src="/images/hero-car.jpg"
                  alt="Insured European hatchback vehicle"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300">
                    Policyholder Profile Ready
                  </span>
                  <span className="text-base font-bold">Matteo Bianchi · Volkswagen Golf VIII</span>
                  <span className="text-xs text-slate-300">Plate GF492XP · Aura Mutua Assicurazioni</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Driver Capabilities */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Designed specifically for post-crash stress.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Traditional insurance apps ask 40 complex questions all at once. IMPACTA Driver breaks down the roadside task into four calm phases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Safety */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center">
                <AlertTriangleIcon size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-950">
                1. Safety &amp; Emergency First
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Before collecting any damage photos or details, the app confirms you and your passengers are in a safe location, verified hazard lights, and provides direct 112 emergency dialing assistance.
              </p>
            </div>

            {/* Feature 2: Photo Guidance */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                <CameraIcon size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-950">
                2. Visual 4-Angle Photo Guide
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear guidelines show you exactly where to stand: wide scene overview, contact damage on your vehicle, other driver&apos;s plate, and road signs. Native camera integration uses your phone&apos;s high-res optics.
              </p>
            </div>

            {/* Feature 3: Plain English */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                <CheckCircleIcon size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-950">
                3. Plain-Language Review
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No legal jargon or technical kinematic vectors. You see a clear, neutral summary of what happened (&ldquo;You were in the roundabout. The other vehicle entered from your right&rdquo;) before confirming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Offline-First Reassurance */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold">
            <span>Offline-First Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            Never worry about cellular dead zones.
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            All incident details and high-resolution camera photos are preserved locally in your browser&apos;s IndexedDB and localStorage. Even with zero reception, your inputs and draft remain completely safe.
          </p>
          <div className="pt-2">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
            >
              <span>Try Driver Experience Now</span>
              <ArrowRightIcon size={14} />
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
