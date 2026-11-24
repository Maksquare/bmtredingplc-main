"use client";

import React, { useState, useMemo } from "react";
import {
  Truck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Loader2,
  RefreshCw,
  ExternalLink,
  MapPin,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { useAdminData } from "@/lib/admin-store";
import { OrderStatus, Order } from "@/types";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/lib/toast-context";

const STATUS_OPTIONS: { id: string; label: string }[] = [
  { id: "all", label: "All Orders" },
  { id: "new", label: "New (Unconfirmed)" },
  { id: "confirmed", label: "Confirmed" },
  { id: "packed", label: "Packed" },
  { id: "dispatched", label: "Dispatched" },
  { id: "out_for_delivery", label: "Out for Delivery" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
];

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, currentRole } = useAdminData();
  const { showToast } = useToast();

  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [invoiceGeneratingId, setInvoiceGeneratingId] = useState<string | null>(null);
  const [conflictSimulatedOrder, setConflictSimulatedOrder] = useState<string | null>(null);

  const isReadOnly = currentRole === "viewer";

  // Filter pipeline
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchStatus =
        selectedStatus === "all" || order.status === selectedStatus;
      const q = searchQuery.trim().toLowerCase();
      const matchQuery =
        q === "" ||
        order.order_number.toLowerCase().includes(q) ||
        order.customer_name.toLowerCase().includes(q) ||
        (order.customer_company && order.customer_company.toLowerCase().includes(q)) ||
        order.destination.toLowerCase().includes(q) ||
        (order.tracking_number && order.tracking_number.toLowerCase().includes(q));

      return matchStatus && matchQuery;
    });
  }, [orders, selectedStatus, searchQuery]);

  // Status transition order
  const getNextStatus = (current: OrderStatus): OrderStatus | null => {
    switch (current) {
      case "new":
        return "confirmed";
      case "confirmed":
        return "packed";
      case "packed":
        return "dispatched";
      case "dispatched":
        return "out_for_delivery";
      case "out_for_delivery":
        return "delivered";
      default:
        return null;
    }
  };

  const handleAdvanceStatus = async (order: Order) => {
    if (isReadOnly) {
      showToast({
        type: "error",
        title: "Permission Denied",
        message: "Viewer role is restricted to read-only inspection.",
      });
      return;
    }

    const next = getNextStatus(order.status);
    if (!next) return;

    setUpdatingOrderId(order.id);
    await new Promise((r) => setTimeout(r, 600));

    updateOrderStatus(order.id, next);
    setUpdatingOrderId(null);

    showToast({
      type: "success",
      title: "Order Status Advanced",
      message: `${order.order_number} transitioned to "${next.replace("_", " ").toUpperCase()}".`,
    });
  };

  const handleGenerateInvoice = (orderId: string) => {
    setInvoiceGeneratingId(orderId);
    setTimeout(() => {
      setInvoiceGeneratingId(null);
      window.open("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "_blank");
      showToast({
        type: "success",
        title: "Proforma Invoice Ready",
        message: "Commercial PDF invoice generated and opened.",
      });
    }, 1000);
  };

  const handleSimulateConflict = (orderId: string) => {
    setConflictSimulatedOrder(orderId);
    showToast({
      type: "warning",
      title: "Concurrent Edit Conflict Detected",
      message: "Another yard manager updated this order dispatch record. Please reload state.",
    });
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Commercial Orders & Waybill Dispatch"
        subtitle="Manage end-to-end timber order workflow from proforma confirmation to jobsite delivery"
        onOpenSidebar={() => {}}
      />

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-cream-border shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-charcoal-subtle absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by Order #, contractor name, or project destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 text-xs sm:text-sm bg-cream-surface/60 rounded-xl border border-cream-border text-charcoal placeholder:text-charcoal-subtle focus:bg-white focus:border-amber-oak focus:outline-none"
            />
          </div>

          <div className="text-xs text-charcoal-muted">
            <span>Showing <strong className="text-charcoal">{filteredOrders.length}</strong> orders</span>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedStatus(opt.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedStatus === opt.id
                  ? "bg-forest text-white shadow-2xs"
                  : "bg-cream-surface/80 text-charcoal-muted hover:text-charcoal hover:bg-cream-surface border border-cream-border/70"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table & Responsive Mobile Cards */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const nextStatus = getNextStatus(order.status);
            const isUpdating = updatingOrderId === order.id;
            const isGenerating = invoiceGeneratingId === order.id;
            const hasConflict = conflictSimulatedOrder === order.id;

            return (
              <div
                key={order.id}
                className={`bg-white rounded-2xl border transition-all p-5 shadow-xs space-y-4 ${
                  hasConflict
                    ? "border-amber-400 bg-amber-50/20"
                    : "border-cream-border hover:border-cream-border/90"
                }`}
              >
                {/* Conflict Warning Banner if triggered */}
                {hasConflict && (
                  <div className="p-3 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>
                        <strong>State Conflict:</strong> This order was modified concurrently in Addis Ababa dispatch office.
                      </span>
                    </div>
                    <Button
                      variant="dark"
                      size="sm"
                      onClick={() => setConflictSimulatedOrder(null)}
                      className="text-xs py-1 h-7"
                    >
                      Reload Record
                    </Button>
                  </div>
                )}

                {/* Order Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cream-border/60 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-display font-extrabold text-sm sm:text-base text-charcoal">
                      {order.order_number}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        order.status === "delivered"
                          ? "bg-emerald-100 text-emerald-800"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status.replace("_", " ")}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        order.payment_status === "paid"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : order.payment_status === "unpaid"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-purple-50 text-purple-700 border border-purple-200"
                      }`}
                    >
                      Payment: {order.payment_status.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-display font-extrabold text-base text-forest">
                      {order.total_amount.toLocaleString()} ETB
                    </span>
                    <span className="text-[10px] text-charcoal-subtle block">
                      Ordered: {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Contractor & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-charcoal-subtle font-semibold block text-[10px] uppercase">
                      Client Contractor:
                    </span>
                    <span className="font-bold text-charcoal">{order.customer_name}</span>
                    <span className="text-charcoal-muted block">{order.customer_company}</span>
                    <span className="text-charcoal-subtle block font-mono text-[11px]">{order.customer_phone}</span>
                  </div>

                  <div>
                    <span className="text-charcoal-subtle font-semibold block text-[10px] uppercase">
                      Site Destination:
                    </span>
                    <span className="text-charcoal font-medium">{order.destination}</span>
                    <span className="text-[11px] text-forest font-bold block mt-0.5">
                      Zone: {order.destination_zone}
                    </span>
                  </div>

                  <div>
                    <span className="text-charcoal-subtle font-semibold block text-[10px] uppercase">
                      Waybill / Tracking:
                    </span>
                    <span className="font-mono font-bold text-charcoal">
                      {order.tracking_number || "Pending Dispatch"}
                    </span>
                    <span className="text-[11px] text-charcoal-muted block">
                      ETA: {order.estimated_delivery || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Items Summary Table */}
                <div className="bg-cream-surface/60 rounded-xl p-3 border border-cream-border/70 space-y-1.5 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-subtle block">
                    Timber Consignment Specifications:
                  </span>
                  <div className="space-y-1">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-charcoal-muted">
                        <span className="font-semibold text-charcoal">
                          • {it.product_name} ({it.thickness})
                        </span>
                        <span>
                          <strong>{it.quantity} sheets</strong> @ {it.unit_price?.toLocaleString()} ETB ={" "}
                          <strong className="text-forest">{it.total_price?.toLocaleString()} ETB</strong>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions Row */}
                <div className="pt-2 border-t border-cream-border/60 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleGenerateInvoice(order.id)}
                      isLoading={isGenerating}
                      loadingText="PDF..."
                      className="text-xs h-8"
                      leftIcon={<Download className="w-3.5 h-3.5" />}
                    >
                      Proforma PDF
                    </Button>

                    <button
                      type="button"
                      onClick={() => handleSimulateConflict(order.id)}
                      className="text-[11px] text-charcoal-subtle hover:text-amber-800 underline ml-2"
                      title="Test simultaneous admin write conflict state"
                    >
                      Simulate Conflict
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {nextStatus && (
                      <Button
                        variant="amber"
                        size="sm"
                        disabled={isReadOnly || hasConflict}
                        disabledReason={
                          isReadOnly
                            ? "Viewer role has read-only permission"
                            : hasConflict
                            ? "Resolve concurrent edit conflict before advancing"
                            : undefined
                        }
                        isLoading={isUpdating}
                        loadingText="Updating..."
                        onClick={() => handleAdvanceStatus(order)}
                        className="text-xs font-bold h-8"
                        rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                      >
                        Advance to {nextStatus.replace("_", " ")}
                      </Button>
                    )}

                    {order.status !== "cancelled" && order.status !== "delivered" && (
                      <button
                        type="button"
                        disabled={isReadOnly}
                        onClick={() => updateOrderStatus(order.id, "cancelled")}
                        className="text-xs font-semibold text-red-600 hover:text-red-800 p-1 disabled:opacity-40"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No Matching Orders Found"
          description={
            searchQuery
              ? `No active commercial orders matched "${searchQuery}". Clear your search query or reset status filters.`
              : "No commercial orders exist in this status category."
          }
          icon={Truck}
          badge="Zero Orders"
          primaryAction={{
            label: "Reset Status Filter",
            onClick: () => {
              setSelectedStatus("all");
              setSearchQuery("");
            },
          }}
        />
      )}
    </div>
  );
}
