# Nebron Landing

High-performance public landing page and interactive showcase for the [Nebron](https://github.com/open-nebron) real-time communication ecosystem.

## Overview

Nebron is an open polyrepo ecosystem engineered for sub-15ms WebRTC spatial voice, high-frequency websocket chat, RS256 zero-trust identity rotation, and Cloudflare R2 media streaming.

### Features
- **Presentation Architecture**: Screen-fixed presentation view with cinematic slide transitions.
- **Gesture Control**: Deliberate 300px gesture threshold with tactile scroll progress feedback and scroll delay.
- **Smooth Cinematic Transitions**: 1200ms cubic-bezier transition curves with 4-sided black framing vignette and depth dissolves.
- **4K WebP Visuals**: Remastered lossless assets for the Hero and Architecture/Features sections.
- **Modern Stack**: Next.js 16.4 App Router, Tailwind CSS v4, TypeScript.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Polyrepo Ecosystem
- `auth-service`: RS256 token issuance & public JWKS endpoint (Fastify + Jose)
- `core-backend`: User profiles & Cloudflare R2 presigned media slots
- `chat-service`: Low-latency WebSockets + Redis pub/sub clustering
- `voice-service`: WebRTC SFU with Opus 48kHz spatial audio

## License
Apache 2.0 / MIT © 2026 Open Nebron.
