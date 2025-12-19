"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function TestimonialsSection() {
  const t = useTranslations();
  const testimonialsCopy = (t.raw ? t.raw("testimonials")?.items : null) || [];
  const badges = (t.raw ? t.raw("testimonials")?.badges : null) || [];
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    if (!testimonialsCopy.length) return;
    setActiveIndex((prev) => (prev + 1) % testimonialsCopy.length);
  };

  const prevTestimonial = () => {
    if (!testimonialsCopy.length) return;
    setActiveIndex((prev) => (prev - 1 + testimonialsCopy.length) % testimonialsCopy.length);
  };

  return (
    <section className="relative w-full py-20 sm:py-24 bg-white dark:bg-zinc-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(239, 68, 68, 0.3) 0%, transparent 50%)
          `,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            <span className="bg-linear-to-r from-yellow-600 via-red-500 to-red-700 bg-clip-text text-transparent">
              {t("testimonials.title", { defaultValue: "آراء عملائنا" })}
            </span>
          </h2>
          <p className="text-lg text-yellow-800/80 dark:text-yellow-200/80 max-w-2xl mx-auto">
            {t("testimonials.subtitle", { defaultValue: "اكتشف تجارب المستخدمين الذين وثقوا بنا" })}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="relative p-8 sm:p-12 bg-linear-to-br from-yellow-50 to-red-50 dark:from-zinc-800 dark:to-zinc-800 rounded-3xl border-2 border-yellow-200 dark:border-yellow-600/30 shadow-2xl">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-6xl text-yellow-400/20">
              &ldquo;
            </div>

            {/* Profile */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-yellow-400 to-red-600 rounded-full blur-lg opacity-50" />
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-zinc-700 rounded-full flex items-center justify-center shadow-xl">
                  <Image 
                    src={(testimonialsCopy[activeIndex] || {}).image || "/icons/ai.svg"}
                    alt={(testimonialsCopy[activeIndex] || {}).name || "testimonial"}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-yellow-800 dark:text-yellow-200">
                  {(testimonialsCopy[activeIndex] || {}).name || ""}
                </h3>
                <p className="text-yellow-700/80 dark:text-yellow-300/80">
                  {(testimonialsCopy[activeIndex] || {}).role || ""}
                </p>
                {/* Rating Stars */}
                <div className="flex gap-1 mt-1">
                  {[...Array((testimonialsCopy[activeIndex] || {}).rating || 0)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial Text */}
            <p className="text-lg sm:text-xl text-yellow-900/90 dark:text-yellow-100/90 leading-relaxed mb-6 relative z-10">
              {(testimonialsCopy[activeIndex] || {}).text || ""}
            </p>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={prevTestimonial}
                className="p-3 bg-white dark:bg-zinc-700 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-yellow-200 dark:border-yellow-600/30"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonialsCopy.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === activeIndex 
                        ? 'bg-linear-to-r from-yellow-500 to-red-600 w-8' 
                        : 'bg-yellow-300 dark:bg-yellow-700'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-3 bg-white dark:bg-zinc-700 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-yellow-200 dark:border-yellow-600/30"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Thumbnail Grid Below */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {testimonialsCopy.map((testimonial, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`group p-4 rounded-2xl transition-all duration-300 ${
                  i === activeIndex
                    ? 'bg-linear-to-br from-yellow-100 to-red-100 dark:from-yellow-900/30 dark:to-red-900/30 border-2 border-yellow-400 dark:border-yellow-600 shadow-lg scale-105'
                    : 'bg-white dark:bg-zinc-800 border border-yellow-200 dark:border-yellow-600/20 hover:shadow-md hover:scale-105'
                }`}
              >
                <div className="w-12 h-12 mx-auto mb-2 bg-white dark:bg-zinc-700 rounded-full flex items-center justify-center shadow-md">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    width={32}
                    height={32}
                  />
                </div>
                <div className="text-xs font-semibold text-yellow-800 dark:text-yellow-200 text-center truncate">
                  {testimonial.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-60">
          {(badges.length ? badges : [
            { text: "موثوق من +15K مستخدم", icon: "✓" },
            { text: "99.8% دقة", icon: "★" },
            { text: "24/7 دعم", icon: "♥" },
            { text: "ISO معتمد", icon: "◆" },
          ]).map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
              <span className="text-2xl">{badge.icon}</span>
              <span className="font-semibold">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
