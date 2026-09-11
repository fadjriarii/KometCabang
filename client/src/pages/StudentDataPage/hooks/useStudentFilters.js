import { useState, useMemo, useCallback } from 'react';
import { FACULTIES } from '@/utils/academicStructure';

export const SEMESTER_OPTIONS = [
  { value: '1', label: 'Semester 1' },
  { value: '2', label: 'Semester 2' },
  { value: '3', label: 'Semester 3' },
  { value: '4', label: 'Semester 4' },
  { value: '5', label: 'Semester 5' },
  { value: '6', label: 'Semester 6' },
  { value: '7', label: 'Semester 7' },
  { value: '8', label: 'Semester 8' },
  { value: '8+', label: 'Semester 8 ke atas (8+)' },
];

export const STATUS_OPTIONS = [
  { value: 'all', label: 'Semua Status' },
  { value: 'Aktif', label: 'Aktif' },
  { value: 'Cuti', label: 'Cuti' },
  { value: 'Transfer', label: 'Transfer' },
  { value: 'Lulus', label: 'Lulus' },
  { value: 'Drop Out / Dikeluarkan', label: 'Drop Out' },
  { value: 'Mengundurkan Diri / Keluar', label: 'Mengundurkan Diri' },
];

export const NATIONALITY_OPTIONS = [
  { value: 'all', label: 'Semua Kewarganegaraan' },
  { value: 'Indonesia', label: 'Indonesia (WNI)' },
  { value: 'Non-WNI', label: 'Non-WNI (Mahasiswa Asing)' },
];

export const PERIODE_TERM_OPTIONS = [
  { value: 'all', label: 'Semua Periode' },
  { value: 'ganjil', label: 'Semester Ganjil (Term 1)' },
  { value: 'genap', label: 'Semester Genap (Term 2)' },
];

export function useStudentFilters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculties, setSelectedFaculties] = useState([]);
  const [selectedProdis, setSelectedProdis] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [nationalityFilter, setNationalityFilter] = useState('all');
  const [periodeTermFilter, setPeriodeTermFilter] = useState('all');
  const [selectedSemesters, setSelectedSemesters] = useState([]);
  const [selectedAngkatan, setSelectedAngkatan] = useState([]);
  const [timeHorizon, setTimeHorizon] = useState('last5');
  const [selectedCustomYears, setSelectedCustomYears] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const queryParams = useMemo(() => ({
    search: searchTerm,
    faculties: selectedFaculties,
    prodis: selectedProdis,
    status: statusFilter,
    nationality: nationalityFilter,
    periodeTerm: periodeTermFilter,
    semesters: selectedSemesters,
    angkatan: selectedAngkatan,
    timeHorizon,
    customYears: selectedCustomYears,
    page: currentPage,
    limit: pageSize,
  }), [
    searchTerm,
    selectedFaculties,
    selectedProdis,
    statusFilter,
    nationalityFilter,
    periodeTermFilter,
    selectedSemesters,
    selectedAngkatan,
    timeHorizon,
    selectedCustomYears,
    currentPage,
    pageSize,
  ]);

  const isFiltered = useMemo(() => {
    return (
      Boolean(searchTerm) ||
      selectedFaculties.length > 0 ||
      selectedProdis.length > 0 ||
      statusFilter !== 'all' ||
      nationalityFilter !== 'all' ||
      periodeTermFilter !== 'all' ||
      selectedSemesters.length > 0 ||
      selectedAngkatan.length > 0 ||
      timeHorizon !== 'last5' ||
      selectedCustomYears.length > 0
    );
  }, [
    searchTerm,
    selectedFaculties,
    selectedProdis,
    statusFilter,
    nationalityFilter,
    periodeTermFilter,
    selectedSemesters,
    selectedAngkatan,
    timeHorizon,
    selectedCustomYears,
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

  const handleToggleAngkatan = (yr) => {
    setSelectedAngkatan((prev) => (prev.includes(yr) ? prev.filter((y) => y !== yr) : [...prev, yr]));
    setCurrentPage(1);
  };
  const handleSelectAllAngkatan = (allYears = []) => {
    setSelectedAngkatan(allYears);
    setCurrentPage(1);
  };
  const handleClearAngkatan = () => {
    setSelectedAngkatan([]);
    setCurrentPage(1);
  };

  const handleToggleSemester = (s) => {
    setSelectedSemesters((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
    setCurrentPage(1);
  };
  const handleSelectAllSemesters = () => {
    setSelectedSemesters(SEMESTER_OPTIONS.map((s) => s.value));
    setCurrentPage(1);
  };
  const handleClearSemesters = () => {
    setSelectedSemesters([]);
    setCurrentPage(1);
  };

  const handleToggleCustomYear = (yr) => {
    setSelectedCustomYears((prev) => (prev.includes(yr) ? prev.filter((y) => y !== yr) : [...prev, yr]));
    setCurrentPage(1);
  };
  const handleSelectAllCustomYears = (allYears = []) => {
    setSelectedCustomYears(allYears);
    setCurrentPage(1);
  };
  const handleClearCustomYears = () => {
    setSelectedCustomYears([]);
    setCurrentPage(1);
  };

  const handleResetFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedFaculties([]);
    setSelectedProdis([]);
    setStatusFilter('all');
    setNationalityFilter('all');
    setPeriodeTermFilter('all');
    setSelectedSemesters([]);
    setSelectedAngkatan([]);
    setTimeHorizon('last5');
    setSelectedCustomYears([]);
    setCurrentPage(1);
  }, []);

  return {
    searchTerm,
    setSearchTerm: (t) => { setSearchTerm(t); setCurrentPage(1); },
    selectedFaculties,
    selectedProdis,
    statusFilter,
    setStatusFilter: (s) => { setStatusFilter(s); setCurrentPage(1); },
    nationalityFilter,
    setNationalityFilter: (n) => { setNationalityFilter(n); setCurrentPage(1); },
    periodeTermFilter,
    setPeriodeTermFilter: (p) => { setPeriodeTermFilter(p); setCurrentPage(1); },
    selectedSemesters,
    selectedAngkatan,
    timeHorizon,
    setTimeHorizon: (th) => { setTimeHorizon(th); setCurrentPage(1); },
    selectedCustomYears,
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
    handleToggleSemester,
    handleSelectAllSemesters,
    handleClearSemesters,
    handleToggleCustomYear,
    handleSelectAllCustomYears,
    handleClearCustomYears,
    handleResetFilters,
  };
}
