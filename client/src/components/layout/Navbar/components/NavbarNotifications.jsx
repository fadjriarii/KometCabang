export const NavbarNotifications = ({
  isNotificationOpen,
  setIsNotificationOpen,
  notificationWrapperRef,
  onOpen,
}) => {
  return (
    <div className="relative" id="notification-wrapper" ref={notificationWrapperRef}>
      <button
        aria-label="Notifications"
        className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors flex items-center justify-center cursor-pointer"
        id="notification-bell-btn"
        type="button"
        onClick={onOpen}
      >
        <span className="material-symbols-outlined text-[20px]">notifications</span>
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest" />
      </button>

      {isNotificationOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-96 z-50 bg-white rounded-2xl shadow-2xl border border-surface-container-high overflow-hidden animate-in fade-in slide-in-from-top-2"
          id="notification-dropdown"
        >
          <div className="p-4 bg-surface-container-lowest border-b border-surface-container-high flex items-start justify-between gap-2">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h4 className="font-headline-sm text-sm font-bold text-on-surface">
                  Riwayat Sinkronisasi
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                  3 Log Baru
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-0.5 leading-tight">
                Catatan sinkronisasi data Sevima & PDDIKTI
              </p>
            </div>
            <button
              className="text-[11px] font-semibold text-primary hover:text-primary-container transition-colors cursor-pointer"
              type="button"
              onClick={() => setIsNotificationOpen(false)}
            >
              Tandai Dibaca
            </button>
          </div>

          <div className="max-h-[340px] overflow-y-auto divide-y divide-surface-container-high/60">
            <div className="p-3.5 hover:bg-surface-container-low transition-colors flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-xs text-on-surface">
                  Sinkronisasi Sevima Feeder Berhasil
                </span>
                <p className="text-[11px] text-on-surface-variant mt-1 leading-snug">
                  Sinkronisasi 4,218 data mahasiswa & status registrasi Semester Ganjil 2025/2026.
                </p>
                <div className="flex flex-col gap-0.5 mt-1.5 text-[10px] text-outline">
                  <span className="font-medium text-slate-700">
                    Oleh: Dr. Ir. Hendra S., M.Sc. (Academic Directorate)
                  </span>
                  <span>Hari ini, 10:42 WIB</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 hover:bg-surface-container-low transition-colors flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-fixed/50 flex items-center justify-center text-primary shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">sync</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-xs text-on-surface">
                  Sinkronisasi Data Kelulusan (PDDIKTI)
                </span>
                <p className="text-[11px] text-on-surface-variant mt-1 leading-snug">
                  Pembaruan 892 data kelulusan & yudisium cohort 2020-2024.
                </p>
                <div className="flex flex-col gap-0.5 mt-1.5 text-[10px] text-outline">
                  <span className="font-medium text-slate-700">
                    Oleh: BAAK System Scheduler (Auto-Sync)
                  </span>
                  <span>Kemarin, 23:15 WIB</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 hover:bg-surface-container-low transition-colors flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-tertiary shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">published_with_changes</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-xs text-on-surface">
                  Sinkronisasi Data MBKM & Mitra
                </span>
                <p className="text-[11px] text-on-surface-variant mt-1 leading-snug">
                  386 data konversi SKS & laporan magang/pertukaran pelajar.
                </p>
                <div className="flex flex-col gap-0.5 mt-1.5 text-[10px] text-outline">
                  <span className="font-medium text-slate-700">
                    Oleh: Sari Wulandari, S.Kom. (Subbag Akademik)
                  </span>
                  <span>28 Agu 2025, 14:20 WIB</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between text-xs">
            <span className="font-semibold text-primary hover:text-primary-container transition-colors inline-flex items-center gap-1 cursor-pointer">
              Lihat Semua Audit Log
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </span>
            <button
              className="px-2.5 py-1 rounded-md text-outline hover:bg-surface-container-high text-xs font-semibold transition-colors cursor-pointer"
              id="notification-close-btn"
              type="button"
              onClick={() => setIsNotificationOpen(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarNotifications;
