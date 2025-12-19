export default function Filters({ filters, onChange }) {
  return (
    <div className="flex gap-4 my-2">
      {filters.map((filter, idx) => (
        <select
          key={idx}
          value={filter.value}
          onChange={(e) => onChange(idx, e.target.value)}
          className="h-10 rounded-md border border-black/10 dark:border-white/20 bg-white dark:bg-zinc-900 px-3 text-sm"
        >
          {filter.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ))}
    </div>
  );
}
