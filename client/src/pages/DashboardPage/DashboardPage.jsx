import { useState } from 'react';
import { useApiData } from '@/hooks/useApiData';
import { apiClient } from '@/services/apiClient';
import { DashboardHeader } from './components/DashboardHeader';
import { ExecutiveTopCards } from './components/ExecutiveTopCards';
import { StudentOverviewSection } from './components/StudentOverviewSection';
import { GraduateOverviewSection } from './components/GraduateOverviewSection';
import { MbkmOverviewSection } from './components/MbkmOverviewSection';
import { InteractiveMetricModal } from '@/components/dashboard/InteractiveMetricModal/InteractiveMetricModal';

/**
 * Halaman Utama Dasbor Eksekutif KOMET.
 * Decoupled UI that delegates all calculation & aggregation to the backend.
 */
export const DashboardPage = () => {
  const [activeModalMetric, setActiveModalMetric] = useState(null);
  const [modalOriginRect, setModalOriginRect] = useState(null);

  const { data: summaryData, loading } = useApiData(apiClient.getExecutiveSummary, []);

  const handleOpenModal = (metricKey, originRect) => {
    setModalOriginRect(originRect);
    setActiveModalMetric(metricKey);
  };

  const topSummary = summaryData?.topSummary || {};
  const studentOverview = summaryData?.studentOverview || {};
  const graduateOverview = summaryData?.graduateOverview || {};
  const mbkmOverview = summaryData?.mbkmOverview || {};

  return (
    <div className="flex flex-col w-full gap-6 max-w-7xl mx-auto">
      {/* 1. Header */}
      <DashboardHeader />

      {/* 2. Top Summary KPI Cards */}
      <ExecutiveTopCards
        topSummary={topSummary}
        onOpenModal={handleOpenModal}
      />

      {/* 3. Student Overview Section */}
      <StudentOverviewSection
        studentOverview={studentOverview}
        onOpenModal={handleOpenModal}
      />

      {/* 4. Graduate Overview Section */}
      <GraduateOverviewSection
        graduateOverview={graduateOverview}
        onOpenModal={handleOpenModal}
      />

      {/* 5. MBKM Overview Section */}
      <MbkmOverviewSection
        mbkmOverview={mbkmOverview}
        onOpenModal={handleOpenModal}
      />

      {/* 6. Interactive Metric Modal */}
      <InteractiveMetricModal
        metricKey={activeModalMetric}
        originRect={modalOriginRect}
        onClose={() => {
          setActiveModalMetric(null);
          setModalOriginRect(null);
        }}
      />
    </div>
  );
};

export default DashboardPage;
