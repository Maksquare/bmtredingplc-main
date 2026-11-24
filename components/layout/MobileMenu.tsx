"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MessageSquare, ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Button } from "@/components/ui/Button";
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
          {/* Backdrop with Smooth Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 bg-[#071711]/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer with Spring Physics */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#0B241B] text-white p-5 sm:p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-white/10"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center gap-2.5 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center font-display text-white font-black text-base shadow-sm">
                    B
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display text-base font-extrabold tracking-tight text-white">
                      {siteConfig.name}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-amber-400 font-bold">
                      Addis Ababa, Ethiopia
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 active:scale-90 transition-all duration-150 min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/10"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Staggered Navigation Links */}
              <nav className="py-5 space-y-2" aria-label="Mobile Navigation">
                {siteConfig.navLinks.map((link, idx) => {
                  const isActive = isRouteActive(pathname, link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * idx + 0.08, duration: 0.28, ease: "easeOut" }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "group relative flex items-center justify-between px-4 py-3.5 rounded-xl text-sm transition-all duration-200 min-h-[50px] select-none",
                          isActive
                            ? "bg-gradient-to-r from-amber-500/25 via-amber-500/12 to-white/[0.04] border border-amber-400/40 text-white font-bold shadow-[0_4px_16px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.18)]"
                            : "text-white/80 hover:text-white hover:bg-white/10 active:scale-[0.99] border border-transparent font-medium"
                        )}
                      >
                        {/* Left Content: Name + Active Pulsing Dot */}
                        <div className="flex items-center gap-3">
                          {isActive ? (
                            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)] animate-pulse shrink-0" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-amber-400/60 transition-colors shrink-0" />
                          )}
                          <span className="tracking-wide text-sm">{link.name}</span>
                        </div>

                        {/* Right Content: Active Tag + Directional Arrow */}
                        <div className="flex items-center gap-2">
                          {isActive && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                              Current
                            </span>
                          )}
                          <ArrowRight
                            className={cn(
                              "w-4 h-4 transition-all duration-200",
                              isActive
                                ? "text-amber-300 translate-x-0.5"
                                : "text-white/30 group-hover:text-amber-300 group-hover:translate-x-1"
                            )}
                          />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions & Fast Contact */}
            <div className="pt-5 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-xs text-amber-300 font-medium bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Certified BS 1088 & ISO 9001 Importer</span>
              </div>

              <div className="space-y-2">
                <Button
                  href="/quote"
                  variant="amber"
                  className="w-full font-bold shadow-lg shadow-amber-950/50 py-3"
                  onClick={onClose}
                >
                  Request a Formal Quote
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                    className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white/10 text-xs font-bold text-white hover:bg-white/15 active:scale-95 transition-all duration-150 min-h-[44px] border border-white/10"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    Call Sales
                  </a>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20bmtradingplc,%20I%20would%20like%20to%20inquire%20about%20plywood%20supply%20in%20Ethiopia.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-xs font-bold text-white active:scale-95 transition-all duration-150 min-h-[44px] border border-emerald-400/30 shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-200" />
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="text-[11px] text-white/50 text-center flex items-center justify-center gap-1.5 pt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400/60" />
                <span>Bole Commercial Corridor, Addis Ababa</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
