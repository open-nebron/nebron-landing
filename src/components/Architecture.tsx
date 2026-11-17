export default function Architecture() {
  const microservices = [
    {
      name: "auth-service",
      port: "4001",
      role: "Identity & Tokens",
      tech: "Fastify · Jose · Argon2 · Redis · Mongo",
      desc: "Issues RS256 access & refresh tokens, rotation reuse prevention, public JWKS key exposure.",
    },
    {
      name: "core-backend",
      port: "4002",
      role: "User Profiles & Media",
      tech: "Fastify · S3/R2 SDK · MongoDB · OpenAPI 3.1",
      desc: "Handles username claims, profile metadata, preferences, and Cloudflare R2 presigned media slots.",
    },
    {
      name: "chat-service",
      port: "4003",
      role: "Real-time Messaging",
      tech: "WebSockets · Redis Pub/Sub · MongoDB",
      desc: "Channels, direct messaging, typing alerts, read receipts, and instantaneous message delivery.",
    },
    {
      name: "voice-service",
      port: "4004",
      role: "Spatial WebRTC Voice",
      tech: "WebRTC SFU · Opus 48kHz · UDP Media",
      desc: "Sub-15ms voice channels with spatial audio simulation and dynamic packet loss concealment.",
    },
  ];

  return (
    <section id="architecture" className="py-24 border-t border-white/5 relative z-10 bg-[#07080c]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            System Topology
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Polyrepo Microservice Architecture
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Each service in Nebron operates autonomously with dedicated databases,
            isolated dependencies, and shared contract validation.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {microservices.map((svc) => (
            <div
              key={svc.name}
              className="rounded-2xl border border-white/10 bg-[#0c0e17] p-6 hover:border-indigo-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="font-mono text-sm font-bold text-white">
                    {svc.name}
                  </span>
                </div>
                <span className="font-mono text-xs rounded bg-indigo-500/10 text-indigo-400 px-2.5 py-1 border border-indigo-500/20">
                  Port :{svc.port}
                </span>
              </div>

              <div className="mt-3 text-xs font-medium text-slate-300">
                {svc.role}
              </div>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                {svc.desc}
              </p>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Stack:</span>
                <span className="text-cyan-300/80">{svc.tech}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
