
"use client";
import Image from "next/image";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

export default function WorkflowSection() {
  const t = useTranslations();
  const workflowCopy = t.raw ? t.raw("content.workflow") : {};
  const flowParticles = useMemo(
    () =>
      [...Array(12)].map((_, i) => ({
        id: i,
        left: (i * 8.3 + 5) % 100,
        top: (i * 11 + 7) % 100,
        color: i % 3 === 0 ? "#FBBF24" : i % 3 === 1 ? "#F59E0B" : "#EF4444",
        duration: 8 + (i % 4) * 1.2,
        delay: (i % 5) * 0.4,
      })),
    []
  );

  return (
    <section className="relative w-full py-20 sm:py-24 bg-linear-to-tr from-red-50 via-white to-yellow-50 dark:bg-linear-to-tr dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 overflow-hidden">
      {/* Animated Circuit Board Background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Animated Circuit Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#FBBF24', stopOpacity: 0.8 }} />
              <stop offset="50%" style={{ stopColor: '#F59E0B', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: '#EF4444', stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
          
          {/* Horizontal Circuit Lines */}
          <g stroke="url(#circuitGrad)" strokeWidth="2" fill="none">
            <line x1="0" y1="20%" x2="100%" y2="20%" opacity="0.6">
              <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="20s" repeatCount="indefinite" />
            </line>
            <line x1="0" y1="40%" x2="100%" y2="40%" opacity="0.5">
              <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="25s" repeatCount="indefinite" />
            </line>
            <line x1="0" y1="60%" x2="100%" y2="60%" opacity="0.4">
              <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="22s" repeatCount="indefinite" />
            </line>
            <line x1="0" y1="80%" x2="100%" y2="80%" opacity="0.6">
              <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="28s" repeatCount="indefinite" />
            </line>
          </g>

          {/* Vertical Circuit Lines */}
          <g stroke="url(#circuitGrad)" strokeWidth="2" fill="none">
            <line x1="20%" y1="0" x2="20%" y2="100%" opacity="0.5">
              <animate attributeName="stroke-dasharray" values="1000,0;0,1000" dur="18s" repeatCount="indefinite" />
            </line>
            <line x1="50%" y1="0" x2="50%" y2="100%" opacity="0.4">
              <animate attributeName="stroke-dasharray" values="1000,0;0,1000" dur="24s" repeatCount="indefinite" />
            </line>
            <line x1="80%" y1="0" x2="80%" y2="100%" opacity="0.5">
              <animate attributeName="stroke-dasharray" values="1000,0;0,1000" dur="20s" repeatCount="indefinite" />
            </line>
          </g>

          {/* Circuit Nodes */}
          <g fill="url(#circuitGrad)">
            <circle cx="20%" cy="20%" r="4" opacity="0.7">
              <animate attributeName="r" values="4;8;4" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="50%" cy="40%" r="4" opacity="0.7">
              <animate attributeName="r" values="4;8;4" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;1;0.7" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="80%" cy="60%" r="4" opacity="0.7">
              <animate attributeName="r" values="4;8;4" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="20%" cy="80%" r="4" opacity="0.7">
              <animate attributeName="r" values="4;8;4" dur="3.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;1;0.7" dur="3.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="80%" cy="20%" r="4" opacity="0.7">
              <animate attributeName="r" values="4;8;4" dur="3.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;1;0.7" dur="3.8s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>

        {/* Flowing Data Particles */}
        <div className="absolute inset-0">
          {flowParticles.map((p) => (
            <div
              key={p.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                background: p.color,
                boxShadow: `0 0 10px ${p.color}`,
                animation: `dataFlow ${p.duration}s linear infinite`,
                animationDelay: `${p.delay}s`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        {/* Hexagonal Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FBBF24' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />

        {/* Glowing Orbs */}
        <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-linear-to-br from-yellow-300/20 via-amber-300/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-linear-to-tl from-red-300/20 via-orange-300/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />

        {/* Scanning Line Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-1 bg-linear-to-r from-transparent via-yellow-400 to-transparent opacity-50" style={{
            animation: 'scanLine 8s ease-in-out infinite',
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.8)'
          }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            <span className="bg-linear-to-r from-yellow-600 via-red-500 to-red-700 bg-clip-text text-transparent">
              {workflowCopy.title || t("content.workflow.title", { defaultValue: "كيف يعمل النظام" })}
            </span>
          </h2>
          <p className="text-lg text-yellow-800/80 dark:text-yellow-200/80 max-w-2xl mx-auto">
            {workflowCopy.subtitle || t("content.workflow.subtitle", { defaultValue: "عملية بسيطة وسريعة للحصول على التشخيص الطبي" })}
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          {(workflowCopy.steps || [
            { icon: "/icons/ai.svg", title: "1. تحميل الصورة", desc: "قم برفع صورة الأشعة الطبية" },
            { icon: "/icons/xray.svg", title: "2. التحليل الذكي", desc: "الذكاء الاصطناعي يحلل الصورة" },
            { icon: "/icons/result.svg", title: "3. النتيجة الفورية", desc: "احصل على التشخيص الدقيق" },
          ]).map((step, i) => (
            <div key={i} className="relative animate-fadeIn" style={{ animationDelay: `${i * 0.15}s` }}>
              {/* Connection Line (Desktop) */}
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 left-full w-12 lg:w-20 h-0.5 -translate-y-1/2 z-0">
                  <div className="w-full h-full bg-linear-to-r from-yellow-400 to-red-400 opacity-30" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                </div>
              )}

              {/* Step Card */}
              <div className="group relative h-full">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-linear-to-r from-yellow-400 to-red-600 rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500" />
                
                {/* Card Content */}
                <div className="relative h-full p-8 bg-white dark:bg-zinc-800 rounded-3xl border-2 border-yellow-200 dark:border-yellow-600/30 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-linear-to-br from-yellow-500 to-red-600 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg">
                    {i + 1}
                  </div>

                  {/* Icon */}
                  <div className="relative mb-6 inline-flex">
                    <div className="absolute inset-0 bg-linear-to-br from-yellow-400 to-red-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse" />
                    <div className="relative w-20 h-20 flex items-center justify-center bg-linear-to-br from-yellow-100 to-red-100 dark:from-yellow-900/50 dark:to-red-900/50 rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Image 
                        src={step.icon} 
                        alt={step.title} 
                        width={48} 
                        height={48} 
                        className="drop-shadow-lg" 
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-yellow-800 dark:text-yellow-200">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-yellow-900/70 dark:text-yellow-100/70 text-base leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Decorative Arrow */}
                  {i < 2 && (
                    <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 -mb-8 text-red-400 animate-bounce">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center animate-fadeIn" style={{ animationDelay: "0.6s" }}>
          <div className="inline-flex items-center gap-4 p-6 bg-linear-to-r from-yellow-100 to-red-100 dark:from-yellow-900/30 dark:to-red-900/30 rounded-2xl border border-yellow-300 dark:border-yellow-600/30 shadow-lg">
            <div className="text-4xl animate-bounce">⚡</div>
            <div className="text-right">
              <div className="text-lg font-bold text-yellow-800 dark:text-yellow-200">
                {t("content.workflow.ctaTitle", { defaultValue: "جاهز للبدء؟" })}
              </div>
              <div className="text-sm text-yellow-700/80 dark:text-yellow-300/80">
                {t("content.workflow.ctaSubtitle", { defaultValue: "ابدأ التشخيص الآن ولا تضيع المزيد من الوقت" })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
