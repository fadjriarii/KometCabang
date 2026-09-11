export const ExecutiveTopCards = ({ topSummary = {}, onOpenModal }) => {
  const getOriginRect = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Total Active Students */}
      <div
        className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-sm hover:border-primary hover:shadow-md transition-all cursor-pointer relative group"
        onClick={(e) => onOpenModal('active_students', getOriginRect(e))}
      >
        <div className="flex items-center justify-between">
          <span className="font-caption text-caption text-on-surface-variant font-medium">
            Total Active Students
          </span>
          <div className="w-8 h-8 rounded-lg bg-primary-fixed/50 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[18px]">groups</span>
          </div>
        </div>
        <div className="mt-3">
          <div className="font-metric-display text-metric-display text-on-surface font-extrabold leading-none">
            {topSummary.activeStudents || 554}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>{' '}
              {topSummary.activeStudentsGrowth || '+4.1%'}
            </span>
            <span className="text-[11px] font-medium text-primary flex items-center gap-0.5 group-hover:underline">
              Lihat Tren <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </span>
          </div>
        </div>
      </div>

      {/* Card 2: Total Graduates */}
      <div
        className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-sm hover:border-primary hover:shadow-md transition-all cursor-pointer relative group"
        onClick={(e) => onOpenModal('total_graduates', getOriginRect(e))}
      >
        <div className="flex items-center justify-between">
          <span className="font-caption text-caption text-on-surface-variant font-medium">
            Total Graduates (PDDIKTI)
          </span>
          <div className="w-8 h-8 rounded-lg bg-secondary-fixed/50 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[18px]">school</span>
          </div>
        </div>
        <div className="mt-3">
          <div className="font-metric-display text-metric-display text-on-surface font-extrabold leading-none">
            {topSummary.totalGraduates ? Number(topSummary.totalGraduates).toLocaleString('id-ID') : '1.240'}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>{' '}
              {topSummary.totalGraduatesGrowth || '+5.8%'}
            </span>
            <span className="text-[11px] font-medium text-outline group-hover:text-primary flex items-center gap-0.5 group-hover:underline">
              Lihat Tren <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </span>
          </div>
        </div>
      </div>

      {/* Card 3: Total MBKM Aktif */}
      <div
        className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-sm hover:border-primary hover:shadow-md transition-all cursor-pointer relative group"
        onClick={(e) => onOpenModal('total_mbkm', getOriginRect(e))}
      >
        <div className="flex items-center justify-between">
          <span className="font-caption text-caption text-on-surface-variant font-medium">
            Total MBKM Aktif
          </span>
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-tertiary group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[18px]">handshake</span>
          </div>
        </div>
        <div className="mt-3">
          <div className="font-metric-display text-metric-display text-on-surface font-extrabold leading-none">
            {topSummary.totalMbkm || 74}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>{' '}
              {topSummary.totalMbkmGrowth || '+12.3%'}
            </span>
            <span className="text-[11px] font-medium text-outline group-hover:text-primary flex items-center gap-0.5 group-hover:underline">
              Lihat Tren <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </span>
          </div>
        </div>
      </div>

      {/* Card 4: Reporting Period */}
      <div className="bg-gradient-to-br from-primary to-primary-container p-4 rounded-xl text-on-primary shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-caption text-caption text-on-primary-container/80 font-medium">
            Reporting Period
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-semibold uppercase tracking-wider text-white">
            Active Period
          </span>
        </div>
        <div className="mt-3">
          <div className="font-headline-lg text-headline-lg font-bold text-white leading-tight">
            {topSummary.reportingPeriod || '2025/2026 – Ganjil'}
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="inline-flex items-center gap-1 text-xs text-primary-fixed">
              <span className="material-symbols-outlined text-[14px]">verified</span> Data Sevima Locked
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTopCards;
