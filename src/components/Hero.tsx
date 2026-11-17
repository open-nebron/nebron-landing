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

            {/* Action CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
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
      </section>
    </>
  );
}
