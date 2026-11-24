"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Layers,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowUpDown,
  Check,
  RotateCw,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Product, Category } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

interface ProductFilterGridProps {
  initialProducts: Product[];
  categories: Category[];
  initialCategory?: string;
}

const GRADE_OPTIONS = [
  { id: "all", label: "All Grades" },
  { id: "BS 1088", label: "BS 1088 Marine" },
  { id: "Film-Faced", label: "Dynea Film-Faced" },
  { id: "Joinery", label: "Joinery & Commercial" },
  { id: "Heavy", label: "Heavy Structural" },
];

const THICKNESS_OPTIONS = [
  { id: "all", label: "All Thicknesses" },
  { id: "6mm", label: "6mm" },
  { id: "9mm", label: "9mm" },
  { id: "12mm", label: "12mm" },
  { id: "18mm", label: "18mm" },
  { id: "21mm", label: "21mm" },
  { id: "25mm", label: "25mm" },
];

const STOCK_OPTIONS = [
  { id: "all", label: "All Availability" },
  { id: "in_stock", label: "In Stock Only" },
  { id: "low_stock", label: "Low Stock Alert" },
  { id: "out_of_stock", label: "Out of Stock" },
];

export function ProductFilterGrid({
  initialProducts,
  categories,
  initialCategory = "all",
}: ProductFilterGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [selectedThickness, setSelectedThickness] = useState<string>("all");
  const [selectedStock, setSelectedStock] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price_asc" | "price_desc" | "thickness">("featured");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  // Rail scrolling and drag states
  const railRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  // Check scroll boundary
  const updateScrollState = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  }, []);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (selectedCategory === "all") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", selectedCategory);
      }
      window.history.replaceState({}, "", url.toString());
    }
  }, [selectedCategory]);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState, categories.length]);

  useEffect(() => {
    if (activeBtnRef.current && railRef.current) {
      activeBtnRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
    const timer = setTimeout(updateScrollState, 350);
    return () => clearTimeout(timer);
  }, [selectedCategory, updateScrollState]);

  // Arrow click handlers
  const handleScrollLeft = () => {
    if (!railRef.current) return;
    railRef.current.scrollBy({ left: -260, behavior: "smooth" });
    setTimeout(updateScrollState, 280);
  };

  const handleScrollRight = () => {
    if (!railRef.current) return;
    railRef.current.scrollBy({ left: 260, behavior: "smooth" });
    setTimeout(updateScrollState, 280);
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!railRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - railRef.current.offsetLeft);
    setScrollLeftPos(railRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !railRef.current) return;
    e.preventDefault();
    const x = e.pageX - railRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    railRef.current.scrollLeft = scrollLeftPos - walk;
    updateScrollState();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset all active filters
  const resetAllFilters = () => {
    setSelectedCategory("all");
    setSelectedGrade("all");
    setSelectedThickness("all");
    setSelectedStock("all");
    setSortBy("featured");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedGrade !== "all" ||
    selectedThickness !== "all" ||
    selectedStock !== "all" ||
    searchQuery.trim() !== "" ||
    sortBy !== "featured";

  // Filter & Sort Pipeline
  const filteredProducts = useMemo(() => {
    const list = initialProducts.filter((product) => {
      // 1. Category match
      const matchesCategory =
        selectedCategory === "all" ||
        product.category_id === selectedCategory ||
        categories.find((c) => c.slug === selectedCategory)?.id === product.category_id;

      // 2. Grade filter
      const matchesGrade =
        selectedGrade === "all" ||
        product.specs.grade.toLowerCase().includes(selectedGrade.toLowerCase());

      // 3. Thickness filter
      const matchesThickness =
        selectedThickness === "all" ||
        product.specs.thickness.toLowerCase().includes(selectedThickness.toLowerCase());

      // 4. Stock filter
      let matchesStock = true;
      if (selectedStock === "in_stock") {
        matchesStock = product.stock_status === "in_stock" || (typeof product.stock_quantity === "number" && product.stock_quantity > 15);
      } else if (selectedStock === "low_stock") {
        matchesStock = product.stock_status === "low_stock" || (typeof product.stock_quantity === "number" && product.stock_quantity <= 15 && product.stock_quantity > 0);
      } else if (selectedStock === "out_of_stock") {
        matchesStock = product.stock_status === "out_of_stock" || product.stock_quantity === 0;
      }

      // 5. Search query match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.specs.grade.toLowerCase().includes(query) ||
        (product.brand && product.brand.toLowerCase().includes(query)) ||
        (product.sku && product.sku.toLowerCase().includes(query)) ||
        product.applications.some((app) => app.toLowerCase().includes(query));

      return matchesCategory && matchesGrade && matchesThickness && matchesStock && matchesSearch;
    });

    // Sorting
    return [...list].sort((a, b) => {
      if (sortBy === "price_asc") {
        return (a.price || 999999) - (b.price || 999999);
      }
      if (sortBy === "price_desc") {
        return (b.price || 0) - (a.price || 0);
      }
      if (sortBy === "thickness") {
        const aThick = parseInt(a.specs.thickness) || 0;
        const bThick = parseInt(b.specs.thickness) || 0;
        return aThick - bThick;
      }
      // "featured" default
      return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
    });
  }, [
    initialProducts,
    selectedCategory,
    selectedGrade,
    selectedThickness,
    selectedStock,
    searchQuery,
    sortBy,
    categories,
  ]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setIsLoadingMore(false);
    }, 600);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Search & Filter Controls Toolbar */}
      <div className="bg-white rounded-2xl border border-cream-border/90 p-4 sm:p-5 shadow-2xs space-y-4">
        {/* Top Row: Search and Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-charcoal-subtle absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by grade, thickness, brand (e.g. BS 1088, Gurjan)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-10 text-xs sm:text-sm bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal placeholder:text-charcoal-subtle focus:bg-white focus:border-amber-oak focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-subtle hover:text-charcoal p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown & Results Counter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-charcoal-muted">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-oak" />
              <label htmlFor="sort-select" className="font-semibold text-charcoal">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="h-9 px-2.5 bg-cream-surface/70 rounded-lg border border-cream-border text-xs text-charcoal focus:outline-none focus:border-amber-oak font-medium"
              >
                <option value="featured">Featured / Flagship</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="thickness">Thickness (Ascending)</option>
              </select>
            </div>

            <span className="hidden sm:inline-block text-xs text-charcoal-subtle">
              | Showing <strong className="text-charcoal">{filteredProducts.length}</strong> specs
            </span>
          </div>
        </div>

        {/* Secondary Row: Thickness, Grade & Stock Filter Chips */}
        <div className="pt-2 border-t border-cream-border/60 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-forest mr-2">
            <Filter className="w-3.5 h-3.5 text-amber-oak" />
            <span>Refine By:</span>
          </div>

          {/* Grade Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {GRADE_OPTIONS.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setSelectedGrade(g.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedGrade === g.id
                    ? "bg-forest text-white shadow-2xs"
                    : "bg-cream-surface/80 text-charcoal-muted hover:text-charcoal hover:bg-cream-surface border border-cream-border/70"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          {/* Thickness Chips */}
          <div className="hidden sm:flex items-center gap-1.5 flex-wrap pl-2 border-l border-cream-border/80">
            {THICKNESS_OPTIONS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedThickness(t.id)}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  selectedThickness === t.id
                    ? "bg-amber-oak text-white shadow-2xs"
                    : "bg-cream-surface/80 text-charcoal-muted hover:text-charcoal hover:bg-cream-surface border border-cream-border/70"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Stock Availability Filter */}
          <div className="flex items-center gap-1.5 flex-wrap pl-2 border-l border-cream-border/80">
            {STOCK_OPTIONS.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedStock(st.id)}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  selectedStock === st.id
                    ? "bg-charcoal text-white shadow-2xs"
                    : "bg-cream-surface/80 text-charcoal-muted hover:text-charcoal hover:bg-cream-surface border border-cream-border/70"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filter Chips with Dismissal Buttons */}
        {hasActiveFilters && (
          <div className="pt-2 border-t border-cream-border/60 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5 flex-wrap text-xs">
              <span className="text-[11px] text-charcoal-subtle font-semibold">Active:</span>

              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-forest/10 border border-forest/20 text-forest text-xs font-bold">
                  <span>Cat: {categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}</span>
                  <button type="button" onClick={() => setSelectedCategory("all")}>
                    <X className="w-3 h-3 hover:text-red-700" />
                  </button>
                </span>
              )}

              {selectedGrade !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
                  <span>Grade: {selectedGrade}</span>
                  <button type="button" onClick={() => setSelectedGrade("all")}>
                    <X className="w-3 h-3 hover:text-red-700" />
                  </button>
                </span>
              )}

              {selectedThickness !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
                  <span>Thick: {selectedThickness}</span>
                  <button type="button" onClick={() => setSelectedThickness("all")}>
                    <X className="w-3 h-3 hover:text-red-700" />
                  </button>
                </span>
              )}

              {selectedStock !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cream-surface border border-cream-border text-charcoal text-xs font-bold">
                  <span>Stock: {selectedStock.replace("_", " ")}</span>
                  <button type="button" onClick={() => setSelectedStock("all")}>
                    <X className="w-3 h-3 hover:text-red-700" />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-300 text-charcoal text-xs font-bold">
                  <span>&ldquo;{searchQuery}&rdquo;</span>
                  <button type="button" onClick={() => setSearchQuery("")}>
                    <X className="w-3 h-3 hover:text-red-700" />
                  </button>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={resetAllFilters}
              className="text-xs font-bold text-red-700 hover:underline flex items-center gap-1"
            >
              <RotateCw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* Horizontal Category Rail */}
        <div className="relative pt-2 border-t border-cream-border/60">
          {canScrollLeft && (
            <button
              type="button"
              onClick={handleScrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 border border-cream-border shadow-md flex items-center justify-center text-charcoal hover:text-[#C8832A] hover:scale-105 active:scale-95 transition-all"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="w-4 h-4 -translate-x-0.5" />
            </button>
          )}

          {canScrollLeft && (
            <div className="absolute left-0 top-2 bottom-0 w-10 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          )}

          <div
            ref={railRef}
            onScroll={updateScrollState}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none scroll-smooth select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            } -mx-2 px-2 sm:mx-0 sm:px-0`}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <button
              type="button"
              ref={selectedCategory === "all" ? activeBtnRef : null}
              onClick={() => setSelectedCategory("all")}
              className={`relative shrink-0 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all min-h-[38px] active:scale-95 ${
                selectedCategory === "all"
                  ? "bg-[#0B241B] text-white shadow-sm"
                  : "bg-cream-surface/70 text-charcoal-muted hover:text-charcoal hover:bg-cream-surface border border-cream-border/60"
              }`}
            >
              <span>All Categories ({initialProducts.length})</span>
            </button>

            {categories.map((cat) => {
              const isSelected =
                selectedCategory === cat.slug || selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  ref={isSelected ? activeBtnRef : null}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`relative shrink-0 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all min-h-[38px] active:scale-95 ${
                    isSelected
                      ? "bg-[#0B241B] text-white shadow-sm ring-1 ring-[#C8832A]/50"
                      : "bg-cream-surface/70 text-charcoal-muted hover:text-charcoal hover:bg-cream-surface border border-cream-border/60"
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {canScrollRight && (
            <div className="absolute right-0 top-2 bottom-0 w-10 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
          )}

          {canScrollRight && (
            <button
              type="button"
              onClick={handleScrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 border border-cream-border shadow-md flex items-center justify-center text-charcoal hover:text-[#C8832A] hover:scale-105 active:scale-95 transition-all"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-4 h-4 translate-x-0.5" />
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {displayedProducts.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <EmptyState
          title="No Matching Timber Panels Found"
          description={
            hasActiveFilters
              ? "No certified panels in our Addis Ababa inventory match all your chosen filter criteria (Grade, Thickness, or Availability). Clear or broaden your filters to view in-stock timber."
              : "No products are currently available in this category. Our timber importing desk can arrange batch shipments."
          }
          icon={Layers}
          badge="Zero Results"
          primaryAction={{
            label: "Clear All Filter Constraints",
            onClick: resetAllFilters,
          }}
          secondaryAction={{
            label: "Request Custom Cutting List",
            href: "/quote",
          }}
          className="max-w-lg mx-auto py-10"
        />
      )}

      {/* Pagination & Infinite Scroll States */}
      <div className="pt-4 text-center">
        {hasMore ? (
          <Button
            variant="secondary"
            size="default"
            onClick={handleLoadMore}
            isLoading={isLoadingMore}
            loadingText="Loading more timber specifications..."
            className="border-cream-border shadow-2xs font-bold text-xs sm:text-sm px-6"
          >
            Load More Specifications ({filteredProducts.length - visibleCount} remaining)
          </Button>
        ) : displayedProducts.length > 0 ? (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream-surface/70 border border-cream-border text-xs text-charcoal-muted">
            <Check className="w-3.5 h-3.5 text-forest" />
            <span>All certified specifications loaded ({filteredProducts.length} items total)</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
