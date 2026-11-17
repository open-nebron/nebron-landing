"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Navbar from "./Navbar";

const TOTAL_SLIDES = 3;
const TRANSITION_DURATION_MS = 1200; // 1.2s smooth cinematic dissolve
const TRANSITION_COOLDOWN_MS = 1500; // Lock buffer to absorb all inertia and rapid gestures
const SCROLL_THRESHOLD = 300;        // Intentional scroll requirement
const SCROLL_DELAY_MS = 100;         // Delay before triggering transition

export default function PresentationView() {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  const microservices = [
    {
      name: "auth-service",
      port: "4001",
      role: "Identity & Tokens",
      tech: "Fastify · Jose · Argon2 · Redis · Mongo",
      desc: "Issues RS256 access & refresh tokens, rotation reuse prevention, public JWKS key exposure.",
    },
    {
      name: "core-backend",
      port: "4002",
      role: "User Profiles & Media",
      tech: "Fastify · S3/R2 SDK · MongoDB · OpenAPI 3.1",
      desc: "Handles username claims, profile metadata, preferences, and Cloudflare R2 presigned media slots.",
    },
    {
      name: "chat-service",
      port: "4003",
      role: "Real-time Messaging",
      tech: "WebSockets · Redis Pub/Sub · MongoDB",
      desc: "Channels, direct messaging, typing alerts, read receipts, and instantaneous message delivery.",
    },
    {
      name: "voice-service",
      port: "4004",
      role: "Spatial WebRTC Voice",
      tech: "WebRTC SFU · Opus 48kHz · UDP Media",
      desc: "Sub-15ms voice channels with spatial audio simulation and dynamic packet loss concealment.",
    },
  ];

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

      {/* Background 2: Architecture Mesh Background */}
      <div
        className={`fixed inset-0 z-0 pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          currentSlide === 2
            ? "opacity-100 scale-100 blur-none"
            : "opacity-0 scale-[1.06] blur-[3px]"
        }`}
      >
        <div className="absolute top-1/4 left-1/3 h-[500px] w-[600px] rounded-full bg-cyan-600/15 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/3 h-[500px] w-[600px] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] opacity-60" />
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

      {/* Slide 2: Architecture Section */}
      <div
        className={`absolute inset-0 z-30 flex flex-col justify-between items-center px-4 pt-20 pb-4 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          currentSlide === 2
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-8 scale-[0.96] pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-5xl w-full my-auto">
          <div className="text-center mb-6 sm:mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 drop-shadow">
              System Topology
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white drop-shadow-lg">
              Polyrepo Microservice Architecture
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Decoupled services with dedicated databases, isolated runtimes, and shared contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 max-h-[58vh] overflow-y-auto sm:overflow-visible pr-1 sm:pr-0">
            {microservices.map((svc) => (
              <div
                key={svc.name}
                className="rounded-xl border border-white/15 bg-[#0c0e17]/85 backdrop-blur-xl p-4 sm:p-5 hover:border-indigo-500/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="font-mono text-sm font-bold text-white">
                      {svc.name}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] rounded bg-indigo-500/10 text-indigo-400 px-2 py-0.5 border border-indigo-500/20">
                    Port :{svc.port}
                  </span>
                </div>

                <div className="mt-2 text-xs font-medium text-slate-200">
                  {svc.role}
                </div>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  {svc.desc}
                </p>

                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Stack:</span>
                  <span className="text-cyan-300/80">{svc.tech}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compact Footer */}
        <div className="w-full max-w-5xl border-t border-white/10 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">NEBRON</span>
            <span>© 2026 Open Nebron. Apache 2.0 / MIT.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/open-nebron" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <button onClick={() => goToSlide(0)} className="hover:text-white transition-colors">
              Top ↑
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SIDE SLIDE INDICATORS (Clickable 01, 02, 03 pills)             */}
      {/* ============================================================== */}
      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {[0, 1, 2].map((idx) => (
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
