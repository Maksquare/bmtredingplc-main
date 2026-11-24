import React from "react";
import type { Metadata } from "next";
import { AdminProvider } from "@/lib/admin-store";
import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";

export const metadata: Metadata = {
  title: "Admin Dashboard & CMS | bmtradingplc",
  description: "Administrative control center for inventory, quotes, contractor RFQs, and site management.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </AdminProvider>
  );
}

