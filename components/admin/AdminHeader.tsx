"use client";

import React from "react";
import Link from "next/link";
import { Menu, Plus, ExternalLink, Bell, HardDrive, ShieldCheck, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAdminData } from "@/lib/admin-store";
import { AdminRole } from "@/types";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onOpenSidebar: () => void;
  action?: React.ReactNode;
}

export function AdminHeader({
  title,
  subtitle,
  onOpenSidebar,
  action,
}: AdminHeaderProps) {
  const { quotes, inquiries, currentRole, setCurrentRole } = useAdminData();
  const pendingCount = quotes.filter((q) => q.status === "pending").length + inquiries.filter((i) => i.status === "new").length;

  return (
    <header className="sticky top-0 z-30 bg-[#071711] text-white border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button & Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <h1 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[11px] text-white/60 truncate hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Role Switcher, Alerts & Status */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Role-Based Access Testing Selector */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/10 border border-white/15 text-xs text-white">
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline text-[11px] text-white/70 font-medium">Role:</span>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as AdminRole)}
              className="bg-transparent text-xs font-bold text-amber-300 focus:outline-none cursor-pointer"
            >
              <option value="super_admin" className="bg-charcoal text-white">Super Admin (Full)</option>
              <option value="manager" className="bg-charcoal text-white">Manager (No Delete)</option>
              <option value="staff" className="bg-charcoal text-white">Yard Staff (Orders/Quotes)</option>
              <option value="viewer" className="bg-charcoal text-white">Viewer (Read-Only)</option>
            </select>
          </div>

          {/* System Status Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Store Online</span>
          </div>

          {/* Pending Alerts Pill */}
          {pendingCount > 0 && (
            <Link
              href="/admin/quotes"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold hover:bg-amber-500/30 transition-colors"
              title={`${pendingCount} pending requests`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>{pendingCount} Pending</span>
            </Link>
          )}

          {/* Action button if supplied by page */}
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </div>
    </header>
  );
}

