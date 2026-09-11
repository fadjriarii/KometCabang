import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/student-data', label: 'Student Data', icon: 'groups' },
  { to: '/graduate-data', label: 'Graduate Data', icon: 'school' },
  { to: '/mbkm-data', label: 'MBKM Data', icon: 'handshake' },
];

export const SidebarNavLinks = () => {
  const [isStudentNavExpanded, setIsStudentNavExpanded] = useState(true);

  return (
    <div className="flex flex-col min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
      <nav className="flex-1 px-3 pt-2 pb-4 space-y-2 overflow-x-hidden">
        <button
          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-surface-container-high/60 transition-colors cursor-pointer select-none text-left group overflow-hidden"
          id="student-nav-toggle"
          type="button"
          onClick={() => setIsStudentNavExpanded((prev) => !prev)}
        >
          <span className="text-[11px] font-semibold text-on-surface-variant tracking-wider uppercase group-hover:text-on-surface transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
            Student Navigation
          </span>
          <span
            className={`material-symbols-outlined text-[18px] text-on-surface-variant shrink-0 transition-transform duration-300 ease-in-out ${
              isStudentNavExpanded ? 'rotate-180' : 'rotate-0'
            }`}
            id="student-nav-chevron"
          >
            expand_more
          </span>
        </button>

        <div
          className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out pl-3 ${
            isStudentNavExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          id="student-nav-links"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-2.5 py-2 rounded-lg font-medium transition-colors text-sm overflow-hidden ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px] shrink-0">{item.icon}</span>
              <span className="font-label-md text-label-md whitespace-nowrap overflow-hidden text-ellipsis">
                {item.label}
              </span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SidebarNavLinks;
