"use client";

import React, { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-charcoal flex">
      {/* Fixed Desktop & Slide-out Mobile Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Pass toggle helper to children via custom prop or standard layout */}
        <main className="flex-1 min-w-0">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<{ onOpenSidebar?: () => void }>, {
                onOpenSidebar: () => setSidebarOpen(true),
              });
            }
            return child;
          })}
        </main>
      </div>
    </div>
  );
}

