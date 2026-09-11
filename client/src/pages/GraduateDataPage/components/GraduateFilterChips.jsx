import React from 'react';
import { PERIODE_OPTIONS, SEMESTER_OPTIONS } from '../hooks/useGraduateFilters';

export const GraduateFilterChips = ({
  isFiltered = false,
  searchTerm = '',
  setSearchTerm,
  selectedFaculties = [],
  handleToggleFaculty,
  selectedProdis = [],
  handleToggleProdi,
  selectedYears = [],
  handleToggleYear,
  selectedPeriode = 'all',
  setSelectedPeriode,
  selectedSemester = 'all',
  setSelectedSemester,
  selectedJenjang = 'all',
  setSelectedJenjang,
  selectedPredikat = 'all',
  setSelectedPredikat,
  timeHorizon = 'last5',
  setTimeHorizon,
  availableAngkatans = [],
  selectedCustomAngkatan = [],
  handleToggleCustomAngkatan,
  handleResetFilters,
  onResetFilters,
}) => {
  if (!isFiltered) return null;

  const resetFn = handleResetFilters || onResetFilters;
  const safeAvailableAngkatans = Array.isArray(availableAngkatans) ? availableAngkatans : [];
  const safeCustomAngkatans = Array.isArray(selectedCustomAngkatan) ? selectedCustomAngkatan : [];
  const safeYears = Array.isArray(selectedYears) ? selectedYears : [];
  const safeFaculties = Array.isArray(selectedFaculties) ? selectedFaculties : [];
  const safeProdis = Array.isArray(selectedProdis) ? selectedProdis : [];

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-surface-container">
      <div className="flex flex-wrap items-center gap-2" id="active-graduate-filter-chips">
        <span className="text-xs text-outline font-medium">Active Filters:</span>
        {safeFaculties.length > 0 && (
          <span id="chip-graduate-faculty" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-primary-fixed text-on-primary-fixed font-semibold">
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
          <span id="chip-graduate-prodi" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-primary-fixed/90 text-on-primary-fixed font-semibold">
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
        {safeYears.length > 0 && (
          <span id="chip-graduate-years" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-amber-100 text-amber-900 font-semibold">
            Tahun Lulus: {[...safeYears].sort((a, b) => b - a).join(', ')}
            {handleToggleYear && safeYears.length === 1 && (
              <button
                type="button"
                onClick={() => handleToggleYear(safeYears[0])}
                className="hover:text-red-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">close</span>
              </button>
            )}
          </span>
        )}
        {selectedPeriode !== 'all' && (
          <span id="chip-graduate-periode" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-blue-100 text-blue-900 font-semibold">
            Periode: {PERIODE_OPTIONS.find((p) => p.value === selectedPeriode)?.label || selectedPeriode}
            {setSelectedPeriode && (
              <button
                type="button"
                onClick={() => setSelectedPeriode('all')}
                className="hover:text-red-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">close</span>
              </button>
            )}
          </span>
        )}
        {selectedSemester !== 'all' && (
          <span id="chip-graduate-semester" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-indigo-100 text-indigo-900 font-semibold">
            Semester: {SEMESTER_OPTIONS.find((s) => s.value === selectedSemester)?.label || selectedSemester}
            {setSelectedSemester && (
              <button
                type="button"
                onClick={() => setSelectedSemester('all')}
                className="hover:text-red-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">close</span>
              </button>
            )}
          </span>
        )}
        {selectedJenjang !== 'all' && (
          <span id="chip-graduate-jenjang" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-purple-100 text-purple-900 font-semibold">
            Jenjang: {selectedJenjang}
            {setSelectedJenjang && (
              <button
                type="button"
                onClick={() => setSelectedJenjang('all')}
                className="hover:text-red-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">close</span>
              </button>
            )}
          </span>
        )}
        {selectedPredikat !== 'all' && (
          <span id="chip-graduate-predikat" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-teal-100 text-teal-900 font-semibold">
            Predikat: {selectedPredikat}
            {setSelectedPredikat && (
              <button
                type="button"
                onClick={() => setSelectedPredikat('all')}
                className="hover:text-red-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">close</span>
              </button>
            )}
          </span>
        )}
        {timeHorizon !== 'last5' && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-secondary-fixed/70 text-on-secondary-fixed font-medium">
            Time Horizon:{' '}
            {timeHorizon === 'all'
              ? 'All Time'
              : safeCustomAngkatans.length > 0
              ? `Angkatan ${[...safeCustomAngkatans].sort((a, b) => b - a).join(', ')}`
              : 'Custom (Pilih Tahun)'}
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
        id="reset-graduate-filter-btn"
        type="button"
        onClick={resetFn}
        className="inline-flex items-center cursor-pointer"
      >
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-700 border-b border-transparent hover:border-rose-700">
          <span className="material-symbols-outlined text-[16px] leading-none">
            restart_alt
          </span>
          <span>Reset Filters</span>
        </span>
      </button>
    </div>
  );
};

export default GraduateFilterChips;
