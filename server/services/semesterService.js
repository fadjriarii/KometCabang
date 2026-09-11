import { kelulusanData } from '../data/KomatQAmit_DB_DataDump.js';

// Baseline periode akademik acuan saat ini (September 2026 = Semester Ganjil 2026/2027)
export const CURRENT_YEAR = 2026;
export const CURRENT_TERM = 1; // 1: Ganjil, 2: Genap
export const CURRENT_PERIOD = `${CURRENT_YEAR}-${CURRENT_TERM}`;

/**
 * Cache lookup map NIM -> tahun_lulus dari dataset kelulusanData.
 */
const graduateYearMap = new Map();
if (Array.isArray(kelulusanData)) {
  kelulusanData.forEach((grad) => {
    const nim = String(grad.nim || '').trim();
    const yr = Number(grad.tahun_lulus);
    if (nim && !isNaN(yr) && yr > 0) {
      graduateYearMap.set(nim, yr);
    }
  });
}

/**
 * Mengurai string periode menjadi tahun dan term semester.
 */
export const parseEntryPeriod = (rawPeriod, rawAngkatan) => {
  const str = String(rawPeriod || '').trim().toLowerCase();

  const dashMatch = str.match(/^(\d{4})[-_]?([12])$/);
  if (dashMatch) {
    return {
      entryYear: parseInt(dashMatch[1], 10),
      entryTerm: parseInt(dashMatch[2], 10),
    };
  }

  const textMatch = str.match(/semester\s+(ganjil|genap)\s+(\d{4})/i);
  if (textMatch) {
    const isGenap = textMatch[1].toLowerCase() === 'genap';
    return {
      entryYear: parseInt(textMatch[2], 10),
      entryTerm: isGenap ? 2 : 1,
    };
  }

  const yearMatch = str.match(/(\d{4})/);
  if (yearMatch) {
    const isGenap = str.includes('genap') || str.includes('-2') || str.includes('_2');
    return {
      entryYear: parseInt(yearMatch[1], 10),
      entryTerm: isGenap ? 2 : 1,
    };
  }

  const angkatanNum = parseInt(String(rawAngkatan || ''), 10);
  if (!isNaN(angkatanNum) && angkatanNum > 2000) {
    return {
      entryYear: angkatanNum,
      entryTerm: 1,
    };
  }

  return {
    entryYear: CURRENT_YEAR,
    entryTerm: CURRENT_TERM,
  };
};

export const inferDegreeLevel = (student = {}) => {
  const rawJenjang = String(student.jenjang || '').trim().toUpperCase();
  if (rawJenjang.includes('S2') || rawJenjang.includes('MAGISTER') || rawJenjang.includes('MASTER')) {
    return 'S2';
  }
  if (rawJenjang.includes('S1') || rawJenjang.includes('SARJANA') || rawJenjang.includes('BACHELOR')) {
    return 'S1';
  }

  const prodi = String(student.program_studi || student.prodi || '').toLowerCase();
  const fakultas = String(student.fakultas || '').toLowerCase();

  const isS2 =
    prodi.includes('magister') ||
    prodi.includes('s2') ||
    prodi.includes('master') ||
    fakultas.includes('magister') ||
    fakultas.includes('s2') ||
    fakultas.includes('master');

  return isS2 ? 'S2' : 'S1';
};

export const getMaxSemesterLimit = (jenjang = 'S1') => {
  return String(jenjang).toUpperCase() === 'S2' ? 8 : 14;
};

export const calculatePreciseSemester = (
  student,
  currentYear = CURRENT_YEAR,
  currentTerm = CURRENT_TERM
) => {
  if (!student) return 1;

  let startYear = Number(student.angkatan);
  if (isNaN(startYear) || startYear <= 2000) {
    const parsed = parseEntryPeriod(student.periode, student.angkatan);
    startYear = parsed.entryYear;
  }

  const rawStatus = String(student.status_keaktifan || '').trim().toLowerCase();

  if (rawStatus === 'lulus') {
    const nim = String(student.nim || '').trim();
    let gradYear = Number(student.tahun_lulus);

    if (isNaN(gradYear) || gradYear <= 0) {
      if (graduateYearMap.has(nim)) {
        gradYear = graduateYearMap.get(nim);
      }
    }

    if (!isNaN(gradYear) && gradYear >= startYear) {
      const sem = (gradYear - startYear) * 2;
      return sem < 1 ? 1 : sem;
    }

    const parsedPeriode = parseEntryPeriod(student.periode, startYear);
    const endYear = parsedPeriode.entryYear >= startYear ? parsedPeriode.entryYear : startYear + 4;
    const sem = (endYear - startYear) * 2;
    return sem < 1 ? 1 : sem;
  }

  if (rawStatus === 'aktif') {
    const sem = (currentYear - startYear) * 2 + currentTerm;
    return sem < 1 ? 1 : sem;
  }

  let gradYear = Number(student.tahun_lulus);
  if (isNaN(gradYear) || gradYear <= 0) {
    const nim = String(student.nim || '').trim();
    if (graduateYearMap.has(nim)) {
      gradYear = graduateYearMap.get(nim);
    }
  }

  if (!isNaN(gradYear) && gradYear >= startYear) {
    const sem = (gradYear - startYear) * 2;
    return sem < 1 ? 1 : sem;
  }

  const parsedPeriode = parseEntryPeriod(student.periode, startYear);
  const frozenYear = parsedPeriode.entryYear;
  const frozenTerm = parsedPeriode.entryTerm;

  const sem = (frozenYear - startYear) * 2 + (frozenTerm - 1) + 1;
  return sem < 1 ? 1 : sem;
};

export const enrichStudentData = (rawStudentsData = [], currentPeriod = CURRENT_PERIOD) => {
  if (!Array.isArray(rawStudentsData)) return [];

  const { entryYear: currentYear, entryTerm: currentTerm } = parseEntryPeriod(
    currentPeriod,
    CURRENT_YEAR
  );

  return rawStudentsData.map((student) => {
    const calculatedSemester = calculatePreciseSemester(student, currentYear, currentTerm);
    const jenjang = inferDegreeLevel(student);
    const maxLimit = getMaxSemesterLimit(jenjang);
    const rawStatus = String(student.status_keaktifan || '').trim();
    const isAktif = rawStatus.toLowerCase() === 'aktif';

    let updatedStatus = rawStatus;
    if (isAktif && calculatedSemester > maxLimit) {
      updatedStatus = 'Drop Out';
    }

    return {
      ...student,
      jenjang,
      semester: calculatedSemester,
      status_keaktifan: updatedStatus,
    };
  });
};

export default enrichStudentData;
