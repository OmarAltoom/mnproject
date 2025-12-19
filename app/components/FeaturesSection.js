
"use client";
import Image from "next/image";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

export default function FeaturesSection() {
  const t = useTranslations();
  const featureCopy = t.raw ? t.raw("features") : {};
  const particles = useMemo(
    () =>
      [...Array(8)].map((_, i) => ({
        id: i,
        width: 4 + (i % 4) * 1.5,
        height: 4 + ((i + 1) % 4) * 1.2,
        left: (i * 13 + 7) % 100,
        top: (i * 17 + 11) % 100,
        background: i % 3 === 0 ? "rgba(251, 191, 36, 0.6)" : i % 3 === 1 ? "rgba(245, 158, 11, 0.6)" : "rgba(239, 68, 68, 0.6)",
        animationDuration: 15 + (i % 5) * 1.5,
        animationDelay: (i % 4) * 0.6,
      })),
    []
  );

  return (
    <section className="relative w-full py-20 sm:py-24 bg-linear-to-br from-yellow-50 via-amber-50 to-red-50 dark:bg-linear-to-br dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 overflow-hidden">
      {/* Holographic Animated Background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Moving Holographic Gradients */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-linear-to-br from-yellow-400/40 via-amber-400/30 to-transparent rounded-full blur-3xl animate-float" style={{ animationDuration: '20s' }} />
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-linear-to-bl from-red-400/40 via-orange-400/30 to-transparent rounded-full blur-3xl animate-float" style={{ animationDuration: '25s', animationDelay: '2s' }} />
          <div className="absolute bottom-0 left-1/3 w-[550px] h-[550px] bg-linear-to-tr from-amber-400/40 via-yellow-400/30 to-transparent rounded-full blur-3xl animate-float" style={{ animationDuration: '22s', animationDelay: '4s' }} />
        </div>

        {/* Holographic Grid Pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px),
            linear-gradient(0deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          animation: 'gridMove 30s linear infinite'
        }} />

        {/* Radial Glow Effects */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(251, 191, 36, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(239, 68, 68, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 60%)
            `,
          }} />
        </div>

        {/* Floating Holographic Particles */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full blur-sm animate-pulse"
              style={{
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                background: particle.background,
                animation: `floatParticle ${particle.animationDuration}s ease-in-out infinite`,
                animationDelay: `${particle.animationDelay}s`,
              }}
            />
          ))}
        </div>

        {/* Animated Holographic Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="holoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#FBBF24', stopOpacity: 0.8 }}>
                <animate attributeName="offset" values="0;1;0" dur="10s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" style={{ stopColor: '#F59E0B', stopOpacity: 0.5 }}>
                <animate attributeName="offset" values="0.5;1;0.5" dur="10s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" style={{ stopColor: '#EF4444', stopOpacity: 0.8 }}>
                <animate attributeName="offset" values="1;0;1" dur="10s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
          <path d="M0,50 Q250,100 500,50 T1000,50" stroke="url(#holoGrad1)" strokeWidth="2" fill="none" opacity="0.6">
            <animate attributeName="d" values="M0,50 Q250,100 500,50 T1000,50;M0,100 Q250,50 500,100 T1000,100;M0,50 Q250,100 500,50 T1000,50" dur="15s" repeatCount="indefinite" />
          </path>
          <path d="M0,150 Q250,200 500,150 T1000,150" stroke="url(#holoGrad1)" strokeWidth="2" fill="none" opacity="0.4">
            <animate attributeName="d" values="M0,150 Q250,200 500,150 T1000,150;M0,200 Q250,150 500,200 T1000,200;M0,150 Q250,200 500,150 T1000,150" dur="18s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            <span className="bg-linear-to-r from-yellow-600 via-red-500 to-red-700 bg-clip-text text-transparent">
              {featureCopy.title || "مميزات النظام"}
            </span>
          </h2>
          <p className="text-lg text-yellow-800/80 dark:text-yellow-200/80 max-w-2xl mx-auto">
            {featureCopy.subtitle || "نوفر لك أفضل التقنيات الحديثة في مجال التشخيص الطبي"}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {(featureCopy.items || [
            { icon: "/icons/ai.svg", title: "ذكاء اصطناعي متطور", desc: "تقنية AI حديثة لتحليل دقيق" },
            { icon: "/icons/xray.svg", title: "تحليل الأشعة", desc: "فحص شامل للصور الطبية" },
            { icon: "/icons/result.svg", title: "نتائج فورية", desc: "احصل على التشخيص خلال ثوان" },
          ]).map((feature, i) => (
            <div
              key={i}
              className="group relative animate-fadeIn"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-linear-to-r from-yellow-400 to-red-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              
              {/* Card */}
              <div className="relative h-full p-8 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xl rounded-3xl border border-yellow-200/50 dark:border-yellow-600/30 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                {/* Icon Container */}
                <div className="relative mb-6 inline-flex">
                  <div className="absolute inset-0 bg-linear-to-br from-yellow-400 to-red-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
                  <div className="relative w-20 h-20 flex items-center justify-center bg-linear-to-br from-yellow-100 to-red-100 dark:from-yellow-900/50 dark:to-red-900/50 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Image 
                      src={feature.icon} 
                      alt={feature.title} 
                      width={48} 
                      height={48} 
                      className="drop-shadow-lg" 
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold mb-3 bg-linear-to-r from-yellow-700 to-red-700 bg-clip-text text-transparent">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-yellow-900/80 dark:text-yellow-100/80 text-base leading-relaxed">
                  {feature.desc}
                </p>

                {/* Decorative Element */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-yellow-400 via-red-400 to-transparent rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features List */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
          {(featureCopy.extras || [
            { icon: "🔒", title: "أمان عالي", desc: "حماية كاملة لبياناتك الطبية" },
            { icon: "⚡", title: "سرعة فائقة", desc: "معالجة سريعة للصور والنتائج" },
            { icon: "📊", title: "تقارير مفصلة", desc: "تقارير طبية شاملة ودقيقة" },
            { icon: "🌐", title: "متوفر دائماً", desc: "خدمة 24/7 على مدار الساعة" },
          ]).map((item, i) => (
            <div
              key={i}
              className="group flex items-start gap-4 p-6 bg-linear-to-r from-yellow-50 to-red-50 dark:from-zinc-800 dark:to-zinc-800 rounded-2xl border border-yellow-200/50 dark:border-yellow-600/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl shrink-0 transform group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-yellow-800 dark:text-yellow-200 mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-yellow-700/80 dark:text-yellow-300/80">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
