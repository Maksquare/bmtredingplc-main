"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ShieldCheck,
  CheckCircle2,
  Eye,
} from "lucide-react";
import { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";

interface ProductGalleryRailProps {
  product: Product;
}

export function ProductGalleryRail({ product }: ProductGalleryRailProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const thumbnailRailRef = useRef<HTMLDivElement>(null);

  // Normalize image list: ensure at least one fallback image exists
  const images =
    product.images && product.images.length > 0
      ? product.images
      : ["https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1000&auto=format&fit=crop"];

  const currentImage = images[activeIndex] || images[0];

  // Auto-scroll the thumbnail rail to keep the active thumbnail visible
  useEffect(() => {
    if (!thumbnailRailRef.current) return;
    const activeEl = thumbnailRailRef.current.children[activeIndex] as HTMLElement | undefined;
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      } else if (e.key === "Escape" && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, isLightboxOpen]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="space-y-3.5">
      {/* Primary High-Resolution Display Stage */}
      <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl bg-neutral-900 border-2 border-cream-border overflow-hidden shadow-xl group select-none">
        <Image
          key={currentImage}
          src={currentImage}
          alt={`${product.name} - Angle ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 480px"
          className="object-cover object-center transition-all duration-500 ease-out group-hover:scale-105"
        />

        {/* Ambient Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2 z-10">
          <Badge variant="amber" size="sm" className="font-bold shadow-md text-[10px] sm:text-xs">
            Calibrated Core
          </Badge>
          <Badge variant="forest" size="sm" className="bg-forest/90 text-white border-white/20 text-[10px] sm:text-xs">
            {product.specs.grade}
          </Badge>
        </div>

        {/* Fullscreen Zoom Trigger */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white/90 hover:text-white hover:bg-black/80 transition-all z-10 border border-white/20 shadow-md active:scale-95"
          title="Inspect High-Res View"
          aria-label="Inspect Fullscreen View"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Previous / Next Stage Arrows (visible on hover or when multiple images exist) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/65 backdrop-blur-md text-white border border-white/25 flex items-center justify-center opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95 z-10 shadow-lg"
              aria-label="Previous angle"
            >
              <ChevronLeft className="w-5 h-5 -translate-x-0.5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/65 backdrop-blur-md text-white border border-white/25 flex items-center justify-center opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95 z-10 shadow-lg"
              aria-label="Next angle"
            >
              <ChevronRight className="w-5 h-5 translate-x-0.5" />
            </button>
          </>
        )}

        {/* Bottom Stage Information Bar */}
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 flex items-center justify-between gap-2">
          <span className="text-[11px] sm:text-xs font-bold text-amber-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 truncate max-w-[200px]">
            {product.specs.surface_finish.split("(")[0]}
          </span>

          {images.length > 1 && (
            <span className="text-[11px] font-bold text-white bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
              Angle {activeIndex + 1} of {images.length}
            </span>
          )}
        </div>
      </div>

      {/* Sub-Gallery Thumbnail Rail */}
      {images.length > 1 && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-0.5 text-xs text-charcoal-muted">
            <span className="font-semibold text-[11px] uppercase tracking-wider text-charcoal-subtle">
              Gallery Angles & Cross-Sections
            </span>
            <span className="text-[11px]">Click angle to inspect</span>
          </div>

          <div
            ref={thumbnailRailRef}
            className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none pt-0.5"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {images.map((img, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`relative shrink-0 w-24 sm:w-28 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all duration-200 group focus:outline-none ${
                    isSelected
                      ? "border-[#C8832A] ring-2 ring-[#C8832A]/30 scale-[1.02] shadow-sm"
                      : "border-cream-border hover:border-amber-oak/60 opacity-75 hover:opacity-100"
                  }`}
                  aria-label={`View Angle ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} angle thumbnail ${idx + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className={`absolute inset-0 transition-colors ${
                      isSelected ? "bg-transparent" : "bg-black/25 group-hover:bg-transparent"
                    }`}
                  />
                  <span
                    className={`absolute bottom-1 left-1 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded shadow-xs ${
                      isSelected
                        ? "bg-[#C8832A] text-white"
                        : "bg-black/70 text-white/90"
                    }`}
                  >
                    Angle {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Lightbox Modal Dialog */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Controls */}
            <div className="w-full flex items-center justify-between text-white pb-3 px-1">
              <div className="truncate pr-4">
                <h4 className="font-display font-bold text-base truncate">{product.name}</h4>
                <p className="text-xs text-white/70">
                  Angle {activeIndex + 1} of {images.length} • Grade: {product.specs.grade}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close fullscreen view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image View */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <Image
                src={currentImage}
                alt={`${product.name} full view`}
                fill
                priority
                sizes="1200px"
                className="object-contain"
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 text-white border border-white/20 flex items-center justify-center hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6 -translate-x-0.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 text-white border border-white/20 flex items-center justify-center hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6 translate-x-0.5" />
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Thumbnail Bar */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 pt-4 overflow-x-auto max-w-full">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === activeIndex
                        ? "border-[#C8832A] ring-2 ring-[#C8832A]/40"
                        : "border-white/20 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

