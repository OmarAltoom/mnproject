export default function Button({ variant = "primary", size = "md", className = "", children, ...props }) {
  const base = "inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };
  const variants = {
    primary: "bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-900)] focus:ring-[var(--color-primary-500)]",
    secondary: "bg-[var(--color-secondary-500)] text-black hover:bg-[var(--color-secondary-900)] focus:ring-[var(--color-secondary-500)]",
    ghost: "bg-transparent text-[var(--color-text)] hover:bg-black/5 dark:hover:bg-white/10",
    outline: "border border-black/10 dark:border-white/20 bg-transparent text-[var(--color-text)] hover:bg-black/5 dark:hover:bg-white/10",
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
