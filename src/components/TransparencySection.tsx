"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface TransparencySectionProps {
  isActive: boolean;
}

export default function TransparencySection({
  isActive,
}: TransparencySectionProps) {
  // Step 0: Cartoon phone + "How do you know nobody is reading your message?"
  // Step 1: "That's why Nebron is there. Don't believe us? Check our code."
  // Step 2: Wall falls, revealing the cryptographic code background and GitHub invite
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [wallDropped, setWallDropped] = useState(false);
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = () => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
  };

  const startSequence = () => {
    clearTimers();
    setStep(0);
    setWallDropped(false);

    // Stay on Step 0 for 7.5s (generous reading time with smooth transitions)
    const t1 = setTimeout(() => {
      setStep(1);
    }, 7500);

    // Stay on Step 1 for 6.5s (transitions at 14.0s total)
    const t2 = setTimeout(() => {
      setWallDropped(true);
      setStep(2);
    }, 14000);

    timerRef.current = [t1, t2];
  };

  useEffect(() => {
    if (isActive) {
      startSequence();
    } else {
      clearTimers();
      setStep(0);
      setWallDropped(false);
    }
    return () => clearTimers();
  }, [isActive]);

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
        className={`absolute inset-0 z-0 flex flex-col justify-center items-center px-4 overflow-hidden transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          wallDropped ? "opacity-100 scale-100 blur-none" : "opacity-0 scale-[1.04] blur-[3px]"
        }`}
      >
        {/* Subtle dark ambient glows */}
        <div className="absolute top-1/3 left-1/4 h-[450px] w-[550px] rounded-full bg-cyan-600/10 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 h-[450px] w-[550px] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none" />

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

        {/* Dark overlay for clean typography contrast */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] pointer-events-none" />
      </div>

      {/* ============================================================== */}
      {/* THE FALLING WALL CONTAINER (Physical 3D drop transition)       */}
      {/* ============================================================== */}
      <div
        style={{ perspective: "1200px" }}
        className={`absolute inset-0 z-10 transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          wallDropped
            ? "opacity-0 translate-y-[120%] rotate-x-[55deg] scale-90 pointer-events-none"
            : "opacity-100 translate-y-0 rotate-x-0 scale-100 pointer-events-auto bg-black"
        }`}
      >
        {/* ============================================================ */}
        {/* STEP 0: Smooth Cartoonish Mobile & Provocative Question      */}
        {/* ============================================================ */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center px-4 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            step === 0
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-8 scale-[0.96] pointer-events-none"
          }`}
        >
          <div className="mx-auto max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Transparent Smooth Cartoonish Mobile */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-56 sm:w-64 md:w-72 aspect-[561/897] flex items-center justify-center animate-[pulse_6s_ease-in-out_infinite]">
                <Image
                  src="/cartoon-phone.png"
                  alt="Encrypted Mobile Chat"
                  fill
                  priority
                  unoptimized
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,210,255,0.3)] transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Right Column: The Direct Question */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-5">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-2xl">
                How do you know nobody is reading your message?
              </h2>

              <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-xl">
                Other apps ask for your trust while keeping their code and servers closed.
                If you cannot see the source code, you cannot verify what happens to your private messages.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STEP 1: The Nebron Answer & "Check our code"                 */}
        {/* ============================================================ */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center px-4 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            step === 1
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : step === 0
              ? "opacity-0 translate-y-8 scale-[0.96] pointer-events-none"
              : "opacity-0 -translate-y-8 scale-[0.96] pointer-events-none"
          }`}
        >
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight drop-shadow-2xl">
              That&apos;s why Nebron is there.
            </h2>

            <p className="text-lg sm:text-2xl text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto">
              We have nothing to hide. Don&apos;t believe us?{" "}
              <span className="text-white font-bold underline decoration-white/50 underline-offset-8">
                Check our code.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* STEP 2: REVEALED STAGE (Wall Fallen · The Open Code & Invite)  */}
      {/* ============================================================== */}
      <div
        className={`absolute inset-0 z-20 flex flex-col justify-center items-center px-4 transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          wallDropped
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-8 scale-[0.96] pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-3xl w-full text-center space-y-6 my-auto">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight drop-shadow-2xl">
            We are building this together.
          </h2>

          <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            Check us out on GitHub. Everything is open source, and you have full access to inspect our code.
            If you want to contribute, join us today.
          </p>

          {/* Action Links */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/open-nebron"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-slate-200 active:scale-[0.98] shadow-2xl"
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

            <a
              href="https://github.com/open-nebron"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/20 hover:border-white/40 active:scale-[0.98]"
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
          </div>
        </div>
      </div>
    </div>
  );
}
