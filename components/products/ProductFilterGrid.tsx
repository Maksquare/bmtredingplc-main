"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, SlidersHorizontal, Layers } from "lucide-react";
import { Product, Category } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface ProductFilterGridProps {
  initialProducts: Product[];
  categories: Category[];
  initialCategory?: string;
}

export function ProductFilterGrid({
  initialProducts,
  categories,
  initialCategory = "all",
}: ProductFilterGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(8);

  // Filter products based on active category & search query
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" ||
        product.category_id === selectedCategory ||
        categories.find((c) => c.slug === selectedCategory)?.id === product.category_id;

      const matchesSearch =
        searchQuery.trim() === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.specs.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.applications.some((app) =>
          app.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, selectedCategory, searchQuery, categories]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <div className="space-y-8">
      {/* Search & Filter Controls Toolbar */}
      <div className="bg-white rounded-2xl border border-cream-border p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-charcoal-subtle absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by grade, thickness, species (e.g. BS 1088, Gurjan)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-10 text-sm bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal placeholder:text-charcoal-subtle focus:bg-white focus:border-amber-oak focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-subtle hover:text-charcoal"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results Count & Reset */}
          <div className="flex items-center justify-between md:justify-end gap-3 text-xs text-charcoal-muted">
            <span>
              Showing <strong className="text-charcoal">{filteredProducts.length}</strong> specifications
            </span>
            {(selectedCategory !== "all" || searchQuery !== "") && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="text-amber-oak hover:underline font-semibold"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Category Pills with Shared layoutId */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-cream-border/60">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`relative px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === "all"
                ? "text-white"
                : "text-charcoal-muted hover:text-charcoal hover:bg-cream-surface"
            }`}
          >
            {selectedCategory === "all" && (
              <motion.div
                layoutId="activeCategoryPill"
                className="absolute inset-0 bg-forest rounded-xl shadow-xs"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">All Specifications ({initialProducts.length})</span>
          </button>

          {categories.map((cat) => {
            const isSelected =
              selectedCategory === cat.slug || selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? "text-white"
                    : "text-charcoal-muted hover:text-charcoal hover:bg-cream-surface"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-forest rounded-xl shadow-xs"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      {displayedProducts.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="bg-white rounded-3xl border border-cream-border p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-cream-surface text-charcoal-subtle flex items-center justify-center mx-auto">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="font-display text-xl font-bold text-charcoal">
            No Timber Specifications Found
          </h3>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            We couldn&apos;t find any plywood matching &ldquo;{searchQuery}&rdquo;. Try another grade, or request custom cutting specifications from our sales desk.
          </p>
          <Button
            variant="amber"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-8">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="border-cream-border shadow-xs"
          >
            Load More Products ({filteredProducts.length - visibleCount} remaining)
          </Button>
        </div>
      )}
    </div>
  );
}

