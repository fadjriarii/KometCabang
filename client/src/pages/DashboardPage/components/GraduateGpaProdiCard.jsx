export const GraduateGpaProdiCard = ({ gpaList = [], onOpenModal, getOriginRect }) => {
  return (
    <div
      className="lg:col-span-4 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-sm hover:border-primary transition-all cursor-pointer group flex flex-col justify-between hover:shadow-md h-full"
      onClick={(e) => onOpenModal('gpa_prodi', getOriginRect(e))}
    >
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
          <div>
            <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
              Multi-Bar Metrik
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">
              Average IPK per Program Studi
            </h3>
          </div>
          <span className="p-1.5 rounded-lg bg-surface-container text-primary material-symbols-outlined text-[18px]">
            bar_chart
          </span>
        </div>

        <div className="mt-3 space-y-2.5">
          {gpaList.map((item) => {
            const prodiName = item.program_studi || item.program || 'Prodi';
            const gpaVal = item.average_ipk !== undefined ? item.average_ipk : (item.gpa !== undefined ? item.gpa : 3.5);
            const gpaNum = typeof gpaVal === 'number' ? gpaVal : parseFloat(gpaVal) || 3.5;
            const barPct = ((gpaNum / 4.0) * 100).toFixed(1);
            const isS2 = prodiName.toLowerCase().includes('magister') || prodiName.toLowerCase().includes('s2');

            return (
              <div key={prodiName} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="truncate max-w-[200px]">{prodiName}</span>
                  <span className={`${isS2 ? 'text-secondary' : 'text-primary'} font-bold`}>
                    {typeof gpaVal === 'number' ? gpaVal.toFixed(2) : gpaVal}
                  </span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`${isS2 ? 'bg-secondary' : 'bg-primary'} h-1.5 rounded-full`}
                    style={{ width: `${barPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-between text-[11px] text-outline mt-4 pt-2 border-t border-surface-container-high">
        <span>{gpaList.length} Program Studi Terakreditasi</span>
        <span className="text-primary font-semibold group-hover:underline flex items-center gap-0.5">
          Lihat Tren <span className="material-symbols-outlined text-[12px]">open_in_new</span>
        </span>
      </div>
    </div>
  );
};

export default GraduateGpaProdiCard;
