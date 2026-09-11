import { useEffect, useMemo, useState } from 'react';
import { useApiData } from '@/hooks/useApiData';
import { apiClient } from '@/services/apiClient';
import { TotalGraduatesView } from './views/TotalGraduatesView';
import { GpaOverviewView } from './views/GpaOverviewView';
import { OnTimeGraduationView } from './views/OnTimeGraduationView';
import { StudySuccessView } from './views/StudySuccessView';

export const GraduateDetailModal = ({ isOpen = true, type, metricType, originRect, onClose }) => {
  const currentMetricType = type || metricType || 'total-graduates';
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { data: analytics } = useApiData(
    () => (isOpen ? apiClient.getGraduateAnalytics() : Promise.resolve(null)),
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

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsMounted(false);
      if (onClose) onClose();
    }, 280);
  };

  const prodiGpaData = analytics?.prodiGpaData || [];
  const facultyGpaData = analytics?.facultyGpaData || [];
  const gpaBandsData = analytics?.gpaBandsData || [];
  const yearTrendData = analytics?.yearTrendData || [];
  const predikatData = analytics?.predikatData || [];
  const s1Gpa = analytics?.s1Gpa || 3.52;
  const s2Gpa = analytics?.s2Gpa || 3.76;
  const onTimeRateS1 = analytics?.onTimeRateS1 || '82.4%';
  const onTimeRateS2 = analytics?.onTimeRateS2 || '88.5%';
  const studySuccessRateS1 = analytics?.studySuccessRateS1 || '91.2%';
  const studySuccessRateS2 = analytics?.studySuccessRateS2 || '94.0%';
  const onTimeCohortData = analytics?.onTimeCohortData || [];
  const onTimeCohortDataS2 = analytics?.onTimeCohortDataS2 || [];
  const successCohortData = analytics?.successCohortData || [];
  const successCohortDataS2 = analytics?.successCohortDataS2 || [];
  const onTimeChartData = analytics?.onTimeChartData || [];
  const onTimeChartDataS2 = analytics?.onTimeChartDataS2 || [];
  const successChartData = analytics?.successChartData || [];
  const successChartDataS2 = analytics?.successChartDataS2 || [];

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
      case 'total-graduates':
        return {
          title: 'Total Lulusan & Tren Tahunan (PDDIKTI)',
          badge: 'Graduate Body Registry',
          icon: 'school',
          iconBg: 'bg-primary-fixed/60 text-primary',
        };
      case 'gpa-overview':
        return {
          title: 'Analitik & Distribusi IPK Lulusan',
          badge: 'Academic GPA Performance',
          icon: 'grade',
          iconBg: 'bg-teal-50 text-teal-700',
        };
      case 'on-time-graduation':
        return {
          title: 'Analitik Kelulusan Tepat Waktu per Angkatan',
          badge: 'On-Time Graduation KPI',
          icon: 'timer',
          iconBg: 'bg-amber-100 text-amber-900',
        };
      case 'study-success':
        return {
          title: 'Analitik Keberhasilan Studi per Angkatan',
          badge: 'Study Success Rate KPI',
          icon: 'verified_user',
          iconBg: 'bg-emerald-50 text-emerald-700',
        };
      default:
        return {
          title: 'Rincian Data Lulusan',
          badge: 'Graduate Analytics',
          icon: 'school',
          iconBg: 'bg-primary-fixed/60 text-primary',
        };
    }
  }, [currentMetricType]);

  if (!isMounted && !isOpen) return null;

  return (
    <div
      id="graduate-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
      style={{ opacity: isAnimating ? 1 : 0 }}
      onClick={(e) => {
        if (e.target.id === 'graduate-detail-modal-backdrop') handleClose();
      }}
    >
      <div
        style={{
          transform: transformStyle,
          opacity: isAnimating ? 1 : 0,
          transition: 'transform 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease-out',
        }}
        className="fixed top-1/2 left-1/2 w-[min(94vw,64rem)] max-h-[90vh] z-50 bg-surface-container-lowest shadow-2xl rounded-2xl border border-outline-variant/40 overflow-hidden flex flex-col will-change-transform"
        id="graduate-detail-modal-box"
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
                  Data Terverifikasi PDDIKTI
                </span>
              </div>
              <h3 className="font-headline-lg text-lg font-bold text-on-surface mt-0.5">
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
          {currentMetricType === 'total-graduates' && (
            <TotalGraduatesView
              totalCount={analytics?.totalGraduates || 196}
              yearTrendData={yearTrendData}
              predikatData={predikatData}
            />
          )}

          {currentMetricType === 'gpa-overview' && (
            <GpaOverviewView
              s1Gpa={s1Gpa}
              s2Gpa={s2Gpa}
              prodiGpaData={prodiGpaData}
              facultyGpaData={facultyGpaData}
              gpaBandsData={gpaBandsData}
            />
          )}

          {currentMetricType === 'on-time-graduation' && (
            <OnTimeGraduationView
              onTimeRateS1={onTimeRateS1}
              onTimeRateS2={onTimeRateS2}
              onTimeCohortData={onTimeCohortData}
              onTimeCohortDataS2={onTimeCohortDataS2}
              onTimeChartData={onTimeChartData}
              onTimeChartDataS2={onTimeChartDataS2}
            />
          )}

          {currentMetricType === 'study-success' && (
            <StudySuccessView
              studySuccessRateS1={studySuccessRateS1}
              studySuccessRateS2={studySuccessRateS2}
              successCohortData={successCohortData}
              successCohortDataS2={successCohortDataS2}
              successChartData={successChartData}
              successChartDataS2={successChartDataS2}
            />
          )}
        </div>

        <div className="p-4 border-t border-surface-container-high bg-surface-container-low/40 flex items-center justify-between text-xs shrink-0">
          <span className="text-[11px] text-outline">Sumber data: PDDIKTI & Sevima Feeder</span>
          <button
            className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-lg font-semibold transition-colors cursor-pointer"
            type="button"
            onClick={handleClose}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default GraduateDetailModal;
