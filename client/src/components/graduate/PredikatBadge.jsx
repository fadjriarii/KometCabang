export const PredikatBadge = ({ predikat, ipk }) => {
  const p = String(predikat || '').trim();
  const lower = p.toLowerCase();

  if (lower.includes('cum laude') || lower.includes('cumlaude')) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-primary-fixed/60 text-primary border border-primary/30 whitespace-nowrap">
        <span className="material-symbols-outlined text-[13px] text-primary">workspace_premium</span>
        <span>Cum Laude</span>
      </span>
    );
  }

  if (lower.includes('sangat memuaskan')) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
        <span>Sangat Memuaskan</span>
      </span>
    );
  }

  if (lower.includes('memuaskan')) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
        <span>Memuaskan</span>
      </span>
    );
  }

  if (lower.includes('cukup')) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-surface-container text-on-surface-variant border border-outline-variant/40 whitespace-nowrap">
        <span>Cukup</span>
      </span>
    );
  }

  const numIpk = Number(ipk) || 0;
  if (numIpk >= 3.51) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-primary-fixed/60 text-primary border border-primary/30 whitespace-nowrap">
        <span className="material-symbols-outlined text-[13px] text-primary">workspace_premium</span>
        <span>Cum Laude</span>
      </span>
    );
  }
  if (numIpk >= 3.01) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
        <span>Sangat Memuaskan</span>
      </span>
    );
  }
  if (numIpk >= 2.76) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
        <span>Memuaskan</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-surface-container text-on-surface-variant border border-outline-variant/40 whitespace-nowrap">
      <span>{p || 'Belum Ada Data'}</span>
    </span>
  );
};

export default PredikatBadge;
