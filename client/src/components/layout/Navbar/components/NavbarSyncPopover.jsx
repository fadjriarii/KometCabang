import { useState } from 'react';

export const NavbarSyncPopover = ({ syncWrapperRef }) => {
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  const [syncProgress, setSyncProgress] = useState(100);
  const [syncStatusText, setSyncStatusText] = useState('Sinkronisasi Berhasil!');
  const [syncDetailText, setSyncDetailText] = useState('Data KOMET terbarui dengan PDDIKTI & Sevima.');

  const handleTriggerSync = () => {
    if (isSyncing) {
      setIsSyncModalOpen((prev) => !prev);
      return;
    }

    setIsSyncing(true);
    setIsSynced(false);
    setIsSyncModalOpen(true);
    setSyncProgress(0);
    setSyncStatusText('Menyinkronkan data Sevima API...');
    setSyncDetailText('Mengambil data mahasiswa & PDDIKTI...');

    let current = 0;
    const interval = setInterval(() => {
      current += 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setSyncProgress(100);
        setIsSyncing(false);
        setIsSynced(true);
        setSyncStatusText('Sinkronisasi Berhasil!');
        setSyncDetailText('Data KOMET terbarui dengan PDDIKTI & Sevima.');
        setTimeout(() => setIsSynced(false), 4500);
      } else {
        setSyncProgress(current);
        if (current > 35 && current <= 70) {
          setSyncStatusText('Memproses konversi data MBKM & IKU...');
          setSyncDetailText('Sinkronisasi 386 catatan peserta & registrasi...');
        } else if (current > 70) {
          setSyncStatusText('Memvalidasi kelulusan & IPK alumni...');
          setSyncDetailText('Memperbarui metrik mutu akademik S1 & S2...');
        }
      }
    }, 50);
  };

  return (
    <div className="relative" id="sync-wrapper" ref={syncWrapperRef}>
      <button
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition shadow-sm cursor-pointer ${
          isSynced
            ? 'border-emerald-300 text-emerald-700 bg-emerald-50'
            : isSyncing
            ? 'border-primary text-primary bg-primary-fixed/20'
            : 'border-surface-container-high bg-white hover:bg-surface-container-low text-slate-700 hover:border-primary/40 active:scale-95'
        }`}
        id="sevima-sync-btn"
        type="button"
        onClick={handleTriggerSync}
      >
        {isSyncing ? (
          <div className="relative w-4 h-4 flex items-center justify-center">
            <svg className="w-4 h-4 -rotate-90" viewBox="0 0 24 24">
              <circle
                className="text-surface-container-high"
                cx="12"
                cy="12"
                fill="none"
                r="9"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <circle
                className="text-primary transition-all duration-150 ease-out"
                cx="12"
                cy="12"
                fill="none"
                r="9"
                stroke="currentColor"
                strokeDasharray="56.54"
                strokeDashoffset={56.54 - 56.54 * (syncProgress / 100)}
                strokeLinecap="round"
                strokeWidth="2.5"
              />
            </svg>
          </div>
        ) : (
          <span
            className={`material-symbols-outlined text-[16px] ${
              isSynced ? 'text-emerald-600' : 'text-primary'
            }`}
            id="sevima-btn-icon"
          >
            {isSynced ? 'check_circle' : 'sync'}
          </span>
        )}
        <span id="sevima-btn-label">
          {isSyncing ? 'Syncing...' : isSynced ? 'Tersinkron' : 'Sync Sevima'}
        </span>
      </button>

      {isSyncModalOpen && (
        <div
          className="absolute top-12 left-0 z-50 w-80 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-xl flex flex-col gap-3 transition-all duration-300 animate-in fade-in slide-in-from-top-2"
          id="sevima-sync-modal"
        >
          <div className="flex items-center justify-between border-b border-surface-container-high pb-2.5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                API Integration
              </span>
              <h4 className="font-headline-sm text-xs font-bold text-on-surface">
                Sevima Cloud Sync
              </h4>
            </div>
            <button
              className="text-outline hover:text-on-surface text-sm p-1 rounded-md hover:bg-surface-container transition-colors cursor-pointer"
              id="sevima-close-modal"
              type="button"
              onClick={() => setIsSyncModalOpen(false)}
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>

          <div className="flex items-center gap-4 py-1.5">
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-surface-container-high"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="100, 100"
                  strokeWidth="3.2"
                />
                <path
                  className={
                    syncProgress >= 100
                      ? 'text-emerald-500 transition-all duration-300'
                      : 'text-primary transition-all duration-100 ease-out'
                  }
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  id="sevima-modal-progress"
                  stroke="currentColor"
                  strokeDasharray={`${syncProgress.toFixed(1)}, 100`}
                  strokeLinecap="round"
                  strokeWidth="3.2"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-headline-sm text-xs font-extrabold text-on-surface" id="sevima-modal-pct">
                  {Math.round(syncProgress)}%
                </span>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <span
                className={`text-xs font-semibold leading-snug ${
                  syncProgress >= 100 ? 'text-emerald-600' : 'text-on-surface'
                }`}
                id="sevima-modal-status"
              >
                {syncStatusText}
              </span>
              <span className="text-[11px] text-on-surface-variant mt-0.5 leading-tight" id="sevima-modal-detail">
                {syncDetailText}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-outline pt-2 border-t border-surface-container-high">
            <span>Endpoint: api.sevima.i3l.ac.id</span>
            <span className="font-semibold text-primary flex items-center gap-1" id="sevima-sync-state">
              {syncProgress >= 100 ? (
                <>
                  <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                  <span className="text-emerald-600 font-semibold">Tersinkronisasi</span>
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  <span className="text-primary font-semibold">Live Sync</span>
                </>
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarSyncPopover;
