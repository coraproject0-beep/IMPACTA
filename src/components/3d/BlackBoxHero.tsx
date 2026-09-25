"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface BlackBoxHeroProps {
  onPhaseChange?: (phaseIndex: number) => void;
}

export default function BlackBoxHero({ onPhaseChange }: BlackBoxHeroProps) {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hasWebGL, setHasWebGL] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activePhase, setActivePhase] = useState<number>(0);
  const activePhaseRef = useRef<number>(0);

  // 5 Perceived Visual Phases (Clean & Non-Technical)
  const PHASES = [
    {
      index: 0,
      titleEn: "The Black Box",
      titleIt: "La Scatola Nera",
      descEn: "Every physical roadside collision fact preserved at the scene.",
      descIt: "Tutti i fatti fisici dell'impatto preservati sul luogo dell'incidente.",
    },
    {
      index: 1,
      titleEn: "Chamber Disengages",
      titleIt: "Apertura del Nucleo",
      descEn: "The protective outer shell disengages to expose verified sensor and photographic evidence.",
      descIt: "Il guscio esterno si apre per mostrare i dati sensoriali e le prove fotografiche verificate.",
    },
    {
      index: 2,
      titleEn: "Evidence Decomposed",
      titleIt: "Scomposizione delle Prove",
      descEn: "Calibrated scene photography, vehicle damage points, and driver statements separate into distinct planes.",
      descIt: "Fotografie calibrate, punti d'urto del veicolo e dichiarazioni si separano in livelli chiari.",
    },
    {
      index: 3,
      titleEn: "Kinematic Trajectory",
      titleIt: "Traiettoria Cinematica",
      descEn: "An overhead spatial reconstruction maps vehicle paths to the exact point of impact.",
      descIt: "Una ricostruzione spaziale dall'alto traccia le traiettorie fino all'esatto punto d'urto.",
    },
    {
      index: 4,
      titleEn: "Structured for Review",
      titleIt: "Pronto per la Perizia",
      descEn: "Objective facts resolve into an audit-ready European claim dossier for human adjuster decision.",
      descIt: "I fatti oggettivi si ricompongono in un fascicolo peritale europeo per la decisione del perito umano.",
    },
  ];

  useEffect(() => {
    // Check reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
      return;
    }

    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    if (!canvasRef.current || !containerRef.current) return;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090a0a);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // --- LIGHTING (Restrained Monochromatic Studio) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 3.8);
    rimLight.position.set(-6, -4, -5);
    scene.add(rimLight);

    const softTopLight = new THREE.DirectionalLight(0xffffff, 1.8);
    softTopLight.position.set(0, 8, 0);
    scene.add(softTopLight);

    // --- PROCEDURAL MESHES ---
    // Materials: Solid satin black with refined specular sheen
    const satinBlack = new THREE.MeshStandardMaterial({
      color: 0x141517,
      roughness: 0.28,
      metalness: 0.92,
    });

    const matteCore = new THREE.MeshStandardMaterial({
      color: 0x0c0d0e,
      roughness: 0.6,
      metalness: 0.8,
    });

    const subtleHairline = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
    });

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. OUTER BLACK BOX SHELL (Clean solid silhouette with minimal seams)
    const shellGroup = new THREE.Group();
    rootGroup.add(shellGroup);

    // Top Shell Half
    const topShellGeo = new THREE.BoxGeometry(3.6, 0.6, 2.5);
    const topShell = new THREE.Mesh(topShellGeo, satinBlack);
    topShell.position.set(0, 0.32, 0);
    topShell.add(new THREE.LineSegments(new THREE.EdgesGeometry(topShellGeo), subtleHairline));
    shellGroup.add(topShell);

    // Bottom Shell Half
    const bottomShellGeo = new THREE.BoxGeometry(3.6, 0.6, 2.5);
    const bottomShell = new THREE.Mesh(bottomShellGeo, satinBlack);
    bottomShell.position.set(0, -0.32, 0);
    bottomShell.add(new THREE.LineSegments(new THREE.EdgesGeometry(bottomShellGeo), subtleHairline));
    shellGroup.add(bottomShell);

    // 2. INNER CORE (Revealed when shells open)
    const innerCoreGeo = new THREE.BoxGeometry(2.8, 0.7, 1.8);
    const innerCore = new THREE.Mesh(innerCoreGeo, matteCore);
    innerCore.add(new THREE.LineSegments(new THREE.EdgesGeometry(innerCoreGeo), subtleHairline));
    rootGroup.add(innerCore);

    // 3. THREE CLEAN EVIDENCE PLANES
    const evidencePlanes: THREE.Mesh[] = [];
    const planeGeo = new THREE.BoxGeometry(2.2, 0.04, 1.4);
    const planeColors = [0x1f2124, 0x18191b, 0x26292d];

    planeColors.forEach((col, idx) => {
      const planeMat = new THREE.MeshStandardMaterial({
        color: col,
        roughness: 0.35,
        metalness: 0.75,
      });
      const plane = new THREE.Mesh(planeGeo, planeMat);
      plane.position.set(0, (idx - 1) * 0.1, 0);
      plane.add(new THREE.LineSegments(new THREE.EdgesGeometry(planeGeo), subtleHairline));
      evidencePlanes.push(plane);
      rootGroup.add(plane);
    });

    // 4. CLEAN INCIDENT SIMULATION RIG (Two vehicle silhouettes & trajectory lines)
    const simulationGroup = new THREE.Group();
    simulationGroup.scale.set(0.001, 0.001, 0.001); // hidden initially
    rootGroup.add(simulationGroup);

    // Subtle Roadway Guide Lines
    const roadMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 });
    const roadPoints = [
      new THREE.Vector3(-3.2, 0, 0),
      new THREE.Vector3(3.2, 0, 0),
      new THREE.Vector3(0, 0, -3.2),
      new THREE.Vector3(0, 0, 3.2),
    ];
    const roadLines = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(roadPoints), roadMat);
    simulationGroup.add(roadLines);

    // Roundabout Guide Ring
    const ringCurve = new THREE.EllipseCurve(0, 0, 1.6, 1.6, 0, 2 * Math.PI, false, 0);
    const ringPoints = ringCurve.getPoints(40).map((p) => new THREE.Vector3(p.x, 0, p.y));
    const ringLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(ringPoints), roadMat);
    simulationGroup.add(ringLine);

    // Vehicle A (Solid White Silhouette)
    const vehAGeo = new THREE.BoxGeometry(0.7, 0.22, 0.4);
    const vehAMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.8 });
    const vehicleA = new THREE.Mesh(vehAGeo, vehAMat);
    vehicleA.position.set(-1.4, 0.12, 0.3);
    simulationGroup.add(vehicleA);

    // Vehicle B (Solid Dark Graphite Silhouette)
    const vehBGeo = new THREE.BoxGeometry(0.7, 0.22, 0.4);
    const vehBMat = new THREE.MeshStandardMaterial({ color: 0x484c50, roughness: 0.4, metalness: 0.7 });
    const vehicleB = new THREE.Mesh(vehBGeo, vehBMat);
    vehicleB.position.set(0.2, 0.12, 1.5);
    simulationGroup.add(vehicleB);

    // Impact Point Marker
    const impactCurve = new THREE.EllipseCurve(0, 0, 0.28, 0.28, 0, 2 * Math.PI, false, 0);
    const impactPoints = impactCurve.getPoints(32).map((p) => new THREE.Vector3(p.x, 0.13, p.y));
    const impactCircle = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(impactPoints),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 })
    );
    impactCircle.position.set(-0.2, 0, 0.5);
    simulationGroup.add(impactCircle);

    // Initial orientation: Solid, angled view of the monolithic box
    rootGroup.rotation.x = 0.32;
    rootGroup.rotation.y = -0.42;

    // --- ANIMATION / IDLE LOOP ---
    let reqId: number;
    const clock = new THREE.Clock();

    const renderScene = () => {
      const elapsed = clock.getElapsedTime();
      if (activePhaseRef.current === 0) {
        rootGroup.rotation.y = -0.42 + Math.sin(elapsed * 0.35) * 0.02;
        rootGroup.rotation.x = 0.32 + Math.cos(elapsed * 0.25) * 0.015;
      }
      renderer.render(scene, camera);
      reqId = requestAnimationFrame(renderScene);
    };
    renderScene();

    // --- SMOOTH GSAP SCROLL SCRUBBING (5 CLEAR PERCEIVED PHASES) ---
    const updatePhase = (idx: number) => {
      if (activePhaseRef.current !== idx) {
        activePhaseRef.current = idx;
        setActivePhase(idx);
        if (onPhaseChange) onPhaseChange(idx);
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.4, // Smooth damping
      onUpdate: (self) => {
        const p = self.progress;

        // Map scroll progress to 5 distinct phases
        if (p < 0.2) updatePhase(0); // Phase 0: Closed
        else if (p < 0.42) updatePhase(1); // Phase 1: Open
        else if (p < 0.65) updatePhase(2); // Phase 2: Evidence
        else if (p < 0.85) updatePhase(3); // Phase 3: Incident
        else updatePhase(4); // Phase 4: Structured Claim

        // PHASE 0: CLOSED MONOLITH (p: 0.00 -> 0.20)
        if (p <= 0.2) {
          const t0 = p / 0.2;
          camera.position.set(0, 0, 8.2 - t0 * 0.3);
          camera.lookAt(0, 0, 0);

          rootGroup.rotation.x = 0.32 + t0 * 0.06;
          rootGroup.rotation.y = -0.42 + t0 * 0.12;

          topShell.position.y = 0.32;
          bottomShell.position.y = -0.32;
          innerCore.scale.set(0.9, 0.9, 0.9);
          simulationGroup.scale.set(0.001, 0.001, 0.001);

          evidencePlanes.forEach((plane, i) => {
            plane.position.set(0, (i - 1) * 0.08, 0);
            plane.rotation.y = 0;
            plane.scale.set(1, 1, 1);
          });
        }
        // PHASE 1: OPENING / DISENGAGING (p: 0.20 -> 0.42)
        else if (p <= 0.42) {
          const t1 = (p - 0.2) / 0.22;
          camera.position.set(0, 0, 7.9 - t1 * 0.4);
          rootGroup.rotation.x = 0.38 - t1 * 0.08;
          rootGroup.rotation.y = -0.3 + t1 * 0.35;

          // Shell halves smoothly separate
          topShell.position.y = 0.32 + t1 * 1.5;
          bottomShell.position.y = -0.32 - t1 * 1.5;

          innerCore.scale.set(0.9 + t1 * 0.15, 0.9 + t1 * 0.15, 0.9 + t1 * 0.15);
          simulationGroup.scale.set(0.001, 0.001, 0.001);

          evidencePlanes.forEach((plane, i) => {
            plane.position.set(0, (i - 1) * (0.08 + t1 * 0.15), 0);
          });
        }
        // PHASE 2: EVIDENCE DECOMPOSITION (p: 0.42 -> 0.65)
        else if (p <= 0.65) {
          const t2 = (p - 0.42) / 0.23;
          camera.position.set(0, 0, 7.5);
          rootGroup.rotation.x = 0.3 + t2 * 0.15;
          rootGroup.rotation.y = 0.05 - t2 * 0.25;

          topShell.position.y = 1.82 + t2 * 0.4;
          bottomShell.position.y = -1.82 - t2 * 0.4;

          // 3 evidence planes fan gracefully
          evidencePlanes.forEach((plane, i) => {
            const spreadY = (i - 1) * 0.65;
            const spreadX = (i - 1) * 0.45 * t2;
            plane.position.set(spreadX, spreadY, (1 - t2) * 0.2);
            plane.rotation.y = (i - 1) * 0.12 * t2;
          });

          simulationGroup.scale.set(0.001, 0.001, 0.001);
        }
        // PHASE 3: INCIDENT TRAJECTORY (p: 0.65 -> 0.85)
        else if (p <= 0.85) {
          const t3 = (p - 0.65) / 0.2;
          // Smooth glide into top-down perspective
          camera.position.set(0, 5.5 * t3, 7.5 * (1 - t3) + 3.2 * t3);
          camera.lookAt(0, 0, 0);

          rootGroup.rotation.x = 0.45 + t3 * 0.55; // Tilt to overhead
          rootGroup.rotation.y = -0.2 * (1 - t3);

          topShell.position.y = 2.22 + t3 * 1.5;
          bottomShell.position.y = -2.22 - t3 * 1.5;

          // Retract evidence planes
          evidencePlanes.forEach((plane) => {
            plane.scale.set(1 - t3 * 0.7, 1 - t3 * 0.7, 1 - t3 * 0.7);
          });

          // Reveal simulation
          simulationGroup.scale.set(t3, t3, t3);
          vehicleA.position.x = -1.8 + t3 * 1.2;
          vehicleB.position.z = 2.0 - t3 * 1.2;
        }
        // PHASE 4: STRUCTURED CLAIM RESOLUTION (p: 0.85 -> 1.00)
        else {
          const t4 = (p - 0.85) / 0.15;
          camera.position.set(0, 5.5 * (1 - t4) + 0.5 * t4, 3.2 * (1 - t4) + 7.5 * t4);
          camera.lookAt(0, 0, 0);

          rootGroup.rotation.x = 1.0 - t4 * 0.68;
          rootGroup.rotation.y = -0.35 * t4;

          simulationGroup.scale.set(Math.max(0.001, 1 - t4), Math.max(0.001, 1 - t4), Math.max(0.001, 1 - t4));

          // Evidence planes recombine into a clean, flat dossier stack
          evidencePlanes.forEach((plane, i) => {
            plane.scale.set(0.3 + t4 * 0.7, 1, 0.3 + t4 * 0.7);
            plane.position.set(0, (i - 1) * 0.15 * (1 - t4) + (i - 1) * 0.08 * t4, 0);
            plane.rotation.y = 0;
          });

          // Shell halves reassemble smoothly
          topShell.position.y = 3.72 - t4 * 3.4;
          bottomShell.position.y = -3.72 + t4 * 3.4;
        }
      },
    });

    const handleResize = () => {
      if (!canvasRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      trigger.kill();
      renderer.dispose();
      topShellGeo.dispose();
      bottomShellGeo.dispose();
      innerCoreGeo.dispose();
      planeGeo.dispose();
      vehAGeo.dispose();
      vehBGeo.dispose();
      satinBlack.dispose();
      matteCore.dispose();
      subtleHairline.dispose();
      vehAMat.dispose();
      vehBMat.dispose();
      roadMat.dispose();
    };
  }, [onPhaseChange]);

  const currentPhase = PHASES[activePhase] || PHASES[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#090A0A] text-white"
      style={{ height: reducedMotion ? "100vh" : "360vh" }}
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Three.js Canvas */}
        {hasWebGL && !reducedMotion ? (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block touch-none"
            aria-hidden="true"
          />
        ) : (
          /* High-Contrast Accessible Fallback */
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-[320px] sm:w-[440px] h-[220px] sm:h-[280px] border border-white/20 bg-[#121315] flex flex-col justify-between p-8">
              <div className="text-sm font-bold tracking-tight text-white uppercase">
                IMPACTA BLACK BOX
              </div>
              <div className="space-y-2">
                <div className="w-full h-px bg-white/40" />
                <div className="w-2/3 h-px bg-white/20" />
              </div>
              <div className="text-xs text-white/70">
                {language === "it" ? currentPhase.titleIt : currentPhase.titleEn}
              </div>
            </div>
          </div>
        )}

        {/* Text Layer in Intentional Negative Space (Left-Aligned, Non-Obscuring) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 h-full flex flex-col justify-between py-24 sm:py-28 pointer-events-none">
          {/* Subtle Section Title */}
          <div>
            <span className="text-sm text-white/50 font-medium">
              {language === "it" ? "Il Metodo" : "The Method"}
            </span>
          </div>

          {/* Clean Phase Title & Description (Max 1 Headline + 1 Sentence) */}
          <div className="max-w-xl space-y-3 pb-8">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              {language === "it" ? currentPhase.titleIt : currentPhase.titleEn}
            </h2>
            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
              {language === "it" ? currentPhase.descIt : currentPhase.descEn}
            </p>
          </div>

          {/* Bottom Metrology Anchor */}
          <div className="pt-4 border-t border-white/10 text-xs text-white/40">
            {language === "it"
              ? "Trasformazione delle prove fisiche in fascicolo peritale"
              : "Physical evidence transformation into claim dossier"}
          </div>
        </div>
      </div>
    </div>
  );
}
