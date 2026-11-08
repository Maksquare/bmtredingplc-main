import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Armchair,
  Package,
  Home,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Industry Applications | Civil Formwork, Cabinetry & Marine",
  description: `Discover how ${siteConfig.name} supplies high-grade plywood solutions across structural concrete construction, luxury furniture manufacturing, export packaging, and commercial interiors.`,
};

export default function ServicesPage() {
  const applications = [
    {
      id: "construction",
      icon: Building2,
      title: "Commercial & Civil Concrete Construction",
      tagline: "High-Cycle Shuttering & Structural Formwork",
      description:
        "Engineered for high-rise slabs, bridge abutments, core shear walls, and slip-form systems. Our Dynea phenolic film-faced plywood delivers flawless fair-faced architectural concrete finishes with up to 25+ reuse cycles.",
      suitablePanels: [
        "ProForm 120g/m² Dynea Film-Faced Shuttering (18mm, 21mm)",
        "Hardwood Structural Concrete Formwork Panels",
        "Anti-Slip Wiremesh Scaffolding Decks",
      ],
      advantages: [
        "Acrylic-sealed waterproof edge coating eliminates concrete slurry seepage",
        "Minimal deflection under heavy hydrostatic wet concrete pressure",
        "Significantly reduces cost-per-pour compared to standard form boards",
      ],
    },
    {
      id: "furniture",
      icon: Armchair,
      title: "Architectural Millwork & Custom Cabinetry",
      tagline: "Calibrated Joinery Sheets & Warp-Free Blockboards",
      description:
        "Bespoke kitchen cabinet manufacturers, modular wardrobe makers, and office workstation fabricators require uniform calibration with zero veneer telegraphing for laminate pressing.",
      suitablePanels: [
        "VeneerCraft Bintangor & Okoume Commercial Plywood (9mm–18mm)",
        "SolidCore Kiln-Dried Pine Batten Blockboard (18mm, 25mm)",
        "UltraDense E1 Moisture-Resistant MDF Panels",
      ],
      advantages: [
        "Dual-side calibrated sanding delivers ±0.2mm thickness tolerance",
        "Exceptional screw-holding torque in edge and face fixings",
        "Kiln-dried seasoned cores prevent long-term gravitational bowing",
      ],
    },
    {
      id: "packaging",
      icon: Package,
      title: "Industrial & Heavy Cargo Transport Packaging",
      tagline: "High-Strength Crating & Transport Flooring",
      description:
        "Heavy machinery exporters and freight logistics providers need moisture-resistant, phytosanitary-compliant wooden panels that endure long maritime shipping voyages and forklift impact.",
      suitablePanels: [
        "TitanDeck Keruing Wiremesh Anti-Slip Transport Flooring (21mm–28mm)",
        "ISPM-15 Export Compliant Hardwood Crating Plywood",
        "Heavy-Duty Pine Packaging Sheets",
      ],
      advantages: [
        "High modulus of rupture (MOR) resists dynamic drop loads",
        "Hexagonal wiremesh surface prevents cargo sliding during transit",
        "Exempt from ISPM-15 heat-treatment delays under phytosanitary rules",
      ],
    },
    {
      id: "interiors",
      icon: Home,
      title: "Curved Architecture & Interior Fit-Outs",
      tagline: "Flexible Bendy Panels & Acoustic Wall Linings",
      description:
        "From organic serpentine hotel reception counters to perforated acoustic auditorium ceiling clouds, we provide specialized bendable timber panels and low-emission CARB 2 substrates.",
      suitablePanels: [
        "FlexiPly Architectural Curvature Plywood (4mm, 6mm, 8mm)",
        "UltraDense Green-Core Moisture-Resistant MDF (for 3D CNC Routing)",
        "Melamine Faced Acoustic Backing Boards",
      ],
      advantages: [
        "Bends effortlessly down to 100mm radius without kerfing or steaming",
        "Smooth uninterrupted veneer accepts thin laminates without faceting",
        "E0 and E1 low formaldehyde emissions certified for green buildings",
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Page Hero Header */}
        <div className="bg-forest-dark text-cream py-16 lg:py-24 bg-dark-grain border-b border-forest-light/30 relative">
          <Container size="wide">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-light bg-forest-surface px-3.5 py-1 rounded-full border border-forest-light/60">
                Industry Capabilities
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Tailored Timber Solutions for Every Industrial Sector
              </h1>
              <p className="text-base sm:text-lg text-cream/80 leading-relaxed">
                Discover how <strong className="text-white font-semibold">{siteConfig.name}</strong> partners with contractors, architects, and manufacturers to provide calibrated panel solutions tailored to specific engineering loads.
              </p>
            </div>
          </Container>
        </div>

        {/* Applications Breakdown */}
        <Section variant="cream" woodgrain padded="default">
          <Container size="wide">
            <div className="space-y-16">
              {applications.map((app, index) => {
                const Icon = app.icon;
                const isEven = index % 2 === 1;

                return (
                  <div
                    key={app.id}
                    id={app.id}
                    className="bg-white rounded-3xl border border-cream-border p-8 lg:p-12 shadow-sm scroll-mt-28"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                      <div
                        className={`space-y-6 ${
                          isEven ? "lg:col-span-7 lg:order-2" : "lg:col-span-7"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-forest/5 text-amber-oak flex items-center justify-center shrink-0">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-amber-oak">
                              {app.tagline}
                            </span>
                            <h2 className="font-display text-2xl sm:text-3xl font-bold text-charcoal">
                              {app.title}
                            </h2>
                          </div>
                        </div>

                        <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
                          {app.description}
                        </p>

                        {/* Engineering Advantages */}
                        <div className="space-y-2.5 pt-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal">
                            Key Structural Advantages:
                          </h4>
                          {app.advantages.map((adv, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{adv}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 flex flex-wrap gap-4">
                          <Button
                            href={`/quote?service=${encodeURIComponent(app.title)}`}
                            variant="amber"
                            size="default"
                          >
                            Request Sector Quote
                          </Button>
                          <Button
                            href="/products"
                            variant="secondary"
                            size="default"
                          >
                            Explore Suitable Panels
                          </Button>
                        </div>
                      </div>

                      {/* Right Panel: Recommended Specifications Box */}
                      <div
                        className={`bg-cream-surface rounded-2xl border border-cream-border p-6 sm:p-8 space-y-6 ${
                          isEven ? "lg:col-span-5 lg:order-1" : "lg:col-span-5"
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted">
                            Recommended Inventory
                          </span>
                          <h4 className="font-display text-lg font-bold text-charcoal">
                            Primary Plywood Specifications
                          </h4>
                        </div>

                        <ul className="space-y-3">
                          {app.suitablePanels.map((panel, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-cream-border text-xs font-semibold text-charcoal shadow-xs"
                            >
                              <Layers className="w-4 h-4 text-amber-oak shrink-0" />
                              <span>{panel}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="p-4 rounded-xl bg-forest-dark text-cream text-xs space-y-2">
                          <span className="font-bold text-amber-light uppercase tracking-wider block">
                            Direct Yard Batch Availability
                          </span>
                          <p className="text-cream/70 leading-relaxed">
                            Full bundle packs, container lots, and custom thickness calibrating available with verified test certificates.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

