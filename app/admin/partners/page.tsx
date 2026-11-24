"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Building2, X, ExternalLink } from "lucide-react";
import { useAdminData } from "@/lib/admin-store";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Partner } from "@/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function AdminPartnersPage({
  onOpenSidebar,
}: {
  onOpenSidebar?: () => void;
}) {
  const { partners, addPartner, updatePartner, deletePartner } = useAdminData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "General Contractor Grade 1",
    initials: "",
    website_url: "",
    order_index: 0,
  });

  const handleOpenCreate = () => {
    setEditingPartner(null);
    setFormData({
      name: "",
      category: "General Contractor Grade 1",
      initials: "",
      website_url: "",
      order_index: partners.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Partner) => {
    setEditingPartner(p);
    setFormData({
      name: p.name,
      category: p.category || "General Contractor Grade 1",
      initials: p.initials || "",
      website_url: p.website_url || "",
      order_index: p.order_index,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const initials =
      formData.initials.trim() ||
      formData.name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 3)
        .join("")
        .toUpperCase();

    if (editingPartner) {
      updatePartner(editingPartner.id, {
        name: formData.name,
        category: formData.category,
        initials,
        website_url: formData.website_url,
        order_index: Number(formData.order_index),
      });
    } else {
      addPartner({
        name: formData.name,
        category: formData.category,
        initials,
        website_url: formData.website_url,
        order_index: Number(formData.order_index),
        is_active: true,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader
        title="Client Partners & Contractor Marquee"
        subtitle={`Managing ${partners.length} commercial contractors and developer partners`}
        onOpenSidebar={onOpenSidebar || (() => {})}
        action={
          <Button
            variant="amber"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={handleOpenCreate}
            className="font-bold text-xs"
          >
            Add Partner
          </Button>
        }
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-2xl border border-cream-border/90 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-forest text-amber-300 font-display font-black text-sm flex items-center justify-center shrink-0 border border-white/10 shadow-xs">
                  {partner.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-sm text-charcoal truncate">
                    {partner.name}
                  </h3>
                  <span className="text-[11px] text-charcoal-muted truncate block">
                    {partner.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(partner)}
                  className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Remove partner "${partner.name}"?`)) {
                      deletePartner(partner.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cream-border">
            <h3 className="font-display text-base font-bold text-charcoal">
              {editingPartner ? "Edit Partner" : "Add Contractor Partner"}
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
              <label className="font-bold text-charcoal block">Company Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g. MIDROC Investment Group"
                className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-charcoal block">Business Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. General Contractor Grade 1"
                className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-charcoal block">Monogram Initials (2-3 chars)</label>
              <input
                type="text"
                value={formData.initials}
                onChange={(e) => setFormData({ ...formData, initials: e.target.value })}
                placeholder="e.g. MIG (leave blank to auto-generate)"
                className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none uppercase"
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
              Save Partner
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

