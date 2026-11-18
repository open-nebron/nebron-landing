"use client";

import { GlassTiles } from "@/components/ui/glass-tiles";

// Deep Violet Palette only
const DEEP_VIOLET = {
  glow: "#006eff",
  deep: "#3a1a8a",
  ground: "#07040e",
};

interface GlassworksSectionProps {
  isActive: boolean;
  onGoToSlide?: (slideIndex: number) => void;
}

export default function GlassworksSection({
  isActive,
}: GlassworksSectionProps) {
  return (
    <div className="relative h-full w-full overflow-hidden select-none bg-black">
      {/* Interactive WebGL Glass Tiles - Fixed Deep Violet */}
      <GlassTiles
        palette={DEEP_VIOLET}
        columns={8}
        speed={1}
        className="h-full w-full"
      >
        <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-14 lg:px-20 max-w-5xl mx-auto">
          {/* Main Hero Showcase */}
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] drop-shadow-2xl">
              Engineered for Clarity.
              <span className="block mt-2 text-white/90">
                Shielded by Mathematics.
              </span>
            </h2>

            <p className="text-base sm:text-xl text-slate-200/90 leading-relaxed max-w-2xl drop-shadow-md">
              No algorithmic feeds designed to addict you. No surveillance advertising tracking your keystrokes.
              Just high-frequency encrypted messaging, sub-15ms spatial audio rooms, and sovereign identity you truly own.
            </p>

            {/* Brand New App-Specific Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://github.com/open-nebron"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-slate-200 active:scale-[0.98] shadow-2xl"
              >
                <svg
                  className="h-4 w-4 text-slate-950 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                  />
                </svg>
                <span>Explore Protocol Specs</span>
              </a>

              <a
                href="https://github.com/open-nebron"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/20 hover:border-white/40 active:scale-[0.98]"
              >
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 14.25h13.5m-13.5 3h13.5m-9-6.75h4.5m-4.5 3h4.5m-7.5-6h10.5A2.25 2.25 0 0121 9.75v10.5A2.25 2.25 0 0118.75 22.5H5.25A2.25 2.25 0 013 20.25V9.75A2.25 2.25 0 015.25 7.5z"
                  />
                </svg>
                <span>Self-Host a Node</span>
              </a>
            </div>
          </div>
        </div>
      </GlassTiles>
    </div>
  );
}
