"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlackBoxHero() {
  const { language, t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hasWebGL, setHasWebGL] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeStage, setActiveStage] = useState<number>(0);
  const activeStageRef = useRef<number>(0);

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
    scene.background = new THREE.Color(0x090a0a); // IMPACTA Black

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // --- LIGHTING (Precision Aerospace Studio) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 4.2);
    rimLight.position.set(-5, -3, -5);
    scene.add(rimLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 1.8);
    topLight.position.set(0, 8, 0);
    scene.add(topLight);

    // --- PROCEDURAL BLACK BOX GEOMETRY ---
    const boxGroup = new THREE.Group();
    scene.add(boxGroup);

    // Shared anodized metal materials
    const satinMetal = new THREE.MeshStandardMaterial({
      color: 0x141517, // Deep graphite
      roughness: 0.28,
      metalness: 0.92,
    });

    const matteMetal = new THREE.MeshStandardMaterial({
      color: 0x0c0d0e, // Matte black core
      roughness: 0.65,
      metalness: 0.75,
    });

    const hairlineWireMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
    });

    const titaniumFastenerMat = new THREE.MeshStandardMaterial({
      color: 0x6f7375, // Titanium
      roughness: 0.2,
      metalness: 0.95,
    });

    // 1. Top Plate (decomposes +Y)
    const topPlateGeo = new THREE.BoxGeometry(3.4, 0.12, 2.4);
    const topPlate = new THREE.Mesh(topPlateGeo, satinMetal);
    topPlate.position.set(0, 0.65, 0);
    const topEdges = new THREE.LineSegments(new THREE.EdgesGeometry(topPlateGeo), hairlineWireMaterial);
    topPlate.add(topEdges);
    boxGroup.add(topPlate);

    // 2. Bottom Plate (decomposes -Y)
    const bottomPlateGeo = new THREE.BoxGeometry(3.4, 0.12, 2.4);
    const bottomPlate = new THREE.Mesh(bottomPlateGeo, satinMetal);
    bottomPlate.position.set(0, -0.65, 0);
    const bottomEdges = new THREE.LineSegments(new THREE.EdgesGeometry(bottomPlateGeo), hairlineWireMaterial);
    bottomPlate.add(bottomEdges);
    boxGroup.add(bottomPlate);

    // 3. Left Shield (decomposes -X)
    const leftShieldGeo = new THREE.BoxGeometry(0.12, 1.18, 2.38);
    const leftShield = new THREE.Mesh(leftShieldGeo, matteMetal);
    leftShield.position.set(-1.64, 0, 0);
    const leftEdges = new THREE.LineSegments(new THREE.EdgesGeometry(leftShieldGeo), hairlineWireMaterial);
    leftShield.add(leftEdges);
    boxGroup.add(leftShield);

    // 4. Right Shield (decomposes +X)
    const rightShieldGeo = new THREE.BoxGeometry(0.12, 1.18, 2.38);
    const rightShield = new THREE.Mesh(rightShieldGeo, matteMetal);
    rightShield.position.set(1.64, 0, 0);
    const rightEdges = new THREE.LineSegments(new THREE.EdgesGeometry(rightShieldGeo), hairlineWireMaterial);
    rightShield.add(rightEdges);
    boxGroup.add(rightShield);

    // 5. 4 Corner Fasteners (Hex Pins)
    const pinGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.2, 6);
    const pinPositions = [
      [-1.5, 0.68, -1.0],
      [1.5, 0.68, -1.0],
      [-1.5, 0.68, 1.0],
      [1.5, 0.68, 1.0],
    ];
    pinPositions.forEach(([x, y, z]) => {
      const pin = new THREE.Mesh(pinGeo, titaniumFastenerMat);
      pin.position.set(x, y, z);
      topPlate.add(pin);
    });

    // 6. Central Core Chamber (Dark Structural Block)
    const coreGeo = new THREE.BoxGeometry(3.0, 0.9, 2.0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x090a0a,
      roughness: 0.8,
      metalness: 0.4,
    });
    const coreBlock = new THREE.Mesh(coreGeo, coreMat);
    boxGroup.add(coreBlock);

    // 7. Internal Evidence Planes (5 Layers that fan out during Scene 3-4)
    const evidencePlanes: THREE.Mesh[] = [];
    const planeGeo = new THREE.BoxGeometry(2.6, 0.04, 1.7);

    const planeData = [
      { name: "PHOTO", color: 0x222426 },
      { name: "LOCATION", color: 0x282a2d },
      { name: "VEHICLE", color: 0x1f2123 },
      { name: "TELEMETRY", color: 0x2a2d30 },
      { name: "CAI", color: 0x33363a },
    ];

    planeData.forEach((data, index) => {
      const planeMat = new THREE.MeshStandardMaterial({
        color: data.color,
        roughness: 0.2,
        metalness: 0.8,
      });
      const plane = new THREE.Mesh(planeGeo, planeMat);
      plane.position.set(0, (index - 2) * 0.12, 0);

      // Add clean hairline border to each plane
      const wire = new THREE.LineSegments(
        new THREE.EdgesGeometry(planeGeo),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.65 })
      );
      plane.add(wire);

      evidencePlanes.push(plane);
      boxGroup.add(plane);
    });

    // 8. Trajectory White Vector Wireframe lines (Scene 4)
    const trajectoryPoints = [
      new THREE.Vector3(-1.2, -0.2, -0.6),
      new THREE.Vector3(-0.4, 0.1, -0.2),
      new THREE.Vector3(0.3, -0.15, 0.3),
      new THREE.Vector3(1.2, 0.3, 0.7),
    ];
    const trajectoryGeo = new THREE.BufferGeometry().setFromPoints(trajectoryPoints);
    const trajectoryMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 2,
      transparent: true,
      opacity: 0,
    });
    const trajectoryLine = new THREE.Line(trajectoryGeo, trajectoryMat);
    boxGroup.add(trajectoryLine);

    // Initial subtle orientation
    boxGroup.rotation.x = 0.35;
    boxGroup.rotation.y = -0.45;
    boxGroup.position.y = 0;

    // --- ANIMATION LOOP (Subtle idle drift before user interaction) ---
    let reqId: number;
    let clock = new THREE.Clock();

    const renderScene = () => {
      const elapsedTime = clock.getElapsedTime();
      // Gentle breathing idle rotation
      if (activeStageRef.current === 0) {
        boxGroup.rotation.y = -0.45 + Math.sin(elapsedTime * 0.4) * 0.04;
        boxGroup.rotation.x = 0.35 + Math.cos(elapsedTime * 0.3) * 0.02;
        boxGroup.position.y = Math.sin(elapsedTime * 0.6) * 0.05;
      }
      renderer.render(scene, camera);
      reqId = requestAnimationFrame(renderScene);
    };
    renderScene();

    // --- GSAP SCROLLTRIGGER CHOREOGRAPHY (Native Scroll Scrubbing) ---
    const updateStage = (stage: number) => {
      if (activeStageRef.current !== stage) {
        activeStageRef.current = stage;
        setActiveStage(stage);
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1, // Smooth high-mass inertia
      onUpdate: (self) => {
        const p = self.progress;

        // Stage mapping for UI overlay
        if (p < 0.18) updateStage(0);
        else if (p < 0.45) updateStage(1);
        else if (p < 0.75) updateStage(2);
        else if (p < 0.90) updateStage(3);
        else updateStage(4);

        // Scene 0 -> 1: Impact (0.0 to 0.25)
        if (p <= 0.25) {
          const t1 = p / 0.25;
          camera.position.z = 7.5 - t1 * 0.8;
          boxGroup.rotation.x = 0.35 + t1 * 0.25;
          boxGroup.rotation.y = -0.45 + t1 * 0.35;

          // Intact positions
          topPlate.position.y = 0.65;
          bottomPlate.position.y = -0.65;
          leftShield.position.x = -1.64;
          rightShield.position.x = 1.64;
          coreBlock.scale.set(1, 1, 1);
          trajectoryMat.opacity = 0;

          evidencePlanes.forEach((plane, i) => {
            plane.position.set(0, (i - 2) * 0.12, 0);
            plane.rotation.y = 0;
            plane.scale.set(1, 1, 1);
          });
        }
        // Scene 2: Precision Decomposition / Exploded View (0.25 to 0.55)
        else if (p <= 0.55) {
          const t2 = (p - 0.25) / 0.3;
          camera.position.z = 6.7 - t2 * 0.5;
          boxGroup.rotation.x = 0.6 - t2 * 0.15;
          boxGroup.rotation.y = -0.1 + t2 * 0.65;

          // Exploded outer shells
          topPlate.position.y = 0.65 + t2 * 1.6;
          bottomPlate.position.y = -0.65 - t2 * 1.6;
          leftShield.position.x = -1.64 - t2 * 1.4;
          rightShield.position.x = 1.64 + t2 * 1.4;

          // Core expands slightly
          coreBlock.scale.set(1 - t2 * 0.3, 1 - t2 * 0.3, 1 - t2 * 0.3);

          // Internal evidence planes start separating
          evidencePlanes.forEach((plane, i) => {
            const spread = (i - 2) * 0.45 * t2;
            plane.position.y = spread;
            plane.position.z = (i - 2) * 0.2 * t2;
            plane.rotation.y = (i - 2) * 0.08 * t2;
            plane.scale.set(1 + t2 * 0.1, 1, 1 + t2 * 0.1);
          });

          trajectoryMat.opacity = t2 * 0.4;
        }
        // Scene 3 & 4: Evidence Planes Align & Trajectory Vectors (0.55 to 0.80)
        else if (p <= 0.80) {
          const t3 = (p - 0.55) / 0.25;
          camera.position.z = 6.2 - t3 * 0.4;
          boxGroup.rotation.x = 0.45 - t3 * 0.2;
          boxGroup.rotation.y = 0.55 - t3 * 0.45;

          topPlate.position.y = 2.25 + t3 * 0.2;
          bottomPlate.position.y = -2.25 - t3 * 0.2;
          leftShield.position.x = -3.04;
          rightShield.position.x = 3.04;

          // Fanning into structured horizontal alignment
          evidencePlanes.forEach((plane, i) => {
            const finalY = (i - 2) * 0.55;
            const finalX = (i - 2) * 0.35 * t3;
            plane.position.y = finalY;
            plane.position.x = finalX;
            plane.position.z = (i - 2) * 0.35 * (1 - t3 * 0.4);
            plane.rotation.y = (i - 2) * 0.1 * (1 - t3);
          });

          // Trajectory white hairline draws in full
          trajectoryMat.opacity = 0.4 + t3 * 0.6;
        }
        // Scene 5 & 6: Recomposition & Order (0.80 to 1.0)
        else {
          const t4 = (p - 0.80) / 0.2;
          camera.position.z = 5.8 + t4 * 1.8;
          boxGroup.rotation.x = 0.25 + (1 - t4) * 0.1;
          boxGroup.rotation.y = 0.1 - t4 * 0.45;

          // Smooth re-assembly into intact form
          topPlate.position.y = 2.45 - t4 * 1.8;
          bottomPlate.position.y = -2.45 + t4 * 1.8;
          leftShield.position.x = -3.04 + t4 * 1.4;
          rightShield.position.x = 3.04 - t4 * 1.4;

          coreBlock.scale.set(0.7 + t4 * 0.3, 0.7 + t4 * 0.3, 0.7 + t4 * 0.3);

          evidencePlanes.forEach((plane, i) => {
            plane.position.y = (1 - t4) * (i - 2) * 0.55 + t4 * (i - 2) * 0.12;
            plane.position.x = (1 - t4) * (i - 2) * 0.35;
            plane.position.z = 0;
            plane.rotation.y = 0;
            plane.scale.set(1, 1, 1);
          });

          trajectoryMat.opacity = (1 - t4) * 0.9;
        }
      },
    });

    // Handle Resize
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

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      trigger.kill();
      renderer.dispose();
      topPlateGeo.dispose();
      bottomPlateGeo.dispose();
      leftShieldGeo.dispose();
      rightShieldGeo.dispose();
      pinGeo.dispose();
      coreGeo.dispose();
      planeGeo.dispose();
      trajectoryGeo.dispose();
      satinMetal.dispose();
      matteMetal.dispose();
      hairlineWireMaterial.dispose();
      titaniumFastenerMat.dispose();
      coreMat.dispose();
      trajectoryMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#090A0A] text-white"
      style={{ height: reducedMotion ? "100vh" : "320vh" }}
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
          /* High-End Monochromatic Fallback for Reduced Motion & Non-WebGL */
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-[340px] sm:w-[480px] h-[240px] sm:h-[320px] rounded-none border border-white/20 bg-[#121315] shadow-2xl flex flex-col justify-between p-8">
              <div className="flex justify-between items-center text-xs font-mono tracking-widest text-white/50">
                <span>IMPACTA BLACK BOX</span>
                <span>SEC. SPEC. 2026</span>
              </div>
              <div className="space-y-2">
                <div className="w-full h-px bg-white/20" />
                <div className="w-3/4 h-px bg-white/40" />
                <div className="w-1/2 h-px bg-white/20" />
              </div>
              <div className="text-xs font-mono tracking-wider text-white/70">
                EVIDENCE FUSION &amp; CAN-BUS INTELLIGENCE
              </div>
            </div>
          </div>
        )}

        {/* DOM Semantic Companion & Floating Overlays */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 h-full flex flex-col justify-between py-24 sm:py-28 pointer-events-none">
          {/* Top Status Indicators (Engineered Minimal Chrome) */}
          <div className="flex justify-between items-start text-xs font-mono tracking-widest text-white/60">
            <div className="space-y-1">
              <span className="block text-white/40 uppercase">01 / ARCHITECTURE</span>
              <span className="text-white font-medium">BLACK BOX METAPHOR</span>
            </div>
            <div className="text-right space-y-1">
              <span className="block text-white/40 uppercase">EVIDENCE DECOMPOSITION</span>
              <span className="text-white font-medium">
                {activeStage === 0 && "SCENE 0: ARRIVAL"}
                {activeStage === 1 && "SCENE 1: IMPACT KINEMATICS"}
                {activeStage === 2 && "SCENE 2: EVIDENCE DECOMPOSITION"}
                {activeStage === 3 && "SCENE 3: STRUCTURED SYNTHESIS"}
                {activeStage === 4 && "SCENE 4: HUMAN-READY DOSSIER"}
              </span>
            </div>
          </div>

          {/* Primary Hero Statement & Dynamic Stage Copy */}
          <div className="max-w-4xl py-8">
            {activeStage === 0 && (
              <div className="space-y-6 pointer-events-auto transition-opacity duration-700">
                <h1 className="text-5xl sm:text-7xl lg:text-[5.75rem] font-bold tracking-[-0.03em] leading-[0.96] text-white uppercase">
                  {language === "it" ? (
                    <>
                      Prove del sinistro.
                      <br />
                      Strutturate.
                    </>
                  ) : (
                    <>
                      Accident evidence.
                      <br />
                      Structured.
                    </>
                  )}
                </h1>
                <p className="text-lg sm:text-xl text-white/75 max-w-2xl font-normal leading-relaxed">
                  {language === "it"
                    ? "Dall'urto sulla strada al fascicolo peritale europeo. Unificazione istantanea di rilievi fotografici, coordinate e telemetria."
                    : "From roadside impact to forensic dossier. Instant synthesis of driver photos, GPS telemetry, and standardized European claims."}
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/app/report"
                    className="inline-flex items-center justify-center min-h-[52px] px-8 bg-white text-[#090A0A] text-sm font-semibold tracking-wider uppercase hover:bg-[#F4F5F3] transition-colors"
                  >
                    {t("hero.reportAccident")}
                  </Link>
                  <Link
                    href="/platform"
                    className="inline-flex items-center justify-center min-h-[52px] px-8 border border-white/30 text-white text-sm font-medium tracking-wider uppercase hover:border-white hover:bg-white/10 transition-colors"
                  >
                    {t("hero.seeHowItWorks")}
                  </Link>
                </div>
              </div>
            )}

            {activeStage === 1 && (
              <div className="space-y-3 transition-opacity duration-700">
                <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                  {language === "it" ? "FASE 01 / IMPATTO" : "STAGE 01 / IMPACT"}
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
                  {language === "it" ? "Dinamica e decelerazione" : "Kinematics & Deceleration"}
                </h2>
                <p className="text-base sm:text-lg text-white/70 max-w-xl">
                  {language === "it"
                    ? "I vettori di forza e le traiettorie dell'incidente vengono isolati ed estratti in pacchetti immutabili."
                    : "Impact vectors and deceleration curves are isolated into immutable cryptographic evidence packets."}
                </p>
              </div>
            )}

            {activeStage === 2 && (
              <div className="space-y-3 transition-opacity duration-700">
                <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                  {language === "it" ? "FASE 02 / SCOMPOSIZIONE" : "STAGE 02 / DECOMPOSITION"}
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
                  {language === "it" ? "Cinque strati probatori" : "Five Layers of Truth"}
                </h2>
                <p className="text-base sm:text-lg text-white/70 max-w-xl">
                  {language === "it"
                    ? "Fotografie, coordinate GNSS, identità conducenti, telemetria di bordo e schema CAI si separano in piani indipendenti."
                    : "Physical photographs, GNSS coordinates, driver identity, CAN-bus records, and CAI diagrams fan into inspectable planes."}
                </p>
              </div>
            )}

            {activeStage === 3 && (
              <div className="space-y-3 transition-opacity duration-700">
                <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                  {language === "it" ? "FASE 03 / STRUTTURAZIONE" : "STAGE 03 / SYNTHESIS"}
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
                  {language === "it" ? "Allineamento dati" : "Structured Alignment"}
                </h2>
                <p className="text-base sm:text-lg text-white/70 max-w-xl">
                  {language === "it"
                    ? "I dati frammentati convergono in una geometria continua pronta per la verifica peritale umana."
                    : "Disparate roadside data points align along calibrated trajectory vectors ready for expert adjuster inspection."}
                </p>
              </div>
            )}

            {activeStage === 4 && (
              <div className="space-y-3 transition-opacity duration-700">
                <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                  {language === "it" ? "FASE 04 / DOSSIER COMPLETO" : "STAGE 04 / COMPLETED DOSSIER"}
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
                  {language === "it" ? "Fascicolo CAI Pronto" : "Standardized CAI Package"}
                </h2>
                <p className="text-base sm:text-lg text-white/70 max-w-xl">
                  {language === "it"
                    ? "Il sistema ricompone il fascicolo. Nessuna decisione arbitraria: un pacchetto probatorio rigoroso per il liquidatore."
                    : "The Black Box reassembles. No automated fault decrees: a structured, auditable package for human decision-makers."}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Scroll Indicator */}
          <div className="flex justify-between items-end text-xs font-mono tracking-widest text-white/40">
            <span>
              {activeStage === 0
                ? language === "it"
                  ? "SCORRI PER ESPLORARE LA BLACK BOX ↓"
                  : "SCROLL TO EXPLORE BLACK BOX ↓"
                : language === "it"
                ? "SCORRI VERSO IL BASSO PER AVANZARE"
                : "SCROLL TO ADVANCE"}
            </span>
            <span className="hidden sm:inline">
              ISO/IEC 27037 • DIGITAL EVIDENCE COMPLIANT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
