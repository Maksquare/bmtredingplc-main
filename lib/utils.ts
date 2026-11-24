import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(dateString: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Smart route matcher for navigation links.
 * Matches exact root "/" or sub-routes with trailing slash or query params.
 */
export function isRouteActive(pathname: string | null | undefined, href: string): boolean {
  if (!pathname || !href) return false;
  if (href === "/") {
    return pathname === "/";
  }
  return (
    pathname === href ||
    pathname.startsWith(`${href}/`) ||
    pathname.startsWith(`${href}?`)
  );
}

