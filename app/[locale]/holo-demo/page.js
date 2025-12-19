import Hero from "@/app/components/ui/Hero";
import GlassCard from "@/app/components/ui/GlassCard";
import HoloButton from "@/app/components/ui/HoloButton";
import ScanCard from "@/app/components/ui/ScanCard";
import NeonBadge from "@/app/components/ui/NeonBadge";

export default function HoloDemoPage() {
  return (
    <main className="space-y-10">
      <Hero />
      <section className="mx-auto max-w-5xl px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <GlassCard title="بطاقة زجاجية" neonBadge="New">
            <p>هذه بطاقة زجاجية مع حدود هولوجرام وظل خفيف.</p>
            <div className="mt-4 flex gap-3">
              <HoloButton>CTA أساسي</HoloButton>
              <HoloButton variant="outline">ثانوي</HoloButton>
            </div>
          </GlassCard>
          <div className="space-y-4">
            <ScanCard title="فحص الأشعة - كتف" status="ready" description="جاهز للمراجعة" />
            <ScanCard title="فحص CT - صدر" status="pending" description="بانتظار الطبيب" />
          </div>
        </div>
        <div className="mt-6">
          <NeonBadge>Accent</NeonBadge>
        </div>
      </section>
    </main>
  );
}
