"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, AlertTriangle, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);

  if (!product) return null;

  const isOutOfStock = product.stock_status === "out_of_stock";
  const isLowStock = product.stock_status === "low_stock";
  const hasSpecialVariant = product.variants?.some((v) => v.is_special);

  const primaryImage =
    !imgError && product.images?.[0]
      ? product.images[0]
      : product.slug === "plywood"
      ? "/images/products/plywood-18mm-special.jpg"
      : "/images/products/safarian-main.jpg";

  return (
    <article
      className={`group relative rounded-3xl bg-white border transition-all duration-300 flex flex-col overflow-hidden ${
        isOutOfStock
          ? "border-cream-border/70 opacity-80"
          : hasSpecialVariant
          ? "border-amber-oak/40 shadow-sm hover:shadow-xl hover:border-amber-oak"
          : "border-cream-border shadow-xs hover:shadow-xl hover:border-amber-oak/50"
      }`}
    >
      {/* Product Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-[16/10] w-full overflow-hidden bg-cream-dark block"
      >
        <Image
          src={primaryImage}
          alt={`${product.name} — bmtradingplc`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
          onError={() => setImgError(true)}
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            isOutOfStock ? "grayscale" : ""
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
          <Badge variant="amber" size="sm" className="shadow-sm">
            {product.category_name || product.name}
          </Badge>

          {hasSpecialVariant ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-oak text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
              <Sparkles className="w-3 h-3" />
              18mm Special Product
            </span>
          ) : isOutOfStock ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-charcoal text-white text-[11px] font-bold">
              Temporarily Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-bold">
              <AlertTriangle className="w-3 h-3" />
              Limited Batch ({product.stock_quantity || "Low"} sheets)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-forest-dark/90 text-emerald-200 border border-emerald-400/30 text-[11px] font-bold backdrop-blur-xs">
              <CheckCircle2 className="w-3 h-3" />
              In Stock
            </span>
          )}
        </div>

        {/* Bottom Overlay Thickness Summary */}
        <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white/95">
            <Layers className="w-3.5 h-3.5 text-amber-300" />
            <span>{product.specs.thickness}</span>
          </div>
          <span className="text-[11px] font-medium text-white/80">
            {product.specs.standard_size}
          </span>
        </div>
      </Link>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <div>
            <Link href={`/products/${product.slug}`} className="group/title inline-block">
              <h3 className="text-2xl font-display font-extrabold text-charcoal group-hover/title:text-forest transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="text-xs text-charcoal-subtle font-medium mt-0.5">
              {product.specs.grade}
            </p>
          </div>

          <p className="text-sm text-charcoal-light leading-relaxed line-clamp-3">
            {product.short_description}
          </p>

          {/* Interactive Thickness Pills */}
          {product.variants && product.variants.length > 0 && (
            <div className="pt-1 space-y-2">
              <span className="block text-[10px] uppercase tracking-wider font-bold text-charcoal-subtle">
                Select Thickness
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.variants.map((variant) => (
                  <Link
                    key={variant.id}
                    href={`/products/${product.slug}?thickness=${encodeURIComponent(variant.thickness)}`}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition-all duration-200 hover:-translate-y-0.5 ${
                      variant.is_special
                        ? "bg-amber-oak/15 border-amber-oak text-amber-900 hover:bg-amber-oak hover:text-white"
                        : "bg-cream/80 border-cream-border text-charcoal hover:border-forest hover:bg-forest hover:text-white"
                    }`}
                  >
                    {variant.is_special && <Sparkles className="w-3 h-3" />}
                    <span>{variant.thickness}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions (Zero Prices) */}
        <div className="pt-4 border-t border-cream-border/70 flex items-center justify-between gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-amber-oak transition-colors"
          >
            <span>Specifications</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Button
            href={`/quote?product=${encodeURIComponent(product.name)}`}
            variant="amber"
            size="sm"
            className="text-xs py-2 px-3.5 min-h-[38px] font-bold shadow-xs"
            leftIcon={<FileText className="w-3.5 h-3.5" />}
          >
            {isOutOfStock ? "Inquire Stock" : "Request Quote"}
          </Button>
        </div>
      </div>
    </article>
  );
}