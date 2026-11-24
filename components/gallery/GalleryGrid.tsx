"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Tag, Layers, ArrowRight } from "lucide-react";
import { GalleryItem } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface GalleryGridProps {
  items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = [
    "all",
    ...Array.from(new Set(items.map((item) => item.category))),
  ];

  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Category Filter Pills: Mobile horizontal scrollable with comfortable touch padding */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 capitalize min-h-[40px] ${
              selectedCategory === cat
                ? "bg-forest text-white shadow-xs"
                : "bg-white text-charcoal-muted hover:text-charcoal border border-cream-border/90 hover:bg-cream-surface active:scale-95"
            }`}
          >
            {cat === "all" ? "All Project Sites" : cat}
          </button>
        ))}
      </div>

      {/* Masonry / Responsive Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-2xl bg-[#071711] text-white overflow-hidden shadow-2xs hover:shadow-xl border border-cream-border/90 cursor-pointer aspect-[4/3] flex flex-col justify-end p-5 transition-all duration-300 hover:-translate-y-1"
              onClick={() => setActiveItem(item)}
            >
              {/* Dark Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

              <div className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Category Pill on Image */}
              <div className="absolute top-3 left-3 z-20">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-amber-600 text-white px-2 py-0.5 rounded-md shadow-2xs">
                  <Tag className="w-2.5 h-2.5" />
                  <span>{item.category}</span>
                </span>
              </div>

              {/* Text Info */}
              <div className="relative z-20 space-y-1">
                <span className="text-[11px] font-semibold text-amber-300">
                  {item.project_name}
                </span>
                <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-xs text-white/70 line-clamp-1 pt-0.5">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={!!activeItem}
        onClose={() => setActiveItem(null)}
        maxWidth="2xl"
      >
        {activeItem && (
          <div className="space-y-5">
            <div className="aspect-video rounded-xl sm:rounded-2xl bg-[#071711] text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-3">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                {activeItem.category}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                {activeItem.title}
              </h3>
              <p className="text-xs text-white/70 mt-1 font-medium">
                Project Site: {activeItem.project_name}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-display text-sm font-bold text-charcoal">
                Project Scope & Timber Specification
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                {activeItem.description ||
                  "Supplied directly from bmtradingplc central yard with verified batch certificate and on-site contractor consultation."}
              </p>
            </div>

            <div className="pt-3 border-t border-cream-border/70 flex items-center justify-between gap-3">
              <Button
                href={`/quote?project=${encodeURIComponent(activeItem.project_name)}`}
                variant="amber"
                size="sm"
                className="font-bold"
              >
                Inquire on this Spec
              </Button>

              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="px-4 py-2 rounded-xl bg-cream-surface text-charcoal font-semibold text-xs hover:bg-cream-border transition-colors min-h-[40px]"
              >
                Close View
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
