"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Layers,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Plus,
  ArrowRight,
  Building2,
  Phone,
  HardDrive,
  Eye,
  ExternalLink,
  RotateCw,
  Calendar,
  Truck,
  Package,
} from "lucide-react";
import { useAdminData } from "@/lib/admin-store";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/Button";
import { AdminOnboardingTour } from "@/components/admin/AdminOnboardingTour";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/lib/toast-context";

export default function AdminDashboardPage({
  onOpenSidebar,
}: {
  onOpenSidebar?: () => void;
}) {
  const { products, categories, quotes, inquiries, partners } = useAdminData();
  const { showToast } = useToast();

  const [dateRange, setDateRange] = useState<"month" | "today" | "empty">("month");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("3 minutes ago");
  const [partialWidgetError, setPartialWidgetError] = useState(true);
  const [isRetryingWidget, setIsRetryingWidget] = useState(false);

  const pendingQuotes = quotes.filter((q) => q.status === "pending" || q.status === "reviewing");
  const newInquiries = inquiries.filter((i) => i.status === "new");
  const lowStockProducts = products.filter(
    (p) => p.stock_status === "low_stock" || (typeof p.stock_quantity === "number" && p.stock_quantity <= 15 && p.stock_quantity > 0)
  );

  const handleRefreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated("Just now");
      showToast({
        type: "success",
        title: "Dashboard Synchronized",
        message: "Live Supabase inventory and quotes refreshed successfully.",
      });
    }, 700);
  };

  const handleRetryWidget = () => {
    setIsRetryingWidget(true);
    setTimeout(() => {
      setIsRetryingWidget(false);
      setPartialWidgetError(false);
      showToast({
        type: "success",
        title: "Widget Reconnected",
        message: "Werabe production schedule telemetry synchronized.",
      });
    }, 900);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader
        title="Dashboard Overview"
        subtitle="Real-time timber wholesale inventory, contractor quotes, and lead pipeline"
        onOpenSidebar={onOpenSidebar || (() => {})}
        action={
          <div className="flex items-center gap-2">
            <Button
              href="/admin/products?action=new"
              variant="amber"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              className="text-xs font-bold"
            >
              Add Product
            </Button>
          </div>
        }
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 flex-1">
        {/* Date Range Selector & Stale Data Refresh Ticker */}
        <div className="bg-white p-4 rounded-2xl border border-cream-border/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-oak" />
            <span className="text-xs font-bold text-charcoal">Report Scope:</span>
            <div className="flex items-center gap-1 bg-cream-surface/80 p-1 rounded-xl border border-cream-border">
              {[
                { id: "month", label: "This Month (November 2026)" },
                { id: "today", label: "Today's Yard Operations" },
                { id: "empty", label: "Simulate Empty Range" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDateRange(tab.id as typeof dateRange)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    dateRange === tab.id
                      ? "bg-forest text-white shadow-2xs"
                      : "text-charcoal-muted hover:text-charcoal"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-charcoal-muted">
            <span className="text-[11px] text-charcoal-subtle">
              Data status: <strong>Last updated {lastUpdated}</strong>
            </span>
            <Button
              variant="outline"
              size="sm"
              isLoading={isRefreshing}
              loadingText="Syncing..."
              onClick={handleRefreshData}
              className="text-xs h-8 px-2.5"
              leftIcon={<RotateCw className="w-3.5 h-3.5" />}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Operational Alerts Bar: Low Stock */}
        {lowStockProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 flex items-start gap-3 shadow-2xs">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1 flex-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-900">
                    Low Stock Alert ({lowStockProducts.length} specifications)
                  </span>
                  <Link
                    href="/admin/inventory"
                    className="text-[11px] font-bold text-amber-900 underline hover:text-amber-950"
                  >
                    Open Inventory →
                  </Link>
                </div>
                <p className="text-amber-800 leading-relaxed text-[11px]">
                  {lowStockProducts.map((p) => `${p.name} (${p.stock_quantity} sheets)`).join(", ")}.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* First-Time User / Onboarding Milestone Guide */}
        <AdminOnboardingTour />

        {/* Empty Date Range Simulation State */}
        {dateRange === "empty" ? (
          <EmptyState
            title="No Commercial Activity in Selected Range"
            description="No quote requests or client inquiries occurred during this selected period."
            icon={Calendar}
            badge="0 Transactions"
            primaryAction={{
              label: "Reset to This Month",
              onClick: () => setDateRange("month"),
            }}
          />
        ) : (
          <>
            {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1. Quotes Pipeline */}
          <div className="bg-white rounded-2xl border border-cream-border/90 p-5 shadow-2xs hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted">
                Contractor RFQs
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-display text-3xl font-extrabold text-charcoal">
                {quotes.length}
              </span>
              {pendingQuotes.length > 0 && (
                <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                  {pendingQuotes.length} Action Needed
                </span>
              )}
            </div>
            <p className="text-xs text-charcoal-muted mt-2">
              Queue Status: <strong className="text-forest font-semibold">{quotes.length} Total Requests</strong>
            </p>
          </div>

          {/* 2. Active Inventory Specs */}
          <div className="bg-white rounded-2xl border border-cream-border/90 p-5 shadow-2xs hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted">
                Timber Products
              </span>
              <div className="w-9 h-9 rounded-xl bg-forest/10 text-forest flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-display text-3xl font-extrabold text-charcoal">
                {products.length}
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                {categories.length} Categories
              </span>
            </div>
            <p className="text-xs text-charcoal-muted mt-2">
              All specs calibrated with verified mill certificates
            </p>
          </div>

          {/* 3. Inquiries & Leads */}
          <div className="bg-white rounded-2xl border border-cream-border/90 p-5 shadow-2xs hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted">
                Client Inquiries
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-display text-3xl font-extrabold text-charcoal">
                {inquiries.length}
              </span>
              {newInquiries.length > 0 && (
                <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                  {newInquiries.length} Unread
                </span>
              )}
            </div>
            <p className="text-xs text-charcoal-muted mt-2">
              Web contact form and WhatsApp inquiries
            </p>
          </div>

          {/* 4. Featured Partner Companies */}
          <div className="bg-white rounded-2xl border border-cream-border/90 p-5 shadow-2xs hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted">
                Partner Companies
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-oak/10 text-amber-oak flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-display text-3xl font-extrabold text-charcoal">
                {partners.length}
              </span>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                200+ Clients
              </span>
            </div>
            <p className="text-xs text-charcoal-muted mt-2">
              MIDROC, Mina, Warit &amp; Classic Furniture
            </p>
          </div>
        </div>

        {/* Main Grid: Quotes Processing Feed & Side Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Recent Contractor Quotes Feed */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-cream-border/90 overflow-hidden shadow-2xs">
              <div className="p-4 sm:p-5 border-b border-cream-border/70 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-base sm:text-lg font-bold text-charcoal">
                    Recent Contractor Quotes (RFQs)
                  </h2>
                  <p className="text-xs text-charcoal-muted">
                    Formal quotation requests submitted by civil and commercial constructors
                  </p>
                </div>
                <Link
                  href="/admin/quotes"
                  className="text-xs font-bold text-forest hover:text-amber-oak transition-colors flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {quotes.length > 0 ? (
                <div className="divide-y divide-cream-border/60">
                  {quotes.slice(0, 5).map((quote) => {
                    const statusColors = {
                      pending: "bg-amber-100 text-amber-800 border-amber-300",
                      reviewing: "bg-blue-100 text-blue-800 border-blue-300",
                      sent: "bg-purple-100 text-purple-800 border-purple-300",
                      accepted: "bg-emerald-100 text-emerald-800 border-emerald-300",
                      declined: "bg-red-100 text-red-800 border-red-300",
                    };

                    return (
                      <div
                        key={quote.id}
                        className="p-4 sm:p-5 hover:bg-cream-surface/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-display font-bold text-sm text-charcoal">
                              {quote.client_name}
                            </span>
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                                statusColors[quote.status]
                              }`}
                            >
                              {quote.status}
                            </span>
                          </div>

                          <p className="text-xs text-charcoal font-medium truncate">
                            {quote.product_requested}
                          </p>

                          <div className="flex items-center gap-3 text-[11px] text-charcoal-muted flex-wrap">
                            <span>Qty: <strong className="text-charcoal">{quote.quantity}</strong></span>
                            <span>•</span>
                            <span>Phone: {quote.client_phone}</span>
                            <span>•</span>
                            <span>
                              {new Date(quote.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <Link
                            href={`/admin/quotes?id=${quote.id}`}
                            className="px-3 py-1.5 rounded-lg bg-cream-surface hover:bg-cream-border text-xs font-bold text-charcoal transition-colors"
                          >
                            Manage
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-charcoal-muted">
                  No quote requests logged yet.
                </div>
              )}
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white rounded-2xl border border-cream-border/90 p-5 shadow-2xs space-y-3.5">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-charcoal">
                Administrative Quick Shortcuts
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Link
                  href="/admin/products?action=new"
                  className="p-3 rounded-xl bg-cream-surface hover:bg-cream-border/80 transition-all text-center flex flex-col items-center gap-1.5 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-charcoal">New Product</span>
                </Link>

                <Link
                  href="/admin/quotes"
                  className="p-3 rounded-xl bg-cream-surface hover:bg-cream-border/80 transition-all text-center flex flex-col items-center gap-1.5 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-forest/10 text-forest flex items-center justify-center group-hover:scale-105 transition-transform">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-charcoal">Process RFQs</span>
                </Link>

                <Link
                  href="/admin/testimonials"
                  className="p-3 rounded-xl bg-cream-surface hover:bg-cream-border/80 transition-all text-center flex flex-col items-center gap-1.5 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-oak/10 text-amber-oak flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-charcoal">Testimonials</span>
                </Link>

                <Link
                  href="/admin/settings"
                  className="p-3 rounded-xl bg-cream-surface hover:bg-cream-border/80 transition-all text-center flex flex-col items-center gap-1.5 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-charcoal">Yard Settings</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiries & Categories Status */}
          <div className="lg:col-span-4 space-y-6">
            {/* Recent Contact Inquiries */}
            <div className="bg-white rounded-2xl border border-cream-border/90 overflow-hidden shadow-2xs">
              <div className="p-4 sm:p-5 border-b border-cream-border/70 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-charcoal">
                    Client Inquiries
                  </h3>
                  <span className="text-[11px] text-charcoal-muted">
                    Direct web messages & leads
                  </span>
                </div>
                <Link
                  href="/admin/inquiries"
                  className="text-xs font-bold text-forest hover:text-amber-oak transition-colors"
                >
                  View All
                </Link>
              </div>

              <div className="divide-y divide-cream-border/60">
                {inquiries.slice(0, 3).map((inq) => (
                  <div key={inq.id} className="p-4 space-y-1.5 hover:bg-cream-surface/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-charcoal truncate">
                        {inq.name}
                      </span>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          inq.status === "new"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-cream-surface text-charcoal-muted"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </div>

                    <p className="text-[11px] font-semibold text-amber-oak">
                      {inq.product} ({inq.quantity})
                    </p>

                    <p className="text-xs text-charcoal-muted line-clamp-2 leading-relaxed">
                      {inq.message}
                    </p>

                    <div className="pt-1 flex items-center justify-between text-[10px] text-charcoal-muted">
                      <span>{inq.phone}</span>
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 font-bold hover:underline"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inventory Distribution */}
            <div className="bg-white rounded-2xl border border-cream-border/90 p-5 shadow-2xs space-y-3.5">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-charcoal">
                Inventory Categories
              </h3>
              <div className="space-y-2.5">
                {categories.map((cat) => {
                  const count = products.filter((p) => p.category_id === cat.id).length;
                  const pct = Math.round((count / (products.length || 1)) * 100);

                  return (
                    <div key={cat.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-charcoal">
                        <span className="truncate">{cat.name}</span>
                        <span className="text-charcoal-muted">{count} specs</span>
                      </div>
                      <div className="h-1.5 w-full bg-cream-surface rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-600 rounded-full"
                          style={{ width: `${Math.max(pct, 12)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Partial Error Widget Demonstrator */}
            <div className="bg-white rounded-2xl border border-cream-border/90 p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-oak" />
                  <h3 className="font-display text-sm font-bold text-charcoal">
                    Dry Port Telemetry Widget
                  </h3>
                </div>
                <span className="text-[10px] text-charcoal-subtle">Simulated Partial Error</span>
              </div>

              {partialWidgetError ? (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Widget Connection Timeout</span>
                  </div>
                  <p className="text-[11px] text-red-700 leading-tight">
                    Werabe factory dispatch schedule feed temporarily unreachable. Rest of dashboard remains operational.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    isLoading={isRetryingWidget}
                    loadingText="Retrying widget..."
                    onClick={handleRetryWidget}
                    className="text-xs h-7 px-2.5 border-red-300 text-red-800 hover:bg-red-100"
                    leftIcon={<RotateCw className="w-3 h-3" />}
                  >
                    Retry Just This Widget
                  </Button>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-900">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Werabe Factory Sync: Online</span>
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    Safarian (03–12mm) &amp; Plywood (16mm / 18mm Special Product) inventory live.
                  </p>
                </div>
              )}
            </div>

            {/* Storage & Database Health Box */}
            <div className="bg-[#0B241B] text-white rounded-2xl p-5 border border-white/15 space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <HardDrive className="w-4 h-4" />
                <span>System Architecture Status</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                PostgreSQL schema ready with Row-Level Security (RLS) policies. Local storage sync is active.
              </p>
              <div className="pt-1 text-[11px] text-white/60 space-y-1">
                <div className="flex justify-between">
                  <span>Database:</span>
                  <strong className="text-emerald-400">PostgreSQL / Supabase</strong>
                </div>
                <div className="flex justify-between">
                  <span>File Storage:</span>
                  <strong className="text-emerald-400">Disk + Upload Engine</strong>
                </div>
                <div className="flex justify-between">
                  <span>Current Version:</span>
                  <strong className="text-white">v2.4 Enterprise</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}

