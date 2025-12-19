// BackgroundWrapper: full-screen animated background using hologram gradient and floating shapes.
export default function BackgroundWrapper({ children, intensity = 'mid' }) {
  const intensityMap = { low: 'opacity-25', mid: 'opacity-40', high: 'opacity-60' };
  const blobClass = `absolute rounded-full blur-2xl floaty-shape ${intensityMap[intensity] || intensityMap.mid}`;
  return (
    <div aria-hidden="false" className="relative min-h-screen">
      <div className="absolute inset-0 hologram-bg hue-animated" />
      <div className={`${blobClass} right-10 top-20 h-56 w-56`} style={{ background: 'var(--color-secondary)' }} />
      <div className={`${blobClass} left-12 bottom-24 h-48 w-48`} style={{ background: 'var(--color-primary)' }} />
      <div className={`${blobClass} left-1/2 top-1/3 h-40 w-40 -translate-x-1/2`} style={{ background: 'var(--color-accent)' }} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
