import { NavLink } from 'react-router-dom';
import { useDashboardStore } from '@/store/useDashboardStore';
import sidebarLogo from '@/assets/sidebarLogo.png';
import { SidebarEdgeTrigger } from './components/SidebarEdgeTrigger';
import { SidebarNavLinks } from './components/SidebarNavLinks';
import { useSidebarDrag } from './hooks/useSidebarDrag';

export const Sidebar = () => {
  const isSidebarOpen = useDashboardStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useDashboardStore((state) => state.setSidebarOpen);

  const { isDragging, sidebarWidth, translateXOffset, handleDragStart } = useSidebarDrag(
    isSidebarOpen,
    setSidebarOpen
  );

  return (
    <>
      <SidebarEdgeTrigger isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      <aside
        className={`sticky top-0 h-screen shrink-0 relative select-none overflow-hidden z-40 ${
          isDragging ? 'transition-none' : 'transition-all duration-300 ease-in-out'
        } ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'w-0 opacity-0 pointer-events-none'}`}
        style={{ width: isSidebarOpen ? `${sidebarWidth}px` : '0px' }}
        id="app-sidebar"
      >
        <div
          className={`w-64 h-full bg-white border-r border-surface-container-high flex flex-col justify-between absolute top-0 left-0 ${
            isDragging ? 'transition-none' : 'transition-transform duration-300 ease-in-out'
          }`}
          style={{ transform: `translateX(${translateXOffset}px)` }}
          id="app-sidebar-body"
        >
          {isSidebarOpen && (
            <div
              aria-label="Drag to resize or close sidebar"
              className="absolute right-0 top-0 w-2.5 h-full cursor-col-resize hover:bg-primary/40 active:bg-primary/60 transition-colors z-50 select-none"
              id="sidebar-drag-handle"
              title="Tarik ke kiri untuk menutup sidebar"
              onMouseDown={handleDragStart}
            />
          )}

          <div className="flex flex-col min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
            <div
              className="h-16 px-2 border-b border-surface-container-high flex items-center justify-center shrink-0 overflow-hidden"
              id="sidebar-logo-container"
            >
              <div className="w-full h-full flex items-center justify-center overflow-hidden p-0.5">
                <img
                  alt="i3L KOMET Logo"
                  className="h-full w-auto max-w-full object-contain block shrink-0"
                  id="sidebar-logo-img"
                  src={sidebarLogo}
                />
              </div>
            </div>

            <SidebarNavLinks />
          </div>

          <div className="flex flex-col gap-space-2xs p-3 border-t border-surface-container-high shrink-0 bg-white overflow-hidden">
            <nav className="flex flex-col gap-1 overflow-hidden">
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-2.5 py-2 rounded-lg font-medium transition-colors text-sm overflow-hidden ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`
                }
              >
                <span className="material-symbols-outlined text-[20px] shrink-0">settings</span>
                <span className="font-label-md text-label-md whitespace-nowrap overflow-hidden text-ellipsis">
                  Settings
                </span>
              </NavLink>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
