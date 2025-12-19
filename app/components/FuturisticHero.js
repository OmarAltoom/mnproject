"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FuturisticStars = dynamic(() => import("./FuturisticStars"), { ssr: false });

export default function FuturisticHero() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "ar";
  const basePrefix = locale === "en" ? "/en" : "/ar";
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-transparent" style={{background: "linear-gradient(135deg, #0ff 0%, #7f00ff 60%, #000 100%)"}}>
      {/* Neon SVG Gradient Overlay for Sci-Fi Glow */}
      <div className="absolute inset-0 -z-30 pointer-events-none">
        <svg className="w-full h-full" width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="neonBg" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#00fff7" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#7f00ff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.95" />
            </radialGradient>
          </defs>
          <rect width="1440" height="800" fill="url(#neonBg)" />
          <ellipse cx="400" cy="200" rx="220" ry="80" fill="#00fff7" opacity="0.10" />
          <ellipse cx="1100" cy="600" rx="180" ry="60" fill="#ff00ea" opacity="0.10" />
          <ellipse cx="800" cy="400" rx="300" ry="120" fill="#7f00ff" opacity="0.08" />
        </svg>
      </div>
      {/* Starry/Cyber Cityscape Background (Client-only, no hydration mismatch) */}
      <FuturisticStars />
      {/* Holographic Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none">
          {/* Floating neon polygons */}
          <g className="animate-float-slow">
            <polygon points="200,200 250,250 200,300 150,250" fill="#00fff7" opacity="0.18" filter="url(#glow)" />
            <polygon points="1200,400 1250,450 1200,500 1150,450" fill="#ff00ea" opacity="0.13" />
            <rect x="700" y="100" width="80" height="80" rx="18" fill="#7f00ff" opacity="0.12" />
            <ellipse cx="400" cy="600" rx="60" ry="24" fill="#00fff7" opacity="0.09" />
          </g>
        </svg>
      </div>
      {/* Holographic Interface Overlay */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 z-10">
        <div className="w-[420px] h-[220px] rounded-3xl border-2 border-cyan-400/60 bg-linear-to-br from-cyan-400/10 via-fuchsia-400/10 to-blue-400/10 shadow-2xl backdrop-blur-2xl flex flex-col items-center justify-center relative text-white">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-2 rounded-full bg-cyan-400/40 blur-md animate-pulse" />
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-2 rounded-full bg-fuchsia-400/40 blur-md animate-pulse" />
          <div className="absolute left-4 top-4 w-6 h-6 rounded-full bg-cyan-400/30 blur-lg animate-pulse" />
          <div className="absolute right-4 bottom-4 w-6 h-6 rounded-full bg-fuchsia-400/30 blur-lg animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-fuchsia-400 to-blue-400 drop-shadow-2xl animate-gradient-x neon-text-glow text-center">
            Welcome to the Future
          </h1>
          <p className="mt-4 text-lg max-w-xl bg-white/10 dark:bg-zinc-900/30 rounded-2xl px-6 py-3 shadow-2xl backdrop-blur-2xl border border-cyan-400/30 glassmorph-sci-fi text-center text-white drop-shadow-lg">
            Experience next-gen AI technology with immersive, interactive design.
          </p>
          <Link
            href={`${basePrefix}/admin/analysis`}
            className="mt-6 px-10 py-4 rounded-2xl bg-linear-to-br from-cyan-400 via-fuchsia-400 to-blue-400 hover:from-blue-500 hover:to-pink-400 shadow-2xl transition text-white text-xl font-extrabold flex items-center gap-4 border-2 border-cyan-300/40 backdrop-blur-2xl animate-glow neon-btn-glow drop-shadow-lg"
          >
            <span className="inline-block text-white">تحليل الأشعة</span>
          </Link>
        </div>
      </div>
    </section>
  );
}