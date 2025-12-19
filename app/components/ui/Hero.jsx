import BackgroundWrapper from './BackgroundWrapper';
import HoloButton from './HoloButton';

export default function Hero() {
  return (
    <BackgroundWrapper intensity="mid">
      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h1
          className="text-4xl md:text-6xl font-extrabold tracking-tight holo-sheen"
          style={{
            backgroundImage: 'linear-gradient(90deg, var(--color-secondary), var(--color-primary), var(--color-accent))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          منصة تحليلات الأشعة – تجربة هولوجرام مبهرة
        </h1>
        <p className="mt-4 text-lg md:text-xl text-background/90">
          واجهة حديثة سريعة، صُممت حول ألوان العلامة وتأثيرات زجاجية وهولوجرام.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <HoloButton variant="primary">ابدأ الآن</HoloButton>
          <HoloButton variant="outline">تعرّف أكثر</HoloButton>
        </div>
      </div>
    </BackgroundWrapper>
  );
}
