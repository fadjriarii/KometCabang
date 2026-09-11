export const OnTimeTooltip = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;
  const p = payload[0]?.payload;
  if (!p) return null;

  return (
    <div className="rounded-xl border border-surface-container-high bg-white p-3.5 shadow-xl min-w-[230px]">
      <div className="flex items-center justify-between border-b border-surface-container-high pb-2 mb-2">
        <div>
          <p className="text-xs font-bold text-on-surface">{p.cohortLabel}</p>
          <p className="text-[10px] text-on-surface-variant">Tahun Kelulusan: {p.tahunLulusTepat || (p.cohort + 4)}</p>
        </div>
        {p.isIncomplete ? (
          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
            Sedang Berjalan
          </span>
        ) : (
          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            {p.rateFormatted}
          </span>
        )}
      </div>
      <div className="space-y-1 text-xs text-on-surface-variant">
        <div className="flex justify-between">
          <span>Lulus &lt; 4 Thn (Cepat):</span>
          <span className="font-medium text-sky-700">{p.fastCount || 0} mhs</span>
        </div>
        <div className="flex justify-between">
          <span>Lulus Tepat (4 Thn):</span>
          <span className="font-bold text-emerald-700">{p.isIncomplete ? 'Sedang berjalan' : `${p.onTimeCount} mhs`}</span>
        </div>
        <div className="flex justify-between">
          <span>Lulus &gt; 4 Thn:</span>
          <span className="font-medium text-rose-600">{p.lateCount || 0} mhs</span>
        </div>
        <div className="flex justify-between border-t border-surface-container-high pt-1.5 font-semibold">
          <span>Total Intake Angkatan:</span>
          <span className="font-bold text-primary">{p.intake} mhs</span>
        </div>
      </div>
      {p.isIncomplete && (
        <p className="text-[10px] text-amber-700 bg-amber-50/80 p-1.5 rounded mt-2 border border-amber-200/60 leading-tight">
          Tahun terbaru dalam tabel (belum dihitung dalam evaluasi 5 tahun).
        </p>
      )}
    </div>
  );
};

export const OnTimeTooltipS2 = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;
  const p = payload[0]?.payload;
  if (!p) return null;

  return (
    <div className="rounded-xl border border-surface-container-high bg-white p-3.5 shadow-xl min-w-[230px]">
      <div className="flex items-center justify-between border-b border-surface-container-high pb-2 mb-2">
        <div>
          <p className="text-xs font-bold text-on-surface">{p.cohortLabel}</p>
          <p className="text-[10px] text-on-surface-variant">Tahun Kelulusan: {p.tahunLulusTepat || (p.cohort + 2)}</p>
        </div>
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
          <span>Lulus &lt; 2 Thn (Cepat):</span>
          <span className="font-medium text-sky-700">{p.fastCount || 0} mhs</span>
        </div>
        <div className="flex justify-between">
          <span>Lulus Tepat (2 Thn):</span>
          <span className="font-bold text-purple-700">{p.isIncomplete ? 'Sedang berjalan' : `${p.onTimeCount} mhs`}</span>
        </div>
        <div className="flex justify-between">
          <span>Lulus &gt; 2 Thn:</span>
          <span className="font-medium text-rose-600">{p.lateCount || 0} mhs</span>
        </div>
        <div className="flex justify-between border-t border-surface-container-high pt-1.5 font-semibold">
          <span>Total Intake S2:</span>
          <span className="font-bold text-primary">{p.intake || p.totalS2} mhs</span>
        </div>
      </div>
      {p.isIncomplete && (
        <p className="text-[10px] text-purple-700 bg-purple-50/80 p-1.5 rounded mt-2 border border-purple-200/60 leading-tight">
          Tahun terbaru dalam tabel (belum dihitung dalam evaluasi 5 tahun).
        </p>
      )}
    </div>
  );
};
