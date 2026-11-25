"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Star, Quote, X, CheckCircle2 } from "lucide-react";
import { useAdminData } from "@/lib/admin-store";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Testimonial } from "@/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PartnerLogoBadge } from "@/components/ui/PartnerLogoBadge";

export default function AdminTestimonialsPage({
  onOpenSidebar,
}: {
  onOpenSidebar?: () => void;
}) {
  const { testimonials, partners, addTestimonial, updateTestimonial, deleteTestimonial } = useAdminData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

  const [formData, setFormData] = useState({
    client_name: "",
    company: "",
    role: "",
    content: "",
    rating: 5,
    avatar_url: "",
    project_type: "",
    is_active: true,
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      client_name: "",
      company: "",
      role: "Operations Leadership",
      content: "",
      rating: 5,
      avatar_url: "",
      project_type: "Commercial & Furniture Supply",
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setEditingItem(t);
    setFormData({
      client_name: t.client_name,
      company: t.company,
      role: t.role,
      content: t.content,
      rating: t.rating,
      avatar_url: t.avatar_url || "",
      project_type: t.project_type || "",
      is_active: t.is_active,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      client_name: formData.client_name,
      company: formData.company,
      role: formData.role,
      content: formData.content,
      rating: Number(formData.rating),
      avatar_url: formData.avatar_url.trim() || undefined,
      project_type: formData.project_type,
      is_active: formData.is_active,
    };

    if (editingItem) {
      updateTestimonial(editingItem.id, payload);
    } else {
      addTestimonial(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader
        title="Verified Client Testimonials CMS"
        subtitle={`Managing ${testimonials.length} contractor reviews & project endorsements`}
        onOpenSidebar={onOpenSidebar || (() => {})}
        action={
          <Button
            variant="amber"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={handleOpenCreate}
            className="font-bold text-xs"
          >
            Add Testimonial
          </Button>
        }
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-cream-border/90 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      t.is_active
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    {t.is_active ? "Published" : "Hidden"}
                  </span>
                </div>

                {t.project_type && (
                  <span className="inline-block text-[10px] font-semibold text-forest bg-forest/5 px-2 py-0.5 rounded">
                    {t.project_type}
                  </span>
                )}

                <p className="text-xs text-charcoal-muted leading-relaxed italic">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-cream-border/70 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <PartnerLogoBadge
                    logoUrl={
                      t.avatar_url ||
                      partners.find(
                        (p) => p.name.toLowerCase() === t.company.toLowerCase()
                      )?.logo_url
                    }
                    name={t.company}
                    size="sm"
                  />
                  <div className="min-w-0">
                    <h4 className="font-display font-bold text-xs text-charcoal truncate">
                      {t.client_name}
                    </h4>
                    <p className="text-[10px] text-charcoal-muted truncate">
                      {t.role}, <strong className="text-charcoal">{t.company}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(t)}
                    className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete testimonial from "${t.client_name}"?`)) {
                        deleteTestimonial(t.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
              {editingItem ? "Edit Testimonial" : "Add Client Testimonial"}
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
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-charcoal block">Client / Engineer Name *</label>
                <input
                  type="text"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  required
                  placeholder="e.g. Eng. Dawit Haile"
                  className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-charcoal block">Company Organization *</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                  placeholder="e.g. MIDROC Investment Group"
                  className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-charcoal block">Company Logo Image Path / URL</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  placeholder="/images/partners/midroc.jpg"
                  className="flex-1 h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
                />
                <PartnerLogoBadge
                  logoUrl={formData.avatar_url}
                  name={formData.company || "Logo"}
                  size="sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-charcoal block">Role / Department</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Major Developments Division"
                  className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-charcoal block">Project Type Tag</label>
                <input
                  type="text"
                  value={formData.project_type}
                  onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                  placeholder="Commercial & Residential Developments"
                  className="w-full h-10 px-3 bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal font-medium focus:bg-white focus:border-amber-oak focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-charcoal block">Review / Endorsement Content *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                rows={4}
                placeholder="Share feedback on 18mm special plywood, Safarian board calibration, and dispatch reliability..."
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
                <span>Published on Public Website</span>
              </label>

              <div className="flex items-center gap-1.5">
                <label className="font-bold text-charcoal">Rating (Stars):</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="h-8 px-2 bg-white rounded-lg border border-cream-border font-bold text-charcoal"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                </select>
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
              Save Testimonial
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

