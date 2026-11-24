import React from "react";
import { ShieldCheck, Award, Leaf, CheckCircle2, FileCheck, Layers } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function TrustBar() {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: "BS 1088 : 2018",
      subtitle: "Boil-Proof Marine Standard",
    },
    {
      icon: Layers,
      title: "Dynea 120g/m²",
      subtitle: "High-Cycle Shuttering Film",
    },
    {
      icon: Leaf,
      title: "FSC Certified",
      subtitle: "Sustainable Concessions",
    },
    {
      icon: Award,
      title: "ISO 9001 : 2015",
      subtitle: "Audited Quality Systems",
    },
    {
      icon: FileCheck,
      title: "CARB Phase 2",
      subtitle: "E0 Low Formaldehyde",
    },
    {
      icon: CheckCircle2,
      title: "Zero Core Voids",
      subtitle: "100% Solid Inner Veneers",
    },
  ];

  return (
    <div className="bg-cream-surface border-b border-cream-border/70 py-6 sm:py-7">
      <Container size="wide">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 items-center">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2.5 sm:gap-3 group p-2 rounded-xl hover:bg-white/70 active:scale-95 transition-all duration-200 border border-transparent hover:border-cream-border/80"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-forest/5 group-hover:bg-amber-oak/10 flex items-center justify-center text-forest group-hover:text-amber-oak transition-colors duration-200 shrink-0">
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-charcoal truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-charcoal-muted truncate">
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
