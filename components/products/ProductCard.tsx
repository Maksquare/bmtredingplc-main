import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers } from "lucide-react";
import { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function ProductCard({ product }: { product: Product }) {
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=800&auto=format&fit=crop";

  return (
    <div className="group bg-white rounded-2xl border border-cream-border/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-oak/60 transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      {/* High-Resolution Architectural Wood Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] bg-charcoal overflow-hidden group/img"
      >
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover/img:scale-108 transition-transform duration-700 ease-out"
        />

        {/* High-Contrast Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Category Badge on Bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
            {product.category_name}
          </span>
          <span className="text-[11px] font-bold text-white bg-forest/90 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
            {product.specs.grade}
          </span>
        </div>

        {/* Featured Tag on Top */}
        {product.is_featured && (
          <div className="absolute top-3 left-3 z-20">
            <Badge variant="amber" size="sm" className="shadow-md font-bold">
              Featured Spec
            </Badge>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2.5">
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-display text-lg font-bold text-charcoal group-hover:text-forest transition-colors leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-2">
            {product.short_description}
          </p>

          {/* Quick Technical Specs Snapshot */}
          <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] bg-cream-surface/70 p-2.5 rounded-xl border border-cream-border/70">
            <div>
              <span className="text-charcoal-subtle font-medium block">Thickness:</span>
              <span className="font-bold text-charcoal truncate block">
                {product.specs.thickness.split(",")[0]} +
              </span>
            </div>
            <div>
              <span className="text-charcoal-subtle font-medium block">Glue Bond:</span>
              <span className="font-bold text-charcoal truncate block">
                {product.specs.glue_type.split("(")[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-cream-border/70 flex items-center justify-between gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-amber-oak transition-colors"
          >
            <span>View Specifications</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Button
            href={`/quote?product=${encodeURIComponent(product.name)}`}
            variant="amber"
            size="sm"
            className="text-xs py-1.5 px-3 h-8 font-bold"
          >
            Quote
          </Button>
        </div>
      </div>
    </div>
  );
}

