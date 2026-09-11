export const NavbarUserProfile = ({
  isProfileOpen,
  setIsProfileOpen,
  profileWrapperRef,
  onOpen,
}) => {
  return (
    <div className="relative" id="profile-wrapper" ref={profileWrapperRef}>
      <button
        className="flex items-center gap-3 pl-3 border-l border-surface-container-high cursor-pointer hover:opacity-90 transition-opacity bg-transparent p-0 border-t-0 border-r-0 border-b-0 text-left"
        id="user-profile-btn"
        type="button"
        onClick={onOpen}
      >
        <div className="w-8 h-8 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center ring-2 ring-primary/20 shadow-sm">
          HS
        </div>
        <div className="flex flex-col text-left">
          <span className="font-label-md text-label-md text-on-surface leading-tight font-semibold">
            Dr. Ir. Hendra S., M.Sc.
          </span>
          <span className="text-[11px] text-on-surface-variant leading-none mt-0.5">
            Academic Directorate
          </span>
        </div>
        <span className="material-symbols-outlined text-outline text-base">expand_more</span>
      </button>

      {isProfileOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-64 z-50 bg-white rounded-xl shadow-xl border border-surface-container-high overflow-hidden animate-in fade-in slide-in-from-top-2"
          id="user-profile-dropdown"
        >
          <div className="p-3.5 bg-surface-container-low border-b border-surface-container-high">
            <div className="font-semibold text-xs text-on-surface leading-snug">
              Dr. Ir. Hendra S., M.Sc.
            </div>
            <div className="text-[11px] text-on-surface-variant leading-tight truncate mt-0.5">
              hendra.soelistyo@i3l.ac.id
            </div>
          </div>
          <div className="p-1.5 space-y-0.5">
            <a
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container-low hover:text-primary transition-colors"
              href="#/settings"
              onClick={() => setIsProfileOpen(false)}
            >
              <span className="material-symbols-outlined text-[18px] text-outline">
                manage_accounts
              </span>
              <span>Management Akun</span>
            </a>
          </div>
          <div className="p-1.5 border-t border-surface-container-high">
            <button
              type="button"
              className="flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-error hover:bg-error-container/40 transition-colors text-left cursor-pointer"
              onClick={() => setIsProfileOpen(false)}
            >
              <span className="material-symbols-outlined text-[18px] text-error">logout</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarUserProfile;
