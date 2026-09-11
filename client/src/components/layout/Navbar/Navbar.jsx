import { useEffect, useRef, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDashboardStore } from '@/store/useDashboardStore';
import { NavbarBreadcrumb } from './components/NavbarBreadcrumb';
import { NavbarSyncPopover } from './components/NavbarSyncPopover';
import { NavbarNotifications } from './components/NavbarNotifications';
import { NavbarUserProfile } from './components/NavbarUserProfile';

export const Navbar = () => {
  const isSidebarOpen = useDashboardStore((state) => state.isSidebarOpen);
  const toggleSidebar = useDashboardStore((state) => state.toggleSidebar);
  const location = useLocation();

  const currentBreadcrumb = useMemo(() => {
    const path = location.pathname;
    if (path === '/student-data') {
      return { section: 'Student', page: 'Student Data', path: '/student-data' };
    }
    if (path === '/graduate-data') {
      return { section: 'Student', page: 'Graduate Data', path: '/graduate-data' };
    }
    if (path === '/mbkm-data') {
      return { section: 'Student', page: 'MBKM Data', path: '/mbkm-data' };
    }
    if (path === '/settings') {
      return { section: 'System', page: 'Settings', path: '/settings' };
    }
    return { section: 'Student', page: 'Dashboard', path: '/' };
  }, [location.pathname]);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const syncWrapperRef = useRef(null);
  const notificationWrapperRef = useRef(null);
  const profileWrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationWrapperRef.current && !notificationWrapperRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (profileWrapperRef.current && !profileWrapperRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-surface-container-lowest border-b border-surface-container-high px-8 h-16 flex items-center justify-between shadow-sm transition-all duration-300">
      <NavbarBreadcrumb
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        currentBreadcrumb={currentBreadcrumb}
      />

      <div className="flex items-center gap-3 relative">
        <NavbarSyncPopover syncWrapperRef={syncWrapperRef} />
        <NavbarNotifications
          isNotificationOpen={isNotificationOpen}
          setIsNotificationOpen={setIsNotificationOpen}
          notificationWrapperRef={notificationWrapperRef}
          onOpen={() => {
            setIsNotificationOpen((prev) => !prev);
            setIsProfileOpen(false);
          }}
        />
        <NavbarUserProfile
          isProfileOpen={isProfileOpen}
          setIsProfileOpen={setIsProfileOpen}
          profileWrapperRef={profileWrapperRef}
          onOpen={() => {
            setIsProfileOpen((prev) => !prev);
            setIsNotificationOpen(false);
          }}
        />
      </div>
    </header>
  );
};

export default Navbar;
