"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  FileText,
  Phone,
  Minus,
  Plus,
  Factory,
} from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";

interface ProductVariantSelectorProps {
  product: Product;
  initialThickness?: string;
}

export function ProductVariantSelector({
  product,
  initialThickness,
}: ProductVariantSelectorProps) {
  const variants = useMemo(() => product.variants || [], [product.variants]);

  const defaultVariant = useMemo(() => {
    if (initialThickness) {
      const found = variants.find(
        (v) => v.thickness.toLowerCase() === initialThickness.toLowerCase()
      );
      if (found) return found;
    }
    const special = variants.find((v) => v.is_special);
    return special || variants[0] || null;
  }, [variants, initialThickness]);

  const [userThickness, setUserThickness] = useState<string | null>(null);
  const selectedThickness =
    (userThickness && variants.some((v) => v.thickness === userThickness)
      ? userThickness
      : null) ||
    defaultVariant?.thickness ||
    product.specs.thickness.split(",")[0].trim();

  const setSelectedThickness = (val: string) => {
    setUserThickness(val);
  };

  const [quantity, setQuantity] = useState<number>(100);

  const matchedVariant = useMemo(
    () => variants.find((v) => v.thickness === selectedThickness) || null,
    [variants, selectedThickness]
  );

  const stockStatus = matchedVariant?.stock_status || product.stock_status || "in_stock";
  const stockQty = matchedVariant?.stock_quantity ?? product.stock_quantity ?? 120;
  const isSpecial = Boolean(matchedVariant?.is_special);

  const quoteHref = `/quote?product=${encodeURIComponent(
    product.name
  )}&thickness=${encodeURIComponent(selectedThickness)}&quantity=${quantity}`;

  return (
    <div className="p-6 sm:p-7 rounded-3xl bg-white border border-cream-border shadow-sm space-y-6">
      {/* 1. Thickness Selection with Framer Motion Indicator */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-oak" />
            <span>Select Thickness Gauge</span>
          </label>
          {isSpecial && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-oak/15 border border-amber-oak/40 text-amber-900 text-[11px] font-extrabold">
              <Sparkles className="w-3 h-3 text-amber-oak" />
              Flagship Special Product
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {variants.map((variant) => {
            const isSelected = variant.thickness === selectedThickness;
            return (
              <button
                key={variant.id}
                type="button"
                onClick={() => setSelectedThickness(variant.thickness)}
                className={`relative px-3 py-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-oak ${
                  isSelected
                    ? variant.is_special
                      ? "border-amber-oak bg-amber-oak/10 shadow-sm"
                      : "border-forest bg-forest/5 shadow-sm"
                    : "border-cream-border bg-cream/40 hover:border-charcoal-subtle/40 hover:bg-white"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId={`active-thickness-${product.id}`}
                    className={`absolute inset-0 rounded-2xl border-2 pointer-events-none ${
                      variant.is_special ? "border-amber-oak" : "border-forest"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <div className="relative z-10 flex items-center justify-between gap-1">
                  <span className="text-base font-display font-extrabold text-charcoal">
                    {variant.thickness}
                  </span>
                  {variant.is_special && (
                    <Sparkles className="w-3.5 h-3.5 text-amber-oak shrink-0" />
                  )}
                </div>
                <div className="relative z-10 text-[10px] font-semibold text-charcoal-subtle mt-0.5">
                  {variant.is_special ? "Special Product" : "Standard Sheet"}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Sheet Size & Stock Availability */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl bg-cream/60 border border-cream-border space-y-1">
          <div className="font-bold uppercase tracking-wider text-charcoal-subtle text-[10px]">
            Sheet Dimensions
          </div>
          <div className="font-bold text-charcoal text-sm">
            {matchedVariant?.size || product.specs.standard_size}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-cream/60 border border-cream-border space-y-1">
          <div className="font-bold uppercase tracking-wider text-charcoal-subtle text-[10px]">
            Werabe Factory Supply Status
          </div>
          {stockStatus === "out_of_stock" ? (
            <div className="font-bold text-red-700 flex items-center gap-1.5 text-sm">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Schedule Allocation Needed</span>
            </div>
          ) : stockStatus === "low_stock" ? (
            <div className="font-bold text-amber-800 flex items-center gap-1.5 text-sm">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Limited Stock ({stockQty} sheets)</span>
            </div>
          ) : (
            <div className="font-bold text-forest flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>In Stock ({stockQty}+ sheets ready)</span>
            </div>
          )}
        </div>
      </div>

      {/* 3. Required Sheet Quantity Stepper */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor={`qty-${product.id}`}
            className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle"
          >
            Estimated Sheet Quantity
          </label>
          <div className="flex items-center gap-1.5">
            {[50, 100, 250, 500].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setQuantity(preset)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-colors ${
                  quantity === preset
                    ? "bg-forest text-white"
                    : "bg-cream-dark text-charcoal-subtle hover:text-charcoal"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center border border-cream-border rounded-xl bg-cream/50 p-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(10, q - 10))}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-charcoal hover:bg-white transition-colors"
              aria-label="Decrease sheet quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              id={`qty-${product.id}`}
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setQuantity(Number.isNaN(val) ? 1 : Math.max(1, val));
              }}
              className="w-20 text-center font-display font-extrabold text-base text-charcoal bg-transparent focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 10)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-charcoal hover:bg-white transition-colors"
              aria-label="Increase sheet quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="text-xs text-charcoal-subtle">
            <span className="font-bold text-charcoal">{product.name}</span> •{" "}
            <span className="font-bold text-amber-oak">{selectedThickness}</span>
            <span className="block">sheets requested</span>
          </div>
        </div>
      </div>

      {/* 4. Action Buttons */}
      <div className="pt-2 space-y-3">
        <Button
          href={quoteHref}
          variant="amber"
          size="lg"
          className="w-full font-bold shadow-md"
          leftIcon={<FileText className="w-4 h-4" />}
        >
          Request Quote for {selectedThickness} {product.name}
        </Button>

        <div className="flex items-center justify-between gap-3 pt-1 text-xs text-charcoal-subtle">
          <span className="flex items-center gap-1.5">
            <Factory className="w-3.5 h-3.5 text-amber-oak" />
            Supplied direct from Werabe &amp; Addis Ababa
          </span>
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="inline-flex items-center gap-1 font-bold text-forest hover:text-amber-oak transition-colors shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            {siteConfig.contact.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}