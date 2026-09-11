import React, { useState } from 'react';
import { useApiData } from '@/hooks/useApiData';
import { apiClient } from '@/services/apiClient';
import { DetailModal } from '@/components/student/DetailModal';
import { StudentTable } from '@/components/student/StudentTable';
import { exportToCsv } from '@/lib/exportUtils';
import { useStudentFilters } from './hooks/useStudentFilters';
import { StudentHeader } from './components/StudentHeader';
import { StudentMetricsRow } from './components/StudentMetricsRow';
import { StudentFilterBar } from './components/StudentFilterBar';
import { StudentFilterChips } from './components/StudentFilterChips';

/**
 * Halaman Student Data Repository (Data Mahasiswa) KOMET Dashboard.
 * Strictly UI/UX presenter connecting to backend calculation endpoints.
 */
export const StudentDataPage = () => {
  const [modalOriginRect, setModalOriginRect] = useState(null);
  const [activeDetailMetricType, setActiveDetailMetricType] = useState(null);

  const filters = useStudentFilters();

  const { data: repositoryData, loading } = useApiData(
    () => apiClient.getStudentsRepository(filters.queryParams),
    [filters.queryParams]
  );

  const students = repositoryData?.data || [];
  const metrics = repositoryData?.metrics || {
    totalActive: 554,
    foreignStudents: { percentage: '8.3%', count: 46 },
    intake: { count: 148, target: 160 },
    intakeGrowth: { rate: '+3.2%', label: 'Tumbuh Positif' },
    intakeTrend: [],
  };
  const filterOptions = repositoryData?.filterOptions || {
    faculties: [],
    prodis: [],
    availableYears: [],
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
      'Nama',
      'Cohort',
      'Periode',
      'Program Studi',
      'Fakultas',
      'Semester',
      'Kewarganegaraan',
      'Status Keaktifan',
    ];

    const rows = students.map((s, idx) => [
      (pagination.currentPage - 1) * pagination.pageSize + idx + 1,
      s.nim || '',
      s.nama || '',
      s.angkatan || '',
      s.periode || '',
      s.program_studi || '',
      s.fakultas || '',
      s.semester !== null ? s.semester : '',
      s.kewarganegaraan || '',
      s.status_keaktifan || '',
    ]);

    exportToCsv(`komet_student_data_${new Date().toISOString().slice(0, 10)}`, headers, rows);
  };

  const handleOpenDetailModal = (metricType, originRect) => {
    if (filters.isFiltered) return;
    setModalOriginRect(originRect);
    setActiveDetailMetricType(metricType);
  };

  return (
    <div className="flex flex-col w-full gap-6 max-w-7xl mx-auto">
      {/* 1. Header with Export Button */}
      <StudentHeader onExport={handleExportData} />

      {/* 2. Executive Summary Metric Cards */}
      <StudentMetricsRow
        isFiltered={filters.isFiltered}
        dynamicMetrics={metrics}
        filteredCount={pagination.totalRecords}
        timeHorizon={filters.timeHorizon}
        selectedCustomYears={filters.selectedCustomYears}
        onOpenDetailModal={handleOpenDetailModal}
      />

      {/* 3. Filter Section */}
      <div className="space-y-2">
        <StudentFilterBar
          searchTerm={filters.searchTerm}
          setSearchTerm={filters.setSearchTerm}
          timeHorizon={filters.timeHorizon}
          setTimeHorizon={filters.setTimeHorizon}
          selectedCustomYears={filters.selectedCustomYears}
          availableYears={filterOptions.availableYears || []}
          handleSelectAllCustomYears={() => filters.handleSelectAllCustomYears(filterOptions.availableYears || [])}
          handleClearCustomYears={filters.handleClearCustomYears}
          handleToggleCustomYear={filters.handleToggleCustomYear}
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
          statusFilter={filters.statusFilter}
          setStatusFilter={filters.setStatusFilter}
          nationalityFilter={filters.nationalityFilter}
          setNationalityFilter={filters.setNationalityFilter}
          periodeTermFilter={filters.periodeTermFilter}
          setPeriodeTermFilter={filters.setPeriodeTermFilter}
          selectedSemesters={filters.selectedSemesters}
          handleToggleSemester={filters.handleToggleSemester}
          handleSelectAllSemesters={filters.handleSelectAllSemesters}
          handleClearSemesters={filters.handleClearSemesters}
          selectedAngkatan={filters.selectedAngkatan}
          handleToggleAngkatan={filters.handleToggleAngkatan}
          handleSelectAllAngkatan={() => filters.handleSelectAllAngkatan(filterOptions.availableYears || [])}
          handleClearAngkatan={filters.handleClearAngkatan}
          handleResetFilters={filters.handleResetFilters}
          isFiltered={filters.isFiltered}
        />

        {/* Filter Chips Bar */}
        <StudentFilterChips
          isFiltered={filters.isFiltered}
          searchTerm={filters.searchTerm}
          setSearchTerm={filters.setSearchTerm}
          selectedFaculties={filters.selectedFaculties}
          handleToggleFaculty={filters.handleToggleFaculty}
          selectedProdis={filters.selectedProdis}
          handleToggleProdi={filters.handleToggleProdi}
          statusFilter={filters.statusFilter}
          setStatusFilter={filters.setStatusFilter}
          nationalityFilter={filters.nationalityFilter}
          setNationalityFilter={filters.setNationalityFilter}
          periodeTermFilter={filters.periodeTermFilter}
          setPeriodeTermFilter={filters.setPeriodeTermFilter}
          selectedSemesters={filters.selectedSemesters}
          handleToggleSemester={filters.handleToggleSemester}
          selectedAngkatan={filters.selectedAngkatan}
          handleToggleAngkatan={filters.handleToggleAngkatan}
          timeHorizon={filters.timeHorizon}
          setTimeHorizon={filters.setTimeHorizon}
          selectedCustomYears={filters.selectedCustomYears}
          handleToggleCustomYear={filters.handleToggleCustomYear}
          handleResetFilters={filters.handleResetFilters}
        />
      </div>

      {/* 4. Student Data Table with Server-Driven Pagination */}
      <StudentTable
        students={students}
        totalCount={pagination.totalRecords}
        currentPage={pagination.currentPage}
        pageSize={pagination.pageSize}
        totalPages={pagination.totalPages}
        onPageChange={filters.setCurrentPage}
        onPageSizeChange={filters.setPageSize}
        loading={loading}
      />

      {/* 5. Detail Modal for Longitudinal Analysis */}
      <DetailModal
        isOpen={Boolean(activeDetailMetricType)}
        metricType={activeDetailMetricType}
        originRect={modalOriginRect}
        onClose={() => {
          setActiveDetailMetricType(null);
          setModalOriginRect(null);
        }}
      />
    </div>
  );
};

export default StudentDataPage;
