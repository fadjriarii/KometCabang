import React from 'react';

export const StudentMetricsRow = ({
  isFiltered = false,
  dynamicMetrics = {},
  filteredCount = 0,
  timeHorizon = '5thn',
  selectedCustomYears = [],
  onOpenDetailModal,
}) => {
  const activeCount = dynamicMetrics?.activeCohort ?? dynamicMetrics?.totalActive ?? 0;

  const foreignData = dynamicMetrics?.foreign || dynamicMetrics?.foreignStudents || {
    percentage: '8.3%',
    count: 46,
    totalActive: activeCount || 554,
    trendBadge: '+1.2%',
  };
  const foreignPercentage = foreignData?.percentage || '0.0%';
  const foreignCount = foreignData?.count ?? 0;
  const foreignTotalActive = foreignData?.totalActive ?? activeCount ?? 554;
  const foreignTrendBadge = foreignData?.trendBadge || '+1.2%';
  const isForeignTrendNegative = String(foreignTrendBadge).startsWith('-');

  const intakeData = dynamicMetrics?.intake || {
    count: 148,
    percentage: '26.7%',
    totalActive: activeCount || 554,
    trendBadge: '+3.2%',
  };
  const intakeCount = intakeData?.count ?? 0;
  const intakePercentage = intakeData?.percentage || intakeData?.filledPercentage || '0.0%';
  const intakeTotalActive = intakeData?.totalActive ?? activeCount ?? 554;
  const intakeTrendBadge = intakeData?.trendBadge || '+3.2%';
  const isIntakeTrendNegative = String(intakeTrendBadge).startsWith('-');

  const trendData = dynamicMetrics?.trend || dynamicMetrics?.intakeGrowth || {
    isPositive: true,
    trendPercentage: '+3.2%',
    trendBadge: 'Tumbuh Positif',
  };
  const isTrendPositive = trendData?.isPositive !== undefined
    ? Boolean(trendData.isPositive)
    : (!String(trendData?.rate || trendData?.trendPercentage || '').startsWith('-'));
  const trendPercentage = trendData?.trendPercentage || trendData?.rate || '+3.2%';
  const trendBadge = trendData?.trendBadge || trendData?.label || (isTrendPositive ? 'Tumbuh Positif' : 'Penurunan');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
      {/* Card 1: Total Mahasiswa Aktif */}
      <div
        id="card-student-total-active"
        className={`bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 transition-all relative group flex flex-col justify-between ${
          isFiltered ? 'cursor-default' : 'hover:border-primary hover:shadow-md cursor-pointer'
        }`}
        onClick={
          isFiltered
            ? undefined
            : (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                onOpenDetailModal?.('active-students', {
                  top: rect.top,
                  left: rect.left,
                  width: rect.width,
                  height: rect.height,
                });
              }
        }
      >
        {isFiltered && (
          <span className="absolute top-2 left-2 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-primary/10 text-primary tracking-wide uppercase">
            <span className="material-symbols-outlined text-[11px]">filter_alt</span>
            Filtered
          </span>
        )}
        <div>
          <div className="flex items-center justify-between">
            <span className="font-caption text-caption text-on-surface-variant font-medium">
              Total Mahasiswa Aktif
            </span>
            <div
              className={`w-8 h-8 rounded-lg bg-primary-fixed/50 flex items-center justify-center text-primary transition-transform ${
                isFiltered ? '' : 'group-hover:scale-105'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">groups</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-metric-display text-metric-display text-on-surface font-extrabold leading-none">
              {Number(activeCount).toLocaleString('en-US')}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1.5 line-clamp-2 leading-tight">
              {isFiltered
                ? `${Number(activeCount).toLocaleString('en-US')} mahasiswa aktif dari total ${Number(filteredCount || 0).toLocaleString('en-US')} record terfilter.`
                : 'Jumlah seluruh mahasiswa yang memiliki status keaktifan akademik aktif pada periode berjalan.'}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-1 border-t border-surface-container-high/40">
          <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span>{' '}
            +4.1% dari periode lalu
          </span>
          {!isFiltered ? (
            <span className="text-[11px] font-medium text-outline group-hover:text-primary flex items-center gap-0.5 group-hover:underline">
              Lihat Rincian <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </span>
          ) : (
            <span className="text-[11px] font-medium text-outline-variant select-none">
              Summary View
            </span>
          )}
        </div>
      </div>

      {/* Card 2: Menghitung % Mahasiswa Asing */}
      <div
        id="card-student-foreign-percentage"
        className={`bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 transition-all relative group flex flex-col justify-between ${
          isFiltered ? 'cursor-default' : 'hover:border-primary hover:shadow-md cursor-pointer'
        }`}
        onClick={
          isFiltered
            ? undefined
            : (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                onOpenDetailModal?.('foreign-students', {
                  top: rect.top,
                  left: rect.left,
                  width: rect.width,
                  height: rect.height,
                });
              }
        }
      >
        {isFiltered && (
          <span className="absolute top-2 left-2 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-primary/10 text-primary tracking-wide uppercase">
            <span className="material-symbols-outlined text-[11px]">filter_alt</span>
            Filtered
          </span>
        )}
        <div>
          <div className="flex items-center justify-between">
            <span className="font-caption text-caption text-on-surface-variant font-medium">
              Persentase Mahasiswa Asing
            </span>
            <div
              className={`w-8 h-8 rounded-lg bg-secondary-fixed/50 flex items-center justify-center text-secondary transition-transform ${
                isFiltered ? '' : 'group-hover:scale-105'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">public</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-metric-display text-metric-display text-on-surface font-extrabold leading-none">
              {foreignPercentage}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1.5 line-clamp-2 leading-tight">
              {foreignCount} Mahasiswa Asing Non-WNI dari total {foreignTotalActive} mahasiswa aktif.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-1 border-t border-surface-container-high/40">
          <span
            className={`inline-flex items-center text-xs font-semibold ${
              isForeignTrendNegative ? 'text-red-600' : 'text-emerald-600'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {isForeignTrendNegative ? 'arrow_downward' : 'arrow_upward'}
            </span>{' '}
            {foreignTrendBadge}
          </span>
          {!isFiltered ? (
            <span className="text-[11px] font-medium text-outline group-hover:text-primary flex items-center gap-0.5 group-hover:underline">
              Lihat Tren <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </span>
          ) : (
            <span className="text-[11px] font-medium text-outline-variant select-none">
              Summary View
            </span>
          )}
        </div>
      </div>

      {/* Card 3: Menghitung Intake */}
      <div
        id="card-student-intake"
        className={`bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 transition-all relative group flex flex-col justify-between ${
          isFiltered ? 'cursor-default' : 'hover:border-primary hover:shadow-md cursor-pointer'
        }`}
        onClick={
          isFiltered
            ? undefined
            : (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                onOpenDetailModal?.('intake-students', {
                  top: rect.top,
                  left: rect.left,
                  width: rect.width,
                  height: rect.height,
                });
              }
        }
      >
        {isFiltered && (
          <span className="absolute top-2 left-2 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-primary/10 text-primary tracking-wide uppercase">
            <span className="material-symbols-outlined text-[11px]">filter_alt</span>
            Filtered
          </span>
        )}
        <div>
          <div className="flex items-center justify-between">
            <span className="font-caption text-caption text-on-surface-variant font-medium">
              Intake Mahasiswa Baru (MB)
            </span>
            <div
              className={`w-8 h-8 rounded-lg bg-tertiary-fixed/50 flex items-center justify-center text-tertiary transition-transform ${
                isFiltered ? '' : 'group-hover:scale-105'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-metric-display text-metric-display text-on-surface font-extrabold leading-none">
              {Number(intakeCount).toLocaleString('en-US')}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1.5 line-clamp-2 leading-tight">
              {intakePercentage} dari total {intakeTotalActive} mahasiswa aktif (Mahasiswa Semester 1).
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-1 border-t border-surface-container-high/40">
          <span
            className={`inline-flex items-center text-xs font-semibold ${
              isIntakeTrendNegative ? 'text-red-600' : 'text-emerald-600'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {isIntakeTrendNegative ? 'arrow_downward' : 'arrow_upward'}
            </span>{' '}
            {intakeTrendBadge}
          </span>
          {!isFiltered ? (
            <span className="text-[11px] font-medium text-outline group-hover:text-primary flex items-center gap-0.5 group-hover:underline">
              Lihat Detail <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </span>
          ) : (
            <span className="text-[11px] font-medium text-outline-variant select-none">
              Summary View
            </span>
          )}
        </div>
      </div>

      {/* Card 4: Penurunan / Pertumbuhan MB */}
      <div
        id="card-student-fluctuation"
        className={`bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 transition-all relative group flex flex-col justify-between ${
          isFiltered ? 'cursor-default' : 'hover:border-primary hover:shadow-md cursor-pointer'
        }`}
        onClick={
          isFiltered
            ? undefined
            : (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                onOpenDetailModal?.('intake-fluctuation', {
                  top: rect.top,
                  left: rect.left,
                  width: rect.width,
                  height: rect.height,
                });
              }
        }
      >
        {isFiltered && (
          <span className="absolute top-2 left-2 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-primary/10 text-primary tracking-wide uppercase">
            <span className="material-symbols-outlined text-[11px]">filter_alt</span>
            Filtered
          </span>
        )}
        <div>
          <div className="flex items-center justify-between">
            <span className="font-caption text-caption text-on-surface-variant font-medium">
              {timeHorizon === 'custom'
                ? selectedCustomYears.length > 0
                  ? `Penurunan MB (${selectedCustomYears.length} Tahun)`
                  : 'Penurunan MB (Custom Tahun)'
                : timeHorizon === 'all'
                ? 'Penurunan MB (All Time)'
                : 'Penurunan Mahasiswa Baru (5 Thn)'}
            </span>
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform ${
                isFiltered ? '' : 'group-hover:scale-105'
              } ${
                isTrendPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isTrendPositive ? 'trending_up' : 'trending_down'}
              </span>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-metric-display text-metric-display text-on-surface font-extrabold leading-none">
              {trendPercentage}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1.5 line-clamp-2 leading-tight">
              {timeHorizon === 'custom' && selectedCustomYears.length > 0
                ? `Rata-rata fluktuasi/penurunan mahasiswa baru dari cohort yang dipilih (${[...selectedCustomYears].sort((a, b) => a - b).join(', ')}).`
                : timeHorizon === 'custom' && selectedCustomYears.length === 0
                ? 'Pilih tahun angkatan pada filter di bawah untuk melihat tren fluktuasi mahasiswa baru.'
                : 'Rata-rata fluktuasi/penurunan mahasiswa baru dari kohort 5 tahun terakhir: % Penurunan MB = average(Δ/A).'}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-1 border-t border-surface-container-high/40">
          <span
            className={`inline-flex items-center text-xs font-semibold ${
              isTrendPositive ? 'text-emerald-600' : 'text-red-600'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {isTrendPositive ? 'arrow_upward' : 'arrow_downward'}
            </span>{' '}
            {trendBadge}
          </span>
          {!isFiltered ? (
            <span className="text-[11px] font-medium text-outline group-hover:text-primary flex items-center gap-0.5 group-hover:underline">
              Lihat Tren <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </span>
          ) : (
            <span className="text-[11px] font-medium text-outline-variant select-none">
              Summary View
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentMetricsRow;
