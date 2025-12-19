// NeonBadge: pill badge with glow matching accent color.
export default function NeonBadge({ children, colorVar = 'var(--color-accent)' }) {
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-background shadow-neon" style={{ background: colorVar }} aria-label="Neon badge">
      {children}
    </span>
  );
}
