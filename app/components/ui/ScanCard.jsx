// ScanCard: example medical card with status badge and animated accent.
const statusMap = {
  ready: { bg: 'bg-secondary-100', text: 'text-secondary-900', label: 'جاهز' },
  pending: { bg: 'bg-bright-100', text: 'text-darkc-900', label: 'بانتظار' },
  error: { bg: 'bg-primary-100', text: 'text-primary-900', label: 'خطأ' }
};

export default function ScanCard({ title, status = 'ready', description }) {
  const s = statusMap[status] || statusMap.ready;
  return (
    <article className="rounded-xl border border-holo bg-glass backdrop-blur-glass p-5 shadow-holo holo-sheen">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-text">{title}</h4>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${s.bg} ${s.text}`}>{s.label}</span>
      </div>
      {description && <p className="mt-2 text-sm text-text/80">{description}</p>}
      <div className="mt-4 h-1 w-24 rounded-full hologram-bg animate-gradient" />
    </article>
  );
}
