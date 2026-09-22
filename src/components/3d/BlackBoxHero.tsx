"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { ArrowRightIcon } from "@/components/icons/Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface BlackBoxHeroProps {
  onStateChange?: (stateIndex: number) => void;
}

export default function BlackBoxHero({ onStateChange }: BlackBoxHeroProps) {
  const { language, t } = useLanguage();
  const { isDriverAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hasWebGL, setHasWebGL] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeStage, setActiveStage] = useState<number>(0);
  const activeStageRef = useRef<number>(0);

  const reportLink = isDriverAuthenticated ? "/app/report" : "/login?redirect=/app/report";

  // 10 Distinct Staged Scroll States
  const STAGES = [
    {
      index: 0,
      nameEn: "SEALED MONOLITH",
      nameIt: "MONOLITE SIGILLATO",
      kickerEn: "STATE 01 / 10 • MONOLITH",
      kickerIt: "STATO 01 / 10 • MONOLITE",
      titleEn: "ACCIDENT EVIDENCE. STRUCTURED.",
      titleIt: "EVIDENZA DELL'IMPATTO. STRUTTURATA.",
      descEn:
        "Every collision fact preserved at the scene. Tamper-evident intake fusing high-frequency telemetry, photography, and calibrated kinematic models.",
      descIt:
        "Tutti i dati dell'impatto preservati sul luogo. Acquisizione a prova di manomissione tra telemetria ad alta frequenza, foto e cinematica.",
    },
    {
      index: 1,
      nameEn: "SIGNAL INGESTION",
      nameIt: "INGESTIONE SEGNALI",
      kickerEn: "STATE 02 / 10 • SENSORS",
      kickerIt: "STATO 02 / 10 • SENSORI",
      titleEn: "TELEMETRY PULSE DETECTED",
      titleIt: "IMPULSO TELEMETRICO RILEVATO",
      descEn:
        "Synchronized CAN-bus sensor streams and GNSS positioning lock collision coordinates with millisecond timestamp precision.",
      descIt:
        "Flussi telemetrici CAN-bus e coordinate GNSS sincronizzati fissano l'evento con precisione millimetrica e temporale.",
    },
    {
      index: 2,
      nameEn: "MECHANICAL UNFOLD",
      nameIt: "APERTURA MECCANICA",
      kickerEn: "STATE 03 / 10 • DISENGAGEMENT",
      kickerIt: "STATO 03 / 10 • DISANCORAGGIO",
      titleEn: "CHAMBERS DISENGAGE",
      titleIt: "LE CAMERE SI APRONO",
      descEn:
        "Outer anodized titanium shields expand along orthogonal axes, opening the structural core for evidence examination.",
      descIt:
        "I gusci esterni in titanio anodizzato si espandono lungo gli assi ortogonali, aprendo il nucleo all'analisi delle prove.",
    },
    {
      index: 3,
      nameEn: "RECURSIVE DEPTH",
      nameIt: "PROFONDITÀ RICORSIVA",
      kickerEn: "STATE 04 / 10 • RECURSION",
      kickerIt: "STATO 04 / 10 • RICORSIONE",
      titleEn: "IMPOSSIBLE RECURSIVE CORE",
      titleIt: "NUCLEO RICORSIVO INTERNO",
      descEn:
        "Within the open chamber, a nested structural core recedes into architectural space, safeguarding cryptographic evidence layers.",
      descIt:
        "All'interno della camera aperta, un nucleo ricorsivo nidificato arretra nello spazio, proteggendo i livelli crittografici.",
    },
    {
      index: 4,
      nameEn: "EVIDENCE DECOMPOSITION",
      nameIt: "SCOMPOSIZIONE PROVE",
      kickerEn: "STATE 05 / 10 • ARTIFACTS",
      kickerIt: "STATO 05 / 10 • REPERTI",
      titleEn: "FOUR EVIDENCE PLANES FAN OUT",
      titleIt: "QUATTRO LIVELLI PROBATORI",
      descEn:
        "Scene overview photography, damaged panel close-ups, counterparty registration OCR, and insurance certificate fan into view.",
      descIt:
        "Panoramica del luogo, dettagli del danno, OCR targa controparte e certificato assicurativo si distribuiscono nello spazio.",
    },
    {
      index: 5,
      nameEn: "INCIDENT SIMULATION",
      nameIt: "SIMULAZIONE INCIDENTE",
      kickerEn: "STATE 06 / 10 • TRAJECTORY SIMULATION",
      kickerIt: "STATO 06 / 10 • SIMULAZIONE TRAIETTORIE",
      titleEn: "OVERHEAD VECTOR COLLISION",
      titleIt: "COLLISIONE VETTORIALE DALL'ALTO",
      descEn:
        "Overhead kinematic reconstruction: Vehicle A (Golf VIII) and Vehicle B converge at roundabout junction. Conflict angle 84° • Relative speed 14 km/h.",
      descIt:
        "Ricostruzione cinematica dall'alto: Veicolo A (Golf VIII) e Veicolo B convergono all'incrocio rotatorio. Angolo d'urto 84° • Delta velocità 14 km/h.",
    },
    {
      index: 6,
      nameEn: "DECELERATION TELEMETRY",
      nameIt: "TELEMETRIA DECELERAZIONE",
      kickerEn: "STATE 07 / 10 • KINEMATICS",
      kickerIt: "STATO 07 / 10 • CINEMATICA",
      titleEn: "10Hz DECELERATION CURVE",
      titleIt: "CURVA DI DECELERAZIONE A 10Hz",
      descEn:
        "Calibrated CAN-bus braking curve shows peak -0.82G deceleration at T=0, correlating physical bumper deformation with onboard sensors.",
      descIt:
        "La curva di frenata a 10Hz evidenzia un picco di -0.82G al momento dell'impatto, correlando la deformazione con i sensori di bordo.",
    },
    {
      index: 7,
      nameEn: "CAI BOX 12 STRUCTURE",
      nameIt: "STRUTTURA CAI CASELLA 12",
      kickerEn: "STATE 08 / 10 • STANDARDIZATION",
      kickerIt: "STATO 08 / 10 • STANDARDIZZAZIONE",
      titleEn: "EUROPEAN CIRCUMSTANCES 06 & 07",
      titleIt: "CIRCOSTANZE EUROPEE 06 E 07",
      descEn:
        "Raw physical kinematics normalize into standard Agreed Statement circumstances without human manual transcription errors.",
      descIt:
        "La dinamica fisica si normalizza nelle circostanze standard del Modulo CAI senza errori di trascrizione manuale.",
    },
    {
      index: 8,
      nameEn: "HUMAN ADJUSTER DEMARCATION",
      nameIt: "DEMARCAZIONE PERITO UMANO",
      kickerEn: "STATE 09 / 10 • GOVERNANCE",
      kickerIt: "STATO 09 / 10 • GOVERNANCE",
      titleEn: "EVIDENTIARY TRUTH • HUMAN DECISION",
      titleIt: "VERITÀ PROBATORIA • DECISIONE UMANA",
      descEn:
        "Strict epistemic demarcation: IMPACTA structures objective physics for human experts. Zero automated fault, zero automated legal decrees.",
      descIt:
        "Netta separazione epistemica: IMPACTA struttura i fatti per i periti umani. Nessuna attribuzione automatica di colpa o responsabilità.",
    },
    {
      index: 9,
      nameEn: "SEALED DOSSIER",
      nameIt: "DOSSIER SIGILLATO",
      kickerEn: "STATE 10 / 10 • COMPLETION",
      kickerIt: "STATO 10 / 10 • COMPLETAMENTO",
      titleEn: "AUDIT-READY CLAIMS DOSSIER",
      titleIt: "DOSSIER PRONTO PER LA LIQUIDAZIONE",
      descEn:
        "The recursive components lock back into monolithic alignment. Verified roadside dossier ready for immediate claims adjustment.",
      descIt:
        "Tutti i componenti ricorsivi si risaldano nell'allineamento monolitico. Il dossier verificato è pronto per l'apertura sinistro.",
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
    scene.background = new THREE.Color(0x090a0a); // IMPACTA Black

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.0);

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

    // --- LIGHTING (Aerospace Monochromatic Studio) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 4.0);
    rimLight.position.set(-6, -4, -5);
    scene.add(rimLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 2.0);
    topLight.position.set(0, 9, 0);
    scene.add(topLight);

    // --- MATERIALS ---
    const satinMetal = new THREE.MeshStandardMaterial({
      color: 0x151719,
      roughness: 0.25,
      metalness: 0.92,
    });

    const matteMetal = new THREE.MeshStandardMaterial({
      color: 0x0c0d0e,
      roughness: 0.65,
      metalness: 0.75,
    });

    const wireMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.45,
    });

    const activeWireMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
    });

    const fastenerMat = new THREE.MeshStandardMaterial({
      color: 0x7a7e80,
      roughness: 0.2,
      metalness: 0.95,
    });

    // Root Assembly Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. OUTER BLACK BOX SHELL
    const outerBoxGroup = new THREE.Group();
    rootGroup.add(outerBoxGroup);

    // Top Plate
    const topPlateGeo = new THREE.BoxGeometry(3.6, 0.12, 2.5);
    const topPlate = new THREE.Mesh(topPlateGeo, satinMetal);
    topPlate.position.set(0, 0.7, 0);
    topPlate.add(new THREE.LineSegments(new THREE.EdgesGeometry(topPlateGeo), wireMat));
    outerBoxGroup.add(topPlate);

    // Bottom Plate
    const bottomPlateGeo = new THREE.BoxGeometry(3.6, 0.12, 2.5);
    const bottomPlate = new THREE.Mesh(bottomPlateGeo, satinMetal);
    bottomPlate.position.set(0, -0.7, 0);
    bottomPlate.add(new THREE.LineSegments(new THREE.EdgesGeometry(bottomPlateGeo), wireMat));
    outerBoxGroup.add(bottomPlate);

    // Left Shield
    const leftShieldGeo = new THREE.BoxGeometry(0.12, 1.28, 2.48);
    const leftShield = new THREE.Mesh(leftShieldGeo, matteMetal);
    leftShield.position.set(-1.74, 0, 0);
    leftShield.add(new THREE.LineSegments(new THREE.EdgesGeometry(leftShieldGeo), wireMat));
    outerBoxGroup.add(leftShield);

    // Right Shield
    const rightShieldGeo = new THREE.BoxGeometry(0.12, 1.28, 2.48);
    const rightShield = new THREE.Mesh(rightShieldGeo, matteMetal);
    rightShield.position.set(1.74, 0, 0);
    rightShield.add(new THREE.LineSegments(new THREE.EdgesGeometry(rightShieldGeo), wireMat));
    outerBoxGroup.add(rightShield);

    // 4 Hex Corner Fasteners
    const pinGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.22, 6);
    [
      [-1.6, 0.72, -1.05],
      [1.6, 0.72, -1.05],
      [-1.6, 0.72, 1.05],
      [1.6, 0.72, 1.05],
    ].forEach(([x, y, z]) => {
      const pin = new THREE.Mesh(pinGeo, fastenerMat);
      pin.position.set(x, y, z);
      topPlate.add(pin);
    });

    // 2. RECURSIVE IMPOSSIBLE CORE (Nested geometric box inside)
    const recursiveGroup = new THREE.Group();
    rootGroup.add(recursiveGroup);

    const innerCoreGeo = new THREE.BoxGeometry(2.4, 0.8, 1.6);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0x090a0a,
      roughness: 0.4,
      metalness: 0.9,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    innerCoreMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(innerCoreGeo), activeWireMat));
    recursiveGroup.add(innerCoreMesh);

    // Tertiary micro-core (Infinite recursion motif)
    const microCoreGeo = new THREE.BoxGeometry(1.4, 0.45, 0.95);
    const microCoreMesh = new THREE.Mesh(microCoreGeo, satinMetal);
    microCoreMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(microCoreGeo), wireMat));
    recursiveGroup.add(microCoreMesh);

    // 3. EVIDENCE PLANES (4 Photometric & Sensor Artifact Layers)
    const evidencePlanes: THREE.Mesh[] = [];
    const evidencePlaneGeo = new THREE.BoxGeometry(2.2, 0.03, 1.4);
    const planeColors = [0x1e2023, 0x24272b, 0x1b1c1e, 0x2a2d31];

    planeColors.forEach((col, idx) => {
      const mat = new THREE.MeshStandardMaterial({
        color: col,
        roughness: 0.3,
        metalness: 0.8,
      });
      const plane = new THREE.Mesh(evidencePlaneGeo, mat);
      plane.position.set(0, (idx - 1.5) * 0.1, 0);
      plane.add(
        new THREE.LineSegments(
          new THREE.EdgesGeometry(evidencePlaneGeo),
          new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 })
        )
      );
      evidencePlanes.push(plane);
      rootGroup.add(plane);
    });

    // 4. TOP-DOWN INCIDENT SIMULATION RIG (Vehicle A + Vehicle B + Trajectory Vectors)
    const simulationGroup = new THREE.Group();
    simulationGroup.position.set(0, 0, 0);
    simulationGroup.scale.set(0.001, 0.001, 0.001); // Hidden initially
    rootGroup.add(simulationGroup);

    // Junction Roadway Lines (Hairline clean vector layout)
    const roadwayMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 });
    const roadPoints = [
      new THREE.Vector3(-3.5, 0, 0),
      new THREE.Vector3(3.5, 0, 0),
      new THREE.Vector3(0, 0, -3.5),
      new THREE.Vector3(0, 0, 3.5),
    ];
    const roadGeo = new THREE.BufferGeometry().setFromPoints(roadPoints);
    const roadLines = new THREE.LineSegments(roadGeo, roadwayMat);
    simulationGroup.add(roadLines);

    // Roundabout Circle Line
    const circleCurve = new THREE.EllipseCurve(0, 0, 1.8, 1.8, 0, 2 * Math.PI, false, 0);
    const circlePoints = circleCurve.getPoints(48).map((p) => new THREE.Vector3(p.x, 0, p.y));
    const circleGeo = new THREE.BufferGeometry().setFromPoints(circlePoints);
    const circleLine = new THREE.Line(circleGeo, new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.4, transparent: true }));
    simulationGroup.add(circleLine);

    // Vehicle A (Matteo Bianchi - Golf VIII) - Sleek geometric block
    const vehAGeo = new THREE.BoxGeometry(0.7, 0.25, 0.4);
    const vehAMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.9 });
    const vehicleA = new THREE.Mesh(vehAGeo, vehAMat);
    vehicleA.position.set(-1.4, 0.14, 0.4);
    vehicleA.rotation.y = 0.3;
    vehicleA.add(new THREE.LineSegments(new THREE.EdgesGeometry(vehAGeo), new THREE.LineBasicMaterial({ color: 0x090a0a })));
    simulationGroup.add(vehicleA);

    // Vehicle B (Counterparty Entering Junction)
    const vehBGeo = new THREE.BoxGeometry(0.7, 0.25, 0.4);
    const vehBMat = new THREE.MeshStandardMaterial({ color: 0x4a4e52, roughness: 0.4, metalness: 0.7 });
    const vehicleB = new THREE.Mesh(vehBGeo, vehBMat);
    vehicleB.position.set(0.3, 0.14, 1.6);
    vehicleB.rotation.y = -1.2;
    vehicleB.add(new THREE.LineSegments(new THREE.EdgesGeometry(vehBGeo), new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.8, transparent: true })));
    simulationGroup.add(vehicleB);

    // Collision Impact Marker (Expanding hairline ring at contact point)
    const impactRingCurve = new THREE.EllipseCurve(0, 0, 0.35, 0.35, 0, 2 * Math.PI, false, 0);
    const impactRingPoints = impactRingCurve.getPoints(32).map((p) => new THREE.Vector3(p.x, 0.15, p.y));
    const impactRingGeo = new THREE.BufferGeometry().setFromPoints(impactRingPoints);
    const impactRingMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
    const impactRing = new THREE.Line(impactRingGeo, impactRingMat);
    impactRing.position.set(-0.2, 0, 0.6);
    simulationGroup.add(impactRing);

    // 5. DECELERATION CURVE VECTOR (3D Telemetry Graph)
    const telemetryGroup = new THREE.Group();
    telemetryGroup.position.set(0, 0, 0);
    telemetryGroup.scale.set(0.001, 0.001, 0.001);
    rootGroup.add(telemetryGroup);

    const telemetryBars: THREE.Mesh[] = [];
    const barGeo = new THREE.BoxGeometry(0.12, 1, 0.08);
    const barMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, metalness: 0.8 });
    const heights = [0.15, 0.22, 0.35, 0.58, 0.82, 0.75, 0.42, 0.2, 0.08, 0.02];

    heights.forEach((h, i) => {
      const bar = new THREE.Mesh(barGeo, barMat);
      bar.position.set((i - 4.5) * 0.25, h / 2, 0);
      bar.scale.set(1, h, 1);
      telemetryGroup.add(bar);
      telemetryBars.push(bar);
    });

    // Initial subtle orientation
    rootGroup.rotation.x = 0.35;
    rootGroup.rotation.y = -0.45;
    rootGroup.position.y = 0;

    // --- RENDER & IDLE LOOP ---
    let reqId: number;
    const clock = new THREE.Clock();

    const renderScene = () => {
      const elapsed = clock.getElapsedTime();
      if (activeStageRef.current === 0) {
        rootGroup.rotation.y = -0.45 + Math.sin(elapsed * 0.4) * 0.03;
        rootGroup.rotation.x = 0.35 + Math.cos(elapsed * 0.3) * 0.02;
        rootGroup.position.y = Math.sin(elapsed * 0.6) * 0.04;
      }
      renderer.render(scene, camera);
      reqId = requestAnimationFrame(renderScene);
    };
    renderScene();

    // --- 10 STAGED GSAP SCROLLTRIGGER CHOREOGRAPHY ---
    const setStage = (idx: number) => {
      if (activeStageRef.current !== idx) {
        activeStageRef.current = idx;
        setActiveStage(idx);
        if (onStateChange) onStateChange(idx);
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;

        // 10 Evenly-Spaced Scroll Intervals (0.00 -> 1.00)
        const stageIndex = Math.min(9, Math.floor(p * 10));
        setStage(stageIndex);

        // STAGE 0: MONOLITH SEALED (p: 0.00 -> 0.10)
        if (p <= 0.1) {
          const t0 = p / 0.1;
          camera.position.set(0, 0, 8.0 - t0 * 0.4);
          camera.lookAt(0, 0, 0);

          rootGroup.rotation.x = 0.35 + t0 * 0.05;
          rootGroup.rotation.y = -0.45 + t0 * 0.1;
          rootGroup.position.set(0, 0, 0);

          topPlate.position.y = 0.7;
          bottomPlate.position.y = -0.7;
          leftShield.position.x = -1.74;
          rightShield.position.x = 1.74;

          recursiveGroup.scale.set(0.9, 0.9, 0.9);
          simulationGroup.scale.set(0.001, 0.001, 0.001);
          telemetryGroup.scale.set(0.001, 0.001, 0.001);

          evidencePlanes.forEach((plane, i) => {
            plane.position.set(0, (i - 1.5) * 0.08, 0);
            plane.rotation.y = 0;
            plane.scale.set(1, 1, 1);
          });
        }
        // STAGE 1: SIGNAL INGESTION (p: 0.10 -> 0.20)
        else if (p <= 0.2) {
          const t1 = (p - 0.1) / 0.1;
          camera.position.set(0, 0, 7.6 - t1 * 0.3);
          rootGroup.rotation.x = 0.4 - t1 * 0.08;
          rootGroup.rotation.y = -0.35 + t1 * 0.25;

          // Subtle pulse on outer shells
          topPlate.position.y = 0.7 + t1 * 0.15;
          bottomPlate.position.y = -0.7 - t1 * 0.15;
          leftShield.position.x = -1.74 - t1 * 0.12;
          rightShield.position.x = 1.74 + t1 * 0.12;

          recursiveGroup.scale.set(0.9 + t1 * 0.05, 0.9 + t1 * 0.05, 0.9 + t1 * 0.05);
          simulationGroup.scale.set(0.001, 0.001, 0.001);
        }
        // STAGE 2: MECHANICAL UNFOLD (p: 0.20 -> 0.30)
        else if (p <= 0.3) {
          const t2 = (p - 0.2) / 0.1;
          camera.position.set(0, 0, 7.3 - t2 * 0.3);
          rootGroup.rotation.x = 0.32 + t2 * 0.12;
          rootGroup.rotation.y = -0.1 + t2 * 0.35;

          // Full shell separation
          topPlate.position.y = 0.85 + t2 * 1.35;
          bottomPlate.position.y = -0.85 - t2 * 1.35;
          leftShield.position.x = -1.86 - t2 * 1.25;
          rightShield.position.x = 1.86 + t2 * 1.25;

          recursiveGroup.scale.set(0.95 + t2 * 0.1, 0.95 + t2 * 0.1, 0.95 + t2 * 0.1);
          simulationGroup.scale.set(0.001, 0.001, 0.001);
        }
        // STAGE 3: RECURSIVE DEPTH (p: 0.30 -> 0.40)
        else if (p <= 0.4) {
          const t3 = (p - 0.3) / 0.1;
          camera.position.set(0, 0, 7.0 - t3 * 0.5);
          rootGroup.rotation.x = 0.44 - t3 * 0.15;
          rootGroup.rotation.y = 0.25 + t3 * 0.35;

          topPlate.position.y = 2.2;
          bottomPlate.position.y = -2.2;
          leftShield.position.x = -3.11;
          rightShield.position.x = 3.11;

          // Inner recursive core expands & recedes
          recursiveGroup.scale.set(1.05 + t3 * 0.25, 1.05 + t3 * 0.25, 1.05 + t3 * 0.25);
          microCoreMesh.rotation.y = t3 * 0.6;
          microCoreMesh.position.z = -t3 * 0.4;

          evidencePlanes.forEach((plane, i) => {
            plane.position.set(0, (i - 1.5) * (0.08 + t3 * 0.2), 0);
          });
          simulationGroup.scale.set(0.001, 0.001, 0.001);
        }
        // STAGE 4: EVIDENCE DECOMPOSITION (p: 0.40 -> 0.50)
        else if (p <= 0.5) {
          const t4 = (p - 0.4) / 0.1;
          camera.position.set(0, 0, 6.5);
          rootGroup.rotation.x = 0.29 + t4 * 0.2;
          rootGroup.rotation.y = 0.6 - t4 * 0.4;

          // 4 Evidence Planes fan out in 3D fan matrix
          evidencePlanes.forEach((plane, i) => {
            const spreadY = (i - 1.5) * 0.65;
            const spreadX = (i - 1.5) * 0.5 * t4;
            const rotY = (i - 1.5) * 0.15 * t4;
            plane.position.set(spreadX, spreadY, (1 - t4) * 0.2);
            plane.rotation.y = rotY;
          });

          recursiveGroup.scale.set(1.3 - t4 * 0.4, 1.3 - t4 * 0.4, 1.3 - t4 * 0.4);
          simulationGroup.scale.set(0.001, 0.001, 0.001);
        }
        // STAGE 5: INCIDENT SIMULATION (Overhead Vector Collision) (p: 0.50 -> 0.60)
        else if (p <= 0.6) {
          const t5 = (p - 0.5) / 0.1;
          // Camera tilts directly into top-down perspective
          camera.position.set(0, 5.8 * t5 + (1 - t5) * 0, 6.5 * (1 - t5) + 3.2 * t5);
          camera.lookAt(0, 0, 0);

          rootGroup.rotation.x = 0.49 + t5 * 0.5; // Top-down orientation
          rootGroup.rotation.y = 0.2 * (1 - t5);

          // Retract outer plates into background framing
          topPlate.position.y = 2.2 + t5 * 1.5;
          bottomPlate.position.y = -2.2 - t5 * 1.5;

          // Evidence planes recess
          evidencePlanes.forEach((plane) => {
            plane.scale.set(1 - t5 * 0.7, 1 - t5 * 0.7, 1 - t5 * 0.7);
          });

          // Incident Simulation appears & animates
          simulationGroup.scale.set(t5, t5, t5);

          // Animate vehicles converging to contact point
          vehicleA.position.x = -2.2 + t5 * 1.6; // Moves toward impact point (-0.6)
          vehicleB.position.z = 2.6 - t5 * 1.5;  // Moves into junction from right
          impactRing.scale.set(0.6 + t5 * 0.8, 0.6 + t5 * 0.8, 1);
        }
        // STAGE 6: DECELERATION TELEMETRY (p: 0.60 -> 0.70)
        else if (p <= 0.7) {
          const t6 = (p - 0.6) / 0.1;
          camera.position.set(0, 4.0 - t6 * 1.2, 5.0 + t6 * 1.0);
          camera.lookAt(0, 0, 0);

          rootGroup.rotation.x = 0.99 - t6 * 0.5;
          rootGroup.rotation.y = -0.35 * t6;

          // Simulation remains static at impact position
          simulationGroup.scale.set(1 - t6 * 0.3, 1 - t6 * 0.3, 1 - t6 * 0.3);

          // Telemetry bars grow up
          telemetryGroup.scale.set(t6, t6, t6);
          telemetryGroup.position.set(0, -0.6, 0.8);
        }
        // STAGE 7: CAI BOX 12 STRUCTURE (p: 0.70 -> 0.80)
        else if (p <= 0.8) {
          const t7 = (p - 0.7) / 0.1;
          camera.position.set(0, 2.8 - t7 * 0.8, 6.0 + t7 * 0.5);
          rootGroup.rotation.x = 0.49 - t7 * 0.15;
          rootGroup.rotation.y = -0.35 + t7 * 0.4;

          simulationGroup.scale.set(Math.max(0.001, (1 - t7) * 0.7), Math.max(0.001, (1 - t7) * 0.7), Math.max(0.001, (1 - t7) * 0.7));
          telemetryGroup.scale.set(Math.max(0.001, (1 - t7)), Math.max(0.001, (1 - t7)), Math.max(0.001, (1 - t7)));

          // Evidence planes re-crystallize in order
          evidencePlanes.forEach((plane, i) => {
            plane.scale.set(0.3 + t7 * 0.7, 1, 0.3 + t7 * 0.7);
            plane.position.set(0, (i - 1.5) * 0.4, 0);
            plane.rotation.y = 0;
          });
        }
        // STAGE 8: HUMAN ADJUSTER DEMARCATION (p: 0.80 -> 0.90)
        else if (p <= 0.9) {
          const t8 = (p - 0.8) / 0.1;
          camera.position.set(0, 1.2 - t8 * 0.6, 6.8);
          rootGroup.rotation.x = 0.34 - t8 * 0.1;
          rootGroup.rotation.y = 0.05 - t8 * 0.3;

          // Evidence planes move closer together
          evidencePlanes.forEach((plane, i) => {
            plane.position.set(0, (i - 1.5) * (0.4 - t8 * 0.2), 0);
          });

          topPlate.position.y = 3.7 - t8 * 1.8;
          bottomPlate.position.y = -3.7 + t8 * 1.8;
          leftShield.position.x = -3.11 + t8 * 0.8;
          rightShield.position.x = 3.11 - t8 * 0.8;
        }
        // STAGE 9: REASSEMBLY & SEALED DOSSIER (p: 0.90 -> 1.00)
        else {
          const t9 = (p - 0.9) / 0.1;
          camera.position.set(0, 0.6 - t9 * 0.6, 6.8 + t9 * 0.7);
          rootGroup.rotation.x = 0.24 + t9 * 0.11;
          rootGroup.rotation.y = -0.25 - t9 * 0.2;

          // Monolithic re-sealing
          topPlate.position.y = 1.9 - t9 * 1.2;
          bottomPlate.position.y = -1.9 + t9 * 1.2;
          leftShield.position.x = -2.31 + t9 * 0.57;
          rightShield.position.x = 2.31 - t9 * 0.57;

          evidencePlanes.forEach((plane, i) => {
            plane.position.set(0, (i - 1.5) * 0.08, 0);
            plane.scale.set(1, 1, 1);
          });

          recursiveGroup.scale.set(1.0 - t9 * 0.1, 1.0 - t9 * 0.1, 1.0 - t9 * 0.1);
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
      topPlateGeo.dispose();
      bottomPlateGeo.dispose();
      leftShieldGeo.dispose();
      rightShieldGeo.dispose();
      pinGeo.dispose();
      innerCoreGeo.dispose();
      microCoreGeo.dispose();
      evidencePlaneGeo.dispose();
      roadGeo.dispose();
      circleGeo.dispose();
      vehAGeo.dispose();
      vehBGeo.dispose();
      impactRingGeo.dispose();
      barGeo.dispose();
      satinMetal.dispose();
      matteMetal.dispose();
      wireMat.dispose();
      activeWireMat.dispose();
      fastenerMat.dispose();
      innerCoreMat.dispose();
      roadwayMat.dispose();
      vehAMat.dispose();
      vehBMat.dispose();
      impactRingMat.dispose();
      barMat.dispose();
    };
  }, [onStateChange]);

  const currentStage = STAGES[activeStage] || STAGES[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#090A0A] text-white"
      style={{ height: reducedMotion ? "100vh" : "550vh" }}
    >
      {/* Sticky Full-Viewport View */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Three.js Canvas */}
        {hasWebGL && !reducedMotion ? (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block touch-none"
            aria-hidden="true"
          />
        ) : (
          /* High-Contrast SVG/CSS Static Fallback */
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-[340px] sm:w-[480px] h-[240px] sm:h-[300px] border border-white/20 bg-[#121315] shadow-2xl flex flex-col justify-between p-8">
              <div className="flex justify-between items-center text-xs font-mono tracking-widest text-white/50">
                <span>IMPACTA BLACK BOX V2</span>
                <span>RECURSIVE METAPHOR</span>
              </div>
              <div className="space-y-2">
                <div className="w-full h-px bg-white/40" />
                <div className="w-2/3 h-px bg-white/60" />
                <div className="w-1/3 h-px bg-white/30" />
              </div>
              <div className="text-xs font-mono tracking-wider text-white/80 uppercase">
                {language === "it" ? currentStage.nameIt : currentStage.nameEn}
              </div>
            </div>
          </div>
        )}

        {/* DOM Semantic Companion & High-Contrast Typography Layer */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 h-full flex flex-col justify-between py-24 sm:py-28 pointer-events-none">
          {/* Top Bar: Kicker + State Indicators */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono tracking-widest">
            <div className="space-y-1">
              <span className="block text-white/40 uppercase">IMPACTA BLACK BOX V2</span>
              <span className="text-white font-bold uppercase">
                {language === "it" ? currentStage.kickerIt : currentStage.kickerEn}
              </span>
            </div>

            {/* 10-Segment Scrub Progress Indicator */}
            <div className="flex items-center gap-1.5 py-1 px-3 border border-white/15 bg-[#090A0A]/80 backdrop-blur-sm self-start sm:self-auto">
              {STAGES.map((s) => (
                <div
                  key={s.index}
                  className={`h-1.5 transition-all duration-300 ${
                    s.index === activeStage
                      ? "w-6 bg-white"
                      : s.index < activeStage
                      ? "w-2.5 bg-white/40"
                      : "w-2.5 bg-white/10"
                  }`}
                  title={language === "it" ? s.nameIt : s.nameEn}
                />
              ))}
              <span className="ml-2 text-white/60 text-[10px]">
                {String(activeStage + 1).padStart(2, "0")}/10
              </span>
            </div>
          </div>

          {/* Dynamic Center/Bottom Content Display */}
          <div className="max-w-3xl space-y-6 pb-6 pointer-events-auto">
            {/* Dynamic Headline per Stage */}
            <div className="space-y-3">
              <span className="inline-block text-xs font-mono font-bold tracking-widest text-white/50 uppercase border-b border-white/20 pb-1">
                {language === "it" ? currentStage.nameIt : currentStage.nameEn}
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-[1.04]">
                {language === "it" ? currentStage.titleIt : currentStage.titleEn}
              </h1>
              <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl">
                {language === "it" ? currentStage.descIt : currentStage.descEn}
              </p>
            </div>

            {/* Primary Action Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href={reportLink}
                className="min-h-[52px] px-8 bg-white text-[#090A0A] text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-colors flex items-center justify-center gap-2 border border-white"
              >
                <span>{t("hero.reportAccident")}</span>
                <ArrowRightIcon size={16} />
              </Link>
              <Link
                href="/console/login"
                className="min-h-[52px] px-8 border border-white/30 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                <span>{t("nav.insurerAccess")}</span>
              </Link>
            </div>
          </div>

          {/* Bottom Metrology Strip */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono tracking-widest text-white/40">
            <div>
              RECURSIVE THREE.JS ENGINE • 10 STAGED KINEMATIC STATES
            </div>
            <div className="flex items-center gap-4">
              <span>CAN-BUS 10–20Hz</span>
              <span>•</span>
              <span>CAI BOX 12 ALIGNED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
