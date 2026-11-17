"use client";

import { useState } from "react";

interface NavbarProps {
  activeSlide?: number;
  onSelectSlide?: (slideIndex: number) => void;
}

export default function Navbar({ activeSlide = 0, onSelectSlide }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, slideIndex: number) => {
    if (onSelectSlide) {
      e.preventDefault();
      onSelectSlide(slideIndex);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-[#08090d]/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => handleNavClick(e, 0)}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#090b10]">
                {/* Nebron geometric N icon */}
                <svg
                  className="h-5 w-5 text-cyan-400 group-hover:text-cyan-300 transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4v16" />
                  <path d="M4 6l16 12" />
                  <path d="M20 4v16" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-wider text-white">
                  NEBRON
                </span>
                <span className="hidden sm:inline-flex items-center rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-cyan-400 border border-cyan-500/20">
                  ALPHA
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <button
            onClick={(e) => handleNavClick(e, 0)}
            className={`rounded-lg px-3.5 py-1.5 transition-all ${
              activeSlide === 0
                ? "text-cyan-400 bg-white/10 font-semibold"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            Overview
          </button>
          <button
            onClick={(e) => handleNavClick(e, 1)}
            className={`rounded-lg px-3.5 py-1.5 transition-all ${
              activeSlide === 1
                ? "text-cyan-400 bg-white/10 font-semibold"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            Features
          </button>
          <button
            onClick={(e) => handleNavClick(e, 2)}
            className={`rounded-lg px-3.5 py-1.5 transition-all ${
              activeSlide === 2
                ? "text-cyan-400 bg-white/10 font-semibold"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            Architecture
          </button>
          <a
            href="https://github.com/open-nebron"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-3.5 py-1.5 text-slate-300 transition-colors hover:text-white hover:bg-white/5"
          >
            GitHub
          </a>
        </nav>

        {/* Right Action Items */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Status Badge */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[11px]">System Online</span>
          </div>

          {/* Launch App Button */}
          <a
            href="https://github.com/open-nebron"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-cyan-500/20 transition-all hover:brightness-110 hover:shadow-cyan-500/35 active:scale-[0.98]"
          >
            Launch App
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#090b10] px-4 pt-2 pb-6 space-y-3">
          <button
            onClick={(e) => handleNavClick(e, 0)}
            className={`block w-full text-left rounded-lg px-3 py-2 text-base font-medium ${
              activeSlide === 0 ? "text-cyan-400 bg-white/10" : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={(e) => handleNavClick(e, 1)}
            className={`block w-full text-left rounded-lg px-3 py-2 text-base font-medium ${
              activeSlide === 1 ? "text-cyan-400 bg-white/10" : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            Features
          </button>
          <button
            onClick={(e) => handleNavClick(e, 2)}
            className={`block w-full text-left rounded-lg px-3 py-2 text-base font-medium ${
              activeSlide === 2 ? "text-cyan-400 bg-white/10" : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            Architecture
          </button>
          <a
            href="https://github.com/open-nebron"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-white/5 hover:text-white"
          >
            GitHub
          </a>
        </div>
      )}
    </header>
  );
}
