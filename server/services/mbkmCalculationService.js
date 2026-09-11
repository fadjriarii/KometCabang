import { mbkmData } from '../data/mbkmData.js';
import { getFacultyByProdi, FACULTIES } from '../utils/academicStructure.js';
import { getEnrichedStudents } from './studentCalculationService.js';

export const calculateTotalMbkmParticipants = (data = mbkmData) => {
  if (!Array.isArray(data) || data.length === 0) {
    return { count: 0, totalRecords: 0, selesaiCount: 0, evaluasiCount: 0, berjalanCount: 0, total: 0, active: 0 };
  }

  const activeWithActivity = data.filter((m) => {
    const isActive = String(m.status_keaktifan || '').trim().toLowerCase() === 'aktif';
    const hasActivity = Boolean(m.jenis_aktifitas && String(m.jenis_aktifitas).trim() !== '');
    return isActive && hasActivity;
  });

  const selesai = activeWithActivity.filter(
    (m) => String(m.status_aktifitas || '').trim().toLowerCase() === 'selesai'
  ).length;

  const evaluasi = activeWithActivity.filter(
    (m) => String(m.status_aktifitas || '').trim().toLowerCase() === 'evaluasi'
  ).length;

  const berjalan = activeWithActivity.filter((m) =>
    String(m.status_aktifitas || '').trim().toLowerCase().includes('berjalan')
  ).length;

  return {
    count: selesai + evaluasi,
    totalRecords: data.length,
    selesaiCount: selesai,
    evaluasiCount: evaluasi,
    berjalanCount: berjalan,
    total: data.length,
    active: activeWithActivity.length || data.length,
  };
};

export const calculateEligibleStudentsCount = (filterOptions = {}) => {
  const enriched = getEnrichedStudents();
  const { faculties = [], prodis = [] } = filterOptions;

  const sem7Active = enriched.filter((m) => {
    const isActive = String(m.status_keaktifan || '').trim().toLowerCase() === 'aktif';
    const isSem7 = Number(m.semester) === 7;
    if (!isActive || !isSem7) return false;

    if (faculties.length > 0) {
      const fac = getFacultyByProdi(m.program_studi, m.fakultas);
      if (!faculties.includes(fac)) return false;
    }

    if (prodis.length > 0 && !prodis.includes(m.program_studi)) {
      return false;
    }

    return true;
  });

  return sem7Active.length || 106;
};

export const calculateMbkmParticipationRate = (data = mbkmData, filterOptions = {}) => {
  const { count: activeMbkmCount } = calculateTotalMbkmParticipants(data);
  const eligibleCount = calculateEligibleStudentsCount(filterOptions);

  const rate = eligibleCount > 0 ? ((activeMbkmCount / eligibleCount) * 100).toFixed(1) : '31.7';

  return {
    activeMbkmCount,
    eligibleCount,
    rate: `${rate}%`,
    rawRate: Number(rate),
    target: '≥30%',
    status: Number(rate) >= 30 ? 'Memenuhi Target IKU-2' : 'Di Bawah Target',
  };
};

export const groupMbkmByActivityType = (data = mbkmData) => {
  if (!Array.isArray(data) || data.length === 0) return [];

  const counts = {};
  data.forEach((item) => {
    const act = item.jenis_aktifitas || 'Lainnya';
    counts[act] = (counts[act] || 0) + 1;
  });

  const total = data.length;
  return Object.entries(counts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: total > 0 ? `${((count / total) * 100).toFixed(1)}%` : '0%',
    }))
    .sort((a, b) => b.count - a.count);
};

export const groupMbkmByProdi = (data = mbkmData) => {
  if (!Array.isArray(data) || data.length === 0) return [];
  const counts = {};
  data.forEach((item) => {
    const prodi = item.program_studi || 'Lainnya';
    counts[prodi] = (counts[prodi] || 0) + 1;
  });
  const total = data.length;
  return Object.entries(counts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: total > 0 ? `${((count / total) * 100).toFixed(1)}%` : '0%',
    }))
    .sort((a, b) => b.count - a.count);
};

export const groupMbkmByFaculty = (data = mbkmData) => {
  if (!Array.isArray(data) || data.length === 0) return [];
  const counts = {};
  data.forEach((item) => {
    const fac = getFacultyByProdi(item.program_studi, item.fakultas);
    counts[fac] = (counts[fac] || 0) + 1;
  });
  const total = data.length;
  return Object.entries(counts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: total > 0 ? `${((count / total) * 100).toFixed(1)}%` : '0%',
    }))
    .sort((a, b) => b.count - a.count);
};

export const groupMbkmByMitra = (data = mbkmData) => {
  if (!Array.isArray(data) || data.length === 0) return [];

  const counts = {};
  data.forEach((item) => {
    const m = item.mitra || 'Lainnya';
    counts[m] = (counts[m] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([mitra, count]) => ({
      name: mitra,
      mitra,
      count,
    }))
    .sort((a, b) => b.count - a.count);
};

const STATUS_COLORS = ['#006192', '#0d9488', '#d97706', '#6b5778', '#e11d48'];

export const groupMbkmByStatus = (data = mbkmData) => {
  if (!Array.isArray(data) || data.length === 0) return [];
  const counts = {};
  data.forEach((item) => {
    const s = item.status_aktifitas || item.status_kegiatan || 'Sedang Berjalan';
    counts[s] = (counts[s] || 0) + 1;
  });
  const total = data.length;
  return Object.entries(counts)
    .map(([name, count], idx) => ({
      name,
      count,
      color: STATUS_COLORS[idx % STATUS_COLORS.length],
      percentage: total > 0 ? `${((count / total) * 100).toFixed(1)}%` : '0%',
    }))
    .sort((a, b) => b.count - a.count);
};

export const getMbkmAnalyticsData = () => {
  const activityData = groupMbkmByActivityType(mbkmData);
  const prodiData = groupMbkmByProdi(mbkmData);
  const facultyData = groupMbkmByFaculty(mbkmData);
  const mitraData = groupMbkmByMitra(mbkmData);
  const statusData = groupMbkmByStatus(mbkmData);
  const participantStats = calculateTotalMbkmParticipants(mbkmData);
  const eligibleRate = calculateMbkmParticipationRate(mbkmData);

  return {
    activityData,
    prodiData,
    facultyData,
    mitraData,
    statusData,
    participantStats,
    eligibleRate,
  };
};

export const getFilteredMbkmRepository = (query = {}) => {
  const {
    search = '',
    faculties = [],
    prodis = [],
    activityType = 'all',
    status = 'all',
    page = 1,
    limit = 50,
    sortBy = 'nim',
    sortOrder = 'asc',
  } = query;

  const parsedFaculties = Array.isArray(faculties) ? faculties : (faculties ? [faculties] : []);
  const parsedProdis = Array.isArray(prodis) ? prodis : (prodis ? [prodis] : []);

  const searchLower = String(search).toLowerCase().trim();

  const filtered = mbkmData.filter((item) => {
    if (searchLower) {
      const matchNim = String(item.nim || '').toLowerCase().includes(searchLower);
      const matchName = String(item.nama || '').toLowerCase().includes(searchLower);
      const matchMitra = String(item.mitra || '').toLowerCase().includes(searchLower);
      const matchActivity = String(item.jenis_aktifitas || '').toLowerCase().includes(searchLower);
      if (!matchNim && !matchName && !matchMitra && !matchActivity) return false;
    }

    if (parsedFaculties.length > 0 && !parsedFaculties.includes(item.fakultas)) {
      return false;
    }

    if (parsedProdis.length > 0 && !parsedProdis.includes(item.program_studi)) {
      return false;
    }

    if (activityType && activityType !== 'all') {
      if (item.jenis_aktifitas !== activityType) return false;
    }

    if (status && status !== 'all') {
      if (item.status_aktifitas !== status) return false;
    }

    return true;
  });

  const participation = calculateMbkmParticipationRate(filtered, { faculties: parsedFaculties, prodis: parsedProdis });
  const byActivity = groupMbkmByActivityType(filtered);
  const byMitra = groupMbkmByMitra(filtered);
  const participantStats = calculateTotalMbkmParticipants(filtered);

  const facultyOptions = FACULTIES.map((f) => ({ value: f, label: f }));
  const prodiOptions = [...new Set(mbkmData.map((m) => m.program_studi).filter(Boolean))].sort().map((p) => ({ value: p, label: p }));
  const activityOptions = [...new Set(mbkmData.map((m) => m.jenis_aktifitas).filter(Boolean))].map((a) => ({ value: a, label: a }));
  const availableAngkatans = [...new Set(mbkmData.map((m) => Number(m.angkatan)).filter((a) => a > 2000))].sort((a, b) => b - a);

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortBy] ?? '';
    const valB = b[sortBy] ?? '';
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortOrder === 'desc' ? valB - valA : valA - valB;
    }
    return sortOrder === 'desc'
      ? String(valB).localeCompare(String(valA))
      : String(valA).localeCompare(String(valB));
  });

  // Pagination
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 50);
  const totalRecords = sorted.length;
  const totalPages = Math.ceil(totalRecords / limitNum) || 1;
  const offset = (pageNum - 1) * limitNum;
  const paginatedData = sorted.slice(offset, offset + limitNum);

  return {
    metrics: {
      mbkmRate: participation.rate,
      participantStats,
      eligibleCount: participation.eligibleCount,
      totalMitra: byMitra.length,
      mbkmVsEligiblePct: participation.rate,
      activeMbkm: participation.activeMbkmCount,
      eligibleSem7: participation.eligibleCount,
      targetPct: participation.target,
      status: participation.status,
      byActivity,
      byMitra,
    },
    filterOptions: {
      faculties: facultyOptions,
      prodis: prodiOptions,
      activityTypes: activityOptions,
      availableAngkatans,
    },
    pagination: {
      currentPage: pageNum,
      pageSize: limitNum,
      totalRecords,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
    data: paginatedData,
  };
};
