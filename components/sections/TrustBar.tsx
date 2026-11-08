import React from "react";
import { ShieldCheck, Award, Leaf, CheckCircle2, FileCheck, Layers } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function TrustBar() {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: "BS 1088 : 2018",
      subtitle: "Boiling Water Proof Marine Standard",
    },
    {
      icon: Layers,
      title: "Dynea 120g/m²",
      subtitle: "High-Cycle Phenolic Shuttering Film",
    },
    {
      icon: Leaf,
      title: "FSC Certified",
      subtitle: "Responsibly Harvested Hardwood",
    },
    {
      icon: Award,
      title: "ISO 9001 : 2015",
      subtitle: "Audited Quality Management",
    },
    {
      icon: FileCheck,
      title: "CARB Phase 2",
      subtitle: "E0 Low Formaldehyde Emissions",
    },
    {
      icon: CheckCircle2,
      title: "Zero Core Voids",
      subtitle: "100% Solid Veneer Construction",
    },
  ];

  return (
    <div className="bg-cream-surface border-b border-cream-border/80 py-8">
      <Container size="wide">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 group p-2 rounded-xl hover:bg-white/60 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-forest/5 group-hover:bg-amber-oak/10 flex items-center justify-center text-forest group-hover:text-amber-oak transition-colors shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-charcoal-muted truncate">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

