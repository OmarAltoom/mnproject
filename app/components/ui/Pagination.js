export default function Pagination({ page = 1, pageCount = 1, onPageChange }) {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= pageCount;
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button
        className="h-9 px-3 rounded-md border border-black/10 dark:border-white/20 bg-white dark:bg-zinc-900 disabled:opacity-50"
        disabled={prevDisabled}
        onClick={() => onPageChange?.(Math.max(1, page - 1))}
      >
        السابق
      </button>
      <span className="mx-2 text-sm">صفحة {page} من {pageCount}</span>
      <button
        className="h-9 px-3 rounded-md border border-black/10 dark:border-white/20 bg-white dark:bg-zinc-900 disabled:opacity-50"
        disabled={nextDisabled}
        onClick={() => onPageChange?.(Math.min(pageCount, page + 1))}
      >
        التالي
      </button>
    </div>
  );
}
