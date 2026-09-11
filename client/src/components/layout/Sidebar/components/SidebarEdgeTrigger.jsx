import { useCallback, useState } from 'react';

export const SidebarEdgeTrigger = ({ isSidebarOpen, setSidebarOpen }) => {
  const [mouseY, setMouseY] = useState(152);
  const [isHoveringEdge, setIsHoveringEdge] = useState(false);

  const handleEdgeMouseMove = useCallback((e) => {
    setMouseY(e.clientY);
  }, []);

  if (isSidebarOpen) return null;

  return (
    <div
      className="fixed top-16 left-0 w-8 h-[calc(100vh-64px)] z-50 group pointer-events-auto cursor-pointer"
      id="sidebar-hover-zone"
      onMouseEnter={() => setIsHoveringEdge(true)}
      onMouseLeave={() => setIsHoveringEdge(false)}
      onMouseMove={handleEdgeMouseMove}
    >
      <button
        aria-label="Open Sidebar"
        className={`group/btn fixed left-0 z-50 flex items-center justify-center rounded-r-full rounded-l-none pl-2 pr-3.5 py-3 shadow-xl bg-primary text-white hover:bg-primary-container cursor-pointer transition-transform duration-75 ease-out border border-l-0 border-primary-fixed/30 focus:outline-none ${
          isHoveringEdge
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
        id="sidebar-floating-expand-btn"
        style={{
          top: `${Math.max(80, Math.min(window.innerHeight - 60, mouseY))}px`,
          transform: 'translateY(-50%)',
        }}
        title="Open Sidebar"
        type="button"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="material-symbols-outlined text-[18px] shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5">
          chevron_right
        </span>
        <span className="text-xs font-semibold whitespace-nowrap overflow-hidden transition-all duration-200 max-w-0 group-hover/btn:max-w-xs group-hover/btn:ml-1.5 opacity-0 group-hover/btn:opacity-100">
          Open Sidebar
        </span>
      </button>
    </div>
  );
};

export default SidebarEdgeTrigger;
