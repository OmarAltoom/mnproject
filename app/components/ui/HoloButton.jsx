// HoloButton: button with holographic gradient, focus ring, hover/active states.
export default function HoloButton({ variant = 'primary', className = '', ...props }) {
  const base =
    'holo-sheen inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-transform duration-150 will-change-transform';
  const motion = 'hover:scale-[1.02] active:scale-[0.99]';
  const ring = 'focus-visible:ring-(--color-accent-500) focus-visible:ring-offset-(--color-background)';

  const primary = 'text-(--color-background) bg-holo-gradient shadow-neon';
  const ghost = 'text-(--color-text) bg-transparent hover:bg-(--color-background)/30';
  const outline = 'text-(--color-text) bg-transparent border border-(--color-accent-500) hover:bg-(--color-accent-100)/30';

  const variantClass = variant === 'primary' ? primary : variant === 'ghost' ? ghost : outline;
  return (
    <button {...props} className={`${base} ${motion} ${ring} ${variantClass} ${className}`} />
  );
}
