export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050609] py-12 text-slate-400 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-[#090b10]">
                <span className="text-cyan-400 font-bold text-xs">N</span>
              </div>
            </div>
            <span className="text-sm font-bold tracking-wider text-white">
              NEBRON
            </span>
            <span className="text-xs text-slate-500 ml-2">
              © 2026 Open Nebron. Apache 2.0 / MIT.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <a
              href="https://github.com/open-nebron"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="#features"
              className="hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#architecture"
              className="hover:text-white transition-colors"
            >
              Architecture
            </a>
            <a
              href="https://github.com/open-nebron"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
