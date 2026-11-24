"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bell, AlertTriangle, FileText } from "lucide-react";
import { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=800&auto=format&fit=crop";

export function ProductCard({ product }: { product: Product }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isOutOfStock =
    product.stock_status === "out_of_stock" || product.stock_quantity === 0;
  const isLowStock =
    !isOutOfStock &&
    (product.stock_status === "low_stock" ||
      (typeof product.stock_quantity === "number" && product.stock_quantity <= 15));

  const imageUrl =
    !imageError && product.images && product.images.length > 0
      ? product.images[0]
      : FALLBACK_IMAGE;

  return (
    <div
      className={`group bg-white rounded-xl sm:rounded-2xl border overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col h-full hover:-translate-y-1 ${
        isOutOfStock
          ? "border-charcoal/15 opacity-85 grayscale-30"
          : "border-cream-border/90 hover:border-amber-oak/50"
      }`}
    >
      {/* High-Resolution Architectural Wood Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] bg-neutral-900 overflow-hidden group/img select-none"
      >
        {/* Shimmer skeleton while loading photo */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-neutral-800 animate-pulse flex items-center justify-center">
            <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">
              Calibrating Image...
            </span>
          </div>
        )}

        <Image
          src={imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
          className={`object-cover object-center group-hover/img:scale-106 transition-transform duration-500 ease-out ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* High-Contrast Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

        {/* Out of Stock Dark Overlay Banner */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-2xs flex flex-col items-center justify-center p-3 text-center z-20">
            <span className="px-3 py-1 rounded-full bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-lg">
              Out of Stock in Yard
            </span>
            <span className="text-[11px] text-white/80 font-medium mt-1">
              Custom consignment can be imported
            </span>
          </div>
        )}

        {/* Top Badges (Stock Alert & Flagship Tag) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
          {product.is_featured && !isOutOfStock ? (
            <Badge variant="amber" size="sm" className="shadow-xs font-bold text-[10px]">
              Flagship Spec
            </Badge>
          ) : <div />}

          {/* Low Stock Badge */}
          {isLowStock && (
            <span className="text-[10px] font-black uppercase tracking-wider text-white bg-red-600 px-2.5 py-0.5 rounded-full shadow-md animate-pulse">
              Only {product.stock_quantity} sheets left
            </span>
          )}
        </div>

        {/* Category & Grade Badges */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20">
            {product.category_name}
          </span>
          <span className="text-[10px] font-bold text-white bg-forest/90 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
            {product.specs.grade}
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between space-y-3.5">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-1 text-[11px] text-charcoal-subtle">
            <span className="font-semibold">{product.brand || "bmtradingplc Spec"}</span>
            {product.sku && <span className="font-mono text-[10px]">{product.sku}</span>}
          </div>

          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-display text-base font-bold text-charcoal group-hover:text-forest transition-colors leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-2">
            {product.short_description}
          </p>

          {/* Quick Technical Specs Snapshot */}
          <div className="pt-1.5 grid grid-cols-2 gap-2 text-[11px] bg-cream-surface/70 p-2 rounded-lg border border-cream-border/70">
            <div>
              <span className="text-charcoal-subtle font-medium block text-[10px]">Thickness:</span>
              <span className="font-bold text-charcoal truncate block">
                {product.specs.thickness.split(",")[0]} +
              </span>
            </div>
            <div>
              <span className="text-charcoal-subtle font-medium block text-[10px]">Glue Bond:</span>
              <span className="font-bold text-charcoal truncate block">
                {product.specs.glue_type.split("(")[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Price & Primary Call-to-Action Bar */}
        <div className="pt-2.5 border-t border-cream-border/70 flex flex-col space-y-2.5">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] text-charcoal-subtle uppercase tracking-wider font-semibold">
              Wholesale Rate:
            </span>
            {product.price ? (
              <span className="text-sm font-extrabold text-charcoal">
                {product.price.toLocaleString()} ETB
                <span className="text-[10px] text-charcoal-subtle font-normal"> / sheet</span>
              </span>
            ) : (
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Price on Request
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-forest hover:text-amber-oak transition-colors"
            >
              <span>Specs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex items-center gap-1.5">
              {!isOutOfStock ? (
                <Button
                  href={`/quote?product=${encodeURIComponent(product.name)}`}
                  variant="amber"
                  size="sm"
                  className="text-xs py-1.5 px-3 min-h-[38px] font-bold shadow-xs"
                  leftIcon={<FileText className="w-3.5 h-3.5" />}
                >
                  Request Quote
                </Button>
              ) : (
                <Button
                  href={`/quote?product=${encodeURIComponent(product.name)}&status=restock`}
                  variant="outline"
                  size="sm"
                  className="text-xs py-1.5 px-3 min-h-[38px] font-bold border-red-300 text-red-700 hover:bg-red-50"
                  leftIcon={<Bell className="w-3.5 h-3.5" />}
                >
                  Notify Restock
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
