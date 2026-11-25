"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Building2,
  Check,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { gsap } from "gsap";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admin";

  const [email, setEmail] = useState("admin@bmtradingplc.com");
  const [password, setPassword] = useState("bmt2026");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [justAutoFilled, setJustAutoFilled] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Micro-Animation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 28, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "power3.out" }
      );

      gsap.fromTo(
        [headerRef.current, badgeRef.current, formRef.current?.children],
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
          delay: 0.15,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Micro-interaction: Shake on error
  const triggerErrorShake = () => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { x: -10 },
      {
        x: 10,
        duration: 0.08,
        repeat: 5,
        yoyo: true,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.set(cardRef.current, { x: 0 });
        },
      }
    );
  };

  const handleAutoFill = () => {
    setEmail("admin@bmtradingplc.com");
    setPassword("bmt2026");
    setErrorMessage(null);
    setJustAutoFilled(true);
    setTimeout(() => setJustAutoFilled(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed. Please verify credentials.");
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push(redirectTo);
        router.refresh();
      }, 700);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to log in.";
      setErrorMessage(msg);
      triggerErrorShake();
    } finally {
      setIsLoading(false);
    }
  };

  const isEmailValid = email.includes("@") && email.includes(".");

  return (
    <div className="min-h-screen bg-[#05130D] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden selection:bg-amber-500/30 selection:text-amber-200">
      {/* Cinematic Ambient Glow & Background Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Warm Golden Timber Backlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-gradient-to-tr from-amber-600/15 via-emerald-800/10 to-transparent rounded-full blur-[120px] opacity-80" />
        {/* Subtle Architectural Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Dark Grain Vignette */}
        <div className="absolute inset-0 bg-radial-vignette opacity-70" />
      </div>

      {/* Top Header Navigation */}
      <header className="relative z-10 flex items-center justify-between max-w-5xl w-full mx-auto pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-all text-xs font-medium group py-1.5 px-3 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-200 text-amber-400" />
          <span>Return to Public Website</span>
        </Link>

        <div className="flex items-center gap-2 text-[11px] text-emerald-300 font-semibold bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-500/20 backdrop-blur-md shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Operations Gateway Active</span>
        </div>
      </header>

      {/* Login Card Container */}
      <main className="relative z-10 w-full max-w-[430px] mx-auto my-auto py-6 sm:py-8">
        <div
          ref={cardRef}
          className="bg-[#091D15]/90 rounded-3xl border border-white/15 p-6 sm:p-9 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85),0_0_40px_rgba(200,131,42,0.1)] backdrop-blur-2xl space-y-6 relative overflow-hidden transition-all duration-300"
        >
          {/* Top Hairline Amber Highlight */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />

          {/* Brand Header */}
          <div ref={headerRef} className="text-center space-y-3">
            {/* Architectural Timber Monogram Emblem */}
            <div className="relative inline-flex items-center justify-center mx-auto mb-1 group">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-amber-700 rounded-2xl blur-md opacity-40 group-hover:opacity-60 transition duration-300" />
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-b from-[#1E3B2E] to-[#0A1A13] border border-amber-400/40 flex items-center justify-center shadow-inner">
                <Building2 className="w-7 h-7 text-amber-400 drop-shadow-md" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2">
                <h1 className="font-display text-2xl sm:text-[26px] font-extrabold text-white tracking-tight">
                  {siteConfig.name}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300">
                  Portal
                </span>
              </div>
              <p className="text-xs text-white/60 mt-1 font-medium">
                Safarian &amp; Plywood Management Portal
              </p>
            </div>
          </div>

          {/* Quick Demo Credentials Pill */}
          <div
            ref={badgeRef}
            className="rounded-2xl bg-white/[0.04] hover:bg-white/[0.06] border border-white/10 p-3.5 transition-all text-xs space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[10px] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Authorized Staff Demo Access</span>
              </div>
              <button
                type="button"
                onClick={handleAutoFill}
                className="text-[11px] font-semibold text-amber-300 hover:text-white bg-amber-500/20 hover:bg-amber-500/30 active:scale-95 px-2.5 py-1 rounded-lg border border-amber-400/30 transition-all flex items-center gap-1"
              >
                {justAutoFilled ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-300">Filled</span>
                  </>
                ) : (
                  <span>Auto-Fill</span>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-white/75 bg-black/30 p-2 rounded-xl border border-white/5 font-mono">
              <div className="truncate">
                <span className="text-white/40 block text-[9px] uppercase font-sans font-bold">User</span>
                <span className="text-white/90">admin@bmtradingplc.com</span>
              </div>
              <div className="text-right">
                <span className="text-white/40 block text-[9px] uppercase font-sans font-bold">Pass</span>
                <span className="text-amber-300 font-bold">bmt2026</span>
              </div>
            </div>
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 shadow-sm animate-in fade-in slide-in-from-top-1 duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <div className="leading-snug">{errorMessage}</div>
            </div>
          )}

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-emerald-200/90 tracking-wider uppercase flex items-center justify-between">
                <span>Staff Email Address</span>
                {isEmailValid && (
                  <span className="text-[10px] text-emerald-400 font-normal lowercase flex items-center gap-1">
                    <Check className="w-3 h-3" /> valid
                  </span>
                )}
              </label>
              <div className="relative group">
                <Mail className="w-4 h-4 text-white/40 group-focus-within:text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@bmtradingplc.com"
                  className="w-full h-11 pl-10 pr-4 text-sm bg-black/40 rounded-xl border border-white/15 text-white placeholder:text-white/30 focus:border-amber-400 focus:bg-black/60 focus:outline-none focus:ring-4 focus:ring-amber-500/15 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-emerald-200/90 tracking-wider uppercase">
                  Staff Password
                </label>
                <span className="text-[10px] text-white/40">Min. 6 characters</span>
              </div>
              <div className="relative group">
                <Lock className="w-4 h-4 text-white/40 group-focus-within:text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-10 text-sm bg-black/40 rounded-xl border border-white/15 text-white placeholder:text-white/30 focus:border-amber-400 focus:bg-black/60 focus:outline-none focus:ring-4 focus:ring-amber-500/15 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/90 transition-colors p-1 rounded-md focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className="w-full h-12 rounded-xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:via-amber-500 hover:to-amber-600 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-amber-950/60 border border-amber-300/30 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-200" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span className="text-white">Authenticated • Opening Dashboard...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Admin Dashboard</span>
                    <ArrowRight className="w-4 h-4 text-amber-200 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Secure Environment Footer */}
          <div className="pt-2 border-t border-white/10 text-center text-[10px] text-white/45 space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-white/60 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/80" />
              <span>Protected by 256-bit SSL & Supabase Auth</span>
            </div>
            <p>Access is strictly reserved for authorized {siteConfig.name} personnel.</p>
          </div>
        </div>
      </main>

      {/* Bottom Copyright */}
      <footer className="relative z-10 text-center text-[11px] text-white/35 max-w-5xl mx-auto w-full pb-2">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Addis Ababa Operations Center.
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#05130D] flex items-center justify-center text-white">
          <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
