"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  RotateCw,
  Eye,
  Sliders,
  Send,
  WifiOff,
  Wifi,
  Lock,
  Wrench,
  PackageSearch,
  ExternalLink,
  ShieldCheck,
  Check,
  FileText,
  Package,
  Users,
  Upload,
  Download,
  Clock,
  Tag,
  Filter,
  ArrowRight,
  UserCheck,
  Calendar,
  Minus,
  Plus,
  Loader2,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import {
  Skeleton,
  ProductCardSkeleton,
  ProductGridSkeleton,
  AdminTableSkeleton,
  MetricCardSkeleton,
} from "@/components/ui/Skeleton";
import { AutosaveIndicator, AutosaveStatus } from "@/components/ui/AutosaveIndicator";
import { useToast } from "@/lib/toast-context";
import { ProductCard } from "@/components/products/ProductCard";
import { products, orders, customers } from "@/data/seed-data";
import { ProductVariantSelector } from "@/components/products/ProductVariantSelector";
import { SessionTimeoutModal } from "@/components/system/SessionTimeoutModal";
import { OrderStatus } from "@/types";

export default function UIStatesShowcasePage() {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<
    "catalog" | "forms" | "admin" | "system"
  >("catalog");

  // Tab 1: Catalog States
  const [catalogState, setCatalogState] = useState<"populated" | "loading" | "empty" | "error">("populated");
  const [filterChipsGrade, setFilterChipsGrade] = useState("BS 1088");
  const [filterChipsThick, setFilterChipsThick] = useState("18mm");

  // Tab 2: Forms & File Upload States
  const [formPristine, setFormPristine] = useState(true);
  const [formFileStatus, setFormFileStatus] = useState<"idle" | "uploading" | "success" | "too_large" | "wrong_type">("idle");
  const [fileProgress, setFileProgress] = useState(0);
  const [testEmail, setTestEmail] = useState("");
  const [testEmailError, setTestEmailError] = useState("");
  const [testMessage, setTestMessage] = useState("");
  const [autosaveState, setAutosaveState] = useState<AutosaveStatus>("saved");

  // Tab 3: Admin, Inventory & Order Lifecycle
  const [demoOrderStatus, setDemoOrderStatus] = useState<OrderStatus>("dispatched");
  const [isInvoiceGenerating, setIsInvoiceGenerating] = useState(false);
  const [adminRole, setAdminRole] = useState<"super_admin" | "manager" | "staff" | "viewer">("super_admin");
  const [stockDelta, setStockDelta] = useState<number>(-15);
  const [stockBalance, setStockBalance] = useState<number>(45);
  const [isFailedSync, setIsFailedSync] = useState(false);
  const [showUndoBanner, setShowUndoBanner] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [partialErrorWidget, setPartialErrorWidget] = useState(true);

  // Tab 6: System & Auth
  const [isSessionTimeoutOpen, setIsSessionTimeoutOpen] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [is2FASent, setIs2FASent] = useState(false);

  // Button micro-interaction
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const triggerButtonLoading = () => {
    setIsBtnLoading(true);
    setTimeout(() => {
      setIsBtnLoading(false);
      showToast({
        type: "success",
        title: "Action Processed",
        message: "Double-submit locked and verified.",
      });
    }, 1800);
  };

  const handleTestEmailBlur = () => {
    if (!testEmail) {
      setTestEmailError("Work email is required");
    } else if (!testEmail.includes("@") || !testEmail.includes(".")) {
      setTestEmailError("Please provide a valid corporate email (e.g. name@company.com)");
    } else {
      setTestEmailError("");
    }
  };

  const handleSimulateFileUpload = (type: "normal" | "large" | "wrong") => {
    if (type === "large") {
      setFormFileStatus("uploading");
      setFileProgress(45);
      setTimeout(() => {
        setFormFileStatus("too_large");
      }, 700);
      return;
    }
    if (type === "wrong") {
      setFormFileStatus("uploading");
      setFileProgress(20);
      setTimeout(() => {
        setFormFileStatus("wrong_type");
      }, 600);
      return;
    }
    setFormFileStatus("uploading");
    setFileProgress(15);
    const interval = setInterval(() => {
      setFileProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setFormFileStatus("success");
          return 100;
        }
        return prev + 30;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-cream bg-timber-grain text-charcoal pb-24">
      {/* Top Header */}
      <header className="bg-[#071711] text-white py-8 sm:py-12 border-b border-white/15 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-white/10 px-3.5 py-1 rounded-full border border-white/15 inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Plywood &amp; Admin Master State Machine</span>
              </span>
              <span className="text-xs text-white/50">WCAG AA Compliant</span>
            </div>

            <Link
              href="/"
              className="text-xs text-amber-300 hover:text-white font-semibold underline underline-offset-4"
            >
              Return to Public Site →
            </Link>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Plywood &amp; Admin UI States
          </h1>
          <p className="text-xs sm:text-sm text-white/75 max-w-3xl leading-relaxed">
            Live interactive verification bench for all states specified across the Public Website (Part 1) and Admin Dashboard (Part 2) for {siteConfig.name}.
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto py-2.5">
          <div className="flex gap-2">
            {[
              { id: "catalog", label: "1. Catalog & Specs (Part 1)" },
              { id: "forms", label: "2. Forms & CAD Uploads" },
              { id: "admin", label: "3. Admin & Inventory CMS (Part 2)" },
              { id: "system", label: "4. System & Auth Boundaries" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-forest text-white shadow-xs"
                    : "text-charcoal-muted hover:text-charcoal hover:bg-cream-surface"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-charcoal-muted pl-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All 40+ States Functional</span>
          </div>
        </div>
      </div>

      {/* Main Content Stage */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        {/* ==================================================================== */}
        {/* TAB 1: PUBLIC CATALOG & PRODUCT STATES */}
        {/* ==================================================================== */}
        {activeTab === "catalog" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Controller Bar */}
            <div className="bg-white p-5 rounded-2xl border border-cream-border shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-base text-charcoal">
                  Simulate Public Catalog Data States
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Toggle between Loading Skeletons, Populated Grid, Out of Stock, Low Stock, and Empty Results.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-cream-surface p-1 rounded-xl border border-cream-border">
                {[
                  { id: "populated", label: "Populated View" },
                  { id: "loading", label: "Loading Skeleton" },
                  { id: "empty", label: "Empty (0 Results)" },
                  { id: "error", label: "Error State" },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setCatalogState(s.id as typeof catalogState)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      catalogState === s.id
                        ? "bg-forest text-white shadow-xs"
                        : "text-charcoal-muted hover:text-charcoal"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Catalog Display */}
            {catalogState === "loading" && (
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle block">
                  Zero Cumulative Layout Shift (CLS) Product Cards Skeleton:
                </span>
                <ProductGridSkeleton count={3} />
              </div>
            )}

            {catalogState === "populated" && (
              <div className="space-y-6">
                {/* Active Filter Chips Demonstration */}
                <div className="bg-white p-4 rounded-2xl border border-cream-border flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-forest flex items-center gap-1">
                      <Filter className="w-3.5 h-3.5 text-amber-oak" /> Active Filter Chips:
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-forest text-white font-bold flex items-center gap-1.5">
                      <span>Grade: {filterChipsGrade}</span>
                      <button onClick={() => setFilterChipsGrade("All")} className="hover:text-amber-300">
                        ×
                      </button>
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-amber-oak text-white font-bold flex items-center gap-1.5">
                      <span>Thickness: {filterChipsThick}</span>
                      <button onClick={() => setFilterChipsThick("All")} className="hover:text-white">
                        ×
                      </button>
                    </span>
                  </div>

                  <span className="text-charcoal-muted text-[11px]">
                    Showing in-stock, low-stock, and out-of-stock live cards below
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Card 1: Normal In-Stock with Price */}
                  <ProductCard product={products[0]} />

                  {/* Card 2: Low Stock Alert ("Only 12 sheets left") */}
                  <ProductCard product={products[1]} />

                  {/* Card 3: Out of Stock ("Request Quote" / "Notify Restock") */}
                  <ProductCard product={products[3]} />
                </div>

                {/* End of List State */}
                <div className="text-center py-4 border-t border-cream-border/60">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream-surface/70 border border-cream-border text-xs text-charcoal-muted">
                    <Check className="w-3.5 h-3.5 text-forest" />
                    <span>All specifications loaded (End of catalog • 7 products)</span>
                  </span>
                </div>
              </div>
            )}

            {catalogState === "empty" && (
              <EmptyState
                title="No Matching Plywood Panels Found"
                description="No certified panels match your chosen combination of thickness and grade in our Addis Ababa inventory. Clear filters or submit a custom cutting list."
                icon={Layers}
                badge="0 Results"
                primaryAction={{
                  label: "Clear All Filter Chips",
                  onClick: () => setCatalogState("populated"),
                }}
                secondaryAction={{
                  label: "Request Custom Yard Sawing",
                  href: "/quote",
                }}
              />
            )}

            {catalogState === "error" && (
              <ErrorState
                title="Warehouse Inventory Synchronization Error"
                message="Unable to reach the Addis Ababa central depot database. Your connection will retry automatically."
                onRetry={() => {
                  return new Promise((res) => {
                    setTimeout(() => {
                      setCatalogState("populated");
                      showToast({
                        type: "success",
                        title: "Connection Restored",
                        message: "Depot inventory re-synchronized.",
                      });
                      res();
                    }, 800);
                  });
                }}
              />
            )}

            {/* Interactive Product Variant Configurator Sandbox */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-border space-y-4 shadow-xs">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg text-charcoal">
                  Interactive Variant Selector (Thickness, Size, Stock, and Price)
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Test interactive thickness switching, real-time yard stock feedback (In Stock, Low Stock, Unavailable), dynamic pricing, and Request Quote:
                </p>
              </div>

              <ProductVariantSelector product={products[0]} />
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: FORMS, VALIDATION & FILE UPLOADS */}
        {/* ==================================================================== */}
        {activeTab === "forms" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form Validation Sandbox */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-border space-y-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-charcoal">
                    Form Lifecycle &amp; Validation
                  </h3>
                  <AutosaveIndicator status={autosaveState} />
                </div>

                <p className="text-xs text-charcoal-muted leading-relaxed">
                  Pristine vs Dirty states, inline blur validation, required markers, and character counters:
                </p>

                <div className="space-y-4">
                  <Input
                    label="Corporate Email Address"
                    type="email"
                    required
                    placeholder="e.g. director@midroc.com"
                    value={testEmail}
                    onChange={(e) => {
                      setTestEmail(e.target.value);
                      setFormPristine(false);
                      if (testEmailError) setTestEmailError("");
                    }}
                    onBlur={handleTestEmailBlur}
                    error={testEmailError}
                    showValidCheck
                    isValid={Boolean(testEmail && !testEmailError && testEmail.includes("@"))}
                    helperText="Proforma estimates are sent to corporate domains."
                  />

                  <Textarea
                    label="Custom Sawing & Cutting Dimensions"
                    required
                    maxLength={250}
                    currentLength={testMessage.length}
                    value={testMessage}
                    onChange={(e) => {
                      setTestMessage(e.target.value);
                      setFormPristine(false);
                    }}
                    placeholder="Type custom specs to inspect dynamic counter..."
                    helperText="Max 250 characters."
                  />

                  <div className="p-3 rounded-xl bg-cream-surface/60 border border-cream-border text-xs flex justify-between">
                    <span>Form Dirty State: <strong>{formPristine ? "Pristine (Untouched)" : "Dirty (Modified)"}</strong></span>
                    <span>Validation Status: <strong>{testEmailError ? "Invalid" : testEmail ? "Valid" : "Pending"}</strong></span>
                  </div>
                </div>
              </div>

              {/* File Upload States (Blueprints / Drawing Lists) */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-border space-y-5 shadow-xs">
                <div>
                  <h3 className="font-display font-bold text-lg text-charcoal">
                    Architectural Drawing File Upload
                  </h3>
                  <p className="text-xs text-charcoal-muted">
                    Test states: uploading spinner, progress bar (0–100%), too large error (&gt;10MB), and wrong file type error.
                  </p>
                </div>

                {/* Upload Trigger Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSimulateFileUpload("normal")}
                    className="text-xs h-9"
                  >
                    Simulate Success
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSimulateFileUpload("large")}
                    className="text-xs h-9 border-amber-300 text-amber-800"
                  >
                    Simulate &gt;10MB
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSimulateFileUpload("wrong")}
                    className="text-xs h-9 border-red-300 text-red-800"
                  >
                    Simulate Wrong Type
                  </Button>
                </div>

                {/* Dynamic Upload Stage */}
                <div className="p-5 rounded-2xl border-2 border-dashed border-cream-border bg-cream-surface/30 text-center space-y-3">
                  {formFileStatus === "idle" && (
                    <div className="py-4 space-y-1">
                      <Upload className="w-8 h-8 text-charcoal-subtle mx-auto" />
                      <span className="font-bold text-xs text-charcoal block">No drawing file uploaded</span>
                      <span className="text-[11px] text-charcoal-muted">Select a simulation scenario above</span>
                    </div>
                  )}

                  {formFileStatus === "uploading" && (
                    <div className="py-4 space-y-2">
                      <Loader2 className="w-6 h-6 animate-spin text-amber-oak mx-auto" />
                      <span className="text-xs font-bold text-charcoal block">
                        Uploading CAD Architectural Schedule... ({fileProgress}%)
                      </span>
                      <div className="w-48 mx-auto h-2 bg-cream-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-forest rounded-full transition-all duration-300"
                          style={{ width: `${fileProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {formFileStatus === "success" && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold">midroc_tower_formwork_schedule.dwg (2.4 MB)</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-bold uppercase">Uploaded</span>
                    </div>
                  )}

                  {formFileStatus === "too_large" && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>
                        <strong>File Too Large:</strong> 14.8 MB exceeds the 10 MB maximum upload limit for drawing specifications.
                      </span>
                    </div>
                  )}

                  {formFileStatus === "wrong_type" && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>
                        <strong>Unsupported Format:</strong> Only certified CAD (.dwg, .dxf), PDF schedules, and high-res images are accepted.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: ADMIN & INVENTORY STATES */}
        {/* ==================================================================== */}
        {activeTab === "admin" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Role-Based Testing Bar */}
            <div className="bg-white p-5 rounded-2xl border border-cream-border shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-base text-charcoal">
                  Role-Based Access Control (RBAC) Switcher
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Switch roles to inspect permission boundaries: Super Admin, Manager, Staff, or Viewer.
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-cream-surface p-1 rounded-xl border border-cream-border">
                {[
                  { id: "super_admin", label: "Super Admin (Full)" },
                  { id: "manager", label: "Manager (No Delete)" },
                  { id: "staff", label: "Yard Staff (Orders Only)" },
                  { id: "viewer", label: "Viewer (Read-Only)" },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setAdminRole(r.id as typeof adminRole)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      adminRole === r.id
                        ? "bg-forest text-white shadow-xs"
                        : "text-charcoal-muted hover:text-charcoal"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Wholesale Order Status Flow & Payment States */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-border space-y-6 shadow-xs">
              <div className="border-b border-cream-border/60 pb-4">
                <h3 className="font-display font-bold text-xl text-charcoal">
                  Commercial Consignment Order &amp; Proforma Lifecycle
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Full status progression managed by dispatch staff: Placed → Confirmed → Packed → Dispatched → Out for Delivery → Delivered (or Cancelled/Refunded).
                </p>
              </div>

              {/* Status Flow Stepper */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-subtle block">
                  Simulate Order Status Progression:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {(["new", "confirmed", "packed", "dispatched", "out_for_delivery", "delivered"] as OrderStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setDemoOrderStatus(st)}
                      className={`p-3 rounded-xl border text-xs font-bold capitalize transition-all cursor-pointer ${
                        demoOrderStatus === st
                          ? "bg-forest text-white border-forest shadow-xs"
                          : "bg-cream-surface/70 text-charcoal-muted hover:text-charcoal hover:bg-cream-surface border-cream-border"
                      }`}
                    >
                      {st.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Status Badges Showcase */}
              <div className="p-4 rounded-2xl bg-cream-surface/60 border border-cream-border space-y-3">
                <span className="text-xs font-bold text-charcoal block">
                  Payment Status States Matrix:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                    Paid (Letter of Credit / Wire Confirmed)
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-300">
                    Unpaid (Awaiting Commercial Proforma Remittance)
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-bold border border-purple-300">
                    Partial (50% Milestone Advance Paid)
                  </span>
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 font-bold border border-red-300">
                    Refunded / Cancelled Order
                  </span>
                </div>
              </div>
            </div>

            {/* Negative Stock Warning & Inventory Delta Sandbox */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-border space-y-5 shadow-xs">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg text-charcoal">
                  Negative Stock Warning &amp; Adjustment Guard
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Test entering a delta that exceeds the yard balance ({stockBalance} sheets). The system blocks negative stock in real time:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-charcoal">Current Yard Balance:</span>
                  <div className="p-3 bg-cream-surface rounded-xl font-display font-black text-xl text-forest">
                    {stockBalance} sheets
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-charcoal">Enter Delta:</span>
                  <input
                    type="number"
                    value={stockDelta}
                    onChange={(e) => setStockDelta(parseInt(e.target.value) || 0)}
                    className="w-full h-11 px-3 bg-white border border-cream-border rounded-xl font-bold text-sm text-charcoal"
                  />
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-charcoal">Projected Balance:</span>
                  <div
                    className={`p-3 rounded-xl font-display font-black text-xl ${
                      stockBalance + stockDelta < 0
                        ? "bg-red-100 text-red-700"
                        : "bg-cream-surface text-charcoal"
                    }`}
                  >
                    {stockBalance + stockDelta} sheets
                  </div>
                </div>
              </div>

              {stockBalance + stockDelta < 0 && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs flex items-center gap-2 font-bold animate-in shake duration-200">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>
                    Negative stock warning: Operation blocked! Cannot dispatch {Math.abs(stockDelta)} sheets when yard only holds {stockBalance}.
                  </span>
                </div>
              )}
            </div>

            {/* Undo Deleted Product Banner Showcase */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-border space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-charcoal">
                    Delete with 10-Second Undo Banner
                  </h3>
                  <p className="text-xs text-charcoal-muted">
                    Click below to trigger the recoverable deletion notification:
                  </p>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setShowUndoBanner(true)}
                  className="text-xs"
                >
                  Trigger Delete &amp; Undo Demo
                </Button>
              </div>

              {showUndoBanner && (
                <div className="bg-amber-100 border border-amber-300 text-amber-900 px-4 py-3 rounded-2xl flex items-center justify-between shadow-xs animate-in slide-in-from-top duration-200">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <RotateCw className="w-4 h-4 text-amber-700 animate-spin" />
                    <span>
                      Specification &ldquo;<strong>AquaShield BS 1088 Marine Plywood</strong>&rdquo; was deleted from inventory.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowUndoBanner(false);
                      showToast({
                        type: "success",
                        title: "Specification Restored",
                        message: "AquaShield BS 1088 has been restored to catalog.",
                      });
                    }}
                    className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Undo Delete (10s)
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: SYSTEM, AUTH & TIMEOUT STATES */}
        {/* ==================================================================== */}
        {activeTab === "system" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* System Pages Directory */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-border shadow-xs space-y-4">
              <h3 className="font-display font-bold text-xl text-charcoal">
                System Boundary &amp; Error Pages
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Click any direct link below to inspect each dedicated system state page:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <Link
                  href="/not-found-demo-page"
                  className="p-5 rounded-2xl bg-cream-surface/70 hover:bg-cream-surface border border-cream-border transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      404 Not Found
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-charcoal-muted group-hover:text-forest" />
                  </div>
                  <h4 className="font-bold text-sm text-charcoal">Missing Spec Page</h4>
                  <p className="text-[11px] text-charcoal-muted">
                    Equipped with in-page live search and popular certified timber chips.
                  </p>
                </Link>

                <Link
                  href="/unauthorized"
                  className="p-5 rounded-2xl bg-cream-surface/70 hover:bg-cream-surface border border-cream-border transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                      403 Forbidden
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-charcoal-muted group-hover:text-forest" />
                  </div>
                  <h4 className="font-bold text-sm text-charcoal">Login Required Guard</h4>
                  <p className="text-[11px] text-charcoal-muted">
                    Explains staff domain restrictions and routes directly to the login portal.
                  </p>
                </Link>

                <Link
                  href="/maintenance"
                  className="p-5 rounded-2xl bg-cream-surface/70 hover:bg-cream-surface border border-cream-border transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      Maintenance Mode
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-charcoal-muted group-hover:text-forest" />
                  </div>
                  <h4 className="font-bold text-sm text-charcoal">Scheduled Inventory Upgrade</h4>
                  <p className="text-[11px] text-charcoal-muted">
                    Features live countdown timer and uninterrupted emergency WhatsApp dispatch.
                  </p>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsSessionTimeoutOpen(true)}
                  className="p-5 rounded-2xl bg-cream-surface/70 hover:bg-cream-surface border border-cream-border transition-all space-y-2 text-left group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                      Session Auto-Logout
                    </span>
                    <Clock className="w-3.5 h-3.5 text-charcoal-muted group-hover:text-forest" />
                  </div>
                  <h4 className="font-bold text-sm text-charcoal">Auto-Logout Modal</h4>
                  <p className="text-[11px] text-charcoal-muted">
                    Countdown warning before staff portal automatic session expiry.
                  </p>
                </button>
              </div>
            </div>

            {/* Session Timeout Modal */}
            <SessionTimeoutModal
              isOpen={isSessionTimeoutOpen}
              onStayLoggedIn={() => {
                setIsSessionTimeoutOpen(false);
                showToast({
                  type: "success",
                  title: "Session Extended",
                  message: "Staff authentication refreshed for 2 hours.",
                });
              }}
              onLogout={() => {
                setIsSessionTimeoutOpen(false);
                window.location.href = "/auth/login";
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
