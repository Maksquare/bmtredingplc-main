"use client";

import React, { useState } from "react";
import {
  Settings,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  Save,
  RotateCcw,
  Check,
  AlertTriangle,
  HardDrive,
  ShieldCheck,
  Truck,
  Layers,
  FileText,
  Database,
  UploadCloud,
  Loader2,
  Server,
} from "lucide-react";
import { useAdminData } from "@/lib/admin-store";
import { SiteSettings } from "@/types";

export default function SettingsAdminPage() {
  const {
    settings,
    updateSettings,
    resetToDefaults,
    products,
    categories,
    quotes,
    inquiries,
    media,
  } = useAdminData();

  const [draftOverrides, setDraftOverrides] = useState<Partial<SiteSettings>>({});
  const formData: SiteSettings = { ...settings, ...draftOverrides };
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleSyncSupabase = async () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      const res = await fetch("/api/admin/sync-supabase", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Sync failed");
      }
      setSyncFeedback({
        success: true,
        message: data.message || "All records synchronized to Supabase PostgreSQL successfully.",
      });
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Could not connect to Supabase. Check your environment variables.";
      setSyncFeedback({
        success: false,
        message: msg,
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDraftOverrides((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSaveSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setDraftOverrides({});
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    resetToDefaults();
    setDraftOverrides({});
    setIsResetConfirmOpen(false);
    setSaveSuccess(false);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 font-display">
            Yard & Site Settings
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Configure central importer yards in Addis Ababa, sales hotlines, operating hours, and SEO metadata.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-neutral-300 bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-xs active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C8832A] text-white text-sm font-semibold hover:bg-[#B37220] transition-colors shadow-sm active:scale-95"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center gap-2 animate-in fade-in duration-200">
          <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Site and yard configurations have been saved successfully and persisted across sessions.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Brand Identity & Legal Name */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-[#C8832A]">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 font-display">Brand & Company Identity</h3>
              <p className="text-xs text-neutral-500">Master branding guidelines and primary metadata</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Company Brand Name
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8832A]/20 focus:border-[#C8832A] font-semibold text-neutral-900"
              />
              <p className="text-[11px] text-neutral-400 mt-1">
                Strict brand rule: exactly <span className="font-mono text-[#C8832A]">bmtradingplc</span>.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Company Tagline / Subtitle
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8832A]/20 focus:border-[#C8832A]"
              />
              <p className="text-[11px] text-neutral-400 mt-1">Appears across header and site footers.</p>
            </div>
          </div>
        </div>

        {/* Section 2: Central Yards & Logistics Facilities */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 font-display">Office &amp; Factory Locations</h3>
              <p className="text-xs text-neutral-500">Addis Ababa commercial office and Werabe City manufacturing facility</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Addis Ababa Office Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8832A]/20 focus:border-[#C8832A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Factory Location
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  name="factory_address"
                  value={formData.factory_address || "Central Ethiopia, Silte Zone/ስልጤ ዞን, Werabe City"}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8832A]/20 focus:border-[#C8832A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Yard & Office Operating Hours
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    name="business_hours"
                    value={formData.business_hours}
                    onChange={handleChange}
                    required
                    className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8832A]/20 focus:border-[#C8832A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Dispatch & Fleet Staging
                </label>
                <input
                  type="text"
                  readOnly
                  value="Addis Ababa Office (Ayer Tena) & Silte Zone/ስልጤ ዞን, Werabe City Factory"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-100 text-neutral-600 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Hotlines & Direct Sales Channels */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 font-display">Sales Hotlines & Direct Channels</h3>
              <p className="text-xs text-neutral-500">Direct office numbers, WhatsApp, Telegram, and contact emails</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Primary Phone (Call / WhatsApp / Telegram)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8832A]/20 focus:border-[#C8832A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Secondary Phone Line
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  name="secondary_phone"
                  value={formData.secondary_phone || "0911 221 261"}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8832A]/20 focus:border-[#C8832A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Third Office Line
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  name="tertiary_phone"
                  value={formData.tertiary_phone || "0910 953 373"}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8832A]/20 focus:border-[#C8832A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                WhatsApp &amp; Telegram Number
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8832A]/20 focus:border-[#C8832A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Sales & RFQ Inbound Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="email"
                  name="sales_email"
                  value={formData.sales_email}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8832A]/20 focus:border-[#C8832A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                General Administration Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8832A]/20 focus:border-[#C8832A]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Homepage Hero & SEO */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 font-display">Homepage Hero & Search SEO</h3>
              <p className="text-xs text-neutral-500">Headlines and metadata displayed in Google and social previews</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Homepage Hero Headline
              </label>
              <input
                type="text"
                name="hero_title"
                value={formData.hero_title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8832A]/20 focus:border-[#C8832A] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Homepage Hero Subtitle / Value Proposition
              </label>
              <textarea
                name="hero_subtitle"
                rows={3}
                value={formData.hero_subtitle}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8832A]/20 focus:border-[#C8832A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Global Meta Description (Search Engines)
              </label>
              <textarea
                name="meta_description"
                rows={2}
                value={formData.meta_description}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8832A]/20 focus:border-[#C8832A]"
              />
              <p className="text-[11px] text-neutral-400 mt-1">Recommended length: 150-160 characters.</p>
            </div>
          </div>
        </div>

        {/* Section 5: System Health & Database Diagnostics */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 font-display">System Health & Live Data Counts</h3>
              <p className="text-xs text-neutral-500">Reactive CMS storage and database records</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-center">
              <p className="text-[10px] uppercase font-bold text-neutral-400">Products</p>
              <p className="text-xl font-bold text-neutral-900 mt-1">{products.length}</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-center">
              <p className="text-[10px] uppercase font-bold text-neutral-400">Categories</p>
              <p className="text-xl font-bold text-neutral-900 mt-1">{categories.length}</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-center">
              <p className="text-[10px] uppercase font-bold text-neutral-400">Quotes / RFQs</p>
              <p className="text-xl font-bold text-[#C8832A] mt-1">{quotes.length}</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-center">
              <p className="text-[10px] uppercase font-bold text-neutral-400">Inquiries</p>
              <p className="text-xl font-bold text-emerald-600 mt-1">{inquiries.length}</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-center">
              <p className="text-[10px] uppercase font-bold text-neutral-400">Media Files</p>
              <p className="text-xl font-bold text-neutral-900 mt-1">{media.length}</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-center">
              <p className="text-[10px] uppercase font-bold text-neutral-400">Active Facilities</p>
              <p className="text-xl font-bold text-neutral-900 mt-1">2 Hubs</p>
            </div>
          </div>

          <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/70 text-xs text-amber-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Dual-Persistence Architecture Active</p>
              <p className="text-amber-800/80 mt-0.5">
                All changes made in this dashboard write instantly to reactive browser storage and are fully compatible with the PostgreSQL / Supabase schema located at <code className="font-mono bg-white px-1 py-0.5 rounded border border-amber-200">supabase/schema.sql</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Supabase Database & cPanel Storage Integration */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 font-display">
                Supabase Database &amp; cPanel File Storage
              </h3>
              <p className="text-xs text-neutral-500">
                PostgreSQL cloud database synchronization and cPanel asset storage controls
              </p>
            </div>
          </div>

          {syncFeedback && (
            <div
              className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                syncFeedback.success
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              {syncFeedback.success ? (
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <span>{syncFeedback.message}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Supabase Database Card */}
            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-700 font-bold">
                  <Database className="w-4 h-4" />
                  <span>Supabase PostgreSQL Database</span>
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  Stores live products, categories, contractor quote pipelines, contact inquiries, client reviews, and admin authentication credentials.
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500">
                  Schema: <code className="font-mono bg-white px-1 py-0.5 rounded border">supabase/schema.sql</code>
                </span>
                <button
                  type="button"
                  disabled={isSyncing}
                  onClick={handleSyncSupabase}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-2xs"
                >
                  {isSyncing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Syncing...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Sync Baseline to Supabase</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* cPanel Storage Card */}
            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-amber-700 font-bold">
                  <Server className="w-4 h-4" />
                  <span>cPanel Media &amp; PDF Storage</span>
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  All Safarian &amp; Plywood photography, catalog PDFs, and factory media assets are stored directly with 30-day caching.
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500">
                  Gateway: <code className="font-mono bg-white px-1 py-0.5 rounded border">cpanel-storage/</code>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded border border-amber-300">
                  Ready for cPanel
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setDraftOverrides({})}
            className="px-4 py-2 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-600 hover:bg-neutral-100"
          >
            Discard Changes
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#C8832A] text-white text-sm font-semibold hover:bg-[#B37220] transition-colors shadow-sm active:scale-95"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>

      {/* Confirm Reset Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-amber-600">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-neutral-900 font-display">
                Reset Store to Factory Defaults?
              </h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              This will restore all products, categories, quote pipelines, inquiries, testimonials, and site settings to the baseline certified seed data. All local modifications will be cleared.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-600 hover:bg-neutral-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors shadow-xs"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

