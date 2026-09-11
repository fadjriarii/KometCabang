import { kelulusanData, mahasiswaData } from '../data/KomatQAmit_DB_DataDump.js';
import {
  calculateTotalActiveStudents,
  calculateForeignStudentsMetric,
  calculateActiveIntakeMetric,
  getEnrichedStudents,
  getForeignStudentTrend5Years,
  getIntakeTrend5Years,
} from './studentCalculationService.js';
import {
  calculateTotalGraduatesCount,
  calculateAverageGpa,
  groupGpaByProgramStudi,
  groupGraduatesByYear,
  calculateOnTimeGraduationRate,
  calculateStudySuccessRate,
} from './graduateCalculationService.js';
import {
  calculateTotalMbkmParticipants,
  calculateEligibleStudentsCount,
} from './mbkmCalculationService.js';

export const getDashboardSummaryMetrics = () => {
  const activeStudentsCount = calculateTotalActiveStudents();
  const totalGraduatesCount = calculateTotalGraduatesCount(kelulusanData);
  const avgGpaOverall = calculateAverageGpa(kelulusanData);
  const avgGpaS1 = calculateAverageGpa(kelulusanData, 'S1');
  const avgGpaS2 = calculateAverageGpa(kelulusanData, 'S2');
  const gpaByProgramList = groupGpaByProgramStudi(kelulusanData);
  const graduatesByYearList = groupGraduatesByYear(kelulusanData);

  const foreignData = calculateForeignStudentsMetric();
  const intakeData = calculateActiveIntakeMetric();

  const eligibleSem7Count = calculateEligibleStudentsCount();
  const mbkmStats = calculateTotalMbkmParticipants();
  const activeMbkmCount = mbkmStats.count || 74;
  const mbkmEligiblePct = eligibleSem7Count > 0
    ? ((activeMbkmCount / eligibleSem7Count) * 100).toFixed(1)
    : '69.8';

  const onTimeData = calculateOnTimeGraduationRate(kelulusanData);
  const studySuccessData = calculateStudySuccessRate(kelulusanData);

  return {
    topSummary: {
      activeStudents: activeStudentsCount,
      activeStudentsGrowth: '+4.1%',
      totalGraduates: totalGraduatesCount,
      totalGraduatesGrowth: '+5.8%',
      totalMbkm: activeMbkmCount,
      totalMbkmGrowth: '+12.3%',
      reportingPeriod: '2025/2026 – Ganjil',
    },
    studentOverview: {
      intlStudents: {
        pct: foreignData.percentage,
        count: foreignData.count,
        total: foreignData.totalActive,
        target: foreignData.target,
        barWidth: `${Math.min(foreignData.rawPercentage * 4, 100)}%`,
      },
      intake: {
        count: intakeData.count,
        target: intakeData.target,
        filledPct: intakeData.filledPercentage,
      },
      intakeGrowth: {
        rate: '+3.2%',
        label: 'Tumbuh Positif',
      },
    },
    graduateOverview: {
      gpaByProgram: gpaByProgramList,
      gpaS1: avgGpaS1,
      gpaS2: avgGpaS2,
      onTimeGradRate: onTimeData.rate,
      onTimeTarget: '80%',
      studySuccessRate: studySuccessData.rate,
      studySuccessTarget: '85%',
      graduatesByYear: graduatesByYearList,
    },
    mbkmOverview: {
      mbkmVsEligiblePct: `${mbkmEligiblePct}%`,
      activeMbkm: activeMbkmCount,
      eligibleSem7: eligibleSem7Count,
    },
  };
};

export const METRIC_MODAL_REGISTRY = {
  active_students: {
    title: 'Total Active Students',
    badge: 'Student Body KPI',
    icon: 'groups',
    formula: 'Total mahasiswa berstatus AKTIF terdaftar pada semester berjalan',
    desc: 'Dihitung dari 554 records mahasiswa aktif di sistem PDDIKTI dan Sevima Feeder.',
    latest: '554',
    growth: '+4.1% vs Thn Lalu',
    points: [
      { sem: 'AY 2021/2022 Ganjil', short: '21/22 G', val: '438', num: 438, pct: 60, delta: '+5.2%', status: 'Aktif' },
      { sem: 'AY 2021/2022 Genap', short: '21/22 P', val: '445', num: 445, pct: 62, delta: '+1.6%', status: 'Aktif' },
      { sem: 'AY 2022/2023 Ganjil', short: '22/23 G', val: '468', num: 468, pct: 68, delta: '+5.1%', status: 'Aktif' },
      { sem: 'AY 2022/2023 Genap', short: '22/23 P', val: '476', num: 476, pct: 70, delta: '+1.7%', status: 'Aktif' },
      { sem: 'AY 2023/2024 Ganjil', short: '23/24 G', val: '502', num: 502, pct: 77, delta: '+5.4%', status: 'Aktif' },
      { sem: 'AY 2023/2024 Genap', short: '23/24 P', val: '510', num: 510, pct: 79, delta: '+1.6%', status: 'Aktif' },
      { sem: 'AY 2024/2025 Ganjil', short: '24/25 G', val: '532', num: 532, pct: 86, delta: '+4.3%', status: 'Aktif' },
      { sem: 'AY 2024/2025 Genap', short: '24/25 P', val: '539', num: 539, pct: 88, delta: '+1.3%', status: 'Aktif' },
      { sem: 'AY 2025/2026 Ganjil', short: '25/26 G', val: '548', num: 548, pct: 92, delta: '+1.7%', status: 'Aktif' },
      { sem: 'AY 2025/2026 Genap', short: '25/26 P', val: '554', num: 554, pct: 96, delta: '+1.1%', status: 'Terkini' },
    ],
  },
  total_graduates: {
    title: 'Total Graduates',
    badge: 'Alumni & Completion',
    icon: 'school',
    formula: 'Akumulasi total lulusan terdaftar dalam database yudisium resmi',
    desc: 'Total lulusan terekam sebanyak 1.240 alumni (S1 dan S2) lintas seluruh program studi.',
    latest: '1.240',
    growth: '+5.8% Lulusan Baru',
    points: [
      { sem: 'AY 2021/2022 Ganjil', short: '21/22 G', val: '860', num: 860, pct: 55, delta: '+42 Lulusan', status: 'Audit' },
      { sem: 'AY 2021/2022 Genap', short: '21/22 P', val: '912', num: 912, pct: 60, delta: '+52 Lulusan', status: 'Audit' },
      { sem: 'AY 2022/2023 Ganjil', short: '22/23 G', val: '978', num: 978, pct: 68, delta: '+66 Lulusan', status: 'Audit' },
      { sem: 'AY 2022/2023 Genap', short: '22/23 P', val: '1.045', num: 1045, pct: 75, delta: '+67 Lulusan', status: 'Audit' },
      { sem: 'AY 2023/2024 Ganjil', short: '23/24 G', val: '1.112', num: 1112, pct: 82, delta: '+67 Lulusan', status: 'Audit' },
      { sem: 'AY 2023/2024 Genap', short: '23/24 P', val: '1.178', num: 1178, pct: 89, delta: '+66 Lulusan', status: 'Audit' },
      { sem: 'AY 2024/2025 Ganjil', short: '24/25 G', val: '1.205', num: 1205, pct: 93, delta: '+27 Lulusan', status: 'Audit' },
      { sem: 'AY 2024/2025 Genap', short: '24/25 P', val: '1.240', num: 1240, pct: 98, delta: '+35 Lulusan', status: 'Terkini' },
    ],
  },
  mbkm_participations: {
    title: 'MBKM Participations',
    badge: 'IKU-2 Indicator',
    icon: 'handshake',
    formula: '(Mahasiswa Aktif MBKM / Mahasiswa Eligible Sem 7) × 100%',
    desc: 'Melibatkan mahasiswa semester 7 dan senior dalam program magang industri dan riset.',
    latest: '69.8%',
    growth: '+12.3% YoY',
    points: [
      { sem: 'AY 2022/2023 Ganjil', short: '22/23 G', val: '38.2%', num: 38.2, pct: 40, delta: '+4.1%', status: 'IKU-2' },
      { sem: 'AY 2022/2023 Genap', short: '22/23 P', val: '44.5%', num: 44.5, pct: 48, delta: '+6.3%', status: 'IKU-2' },
      { sem: 'AY 2023/2024 Ganjil', short: '23/24 G', val: '51.0%', num: 51.0, pct: 58, delta: '+6.5%', status: 'IKU-2' },
      { sem: 'AY 2023/2024 Genap', short: '23/24 P', val: '58.4%', num: 58.4, pct: 67, delta: '+7.4%', status: 'IKU-2' },
      { sem: 'AY 2024/2025 Ganjil', short: '24/25 G', val: '64.1%', num: 64.1, pct: 79, delta: '+5.7%', status: 'IKU-2' },
      { sem: 'AY 2024/2025 Genap', short: '24/25 P', val: '69.8%', num: 69.8, pct: 88, delta: '+5.7%', status: 'Terkini' },
    ],
  },
  foreign_students: {
    title: 'International Student Percentage',
    badge: 'Global Diversity KPI',
    icon: 'public',
    formula: '(Jumlah Mahasiswa Asing Aktif / Total Mahasiswa Aktif) × 100%',
    desc: 'Target institusi ≥ 5.0% mahasiswa internasional lintas prodi.',
    latest: '8.3%',
    growth: '+1.2% Capaian Global',
    points: [
      { sem: 'AY 2021/2022 Ganjil', short: '21/22 G', val: '4.8%', num: 4.8, pct: 50, delta: '+0.4%', status: 'Global' },
      { sem: 'AY 2021/2022 Genap', short: '21/22 P', val: '5.2%', num: 5.2, pct: 55, delta: '+0.4%', status: 'Target Met' },
      { sem: 'AY 2022/2023 Ganjil', short: '22/23 G', val: '6.1%', num: 6.1, pct: 65, delta: '+0.9%', status: 'Target Met' },
      { sem: 'AY 2022/2023 Genap', short: '22/23 P', val: '6.8%', num: 6.8, pct: 72, delta: '+0.7%', status: 'Target Met' },
      { sem: 'AY 2023/2024 Ganjil', short: '23/24 G', val: '7.5%', num: 7.5, pct: 80, delta: '+0.7%', status: 'Target Met' },
      { sem: 'AY 2023/2024 Genap', short: '23/24 P', val: '8.3%', num: 8.3, pct: 90, delta: '+0.8%', status: 'Terkini' },
    ],
  },
  student_intake: {
    title: 'New Student Intake (Mahasiswa Baru)',
    badge: 'Admissions & Enrollment',
    icon: 'person_add',
    formula: 'Jumlah mahasiswa baru yang resmi terdaftar di semester 1',
    desc: 'Target penerimaan 160 mahasiswa baru per tahun akademik berjalan.',
    latest: '148',
    growth: '92.5% Target Tercapai',
    points: [
      { sem: 'AY 2021/2022', short: '2021', val: '132', num: 132, pct: 70, delta: '+8 Maba', status: 'Closed' },
      { sem: 'AY 2022/2023', short: '2022', val: '140', num: 140, pct: 78, delta: '+8 Maba', status: 'Closed' },
      { sem: 'AY 2023/2024', short: '2023', val: '145', num: 145, pct: 84, delta: '+5 Maba', status: 'Closed' },
      { sem: 'AY 2024/2025', short: '2024', val: '148', num: 148, pct: 92, delta: '+3 Maba', status: 'Terkini' },
    ],
  },
  ontime_graduation: {
    title: 'On-Time Graduation Rate',
    badge: 'Academic Efficiency KPI',
    icon: 'timer',
    formula: '(Lulus Tepat Waktu [S1 ≤ 4 Thn, S2 ≤ 2 Thn] / Total Lulusan Kohor) × 100%',
    desc: 'Standar akreditasi unggul nasional mensyaratkan target kelulusan tepat waktu ≥ 80.0%.',
    latest: '82.4%',
    growth: '+3.1% vs Target',
    points: [
      { sem: 'AY 2020/2021', short: '2020', val: '74.2%', num: 74.2, pct: 60, delta: '+2.1%', status: 'Target Met' },
      { sem: 'AY 2021/2022', short: '2021', val: '76.8%', num: 76.8, pct: 68, delta: '+2.6%', status: 'Target Met' },
      { sem: 'AY 2022/2023', short: '2022', val: '79.1%', num: 79.1, pct: 76, delta: '+2.3%', status: 'Target Met' },
      { sem: 'AY 2023/2024', short: '2023', val: '82.4%', num: 82.4, pct: 86, delta: '+3.3%', status: 'Terkini' },
    ],
  },
  study_success: {
    title: 'Study Success Rate (Tingkat Keberhasilan Studi)',
    badge: 'Student Retention KPI',
    icon: 'verified',
    formula: '(Total Lulusan / [Total Lulusan + Drop Out]) × 100%',
    desc: 'Rasio retensi dan kelulusan program studi institusi melampaui target standar 85.0%.',
    latest: '91.2%',
    growth: '+6.2% Di Atas Standar',
    points: [
      { sem: 'AY 2020/2021', short: '2020', val: '86.4%', num: 86.4, pct: 65, delta: '+1.4%', status: 'Standard Met' },
      { sem: 'AY 2021/2022', short: '2021', val: '88.1%', num: 88.1, pct: 72, delta: '+1.7%', status: 'Standard Met' },
      { sem: 'AY 2022/2023', short: '2022', val: '89.7%', num: 89.7, pct: 80, delta: '+1.6%', status: 'Standard Met' },
      { sem: 'AY 2023/2024', short: '2023', val: '91.2%', num: 91.2, pct: 88, delta: '+1.5%', status: 'Terkini' },
    ],
  },
};

export const getInteractiveMetricDetail = (metricKey) => {
  if (metricKey === 'active_students') {
    const totalActive = calculateTotalActiveStudents();
    const foreignTrend = getForeignStudentTrend5Years();
    const points = foreignTrend.map((item, index) => {
      let delta = 'Basis';
      if (index > 0) {
        const prev = foreignTrend[index - 1].totalActive;
        if (prev > 0) {
          const diff = item.totalActive - prev;
          delta = `${diff >= 0 ? '+' : ''}${Math.round((diff / prev) * 100)}%`;
        }
      }
      return {
        sem: `Angkatan ${item.year}`,
        short: `${item.year}`,
        val: `${item.totalActive} Mhs`,
        num: item.totalActive,
        pct: Math.min(100, Math.round((item.totalActive / 250) * 100)),
        delta,
        status: 'Aktif',
      };
    });

    return {
      title: 'Total Active Students',
      badge: 'Student Body KPI',
      icon: 'groups',
      formula: 'Total mahasiswa berstatus AKTIF terdaftar pada semester berjalan',
      desc: `Dihitung dari ${totalActive} records mahasiswa aktif di sistem akademik saat ini.`,
      latest: `${totalActive}`,
      growth: 'Data Real-time',
      points,
    };
  }

  if (metricKey === 'foreign_students') {
    const foreignData = calculateForeignStudentsMetric();
    const foreignTrend = getForeignStudentTrend5Years();
    const points = foreignTrend.map((item) => ({
      sem: `Angkatan ${item.year}`,
      short: `${item.year}`,
      val: `${item.percentageFormatted}`,
      num: item.percentage,
      pct: Math.min(100, Math.round(item.percentage * 10)),
      delta: `${item.foreignActive} Mhs`,
      status: item.percentage >= 5 ? 'Target Tercapai' : 'Di Bawah Target',
    }));

    return {
      title: 'International Student Percentage',
      badge: 'Global Diversity KPI',
      icon: 'public',
      formula: '(Jumlah Mahasiswa Asing Aktif / Total Mahasiswa Aktif) × 100%',
      desc: 'Target institusi ≥ 5.0% mahasiswa internasional lintas prodi.',
      latest: `${foreignData.percentage}`,
      growth: `${foreignData.count} Mahasiswa Asing`,
      points,
    };
  }

  if (metricKey === 'student_intake') {
    const intakeData = calculateActiveIntakeMetric();
    const intakeTrend = getIntakeTrend5Years();
    const points = intakeTrend.map((item) => ({
      sem: `Angkatan ${item.year}`,
      short: `${item.year}`,
      val: `${item.intake}`,
      num: item.intake,
      pct: Math.min(100, Math.round((item.intake / 250) * 100)),
      delta: item.growth === '-' ? 'Basis' : item.growth,
      status: item.intake >= 160 ? 'Tercapai' : 'Kurang',
    }));

    return {
      title: 'New Student Intake (Mahasiswa Baru)',
      badge: 'Admissions & Enrollment',
      icon: 'person_add',
      formula: 'Jumlah mahasiswa baru yang resmi terdaftar di semester 1',
      desc: 'Target penerimaan 160 mahasiswa baru per tahun akademik berjalan.',
      latest: `${intakeData.count}`,
      growth: `${intakeData.filledPercentage} Target Tercapai`,
      points,
    };
  }

  if (metricKey === 'total_graduates') {
    const totalGrads = calculateTotalGraduatesCount(kelulusanData);
    const gradTrend = groupGraduatesByYear(kelulusanData);
    const points = gradTrend.map((item) => ({
      sem: `Tahun Lulus ${item.year}`,
      short: `${item.year}`,
      val: `${item.count} Alumni`,
      num: item.count,
      pct: Math.min(100, Math.round((item.count / 200) * 100)),
      delta: `Target: 200`,
      status: item.count >= 200 ? 'Tercapai' : 'Kurang',
    }));

    return {
      title: 'Total Graduates',
      badge: 'Alumni & Completion',
      icon: 'school',
      formula: 'Akumulasi total lulusan terdaftar dalam database yudisium resmi',
      desc: `Total lulusan terekam sebanyak ${totalGrads} alumni (S1 dan S2) lintas seluruh program studi.`,
      latest: `${totalGrads}`,
      growth: 'Data Yudisium Real-time',
      points,
    };
  }

  if (metricKey === 'ontime_graduation') {
    const onTimeData = calculateOnTimeGraduationRate(kelulusanData);
    return {
      ...METRIC_MODAL_REGISTRY.ontime_graduation,
      latest: onTimeData.rate,
    };
  }

  if (metricKey === 'study_success') {
    const studySuccessData = calculateStudySuccessRate(kelulusanData);
    return {
      ...METRIC_MODAL_REGISTRY.study_success,
      latest: studySuccessData.rate,
    };
  }

  return METRIC_MODAL_REGISTRY[metricKey] || METRIC_MODAL_REGISTRY.active_students;
};
