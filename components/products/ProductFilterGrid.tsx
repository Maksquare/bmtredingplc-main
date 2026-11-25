"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  Layers,
  ArrowUpDown,
} from "lucide-react";
import { Product, Category } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

interface ProductFilterGridProps {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
  initialSearch?: string;
}

const THICKNESS_OPTIONS = ["03mm", "06mm", "08mm", "12mm", "16mm", "18mm"];

export function ProductFilterGrid({
  products,
  categories,
  initialCategory = "all",
  initialSearch = "",
}: ProductFilterGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "all");
  const [selectedThicknesses, setSelectedThicknesses] = useState<string[]>([]);
  const [specialOnly, setSpecialOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch || "");
  const [sortBy, setSortBy] = useState<"featured" | "thickness" | "name">("featured");

  const toggleThickness = (t: string) => {
    setSelectedThicknesses((prev) =>
      prev.includes(t) ? prev.filter((item) => item !== t) : [...prev, t]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedThicknesses([]);
    setSpecialOnly(false);
    setSearchQuery("");
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedThicknesses.length > 0 ||
    specialOnly ||
    searchQuery.trim().length > 0;

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== "all") {
      const cat = categories.find(
        (c) => c.slug === selectedCategory || c.id === selectedCategory
      );
      list = list.filter(
        (p) =>
          p.category_id === selectedCategory ||
          p.slug === selectedCategory ||
          (cat && p.category_id === cat.id)
      );
    }

    if (selectedThicknesses.length > 0) {
      list = list.filter((p) => {
        const variantThicknesses = p.variants?.map((v) => v.thickness.toLowerCase()) || [];
        const specThickness = (p.specs?.thickness || "").toLowerCase();
        return selectedThicknesses.some((t) => {
          const target = t.toLowerCase();
          return variantThicknesses.includes(target) || specThickness.includes(target);
        });
      });
    }

    if (specialOnly) {
      list = list.filter((p) => p.variants?.some((v) => v.is_special));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.category_name || "").toLowerCase().includes(q) ||
          p.short_description.toLowerCase().includes(q) ||
          p.specs.thickness.toLowerCase().includes(q) ||
          p.applications.some((a) => a.toLowerCase().includes(q))
      );
    }

    if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "thickness") {
      const getMinThickness = (p: Product) => {
        const match = (p.specs?.thickness || "").match(/\d+/);
        return match ? parseInt(match[0], 10) : 99;
      };
      list.sort((a, b) => getMinThickness(a) - getMinThickness(b));
    } else {
      list.sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
    }

    return list;
  }, [products, categories, selectedCategory, selectedThicknesses, specialOnly, searchQuery, sortBy]);

  return (
    <div className="space-y-8">
      {/* Top Filter Toolbar */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-cream-border shadow-xs space-y-5">
        {/* Row 1: Category Tabs & Search/Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Pills with Framer Motion Indicator */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Product categories">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                selectedCategory === "all"
                  ? "text-white"
                  : "text-charcoal-light hover:text-charcoal bg-cream/60 border border-cream-border"
              }`}
            >
              {selectedCategory === "all" && (
                <motion.span
                  layoutId="catalog-category-pill"
                  className="absolute inset-0 rounded-xl bg-forest shadow-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">All Products ({products.length})</span>
            </button>

            {categories.map((cat) => {
              const isActive = selectedCategory === cat.slug || selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-charcoal-light hover:text-charcoal bg-cream/60 border border-cream-border"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="catalog-category-pill"
                      className="absolute inset-0 rounded-xl bg-forest shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-charcoal-subtle absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Safarian, Plywood, 18mm..."
                className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-cream-border bg-cream/40 text-sm text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:ring-2 focus:ring-amber-oak focus:bg-white transition-all"
                aria-label="Search products"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal-subtle hover:text-charcoal"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 bg-cream/40 border border-cream-border rounded-xl px-3 py-2">
              <ArrowUpDown className="w-4 h-4 text-charcoal-subtle shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "featured" | "thickness" | "name")}
                aria-label="Sort products"
                className="bg-transparent text-xs sm:text-sm font-semibold text-charcoal focus:outline-none cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="thickness">Thickness: Thin to Thick</option>
                <option value="name">Name: A – Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 2: Thickness Filters & Special Product Chip */}
        <div className="pt-4 border-t border-cream-border/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-charcoal-subtle mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-oak" />
              Thickness:
            </span>

            {THICKNESS_OPTIONS.map((t) => {
              const active = selectedThicknesses.includes(t);
              const is18 = t === "18mm";
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleThickness(t)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    active
                      ? "bg-amber-oak text-white border-amber-oak shadow-xs"
                      : is18
                      ? "bg-amber-oak/10 text-amber-900 border-amber-oak/40 hover:bg-amber-oak/20"
                      : "bg-cream/60 text-charcoal border-cream-border hover:border-forest"
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>{t}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setSpecialOnly((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${
                specialOnly
                  ? "bg-forest text-amber-light border-forest shadow-xs"
                  : "bg-amber-oak/15 text-amber-900 border-amber-oak/40 hover:bg-amber-oak/25"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>18mm Special Product</span>
            </button>
          </div>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              className="text-xs font-bold text-charcoal-light hover:text-amber-oak"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Live Result Summary */}
      <div className="flex items-center justify-between text-xs text-charcoal-subtle px-1" aria-live="polite">
        <span>
          Showing <strong className="text-charcoal">{filteredProducts.length}</strong>{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
          {hasActiveFilters ? " matching current filters" : " in our core lineup"}
        </span>
        {selectedThicknesses.length > 0 && (
          <span className="font-medium text-amber-oak">
            Gauges: {selectedThicknesses.join(", ")}
          </span>
        )}
      </div>

      {/* Product Grid or Friendly Empty State */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          icon={RotateCcw}
          title="No products match those filters"
          description="Try clearing your active thickness or search filters to view both Safarian (03mm–12mm) and Plywood (16mm / 18mm Special Product)."
          primaryAction={{
            label: "Clear All Filters",
            onClick: clearFilters,
            icon: <RotateCcw className="w-4 h-4" />,
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}