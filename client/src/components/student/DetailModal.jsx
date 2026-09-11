import { useEffect, useMemo, useState } from 'react';
import { useApiData } from '@/hooks/useApiData';
import { apiClient } from '@/services/apiClient';
import { ActiveStudentsView } from './views/ActiveStudentsView';
import { ForeignStudentsView } from './views/ForeignStudentsView';
import { IntakeTrendView } from './views/IntakeTrendView';
import { IntakeFluctuationView } from './views/IntakeFluctuationView';

export const DetailModal = ({
  isOpen,
  onClose,
  originRect,
  metricType = 'active-students',
}) => {
  const effectiveIsOpen = isOpen !== undefined ? Boolean(isOpen) : Boolean(metricType);
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { data: analytics } = useApiData(
    () => (effectiveIsOpen ? apiClient.getStudentAnalytics() : Promise.resolve(null)),
    [effectiveIsOpen]
  );

  useEffect(() => {
    if (effectiveIsOpen) {
      setIsMounted(true);
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setIsAnimating(true);
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    } else {
      setIsAnimating(false);
      setIsMounted(false);
    }
  }, [effectiveIsOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsMounted(false);
      if (onClose) onClose();
    }, 350);
  };

  const prodiData = analytics?.prodiData || [];
  const facultyData = analytics?.facultyData || [];
  const jenjangData = analytics?.jenjangData || [];
  const foreignTrendData = analytics?.foreignTrend || [];
  const intakeTrendData = analytics?.intakeTrend || [];
  
  const fluctuationData = useMemo(() => {
    const rawList = Array.isArray(analytics?.intakeFluctuation)
      ? analytics.intakeFluctuation
      : (analytics?.intakeFluctuation?.chartData || []);
    
    const validDeltas = rawList.filter(
      (item) => item.deltaPercentage !== null && item.deltaPercentage !== undefined
    );
    const sum = validDeltas.reduce((acc, item) => acc + item.deltaPercentage, 0);
    const avg = validDeltas.length > 0 ? sum / validDeltas.length : 0;
    
    const isPositive = avg >= 0;
    const finalAverage = `${isPositive ? '+' : ''}${avg.toFixed(1)}%`;
    const trendBadge = isPositive ? 'Tumbuh Positif' : 'Penurunan';

    return {
      isPositive,
      finalAverage,
      trendBadge,
      chartData: rawList,
    };
  }, [analytics?.intakeFluctuation]);

  const activeStudents = useMemo(() => new Array(analytics?.totalActive || 554).fill({}), [analytics?.totalActive]);

  const sortedForeignTableData = useMemo(() => {
    return [...foreignTrendData].sort((a, b) => Number(b.year) - Number(a.year));
  }, [foreignTrendData]);

  const sortedIntakeTableData = useMemo(() => {
    return [...intakeTrendData].sort((a, b) => Number(b.year) - Number(a.year));
  }, [intakeTrendData]);

  const sortedFluctuationTableData = useMemo(() => {
    return [...(fluctuationData.chartData || [])].sort((a, b) => Number(b.year) - Number(a.year));
  }, [fluctuationData.chartData]);

  if (!isMounted && !effectiveIsOpen) return null;

  const hasOrigin = Boolean(originRect && originRect.width && originRect.height);
  let transformStyle = 'translate(-50%, -50%) scale(1)';
  let originOpacity = 1;

  if (hasOrigin && !isAnimating) {
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    const cardCenterX = originRect.left + originRect.width / 2;
    const cardCenterY = originRect.top + originRect.height / 2;
    const deltaX = cardCenterX - viewportCenterX;
    const deltaY = cardCenterY - viewportCenterY;

    const targetModalWidth = Math.min(window.innerWidth * 0.94, 960);
    const targetModalHeight = Math.min(window.innerHeight * 0.92, 740);
    const scaleX = Math.max(0.2, originRect.width / targetModalWidth);
    const scaleY = Math.max(0.2, originRect.height / targetModalHeight);
    const scale = Math.min(scaleX, scaleY);

    transformStyle = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(${scale})`;
    originOpacity = 0;
  } else if (!hasOrigin && !isAnimating) {
    transformStyle = 'translate(-50%, -50%) scale(0.88)';
    originOpacity = 0;
  }

  const isForeignMetric = metricType === 'foreign-students';
  const isIntakeMetric = metricType === 'intake-students';
  const isFluctuationMetric = metricType === 'intake-fluctuation';

  let headerIcon = 'groups';
  let headerBadge = 'Student Body KPI';
  let headerTitle = 'Rincian Mahasiswa Aktif';
  let headerIconBg = 'bg-primary-fixed/50 text-primary';

  if (isForeignMetric) {
    headerIcon = 'public';
    headerBadge = 'International Cohort KPI';
    headerTitle = 'Persentase Mahasiswa Asing - Tren & Analisis';
    headerIconBg = 'bg-secondary-fixed/50 text-secondary';
  } else if (isIntakeMetric) {
    headerIcon = 'how_to_reg';
    headerBadge = 'Admissions & Intake KPI';
    headerTitle = 'Intake Mahasiswa Baru - Rincian Semester & Tren';
    headerIconBg = 'bg-amber-100 text-tertiary';
  } else if (isFluctuationMetric) {
    headerIcon = fluctuationData.isPositive ? 'trending_up' : 'trending_down';
    headerBadge = 'Fluctuation & Growth KPI';
    headerTitle = 'Grafik Fluktuasi Intake Mahasiswa Baru (5 Tahun)';
    headerIconBg = fluctuationData.isPositive
      ? 'bg-emerald-100 text-emerald-700'
      : 'bg-rose-100 text-rose-700';
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-0 transition-opacity duration-300 ease-out ${
        isAnimating
          ? 'bg-black/50 backdrop-blur-sm opacity-100'
          : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
      }`}
      id="student-detail-modal-backdrop"
      onClick={(e) => {
        if (e.target.id === 'student-detail-modal-backdrop') {
          handleClose();
        }
      }}
    >
      <div
        style={{
          transform: transformStyle,
          opacity: isAnimating ? 1 : originOpacity,
          transition: 'transform 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease-out',
        }}
        className="fixed top-1/2 left-1/2 w-[min(94vw,60rem)] max-h-[92vh] z-50 bg-surface-container-lowest shadow-2xl rounded-2xl border border-outline-variant/40 overflow-hidden flex flex-col will-change-transform"
        id="student-detail-modal-box"
      >
        <div className="p-5 border-b border-surface-container-high flex items-start justify-between bg-surface-container-low/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${headerIconBg}`}>
              <span className="material-symbols-outlined text-[24px]">{headerIcon}</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                  {headerBadge}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  {isIntakeMetric ? 'Semester Ganjil & Genap' : 'Status: Aktif Only'}
                </span>
              </div>
              <h3 className="font-headline-lg text-lg font-bold text-on-surface mt-0.5 truncate">
                {headerTitle}
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
          {isForeignMetric ? (
            <ForeignStudentsView
              foreignTrendData={foreignTrendData}
              sortedForeignTableData={sortedForeignTableData}
            />
          ) : isIntakeMetric ? (
            <IntakeTrendView
              intakeTrendData={intakeTrendData}
              sortedIntakeTableData={sortedIntakeTableData}
            />
          ) : isFluctuationMetric ? (
            <IntakeFluctuationView
              fluctuationData={fluctuationData}
              sortedFluctuationTableData={sortedFluctuationTableData}
            />
          ) : (
            <ActiveStudentsView
              activeStudents={activeStudents}
              prodiData={prodiData}
              facultyData={facultyData}
              jenjangData={jenjangData}
            />
          )}
        </div>

        <div className="p-4 border-t border-surface-container-high bg-surface-container-low/40 flex items-center justify-between text-xs shrink-0">
          <span className="text-[11px] text-outline">Sumber data: PDDIKTI & Sevima Feeder (Filter: Aktif)</span>
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

export default DetailModal;
