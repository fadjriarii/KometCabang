import { useState, useMemo, useCallback } from 'react';
import { FACULTIES } from '@/utils/academicStructure';

export const STATUS_OPTIONS = [
  { value: 'all', label: 'Semua Status Kegiatan' },
  { value: 'sedang berjalan', label: 'Sedang Berjalan' },
  { value: 'selesai', label: 'Selesai' },
  { value: 'evaluasi', label: 'Evaluasi' },
];

export const JENJANG_OPTIONS = [
  { value: 'all', label: 'Semua Jenjang' },
  { value: 's1', label: 'Sarjana (S1)' },
  { value: 's2', label: 'Magister (S2)' },
];

export function useMbkmFilters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculties, setSelectedFaculties] = useState([]);
  const [selectedProdis, setSelectedProdis] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAngkatan, setSelectedAngkatan] = useState([]);
  const [selectedJenjang, setSelectedJenjang] = useState('all');
  const [timeHorizon, setTimeHorizon] = useState('last5');
  const [selectedCustomAngkatan, setSelectedCustomAngkatan] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const queryParams = useMemo(() => ({
    search: searchTerm,
    faculties: selectedFaculties,
    prodis: selectedProdis,
    status: selectedStatus,
    angkatan: selectedAngkatan,
    jenjang: selectedJenjang,
    timeHorizon,
    customAngkatan: selectedCustomAngkatan,
    page: currentPage,
    limit: pageSize,
  }), [
    searchTerm,
    selectedFaculties,
    selectedProdis,
    selectedStatus,
    selectedAngkatan,
    selectedJenjang,
    timeHorizon,
    selectedCustomAngkatan,
    currentPage,
    pageSize,
  ]);

  const isFiltered = useMemo(() => {
    return (
      Boolean(searchTerm) ||
      selectedFaculties.length > 0 ||
      selectedProdis.length > 0 ||
      selectedStatus !== 'all' ||
      selectedAngkatan.length > 0 ||
      selectedJenjang !== 'all' ||
      timeHorizon !== 'last5' ||
      selectedCustomAngkatan.length > 0
    );
  }, [
    searchTerm,
    selectedFaculties,
    selectedProdis,
    selectedStatus,
    selectedAngkatan,
    selectedJenjang,
    timeHorizon,
    selectedCustomAngkatan,
  ]);

  const handleToggleFaculty = (fac) => {
    setSelectedFaculties((prev) => (prev.includes(fac) ? prev.filter((f) => f !== fac) : [...prev, fac]));
    setCurrentPage(1);
  };
  const handleSelectAllFaculties = () => {
    setSelectedFaculties([...FACULTIES]);
    setCurrentPage(1);
  };
  const handleClearFaculties = () => {
    setSelectedFaculties([]);
    setSelectedProdis([]);
    setCurrentPage(1);
  };

  const handleToggleProdi = (p) => {
    setSelectedProdis((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
    setCurrentPage(1);
  };
  const handleSelectAllProdis = (allProdis = []) => {
    setSelectedProdis(allProdis);
    setCurrentPage(1);
  };
  const handleClearProdis = () => {
    setSelectedProdis([]);
    setCurrentPage(1);
  };

  const handleToggleAngkatan = (a) => {
    setSelectedAngkatan((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
    setCurrentPage(1);
  };
  const handleSelectAllAngkatan = (allAngkatans = []) => {
    setSelectedAngkatan(allAngkatans);
    setCurrentPage(1);
  };
  const handleClearAngkatan = () => {
    setSelectedAngkatan([]);
    setCurrentPage(1);
  };

  const handleToggleCustomAngkatan = (a) => {
    setSelectedCustomAngkatan((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
    setCurrentPage(1);
  };
  const handleSelectAllCustomAngkatan = (allAngkatans = []) => {
    setSelectedCustomAngkatan(allAngkatans);
    setCurrentPage(1);
  };
  const handleClearCustomAngkatan = () => {
    setSelectedCustomAngkatan([]);
    setCurrentPage(1);
  };

  const handleResetFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedFaculties([]);
    setSelectedProdis([]);
    setSelectedStatus('all');
    setSelectedAngkatan([]);
    setSelectedJenjang('all');
    setTimeHorizon('last5');
    setSelectedCustomAngkatan([]);
    setCurrentPage(1);
  }, []);

  return {
    searchTerm,
    setSearchTerm: (t) => { setSearchTerm(t); setCurrentPage(1); },
    selectedFaculties,
    selectedProdis,
    selectedStatus,
    setSelectedStatus: (s) => { setSelectedStatus(s); setCurrentPage(1); },
    selectedAngkatan,
    selectedJenjang,
    setSelectedJenjang: (j) => { setSelectedJenjang(j); setCurrentPage(1); },
    timeHorizon,
    setTimeHorizon: (th) => { setTimeHorizon(th); setCurrentPage(1); },
    selectedCustomAngkatan,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    queryParams,
    isFiltered,
    handleToggleFaculty,
    handleSelectAllFaculties,
    handleClearFaculties,
    handleToggleProdi,
    handleSelectAllProdis,
    handleClearProdis,
    handleToggleAngkatan,
    handleSelectAllAngkatan,
    handleClearAngkatan,
    handleToggleCustomAngkatan,
    handleSelectAllCustomAngkatan,
    handleClearCustomAngkatan,
    handleResetFilters,
  };
}
