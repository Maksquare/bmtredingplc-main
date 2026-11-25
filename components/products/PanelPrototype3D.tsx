"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Layers, RotateCcw, Sparkles, Move3d } from "lucide-react";

export interface PanelGaugeSpec {
  gauge: string;
  mm: number;
  plies: number;
  use: string;
  special?: boolean;
}

interface PanelPrototype3DProps {
  variant: "safarian" | "plywood";
  gauges: PanelGaugeSpec[];
  selectedGauge?: string;
  onSelectGauge?: (gauge: string) => void;
  heightClass?: string;
}

/**
 * Generates procedural realistic wood veneer grain and multi-ply cross-laminated edge textures
 * on offscreen HTML canvases so the 3D board prototype renders crisp wood layers offline & fast.
 */
function createBoardTextures(variant: "safarian" | "plywood", plies: number) {
  // 1. Face Veneer Woodgrain Texture
  const faceCanvas = document.createElement("canvas");
  faceCanvas.width = 512;
  faceCanvas.height = 512;
  const fCtx = faceCanvas.getContext("2d");
  if (fCtx) {
    const baseHex = variant === "safarian" ? "#DFBA88" : "#C9955A";
    fCtx.fillStyle = baseHex;
    fCtx.fillRect(0, 0, 512, 512);

    // Fine directional timber grain fibers
    for (let y = 0; y < 512; y += 2) {
      const wave = Math.sin(y * 0.045) * 6 + Math.cos(y * 0.13) * 3;
      const alpha = 0.04 + ((y * 17) % 10) * 0.008;
      fCtx.fillStyle =
        variant === "safarian"
          ? `rgba(145, 95, 42, ${alpha})`
          : `rgba(110, 65, 24, ${alpha + 0.02})`;
      fCtx.fillRect(0, y + wave * 0.15, 512, 1.4);
    }

    // Subtle natural cathedral grain highlights
    for (let i = 0; i < 16; i++) {
      fCtx.strokeStyle =
        variant === "safarian" ? "rgba(165, 114, 58, 0.09)" : "rgba(95, 54, 18, 0.12)";
      fCtx.lineWidth = 1.5;
      fCtx.beginPath();
      const startY = i * 34;
      fCtx.moveTo(0, startY);
      fCtx.bezierCurveTo(160, startY + 12, 340, startY - 12, 512, startY);
      fCtx.stroke();
    }
  }

  const faceTex = new THREE.CanvasTexture(faceCanvas);
  faceTex.wrapS = THREE.RepeatWrapping;
  faceTex.wrapT = THREE.RepeatWrapping;
  faceTex.colorSpace = THREE.SRGBColorSpace;

  // 2. Side Cut-Edge Multi-Ply Texture
  const edgeCanvas = document.createElement("canvas");
  edgeCanvas.width = 256;
  edgeCanvas.height = 128;
  const eCtx = edgeCanvas.getContext("2d");
  if (eCtx) {
    const plyCount = Math.max(3, plies);
    const bandH = 128 / plyCount;
    for (let p = 0; p < plyCount; p++) {
      const isLight = p % 2 === 0;
      eCtx.fillStyle =
        variant === "safarian"
          ? isLight
            ? "#E6C99E"
            : "#B38049"
          : isLight
          ? "#DDA96F"
          : "#8A5423";
      eCtx.fillRect(0, p * bandH, 256, bandH);

      // Dark resin bond hairline between veneer plies
      if (p > 0) {
        eCtx.fillStyle = variant === "safarian" ? "#6F4821" : "#4E2A0F";
        eCtx.fillRect(0, p * bandH - 1, 256, 2);
      }

      // Subtle vertical cross-grain speckles along edge
      for (let x = 0; x < 256; x += 6) {
        eCtx.fillStyle = "rgba(60, 30, 10, 0.08)";
        eCtx.fillRect(x, p * bandH + 1, 2, Math.max(1, bandH - 2));
      }
    }
  }

  const edgeTex = new THREE.CanvasTexture(edgeCanvas);
  edgeTex.colorSpace = THREE.SRGBColorSpace;

  return { faceTex, edgeTex };
}

export function PanelPrototype3D({
  variant,
  gauges,
  selectedGauge,
  onSelectGauge,
  heightClass = "h-[240px] sm:h-[270px]",
}: PanelPrototype3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [internalGauge, setInternalGauge] = useState(
    selectedGauge || gauges[gauges.length - 1]?.gauge || "18mm"
  );
  const [viewMode, setViewMode] = useState<"single" | "stack">("stack");
  const [webglError, setWebglError] = useState(false);

  const activeGaugeStr = selectedGauge ?? internalGauge;
  const activeSpec = gauges.find((g) => g.gauge === activeGaugeStr) || gauges[gauges.length - 1];

  const stateRef = useRef({
    activeGauge: activeGaugeStr,
    viewMode,
    resetRequested: false,
  });

  useEffect(() => {
    stateRef.current.activeGauge = activeGaugeStr;
    stateRef.current.viewMode = viewMode;
  }, [activeGaugeStr, viewMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      queueMicrotask(() => setWebglError(true));
      return;
    }

    const width = container.clientWidth || 420;
    const height = container.clientHeight || 260;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(3.2, 2.25, 3.6);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enableZoom = false; // Prevent wheel trap when scrolling page
    controls.enablePan = false;
    controls.minPolarAngle = 0.35;
    controls.maxPolarAngle = Math.PI / 2 - 0.06;

    // Warm Architectural Studio Lighting
    const ambient = new THREE.AmbientLight(0xfff6ea, 1.35);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff2dc, 1.85);
    keyLight.position.set(4.5, 6.5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xeaa84f, 0.75);
    rimLight.position.set(-4, 2.5, -3.5);
    scene.add(rimLight);

    // Subtle studio floor shadow receiver
    const shadowPlaneGeo = new THREE.PlaneGeometry(12, 12);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.14 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.35;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Root Group holding physical sheet boards
    const boardGroup = new THREE.Group();
    scene.add(boardGroup);

    const disposables: { dispose: () => void }[] = [shadowPlaneGeo, shadowPlaneMat];

    // Build stepped multi-board meshes (real thickness proportions: mm * 0.022 world units)
    const meshes: {
      gauge: string;
      mesh: THREE.Mesh;
      baseThickness: number;
      targetY: number;
      stepOffsetX: number;
      stepOffsetZ: number;
      edgeMat: THREE.MeshStandardMaterial;
    }[] = [];

    // Order thickest on bottom -> thinnest on top for realistic showroom stack
    const sorted = [...gauges].sort((a, b) => b.mm - a.mm);
    let cumulativeY = -0.25;

    sorted.forEach((g, idx) => {
      const worldThick = Math.max(0.045, g.mm * 0.024);
      const { faceTex, edgeTex } = createBoardTextures(variant, g.plies);
      disposables.push(faceTex, edgeTex);

      const faceMat = new THREE.MeshStandardMaterial({
        map: faceTex,
        roughness: 0.62,
        metalness: 0.04,
      });
      const edgeMat = new THREE.MeshStandardMaterial({
        map: edgeTex,
        roughness: 0.72,
        metalness: 0.03,
      });
      disposables.push(faceMat, edgeMat);

      // Material array: [+x, -x, +y (top), -y (bottom), +z, -z]
      const geo = new THREE.BoxGeometry(2.55, worldThick, 1.75);
      disposables.push(geo);

      const mesh = new THREE.Mesh(geo, [
        edgeMat,
        edgeMat,
        faceMat,
        faceMat,
        edgeMat,
        edgeMat,
      ]);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const stepOffsetX = idx * 0.24 - (sorted.length - 1) * 0.1;
      const stepOffsetZ = -idx * 0.14 + (sorted.length - 1) * 0.06;
      const centerY = cumulativeY + worldThick / 2;
      cumulativeY += worldThick + 0.022;

      mesh.position.set(stepOffsetX, centerY, stepOffsetZ);
      boardGroup.add(mesh);

      meshes.push({
        gauge: g.gauge,
        mesh,
        baseThickness: worldThick,
        targetY: centerY,
        stepOffsetX,
        stepOffsetZ,
        edgeMat,
      });
    });

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const { activeGauge, viewMode: mode, resetRequested } = stateRef.current;

      if (resetRequested) {
        camera.position.lerp(new THREE.Vector3(3.2, 2.25, 3.6), 0.12);
        if (camera.position.distanceTo(new THREE.Vector3(3.2, 2.25, 3.6)) < 0.05) {
          stateRef.current.resetRequested = false;
        }
      }

      if (!reducedMotion) {
        boardGroup.rotation.y += 0.0022;
      }

      meshes.forEach((item) => {
        const isSelected = item.gauge === activeGauge;

        if (mode === "single") {
          const targetScale = isSelected ? 1 : 0.001;
          item.mesh.scale.x = THREE.MathUtils.lerp(item.mesh.scale.x, targetScale, 0.14);
          item.mesh.scale.y = THREE.MathUtils.lerp(item.mesh.scale.y, targetScale, 0.14);
          item.mesh.scale.z = THREE.MathUtils.lerp(item.mesh.scale.z, targetScale, 0.14);
          item.mesh.position.x = THREE.MathUtils.lerp(item.mesh.position.x, 0, 0.14);
          item.mesh.position.y = THREE.MathUtils.lerp(item.mesh.position.y, 0.05, 0.14);
          item.mesh.position.z = THREE.MathUtils.lerp(item.mesh.position.z, 0, 0.14);
          item.mesh.visible = item.mesh.scale.y > 0.02;
        } else {
          item.mesh.visible = true;
          item.mesh.scale.x = THREE.MathUtils.lerp(item.mesh.scale.x, isSelected ? 1.03 : 1, 0.12);
          item.mesh.scale.y = THREE.MathUtils.lerp(item.mesh.scale.y, 1, 0.12);
          item.mesh.scale.z = THREE.MathUtils.lerp(item.mesh.scale.z, isSelected ? 1.03 : 1, 0.12);

          const pullOut = isSelected ? 0.22 : 0;
          item.mesh.position.x = THREE.MathUtils.lerp(
            item.mesh.position.x,
            item.stepOffsetX + pullOut * 0.5,
            0.12
          );
          item.mesh.position.y = THREE.MathUtils.lerp(
            item.mesh.position.y,
            item.targetY + (isSelected ? 0.03 : 0),
            0.12
          );
          item.mesh.position.z = THREE.MathUtils.lerp(
            item.mesh.position.z,
            item.stepOffsetZ + pullOut,
            0.12
          );
        }

        // Subtle warm amber rim highlight on the active board edge
        item.edgeMat.emissive.setHex(isSelected ? 0xc8832a : 0x000000);
        item.edgeMat.emissiveIntensity = isSelected ? 0.22 : 0;
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      controls.dispose();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, [variant, gauges]);

  const handleSelect = (g: string) => {
    setInternalGauge(g);
    onSelectGauge?.(g);
  };

  return (
    <div className="space-y-3">
      {/* 3D Interactive Canvas Container */}
      <div
        className={`relative w-full ${heightClass} rounded-2xl bg-gradient-to-b from-[#FCFBF8] via-[#FAF3E8] to-[#EFE5D4] border border-[#E5DEC9] overflow-hidden select-none`}
      >
        {/* Top Interactive Mode Controls */}
        <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/90 backdrop-blur-md border border-[#E5DEC9] shadow-2xs pointer-events-auto">
            <button
              type="button"
              onClick={() => setViewMode("stack")}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors cursor-pointer ${
                viewMode === "stack"
                  ? "bg-[#0B241B] text-white"
                  : "text-[#3D4A43] hover:text-[#141715]"
              }`}
            >
              Compare Stack
            </button>
            <button
              type="button"
              onClick={() => setViewMode("single")}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors cursor-pointer ${
                viewMode === "single"
                  ? "bg-[#0B241B] text-white"
                  : "text-[#3D4A43] hover:text-[#141715]"
              }`}
            >
              Single Specimen
            </button>
          </div>

          <div className="inline-flex items-center gap-1.5 pointer-events-auto">
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-xs border border-[#E5DEC9] text-[10px] font-bold text-[#3D4A43]">
              <Move3d className="w-3 h-3 text-[#C8832A]" />
              Drag to Rotate
            </span>
            <button
              type="button"
              onClick={() => {
                stateRef.current.resetRequested = true;
              }}
              className="p-1.5 rounded-full bg-white/90 hover:bg-white border border-[#E5DEC9] text-[#141715] shadow-2xs transition-transform active:scale-90 cursor-pointer"
              title="Reset 3D angle"
              aria-label="Reset 3D board angle"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* WebGL Mount or Graceful Fallback */}
        {webglError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2">
            <Layers className="w-8 h-8 text-[#C8832A]" />
            <div className="font-display font-bold text-sm text-[#141715]">
              {activeSpec.gauge} {variant === "safarian" ? "Safarian" : "Plywood"} ({activeSpec.plies} plies)
            </div>
            <p className="text-xs text-[#5A6961] max-w-xs">{activeSpec.use}</p>
          </div>
        ) : (
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
        )}

        {/* Bottom Live Spec Readout Bar */}
        <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white/92 backdrop-blur-md border border-[#E5DEC9] shadow-xs text-[11px]">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`px-2 py-0.5 rounded-md font-extrabold tabular-nums shrink-0 ${
                activeSpec.special
                  ? "bg-[#C8832A] text-white"
                  : "bg-[#0B241B] text-white"
              }`}
            >
              {activeSpec.gauge}
            </span>
            <span className="font-semibold text-[#141715] truncate">{activeSpec.use}</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 font-bold text-[#5A6961] shrink-0 tabular-nums">
            {activeSpec.special && <Sparkles className="w-3 h-3 text-[#C8832A]" />}
            {activeSpec.plies}-Ply Core
          </span>
        </div>
      </div>

      {/* Thickness Selector Buttons */}
      <div className="flex flex-wrap gap-2">
        {gauges.map((g) => {
          const isSelected = g.gauge === activeSpec.gauge;
          return (
            <button
              key={g.gauge}
              type="button"
              onClick={() => handleSelect(g.gauge)}
              className={`flex-1 min-w-[68px] py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer tabular-nums ${
                isSelected
                  ? g.special
                    ? "bg-[#C8832A] text-white border-[#C8832A] shadow-sm font-extrabold"
                    : "bg-[#0B241B] text-white border-[#0B241B] shadow-sm font-extrabold"
                  : g.special
                  ? "bg-[#FBF4EB] text-[#9A5D12] border-[#C8832A]/40 hover:border-[#C8832A] font-bold"
                  : "bg-[#FCFBF8] text-[#141715] border-[#E5DEC9] hover:border-[#0B241B]/40 font-bold"
              }`}
            >
              <span className="text-xs block">{g.gauge}</span>
              <span
                className={`text-[9px] font-semibold block ${
                  isSelected ? "text-white/85" : "text-[#5A6961]"
                }`}
              >
                {g.special ? "Special ★" : `${g.plies}-Ply`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}