export default function Card({ className = "", children }) {
  return (
    <div className={`rounded-lg bg-white/70 dark:bg-white/5 backdrop-blur shadow-(--shadow-soft) border border-black/5 dark:border-white/10 ${className}`}>
      {children}
    </div>
  );
}
