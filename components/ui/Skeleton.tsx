import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean;
}

export function Skeleton({
  className,
  shimmer = true,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-neutral-200/80 dark:bg-neutral-800/80 relative overflow-hidden",
        shimmer &&
          "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.8s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent",
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

/**
 * Product Card Skeleton matching exact ProductCard dimensions to avoid Layout Shift (CLS)
 */
export function ProductCardSkeleton() {
  return (
    <div
      className="bg-white rounded-3xl border border-cream-border/70 overflow-hidden shadow-xs p-5 flex flex-col justify-between space-y-4"
      aria-label="Loading product specifications..."
    >
      <div className="space-y-4">
        {/* Image Frame Skeleton */}
        <Skeleton className="w-full aspect-[4/3] rounded-2xl" />

        {/* Category Pill */}
        <Skeleton className="h-5 w-28 rounded-full" />

        {/* Product Title */}
        <div className="space-y-1.5">
          <Skeleton className="h-6 w-5/6 rounded-lg" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-4/6 rounded-md" />
        </div>

        {/* Spec Pill Badges */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Skeleton className="h-10 rounded-xl" />
          <Skeleton className="h-10 rounded-xl" />
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-cream-border/60 flex items-center justify-between gap-3">
        <Skeleton className="h-5 w-24 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>
    </div>
  );
}

/**
 * Product Catalog Grid Skeleton (3 columns on desktop, 2 on tablet, 1 on mobile)
 */
export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      role="status"
      aria-label="Loading timber catalog..."
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
      <span className="sr-only">Loading catalog products...</span>
    </div>
  );
}

/**
 * Product Detail Page Skeleton (Split column layout with large gallery + engineering specs)
 */
export function ProductDetailSkeleton() {
  return (
    <div className="space-y-10 py-8" role="status" aria-label="Loading product detail...">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Gallery Rail Skeleton */}
        <div className="lg:col-span-7 space-y-4">
          <Skeleton className="w-full aspect-[16/10] rounded-3xl" />
          <div className="flex gap-3 overflow-hidden">
            <Skeleton className="w-24 h-20 rounded-2xl shrink-0" />
            <Skeleton className="w-24 h-20 rounded-2xl shrink-0" />
            <Skeleton className="w-24 h-20 rounded-2xl shrink-0" />
            <Skeleton className="w-24 h-20 rounded-2xl shrink-0" />
          </div>
        </div>

        {/* Right: Spec Breakdown Skeleton */}
        <div className="lg:col-span-5 space-y-6">
          <Skeleton className="h-6 w-36 rounded-full" />
          <Skeleton className="h-10 w-4/5 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="p-6 rounded-3xl bg-cream-surface/60 border border-cream-border space-y-4">
            <Skeleton className="h-6 w-40" />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-12 rounded-xl" />
              <Skeleton className="h-12 rounded-xl" />
              <Skeleton className="h-12 rounded-xl" />
              <Skeleton className="h-12 rounded-xl" />
            </div>
          </div>

          <div className="flex gap-4">
            <Skeleton className="h-12 flex-1 rounded-xl" />
            <Skeleton className="h-12 w-36 rounded-xl" />
          </div>
        </div>
      </div>
      <span className="sr-only">Loading specifications...</span>
    </div>
  );
}

/**
 * Admin Table Skeleton for Inventory, Quotes, and Inquiries
 */
export function AdminTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div
      className="bg-white rounded-2xl border border-cream-border overflow-hidden shadow-xs p-6 space-y-5"
      role="status"
      aria-label="Loading admin data..."
    >
      <div className="flex items-center justify-between pb-4 border-b border-cream-border/60">
        <Skeleton className="h-7 w-48 rounded-lg" />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-36 rounded-xl" />
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>

      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-cream-surface/30 border border-cream-border/40"
          >
            <div className="flex items-center gap-3.5 flex-1">
              <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
              <div className="space-y-1.5 flex-1 max-w-sm">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-28 rounded-md" />
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading management records...</span>
    </div>
  );
}

/**
 * Gallery Showcase Grid Skeleton
 */
export function GallerySkeleton({ count = 4 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      role="status"
      aria-label="Loading project showcases..."
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-3xl border border-cream-border overflow-hidden p-4 space-y-3"
        >
          <Skeleton className="w-full aspect-[4/3] rounded-2xl" />
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-3 w-full" />
        </div>
      ))}
    </div>
  );
}

/**
 * Metric KPI Card Skeleton for Admin Dashboard
 */
export function MetricCardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-cream-border space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="w-9 h-9 rounded-xl" />
      </div>
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-3 w-36" />
    </div>
  );
}
