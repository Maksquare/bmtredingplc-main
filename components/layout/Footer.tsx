import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Factory,
  ArrowUpRight,
  MessageSquare,
  Send,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#FCFBF8] via-[#FAF3E7] to-[#F3E5CE] text-[#141715] border-t border-[#E5DEC9]">
      <div className="pt-14 pb-8 sm:pt-20 sm:pb-10">
        <Container size="wide">
          {/* Top 3-Column Editorial Links Grid (Inspo 00:26–00:30) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-[#DFD4C0]">
            {/* Col 1: Product Lineup */}
            <div className="space-y-4">
              <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-[#C8832A]">
                Our Products
              </h4>
              <ul className="space-y-2.5 text-sm font-medium text-[#2D332F]">
                <li>
                  <Link
                    href="/products/safarian"
                    className="hover:text-[#C8832A] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Safarian Boards (03mm, 06mm, 08mm, 12mm)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/plywood"
                    className="hover:text-[#C8832A] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Plywood (16mm)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/plywood?thickness=18mm"
                    className="hover:text-[#C8832A] font-bold text-[#0B241B] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>18mm Plywood (Special Product)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C8832A]" />
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-[#C8832A] transition-colors">
                    Full Product Catalog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 2: Company */}
            <div className="space-y-4">
              <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-[#C8832A]">
                Company
              </h4>
              <ul className="space-y-2.5 text-sm font-medium text-[#2D332F]">
                <li>
                  <Link href="/" className="hover:text-[#C8832A] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#C8832A] transition-colors">
                    About {siteConfig.name}
                  </Link>
                </li>
                <li>
                  <Link href="/quote" className="hover:text-[#C8832A] transition-colors">
                    Request a Quote
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#C8832A] transition-colors">
                    Contact &amp; Locations
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Locations & Direct Contact */}
            <div className="space-y-4">
              <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-[#C8832A]">
                Office, Factory &amp; Contact
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-[#2D332F]">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C8832A] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#141715]">Office:</strong> {siteConfig.contact.address.full}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Factory className="w-4 h-4 text-[#0B241B] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#141715]">Factory:</strong> {siteConfig.contact.factory.full}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#C8832A] shrink-0 mt-0.5" />
                  <div className="flex flex-wrap gap-x-3 gap-y-1 tabular-nums">
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="font-bold text-[#141715] hover:text-[#C8832A]"
                    >
                      {siteConfig.contact.phoneDisplay}
                    </a>
                    <a
                      href={`tel:${siteConfig.contact.secondaryPhone}`}
                      className="hover:text-[#C8832A]"
                    >
                      {siteConfig.contact.secondaryPhoneDisplay}
                    </a>
                    <a
                      href={`tel:${siteConfig.contact.tertiaryPhone}`}
                      className="hover:text-[#C8832A]"
                    >
                      {siteConfig.contact.tertiaryPhoneDisplay}
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#C8832A] shrink-0" />
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#C8832A]">
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li className="pt-1 flex items-center gap-2">
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-bold transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={siteConfig.contact.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#229ED9] hover:bg-[#1982b8] text-white text-xs font-bold transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Telegram</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Supersized Edge-to-Edge Signature Wordmark (Inspo 00:27–00:30) */}
          <div className="py-6 sm:py-10 select-none overflow-hidden text-center" aria-hidden="true">
            <div className="font-display font-extrabold text-[clamp(2.65rem,11.2vw,9.5rem)] leading-[0.88] tracking-[-0.04em] whitespace-nowrap">
              <span className="text-[#141715]">bm</span>
              <span className="text-[#0B241B]">trading</span>
              <span className="text-[#C8832A]">plc</span>
            </div>
          </div>

          {/* Bottom Legal Row */}
          <div className="pt-6 border-t border-[#DFD4C0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5A6961]">
            <p>
              © {currentYear} <strong className="text-[#141715]">{siteConfig.name}</strong>. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-[#141715] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#141715] transition-colors">
                Terms of Supply
              </Link>
              <Link href="/auth/login" className="hover:text-[#141715] transition-colors">
                Staff Portal
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}