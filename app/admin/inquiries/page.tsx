"use client";

import React, { useState, useMemo } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  Phone,
  Mail,
  CheckCircle2,
  Trash2,
  Edit2,
  X,
  ExternalLink,
} from "lucide-react";
import { useAdminData } from "@/lib/admin-store";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Inquiry } from "@/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function AdminInquiriesPage({
  onOpenSidebar,
}: {
  onOpenSidebar?: () => void;
}) {
  const { inquiries, updateInquiryStatus, deleteInquiry } = useAdminData();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const [editStatus, setEditStatus] = useState<Inquiry["status"]>("new");
  const [editNotes, setEditNotes] = useState<string>("");

  const handleOpenDetail = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setEditStatus(inq.status);
    setEditNotes(inq.notes || "");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry) return;
    updateInquiryStatus(selectedInquiry.id, editStatus, editNotes);
    setSelectedInquiry(null);
  };

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchSearch =
        inq.name.toLowerCase().includes(search.toLowerCase()) ||
        inq.product.toLowerCase().includes(search.toLowerCase()) ||
        inq.email.toLowerCase().includes(search.toLowerCase()) ||
        inq.phone.includes(search) ||
        (inq.company && inq.company.toLowerCase().includes(search.toLowerCase()));

      const matchStatus = statusFilter === "all" || inq.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [inquiries, search, statusFilter]);

  const statusColors = {
    new: "bg-blue-100 text-blue-800 border-blue-300",
    contacted: "bg-amber-100 text-amber-800 border-amber-300",
    quoted: "bg-purple-100 text-purple-800 border-purple-300",
    won: "bg-emerald-100 text-emerald-800 border-emerald-300",
    lost: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader
        title="Customer Inquiries & Messages"
        subtitle={`Managing ${inquiries.length} customer messages and project leads`}
        onOpenSidebar={onOpenSidebar || (() => {})}
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1">
        {/* Status Filters Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {(["all", "new", "contacted", "quoted", "won"] as const).map((st) => {
            const count = st === "all" ? inquiries.length : inquiries.filter((i) => i.status === st).length;
            const isSelected = statusFilter === st;

            return (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "bg-forest text-white border-forest shadow-sm"
                    : "bg-white text-charcoal border-cream-border/90 hover:bg-cream-surface/60"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
                  {st === "all" ? "All Messages" : st}
                </span>
                <span className="font-display text-2xl font-extrabold mt-0.5 block">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-cream-border/90 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-charcoal-subtle absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, company, email, product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 text-xs sm:text-sm bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal placeholder:text-charcoal-subtle focus:bg-white focus:border-amber-oak focus:outline-none transition-all"
            />
          </div>
          <div className="text-xs text-charcoal-muted">
            Showing <strong className="text-charcoal">{filteredInquiries.length}</strong> inquiries
          </div>
        </div>

        {/* Inquiries Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-white rounded-2xl border border-cream-border/90 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display font-bold text-sm text-charcoal">
                      {inq.name}
                    </h3>
                    {inq.company && (
                      <span className="text-[11px] font-semibold text-amber-700 block">
                        {inq.company}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      statusColors[inq.status]
                    }`}
                  >
                    {inq.status}
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-cream-surface text-xs font-semibold text-charcoal">
                  <span>Product: </span>
                  <strong className="text-forest">{inq.product}</strong>
                  <span className="text-charcoal-muted"> ({inq.quantity})</span>
                </div>

                <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-3">
                  &ldquo;{inq.message}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-cream-border/70 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-charcoal-muted">
                  <span>{inq.phone}</span>
                  <span>{new Date(inq.created_at).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${inq.phone.replace(/\s+/g, "")}`}
                      className="px-2.5 py-1 rounded bg-cream-surface text-forest font-bold text-xs hover:bg-forest hover:text-white transition-colors"
                      title="Call"
                    >
                      Call
                    </a>
                    <a
                      href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-colors"
                      title="WhatsApp"
                    >
                      WhatsApp
                    </a>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenDetail(inq)}
                      className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors"
                      title="Update Status / Notes"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete message from ${inq.name}?`)) {
                          deleteInquiry(inq.id);
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
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      <Modal
        isOpen={!!selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        maxWidth="lg"
      >
        {selectedInquiry && (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-cream-border">
              <h3 className="font-display text-base font-bold text-charcoal">
                Manage Lead: {selectedInquiry.name}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="text-charcoal-subtle hover:text-charcoal p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-cream-surface/70 border border-cream-border space-y-1">
                <span className="font-bold text-charcoal block">Original Message:</span>
                <p className="text-charcoal-muted leading-relaxed">{selectedInquiry.message}</p>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-charcoal block">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as Inquiry["status"])}
                  className="w-full h-10 px-3 bg-white rounded-xl border border-cream-border font-bold text-charcoal focus:border-amber-oak focus:outline-none"
                >
                  <option value="new">New (Uncontacted)</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted / Sent Specs</option>
                  <option value="won">Won / Converted to Sale</option>
                  <option value="lost">Lost</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-charcoal block">Sales Follow-up Notes</label>
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={3}
                  placeholder="e.g. Discussed 600 sheets with procurement manager. Sample delivered to site."
                  className="w-full p-2.5 bg-white rounded-xl border border-cream-border text-charcoal font-medium focus:border-amber-oak focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-cream-border flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setSelectedInquiry(null)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="amber" size="sm" className="font-bold">
                Update Status
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

