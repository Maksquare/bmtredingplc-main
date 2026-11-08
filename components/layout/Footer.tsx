import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { categories } from "@/data/seed-data";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-dark text-cream border-t border-forest-light/30 relative overflow-hidden bg-dark-grain">
      {/* Top Accent Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-oak via-amber-light to-amber-oak" />

      {/* Main Footer Content */}
      <div className="py-16 lg:py-20">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Col 1: Brand & Identity */}
            <div className="lg:col-span-2 space-y-6">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-amber-oak flex items-center justify-center font-display font-black text-xl text-white shadow-md">
                  B
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-extrabold text-2xl tracking-tight text-white group-hover:text-amber-light transition-colors">
                    {siteConfig.name}
                  </span>
                  <span className="text-[11px] tracking-widest uppercase font-semibold text-amber-light/80">
                    Industrial Timber & Plywood Solutions
                  </span>
                </div>
              </Link>

              <p className="text-sm text-cream/70 leading-relaxed max-w-md">
                {siteConfig.name} is a premier direct importer and wholesale distributor of certified marine plywood, high-cycle phenolic film-faced formwork panels, commercial joinery sheets, and engineered wood boards for civil infrastructure and luxury architectural millwork.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-cream/90 bg-forest-surface px-3 py-1.5 rounded-lg border border-forest-light/40">
                  <ShieldCheck className="w-4 h-4 text-amber-oak" />
                  <span>BS 1088 Marine Standards</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-cream/90 bg-forest-surface px-3 py-1.5 rounded-lg border border-forest-light/40">
                  <CheckCircle2 className="w-4 h-4 text-amber-oak" />
                  <span>Dynea 120g/m² Phenolic Film</span>
                </div>
              </div>
            </div>

            {/* Col 2: Plywood Categories */}
            <div className="space-y-4">
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-amber-light">
                Product Categories
              </h4>
              <ul className="space-y-2.5 text-sm text-cream/75">
                {categories.slice(0, 6).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/products?category=${cat.slug}`}
                      className="hover:text-amber-light transition-colors flex items-center justify-between group"
                    >
                      <span>{cat.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-oak" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Company & Quick Links */}
            <div className="space-y-4">
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-amber-light">
                Company & Services
              </h4>
              <ul className="space-y-2.5 text-sm text-cream/75">
                <li>
                  <Link href="/about" className="hover:text-amber-light transition-colors">
                    About {siteConfig.name}
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-amber-light transition-colors">
                    Industry Applications
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:text-amber-light transition-colors">
                    Project Gallery & Sites
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-amber-light transition-colors">
                    Technical Timber Insights
                  </Link>
                </li>
                <li>
                  <Link href="/quote" className="hover:text-amber-light transition-colors font-medium text-amber-light">
                    Request a Custom Quote
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-amber-light transition-colors">
                    Central Distribution Yard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact & Operations */}
            <div className="space-y-4">
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-amber-light">
                Operations & Yard
              </h4>
              <ul className="space-y-3 text-xs text-cream/75">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-oak shrink-0 mt-0.5" />
                  <span>{siteConfig.contact.address.full}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-oak shrink-0" />
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                    className="hover:text-amber-light transition-colors"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-oak shrink-0" />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="hover:text-amber-light transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-oak shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{siteConfig.contact.hours}</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-forest-light/40 py-6 text-xs text-cream/60">
        <Container size="wide">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>
              © {currentYear} <span className="font-semibold text-cream">{siteConfig.name}</span>. All rights reserved. Registered Timber & Plywood Corporation.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-cream transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-cream transition-colors">
                Terms of Supply
              </Link>
              <Link href="/auth/login" className="hover:text-cream transition-colors opacity-40 hover:opacity-100">
                Staff Portal
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

