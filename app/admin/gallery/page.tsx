"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Images, X, Tag } from "lucide-react";
import { useAdminData } from "@/lib/admin-store";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { GalleryItem } from "@/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function AdminGalleryPage({
  onOpenSidebar,
}: {
  onOpenSidebar?: () => void;
}) {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useAdminData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    project_name: "",
    category: "Commercial High-Rise",
    image_url: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=800",
    description: "",
    order_index: 0,
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      project_name: "",
      category: "Commercial High-Rise",
      image_url: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=800",
      description: "",
      order_index: gallery.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      project_name: item.project_name,
      category: item.category,
      image_url: item.image_url,
      description: item.description || "",
      order_index: item.order_index,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateGalleryItem(editingItem.id, {
        title: formData.title,
        project_name: formData.project_name,
        category: formData.category,
        image_url: formData.image_url,
        description: formData.description,
        order_index: Number(formData.order_index),
      });
    } else {
      addGalleryItem({
        title: formData.title,
        project_name: formData.project_name,
        category: formData.category,
        image_url: formData.image_url,
        description: formData.description,
        order_index: Number(formData.order_index),
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader
        title="Project Showcase & Jobsite Gallery"
        subtitle={`Managing ${gallery.length} verified project installation showcases`}
        onOpenSidebar={onOpenSidebar || (() => {})}
        action={
          <Button
            variant="amber"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={handleOpenCreate}
            className="font-bold text-xs"
          >
            Add Jobsite Showcase
          </Button>
        }
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-cream-border/90 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] w-full bg-charcoal">
                  <Image
                    src={item.image_url || "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=600"}
                    alt={item.title}
                    fill
                    sizes="350px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-amber-600 px-2 py-0.5 rounded shadow-2xs">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-xs font-semibold text-amber-300 block">
                      {item.project_name}
                    </span>
                    <h3 className="font-display font-bold text-base text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-2">
                    {item.description || "Project installation supplied by bmtradingplc."}
                  </p>
                </div>
              </div>

              <div className="p-3.5 border-t border-cream-border/70 bg-cream-surface/30 flex items-center justify-between">
                <span className="text-[10px] font-bold text-charcoal-muted">
                  Order Index: #{item.order_index}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete project "${item.title}"?`)) {
                        deleteGalleryItem(item.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cream-border">
            <h3 className="font-display text-base font-bold text-charcoal">
              {editingItem ? "Edit Project Showcase" : "Add Jobsite Showcase"}
            </h3>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="text-charcoal-subtle hover:text-charcoal p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-charcoal block">Showcase Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="e.g. Commercial Core Fair-Faced Formwork"
                className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-charcoal block">Project Site Name *</label>
              <input
                type="text"
                value={formData.project_name}
                onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                required
                placeholder="e.g. Commercial Tower, Bole Corridor"
                className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-charcoal block">Category Classification</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Commercial Formwork, Marine Vessel, Hospitality"
                className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-charcoal block">Image URL</label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://..."
                className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-charcoal block">Project Scope Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Describe panel application..."
                className="w-full p-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-charcoal block">Display Sort Order</label>
              <input
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: Number(e.target.value) })}
                className="w-24 h-9 px-3 bg-white rounded-xl border border-cream-border text-center font-bold"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-cream-border flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="amber" size="sm" className="font-bold">
              Save Showcase
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

