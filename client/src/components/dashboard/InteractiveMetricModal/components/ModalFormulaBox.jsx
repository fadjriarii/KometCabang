export const ModalFormulaBox = ({ data = {} }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-low p-4 rounded-xl border border-surface-container-high">
      <div className="flex-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-outline">
          Formula Resmi (kebutuhanData.md)
        </span>
        <p className="text-xs font-semibold text-on-surface mt-1">{data.formula}</p>
        <p className="text-[11px] text-on-surface-variant mt-1">{data.desc}</p>
      </div>
      <div className="text-right border-t md:border-t-0 md:border-l border-surface-container-high pt-2 md:pt-0 md:pl-4">
        <div className="text-[11px] text-outline font-semibold uppercase">
          Nilai Terkini (25/26 Ganjil)
        </div>
        <div className="font-metric-display text-2xl font-extrabold text-primary">
          {data.latest}
        </div>
        <div className="text-xs font-semibold text-emerald-600 mt-0.5">{data.growth}</div>
      </div>
    </div>
  );
};

export default ModalFormulaBox;
