import { Link } from 'react-router-dom';

export const MbkmOverviewSection = ({ mbkmOverview = {}, onOpenModal }) => {
  const getOriginRect = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  };

  const pct = mbkmOverview.mbkmVsEligiblePct || '69.8%';
  const activeMbkm = mbkmOverview.activeMbkm || 74;
  const eligible = mbkmOverview.eligibleSem7 || 106;

  return (
    <div className="flex flex-col gap-3 pt-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧭</span>
          <h2 className="font-headline-lg text-headline-md font-bold text-on-surface">
            MBKM Overview
          </h2>
          <span className="text-xs text-outline font-normal">
            (Formula: MBKM / Eligible Sem 7 x 100% - MBKM Aktif, Selesai & Evaluasi)
          </span>
        </div>
        <Link
          className="font-label-md text-label-md text-primary hover:text-primary-container inline-flex items-center gap-1 font-semibold transition-colors"
          to="/mbkm-data"
        >
          View MBKM Data <span className="material-symbols-outlined text-[16px]">handshake</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card: % MBKM vs Eligible */}
        <div
          className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-sm hover:border-primary hover:shadow-md transition-all cursor-pointer relative group flex flex-col justify-between"
          onClick={(e) => onOpenModal('mbkm_eligible_pct', getOriginRect(e))}
        >
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                  Formula 8.3.1 (IKU 2)
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">
                  Persentase MBKM vs Eligible
                </h3>
                <span className="text-[11px] text-outline font-medium">Semester 7 Aktif</span>
              </div>
              <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container-high"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="100, 100"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-primary transition-all duration-300"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={`${String(pct).replace('%', '')}, 100`}
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    pie_chart
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="font-metric-display text-3xl font-extrabold text-on-surface">
                  {pct}
                </span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  IKU Memenuhi
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">
                <strong>{activeMbkm}</strong> mahasiswa MBKM dari total{' '}
                <strong>{eligible}</strong> eligible semester 7 (≥ 80 SKS).
              </p>
              <div className="w-full bg-surface-container-high rounded-full h-2 mt-3 overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${Math.min(parseFloat(pct) || 0, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-outline mt-3 pt-2 border-t border-surface-container-high">
            <span>MBKM / Eligible Sem 7 x 100%</span>
            <span className="text-primary font-semibold group-hover:underline flex items-center gap-0.5">
              Lihat Tren <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </span>
          </div>
        </div>

        {/* Card: Total MBKM Aktif */}
        <div
          className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-sm hover:border-primary hover:shadow-md transition-all cursor-pointer relative group flex flex-col justify-between"
          onClick={(e) => onOpenModal('total_mbkm', getOriginRect(e))}
        >
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                  Aktivitas MBKM
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">
                  Total MBKM Aktif
                </h3>
                <span className="text-[11px] text-outline font-medium">Status Selesai & Evaluasi</span>
              </div>
              <div className="p-2 rounded-lg bg-surface-container text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="font-metric-display text-3xl font-extrabold text-on-surface">
                  {activeMbkm}
                </span>
                <span className="text-xs text-on-surface-variant font-medium">peserta aktif</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">
                Magang Industri: 36 • Pertukaran: 18 • Studi Independen: 14 • Riset/Kemanusiaan: 6
              </p>
              <div className="w-full bg-surface-container-high rounded-full h-2 mt-3 overflow-hidden">
                <div
                  className="bg-secondary h-2 rounded-full"
                  style={{ width: `${Math.min(activeMbkm, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-outline mt-3 pt-2 border-t border-surface-container-high">
            <span>Magang, Riset, Studi, Proyek</span>
            <span className="text-primary font-semibold group-hover:underline flex items-center gap-0.5">
              Lihat Tren <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </span>
          </div>
        </div>

        {/* Card: Total Mahasiswa Eligible */}
        <div
          className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-sm hover:border-primary hover:shadow-md transition-all cursor-pointer relative group flex flex-col justify-between"
          onClick={(e) => onOpenModal('eligible_sem7', getOriginRect(e))}
        >
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                  Kohor Semester 7
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">
                  Total Mahasiswa Eligible
                </h3>
                <span className="text-[11px] text-outline font-medium">Semester 7 Aktif</span>
              </div>
              <div className="p-2 rounded-lg bg-amber-100 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">checklist</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="font-metric-display text-3xl font-extrabold text-on-surface">
                  {eligible}
                </span>
                <span className="text-xs text-on-surface-variant font-medium">mahasiswa</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">
                Syarat terverifikasi telah menyelesaikan beban akademik institusi ≥ 80 SKS.
              </p>
              <div className="w-full bg-surface-container-high rounded-full h-2 mt-3 overflow-hidden">
                <div className="bg-tertiary-fixed-dim h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-outline mt-3 pt-2 border-t border-surface-container-high">
            <span>Eligible: Beban Studi ≥ 80 SKS</span>
            <span className="text-primary font-semibold group-hover:underline flex items-center gap-0.5">
              Lihat Tren <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MbkmOverviewSection;
