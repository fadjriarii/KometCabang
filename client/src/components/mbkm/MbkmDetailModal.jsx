import { useEffect, useMemo, useState } from 'react';
import { useApiData } from '@/hooks/useApiData';
import { apiClient } from '@/services/apiClient';
import { MbkmRateView } from './views/MbkmRateView';
import { MbkmActiveActivitiesView } from './views/MbkmActiveActivitiesView';
import { MbkmEligibleStudentsView } from './views/MbkmEligibleStudentsView';
import { MbkmPartnersView } from './views/MbkmPartnersView';

export const MbkmDetailModal = ({
  isOpen = true,
  type,
  metricType,
  originRect,
  onClose,
}) => {
  const currentMetricType = type || metricType || 'rate-mbkm';
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { data: analytics } = useApiData(
    () => (isOpen ? apiClient.getMbkmAnalytics() : Promise.resolve(null)),
    [isOpen]
  );

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      const raf = requestAnimationFrame(() => setIsAnimating(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setIsAnimating(false);
      setIsMounted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsMounted(false);
      if (onClose) onClose();
    }, 280);
  };

  const activityData = analytics?.activityData || [];
  const prodiData = analytics?.prodiData || [];
  const facultyData = analytics?.facultyData || [];
  const mitraData = analytics?.mitraData || [];
  const statusData = analytics?.statusData || [];
  const participantStats = analytics?.participantStats || { count: 52, totalRecords: 74, total: 74, active: 74 };
  const eligibleRate = analytics?.eligibleRate || { rate: '49.1%', activeMbkmCount: 52, eligibleCount: 106 };
  const eligibleCount = analytics?.eligibleRate?.eligibleCount || 106;

  const winWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const winHeight = typeof window !== 'undefined' ? window.innerHeight : 768;
  const originTop = originRect ? originRect.top + originRect.height / 2 : winHeight / 2;
  const originLeft = originRect ? originRect.left + originRect.width / 2 : winWidth / 2;
  const deltaX = originLeft - winWidth / 2;
  const deltaY = originTop - winHeight / 2;

  const transformStyle = isAnimating
    ? 'translate(-50%, -50%) scale(1)'
    : `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.2)`;

  const modalConfig = useMemo(() => {
    switch (currentMetricType) {
      case 'rate-mbkm':
        return {
          title: 'Analisis Partisipasi MBKM vs Mahasiswa Eligible',
          badge: 'MBKM KPI Performance',
          icon: 'percent',
          iconBg: 'bg-primary-fixed/60 text-primary',
        };
      case 'active-mbkm':
        return {
          title: 'Total Aktivitas MBKM Aktif (Selesai & Evaluasi)',
          badge: 'MBKM Conversion Registry',
          icon: 'handshake',
          iconBg: 'bg-teal-50 text-teal-700',
        };
      case 'eligible-students':
        return {
          title: 'Mahasiswa Eligible Program MBKM (Semester 7)',
          badge: 'Eligible Senior Cohort',
          icon: 'how_to_reg',
          iconBg: 'bg-amber-100 text-amber-900',
        };
      case 'mitra-mbkm':
        return {
          title: 'Jaringan Mitra Industri & Riset Kolaborasi MBKM',
          badge: 'Industry & Research Partnerships',
          icon: 'domain',
          iconBg: 'bg-purple-100 text-purple-700',
        };
      default:
        return {
          title: 'Rincian Data MBKM Kampus Merdeka',
          badge: 'MBKM Analytics',
          icon: 'handshake',
          iconBg: 'bg-primary-fixed/60 text-primary',
        };
    }
  }, [currentMetricType]);

  if (!isMounted && !isOpen) return null;

  return (
    <div
      id="mbkm-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
      style={{ opacity: isAnimating ? 1 : 0 }}
      onClick={(e) => {
        if (e.target.id === 'mbkm-detail-modal-backdrop') handleClose();
      }}
    >
      <div
        style={{
          transform: transformStyle,
          opacity: isAnimating ? 1 : 0,
          transition: 'transform 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease-out',
        }}
        className="fixed top-1/2 left-1/2 w-[min(94vw,62rem)] max-h-[92vh] z-50 bg-surface-container-lowest shadow-2xl rounded-2xl border border-outline-variant/40 overflow-hidden flex flex-col will-change-transform"
      >
        <div className="p-5 border-b border-surface-container-high flex items-start justify-between bg-surface-container-low/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${modalConfig.iconBg}`}>
              <span className="material-symbols-outlined text-[24px]">{modalConfig.icon}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                  {modalConfig.badge}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  Kampus Merdeka (NeoAcis)
                </span>
              </div>
              <h3 className="font-headline-lg text-lg font-bold text-on-surface mt-0.5 truncate">
                {modalConfig.title}
              </h3>
            </div>
          </div>
          <button
            className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer shrink-0"
            type="button"
            onClick={handleClose}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-surface-container-lowest">
          {currentMetricType === 'rate-mbkm' && (
            <MbkmRateView
              participantStats={participantStats}
              eligibleCount={eligibleCount}
              eligibleRate={eligibleRate}
              facultyData={facultyData}
            />
          )}

          {currentMetricType === 'active-mbkm' && (
            <MbkmActiveActivitiesView
              activityData={activityData}
              prodiData={prodiData}
              statusData={statusData}
            />
          )}

          {currentMetricType === 'eligible-students' && (
            <MbkmEligibleStudentsView
              eligibleCount={eligibleCount}
              prodiData={prodiData}
            />
          )}

          {currentMetricType === 'mitra-mbkm' && (
            <MbkmPartnersView
              mitraData={mitraData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MbkmDetailModal;
