"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, Layers, Tag } from "lucide-react";
import { GalleryItem } from "@/types";
import { Modal } from "@/components/ui/Modal";

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
    <div className="space-y-8">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors capitalize ${
              selectedCategory === cat
                ? "bg-forest text-white shadow-sm"
                : "bg-white text-charcoal-muted hover:text-charcoal border border-cream-border hover:bg-cream-surface"
            }`}
          >
            {cat === "all" ? "All Project Sites" : cat}
          </button>
        ))}
      </div>

      {/* Masonry / Responsive Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-3xl bg-forest-dark text-white overflow-hidden shadow-sm hover:shadow-2xl border border-cream-border cursor-pointer aspect-[4/3] flex flex-col justify-end p-6 bg-dark-grain"
              onClick={() => setActiveItem(item)}
            >
              {/* Subtle background placeholder graphic */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-surface/80 to-transparent z-10" />

              <div className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Category Pill on Image */}
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-amber-oak text-white px-2.5 py-1 rounded-md shadow-sm">
                  <Tag className="w-3 h-3" />
                  <span>{item.category}</span>
                </span>
              </div>

              {/* Text Info */}
              <div className="relative z-20 space-y-1">
                <span className="text-xs font-medium text-amber-light/90">
                  {item.project_name}
                </span>
                <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-light transition-colors leading-snug">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-xs text-cream/70 line-clamp-1 pt-1">
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
          <div className="space-y-6">
            <div className="aspect-video rounded-2xl bg-forest-dark text-white flex flex-col items-center justify-center p-8 text-center relative overflow-hidden bg-dark-grain border border-forest-light/40">
              <div className="w-16 h-16 rounded-2xl bg-amber-oak/20 border border-amber-oak/40 flex items-center justify-center text-amber-light mb-4">
                <Layers className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-amber-light">
                {activeItem.category}
              </span>
              <h3 className="font-display text-2xl font-bold text-white mt-1">
                {activeItem.title}
              </h3>
              <p className="text-xs text-cream/75 mt-1 font-medium">
                Project: {activeItem.project_name}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-display text-base font-bold text-charcoal">
                Project Details & Panel Application
              </h4>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                {activeItem.description ||
                  "Supplied directly from bmtredingplc central warehouse with verified batch certificate and on-site engineering consultation."}
              </p>
            </div>

            <div className="pt-4 border-t border-cream-border flex justify-end">
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="px-5 py-2.5 rounded-xl bg-forest text-cream font-semibold text-xs hover:bg-forest-light transition-colors"
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

