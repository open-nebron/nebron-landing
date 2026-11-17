"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current || !bgRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const winHeight = window.innerHeight;

          // 1. Below viewport: completely hidden
          if (rect.top >= winHeight) {
            bgRef.current.style.opacity = "0";
            bgRef.current.style.visibility = "hidden";
          }
          // 2. Entering from bottom: crossfade in smoothly as 2nd section comes up
          else if (rect.top > 0) {
            const progress = 1 - rect.top / winHeight;
            const eased = progress * progress * (3 - 2 * progress);
            const scale = 1.03 - 0.03 * progress;

            bgRef.current.style.opacity = eased.toFixed(3);
            bgRef.current.style.visibility = "visible";
            bgRef.current.style.transform = `scale(${scale.toFixed(4)})`;
          }
          // 3. User is actively inside Section 2
          else {
            const scrollDistance = -rect.top;
            const sectionHeight = rect.height;
            const fadeStart = Math.max(0, sectionHeight - winHeight * 1.1);
            const fadeEnd = sectionHeight - winHeight * 0.2;

            if (scrollDistance < fadeStart) {
              // 100% stuck and pinned in viewport!
              bgRef.current.style.opacity = "1";
              bgRef.current.style.visibility = "visible";
              bgRef.current.style.transform = "scale(1)";
            } else if (scrollDistance >= fadeEnd) {
              // Section 2 has 100% moved past - remove background cleanly
              bgRef.current.style.opacity = "0";
              bgRef.current.style.visibility = "hidden";
            } else {
              // Smooth transition out into Section 3
              const t = (scrollDistance - fadeStart) / (fadeEnd - fadeStart);
              const eased = 1 - t * t * (3 - 2 * t);
              const scale = 1 + 0.03 * t;

              bgRef.current.style.opacity = eased.toFixed(3);
              bgRef.current.style.visibility = "visible";
              bgRef.current.style.transform = `scale(${scale.toFixed(4)})`;
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

  const features = [
    {
      title: "Sub-15ms Spatial Voice",
      description:
        "High-fidelity WebRTC audio pipelines with Opus 48kHz encoding, dynamic bitrate adjustment, and jitter buffer optimization.",
      badge: "voice-service",
      icon: (
        <svg
          className="h-6 w-6 text-cyan-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
          />
        </svg>
      ),
    },
    {
      title: "High-Frequency Realtime Chat",
      description:
        "Engineered with Redis pub/sub streams and MongoDB clustering for persistent, encrypted channel discussions and direct messaging.",
      badge: "chat-service",
      icon: (
        <svg
          className="h-6 w-6 text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-1.074-.85 9.948 9.948 0 011.082-2.73C4.195 15.932 3 14.07 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
          />
        </svg>
      ),
    },
    {
      title: "Zero-Trust Identity & JWKS",
      description:
        "RS256 asymmetric token signing with automatic key rotation, Argon2id password security, and public JWKS verification endpoints.",
      badge: "auth-service",
      icon: (
        <svg
          className="h-6 w-6 text-fuchsia-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      ),
    },
    {
      title: "Direct R2 Media Infrastructure",
      description:
        "Presigned upload slots with automated mime verification for avatars and banners, streaming directly to Cloudflare R2 object storage.",
      badge: "core-backend",
      icon: (
        <svg
          className="h-6 w-6 text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      ),
    },
    {
      title: "Native Cross-Platform Clients",
      description:
        "Dedicated web frontends, lightweight desktop clients, and mobile apps communicating with unified contracts across all devices.",
      badge: "clients",
      icon: (
        <svg
          className="h-6 w-6 text-amber-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3"
          />
        </svg>
      ),
    },
    {
      title: "Shared Contracts & Type-Safety",
      description:
        "Standardized OpenAPI 3.1 specifications and Zod contract validations keeping frontend and backend services in lockstep.",
      badge: "shared-contracts",
      icon: (
        <svg
          className="h-6 w-6 text-sky-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* 2nd Section Stuck / Fixed Background Image (z-1) */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="fixed inset-0 z-[1] pointer-events-none overflow-hidden transition-[opacity,transform] duration-75 will-change-[opacity,transform]"
        style={{ opacity: 0, visibility: "hidden" }}
      >
        <Image
          src="/features-bg-4k.webp"
          alt="Nebron Workspace Background"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center select-none hero-image-render opacity-75 sm:opacity-85"
        />
        {/* Anti-banding dither */}
        <div className="absolute inset-0 hero-dither pointer-events-none" />
        {/* Seamless edge blending gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090d] via-transparent to-[#08090d]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090d]/60 via-transparent to-[#08090d]/60" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* 2nd Section Content (glides up over the 1st section as you scroll) */}
      <section
        ref={sectionRef}
        id="features"
        className="relative z-10 min-h-[125vh] py-28 lg:py-40 flex flex-col justify-center"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 drop-shadow">
              Engineered Capabilities
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl drop-shadow-lg">
              Built for Extreme Speed & Total Modularity
            </h2>
            <p className="mt-4 text-base text-slate-300 drop-shadow leading-relaxed">
              Every layer of Nebron is independently decoupled, typed, and scaled
              for low latency communication.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="group relative rounded-2xl border border-white/15 bg-black/60 backdrop-blur-xl p-7 transition-all duration-300 hover:border-cyan-500/50 hover:bg-black/75 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 border border-white/15 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 transition-all">
                    {feat.icon}
                  </div>
                  <span className="font-mono text-[10px] text-cyan-300 rounded-md bg-white/10 px-2.5 py-0.5 border border-white/10">
                    {feat.badge}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white drop-shadow">
                  {feat.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
