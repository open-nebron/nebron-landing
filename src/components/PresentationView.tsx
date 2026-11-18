"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import GlassworksSection from "./GlassworksSection";

const TOTAL_SLIDES = 4;
const TRANSITION_DURATION_MS = 1200; // 1.2s smooth cinematic dissolve
const TRANSITION_COOLDOWN_MS = 1500; // Lock buffer to absorb all inertia and rapid gestures
const SCROLL_THRESHOLD = 300;        // Intentional scroll requirement
const SCROLL_DELAY_MS = 100;         // Delay before triggering transition

export default function PresentationView() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [handle, setHandle] = useState("");
  const isLockedRef = useRef(false);
  const touchStartY = useRef(0);
  const scrollAccumulatorRef = useRef(0);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < TOTAL_SLIDES && !isLockedRef.current) {
      isLockedRef.current = true;
      scrollAccumulatorRef.current = 0;
      setCurrentSlide(index);
      setTimeout(() => {
        isLockedRef.current = false;
      }, TRANSITION_COOLDOWN_MS);
    }
  }, []);

  const nextSlide = useCallback(() => {
    if (!isLockedRef.current) {
      scrollAccumulatorRef.current = 0;
      setCurrentSlide((prev: number) => {
        if (prev < TOTAL_SLIDES - 1) {
          isLockedRef.current = true;
          setTimeout(() => {
            isLockedRef.current = false;
          }, TRANSITION_COOLDOWN_MS);
          return prev + 1;
        }
        return prev;
      });
    }
  }, []);

  const prevSlide = useCallback(() => {
    if (!isLockedRef.current) {
      scrollAccumulatorRef.current = 0;
      setCurrentSlide((prev: number) => {
        if (prev > 0) {
          isLockedRef.current = true;
          setTimeout(() => {
            isLockedRef.current = false;
          }, TRANSITION_COOLDOWN_MS);
          return prev - 1;
        }
        return prev;
      });
    }
  }, []);

  useEffect(() => {
    let delayTimer: NodeJS.Timeout | null = null;

    // Wheel listener: accumulates deliberate scroll energy with delay confirmation
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Discard all incoming events while locked
      if (isLockedRef.current) {
        scrollAccumulatorRef.current = 0;
        return;
      }

      // Reset accumulation if scrolling changes direction
      if (
        (scrollAccumulatorRef.current > 0 && e.deltaY < 0) ||
        (scrollAccumulatorRef.current < 0 && e.deltaY > 0)
      ) {
        scrollAccumulatorRef.current = 0;
        if (delayTimer) {
          clearTimeout(delayTimer);
          delayTimer = null;
        }
      }

      scrollAccumulatorRef.current += e.deltaY;

      // Auto-decay if user pauses scrolling for 350ms
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
      resetTimeoutRef.current = setTimeout(() => {
        scrollAccumulatorRef.current = 0;
        if (delayTimer) {
          clearTimeout(delayTimer);
          delayTimer = null;
        }
      }, 350);

      // Check threshold with intentional delay
      if (scrollAccumulatorRef.current >= SCROLL_THRESHOLD && !delayTimer) {
        delayTimer = setTimeout(() => {
          scrollAccumulatorRef.current = 0;
          delayTimer = null;
          nextSlide();
        }, SCROLL_DELAY_MS);
      } else if (scrollAccumulatorRef.current <= -SCROLL_THRESHOLD && !delayTimer) {
        delayTimer = setTimeout(() => {
          scrollAccumulatorRef.current = 0;
          delayTimer = null;
          prevSlide();
        }, SCROLL_DELAY_MS);
      }
    };

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        prevSlide();
      }
    };

    // Touch navigation for mobile/tablets
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const diffY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diffY) >= 80) {
        if (diffY > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      if (delayTimer) {
        clearTimeout(delayTimer);
      }
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#08090d] select-none">
      {/* Top Fixed Navbar */}
      <Navbar activeSlide={currentSlide} onSelectSlide={goToSlide} />

      {/* ============================================================== */}
      {/* 4-SIDED SMOOTH BLACK CINEMATIC VIGNETTE (Frame all 4 sides)    */}
      {/* ============================================================== */}
      <div className="fixed inset-0 z-20 pointer-events-none shadow-[inset_0_0_140px_60px_rgba(8,9,13,0.9)]">
        {/* Top edge multi-stop black fade */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#08090d] via-[#08090d]/85 via-40% to-transparent" />
        {/* Bottom edge multi-stop black fade */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#08090d] via-[#08090d]/90 via-45% to-transparent" />
        {/* Left edge multi-stop black fade */}
        <div className="absolute left-0 inset-y-0 w-32 sm:w-56 bg-gradient-to-r from-[#08090d] via-[#08090d]/80 via-35% to-transparent" />
        {/* Right edge multi-stop black fade */}
        <div className="absolute right-0 inset-y-0 w-32 sm:w-56 bg-gradient-to-l from-[#08090d] via-[#08090d]/80 via-35% to-transparent" />
        {/* Radial vignette center softening */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(8,9,13,0.45)_65%,rgba(8,9,13,0.95)_100%)]" />
      </div>

      {/* ============================================================== */}
      {/* BACKGROUND LAYERS (Silky 1200ms cinematic dissolve with depth) */}
      {/* ============================================================== */}

      {/* Background 0: Hero 4K Silhouettes */}
      <div
        className={`fixed inset-0 z-0 pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          currentSlide === 0
            ? "opacity-100 scale-100 blur-none"
            : "opacity-0 scale-[1.06] blur-[3px]"
        }`}
      >
        <Image
          src="/hero-bg-4k.webp"
          alt="Nebron Silhouettes"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center hero-image-render"
        />
        <div className="absolute inset-0 hero-dither pointer-events-none" />
      </div>

      {/* Background 1: Features 4K Girl with Laptop */}
      <div
        className={`fixed inset-0 z-0 pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          currentSlide === 1
            ? "opacity-100 scale-100 blur-none"
            : "opacity-0 scale-[1.06] blur-[3px]"
        }`}
      >
        <Image
          src="/features-bg-4k.webp"
          alt="Nebron Workspace"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center hero-image-render"
        />
        <div className="absolute inset-0 hero-dither pointer-events-none" />
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[0.5px]" />
      </div>

      {/* Background 2: 4K Twilight Horizon Wallpaper */}
      <div
        className={`fixed inset-0 z-0 pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          currentSlide === 2
            ? "opacity-100 scale-100 blur-none"
            : "opacity-0 scale-[1.06] blur-[3px]"
        }`}
      >
        <Image
          src="/cta-bg-4k.webp"
          alt="Nebron Audio Silhouette"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center hero-image-render"
        />
        <div className="absolute inset-0 hero-dither pointer-events-none" />
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[0.5px]" />
      </div>

      {/* ============================================================== */}
      {/* CONTENT LAYERS (Smooth 1200ms transition with gentle lift)    */}
      {/* ============================================================== */}

      {/* Slide 0: Hero Section */}
      <div
        className={`absolute inset-0 z-30 flex flex-col justify-center items-center px-4 pt-16 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          currentSlide === 0
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-8 scale-[0.96] pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl drop-shadow-2xl text-white">
            <span className="block text-white">One Social Media Platform,</span>
            <span className="mt-2 block text-white/90">
              All You Need to Get Started.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-200 leading-relaxed drop-shadow-md">
            An all-in-one open ecosystem uniting crystal-clear spatial voice, instant encrypted
            messaging, social feeds, and zero-trust cryptographic identity — engineered for seamless
            real-time connection.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary Action: Download Button */}
            <a
              href="https://github.com/open-nebron/desktop-app/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-xl transition-all hover:bg-slate-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-y-0.5 text-slate-950"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              <span>Download App</span>
            </a>

            {/* Secondary Action: Launch Web Client */}
            <a
              href="https://github.com/open-nebron/web-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/15 hover:border-white/30 active:scale-[0.98]"
            >
              <span>Launch Web Client</span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Slide 1: Trust & Privacy Section */}
      <div
        className={`absolute inset-0 z-30 flex flex-col justify-center items-center px-4 pt-16 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          currentSlide === 1
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-8 scale-[0.96] pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-4xl w-full text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
            Security &amp; Data Sovereignty
          </span>

          <h2 className="mt-3 text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-2xl">
            Trust? Privacy?
          </h2>

          <p className="mt-6 text-xl sm:text-3xl text-slate-100 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
            No worries, all your personal chats are{" "}
            <span className="text-white font-bold underline decoration-white/30 underline-offset-8">
              end-to-end encrypted
            </span>
            .
          </p>

          {/* The Proof Link CTA */}
          <div className="mt-10 flex items-center justify-center">
            <a
              href="https://github.com/open-nebron"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/40 hover:scale-[1.03] active:scale-[0.98] shadow-2xl"
            >
              <span>Proof? Check yourself on</span>
              <span className="underline decoration-white/50 underline-offset-4 group-hover:decoration-white font-bold">
                open-nebron
              </span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Slide 2: Call to Action / Get Started */}
      <div
        className={`absolute inset-0 z-30 flex flex-col justify-between items-center px-4 pt-20 pb-6 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          currentSlide === 2
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-8 scale-[0.96] pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-4xl w-full my-auto text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
            Join the Movement
          </span>

          <h2 className="mt-3 text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-2xl">
            Ready to leave the bloat behind?
          </h2>

          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
            Claim your handle today and start connecting with complete data sovereignty.
          </p>

          {/* Interactive Handle Claim Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (handle.trim()) {
                window.open(`https://github.com/open-nebron?claim=${encodeURIComponent(handle.trim())}`, "_blank");
              }
            }}
            className="mt-8 sm:mt-10 mx-auto flex w-full max-w-md flex-col sm:flex-row items-center gap-2 rounded-2xl border border-white/20 bg-black/40 p-2 backdrop-blur-xl shadow-2xl transition-all focus-within:border-white/50"
          >
            <div className="flex w-full sm:w-auto flex-1 items-center px-3 py-1.5 text-white">
              <span className="font-mono text-sm text-slate-400 select-none">nebron.org/@</span>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                placeholder="username"
                maxLength={30}
                className="w-full bg-transparent px-1.5 py-1 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-950 transition-all hover:bg-slate-200 active:scale-[0.98] shadow-md whitespace-nowrap"
            >
              <span>Claim Handle</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </form>

          {/* Secondary Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
            <a
              href="https://github.com/open-nebron/desktop-app/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-5 py-2.5 text-white transition-all hover:bg-white/20 hover:border-white/40 active:scale-[0.98]"
            >
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span>Download Desktop</span>
            </a>
            <a
              href="https://github.com/open-nebron"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-5 py-2.5 text-white transition-all hover:bg-white/20 hover:border-white/40 active:scale-[0.98]"
            >
              <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>Star on GitHub</span>
            </a>
          </div>
        </div>

        {/* Compact Footer */}
        <div className="w-full max-w-5xl border-t border-white/10 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wider">NEBRON</span>
            <span>© 2026 Open Nebron. Open Source.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/open-nebron" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <button onClick={() => goToSlide(3)} className="text-cyan-400 hover:text-white transition-colors">
              Protocol ↓
            </button>
            <button onClick={() => goToSlide(0)} className="hover:text-white transition-colors">
              Top ↑
            </button>
          </div>
        </div>
      </div>

      {/* Slide 3: Protocol Section (4th Section) */}
      <div
        className={`absolute inset-0 z-30 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          currentSlide === 3
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-[0.98] pointer-events-none"
        }`}
      >
        <GlassworksSection isActive={currentSlide === 3} />
      </div>

      {/* ============================================================== */}
      {/* SIDE SLIDE INDICATORS (Clickable 01, 02, 03, 04 pills)         */}
      {/* ============================================================== */}
      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {[0, 1, 2, 3].map((idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="group flex items-center gap-2 focus:outline-none"
          >
            <span
              className={`font-mono text-[10px] tracking-wider transition-all duration-300 ${
                currentSlide === idx
                  ? "text-cyan-400 font-bold opacity-100 scale-110"
                  : "text-slate-500 opacity-60 group-hover:opacity-100"
              }`}
            >
              0{idx + 1}
            </span>
            <div
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? "w-7 bg-white shadow-md shadow-white/20"
                  : "w-2.5 bg-white/20 group-hover:bg-white/40"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
