export const GraduateOverviewCards = ({
  gpaS1,
  gpaS2,
  onTimeRate,
  onTimeTarget,
  studySuccessRate,
  studySuccessTarget,
  onOpenModal,
  getOriginRect,
}) => {
  return (
    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full items-stretch">
      {/* Card: IPK Sarjana (S1) */}
      <div
        className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-sm hover:border-primary hover:shadow-md transition-all cursor-pointer relative group flex flex-col justify-between h-full"
        onClick={(e) => onOpenModal('gpa_s1', getOriginRect(e))}
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
              Jenjang Sarjana
            </span>
            <span className="p-1.5 rounded-lg bg-surface-container text-primary material-symbols-outlined text-[16px]">
              school
            </span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">
            Average IPK Sarjana (S1)
          </h3>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="font-metric-display text-3xl font-extrabold text-on-surface">
              {gpaS1}
            </span>
            <span className="text-xs text-outline font-medium">/ 4.00</span>
          </div>
          <p className="font-caption text-caption text-on-surface-variant mt-1.5">
            Cum Laude: 44.2% (152 wisudawan sarjana)
          </p>
          <div className="w-full bg-surface-container-high rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-primary h-1.5 rounded-full"
              style={{ width: `${(Number(gpaS1) / 4.0) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-outline mt-3 pt-2 border-t border-surface-container-high">
          <span>Target Institusi: ≥ 3.25</span>
          <span className="text-primary font-semibold flex items-center gap-0.5 group-hover:underline">
            Lihat Tren <span className="material-symbols-outlined text-[12px]">open_in_new</span>
          </span>
        </div>
      </div>

      {/* Card: IPK Magister (S2) */}
      <div
        className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-sm hover:border-secondary hover:shadow-md transition-all cursor-pointer relative group flex flex-col justify-between h-full"
        onClick={(e) => onOpenModal('gpa_s2', getOriginRect(e))}
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
              Jenjang Magister
            </span>
            <span className="p-1.5 rounded-lg bg-secondary-fixed/50 text-secondary material-symbols-outlined text-[16px]">
              workspace_premium
            </span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">
            Average IPK Magister (S2)
          </h3>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="font-metric-display text-3xl font-extrabold text-on-surface">
              {gpaS2}
            </span>
            <span className="text-xs text-outline font-medium">/ 4.00</span>
          </div>
          <p className="font-caption text-caption text-on-surface-variant mt-1.5">
            Cum Laude: 68.4% (38 wisudawan magister)
          </p>
          <div className="w-full bg-surface-container-high rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-secondary h-1.5 rounded-full"
              style={{ width: `${(Number(gpaS2) / 4.0) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-outline mt-3 pt-2 border-t border-surface-container-high">
          <span>Target Pascasarjana: ≥ 3.50</span>
          <span className="text-secondary font-semibold flex items-center gap-0.5 group-hover:underline">
            Lihat Tren <span className="material-symbols-outlined text-[12px]">open_in_new</span>
          </span>
        </div>
      </div>

      {/* Card: Kelulusan Tepat Waktu */}
      <div
        className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-sm hover:border-amber-500 hover:shadow-md transition-all cursor-pointer relative group flex flex-col justify-between h-full"
        onClick={(e) => onOpenModal('on_time_grad', getOriginRect(e))}
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
              IKU Standar Mutu
            </span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600 material-symbols-outlined text-[16px]">
              timer
            </span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">
            Kelulusan Tepat Waktu
          </h3>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-metric-display text-3xl font-extrabold text-on-surface">
              {onTimeRate}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Target {onTimeTarget}
            </span>
          </div>
          <p className="font-caption text-caption text-on-surface-variant mt-1.5">
            Cohort S1 (4 Thn): 82.4% | Cohort S2 (2 Thn): 88.5%
          </p>
          <div className="w-full bg-surface-container-high rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-amber-500 h-1.5 rounded-full"
              style={{ width: `${parseFloat(onTimeRate) || 82.4}%` }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-outline mt-3 pt-2 border-t border-surface-container-high">
          <span>Evaluasi 5 Angkatan Terakhir</span>
          <span className="text-amber-600 font-semibold flex items-center gap-0.5 group-hover:underline">
            Rincian Cohort <span className="material-symbols-outlined text-[12px]">open_in_new</span>
          </span>
        </div>
      </div>

      {/* Card: Keberhasilan Studi */}
      <div
        className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-sm hover:border-emerald-600 hover:shadow-md transition-all cursor-pointer relative group flex flex-col justify-between h-full"
        onClick={(e) => onOpenModal('study_success', getOriginRect(e))}
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
              IKU Standar Mutu
            </span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 material-symbols-outlined text-[16px]">
              verified_user
            </span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">
            Keberhasilan Studi
          </h3>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-metric-display text-3xl font-extrabold text-on-surface">
              {studySuccessRate}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Target {studySuccessTarget}
            </span>
          </div>
          <p className="font-caption text-caption text-on-surface-variant mt-1.5">
            Cohort S1 (Maks 7 Thn): 91.2% | S2 (Maks 4 Thn): 94.0%
          </p>
          <div className="w-full bg-surface-container-high rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-emerald-600 h-1.5 rounded-full"
              style={{ width: `${parseFloat(studySuccessRate) || 91.2}%` }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-outline mt-3 pt-2 border-t border-surface-container-high">
          <span>Evaluasi 5 Angkatan Terakhir</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-0.5 group-hover:underline">
            Rincian Cohort <span className="material-symbols-outlined text-[12px]">open_in_new</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default GraduateOverviewCards;
