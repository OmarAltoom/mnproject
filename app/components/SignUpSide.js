
"use client";
import { FaUserAstronaut, FaRobot, FaShield, FaArrowRight, FaCheck } from "react-icons/fa6";
import { useMemo, useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function SignUpSide() {
  const t = useTranslations();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState({ users: 0, analyses: 0, accuracy: 0 });
  const [activeFeature, setActiveFeature] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const particles = useMemo(
    () =>
      [...Array(15)].map((_, i) => ({
        id: i,
        x: (i * 11 + 9) % 100,
        y: (i * 15 + 13) % 100,
        size: 1 + (i % 5) * 0.6,
        duration: 12 + (i % 6) * 1.5,
        delay: (i % 7) * 0.4,
        color: ["yellow", "orange", "red"][i % 3],
      })),
    []
  );
  const containerRef = useRef(null);

  // Set isClient flag after hydration to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // إحصائيات ديناميكية تتحدث كل 3 ثوان
  useEffect(() => {
    const animateStats = () => {
      setStats({
        users: Math.min(4500 + Math.random() * 500, 5000),
        analyses: Math.min(28000 + Math.random() * 2000, 30000),
        accuracy: Math.min(97.8 + Math.random() * 2, 99.9)
      });
    };
    animateStats(); // تشغيل أول مرة
    const interval = setInterval(animateStats, 3000);
    return () => clearInterval(interval);
  }, []);

  // تحريك العناصر مع الماوس (Parallax)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = useMemo(() => [
    { icon: FaRobot, label: t("auth.signup.feature1") || "تحليل فوري ودقيق", color: "yellow" },
    { icon: FaShield, label: t("auth.signup.feature2") || "بياناتك بأمان تام", color: "red" },
    { icon: FaUserAstronaut, label: t("auth.signup.feature3") || "واجهة مستقبلية سهلة", color: "orange" }
  ], [t]);

  return (
    <div 
      ref={containerRef}
      className="hidden md:flex w-full min-h-full bg-linear-to-br from-yellow-600 via-amber-500 to-red-600 relative overflow-hidden rounded-none p-0 group"
    >
      {/* Grid Background متحرك */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="animate-[spin_20s_linear_infinite]" style={{ opacity: 0.1 }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fbbf24" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* جزيئات عائمة متحركة - فقط عند التحميل على الكلاينت */}
      {isClient && particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color === "yellow" ? "#fbbf24" : particle.color === "orange" ? "#f97316" : "#dc2626",
            boxShadow: `0 0 ${particle.size * 4}px ${particle.color === "yellow" ? "#fbbf24" : particle.color === "orange" ? "#f97316" : "#dc2626"}`,
            animation: `floatParticle-${particle.id} ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            filter: "blur(0.5px)",
            "--particle-y-distance": `${particle.duration * 10}px`,
            "--particle-x-offset": `${Math.sin(particle.id) * 50}px`,
          }}
        />
      ))}

      {/* خلفية نيون متقدمة */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0" style={{ filter: 'blur(8px)' }}>
          <circle cx="80" cy="80" r="60" fill="#fbbf24" fillOpacity="0.18" className="animate-pulse" />
          <circle cx="90%" cy="30%" r="80" fill="#f59e0b" fillOpacity="0.12" className="animate-pulse" />
          <circle cx="60%" cy="80%" r="60" fill="#dc2626" fillOpacity="0.10" className="animate-pulse" />
        </svg>
        
        {/* إضاءة تتبع الماوس */}
        <div
          className="absolute w-96 h-96 bg-yellow-300 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500"
          style={{
            left: `${mousePos.x * 100}%`,
            top: `${mousePos.y * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        <div className="absolute left-1/2 top-1/4 w-40 h-40 bg-yellow-300 opacity-20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute right-10 bottom-10 w-32 h-32 bg-red-400 opacity-10 rounded-full blur-2xl animate-pulse" />
      </div>

      {/* محتوى رئيسي */}
      <div className="relative z-10 flex flex-col items-center justify-between w-full h-full p-12 overflow-y-auto">
        
        {/* أيقونات مع تأثيرات hover متقدمة */}
        <div className="flex space-x-8 mb-8 mt-4">
          {[FaUserAstronaut, FaRobot, FaShield].map((Icon, idx) => (
            <div key={idx} className="relative group/icon">
              <div className="absolute -inset-4 bg-linear-to-r from-yellow-400 to-red-600 rounded-full opacity-0 group-hover/icon:opacity-20 blur transition duration-500" />
              <Icon
                className={`text-7xl md:text-8xl drop-shadow-neon transition-all duration-300 group-hover/icon:scale-125 group-hover/icon:rotate-12 cursor-pointer ${
                  idx === 0 ? "text-yellow-300" : idx === 1 ? "text-orange-300" : "text-red-300"
                }`}
              />
            </div>
          ))}
        </div>

        {/* العنوان مع تأثير typewriter */}
        <div className="flex flex-col items-center gap-6 flex-1 justify-center">
          <h3 className="text-4xl md:text-5xl font-extrabold text-yellow-100 text-center drop-shadow-neon animate-[fadeIn_0.8s_ease-in-out]">
            {t("auth.signup.sideTitle") || "انضم إلى عالم التشخيص الذكي"}
          </h3>
          
          <p className="text-white text-center max-w-2xl text-xl md:text-2xl leading-relaxed animate-[fadeIn_1s_ease-in-out_0.2s_both]">
            {t("auth.signup.sideDescription") || "أنشئ حسابك واكتشف قوة الذكاء الاصطناعي في كشف الالتهاب الرئوي من صور الأشعة."}
          </p>

          {/* مميزات تفاعلية */}
          <div className="flex flex-col gap-4 mt-6 w-full max-w-md">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group/feature cursor-pointer transition-all duration-300 hover:translate-x-2"
                onClick={() => setActiveFeature(idx)}
              >
                <div className={`flex items-center gap-3 p-4 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                  activeFeature === idx
                    ? `bg-white/20 border border-white/50 shadow-lg shadow-white/30`
                    : "bg-white/10 border border-white/20 hover:border-white/30"
                }`}>
                  <feature.icon className={`text-2xl transition-all group-hover/feature:scale-125 group-hover/feature:rotate-180 text-white`} />
                  <span className={`text-lg font-medium transition-colors ${
                    activeFeature === idx ? `text-white` : "text-white/80"
                  }`}>
                    {feature.label}
                  </span>
                  <FaArrowRight className={`ml-auto text-white transition-all ${activeFeature === idx ? "translate-x-2" : ""}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* إحصائيات ديناميكية */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-4">
          <div className="bg-white/20 border border-white/30 rounded-lg p-3 text-center backdrop-blur-sm hover:border-white/50 transition-all hover:shadow-lg hover:shadow-white/20">
            <p className="text-2xl font-bold text-white">{Math.floor(stats.users / 100)}</p>
            <p className="text-xs text-white/80 mt-1">{t("auth.signup.statsActiveUsers") || "مستخدم نشط"}</p>
          </div>
          
          <div className="bg-white/20 border border-white/30 rounded-lg p-3 text-center backdrop-blur-sm hover:border-white/50 transition-all hover:shadow-lg hover:shadow-white/20">
            <p className="text-2xl font-bold text-white">{Math.floor(stats.analyses / 100)}</p>
            <p className="text-xs text-white/80 mt-1">{t("auth.signup.statsAnalyses") || "تحليل"}</p>
          </div>
          
          <div className="bg-white/20 border border-white/30 rounded-lg p-3 text-center backdrop-blur-sm hover:border-white/50 transition-all hover:shadow-lg hover:shadow-white/20">
            <p className="text-2xl font-bold text-white">{stats.accuracy.toFixed(1)}%</p>
            <p className="text-xs text-white/80 mt-1">{t("auth.signup.statsAccuracy") || "دقة"}</p>
          </div>
        </div>

        {/* زر CTA */}
        <div className="relative group/cta mb-2">
          <div className="absolute -inset-1 bg-linear-to-r from-yellow-300 via-orange-400 to-red-500 rounded-lg blur opacity-50 group-hover/cta:opacity-100 transition duration-300" />
          <button className="relative px-6 py-3 bg-white text-red-600 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-50 transition-all hover:scale-105">
            <FaCheck className="text-sm" />
            {t("auth.signup.ctaButton") || "ابدأ الآن"}
            <FaArrowRight className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}
