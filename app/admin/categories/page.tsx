"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, FolderTree, X, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useAdminData } from "@/lib/admin-store";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Category } from "@/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function AdminCategoriesPage({
  onOpenSidebar,
}: {
  onOpenSidebar?: () => void;
}) {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useAdminData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image_url: "/images/products/plywood-18mm-special.jpg",
    order_index: 0,
    is_active: true,
  });

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      image_url: "/images/products/plywood-18mm-special.jpg",
      order_index: categories.length + 1,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image_url: cat.image_url,
      order_index: cat.order_index,
      is_active: cat.is_active,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const slug =
      formData.slug.trim() ||
      formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: formData.name,
        slug,
        description: formData.description,
        image_url: formData.image_url,
        order_index: Number(formData.order_index),
        is_active: formData.is_active,
      });
    } else {
      addCategory({
        name: formData.name,
        slug,
        description: formData.description,
        image_url: formData.image_url,
        order_index: Number(formData.order_index),
        is_active: formData.is_active,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader
        title="Product Categories Management"
        subtitle={`Organizing ${categories.length} timber classification lines`}
        onOpenSidebar={onOpenSidebar || (() => {})}
        action={
          <Button
            variant="amber"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={handleOpenCreate}
            className="font-bold text-xs"
          >
            New Category
          </Button>
        }
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const productCount = products.filter((p) => p.category_id === cat.id).length;

            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-cream-border/90 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category Image Preview */}
                  <div className="relative aspect-[16/9] w-full bg-charcoal">
                    <Image
                      src={cat.image_url || "/images/products/plywood-18mm-special.jpg"}
                      alt={cat.name}
                      fill
                      sizes="350px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
                        {productCount} Specs
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-display font-bold text-lg text-white">
                        {cat.name}
                      </h3>
                      <span className="text-[10px] text-amber-300 font-medium">
                        Slug: /{cat.slug}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-3">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 border-t border-cream-border/70 bg-cream-surface/30 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        cat.is_active ? "bg-emerald-500" : "bg-zinc-400"
                      }`}
                    />
                    <span className="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider">
                      {cat.is_active ? "Active" : "Hidden"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(cat)}
                      className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors"
                      title="Edit Category"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete category "${cat.name}"?`)) {
                          deleteCategory(cat.id);
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
            );
          })}
        </div>
      </div>

      {/* Category Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cream-border">
            <h3 className="font-display text-base font-bold text-charcoal">
              {editingCategory ? `Edit: ${editingCategory.name}` : "Create Category"}
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
              <label className="font-bold text-charcoal block">Category Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g. Safarian or Structural Plywood"
                className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-charcoal block">URL Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="e.g. marine-plywood (leave blank to auto-generate)"
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
              <label className="font-bold text-charcoal block">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Brief category scope..."
                className="w-full p-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-cream-surface/80 border border-cream-border">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-charcoal">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <span>Active & Visible in Catalog</span>
              </label>

              <div className="flex items-center gap-1.5">
                <label className="font-bold text-charcoal">Display Order:</label>
                <input
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: Number(e.target.value) })}
                  className="w-16 h-8 px-2 bg-white rounded-lg border border-cream-border text-center font-bold"
                />
              </div>
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
              Save Category
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

