import React from 'react';

export const MbkmMetricsRow = ({
  isFiltered = false,
  mbkmRate = '69.8%',
  participantStats = { total: 74, active: 74, count: 74, selesaiCount: 45, evaluasiCount: 29, berjalanCount: 0 },
  eligibleCount = 106,
  totalMitra = 28,
  onOpenDetailModal,
}) => {
  const ratePercentage = typeof mbkmRate === 'object' && mbkmRate !== null ? (mbkmRate.percentage ?? '69.8%') : String(mbkmRate || '69.8%');
  const rateNumPercentage = typeof mbkmRate === 'object' && mbkmRate !== null
    ? (mbkmRate.numPercentage ?? parseFloat(ratePercentage) ?? 69.8)
    : (parseFloat(ratePercentage) || 69.8);

  const participantCount = typeof participantStats === 'object' && participantStats !== null
    ? (participantStats.count ?? participantStats.total ?? participantStats.active ?? 74)
    : Number(participantStats) || 74;

  const selesaiCount = typeof participantStats === 'object' && participantStats !== null ? (participantStats.selesaiCount ?? 45) : 45;
  const evaluasiCount = typeof participantStats === 'object' && participantStats !== null ? (participantStats.evaluasiCount ?? 29) : 29;
  const berjalanCount = typeof participantStats === 'object' && participantStats !== null ? (participantStats.berjalanCount ?? 0) : 0;

  const safeEligibleCount = Number(eligibleCount) || 106;
  const safeTotalMitra = Number(totalMitra) || 28;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
      {/* Card 1: % MBKM vs Mahasiswa Eligible */}
      <div
        id="card-mbkm-rate"
        className={`bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 transition-all relative group flex flex-col justify-between ${
          isFiltered ? 'cursor-default' : 'hover:border-primary hover:shadow-md cursor-pointer'
        }`}
        onClick={
          isFiltered
            ? undefined
            : (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                onOpenDetailModal?.('rate-mbkm', {
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
              % MBKM vs Eligible
            </span>
            <div
              className={`w-8 h-8 rounded-lg bg-primary-fixed/50 flex items-center justify-center text-primary transition-transform ${
                isFiltered ? '' : 'group-hover:scale-105'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">percent</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-metric-display text-metric-display text-on-surface font-extrabold leading-none">
              {ratePercentage}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1.5 line-clamp-2 leading-tight">
              {isFiltered
                ? `${participantCount} kegiatan (selesai/evaluasi) dari ${safeEligibleCount} mahasiswa eligible terfilter.`
                : `${participantCount} kegiatan berstatus selesai/evaluasi dari ${safeEligibleCount} mahasiswa aktif semester 7.`}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-1 border-t border-surface-container-high/40">
          <span
            className={`inline-flex items-center text-xs font-semibold ${
              rateNumPercentage >= 20 ? 'text-emerald-600' : 'text-amber-700'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {rateNumPercentage >= 20 ? 'verified' : 'info'}
            </span>{' '}
            Target IKU-2 &ge; 20%
          </span>
          {!isFiltered ? (
            <span className="text-[11px] font-medium text-outline group-hover:text-primary flex items-center gap-0.5 group-hover:underline">
              Lihat Analisis <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </span>
          ) : (
            <span className="text-[11px] font-medium text-outline-variant select-none">
              Summary View
            </span>
          )}
        </div>
      </div>

      {/* Card 2: Total MBKM Aktif (Selesai & Evaluasi) */}
      <div
        id="card-mbkm-active"
        className={`bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 transition-all relative group flex flex-col justify-between ${
          isFiltered ? 'cursor-default' : 'hover:border-primary hover:shadow-md cursor-pointer'
        }`}
        onClick={
          isFiltered
            ? undefined
            : (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                onOpenDetailModal?.('active-mbkm', {
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
              Total MBKM Aktif
            </span>
            <div
              className={`w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700 transition-transform ${
                isFiltered ? '' : 'group-hover:scale-105'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">handshake</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-metric-display text-metric-display text-on-surface font-extrabold leading-none">
              {Number(participantCount).toLocaleString('en-US')}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1.5 line-clamp-2 leading-tight">
              {selesaiCount} selesai · {evaluasiCount} evaluasi · {berjalanCount} sedang berjalan.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-1 border-t border-surface-container-high/40">
          <span className="inline-flex items-center text-xs font-semibold text-teal-700">
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +12.3% YoY
          </span>
          {!isFiltered ? (
            <span className="text-[11px] font-medium text-outline group-hover:text-primary flex items-center gap-0.5 group-hover:underline">
              Lihat Aktivitas <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </span>
          ) : (
            <span className="text-[11px] font-medium text-outline-variant select-none">
              Summary View
            </span>
          )}
        </div>
      </div>

      {/* Card 3: Mahasiswa Eligible (Semester 7) */}
      <div
        id="card-mbkm-eligible"
        className={`bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 transition-all relative group flex flex-col justify-between ${
          isFiltered ? 'cursor-default' : 'hover:border-primary hover:shadow-md cursor-pointer'
        }`}
        onClick={
          isFiltered
            ? undefined
            : (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                onOpenDetailModal?.('eligible-students', {
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
              Mahasiswa Eligible (Sem 7)
            </span>
            <div
              className={`w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-tertiary transition-transform ${
                isFiltered ? '' : 'group-hover:scale-105'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-metric-display text-metric-display text-on-surface font-extrabold leading-none">
              {Number(safeEligibleCount).toLocaleString('en-US')}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1.5 line-clamp-2 leading-tight">
              Jumlah mahasiswa aktif semester 7 pada periode berjalan yang berhak mengonversi 20 SKS.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-1 border-t border-surface-container-high/40">
          <span className="inline-flex items-center text-xs font-semibold text-amber-700">
            <span className="material-symbols-outlined text-[14px]">groups</span> Kohort Senior
          </span>
          {!isFiltered ? (
            <span className="text-[11px] font-medium text-outline group-hover:text-primary flex items-center gap-0.5 group-hover:underline">
              Lihat Sebaran <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </span>
          ) : (
            <span className="text-[11px] font-medium text-outline-variant select-none">
              Summary View
            </span>
          )}
        </div>
      </div>

      {/* Card 4: Mitra Kolaborasi MBKM */}
      <div
        id="card-mbkm-mitra"
        className={`bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 transition-all relative group flex flex-col justify-between ${
          isFiltered ? 'cursor-default' : 'hover:border-primary hover:shadow-md cursor-pointer'
        }`}
        onClick={
          isFiltered
            ? undefined
            : (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                onOpenDetailModal?.('mitra-mbkm', {
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
              Mitra Kolaborasi MBKM
            </span>
            <div
              className={`w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700 transition-transform ${
                isFiltered ? '' : 'group-hover:scale-105'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">domain</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-metric-display text-metric-display text-on-surface font-extrabold leading-none">
              {Number(safeTotalMitra).toLocaleString('en-US')}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1.5 line-clamp-2 leading-tight">
              Instansi industri farmasi, bioteknologi, laboratorium riset hayati, & universitas partner.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-1 border-t border-surface-container-high/40">
          <span className="inline-flex items-center text-xs font-semibold text-purple-700">
            <span className="material-symbols-outlined text-[14px]">apartment</span> Riset & Industri
          </span>
          {!isFiltered ? (
            <span className="text-[11px] font-medium text-outline group-hover:text-primary flex items-center gap-0.5 group-hover:underline">
              Lihat Mitra <span className="material-symbols-outlined text-[12px]">open_in_new</span>
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

export default MbkmMetricsRow;
