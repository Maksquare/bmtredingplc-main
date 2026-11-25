"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ShieldCheck,
  CheckCircle2,
  Camera,
  Box,
  Sparkles,
} from "lucide-react";
import { Product } from "@/types";
import type { PanelGaugeSpec } from "@/components/products/PanelPrototype3D";

const DynamicPanelPrototype3D = dynamic(
  () => import("@/components/products/PanelPrototype3D").then((m) => m.PanelPrototype3D),
  {
    ssr: false,
    loading: () => (
      <div className="h-[320px] sm:h-[380px] rounded-2xl bg-[#FAF5EB] border border-[#E5DEC9] animate-pulse flex items-center justify-center text-xs font-semibold text-[#5A6961]">
        Loading interactive 3D board prototype...
      </div>
    ),
  }
);

const DynamicProductLightbox = dynamic(
  () => import("@/components/products/ProductLightbox").then((m) => m.ProductLightbox),
  { ssr: false }
);

interface ProductGalleryRailProps {
  product: Product;
}

const DEFAULT_SAFARIAN_GAUGES: PanelGaugeSpec[] = [
  { gauge: "03mm", mm: 3, plies: 3, use: "Cabinet backs & drawer bottoms" },
  { gauge: "06mm", mm: 6, plies: 5, use: "Recessed panels & interior linings" },
  { gauge: "08mm", mm: 8, plies: 5, use: "Doors, shelving & partitions" },
  { gauge: "12mm", mm: 12, plies: 7, use: "Heavy boxes & furniture frames" },
];

const DEFAULT_PLYWOOD_GAUGES: PanelGaugeSpec[] = [
  { gauge: "16mm", mm: 16, plies: 9, use: "Wardrobes, worktops & structural joinery" },
  {
    gauge: "18mm",
    mm: 18,
    plies: 11,
    use: "Flagship Special Product heavy architecture board",
    special: true,
  },
];

export function ProductGalleryRail({ product }: ProductGalleryRailProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerMode, setViewerMode] = useState<"photo" | "3d">("photo");
  const [hasOpenedLightbox, setHasOpenedLightbox] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const [lensPos, setLensPos] = useState<{ x: number; y: number } | null>(null);
  const thumbnailRailRef = useRef<HTMLDivElement>(null);

  const isPlywood =
    product.slug.toLowerCase().includes("plywood") ||
    product.name.toLowerCase().includes("plywood");

  const fallbackImage = isPlywood
    ? "/images/products/plywood-18mm-special.jpg"
    : "/images/products/safarian-main.jpg";

  const images = useMemo(() => {
    const raw =
      product.images && product.images.length > 0 ? product.images : [fallbackImage];
    return raw.map((src, idx) => (imgErrors[idx] ? fallbackImage : src));
  }, [product.images, imgErrors, fallbackImage]);

  const currentImage = images[activeIndex] || fallbackImage;

  const slides = useMemo(
    () =>
      images.map((src, idx) => ({
        src,
        alt: `${product.name} — Studio Inspection View ${idx + 1}`,
        title: `${product.name} (View ${idx + 1} of ${images.length})`,
      })),
    [images, product.name]
  );

  const gauges3D: PanelGaugeSpec[] = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return isPlywood ? DEFAULT_PLYWOOD_GAUGES : DEFAULT_SAFARIAN_GAUGES;
    }

    const fallbackList = isPlywood ? DEFAULT_PLYWOOD_GAUGES : DEFAULT_SAFARIAN_GAUGES;

    return product.variants.map((v) => {
      const mmNum = parseInt(v.thickness.replace(/\D/g, ""), 10) || (isPlywood ? 18 : 8);
      const plies = Math.max(3, Math.round(mmNum * 0.55) | 1);
      const matched = fallbackList.find((d) => d.gauge === v.thickness);
      return {
        gauge: v.thickness,
        mm: mmNum,
        plies: matched?.plies ?? plies,
        use: matched?.use ?? `${v.size} calibrated sheet`,
        special: Boolean(v.is_special),
      };
    });
  }, [product.variants, isPlywood]);

  const default3DGauge = useMemo(() => {
    const special = gauges3D.find((g) => g.special);
    return special ? special.gauge : gauges3D[gauges3D.length - 1]?.gauge || "12mm";
  }, [gauges3D]);

  const [selectedGauge3D, setSelectedGauge3D] = useState<string | null>(null);
  const activeGauge3D =
    selectedGauge3D && gauges3D.some((g) => g.gauge === selectedGauge3D)
      ? selectedGauge3D
      : default3DGauge;

  useEffect(() => {
    if (!thumbnailRailRef.current || viewerMode !== "photo") return;
    const activeEl = thumbnailRailRef.current.children[activeIndex] as
      | HTMLElement
      | undefined;
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeIndex, viewerMode]);

  const openLightbox = () => {
    setHasOpenedLightbox(true);
    setIsLightboxOpen(true);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleMouseMoveStage = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLensPos({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Studio Mode Switcher Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className="inline-flex items-center p-1 rounded-full bg-[#F4EFE6] border border-[#E5DEC9] shadow-2xs"
          role="tablist"
          aria-label="Product inspection view mode"
        >
          <button
            type="button"
            role="tab"
            aria-selected={viewerMode === "photo"}
            onClick={() => setViewerMode("photo")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              viewerMode === "photo"
                ? "bg-[#0B241B] text-white shadow-xs"
                : "text-[#3D4A43] hover:text-[#141715]"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Studio Photos ({images.length})</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={viewerMode === "3d"}
            onClick={() => setViewerMode("3d")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              viewerMode === "3d"
                ? "bg-[#C8832A] text-white shadow-xs"
                : "text-[#3D4A43] hover:text-[#141715]"
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Interactive 3D Board</span>
          </button>
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B241B]">
          <ShieldCheck className="w-4 h-4 text-[#C8832A]" />
          <span>100% Quality Inspected</span>
        </span>
      </div>

      {/* Main Inspection Stage */}
      {viewerMode === "3d" ? (
        <div className="rounded-3xl bg-white p-4 sm:p-5 border border-[#E5DEC9] shadow-sm space-y-3">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="font-bold text-[#141715] inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C8832A]" />
              Proportional {product.name} Cross-Section Prototype
            </span>
            <button
              type="button"
              onClick={() => setViewerMode("photo")}
              className="text-[#9A5D12] hover:text-[#0B241B] font-bold underline underline-offset-4 cursor-pointer"
            >
              Return to Studio Photos
            </button>
          </div>
          <DynamicPanelPrototype3D
            variant={isPlywood ? "plywood" : "safarian"}
            gauges={gauges3D}
            selectedGauge={activeGauge3D}
            onSelectGauge={setSelectedGauge3D}
            heightClass="h-[320px] sm:h-[380px]"
          />
        </div>
      ) : (
        <div
          className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-[#141715] border border-[#E5DEC9] group shadow-md select-none"
          onMouseMove={handleMouseMoveStage}
          onMouseLeave={() => setLensPos(null)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeIndex}-${currentImage}`}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0.25, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0.25 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={openLightbox}
              className="relative w-full h-full cursor-zoom-in"
              role="button"
              tabIndex={0}
              aria-label={`Open zoomable fullscreen studio viewer for ${product.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox();
                }
              }}
            >
              <Image
                src={currentImage}
                alt={`${product.name} — Studio View ${activeIndex + 1}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 55vw"
                onError={() =>
                  setImgErrors((prev) => ({ ...prev, [activeIndex]: true }))
                }
                style={
                  lensPos && !shouldReduceMotion
                    ? {
                        transformOrigin: `${lensPos.x}% ${lensPos.y}%`,
                        transform: "scale(1.16)",
                      }
                    : undefined
                }
                className="object-cover transition-transform duration-300 ease-out"
              />
            </motion.div>
          </AnimatePresence>

          {/* Top Left Stock Pill */}
          <div className="pointer-events-none absolute top-4 left-4 z-10 flex items-center gap-2">
            {product.stock_status === "out_of_stock" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/90 backdrop-blur-md text-red-100 border border-red-400/30 text-xs font-bold shadow-sm">
                Out of Stock
              </span>
            ) : product.stock_status === "low_stock" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/90 backdrop-blur-md text-amber-100 border border-amber-400/30 text-xs font-bold shadow-sm">
                Only {product.stock_quantity || 12} sheets left
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B241B]/90 backdrop-blur-md text-emerald-200 border border-emerald-400/30 text-xs font-bold shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5" />
                In Stock
              </span>
            )}
          </div>

          {/* Top Right Fullscreen Zoom Studio Button */}
          <button
            type="button"
            onClick={openLightbox}
            className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#141715]/75 hover:bg-[#0B241B] text-white backdrop-blur-md border border-white/20 text-xs font-bold transition-all shadow-lg cursor-pointer"
            aria-label="Open high-resolution zoom lightbox"
          >
            <ZoomIn className="w-3.5 h-3.5 text-[#EAA84F]" />
            <span className="hidden sm:inline">Inspect 3.5× Zoom</span>
            <Maximize2 className="w-3.5 h-3.5 sm:hidden" />
          </button>

          {/* Bottom Studio Hint Gradient */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <div className="pointer-events-none absolute bottom-3.5 left-4 right-4 z-10 flex items-center justify-between text-xs text-white/90 font-medium">
            <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 tabular-nums">
              Photo {activeIndex + 1} / {images.length}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/15">
              Click image for high-resolution studio viewer
            </span>
          </div>

          {/* Prev / Next Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#141715] shadow-md transition-all cursor-pointer active:scale-90 opacity-85 group-hover:opacity-100"
                aria-label="Previous studio photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#141715] shadow-md transition-all cursor-pointer active:scale-90 opacity-85 group-hover:opacity-100"
                aria-label="Next studio photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      )}

      {/* Horizontal Thumbnail Strip + Quick 3D Prototype Tile */}
      <div
        ref={thumbnailRailRef}
        className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide"
      >
        {images.map((img, idx) => {
          const isActive = viewerMode === "photo" && idx === activeIndex;
          return (
            <button
              key={`${img}-${idx}`}
              type="button"
              onClick={() => {
                setViewerMode("photo");
                setActiveIndex(idx);
              }}
              aria-label={`Select studio angle ${idx + 1}`}
              className={`relative shrink-0 w-24 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                isActive
                  ? "border-[#C8832A] ring-2 ring-[#C8832A]/25 shadow-sm"
                  : "border-[#E5DEC9] opacity-75 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${product.name} thumbnail ${idx + 1}`}
                fill
                sizes="96px"
                onError={() => setImgErrors((prev) => ({ ...prev, [idx]: true }))}
                className="object-cover"
              />
            </button>
          );
        })}

        {/* Dedicated Interactive 3D Specimen Thumbnail Tile */}
        <button
          type="button"
          onClick={() => setViewerMode("3d")}
          aria-label={`Inspect ${product.name} interactive 3D prototype`}
          className={`shrink-0 w-28 h-20 rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
            viewerMode === "3d"
              ? "border-[#C8832A] bg-[#0B241B] text-white ring-2 ring-[#C8832A]/30 shadow-sm"
              : "border-[#E5DEC9] bg-[#FAF5EB] text-[#0B241B] hover:border-[#C8832A]"
          }`}
        >
          <Box
            className={`w-5 h-5 ${
              viewerMode === "3d" ? "text-[#EAA84F]" : "text-[#C8832A]"
            }`}
          />
          <span className="text-[11px] font-extrabold tracking-tight">3D Specimen</span>
        </button>
      </div>

      {/* Lazily loaded Lightbox chunk — zero bundle impact until clicked */}
      {hasOpenedLightbox && (
        <DynamicProductLightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          index={activeIndex}
          onIndexChange={setActiveIndex}
          slides={slides}
        />
      )}
    </div>
  );
}
