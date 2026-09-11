import { mahasiswaData } from './KomatQAmit_DB_DataDump.js';
import { enrichStudentData } from '../services/semesterService.js';
import { getFacultyByProdi } from '../utils/academicStructure.js';

export const MBKM_ACTIVITY_TYPES = [
  'Magang Bersertifikat',
  'Studi Independen Bersertifikat',
  'Riset / Penelitian Hayati',
  'Pertukaran Mahasiswa Merdeka (PMM)',
  'Proyek Kemanusiaan',
  'Wirausaha Merdeka',
  'Bina Desa / KKN Tematik',
  'Asistensi Mengajar',
];

export const MBKM_MITRA_LIST = [
  'PT Kalbe Farma Tbk',
  'PT Dexa Medica',
  'PT Bio Farma (Persero)',
  'PT Paragon Technology & Innovation',
  'PT Nestle Indonesia',
  'PT Unilever Indonesia Tbk',
  'Badan Riset dan Inovasi Nasional (BRIN)',
  'Kementerian Kesehatan RI',
  'PT Indofood CBP Sukses Makmur',
  'National University of Singapore (NUS)',
  'Monash University Malaysia',
  'PT Kimia Farma Tbk',
  'Harvard Medical School Research Lab',
  'PT Nutrifood Indonesia',
  'World Health Organization (WHO) Indonesia',
];

const MBKM_STATUS_OPTIONS = ['Selesai', 'Selesai', 'Evaluasi', 'Sedang Berjalan', 'Selesai'];
const MBKM_SKS_OPTIONS = [20, 20, 18, 16, 20, 20, 12, 20];

export const generateMbkmDataset = () => {
  if (!Array.isArray(mahasiswaData) || mahasiswaData.length === 0) return [];

  const enrichedStudents = enrichStudentData(mahasiswaData);

  const sem7Students = enrichedStudents.filter(
    (m) => String(m.status_keaktifan || '').toLowerCase().trim() === 'aktif' && Number(m.angkatan) === 2023
  );
  const cohort2022Students = enrichedStudents.filter(
    (m) => String(m.status_keaktifan || '').toLowerCase().trim() === 'aktif' && Number(m.angkatan) === 2022
  );

  const sem7Participants = sem7Students.filter((_, idx) => idx % 3 === 0);
  const cohort2022Participants = cohort2022Students.filter((_, idx) => idx % 4 === 0);

  const candidateParticipants = [...sem7Participants, ...cohort2022Participants];

  return candidateParticipants.map((m, idx) => {
    const cleanProdi = String(m.program_studi || '').replace(/\s*\(Akun Lama\)\s*$/i, '').trim();
    const cleanFaculty = getFacultyByProdi(cleanProdi, m.fakultas);
    const jenisAktifitas = MBKM_ACTIVITY_TYPES[idx % MBKM_ACTIVITY_TYPES.length];
    const mitra = MBKM_MITRA_LIST[idx % MBKM_MITRA_LIST.length];
    const statusAktifitas = MBKM_STATUS_OPTIONS[idx % MBKM_STATUS_OPTIONS.length];
    const sksKonversi = MBKM_SKS_OPTIONS[idx % MBKM_SKS_OPTIONS.length];

    return {
      nim: m.nim,
      nama: m.nama,
      angkatan: Number(m.angkatan),
      semester: Number(m.semester) || 1,
      periode: m.periode || 'semester ganjil 2024/2025',
      program_studi: cleanProdi,
      fakultas: cleanFaculty,
      jenjang: m.jenjang || 'S1',
      status_keaktifan: m.status_keaktifan || 'Aktif',
      jenis_aktifitas: jenisAktifitas,
      mitra: mitra,
      status_aktifitas: statusAktifitas,
      sks_konversi: sksKonversi,
    };
  });
};

export const mbkmData = generateMbkmDataset();
