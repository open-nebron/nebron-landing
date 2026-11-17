"use client";

import { useState, useEffect, useRef } from "react";

interface TransparencySectionProps {
  isActive: boolean;
  onGoToSlide: (slideIndex: number) => void;
}

export default function TransparencySection({
  isActive,
  onGoToSlide,
}: TransparencySectionProps) {
  // Step 0: Chat simulation & "How do you know nobody is reading your message?"
  // Step 1: "That's why Nebron is there. Don't believe us? Check our code."
  // Step 2: Wall falls, revealing the cryptographic code background and GitHub manifesto
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [wallDropped, setWallDropped] = useState(false);
  const [chatReceived, setChatReceived] = useState(false);
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  // Clear all pending timers
  const clearTimers = () => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
  };

  const startSequence = () => {
    clearTimers();
    setStep(0);
    setWallDropped(false);
    setChatReceived(false);

    // After 1.4s, simulate incoming reply on the phone
    const t0 = setTimeout(() => {
      setChatReceived(true);
    }, 1400);

    // After 5.2s, transition to Step 1 (The Nebron Revelation)
    const t1 = setTimeout(() => {
      setStep(1);
    }, 5200);

    // After 9.0s, trigger the wall fall and reveal Step 2 (The Open Code & GitHub Manifesto)
    const t2 = setTimeout(() => {
      setWallDropped(true);
      setStep(2);
    }, 9000);

    timerRef.current = [t0, t1, t2];
  };

  useEffect(() => {
    if (isActive) {
      startSequence();
    } else {
      clearTimers();
      setStep(0);
      setWallDropped(false);
      setChatReceived(false);
    }
    return () => clearTimers();
  }, [isActive]);

  const handleManualStep = (targetStep: 0 | 1 | 2) => {
    clearTimers();
    if (targetStep === 0) {
      setStep(0);
      setWallDropped(false);
      setChatReceived(true);
    } else if (targetStep === 1) {
      setStep(1);
      setWallDropped(false);
    } else {
      setWallDropped(true);
      setStep(2);
    }
  };

  const handleReplay = () => {
    startSequence();
  };

  const codeSnippets = [
    `// Nebron Core E2EE Protocol · Zero-Trust Key Verification`,
    `import { generateKeyPair, exportJWK, deriveSharedSecret } from "@nebron/crypto";`,
    ``,
    `export async function establishSecureChannel(peerPublicKey: JWK): Promise<CryptoKey> {`,
    `  // 1. Ephemeral X25519 Key Exchange performed on local device only`,
    `  const ephemeralKeyPair = await generateKeyPair("ECDH", { namedCurve: "P-256" });`,
    `  const sharedSecret = await deriveSharedSecret(ephemeralKeyPair.privateKey, peerPublicKey);`,
    `  `,
    `  // 2. Derive 256-bit AES-GCM session key with strict salt and rotation`,
    `  return await crypto.subtle.deriveKey(`,
    `    { name: "HKDF", hash: "SHA-256", salt: crypto.getRandomValues(new Uint8Array(32)), info: new TextEncoder().encode("nebron-session-v1") },`,
    `    sharedSecret,`,
    `    { name: "AES-GCM", length: 256 },`,
    `    false,`,
    `    ["encrypt", "decrypt"]`,
    `  );`,
    `}`,
    ``,
    `// Zero Telemetry Guarantee · Server passes raw opaque ciphertext payloads only`,
    `export function routeMessage(payload: EncryptedEnvelope) {`,
    `  assert(payload.ciphertext !== undefined);`,
    `  assert(serverHasZeroAccessToPlaintext === true);`,
    `  broadcastToAuthorizedSockets(payload.channelId, payload.ciphertext);`,
    `}`,
  ];

  return (
    <div className="relative h-full w-full overflow-hidden bg-black select-none text-white">
      {/* ============================================================== */}
      {/* BACKGROUND CODE MATRIX LAYER (Behind the falling wall)         */}
      {/* ============================================================== */}
      <div
        className={`absolute inset-0 z-0 flex flex-col justify-center items-center px-4 overflow-hidden transition-all duration-1000 ${
          wallDropped ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Subtle dark ambient glows */}
        <div className="absolute top-1/3 left-1/4 h-[450px] w-[550px] rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 h-[450px] w-[550px] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />

        {/* Ambient streaming cryptographic code backdrop */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden font-mono text-[11px] sm:text-xs leading-relaxed text-cyan-200/80 p-6 select-none flex flex-col justify-around">
          {codeSnippets.concat(codeSnippets).map((line, idx) => (
            <div
              key={idx}
              className={`transition-opacity duration-700 ${
                line.startsWith("//")
                  ? "text-slate-400 font-semibold"
                  : line.includes("assert") || line.includes("AES-GCM")
                  ? "text-cyan-300 font-bold"
                  : "text-slate-300"
              }`}
            >
              <span className="text-slate-600 mr-4 select-none">
                {String((idx % 24) + 1).padStart(2, "0")}
              </span>
              {line}
            </div>
          ))}
        </div>

        {/* Overlay to preserve typography readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] pointer-events-none" />
      </div>

      {/* ============================================================== */}
      {/* THE FALLING WALL CONTAINER (Physical 3D drop transition)       */}
      {/* ============================================================== */}
      <div
        style={{ perspective: "1200px" }}
        className={`absolute inset-0 z-10 transition-all duration-[1100ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          wallDropped
            ? "opacity-0 translate-y-[120%] rotate-x-[45deg] pointer-events-none"
            : "opacity-100 translate-y-0 rotate-x-0 pointer-events-auto bg-[#050608]"
        }`}
      >
        {/* Step Navigation Pill Indicator */}
        <div className="absolute top-20 inset-x-0 z-30 flex items-center justify-center gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3.5 py-1 backdrop-blur-md text-[11px] font-mono text-slate-400">
            <span className="text-slate-500 uppercase tracking-widest mr-1">
              Scene:
            </span>
            <button
              onClick={() => handleManualStep(0)}
              className={`px-2 py-0.5 rounded transition-all ${
                step === 0 ? "text-white font-bold bg-white/15" : "hover:text-slate-200"
              }`}
            >
              01 Doubt
            </button>
            <span>·</span>
            <button
              onClick={() => handleManualStep(1)}
              className={`px-2 py-0.5 rounded transition-all ${
                step === 1 ? "text-white font-bold bg-white/15" : "hover:text-slate-200"
              }`}
            >
              02 Truth
            </button>
            <span>·</span>
            <button
              onClick={() => handleManualStep(2)}
              className="px-2 py-0.5 rounded hover:text-slate-200 text-cyan-400 transition-all"
            >
              03 Drop Wall →
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STEP 0: Chat message animation & "How do you know nobody..."   */}
        {/* ============================================================ */}
        {step === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-16">
            <div className="mx-auto max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Simulated Mobile Phone Chat */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm rounded-[32px] border border-white/15 bg-[#0b0d14] p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
                  {/* Phone Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-semibold text-white">
                        Encrypted Chat
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      Private Channel
                    </span>
                  </div>

                  {/* Message Stream */}
                  <div className="space-y-3.5 py-2 min-h-[170px] flex flex-col justify-end">
                    {/* Bubble 1: Sent Message */}
                    <div className="flex justify-end transition-all duration-500 translate-y-0 opacity-100">
                      <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-white/15 border border-white/20 px-3.5 py-2.5 text-xs text-white shadow-md">
                        <p className="leading-relaxed">
                          Hey, can anyone else read what we are saying here?
                        </p>
                        <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-slate-300">
                          <span>11:42 PM</span>
                          <span className="text-cyan-300 font-bold">✓✓</span>
                        </div>
                      </div>
                    </div>

                    {/* Bubble 2: Received Message (Timed appearance) */}
                    <div
                      className={`flex justify-start transition-all duration-700 ${
                        chatReceived
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-3"
                      }`}
                    >
                      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#151926] border border-white/10 px-3.5 py-2.5 text-xs text-slate-200 shadow-md">
                        <p className="leading-relaxed">
                          Their privacy policy says it&apos;s encrypted... I guess we have to trust them.
                        </p>
                        <div className="mt-1 text-left text-[10px] text-slate-400">
                          <span>11:42 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phone Bottom Status Bar */}
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1.5">
                      <svg
                        className="h-3 w-3 text-emerald-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      E2EE Lock Active
                    </span>
                    <span>Server: Blind Relay</span>
                  </div>
                </div>
              </div>

              {/* Right Column: The Dramatic Provocation */}
              <div className="lg:col-span-7 text-center lg:text-left space-y-5">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  The Illusion of Blind Trust
                </span>

                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-2xl">
                  How do you know nobody is reading your message?
                </h2>

                <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-xl">
                  Big tech apps ask for your blind trust while their code runs inside closed-source black boxes.
                  If you cannot inspect the source code,{" "}
                  <span className="text-white font-semibold underline decoration-white/40 underline-offset-4">
                    you cannot verify what happens to your keys.
                  </span>
                </p>

                <div className="pt-2 flex items-center justify-center lg:justify-start gap-4">
                  <button
                    onClick={() => handleManualStep(1)}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-950 transition-all hover:bg-slate-200 active:scale-[0.98] shadow-lg"
                  >
                    <span>See the Answer</span>
                    <svg
                      className="h-4 w-4"
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
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 1: The Nebron Revelation & "Check our code"             */}
        {/* ============================================================ */}
        {step === 1 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-16">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                Data Sovereignty · Zero Compromise
              </span>

              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight drop-shadow-2xl">
                That&apos;s why Nebron is here.
              </h2>

              <p className="text-lg sm:text-2xl text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto">
                We have nothing to hide like other apps. Don&apos;t believe us?{" "}
                <span className="text-white font-bold underline decoration-white/50 underline-offset-8">
                  Check our code.
                </span>
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => handleManualStep(2)}
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-slate-200 active:scale-[0.98] shadow-xl"
                >
                  <span>Drop the Wall &amp; Inspect Code</span>
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-y-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* STEP 2: REVEALED STAGE (Wall Fallen · The Open Source Manifesto)*/}
      {/* ============================================================== */}
      <div
        className={`absolute inset-0 z-20 flex flex-col justify-between items-center px-4 pt-20 pb-4 transition-all duration-1000 ${
          wallDropped
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-4xl w-full my-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md text-xs font-mono text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>100% PUBLIC SOURCE CODE · NO HIDDEN BACKDOORS</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight drop-shadow-2xl">
            We are building this together.
          </h2>

          <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            Unlike other platforms, every single line of Nebron is public on GitHub.
            You have full access to inspect our encryption routines, run your own nodes,
            and verify that your messages remain strictly yours.
          </p>

          {/* Action Hub: GitHub & Community */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary Action: GitHub Repository */}
            <a
              href="https://github.com/open-nebron"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-slate-200 active:scale-[0.98] shadow-2xl"
            >
              <svg className="h-5 w-5 text-slate-950" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>Check Us on GitHub</span>
            </a>

            {/* Secondary Action: Contribute / Join us today */}
            <a
              href="https://github.com/open-nebron"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/20 hover:border-white/40 active:scale-[0.98]"
            >
              <span>Join Us &amp; Contribute</span>
              <svg
                className="h-4 w-4"
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

            {/* Replay Button */}
            <button
              onClick={handleReplay}
              title="Replay sequence"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-black/40 px-4 py-3.5 text-xs font-mono text-slate-300 hover:text-white hover:border-white/30 transition-all active:scale-[0.96]"
            >
              <span>↺ Replay</span>
            </button>
          </div>

          {/* Verification Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-slate-400">
            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1">
              ✓ Open Source (Apache 2.0 / MIT)
            </span>
            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1">
              ✓ Auditable Cryptography
            </span>
            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1">
              ✓ Zero Proprietary Trackers
            </span>
          </div>
        </div>

        {/* Compact Footer */}
        <div className="w-full max-w-5xl border-t border-white/10 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wider">NEBRON</span>
            <span>© 2026 Open Nebron. Open Source.</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/open-nebron"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <button
              onClick={() => onGoToSlide(0)}
              className="hover:text-white transition-colors"
            >
              Top ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
