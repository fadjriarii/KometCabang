import React from 'react';

export const GraduateMetricsRow = ({
  isFiltered = false,
  totalGraduates = 196,
  totalOriginalCount = 196,
  avgGpa = '3.56',
  avgGpaS1 = '3.52',
  avgGpaS2 = '3.76',
  onTimeRate = '82.4%',
  onTimeRateS2 = '88.5%',
  studySuccess = '91.2%',
  studySuccessS2 = '94.0%',
  onOpenDetailModal,
}) => {
  const gpaOverallVal = typeof avgGpa === 'object' && avgGpa !== null ? (avgGpa.average ?? '3.56') : String(avgGpa || '3.56');
  const gpaS1Val = typeof avgGpaS1 === 'object' && avgGpaS1 !== null ? (avgGpaS1.average ?? '3.52') : String(avgGpaS1 || '3.52');
  const gpaS2Val = typeof avgGpaS2 === 'object' && avgGpaS2 !== null ? (avgGpaS2.average ?? '3.76') : String(avgGpaS2 || '3.76');

  const onTimeS1Rate = typeof onTimeRate === 'object' && onTimeRate !== null ? (onTimeRate.rate ?? '82.4%') : String(onTimeRate || '82.4%');
  const onTimeS1Count = typeof onTimeRate === 'object' && onTimeRate !== null ? (onTimeRate.onTimeCount ?? 98) : 98;
  const onTimeS1Total = typeof onTimeRate === 'object' && onTimeRate !== null ? (onTimeRate.totalIntake ?? 119) : 119;
  const onTimeS1Badge = typeof onTimeRate === 'object' && onTimeRate !== null ? (onTimeRate.badge ?? 'Memenuhi Target IKU') : 'Memenuhi Target IKU';

  const onTimeS2RateVal = typeof onTimeRateS2 === 'object' && onTimeRateS2 !== null ? (onTimeRateS2.rate ?? '88.5%') : String(onTimeRateS2 || '88.5%');
  const onTimeS2Count = typeof onTimeRateS2 === 'object' && onTimeRateS2 !== null ? (onTimeRateS2.onTimeCount ?? 23) : 23;
  const onTimeS2Total = typeof onTimeRateS2 === 'object' && onTimeRateS2 !== null ? (onTimeRateS2.totalS2 ?? 26) : 26;

  const studySuccessS1Rate = typeof studySuccess === 'object' && studySuccess !== null ? (studySuccess.rate ?? '91.2%') : String(studySuccess || '91.2%');
  const studySuccessS1Count = typeof studySuccess === 'object' && studySuccess !== null ? (studySuccess.graduatedCount ?? 109) : 109;
  const studySuccessS1Total = typeof studySuccess === 'object' && studySuccess !== null ? (studySuccess.totalIntake ?? 119) : 119;
  const studySuccessS1Badge = typeof studySuccess === 'object' && studySuccess !== null ? (studySuccess.badge ?? 'Sangat Tinggi') : 'Sangat Tinggi';

  const studySuccessS2RateVal = typeof studySuccessS2 === 'object' && studySuccessS2 !== null ? (studySuccessS2.rate ?? '94.0%') : String(studySuccessS2 || '94.0%');
  const studySuccessS2Count = typeof studySuccessS2 === 'object' && studySuccessS2 !== null ? (studySuccessS2.graduatedCount ?? 25) : 25;
  const studySuccessS2Total = typeof studySuccessS2 === 'object' && studySuccessS2 !== null ? (studySuccessS2.totalS2 ?? 26) : 26;

  const safeTotalGraduates = Number(totalGraduates) || 0;
  const safeTotalOriginalCount = Number(totalOriginalCount) || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
      {/* Card 1: Total Lulusan */}
      <div
        id="card-graduate-total"
        className={`bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 transition-all relative group flex flex-col justify-between ${
          isFiltered ? 'cursor-default' : 'hover:border-primary hover:shadow-md cursor-pointer'
        }`}
        onClick={
          isFiltered
            ? undefined
            : (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                onOpenDetailModal?.('total-graduates', {
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
              Total Lulusan (PDDIKTI)
            </span>
            <div
              className={`w-8 h-8 rounded-lg bg-primary-fixed/50 flex items-center justify-center text-primary transition-transform ${
                isFiltered ? '' : 'group-hover:scale-105'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">school</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-metric-display text-metric-display text-on-surface font-extrabold leading-none">
              {safeTotalGraduates.toLocaleString('en-US')}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1.5 line-clamp-2 leading-tight">
              {isFiltered
                ? `${safeTotalGraduates.toLocaleString('en-US')} lulusan terfilter dari total ${safeTotalOriginalCount.toLocaleString('en-US')} seluruh lulusan terdaftar.`
                : 'Akumulasi seluruh mahasiswa yang telah diyudisium dan terdata pada pangkalan data PDDIKTI.'}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-1 border-t border-surface-container-high/40">
          <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +5.8% YoY
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

      {/* Card 2: Rata-rata IPK */}
      <div
        id="card-graduate-gpa"
        className={`bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 transition-all relative group flex flex-col justify-between ${
          isFiltered ? 'cursor-default' : 'hover:border-primary hover:shadow-md cursor-pointer'
        }`}
        onClick={
          isFiltered
            ? undefined
            : (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                onOpenDetailModal?.('gpa-overview', {
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
              Rata-rata IPK Lulusan
            </span>
            <div
              className={`w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700 transition-transform ${
                isFiltered ? '' : 'group-hover:scale-105'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">grade</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-metric-display text-metric-display text-on-surface font-extrabold leading-none">
              {gpaOverallVal}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1.5 line-clamp-2 leading-tight">
              Rata-rata IPK: Sarjana S1 ({gpaS1Val}) · Magister S2 ({gpaS2Val}).
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-1 border-t border-surface-container-high/40">
          <span className="inline-flex items-center text-xs font-semibold text-teal-700">
            <span className="material-symbols-outlined text-[14px]">school</span> S1: {gpaS1Val} · S2: {gpaS2Val}
          </span>
          {!isFiltered ? (
            <span className="text-[11px] font-medium text-outline group-hover:text-primary flex items-center gap-0.5 group-hover:underline">
              Lihat IPK Prodi <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </span>
          ) : (
            <span className="text-[11px] font-medium text-outline-variant select-none">
              Summary View
            </span>
          )}
        </div>
      </div>

      {/* Card 3: Lulus Tepat Waktu */}
      <div
        id="card-graduate-ontime"
        className={`bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 transition-all relative group flex flex-col justify-between ${
          isFiltered ? 'cursor-default' : 'hover:border-primary hover:shadow-md cursor-pointer'
        }`}
        onClick={
          isFiltered
            ? undefined
            : (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                onOpenDetailModal?.('on-time-graduation', {
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
              Lulus Tepat Waktu
            </span>
            <div
              className={`w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-tertiary transition-transform ${
                isFiltered ? '' : 'group-hover:scale-105'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">timer</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2 flex-wrap">
              <div className="font-metric-display text-metric-display text-on-surface font-extrabold leading-none">
                {onTimeS1Rate}
              </div>
              <span className="text-[11px] font-bold text-primary bg-primary-fixed/60 px-1.5 py-0.5 rounded">S1</span>
              <span className="text-sm font-bold text-purple-700 leading-none">{onTimeS2RateVal}</span>
              <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">S2</span>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1.5 line-clamp-2 leading-tight">
              Evaluasi 5 Thn · S1 (4 thn): {onTimeS1Count} dari {onTimeS1Total} mhs ({onTimeS1Rate}) · S2 (2 thn): {onTimeS2Count} dari {onTimeS2Total} mhs ({onTimeS2RateVal})
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-1 border-t border-surface-container-high/40 gap-2">
          <span className="inline-flex items-center text-xs font-semibold text-amber-700 min-w-0 overflow-hidden">
            <span className="material-symbols-outlined text-[14px] shrink-0">how_to_reg</span>
            <span className="ml-1 truncate">S1: {onTimeS1Badge}</span>
          </span>
          {!isFiltered ? (
            <span className="text-[11px] font-medium text-outline group-hover:text-primary flex items-center gap-0.5 group-hover:underline shrink-0">
              Lihat 6 Angkatan <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </span>
          ) : (
            <span className="text-[11px] font-medium text-outline-variant select-none shrink-0">
              Summary View
            </span>
          )}
        </div>
      </div>

      {/* Card 4: Keberhasilan Studi */}
      <div
        id="card-graduate-studysuccess"
        className={`bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 transition-all relative group flex flex-col justify-between ${
          isFiltered ? 'cursor-default' : 'hover:border-primary hover:shadow-md cursor-pointer'
        }`}
        onClick={
          isFiltered
            ? undefined
            : (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                onOpenDetailModal?.('study-success', {
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
              Keberhasilan Studi
            </span>
            <div
              className={`w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 transition-transform ${
                isFiltered ? '' : 'group-hover:scale-105'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2 flex-wrap">
              <div className="font-metric-display text-metric-display text-on-surface font-extrabold leading-none">
                {studySuccessS1Rate}
              </div>
              <span className="text-[11px] font-bold text-primary bg-primary-fixed/60 px-1.5 py-0.5 rounded">S1</span>
              <span className="text-sm font-bold text-purple-700 leading-none">{studySuccessS2RateVal}</span>
              <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">S2</span>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1.5 line-clamp-2 leading-tight">
              S1 (Evaluasi max 7 thn): {studySuccessS1Count} dari {studySuccessS1Total} mhs ({studySuccessS1Rate}) · S2 (Evaluasi max 4 thn): {studySuccessS2Count} dari {studySuccessS2Total} mhs ({studySuccessS2RateVal})
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-1 border-t border-surface-container-high/40 gap-2">
          <span className="inline-flex items-center text-xs font-semibold text-emerald-700 min-w-0 overflow-hidden">
            <span className="material-symbols-outlined text-[14px] shrink-0">military_tech</span>
            <span className="ml-1 truncate">S1: {studySuccessS1Badge}</span>
          </span>
          {!isFiltered ? (
            <span className="text-[11px] font-medium text-outline group-hover:text-primary flex items-center gap-0.5 group-hover:underline shrink-0">
              Lihat 6 Angkatan <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </span>
          ) : (
            <span className="text-[11px] font-medium text-outline-variant select-none shrink-0">
              Summary View
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GraduateMetricsRow;
