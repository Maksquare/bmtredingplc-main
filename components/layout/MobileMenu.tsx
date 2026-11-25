"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Phone,
  MessageSquare,
  Send,
  ArrowUpRight,
  MapPin,
  Factory,
  Layers,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { cn, isRouteActive } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 bg-[#141715]/45 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Daylight Alabaster Slide-out Drawer matching Navbar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 340 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#FCFBF8] text-[#141715] p-5 sm:p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#E5DEC9]"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#E5DEC9]">
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center gap-2.5 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#0B241B] flex items-center justify-center font-display text-white font-black text-base shadow-xs">
                    B
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display text-lg font-extrabold tracking-[-0.03em] text-[#141715]">
                      {siteConfig.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-[#5A6961] font-bold">
                      Safarian &amp; Plywood
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full bg-white text-[#141715] hover:bg-[#F4EFE6] active:scale-95 transition-all min-w-[42px] min-h-[42px] flex items-center justify-center border border-[#E5DEC9] shadow-2xs"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="py-5 space-y-2" aria-label="Mobile Navigation">
                {siteConfig.navLinks.map((link, idx) => {
                  const isActive = isRouteActive(pathname, link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * idx + 0.06, duration: 0.24, ease: "easeOut" }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "group flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm transition-all duration-200 min-h-[50px] select-none",
                          isActive
                            ? "bg-[#0B241B] text-white font-bold shadow-sm"
                            : "bg-white text-[#141715] hover:bg-[#F4EFE6] border border-[#E5DEC9]/80 font-semibold"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "w-2 h-2 rounded-full shrink-0",
                              isActive
                                ? "bg-[#EAA84F]"
                                : "bg-[#D8CFC0] group-hover:bg-[#C8832A]"
                            )}
                          />
                          <span>{link.name}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {isActive && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/15 text-amber-200">
                              Active
                            </span>
                          )}
                          <ArrowUpRight
                            className={cn(
                              "w-4 h-4 transition-transform duration-200",
                              isActive
                                ? "text-[#EAA84F]"
                                : "text-[#5A6961] group-hover:text-[#C8832A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            )}
                          />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Contact & Locations */}
            <div className="pt-5 border-t border-[#E5DEC9] space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0B241B] bg-[#FBF4EB] px-3.5 py-2.5 rounded-xl border border-[#C8832A]/30">
                <Layers className="w-4 h-4 shrink-0 text-[#C8832A]" />
                <span>Safarian (03–12mm) • Plywood (16mm / 18mm Special)</span>
              </div>

              <div className="space-y-2.5">
                <Link
                  href="/quote"
                  onClick={onClose}
                  className="flex items-center justify-between w-full pl-5 pr-2 py-2.5 rounded-full bg-[#141715] hover:bg-[#0B241B] text-white font-bold text-sm shadow-md transition-all"
                >
                  <span>Request a Quote</span>
                  <span className="w-8 h-8 rounded-full bg-[#C8832A] text-white flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>

                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-white hover:bg-[#F4EFE6] text-xs font-bold text-[#141715] border border-[#E5DEC9] min-h-[44px]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C8832A]" />
                    Call Us
                  </a>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-xs font-bold text-white min-h-[44px]"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                  <a
                    href={siteConfig.contact.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-[#229ED9] hover:bg-[#1982b8] text-xs font-bold text-white min-h-[44px]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Telegram
                  </a>
                </div>
              </div>

              <div className="text-[11px] text-[#3D4A43] space-y-1.5 pt-1 bg-white p-3 rounded-xl border border-[#E5DEC9]/80">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-[#C8832A] mt-0.5" />
                  <span>
                    <strong className="text-[#141715]">Office:</strong> {siteConfig.contact.address.full}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Factory className="w-3.5 h-3.5 shrink-0 text-[#0B241B] mt-0.5" />
                  <span>
                    <strong className="text-[#141715]">Factory:</strong> {siteConfig.contact.factory.full}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}