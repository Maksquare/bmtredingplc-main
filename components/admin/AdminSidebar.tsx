"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  FolderTree,
  FileText,
  MessageSquare,
  Images,
  Building2,
  Star,
  HardDrive,
  Settings,
  ExternalLink,
  LogOut,
  X,
  ShieldCheck,
  Truck,
  Package,
  Users,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { useAdminData } from "@/lib/admin-store";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { quotes, inquiries, products } = useAdminData();

  const pendingQuotesCount = quotes.filter((q) => q.status === "pending" || q.status === "reviewing").length;
  const newInquiriesCount = inquiries.filter((i) => i.status === "new").length;

  const navItems = [
    {
      name: "Dashboard Overview",
      href: "/admin",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "Products & Specs",
      href: "/admin/products",
      icon: Layers,
      badge: products.length.toString(),
    },
    {
      name: "Yard Inventory & Stock",
      href: "/admin/inventory",
      icon: Package,
      badge: null,
    },
    {
      name: "Orders & Shipments",
      href: "/admin/orders",
      icon: Truck,
      badge: "5",
      badgeVariant: "emerald",
    },
    {
      name: "Product Categories",
      href: "/admin/categories",
      icon: FolderTree,
      badge: null,
    },
    {
      name: "Quotes & RFQs",
      href: "/admin/quotes",
      icon: FileText,
      badge: pendingQuotesCount > 0 ? `${pendingQuotesCount} New` : null,
      badgeVariant: "amber",
    },
    {
      name: "Inquiries & Leads",
      href: "/admin/inquiries",
      icon: MessageSquare,
      badge: newInquiriesCount > 0 ? `${newInquiriesCount} New` : null,
      badgeVariant: "emerald",
    },
    {
      name: "Customers & Accounts",
      href: "/admin/customers",
      icon: Users,
      badge: null,
    },
    {
      name: "Project Gallery",
      href: "/admin/gallery",
      icon: Images,
      badge: null,
    },
    {
      name: "Client Partners",
      href: "/admin/partners",
      icon: Building2,
      badge: null,
    },
    {
      name: "Testimonials",
      href: "/admin/testimonials",
      icon: Star,
      badge: null,
    },
    {
      name: "Media & Assets",
      href: "/admin/media",
      icon: HardDrive,
      badge: null,
    },
    {
      name: "Yard & Site Settings",
      href: "/admin/settings",
      icon: Settings,
      badge: null,
    },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/auth/login");
      router.refresh();
    } catch (e) {
      console.error("Logout error", e);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 sm:w-72 bg-[#071711] text-white border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ease-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 sm:p-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center font-display font-black text-lg text-white shadow-md shadow-amber-950/40 group-hover:scale-105 transition-transform">
                B
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-base tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  {siteConfig.name}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-amber-400 font-bold">
                  Yard Operations & CMS
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1" aria-label="Admin Navigation">
          <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 px-3 py-1">
            System Modules
          </div>

          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 min-h-[42px] ${
                  isActive
                    ? "bg-amber-600 text-white shadow-md shadow-amber-950/50"
                    : "text-white/75 hover:text-white hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? "text-white" : "text-amber-400/80 group-hover:text-amber-300"
                    }`}
                  />
                  <span className="truncate">{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                      item.badgeVariant === "amber"
                        ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                        : item.badgeVariant === "emerald"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                        : "bg-white/15 text-white/90"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-white/10 mt-3 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 px-3 py-1">
              External Shortcuts
            </div>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                <span>View Live Website</span>
              </span>
              <span className="text-[9px] uppercase font-bold text-amber-300 bg-white/10 px-1.5 py-0.5 rounded">
                Public
              </span>
            </Link>
          </div>
        </nav>

        {/* User Card & Logout Footer */}
        <div className="p-3 sm:p-4 border-t border-white/10 bg-[#0B241B]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-forest-surface border border-white/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                AD
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white truncate block">
                  Admin • Operations
                </span>
                <span className="text-[10px] text-amber-400/80 truncate block">
                  Addis Ababa Yard
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded-lg text-white/60 hover:text-red-400 hover:bg-white/10 transition-colors"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

