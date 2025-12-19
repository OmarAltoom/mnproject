export function Table({ children, className = "" }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full rounded-lg bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10">
        {children}
      </table>
    </div>
  );
}

export function THead({ children }) {
  return <thead className="bg-yellow-50 dark:bg-zinc-800/50">{children}</thead>;
}

export function TRow({ children, className = "" }) {
  return <tr className={`border-t border-black/5 dark:border-white/10 ${className}`}>{children}</tr>;
}

export function TH({ children, className = "" }) {
  return <th className={`py-3 px-4 text-zinc-700 dark:text-zinc-200 text-start font-bold ${className}`}>{children}</th>;
}

export function TD({ children, className = "" }) {
  return <td className={`py-2 px-4 text-start ${className}`}>{children}</td>;
}
