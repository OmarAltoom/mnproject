
"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

export default function HeroSection() {
  const t = useTranslations();
  const locale = useLocale();
  const heroStats = (t.raw ? t.raw("content.hero.stats") : null) || [
    { number: "99.5%", label: "دقة التشخيص" },
    { number: "+10K", label: "مستخدم نشط" },
    { number: "+50K", label: "تحليل ناجح" },
    { number: "24/7", label: "دعم متواصل" },
  ];
  const [showWaves, setShowWaves] = useState(false);
  const [particles, setParticles] = useState([]);
  const withLocale = (path) => {
    const base = path.startsWith("/") ? path : `/${path}`;
    if (base.startsWith("/en") || base.startsWith("/ar")) return base;
    return `/${locale}${base === "/" ? "" : base}`;
  };

  useEffect(() => {
    setShowWaves(true);
    // Generate particles on client side only
    setParticles(
      [...Array(20)].map((_, i) => ({
        id: i,
        width: Math.random() * 200 + 50,
        height: Math.random() * 200 + 50,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDelay: Math.random() * 5,
        animationDuration: Math.random() * 10 + 10,
      }))
    );
  }, []);

  const AnimatedWaves = dynamic(() => import("./_AnimatedWaves"), { ssr: false, loading: () => null });

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background SVG */}
      <div className="absolute inset-0 -z-30 pointer-events-none">
        <Image
          src="/bg-hero.svg"
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-20 pointer-events-none bg-linear-to-br from-yellow-50/90 via-red-50/80 to-white/90 dark:from-zinc-900/90 dark:via-zinc-800/80 dark:to-zinc-900/90" />

      {/* Animated Waves */}
      {showWaves && (
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-60">
          <AnimatedWaves />
        </div>
      )}

      {/* Floating Particles */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-linear-to-br from-yellow-400/20 to-red-400/20 blur-xl animate-float"
            style={{
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Icons with 3D Effect */}
      <div className="relative z-10 flex gap-4 sm:gap-6 lg:gap-8 mb-12 flex-wrap justify-center">
        {[
          { src: "/icons/ai.svg", alt: "AI", color: "yellow" },
          { src: "/icons/xray.svg", alt: "X-Ray", color: "red" },
          { src: "/icons/result.svg", alt: "Result", color: "yellow" },
          { src: "/icons/settings.svg", alt: "Settings", color: "red" },
        ].map((icon, i) => (
          <div
            key={i}
            className="group relative animate-float"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <div className={`absolute inset-0 bg-linear-to-br from-${icon.color}-400 to-${icon.color === 'yellow' ? 'red' : 'yellow'}-600 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity`} />
            <div className="relative p-4 sm:p-5 rounded-3xl bg-white/40 dark:bg-zinc-800/40 backdrop-blur-xl border-2 border-gradient-to-br shadow-2xl transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300">
              <Image src={icon.src} alt={icon.alt} width={48} height={48} className="sm:w-14 sm:h-14 drop-shadow-2xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Title with Animated Gradient */}
      <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center mb-6 animate-fadeIn">
        <span className="block bg-linear-to-r from-yellow-500 via-red-500 to-red-700 bg-clip-text text-transparent drop-shadow-2xl animate-gradient">
          {t("content.hero.title", { defaultValue: "الكشف الذكي عن الأمراض" })}
        </span>
        <span className="block text-2xl sm:text-3xl md:text-4xl mt-4 bg-linear-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
          {t("content.hero.subtitle", { defaultValue: "باستخدام الذكاء الاصطناعي المتقدم" })}
        </span>
      </h1>

      {/* Description */}
      <p className="relative z-10 text-lg sm:text-xl md:text-2xl text-yellow-900/90 dark:text-yellow-100/90 max-w-3xl mx-auto bg-white/70 dark:bg-zinc-800/70 backdrop-blur-xl rounded-3xl px-6 sm:px-10 py-6 sm:py-8 shadow-2xl border border-yellow-200/50 dark:border-yellow-600/30 text-center mb-10 font-medium leading-relaxed animate-fadeIn"
        style={{ animationDelay: "0.2s" }}
      >
        {t("content.hero.desc", { defaultValue: "نظام متطور لتحليل الصور الطبية وتشخيص الأمراض بدقة عالية باستخدام تقنيات الذكاء الاصطناعي" })}
      </p>

      {/* CTA Buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center animate-fadeIn" style={{ animationDelay: "0.4s" }}>
        <Link 
          href={withLocale("/signup")}
          className="group relative px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-linear-to-r from-yellow-500 via-red-500 to-red-600 hover:from-yellow-600 hover:via-red-600 hover:to-red-700 text-white text-lg sm:text-xl font-bold shadow-2xl hover:shadow-red-500/50 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            {t("content.hero.primaryCta", { defaultValue: "ابدأ الآن مجاناً" })}
          </span>
          <div className="absolute inset-0 bg-linear-to-r from-red-600 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        <Link 
          href={withLocale("/login")}
          className="group relative px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xl border-2 border-yellow-500/50 hover:border-red-500/50 text-yellow-800 dark:text-yellow-200 text-lg sm:text-xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <span className="flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            {t("content.hero.secondaryCta", { defaultValue: "تسجيل الدخول" })}
          </span>
        </Link>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl animate-fadeIn" style={{ animationDelay: "0.6s" }}>
        {heroStats.map((stat, i) => (
          <div
            key={i}
            className="group relative p-4 sm:p-6 rounded-2xl bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border border-yellow-200/50 dark:border-yellow-600/30 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-2xl sm:text-3xl font-black bg-linear-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent text-center mb-2">
              {stat.number}
            </div>
            <div className="text-xs sm:text-sm text-yellow-800/80 dark:text-yellow-200/80 font-semibold text-center">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-yellow-600/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
