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
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Wordmark */}
        <div className="flex items-center">
          <button
            onClick={(e) => handleNavClick(e, 0)}
            className="text-left focus:outline-none"
          >
            <span className="text-xl font-bold tracking-widest text-white hover:text-slate-200 transition-colors">
              NEBRON
            </span>
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
            Privacy
          </button>
          <button
            onClick={(e) => handleNavClick(e, 2)}
            className={`rounded-lg px-3.5 py-1.5 transition-all ${
              activeSlide === 2
                ? "text-cyan-400 bg-white/10 font-semibold"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            Get Started
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
          {/* Login Button */}
          <a
            href="https://github.com/open-nebron"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-sm transition-all hover:bg-slate-200 active:scale-[0.98]"
          >
            Login
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
            Privacy
          </button>
          <button
            onClick={(e) => handleNavClick(e, 2)}
            className={`block w-full text-left rounded-lg px-3 py-2 text-base font-medium ${
              activeSlide === 2 ? "text-cyan-400 bg-white/10" : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            Get Started
          </button>
          <a
            href="https://github.com/open-nebron"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-white/5 hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://github.com/open-nebron"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-200 mt-2"
          >
            Login
          </a>
        </div>
      )}
    </header>
  );
}
