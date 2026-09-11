import React from 'react';

export const MbkmFilterChips = ({
  isFiltered = false,
  timeHorizon = 'last5',
  setTimeHorizon,
  selectedCustomAngkatan = [],
  selectedFaculties = [],
  handleToggleFaculty,
  selectedProdis = [],
  handleToggleProdi,
  selectedStatus = 'all',
  setSelectedStatus,
  selectedAngkatan = [],
  handleToggleAngkatan,
  selectedJenjang = 'all',
  setSelectedJenjang,
  handleResetFilters,
  onResetFilters,
}) => {
  if (!isFiltered) return null;

  const resetFn = handleResetFilters || onResetFilters;
  const safeCustomAngkatan = Array.isArray(selectedCustomAngkatan) ? selectedCustomAngkatan : [];
  const safeFaculties = Array.isArray(selectedFaculties) ? selectedFaculties : [];
  const safeProdis = Array.isArray(selectedProdis) ? selectedProdis : [];
  const safeAngkatan = Array.isArray(selectedAngkatan) ? selectedAngkatan : [];

  return (
    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-surface-container-high">
      <span className="text-[11px] font-semibold text-outline">Filter Aktif:</span>
      {timeHorizon === 'custom' && safeCustomAngkatan.length > 0 && (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
          Cohort: {safeCustomAngkatan.join(', ')}
          {setTimeHorizon && (
            <button
              onClick={() => setTimeHorizon('last5')}
              className="hover:text-red-700 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[13px]">close</span>
            </button>
          )}
        </span>
      )}
      {timeHorizon === 'all' && (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
          All Time Horizon
          {setTimeHorizon && (
            <button
              onClick={() => setTimeHorizon('last5')}
              className="hover:text-red-700 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[13px]">close</span>
            </button>
          )}
        </span>
      )}
      {safeFaculties.map((fac) => (
        <span
          key={`chip-fac-${fac}`}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-fixed text-on-primary-fixed"
        >
          {fac}
          {handleToggleFaculty && (
            <button
              onClick={() => handleToggleFaculty(fac)}
              className="hover:text-red-700 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[13px]">close</span>
            </button>
          )}
        </span>
      ))}
      {safeProdis.map((prodi) => (
        <span
          key={`chip-prodi-${prodi}`}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-fixed text-on-secondary-fixed"
        >
          {prodi}
          {handleToggleProdi && (
            <button
              onClick={() => handleToggleProdi(prodi)}
              className="hover:text-red-700 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[13px]">close</span>
            </button>
          )}
        </span>
      ))}
      {selectedStatus !== 'all' && (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-900">
          Status: {selectedStatus}
          {setSelectedStatus && (
            <button
              onClick={() => setSelectedStatus('all')}
              className="hover:text-red-700 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[13px]">close</span>
            </button>
          )}
        </span>
      )}
      {safeAngkatan.map((angk) => (
        <span
          key={`chip-angk-${angk}`}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-900"
        >
          Angkatan {angk}
          {handleToggleAngkatan && (
            <button
              onClick={() => handleToggleAngkatan(angk)}
              className="hover:text-red-700 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[13px]">close</span>
            </button>
          )}
        </span>
      ))}
      {selectedJenjang !== 'all' && (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-900">
          Jenjang: {selectedJenjang}
          {setSelectedJenjang && (
            <button
              onClick={() => setSelectedJenjang('all')}
              className="hover:text-red-700 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[13px]">close</span>
            </button>
          )}
        </span>
      )}

      <button
        onClick={resetFn}
        className="text-xs text-primary hover:underline font-bold ml-auto cursor-pointer flex items-center gap-1"
        type="button"
      >
        <span className="material-symbols-outlined text-[14px]">refresh</span>
        Reset Semua Filter
      </button>
    </div>
  );
};

export default MbkmFilterChips;
