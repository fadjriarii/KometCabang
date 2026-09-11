import { useCallback, useEffect, useRef, useState } from 'react';

export const useSidebarDrag = (isSidebarOpen, setSidebarOpen) => {
  const [isDragging, setIsDragging] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const isDraggingRef = useRef(false);
  const currentWidthRef = useRef(256);

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarWidth(256);
      currentWidthRef.current = 256;
    } else {
      setSidebarWidth(0);
      currentWidthRef.current = 0;
    }
  }, [isSidebarOpen]);

  const handleDragStart = useCallback((e) => {
    e.preventDefault();
    if (e.button !== 0) return;

    isDraggingRef.current = true;
    setIsDragging(true);
    currentWidthRef.current = 256;

    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';

    const handleMouseMove = (moveEvent) => {
      if (!isDraggingRef.current) return;
      const newWidth = Math.max(0, Math.min(256, moveEvent.clientX));
      currentWidthRef.current = newWidth;
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);

      document.body.style.userSelect = '';
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      if (currentWidthRef.current < 120) {
        setSidebarOpen(false);
        setSidebarWidth(0);
        currentWidthRef.current = 0;
      } else {
        setSidebarOpen(true);
        setSidebarWidth(256);
        currentWidthRef.current = 256;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [setSidebarOpen]);

  useEffect(() => {
    return () => {
      isDraggingRef.current = false;
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, []);

  const translateXOffset = isSidebarOpen ? sidebarWidth - 256 : -256;

  return {
    isDragging,
    sidebarWidth,
    translateXOffset,
    handleDragStart,
  };
};

export default useSidebarDrag;
