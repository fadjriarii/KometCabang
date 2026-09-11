import React, { useState } from 'react';
import { useApiData } from '@/hooks/useApiData';
import { apiClient } from '@/services/apiClient';
import { GraduateTable } from '@/components/graduate/GraduateTable';
import { GraduateDetailModal } from '@/components/graduate/GraduateDetailModal';
import { exportToCsv } from '@/lib/exportUtils';
import { useGraduateFilters } from './hooks/useGraduateFilters';
import { GraduateHeader } from './components/GraduateHeader';
import { GraduateMetricsRow } from './components/GraduateMetricsRow';
import { GraduateFilterBar } from './components/GraduateFilterBar';
import { GraduateFilterChips } from './components/GraduateFilterChips';

export const GraduateDataPage = () => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [modalOriginRect, setModalOriginRect] = useState(null);
  const [activeModalType, setActiveModalType] = useState('gpa-overview');

  const filters = useGraduateFilters();

  const { data: repositoryData, loading } = useApiData(
    () => apiClient.getGraduatesRepository(filters.queryParams),
    [filters.queryParams]
  );

  const graduates = repositoryData?.data || [];
  const metrics = repositoryData?.metrics || {
    totalGraduates: 196,
    avgGpa: '3.56',
    avgGpaS1: '3.52',
    avgGpaS2: '3.76',
    onTimeRate: '82.4%',
    onTimeRateS2: '88.5%',
    studySuccess: '91.2%',
    studySuccessS2: '94.0%',
  };
  const filterOptions = repositoryData?.filterOptions || {
    faculties: [],
    prodis: [],
    availableYears: [],
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
      'Batch (Angkatan)',
      'Study Program',
      'Faculty',
      'Degree Level',
      'Active Status',
      'Graduation Year',
      'GPA (IPK)',
      'Passed Credits',
      'Graduation Predicate',
    ];

    const rows = graduates.map((g, idx) => [
      (pagination.currentPage - 1) * pagination.pageSize + idx + 1,
      g.nim || '',
      g.nama || '',
      g.angkatan || '',
      g.program_studi_clean || g.program_studi || '',
      g.fakultas_clean || g.fakultas || '',
      g.jenjang_clean || g.jenjang || 'S1',
      g.status_keaktifan || 'Lulus',
      g.tahun_lulus_clean || g.tahun_lulus || '',
      g.ipk_clean !== null && g.ipk_clean !== undefined
        ? Number(g.ipk_clean).toFixed(2)
        : (g.ipk !== undefined ? Number(g.ipk).toFixed(2) : ''),
      g.total_sks_clean || g.total_sks || '',
      g.predikat_lulus_clean || g.predikat_lulus || '',
    ]);

    exportToCsv(`komet_graduate_data_${new Date().toISOString().slice(0, 10)}`, headers, rows);
  };

  const handleOpenDetailModal = (type, originRect) => {
    setActiveModalType(type);
    setModalOriginRect(originRect);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full gap-6 max-w-7xl mx-auto">
      {/* 1. Header with Export Button */}
      <GraduateHeader onExport={handleExportData} />

      {/* 2. Executive Summary Metric Cards */}
      <GraduateMetricsRow
        isFiltered={filters.isFiltered}
        totalGraduates={metrics.totalGraduates}
        totalOriginalCount={pagination.totalRecords}
        avgGpa={metrics.avgGpa}
        avgGpaS1={metrics.avgGpaS1}
        avgGpaS2={metrics.avgGpaS2}
        onTimeRate={metrics.onTimeRate}
        onTimeRateS2={metrics.onTimeRateS2}
        studySuccess={metrics.studySuccess}
        studySuccessS2={metrics.studySuccessS2}
        onOpenDetailModal={handleOpenDetailModal}
      />

      {/* 3. Filter Section */}
      <div className="space-y-2">
        <GraduateFilterBar
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
          selectedYears={filters.selectedYears}
          availableYears={filterOptions.availableYears || []}
          handleToggleYear={filters.handleToggleYear}
          handleSelectAllYears={() => filters.handleSelectAllYears(filterOptions.availableYears || [])}
          handleClearYears={filters.handleClearYears}
          selectedPeriode={filters.selectedPeriode}
          setSelectedPeriode={filters.setSelectedPeriode}
          selectedSemester={filters.selectedSemester}
          setSelectedSemester={filters.setSelectedSemester}
          selectedJenjang={filters.selectedJenjang}
          setSelectedJenjang={filters.setSelectedJenjang}
          selectedPredikat={filters.selectedPredikat}
          setSelectedPredikat={filters.setSelectedPredikat}
          handleResetFilters={filters.handleResetFilters}
          isFiltered={filters.isFiltered}
        />

        {/* Filter Chips Bar */}
        <GraduateFilterChips
          isFiltered={filters.isFiltered}
          searchTerm={filters.searchTerm}
          setSearchTerm={filters.setSearchTerm}
          selectedFaculties={filters.selectedFaculties}
          handleToggleFaculty={filters.handleToggleFaculty}
          selectedProdis={filters.selectedProdis}
          handleToggleProdi={filters.handleToggleProdi}
          selectedYears={filters.selectedYears}
          handleToggleYear={filters.handleToggleYear}
          selectedPeriode={filters.selectedPeriode}
          setSelectedPeriode={filters.setSelectedPeriode}
          selectedSemester={filters.selectedSemester}
          setSelectedSemester={filters.setSelectedSemester}
          selectedJenjang={filters.selectedJenjang}
          setSelectedJenjang={filters.setSelectedJenjang}
          selectedPredikat={filters.selectedPredikat}
          setSelectedPredikat={filters.setSelectedPredikat}
          timeHorizon={filters.timeHorizon}
          setTimeHorizon={filters.setTimeHorizon}
          selectedCustomAngkatan={filters.selectedCustomAngkatan}
          handleToggleCustomAngkatan={filters.handleToggleCustomAngkatan}
          handleResetFilters={filters.handleResetFilters}
        />
      </div>

      {/* 4. Graduate Table with Server-Driven Pagination */}
      <GraduateTable
        graduates={graduates}
        totalCount={pagination.totalRecords}
        currentPage={pagination.currentPage}
        pageSize={pagination.pageSize}
        totalPages={pagination.totalPages}
        onPageChange={filters.setCurrentPage}
        onPageSizeChange={filters.setPageSize}
        loading={loading}
      />

      {/* 5. Detail Modal for Longitudinal Analysis */}
      <GraduateDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setModalOriginRect(null);
        }}
        originRect={modalOriginRect}
        type={activeModalType}
        queryParams={filters.queryParams}
      />
    </div>
  );
};

export default GraduateDataPage;
