export const ModalAuditTable = ({ points = [] }) => {
  return (
    <div>
      <h4 className="font-headline-sm text-xs font-bold text-on-surface uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-secondary"></span> Rincian Tabel Semester
      </h4>
      <div className="border border-surface-container-high rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-container-low border-b border-surface-container-high text-outline text-[11px] font-semibold">
            <tr>
              <th className="py-2 px-3">Semester</th>
              <th className="py-2 px-3 text-right">Nilai Capaian</th>
              <th className="py-2 px-3 text-right">Delta / YoY</th>
              <th className="py-2 px-3 text-right">Status Evaluasi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-high/60 bg-surface-container-lowest font-medium">
            {points.map((pt, i) => {
              const isLast = i === points.length - 1;
              const rowBg = isLast
                ? 'bg-primary-fixed/20 font-bold'
                : i % 2 === 0
                ? 'bg-surface-container-lowest'
                : 'bg-surface-container-low/30';

              return (
                <tr key={pt.sem} className={`${rowBg} hover:bg-surface-container-low transition-colors`}>
                  <td className="py-2 px-3 text-on-surface">{pt.sem}</td>
                  <td
                    className={`py-2 px-3 text-right font-bold ${
                      isLast ? 'text-primary' : 'text-on-surface'
                    }`}
                  >
                    {pt.val}
                  </td>
                  <td className="py-2 px-3 text-right text-emerald-600 font-semibold">
                    {pt.delta}
                  </td>
                  <td className="py-2 px-3 text-right">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] ${
                        isLast
                          ? 'bg-primary text-white font-bold'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      {pt.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModalAuditTable;
