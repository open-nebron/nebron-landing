"use client";

import { useState } from "react";
import { GlassTiles, type GlassTilesPalette } from "@/components/ui/glass-tiles";

const PALETTES: Record<string, { label: string; palette: GlassTilesPalette }> = {
  ice: {
    label: "Ice Cyan",
    palette: { glow: "#7fd8ff", deep: "#12406b", ground: "#03070d" },
  },
  violet: {
    label: "Deep Violet",
    palette: { glow: "#c25cff", deep: "#3a1a8a", ground: "#07040e" },
  },
  ember: {
    label: "Ember Glow",
    palette: { glow: "#ff8a3d", deep: "#6b2410", ground: "#0c0503" },
  },
};

interface GlassworksSectionProps {
  isActive: boolean;
  onGoToSlide: (slideIndex: number) => void;
}

export default function GlassworksSection({
  isActive,
  onGoToSlide,
}: GlassworksSectionProps) {
  const [selectedVariant, setSelectedVariant] = useState<string>("ice");

  return (
    <div className="relative h-full w-full overflow-hidden select-none bg-black">
      {/* Interactive WebGL Glass Tiles */}
      <GlassTiles
        palette={PALETTES[selectedVariant]?.palette ?? PALETTES.ice.palette}
        columns={8}
        speed={1}
        className="h-full w-full"
      >
        <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-12 lg:p-16 pt-24 sm:pt-28">
          {/* Top Info & Interactive Palette Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
              Section 05 · Vitrine · Glassworks
            </span>

            {/* Interactive Palette Switcher */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 p-1 backdrop-blur-md">
              {Object.entries(PALETTES).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setSelectedVariant(key)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    selectedVariant === key
                      ? "bg-white text-slate-950 font-bold shadow-md"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Hero Showcase */}
          <div className="max-w-3xl space-y-4 my-auto">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] drop-shadow-2xl">
              Light, caught in the glass.
            </h2>
            <p className="text-base sm:text-xl text-slate-200/90 leading-relaxed max-w-xl drop-shadow-md">
              A wall of thick rounded glass tiles with real-time WebGL refraction. Move your cursor to carry a lamp behind the glass and reveal the underlying light.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://github.com/open-nebron/desktop-app/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-slate-200 active:scale-[0.98] shadow-2xl"
              >
                <span>Download App</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </a>

              <a
                href="https://github.com/open-nebron"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/20 hover:border-white/40 active:scale-[0.98]"
              >
                <span>Star on GitHub</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bottom Controls / Slide Navigation */}
          <div className="w-full flex items-center justify-between text-xs text-white/50 border-t border-white/10 pt-3">
            <span>© 2026 Open Nebron · WebGL Shaders</span>
            <button
              onClick={() => onGoToSlide(0)}
              className="hover:text-white transition-colors"
            >
              Top ↑
            </button>
          </div>
        </div>
      </GlassTiles>
    </div>
  );
}
