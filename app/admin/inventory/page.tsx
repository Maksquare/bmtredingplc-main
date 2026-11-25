"use client";

import React, { useState } from "react";
import {
  Package,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  History,
  RotateCw,
  Plus,
  Minus,
  X,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { useAdminData } from "@/lib/admin-store";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/lib/toast-context";
import { InventoryAdjustment, Product } from "@/types";

export default function AdminInventoryPage() {
  const { products, inventoryAdjustments, adjustStock, currentRole } = useAdminData();
  const { showToast } = useToast();

  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [adjustDelta, setAdjustDelta] = useState<number>(0);
  const [adjustReason, setAdjustReason] = useState<InventoryAdjustment["reason"]>("Yard Recount");
  const [adjustNotes, setAdjustNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string>("");
  const [simulateSyncFail, setSimulateSyncFail] = useState(false);

  const isReadOnly = currentRole === "viewer";

  // Calculate summary stats
  const totalSheetsInYard = products.reduce((sum, p) => sum + (p.stock_quantity || 0), 0);
  const lowStockCount = products.filter(
    (p) => p.stock_status === "low_stock" || (typeof p.stock_quantity === "number" && p.stock_quantity <= 15 && p.stock_quantity > 0)
  ).length;
  const outOfStockCount = products.filter(
    (p) => p.stock_status === "out_of_stock" || p.stock_quantity === 0
  ).length;
  const inStockCount = products.filter(
    (p) => p.stock_status === "in_stock" || (typeof p.stock_quantity === "number" && p.stock_quantity > 15)
  ).length;

  const handleOpenAdjustModal = (product: Product) => {
    setSelectedProduct(product);
    setAdjustDelta(0);
    setAdjustReason("Yard Recount");
    setAdjustNotes("");
    setModalError("");
    setIsAdjustModalOpen(true);
  };

  const handleConfirmAdjustment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    if (isReadOnly) {
      showToast({
        type: "error",
        title: "Permission Denied",
        message: "Viewer role has read-only access.",
      });
      return;
    }

    if (adjustDelta === 0) {
      setModalError("Please enter a positive or negative adjustment delta.");
      return;
    }

    // Check for negative stock
    const current = selectedProduct.stock_quantity || 0;
    if (current + adjustDelta < 0) {
      setModalError(`Negative stock prohibited: Current balance is ${current}. Delta ${adjustDelta} would yield ${current + adjustDelta} sheets.`);
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    if (simulateSyncFail) {
      setIsSubmitting(false);
      setModalError("Supabase inventory sync failed. Network socket timeout to primary cluster.");
      showToast({
        type: "error",
        title: "Stock Update Failed",
        message: "Failed-sync state simulated. Click retry to re-attempt synchronization.",
      });
      return;
    }

    const res = await adjustStock(selectedProduct.id, adjustDelta, adjustReason, adjustNotes);
    setIsSubmitting(false);

    if (res.success) {
      setIsAdjustModalOpen(false);
      showToast({
        type: "success",
        title: "Yard Inventory Adjusted",
        message: `${selectedProduct.name} updated by ${adjustDelta > 0 ? `+${adjustDelta}` : adjustDelta} sheets.`,
      });
    } else if (res.error) {
      setModalError(res.error);
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Yard Inventory & Stock Management"
        subtitle="Live lumber quantities, stock adjustments, negative stock guards, and audit history"
        onOpenSidebar={() => {}}
      />

      {/* Top Inventory Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-cream-border shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-subtle block">
            Total Sheets in Yard
          </span>
          <span className="font-display font-black text-2xl sm:text-3xl text-forest mt-1 block">
            {totalSheetsInYard.toLocaleString()}
          </span>
          <span className="text-[10px] text-charcoal-muted mt-0.5 block">Werabe Factory &amp; Addis Stock</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-cream-border shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-subtle block">
            In-Stock Specs
          </span>
          <span className="font-display font-black text-2xl sm:text-3xl text-emerald-700 mt-1 block">
            {inStockCount}
          </span>
          <span className="text-[10px] text-emerald-800 mt-0.5 block">Ready for dispatch</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-cream-border shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-subtle block">
            Low Stock Alerts
          </span>
          <span className="font-display font-black text-2xl sm:text-3xl text-amber-600 mt-1 block">
            {lowStockCount}
          </span>
          <span className="text-[10px] text-amber-700 mt-0.5 block">&le; 15 sheets remaining</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-cream-border shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-subtle block">
            Out of Stock
          </span>
          <span className="font-display font-black text-2xl sm:text-3xl text-red-600 mt-1 block">
            {outOfStockCount}
          </span>
          <span className="text-[10px] text-red-700 mt-0.5 block">Consignment required</span>
        </div>
      </div>

      {/* Real-time Inventory Table */}
      <div className="bg-white rounded-2xl border border-cream-border shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-cream-border flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-display font-bold text-base text-charcoal">
              Live Timber Stock Levels
            </h3>
            <p className="text-xs text-charcoal-muted">
              Click &ldquo;Adjust Stock&rdquo; to log container intake, yard recounting, or jobsite damaged sheets.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 text-xs text-charcoal-subtle cursor-pointer select-none">
              <input
                type="checkbox"
                checked={simulateSyncFail}
                onChange={(e) => setSimulateSyncFail(e.target.checked)}
                className="accent-red-600 rounded"
              />
              <span>Simulate Failed-Sync State</span>
            </label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-surface/70 text-charcoal-subtle uppercase text-[10px] font-bold border-b border-cream-border">
              <tr>
                <th className="py-3 px-4">Plywood Specification</th>
                <th className="py-3 px-4">Brand / SKU</th>
                <th className="py-3 px-4">Thickness</th>
                <th className="py-3 px-4">Current Yard Balance</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-border/60">
              {products.map((prod) => {
                const stock = prod.stock_quantity ?? 0;
                const isOut = prod.stock_status === "out_of_stock" || stock === 0;
                const isLow = !isOut && (prod.stock_status === "low_stock" || stock <= 15);
                const isOver = stock > 500;

                return (
                  <tr key={prod.id} className="hover:bg-cream-surface/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-charcoal">
                      {prod.name}
                    </td>
                    <td className="py-3 px-4 text-charcoal-muted font-mono text-[11px]">
                      {prod.sku || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-charcoal-muted">
                      {prod.specs.thickness.split(",")[0].trim()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-display font-extrabold text-sm text-charcoal">
                        {stock.toLocaleString()} sheets
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                          isOut
                            ? "bg-red-100 text-red-800"
                            : isLow
                            ? "bg-amber-100 text-amber-800"
                            : isOver
                            ? "bg-blue-100 text-blue-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {isOut
                          ? "Out of Stock"
                          : isLow
                          ? "Low Stock (Reorder)"
                          : isOver
                          ? "Overstocked"
                          : "In Stock"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={isReadOnly}
                        disabledReason={isReadOnly ? "Viewer role is read-only" : undefined}
                        onClick={() => handleOpenAdjustModal(prod)}
                        className="text-xs h-8"
                      >
                        Adjust Stock
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Adjustment Audit Logs */}
      <div className="bg-white rounded-2xl border border-cream-border shadow-xs p-5 space-y-4">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-amber-oak" />
          <h3 className="font-display font-bold text-base text-charcoal">
            Recent Stock Adjustment Audit Trail
          </h3>
        </div>

        {inventoryAdjustments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-cream-surface/70 text-charcoal-subtle uppercase text-[10px] font-bold border-b border-cream-border">
                <tr>
                  <th className="py-2.5 px-3">Date & Time</th>
                  <th className="py-2.5 px-3">Product Spec</th>
                  <th className="py-2.5 px-3">Delta</th>
                  <th className="py-2.5 px-3">New Balance</th>
                  <th className="py-2.5 px-3">Reason</th>
                  <th className="py-2.5 px-3">Adjusted By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-border/60">
                {inventoryAdjustments.map((log) => (
                  <tr key={log.id} className="hover:bg-cream-surface/30">
                    <td className="py-2.5 px-3 text-charcoal-subtle">
                      {new Date(log.created_at).toLocaleDateString()} {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-charcoal truncate max-w-xs">
                      {log.product_name}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`font-bold flex items-center gap-1 ${
                          log.delta > 0 ? "text-emerald-700" : "text-red-700"
                        }`}
                      >
                        {log.delta > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {log.delta > 0 ? `+${log.delta}` : log.delta}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-charcoal">
                      {log.new_stock}
                    </td>
                    <td className="py-2.5 px-3 text-charcoal-muted">
                      <span className="px-2 py-0.5 rounded bg-cream-surface border text-[11px] font-medium">
                        {log.reason}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-charcoal-subtle">
                      {log.adjusted_by}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-charcoal-muted py-4 text-center">
            No stock adjustments recorded yet.
          </p>
        )}
      </div>

      {/* Stock Adjustment Modal */}
      {isAdjustModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-md w-full border border-cream-border p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-cream-border pb-3">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-oak" />
                <h3 className="font-display font-bold text-base text-charcoal">
                  Adjust Yard Inventory
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAdjustModalOpen(false)}
                className="p-1 rounded-lg hover:bg-cream-surface text-charcoal-subtle"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmAdjustment} className="space-y-4 text-xs">
              <div>
                <span className="text-charcoal-subtle block text-[10px] uppercase font-bold">
                  Target Product:
                </span>
                <span className="font-bold text-sm text-charcoal">{selectedProduct.name}</span>
                <span className="text-charcoal-muted block text-[11px]">
                  Current Yard Balance: <strong>{selectedProduct.stock_quantity ?? 0} sheets</strong>
                </span>
              </div>

              {/* Delta Input */}
              <div className="space-y-1">
                <label className="font-bold text-charcoal block">
                  Adjustment Quantity Delta (+ or - sheets):
                </label>
                <input
                  type="number"
                  required
                  value={adjustDelta || ""}
                  onChange={(e) => {
                    setAdjustDelta(parseInt(e.target.value) || 0);
                    if (modalError) setModalError("");
                  }}
                  placeholder="e.g. +50 for intake, -10 for damaged sheets..."
                  className="w-full h-10 px-3 rounded-xl border border-cream-border text-sm font-bold text-charcoal focus:border-amber-oak focus:outline-none"
                />
                <span className="text-[10px] text-charcoal-subtle block">
                  Projected Balance:{" "}
                  <strong>{(selectedProduct.stock_quantity ?? 0) + adjustDelta} sheets</strong>
                </span>
              </div>

              {/* Negative Stock Warning */}
              {(selectedProduct.stock_quantity ?? 0) + adjustDelta < 0 && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs flex items-start gap-1.5 font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                  <span>
                    Negative stock prohibited! Delta exceeds total available yard inventory.
                  </span>
                </div>
              )}

              {/* Reason Required Dropdown */}
              <div className="space-y-1">
                <label className="font-bold text-charcoal block">
                  Reason for Adjustment <span className="text-red-600">*</span>:
                </label>
                <select
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value as InventoryAdjustment["reason"])}
                  className="w-full h-10 px-3 rounded-xl border border-cream-border text-xs text-charcoal font-semibold focus:border-amber-oak focus:outline-none"
                >
                  <option value="Yard Recount">Yard Physical Recount / Audit</option>
                  <option value="Supplier Consignment">New Container Consignment Intake</option>
                  <option value="Direct Sale">Direct Yard Walk-in Sale</option>
                  <option value="Damage">Damaged / Water Impact Reject</option>
                  <option value="Return">Contractor Site Return</option>
                </select>
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="font-bold text-charcoal block">
                  Operational Reference / Waybill Notes (Optional):
                </label>
                <input
                  type="text"
                  value={adjustNotes}
                  onChange={(e) => setAdjustNotes(e.target.value)}
                  placeholder="e.g. Container dry port batch #992..."
                  className="w-full h-9 px-3 rounded-xl border border-cream-border text-xs text-charcoal focus:border-amber-oak focus:outline-none"
                />
              </div>

              {modalError && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-cream-border">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAdjustModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="amber"
                  size="sm"
                  isLoading={isSubmitting}
                  loadingText="Recording..."
                  disabled={(selectedProduct.stock_quantity ?? 0) + adjustDelta < 0 || adjustDelta === 0}
                >
                  Confirm Stock Change
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
