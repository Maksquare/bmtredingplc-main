"use client";

import React, { useState, useMemo } from "react";
import {
  Users,
  Search,
  ShieldAlert,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  CheckCircle2,
  X,
  AlertTriangle,
  Lock,
  Unlock,
} from "lucide-react";
import { useAdminData } from "@/lib/admin-store";
import { Customer, CustomerStatus } from "@/types";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/lib/toast-context";

const STATUS_FILTERS: { id: string; label: string }[] = [
  { id: "all", label: "All Customers" },
  { id: "active", label: "Active" },
  { id: "returning", label: "Key Accounts (Returning)" },
  { id: "new", label: "New Leads" },
  { id: "blocked", label: "Blocked" },
];

export default function AdminCustomersPage() {
  const { customers, updateCustomerStatus, currentRole } = useAdminData();
  const { showToast } = useToast();

  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [targetCustomer, setTargetCustomer] = useState<Customer | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const isReadOnly = currentRole === "viewer";

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchFilter = selectedFilter === "all" || c.status === selectedFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        q === "" ||
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q);

      return matchFilter && matchSearch;
    });
  }, [customers, selectedFilter, searchQuery]);

  const handleOpenBlockToggle = (customer: Customer) => {
    if (isReadOnly) {
      showToast({
        type: "error",
        title: "Permission Denied",
        message: "Viewer role cannot modify customer credit statuses.",
      });
      return;
    }
    setTargetCustomer(customer);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmToggle = () => {
    if (!targetCustomer) return;

    const newStatus: CustomerStatus = targetCustomer.status === "blocked" ? "active" : "blocked";
    updateCustomerStatus(targetCustomer.id, newStatus);
    setIsConfirmModalOpen(false);

    showToast({
      type: newStatus === "blocked" ? "warning" : "success",
      title: newStatus === "blocked" ? "Contractor Account Blocked" : "Contractor Account Unblocked",
      message: `${targetCustomer.company} (${targetCustomer.name}) is now ${newStatus}.`,
    });
    setTargetCustomer(null);
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Contractor & Customer Accounts"
        subtitle="Manage certified construction accounts, credit clearance, and order histories"
        onOpenSidebar={() => {}}
      />

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-cream-border shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-charcoal-subtle absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by engineer name, construction company, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 text-xs sm:text-sm bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal placeholder:text-charcoal-subtle focus:bg-white focus:border-amber-oak focus:outline-none"
            />
          </div>

          <div className="text-xs text-charcoal-muted">
            <span>Showing <strong className="text-charcoal">{filteredCustomers.length}</strong> clients</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedFilter === f.id
                  ? "bg-forest text-white shadow-2xs"
                  : "bg-cream-surface/80 text-charcoal-muted hover:text-charcoal hover:bg-cream-surface border border-cream-border/70"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Customer List */}
      {filteredCustomers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((cust) => {
            const isBlocked = cust.status === "blocked";

            return (
              <div
                key={cust.id}
                className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between space-y-4 transition-all ${
                  isBlocked
                    ? "border-red-300 bg-red-50/20"
                    : "border-cream-border hover:border-amber-oak/50"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-display font-bold text-base text-charcoal">
                        {cust.name}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-forest font-semibold mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-amber-oak" />
                        <span>{cust.company}</span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                        isBlocked
                          ? "bg-red-100 text-red-800"
                          : cust.status === "returning"
                          ? "bg-purple-100 text-purple-800"
                          : cust.status === "new"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {cust.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-charcoal-muted pt-1">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-charcoal-subtle" />
                      <span className="truncate">{cust.email}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <Phone className="w-3.5 h-3.5 text-charcoal-subtle" />
                      <span>{cust.phone}</span>
                    </div>
                  </div>

                  {/* Client Partner Status Metric (Zero Billing) */}
                  <div className="p-3 rounded-xl bg-cream-surface/60 border border-cream-border/70 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] uppercase text-charcoal-subtle font-semibold block">
                        Supply Line
                      </span>
                      <span className="font-display font-extrabold text-charcoal text-sm">
                        Safarian &amp; Plywood
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-charcoal-subtle font-semibold block">
                        Partner Status
                      </span>
                      <span className="font-display font-extrabold text-forest text-sm capitalize">
                        {cust.status === "returning" ? "Recurring Partner" : cust.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-cream-border/60 flex items-center justify-between">
                  <span className="text-[10px] text-charcoal-subtle">
                    Registered: {new Date(cust.created_at).toLocaleDateString()}
                  </span>

                  <button
                    type="button"
                    disabled={isReadOnly}
                    onClick={() => handleOpenBlockToggle(cust)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors disabled:opacity-40 ${
                      isBlocked
                        ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-red-50 hover:bg-red-100 text-red-700 border border-red-300"
                    }`}
                  >
                    {isBlocked ? (
                      <>
                        <Unlock className="w-3 h-3" />
                        <span>Unblock Account</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3" />
                        <span>Block Account</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No Customers Found"
          description={
            searchQuery
              ? `No contractor accounts matched "${searchQuery}". Reset filters to see all accounts.`
              : "No contractor accounts match this filter status."
          }
          icon={Users}
          badge="Zero Results"
          primaryAction={{
            label: "Reset Filter",
            onClick: () => {
              setSelectedFilter("all");
              setSearchQuery("");
            },
          }}
        />
      )}

      {/* Confirmation Modal */}
      {isConfirmModalOpen && targetCustomer && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-md w-full border border-cream-border p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 text-center">
            <div
              className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center ${
                targetCustomer.status === "blocked"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-bold text-lg text-charcoal">
                {targetCustomer.status === "blocked"
                  ? "Unblock Contractor Account?"
                  : "Block Contractor Credit Account?"}
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {targetCustomer.status === "blocked"
                  ? `Restore direct supply coordination and quote access for ${targetCustomer.company}?`
                  : `Blocking ${targetCustomer.company} will suspend new quote processing and dispatch scheduling.`}
              </p>
            </div>

            <div className="flex gap-2 justify-center pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsConfirmModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant={targetCustomer.status === "blocked" ? "primary" : "danger"}
                size="sm"
                onClick={handleConfirmToggle}
              >
                Confirm {targetCustomer.status === "blocked" ? "Unblock" : "Block"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
