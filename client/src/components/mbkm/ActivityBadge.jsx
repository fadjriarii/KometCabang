export const ActivityBadge = ({ activity }) => {
  const a = String(activity || '').toLowerCase();
  let bg = 'bg-surface-container text-on-surface';
  let icon = 'work';

  if (a.includes('magang')) {
    bg = 'bg-blue-50 text-blue-700 border border-blue-200';
    icon = 'domain';
  } else if (a.includes('studi')) {
    bg = 'bg-purple-50 text-purple-700 border border-purple-200';
    icon = 'menu_book';
  } else if (a.includes('riset') || a.includes('penelitian')) {
    bg = 'bg-teal-50 text-teal-700 border border-teal-200';
    icon = 'biotech';
  } else if (a.includes('pmm') || a.includes('pertukaran')) {
    bg = 'bg-amber-50 text-amber-700 border border-amber-200';
    icon = 'sync_alt';
  } else if (a.includes('wirausaha')) {
    bg = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    icon = 'storefront';
  } else if (a.includes('kemanusiaan') || a.includes('desa')) {
    bg = 'bg-rose-50 text-rose-700 border border-rose-200';
    icon = 'volunteer_activism';
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold whitespace-nowrap ${bg}`}>
      <span className="material-symbols-outlined text-[13px] shrink-0">{icon}</span>
      <span>{activity}</span>
    </span>
  );
};

export default ActivityBadge;
