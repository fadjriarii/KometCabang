export const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-surface-container-high">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
            Dashboard
          </h1>
          <span className="px-2 py-0.5 rounded-full bg-primary-fixed/50 text-primary font-bold text-[11px]">
            Live Sevima Sync
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant max-w-3xl">
          Sistem pemantauan longitudinal KPI institusi, analitik kohor, dan evaluasi capaian IKU
          Kemendikbudristek berbasis data Sevima Feeder terverifikasi.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-lg font-label-md text-label-md shadow-sm transition-colors cursor-pointer"
          onClick={() => alert('Mengekspor ringkasan eksekutif KPI & audit longitudinal ke PDF/Excel...')}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">file_download</span>
          <span>Export Summary Report</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
