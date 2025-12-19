// GlassCard: glassmorphism card with optional neon badge.
export default function GlassCard({ title, children, neonBadge }) {
  return (
    <section className="relative rounded-xl bg-glass backdrop-blur-glass border border-holo shadow-holo p-6" role="region" aria-label={title || 'Glass card'}>
      {neonBadge && (
        <span className="absolute -top-3 -left-3 rounded-full px-3 py-1 text-xs font-semibold text-background shadow-neon" style={{ background: 'var(--color-accent)' }}>
          {neonBadge}
        </span>
      )}
      {title && <h3 className="text-xl font-bold text-text mb-3">{title}</h3>}
      <div className="text-text/90">{children}</div>
    </section>
  );
}
