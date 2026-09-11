import { Link } from 'react-router-dom';
import navbarLogo from '@/assets/navbarLogo.png';

export const NavbarBreadcrumb = ({ isSidebarOpen, toggleSidebar, currentBreadcrumb }) => {
  return (
    <div className="flex items-center gap-4 min-w-0">
      {!isSidebarOpen && (
        <div
          className="transition-opacity duration-300 flex items-center shrink-0 opacity-100"
          id="navbar-brand-logo"
        >
          <button
            type="button"
            onClick={toggleSidebar}
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
            title="Open Sidebar"
          >
            <img
              alt="KOMET Logo"
              className="h-10 md:h-11 w-auto object-contain block"
              src={navbarLogo}
            />
          </button>
          <div className="h-6 w-px bg-slate-300 ml-4 hidden sm:block" />
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
        <Link to="/" className="hover:text-primary transition-colors cursor-pointer">
          {currentBreadcrumb.section}
        </Link>
        <span className="material-symbols-outlined text-[14px] text-outline select-none">chevron_right</span>
        <span className="text-on-surface font-semibold">
          {currentBreadcrumb.page}
        </span>
      </div>
    </div>
  );
};

export default NavbarBreadcrumb;
