export const ModalHeader = ({ data = {}, onClose }) => {
  return (
    <div className="p-5 border-b border-surface-container-high flex items-start justify-between bg-surface-container-low/40 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-fixed/50 flex items-center justify-center text-primary shrink-0">
          <span className="material-symbols-outlined text-[24px]">{data.icon || 'analytics'}</span>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
              {data.badge || 'KPI'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">
              Terverifikasi
            </span>
          </div>
          <h3 className="font-headline-lg text-lg font-bold text-on-surface mt-0.5 truncate">
            {data.title || 'Metrik Detail'}
          </h3>
        </div>
      </div>
      <button
        className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer shrink-0"
        type="button"
        onClick={onClose}
      >
        <span className="material-symbols-outlined text-[20px]">close</span>
      </button>
    </div>
  );
};

export default ModalHeader;
