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
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Industry Applications | Civil Formwork, Cabinetry & Marine Timber in Ethiopia",
  description: `Discover how ${siteConfig.name} supplies high-grade plywood solutions across structural concrete construction, luxury furniture manufacturing, transport packaging, and commercial interiors in Ethiopia.`,
};

export default function ServicesPage() {
  const applications = [
    {
      id: "construction",
      icon: Building2,
      title: "Commercial & Civil Concrete Construction",
      tagline: "High-Cycle Shuttering & Structural Formwork",
      description:
        "Engineered for high-rise floor slabs, bridge abutments, core shear walls, and slip-form systems. Our Dynea phenolic film-faced plywood delivers fair-faced architectural concrete finishes with up to 25+ reuse cycles.",
      suitablePanels: [
        "ProForm 120g/m² Dynea Film-Faced Shuttering (18mm, 21mm)",
        "Hardwood Structural Concrete Formwork Panels",
        "Anti-Slip Wiremesh Scaffolding Decks",
      ],
      advantages: [
        "Acrylic-sealed waterproof edge coating eliminates slurry seepage",
        "Minimal deflection under heavy hydrostatic wet concrete pressure",
        "Significantly reduces cost-per-pour compared to standard form boards",
      ],
    },
    {
      id: "furniture",
      icon: Armchair,
      title: "Architectural Millwork & Custom Cabinetry",
      tagline: "Calibrated Joinery Sheets & Warp-Free Substrates",
      description:
        "Modular kitchen manufacturers, wardrobe makers, and office fit-out studios require uniform gauge calibration with zero veneer telegraphing for high-pressure laminate pressing.",
      suitablePanels: [
        "VeneerCraft Bintangor & Okoume Commercial Plywood (9mm–18mm)",
        "SolidCore Kiln-Dried Pine Batten Blockboard (18mm, 25mm)",
        "UltraDense E1 Moisture-Resistant MDF Panels",
      ],
      advantages: [
        "Dual-side calibrated sanding delivers ±0.2mm thickness tolerance",
        "High screw-holding torque in edge and face fixings",
        "Kiln-dried seasoned cores prevent long-term gravitational warping",
      ],
    },
    {
      id: "packaging",
      icon: Package,
      title: "Industrial & Heavy Cargo Transport Packaging",
      tagline: "High-Strength Crating & Transport Flooring",
      description:
        "Heavy equipment transporters and logistics providers need moisture-resistant, phytosanitary-compliant wooden panels that endure long maritime shipping voyages and forklift impact.",
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
        "From organic curved reception counters to perforated acoustic auditorium ceiling clouds, we provide specialized bendable timber panels and low-emission CARB Phase 2 substrates.",
      suitablePanels: [
        "FlexiPly Architectural Curvature Plywood (4mm, 6mm, 8mm)",
        "UltraDense Green-Core Moisture-Resistant MDF",
        "Melamine Faced Acoustic Backing Boards",
      ],
      advantages: [
        "Bends effortlessly down to 100mm radius without kerfing or steaming",
        "Smooth uninterrupted veneer accepts thin laminates without faceting",
        "Low formaldehyde emissions certified for healthy commercial interiors",
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Page Hero Header */}
        <div className="bg-[#071711] text-white py-12 sm:py-16 lg:py-20 border-b border-white/15 relative">
          <Container size="wide">
            <div className="max-w-3xl space-y-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-block shadow-2xs">
                Industry Applications
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Engineered Timber Panels for Ethiopia&apos;s Core Industries.
              </h1>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl">
                Discover how <strong className="text-white font-semibold">{siteConfig.name}</strong> partners with contractors, architects, and manufacturers across Ethiopia to provide calibrated panel solutions tailored to specific engineering loads.
              </p>
            </div>
          </Container>
        </div>

        {/* Applications Breakdown */}
        <Section variant="cream" woodgrain padded="default" className="py-12 sm:py-16 lg:py-20">
          <Container size="wide">
            <div className="space-y-10 sm:space-y-14">
              {applications.map((app, index) => {
                const Icon = app.icon;
                const isEven = index % 2 === 1;

                return (
                  <Reveal key={app.id} variant="fade-up">
                    <div
                      id={app.id}
                      className="bg-white rounded-2xl sm:rounded-3xl border border-cream-border/90 p-6 sm:p-8 lg:p-10 shadow-2xs hover:shadow-lg transition-all duration-300 scroll-mt-24 group"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div
                          className={`space-y-5 ${
                            isEven ? "lg:col-span-7 lg:order-2" : "lg:col-span-7"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-forest/5 text-amber-oak group-hover:bg-amber-pale flex items-center justify-center shrink-0 transition-colors duration-200">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-oak block">
                                {app.tagline}
                              </span>
                              <h2 className="font-display text-xl sm:text-2xl font-bold text-charcoal">
                                {app.title}
                              </h2>
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                            {app.description}
                          </p>

                          {/* Engineering Advantages */}
                          <div className="space-y-2 pt-1">
                            <h4 className="text-[11px] font-bold uppercase tracking-wider text-charcoal">
                              Key Structural Advantages:
                            </h4>
                            {app.advantages.map((adv, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2 text-xs sm:text-sm text-charcoal"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{adv}</span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-3 flex flex-col sm:flex-row gap-3">
                            <Button
                              href={`/quote?service=${encodeURIComponent(app.title)}`}
                              variant="amber"
                              size="default"
                              className="w-full sm:w-auto font-bold"
                            >
                              Request Sector Quote
                            </Button>
                            <Button
                              href="/products"
                              variant="secondary"
                              size="default"
                              className="w-full sm:w-auto font-semibold"
                            >
                              Explore Suitable Panels
                            </Button>
                          </div>
                        </div>

                        {/* Right Panel: Recommended Specifications Box */}
                        <div
                          className={`bg-cream-surface rounded-xl sm:rounded-2xl border border-cream-border/90 p-5 sm:p-6 space-y-4 ${
                            isEven ? "lg:col-span-5 lg:order-1" : "lg:col-span-5"
                          }`}
                        >
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-muted">
                              Recommended Specifications
                            </span>
                            <h4 className="font-display text-base font-bold text-charcoal">
                              Primary Plywood Grades
                            </h4>
                          </div>

                          <ul className="space-y-2">
                            {app.suitablePanels.map((panel, idx) => (
                              <li
                                key={idx}
                                className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-cream-border/80 text-xs font-semibold text-charcoal shadow-2xs"
                              >
                                <Layers className="w-3.5 h-3.5 text-amber-oak shrink-0" />
                                <span>{panel}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="p-3.5 rounded-xl bg-[#0B241B] text-white text-xs space-y-1">
                            <span className="font-bold text-amber-300 text-[11px] uppercase tracking-wider block">
                              Addis Ababa Yard Availability
                            </span>
                            <p className="text-white/75 leading-relaxed text-[11px]">
                              Full bundle packs and container lots available with verified laboratory test certificates.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
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
