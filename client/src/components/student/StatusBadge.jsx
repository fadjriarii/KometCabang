export const StatusBadge = ({ status }) => {
  const s = String(status || '').trim();
  const lower = s.toLowerCase();

  if (lower === 'aktif') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
        <span>Aktif</span>
      </span>
    );
  }

  if (lower === 'lulus') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-fixed/50 text-primary border border-primary/20 whitespace-nowrap">
        <span className="material-symbols-outlined text-[13px] shrink-0">school</span>
        <span>Lulus</span>
      </span>
    );
  }

  if (lower === 'cuti') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
        <span>Cuti</span>
      </span>
    );
  }

  if (lower.includes('keluar') || lower.includes('mengundurkan diri')) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-container text-on-surface-variant border border-outline-variant/40 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-outline shrink-0"></span>
        <span>Keluar</span>
      </span>
    );
  }

  if (lower.includes('drop out') || lower.includes('dikeluarkan')) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 border border-red-200 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-error shrink-0"></span>
        <span>Drop Out</span>
      </span>
    );
  }

  if (lower.includes('transfer')) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-700 shrink-0"></span>
        <span>Transfer</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-container text-on-surface-variant border border-outline-variant/40 whitespace-nowrap">
      <span>{s || '-'}</span>
    </span>
  );
};

export default StatusBadge;
