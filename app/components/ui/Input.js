export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`h-10 w-full rounded-md border border-black/10 dark:border-white/20 bg-white dark:bg-zinc-900 px-3 text-sm text-(--color-text) placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-(--color-accent-500) ${className}`}
      {...props}
    />
  );
}
