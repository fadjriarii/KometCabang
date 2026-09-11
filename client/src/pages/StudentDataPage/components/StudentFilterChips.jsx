import React from 'react';

export const StudentFilterChips = ({
  isFiltered = false,
  selectedFaculties = [],
  handleToggleFaculty,
  selectedProdis = [],
  handleToggleProdi,
  selectedAngkatan = [],
  handleToggleAngkatan,
  periodeTermFilter = 'all',
  setPeriodeTermFilter,
  selectedSemesters = [],
  handleToggleSemester,
  statusFilter = 'all',
  setStatusFilter,
  nationalityFilter = 'all',
  setNationalityFilter,
  timeHorizon = 'last5',
  setTimeHorizon,
  selectedCustomYears = [],
  handleToggleCustomYear,
  handleResetFilters,
  onResetFilters,
}) => {
  if (!isFiltered) return null;

  const resetFn = handleResetFilters || onResetFilters;
  const safeFaculties = Array.isArray(selectedFaculties) ? selectedFaculties : [];
  const safeProdis = Array.isArray(selectedProdis) ? selectedProdis : [];
  const safeAngkatan = Array.isArray(selectedAngkatan) ? selectedAngkatan : [];
  const safeSemesters = Array.isArray(selectedSemesters) ? selectedSemesters : [];
  const safeCustomYears = Array.isArray(selectedCustomYears) ? selectedCustomYears : [];

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-surface-container">
      <div className="flex flex-wrap items-center gap-2" id="active-filter-chips">
        <span className="text-xs text-outline font-medium">Active Filters:</span>
        {safeFaculties.length > 0 && (
          <span id="chip-faculty" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-primary-fixed text-on-primary-fixed font-semibold">
            Faculty: {safeFaculties.join(', ')}
            {handleToggleFaculty && safeFaculties.length === 1 && (
              <button
                type="button"
                onClick={() => handleToggleFaculty(safeFaculties[0])}
                className="hover:text-red-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">close</span>
              </button>
            )}
          </span>
        )}
        {safeProdis.length > 0 && (
          <span id="chip-prodi" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-primary-fixed/90 text-on-primary-fixed font-semibold">
            Prodi: {safeProdis.join(', ')}
            {handleToggleProdi && safeProdis.length === 1 && (
              <button
                type="button"
                onClick={() => handleToggleProdi(safeProdis[0])}
                className="hover:text-red-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">close</span>
              </button>
            )}
          </span>
        )}
        {safeAngkatan.length > 0 && (
          <span id="chip-angkatan" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-primary-fixed text-on-primary-fixed font-semibold">
            Angkatan: {[...safeAngkatan].sort((a, b) => b - a).join(', ')}
            {handleToggleAngkatan && safeAngkatan.length === 1 && (
              <button
                type="button"
                onClick={() => handleToggleAngkatan(safeAngkatan[0])}
                className="hover:text-red-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">close</span>
              </button>
            )}
          </span>
        )}
        {periodeTermFilter !== 'all' && (
          <span id="chip-periode-term" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-primary-fixed/80 text-on-primary-fixed-variant font-medium">
            Periode: {periodeTermFilter === 'ganjil' ? 'Ganjil' : 'Genap'}
            {setPeriodeTermFilter && (
              <button
                type="button"
                onClick={() => setPeriodeTermFilter('all')}
                className="hover:text-red-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">close</span>
              </button>
            )}
          </span>
        )}
        {safeSemesters.length > 0 && (
          <span id="chip-semester" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-primary-fixed/80 text-on-primary-fixed-variant font-medium">
            Semester: {safeSemesters.map((s) => (s === '8+' ? '≥8' : s)).join(', ')}
            {handleToggleSemester && safeSemesters.length === 1 && (
              <button
                type="button"
                onClick={() => handleToggleSemester(safeSemesters[0])}
                className="hover:text-red-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">close</span>
              </button>
            )}
          </span>
        )}
        {statusFilter !== 'all' && (
          <span id="chip-status" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-primary-fixed/60 text-on-primary-fixed-variant font-medium">
            Status: {statusFilter}
            {setStatusFilter && (
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className="hover:text-red-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">close</span>
              </button>
            )}
          </span>
        )}
        {nationalityFilter !== 'all' && (
          <span id="chip-nationality" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-secondary-fixed/70 text-on-secondary-fixed font-medium">
            Nationality: {nationalityFilter}
            {setNationalityFilter && (
              <button
                type="button"
                onClick={() => setNationalityFilter('all')}
                className="hover:text-red-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">close</span>
              </button>
            )}
          </span>
        )}
        {timeHorizon !== 'last5' && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-secondary-fixed/70 text-on-secondary-fixed font-medium">
            Range:{' '}
            {timeHorizon === 'all'
              ? 'All Cohorts'
              : safeCustomYears.length > 0
              ? `${[...safeCustomYears].sort((a, b) => a - b).join(', ')}`
              : 'All Cohorts (Custom)'}
            {setTimeHorizon && (
              <button
                type="button"
                onClick={() => setTimeHorizon('last5')}
                className="hover:text-red-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">close</span>
              </button>
            )}
          </span>
        )}
      </div>
      <button
        id="reset-filter-btn"
        type="button"
        onClick={resetFn}
        className="inline-flex items-center cursor-pointer"
      >
        <span
          className="
            inline-flex items-center gap-1
            text-xs font-semibold
            text-rose-500
            hover:text-rose-700
            border-b border-transparent
            hover:border-rose-700
          "
        >
          <span className="material-symbols-outlined text-[16px] leading-none">
            restart_alt
          </span>
          <span>Reset Filters</span>
        </span>
      </button>
    </div>
  );
};

export default StudentFilterChips;
