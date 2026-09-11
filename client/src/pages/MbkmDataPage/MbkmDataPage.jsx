import React, { useState } from 'react';
import { useApiData } from '@/hooks/useApiData';
import { apiClient } from '@/services/apiClient';
import { MbkmTable } from '@/components/mbkm/MbkmTable';
import { MbkmDetailModal } from '@/components/mbkm/MbkmDetailModal';
import { exportToCsv } from '@/lib/exportUtils';
import { useMbkmFilters } from './hooks/useMbkmFilters';
import { MbkmHeader } from './components/MbkmHeader';
import { MbkmMetricsRow } from './components/MbkmMetricsRow';
import { MbkmFilterBar } from './components/MbkmFilterBar';
import { MbkmFilterChips } from './components/MbkmFilterChips';

export const MbkmDataPage = () => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [modalOriginRect, setModalOriginRect] = useState(null);
  const [activeModalType, setActiveModalType] = useState('rate-mbkm');

  const filters = useMbkmFilters();

  const { data: repositoryData, loading } = useApiData(
    () => apiClient.getMbkmRepository(filters.queryParams),
    [filters.queryParams]
  );

  const mbkmList = repositoryData?.data || [];
  const metrics = repositoryData?.metrics || {
    participantStats: { total: 74, active: 74 },
    mbkmRate: '69.8%',
    totalMitra: 28,
    eligibleCount: 106,
  };
  const filterOptions = repositoryData?.filterOptions || {
    faculties: [],
    prodis: [],
    availableAngkatans: [],
  };
  const pagination = repositoryData?.pagination || {
    currentPage: 1,
    pageSize: 50,
    totalRecords: 0,
    totalPages: 1,
  };

  const handleExportData = () => {
    const headers = [
      'No',
      'NIM',
      'Name',
      'Batch',
      'Study Program',
      'Faculty',
      'Degree Level',
      'Active Status',
      'Activity Type',
      'Partner',
      'Activity Status',
    ];

    const rows = mbkmList.map((m, idx) => [
      (pagination.currentPage - 1) * pagination.pageSize + idx + 1,
      m.nim || '',
      m.nama || '',
      m.angkatan || '',
      m.program_studi || '',
      m.fakultas || '',
      m.jenjang || 'S1',
      m.status_keaktifan || 'Aktif',
      m.jenis_aktifitas || '',
      m.mitra || '',
      m.status_aktifitas || '',
    ]);

    exportToCsv(`komet_mbkm_data_${new Date().toISOString().slice(0, 10)}`, headers, rows);
  };

  const handleOpenDetailModal = (type, originRect) => {
    if (filters.isFiltered) return;
    setActiveModalType(type);
    setModalOriginRect(originRect);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full gap-6 max-w-7xl mx-auto">
      {/* 1. Header with Export Button */}
      <MbkmHeader onExport={handleExportData} />

      {/* 2. Top Summary Metric Cards */}
      <MbkmMetricsRow
        isFiltered={filters.isFiltered}
        mbkmRate={metrics.mbkmRate}
        participantStats={metrics.participantStats}
        eligibleCount={metrics.eligibleCount}
        totalMitra={metrics.totalMitra}
        onOpenDetailModal={handleOpenDetailModal}
      />

      {/* 3. Filter Section */}
      <div className="space-y-2">
        <MbkmFilterBar
          searchTerm={filters.searchTerm}
          setSearchTerm={filters.setSearchTerm}
          timeHorizon={filters.timeHorizon}
          setTimeHorizon={filters.setTimeHorizon}
          selectedCustomAngkatan={filters.selectedCustomAngkatan}
          availableAngkatans={filterOptions.availableAngkatans || []}
          handleSelectAllCustomAngkatan={() => filters.handleSelectAllCustomAngkatan(filterOptions.availableAngkatans || [])}
          handleClearCustomAngkatan={filters.handleClearCustomAngkatan}
          handleToggleCustomAngkatan={filters.handleToggleCustomAngkatan}
          selectedFaculties={filters.selectedFaculties}
          facultyOptions={(filterOptions.faculties || []).map((f) => f.value || f)}
          handleToggleFaculty={filters.handleToggleFaculty}
          handleSelectAllFaculties={filters.handleSelectAllFaculties}
          handleClearFaculties={filters.handleClearFaculties}
          selectedProdis={filters.selectedProdis}
          prodiOptions={(filterOptions.prodis || []).map((p) => p.value || p)}
          handleToggleProdi={filters.handleToggleProdi}
          handleSelectAllProdis={() => filters.handleSelectAllProdis((filterOptions.prodis || []).map((p) => p.value || p))}
          handleClearProdis={filters.handleClearProdis}
          selectedAngkatan={filters.selectedAngkatan}
          handleToggleAngkatan={filters.handleToggleAngkatan}
          handleSelectAllAngkatan={() => filters.handleSelectAllAngkatan(filterOptions.availableAngkatans || [])}
          handleClearAngkatan={filters.handleClearAngkatan}
          selectedStatus={filters.selectedStatus}
          setSelectedStatus={filters.setSelectedStatus}
          selectedJenjang={filters.selectedJenjang}
          setSelectedJenjang={filters.setSelectedJenjang}
          handleResetFilters={filters.handleResetFilters}
          isFiltered={filters.isFiltered}
        />

        {/* Filter Chips Bar */}
        <MbkmFilterChips
          isFiltered={filters.isFiltered}
          searchTerm={filters.searchTerm}
          setSearchTerm={filters.setSearchTerm}
          selectedFaculties={filters.selectedFaculties}
          handleToggleFaculty={filters.handleToggleFaculty}
          selectedProdis={filters.selectedProdis}
          handleToggleProdi={filters.handleToggleProdi}
          selectedAngkatan={filters.selectedAngkatan}
          handleToggleAngkatan={filters.handleToggleAngkatan}
          selectedStatus={filters.selectedStatus}
          setSelectedStatus={filters.setSelectedStatus}
          selectedJenjang={filters.selectedJenjang}
          setSelectedJenjang={filters.setSelectedJenjang}
          timeHorizon={filters.timeHorizon}
          setTimeHorizon={filters.setTimeHorizon}
          selectedCustomAngkatan={filters.selectedCustomAngkatan}
          handleToggleCustomAngkatan={filters.handleToggleCustomAngkatan}
          handleResetFilters={filters.handleResetFilters}
        />
      </div>

      {/* 4. MBKM Table with Server-Driven Pagination */}
      <MbkmTable
        mbkmData={mbkmList}
        totalCount={pagination.totalRecords}
        currentPage={pagination.currentPage}
        pageSize={pagination.pageSize}
        totalPages={pagination.totalPages}
        onPageChange={filters.setCurrentPage}
        onPageSizeChange={filters.setPageSize}
        loading={loading}
      />

      {/* 5. Detail Modal for Longitudinal Analysis */}
      <MbkmDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setModalOriginRect(null);
        }}
        originRect={modalOriginRect}
        type={activeModalType}
      />
    </div>
  );
};

export default MbkmDataPage;
