export const SuccessTooltip = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;
  const p = payload[0]?.payload;
  if (!p) return null;

  return (
    <div className="rounded-lg border border-surface-container-high bg-white px-3.5 py-2.5 shadow-xl min-w-[210px]">
      <div className="flex items-center justify-between border-b border-surface-container-high pb-1.5 mb-1.5">
        <p className="text-xs font-bold text-on-surface">{p.cohortLabel}</p>
        {p.isIncomplete ? (
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
            Sedang Berjalan
          </span>
        ) : (
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {p.rateFormatted}
          </span>
        )}
      </div>
      <div className="space-y-1 text-xs text-on-surface-variant">
        <div className="flex justify-between">
          <span>Lulus (≤ 7 Thn):</span>
          <span className="font-bold text-emerald-700">{p.successCount} mhs</span>
        </div>
        <div className="flex justify-between">
          <span>Total Lulusan:</span>
          <span className="font-bold text-on-surface">{p.total} mhs</span>
        </div>
        <div className="flex justify-between border-t border-surface-container-high pt-1">
          <span>Total Intake Angkatan:</span>
          <span className="font-bold text-primary">{p.intake} mhs</span>
        </div>
      </div>
      {p.isIncomplete && (
        <p className="text-[10px] text-emerald-800 bg-emerald-50/80 p-1.5 rounded mt-2 border border-emerald-200/60 leading-tight">
          Tahun terbaru dalam tabel (belum dihitung dalam evaluasi 5 tahun).
        </p>
      )}
    </div>
  );
};

export const SuccessTooltipS2 = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;
  const p = payload[0]?.payload;
  if (!p) return null;

  return (
    <div className="rounded-lg border border-surface-container-high bg-white px-3.5 py-2.5 shadow-xl min-w-[210px]">
      <div className="flex items-center justify-between border-b border-surface-container-high pb-1.5 mb-1.5">
        <p className="text-xs font-bold text-on-surface">{p.cohortLabel}</p>
        {p.isIncomplete ? (
          <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded border border-purple-300">
            Sedang Berjalan
          </span>
        ) : (
          <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
            {p.rateFormatted}
          </span>
        )}
      </div>
      <div className="space-y-1 text-xs text-on-surface-variant">
        <div className="flex justify-between">
          <span>Lulus (≤ 4 Thn):</span>
          <span className="font-bold text-emerald-700">{p.successCount} mhs</span>
        </div>
        <div className="flex justify-between border-t border-surface-container-high pt-1">
          <span>Total Intake S2:</span>
          <span className="font-bold text-primary">{p.intake || p.total || p.totalS2} mhs</span>
        </div>
      </div>
      {p.isIncomplete && (
        <p className="text-[10px] text-purple-800 bg-purple-50/80 p-1.5 rounded mt-2 border border-purple-200/60 leading-tight">
          Tahun terbaru dalam tabel (belum dihitung dalam evaluasi 5 tahun).
        </p>
      )}
    </div>
  );
};
