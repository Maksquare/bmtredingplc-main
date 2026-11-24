"use client";

import React, { useState, useMemo } from "react";
import {
  Check,
  Plus,
  Minus,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Clock,
  FileText,
  Phone,
} from "lucide-react";
import { Product, ProductVariant } from "@/types";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";

interface ProductVariantSelectorProps {
  product: Product;
}

export function ProductVariantSelector({ product }: ProductVariantSelectorProps) {
  // Extract available thicknesses
  const thicknessOptions = useMemo(() => {
    return product.specs.thickness.split(",").map((s) => s.trim());
  }, [product.specs.thickness]);

  const sizeOptions = useMemo(() => {
    return product.specs.standard_size.split("/").map((s) => s.trim());
  }, [product.specs.standard_size]);

  const [selectedThickness, setSelectedThickness] = useState<string>(
    thicknessOptions[0] || "18mm"
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    sizeOptions[0] || "1220 x 2440 mm (4ft x 8ft)"
  );
  const [quantity, setQuantity] = useState<number>(20);

  // Match variant from product.variants if present
  const matchedVariant = useMemo(() => {
    return product.variants?.find((v) => v.thickness === selectedThickness);
  }, [product.variants, selectedThickness]);

  // Determine stock status for selected variant
  const stockStatus = matchedVariant?.stock_status || product.stock_status || "in_stock";
  const stockQty = matchedVariant?.stock_quantity ?? product.stock_quantity ?? 100;
  const isOutOfStock = stockStatus === "out_of_stock" || stockQty === 0;
  const isLowStock = !isOutOfStock && (stockStatus === "low_stock" || stockQty <= 15);

  // Dynamic price calculation
  const unitPrice = useMemo(() => {
    if (matchedVariant?.price) return matchedVariant.price;
    if (product.price) {
      // Scale price slightly by thickness mm
      const baseMm = 18;
      const currentMm = parseInt(selectedThickness) || 18;
      const multiplier = Math.max(0.65, currentMm / baseMm);
      return Math.round(product.price * multiplier);
    }
    return undefined;
  }, [matchedVariant, product.price, selectedThickness]);

  const totalPrice = unitPrice ? unitPrice * quantity : undefined;

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-cream-border shadow-md space-y-6">
      <div className="flex items-center justify-between border-b border-cream-border/60 pb-3">
        <h3 className="font-display font-bold text-base text-charcoal">
          Configure Sheet Variant & Yard Consignment
        </h3>
        <span className="text-xs text-charcoal-subtle font-medium">
          BS EN / ISO Tested
        </span>
      </div>

      {/* 1. Thickness Variant Selector */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-charcoal">1. Select Nominal Thickness:</span>
          <span className="text-forest font-extrabold">{selectedThickness} Calibrated</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {thicknessOptions.map((t) => {
            const isSelected = selectedThickness === t;
            const isVUnavailable = product.variants?.some(
              (v) => v.thickness === t && (v.stock_status === "out_of_stock" || v.stock_quantity === 0)
            );

            return (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedThickness(t)}
                className={`py-2 px-2 text-center rounded-xl text-xs font-bold transition-all relative ${
                  isSelected
                    ? "bg-forest text-white ring-2 ring-amber-oak shadow-xs"
                    : isVUnavailable
                    ? "bg-cream-surface/50 text-charcoal-subtle/70 border border-dashed border-cream-border line-through"
                    : "bg-cream-surface/70 text-charcoal hover:bg-cream-surface border border-cream-border/80"
                }`}
              >
                <span>{t}</span>
                {isSelected && (
                  <Check className="w-3 h-3 absolute top-1 right-1 text-amber-300" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Sheet Size Dimension Selector */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-charcoal">2. Standard Sheet Dimension:</span>
          <span className="text-charcoal-muted truncate max-w-[200px]">{selectedSize}</span>
        </div>

        <div className="flex gap-2 flex-wrap">
          {sizeOptions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSelectedSize(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedSize === s
                  ? "bg-amber-pale border border-amber-oak text-amber-900 font-bold"
                  : "bg-cream-surface/60 border border-cream-border text-charcoal-muted hover:text-charcoal"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Real-Time Stock Status Feedback Banner */}
      <div className="p-3.5 rounded-2xl border text-xs">
        {isOutOfStock ? (
          <div className="flex items-center gap-2 text-red-800 bg-red-50 p-2 rounded-xl border border-red-200">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span>
              <strong>Currently Unavailable:</strong> This specific thickness ({selectedThickness}) is fully committed at our Addis Ababa depot. Next container arrives in 14 days.
            </span>
          </div>
        ) : isLowStock ? (
          <div className="flex items-center gap-2 text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>
              <strong>Low Yard Inventory:</strong> Only <strong>{stockQty} sheets</strong> remain in stock for immediate same-day delivery.
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
            <Check className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>
              <strong>In Stock:</strong> {stockQty} certified sheets ready for immediate flatbed loading at Kality yard.
            </span>
          </div>
        )}
      </div>

      {/* 4. Quantity Stepper & Price Calculation */}
      <div className="pt-2 border-t border-cream-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Quantity Stepper */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-charcoal-subtle uppercase tracking-wider block">
            Quantity (Sheets)
          </span>
          <div className="flex items-center border border-cream-border rounded-xl bg-cream-surface/50 overflow-hidden shadow-2xs w-fit">
            <button
              type="button"
              disabled={quantity <= 5 || isOutOfStock}
              onClick={() => setQuantity((q) => Math.max(5, q - 5))}
              className="p-2 hover:bg-cream-surface text-charcoal disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-4 py-1.5 font-display font-extrabold text-sm text-charcoal min-w-[50px] text-center">
              {quantity}
            </span>
            <button
              type="button"
              disabled={quantity >= stockQty || isOutOfStock}
              onClick={() => setQuantity((q) => Math.min(stockQty, q + 5))}
              className="p-2 hover:bg-cream-surface text-charcoal disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dynamic Price Display */}
        <div className="text-right sm:text-right">
          <span className="text-[10px] text-charcoal-subtle uppercase tracking-wider font-semibold block">
            Estimated Batch Total:
          </span>
          {totalPrice ? (
            <div>
              <span className="font-display font-black text-2xl text-forest">
                {totalPrice.toLocaleString()} ETB
              </span>
              <span className="text-[11px] text-charcoal-muted block">
                ({unitPrice?.toLocaleString()} ETB / sheet)
              </span>
            </div>
          ) : (
            <span className="text-sm font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 inline-block">
              Price on Formal Request
            </span>
          )}
        </div>
      </div>

      {/* 5. Request Quote & Direct Proforma Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {!isOutOfStock ? (
          <>
            <Button
              href={`/quote?product=${encodeURIComponent(product.name)}&thickness=${encodeURIComponent(selectedThickness)}&quantity=${quantity}`}
              variant="amber"
              size="default"
              className="flex-1 justify-center text-xs sm:text-sm font-bold shadow-md min-h-[46px]"
              leftIcon={<FileText className="w-4 h-4" />}
            >
              Request Formal Proforma Quotation
            </Button>

            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-cream-border bg-cream-surface/80 hover:bg-cream-surface text-charcoal font-bold text-xs sm:text-sm transition-all active:scale-95 min-h-[46px]"
              title="Call Yard Dispatcher"
            >
              <Phone className="w-4 h-4 text-forest" />
              <span>Call Yard</span>
            </a>
          </>
        ) : (
          <Button
            href={`/quote?product=${encodeURIComponent(product.name)}&thickness=${encodeURIComponent(selectedThickness)}&quantity=${quantity}&status=restock`}
            variant="outline"
            size="default"
            className="w-full justify-center text-xs sm:text-sm font-bold border-red-300 text-red-700 hover:bg-red-50 min-h-[46px]"
            leftIcon={<Clock className="w-4 h-4" />}
          >
            Notify Me When Restocked in Yard
          </Button>
        )}
      </div>
    </div>
  );
}
