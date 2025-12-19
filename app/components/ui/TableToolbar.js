import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

export default function TableToolbar({
  search,
  onSearch,
  filters = [],
  onFilterChange,
  actions = [],
  className = "",
}) {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 mb-4 ${className}`}>
      <div className="flex items-center gap-2">
        <Input
          value={search}
          onChange={(e) => onSearch?.(e.target.value)}
          placeholder="بحث..."
          className="w-64"
        />
        {filters?.length > 0 && (
          <div className="flex items-center gap-2">
            {filters.map((f, idx) => (
              <select
                key={idx}
                value={f.value}
                onChange={(e) => onFilterChange?.(idx, e.target.value)}
                className="h-10 rounded-md border border-black/10 dark:border-white/20 bg-white dark:bg-zinc-900 px-3 text-sm"
              >
                {f.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {actions.map((action, i) => (
          <Button key={i} variant={action.variant || "primary"} onClick={action.onClick}>
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
