import { useState, useMemo, useCallback } from 'react';
import { FACULTIES } from '@/utils/academicStructure';

export const PERIODE_OPTIONS = [
  { value: 'all', label: 'Semua Periode' },
  { value: 'ganjil', label: 'Semester Ganjil' },
  { value: 'genap', label: 'Semester Genap' },
];

export const SEMESTER_OPTIONS = [
  { value: 'all', label: 'Semua Semester' },
  { value: '6', label: 'Semester 6 (Cepat)' },
  { value: '7', label: 'Semester 7' },
  { value: '8', label: 'Semester 8 (Tepat Waktu)' },
  { value: '9', label: 'Semester 9' },
  { value: '10', label: 'Semester 10' },
  { value: '11', label: 'Semester 11' },
  { value: '12', label: 'Semester 12' },
  { value: '12+', label: 'Semester > 12' },
];

export const JENJANG_OPTIONS = [
  { value: 'all', label: 'Semua Jenjang' },
  { value: 'S1', label: 'Sarjana (S1)' },
  { value: 'S2', label: 'Magister (S2)' },
];

export const PREDIKAT_OPTIONS = [
  { value: 'all', label: 'Semua Predikat' },
  { value: 'Cum Laude', label: 'Cum Laude' },
  { value: 'Sangat Memuaskan', label: 'Sangat Memuaskan' },
  { value: 'Memuaskan', label: 'Memuaskan' },
];

export function useGraduateFilters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculties, setSelectedFaculties] = useState([]);
  const [selectedProdis, setSelectedProdis] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedPeriode, setSelectedPeriode] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedJenjang, setSelectedJenjang] = useState('all');
  const [selectedPredikat, setSelectedPredikat] = useState('all');
  const [timeHorizon, setTimeHorizon] = useState('last5');
  const [selectedCustomAngkatan, setSelectedCustomAngkatan] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const queryParams = useMemo(() => ({
    search: searchTerm,
    faculties: selectedFaculties,
    prodis: selectedProdis,
    years: selectedYears,
    periode: selectedPeriode,
    semester: selectedSemester,
    jenjang: selectedJenjang,
    predikat: selectedPredikat,
    timeHorizon,
    customAngkatan: selectedCustomAngkatan,
    page: currentPage,
    limit: pageSize,
  }), [
    searchTerm,
    selectedFaculties,
    selectedProdis,
    selectedYears,
    selectedPeriode,
    selectedSemester,
    selectedJenjang,
    selectedPredikat,
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
      selectedYears.length > 0 ||
      selectedPeriode !== 'all' ||
      selectedSemester !== 'all' ||
      selectedJenjang !== 'all' ||
      selectedPredikat !== 'all' ||
      timeHorizon !== 'last5' ||
      selectedCustomAngkatan.length > 0
    );
  }, [
    searchTerm,
    selectedFaculties,
    selectedProdis,
    selectedYears,
    selectedPeriode,
    selectedSemester,
    selectedJenjang,
    selectedPredikat,
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

  const handleToggleYear = (y) => {
    setSelectedYears((prev) => (prev.includes(y) ? prev.filter((x) => x !== y) : [...prev, y]));
    setCurrentPage(1);
  };
  const handleSelectAllYears = (allYears = []) => {
    setSelectedYears(allYears);
    setCurrentPage(1);
  };
  const handleClearYears = () => {
    setSelectedYears([]);
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
    setSelectedYears([]);
    setSelectedPeriode('all');
    setSelectedSemester('all');
    setSelectedJenjang('all');
    setSelectedPredikat('all');
    setTimeHorizon('last5');
    setSelectedCustomAngkatan([]);
    setCurrentPage(1);
  }, []);

  return {
    searchTerm,
    setSearchTerm: (t) => { setSearchTerm(t); setCurrentPage(1); },
    selectedFaculties,
    selectedProdis,
    selectedYears,
    selectedPeriode,
    setSelectedPeriode: (p) => { setSelectedPeriode(p); setCurrentPage(1); },
    selectedSemester,
    setSelectedSemester: (s) => { setSelectedSemester(s); setCurrentPage(1); },
    selectedJenjang,
    setSelectedJenjang: (j) => { setSelectedJenjang(j); setCurrentPage(1); },
    selectedPredikat,
    setSelectedPredikat: (pr) => { setSelectedPredikat(pr); setCurrentPage(1); },
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
    handleToggleYear,
    handleSelectAllYears,
    handleClearYears,
    handleToggleCustomAngkatan,
    handleSelectAllCustomAngkatan,
    handleClearCustomAngkatan,
    handleResetFilters,
  };
}
