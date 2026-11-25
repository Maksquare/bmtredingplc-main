"use client";

import React, { useState, useMemo } from "react";
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  Building2,
  Truck,
  Trash2,
  Eye,
  X,
  Edit2,
  Printer,
  ChevronDown,
} from "lucide-react";
import { useAdminData } from "@/lib/admin-store";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Quote } from "@/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";

export default function AdminQuotesPage({
  onOpenSidebar,
}: {
  onOpenSidebar?: () => void;
}) {
  const { quotes, updateQuoteStatus, deleteQuote } = useAdminData();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  // Status edit state in modal
  const [editStatus, setEditStatus] = useState<Quote["status"]>("pending");
  const [editNotes, setEditNotes] = useState<string>("");

  const handleOpenDetail = (quote: Quote) => {
    setSelectedQuote(quote);
    setEditStatus(quote.status);
    setEditNotes(quote.notes || "");
  };

  const handleSaveDetail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuote) return;

    updateQuoteStatus(selectedQuote.id, editStatus, editNotes);

    setSelectedQuote(null);
  };

  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) => {
      const matchSearch =
        q.client_name.toLowerCase().includes(search.toLowerCase()) ||
        q.product_requested.toLowerCase().includes(search.toLowerCase()) ||
        q.client_phone.includes(search) ||
        q.client_email.toLowerCase().includes(search.toLowerCase()) ||
        (q.company_name && q.company_name.toLowerCase().includes(search.toLowerCase()));

      const matchStatus = statusFilter === "all" || q.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [quotes, search, statusFilter]);

  const statusBadges = {
    pending: { label: "Pending Review", class: "bg-amber-100 text-amber-800 border-amber-300" },
    reviewing: { label: "In Review", class: "bg-blue-100 text-blue-800 border-blue-300" },
    sent: { label: "Quote Sent", class: "bg-purple-100 text-purple-800 border-purple-300" },
    accepted: { label: "Accepted / Won", class: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    declined: { label: "Declined", class: "bg-red-100 text-red-800 border-red-300" },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader
        title="Contractor Quotes & RFQ Processing"
        subtitle={`Managing ${quotes.length} wholesale quotation requests across Ethiopia`}
        onOpenSidebar={onOpenSidebar || (() => {})}
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1">
        {/* Status Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {(["all", "pending", "reviewing", "sent", "accepted"] as const).map((st) => {
            const count = st === "all" ? quotes.length : quotes.filter((q) => q.status === st).length;
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
                  {st === "all" ? "All RFQs" : st}
                </span>
                <span className="font-display text-2xl font-extrabold mt-0.5 block">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Toolbar: Search */}
        <div className="bg-white rounded-2xl border border-cream-border/90 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-charcoal-subtle absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by client name, product, phone, or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 text-xs sm:text-sm bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal placeholder:text-charcoal-subtle focus:bg-white focus:border-amber-oak focus:outline-none transition-all"
            />
          </div>

          <div className="text-xs text-charcoal-muted">
            Showing <strong className="text-charcoal">{filteredQuotes.length}</strong> of {quotes.length} RFQs
          </div>
        </div>

        {/* Quotes List Table */}
        <div className="bg-white rounded-2xl border border-cream-border/90 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0B241B] text-white uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Contractor / Client</th>
                  <th className="py-3.5 px-4 font-bold">Requested Specification</th>
                  <th className="py-3.5 px-4 font-bold">Quantity</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold">Date Received</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-border/60">
                {filteredQuotes.map((q) => {
                  const badge = statusBadges[q.status] || {
                    label: q.status,
                    class: "bg-zinc-100 text-zinc-800",
                  };

                  return (
                    <tr key={q.id} className="hover:bg-cream-surface/30 transition-colors">
                      {/* Client info */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <span className="font-display font-bold text-sm text-charcoal block">
                            {q.client_name}
                          </span>
                          {q.company_name && (
                            <span className="text-[11px] font-semibold text-amber-700 block">
                              {q.company_name}
                            </span>
                          )}
                          <span className="text-[10px] text-charcoal-muted block">
                            {q.client_phone}
                          </span>
                        </div>
                      </td>

                      {/* Product */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <span className="font-semibold text-charcoal block line-clamp-2">
                          {q.product_requested}
                        </span>
                      </td>

                      {/* Quantity */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-charcoal block">
                          {q.quantity}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${badge.class}`}
                        >
                          {badge.label}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-charcoal-muted text-[11px]">
                        {new Date(q.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenDetail(q)}
                            className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 font-bold text-xs transition-colors"
                          >
                            Review
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete quote request from ${q.client_name}?`)) {
                                deleteQuote(q.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredQuotes.length === 0 && (
              <div className="p-8">
                <EmptyState
                  title="No Contractor RFQs Found"
                  description={
                    search || statusFilter !== "all"
                      ? "No quotes matched the current filter. Try resetting search parameters."
                      : "No customer quote requests have been received yet. They will appear here when contractors submit the RFQ wizard."
                  }
                  secondaryAction={
                    search || statusFilter !== "all"
                      ? {
                          label: "Reset Filter",
                          onClick: () => {
                            setSearch("");
                            setStatusFilter("all");
                          },
                        }
                      : undefined
                  }
                  compact
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quote Review / Processing Modal */}
      <Modal
        isOpen={!!selectedQuote}
        onClose={() => setSelectedQuote(null)}
        maxWidth="2xl"
      >
        {selectedQuote && (
          <form onSubmit={handleSaveDetail} className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-cream-border">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-oak block">
                  Quote ID: {selectedQuote.id}
                </span>
                <h3 className="font-display text-lg font-bold text-charcoal">
                  Quote Request Review
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedQuote(null)}
                className="text-charcoal-subtle hover:text-charcoal p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client Details Card */}
            <div className="p-4 rounded-xl bg-cream-surface/70 border border-cream-border space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-charcoal-muted block text-[10px]">Contractor / Representative:</span>
                  <strong className="text-charcoal text-sm">{selectedQuote.client_name}</strong>
                  {selectedQuote.company_name && (
                    <span className="text-amber-800 font-semibold block">{selectedQuote.company_name}</span>
                  )}
                </div>
                <div>
                  <span className="text-charcoal-muted block text-[10px]">Contact Actions:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <a
                      href={`tel:${selectedQuote.client_phone.replace(/\s+/g, "")}`}
                      className="px-2.5 py-1 rounded bg-white border border-cream-border text-forest font-bold hover:bg-forest hover:text-white transition-colors"
                    >
                      Call: {selectedQuote.client_phone}
                    </a>
                    <a
                      href={`https://wa.me/${selectedQuote.client_phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-emerald-700 text-white font-bold hover:bg-emerald-800 transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <span className="text-charcoal-muted block text-[10px]">Email:</span>
                <a href={`mailto:${selectedQuote.client_email}`} className="text-amber-800 font-semibold hover:underline">
                  {selectedQuote.client_email}
                </a>
              </div>
            </div>

            {/* Specifications Snapshot */}
            <div className="space-y-2 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-cream-border space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-muted block">
                  Material & Order Requirements:
                </span>
                <p className="font-bold text-sm text-charcoal">{selectedQuote.product_requested}</p>
                <div className="flex items-center justify-between text-xs text-charcoal pt-1">
                  <span>Quantity: <strong className="text-amber-800">{selectedQuote.quantity}</strong></span>
                  <span>Received: {new Date(selectedQuote.created_at).toLocaleString()}</span>
                </div>
              </div>

              {selectedQuote.notes && (
                <div className="p-3 rounded-xl bg-cream-surface/40 border border-cream-border text-xs text-charcoal-muted">
                  <span className="font-bold text-charcoal block mb-0.5">Contractor Project Notes:</span>
                  <p>{selectedQuote.notes}</p>
                </div>
              )}
            </div>

            {/* Status Update Section (Zero Pricing) */}
            <div className="space-y-3 pt-2 border-t border-cream-border text-xs">
              <h4 className="font-bold text-charcoal uppercase tracking-wider text-[11px]">
                Update Quote Status
              </h4>

              <div className="space-y-1">
                <label className="font-bold text-charcoal block">Quotation Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as Quote["status"])}
                  className="w-full h-10 px-3 bg-white rounded-xl border border-cream-border text-charcoal font-bold focus:border-amber-oak focus:outline-none"
                >
                  <option value="pending">Pending Review</option>
                  <option value="reviewing">In Review (Checking Stock)</option>
                  <option value="sent">Response Sent to Client</option>
                  <option value="accepted">Confirmed / Scheduled</option>
                  <option value="declined">Declined</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-charcoal block">Internal Logistics Notes</label>
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={2}
                  placeholder="e.g. Reserved bundle #412 at yard. Flatbed delivery scheduled for Thursday."
                  className="w-full p-2.5 bg-white rounded-xl border border-cream-border text-charcoal font-medium focus:border-amber-oak focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-cream-border flex items-center justify-between">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setSelectedQuote(null)}
              >
                Close
              </Button>
              <Button type="submit" variant="amber" size="sm" className="font-bold">
                Save & Update Quote
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

