"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current || !bgRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const sectionHeight = rect.height;
          // scrollDistance is how many pixels the hero top has scrolled past the viewport top
          const scrollDistance = -rect.top;

          if (scrollDistance <= 0) {
            // At the top or before hero
            bgRef.current.style.opacity = "1";
            bgRef.current.style.visibility = "visible";
            bgRef.current.style.transform = "scale(1)";
          } else {
            // Fade out smoothly between 30% and 90% of hero scroll
            const fadeStart = sectionHeight * 0.3;
            const fadeEnd = sectionHeight * 0.9;

            if (scrollDistance < fadeStart) {
              bgRef.current.style.opacity = "1";
              bgRef.current.style.visibility = "visible";
              bgRef.current.style.transform = "scale(1)";
            } else if (scrollDistance >= fadeEnd) {
              // Hero section has 100% moved past - remove background completely
              bgRef.current.style.opacity = "0";
              bgRef.current.style.visibility = "hidden";
            } else {
              // Smooth cubic easing transition
              const t = (scrollDistance - fadeStart) / (fadeEnd - fadeStart);
              const easedOpacity = 1 - (t * t * (3 - 2 * t));
              const subtleScale = 1 + (0.04 * t);

              bgRef.current.style.opacity = easedOpacity.toFixed(3);
              bgRef.current.style.visibility = "visible";
              bgRef.current.style.transform = `scale(${subtleScale.toFixed(4)})`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Stuck / Fixed Background Image (stays pinned in viewport while scrolling) */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-[opacity,transform] duration-75 will-change-[opacity,transform]"
      >
        <Image
          src="/hero-bg-4k.webp"
          alt="Nebron Cinematic Hero Background"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center select-none hero-image-render"
        />
        {/* Anti-banding film grain & smooth dither layer */}
        <div className="absolute inset-0 hero-dither pointer-events-none" />
        {/* Edge blending gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090d]/80 via-transparent to-[#08090d]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090d]/40 via-transparent to-[#08090d]/40" />
      </div>

      {/* Hero Section Content (moves naturally with page scroll over the stuck background) */}
      <section
        ref={sectionRef}
        className="relative z-10 min-h-[92vh] flex flex-col justify-center items-center py-24 lg:py-36"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Hero Title & Subtitle */}
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl drop-shadow-2xl">
              <span className="block text-white">Next-Gen Real-Time</span>
              <span className="mt-2 block bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
                Voice, Chat & Identity.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-200 leading-relaxed drop-shadow-md">
              An open polyrepo ecosystem engineered for sub-15ms spatial audio,
              high-throughput websocket chat, zero-trust cryptographic identity,
              and high-res media storage.
            </p>

            {/* Action CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#launch"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-cyan-500/20 transition-all hover:shadow-cyan-500/35 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Launch Web Client</span>
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>

              <a
                href="#architecture"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md px-7 py-3.5 text-sm font-medium text-slate-200 transition-all hover:bg-white/10 hover:border-white/30 active:scale-[0.98]"
              >
                <svg
                  className="h-4 w-4 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                  />
                </svg>
                <span>Architecture Specs</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
