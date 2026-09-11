import {
  getFilteredStudentsRepository,
  calculateTotalActiveStudents,
  calculateForeignStudentsMetric,
  calculateActiveIntakeMetric,
  calculateFiveYearIntakeTrend,
  groupActiveStudentsByProdi,
  groupActiveStudentsByFaculty,
  groupActiveStudentsByJenjang,
  getForeignStudentTrend5Years,
  getIntakeTrend5Years,
  getIntakeFluctuation5Years,
  getEnrichedStudents,
} from '../services/studentCalculationService.js';

export const getStudentsRepository = (req, res) => {
  try {
    const {
      search,
      faculties,
      prodis,
      status,
      nationality,
      periodeTerm,
      semesters,
      angkatan,
      timeHorizon,
      customYears,
      page,
      limit,
      sortBy,
      sortOrder,
    } = req.query;

    const parsedFaculties = faculties ? (Array.isArray(faculties) ? faculties : faculties.split(',')) : [];
    const parsedProdis = prodis ? (Array.isArray(prodis) ? prodis : prodis.split(',')) : [];
    const parsedSemesters = semesters ? (Array.isArray(semesters) ? semesters : semesters.split(',')) : [];
    const parsedAngkatan = angkatan ? (Array.isArray(angkatan) ? angkatan : angkatan.split(',')).map(Number) : [];
    const parsedCustomYears = customYears ? (Array.isArray(customYears) ? customYears : customYears.split(',')).map(Number) : [];

    const result = getFilteredStudentsRepository({
      search,
      faculties: parsedFaculties,
      prodis: parsedProdis,
      status,
      nationality,
      periodeTerm,
      semesters: parsedSemesters,
      angkatan: parsedAngkatan,
      timeHorizon,
      customYears: parsedCustomYears,
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 50,
      sortBy: sortBy || 'nim',
      sortOrder: sortOrder || 'asc',
    });

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStudentAnalytics = (req, res) => {
  try {
    const students = getEnrichedStudents();
    const data = {
      prodiData: groupActiveStudentsByProdi(students),
      facultyData: groupActiveStudentsByFaculty(students),
      jenjangData: groupActiveStudentsByJenjang(students),
      foreignTrend: getForeignStudentTrend5Years(students),
      intakeTrend: getIntakeTrend5Years(students),
      intakeFluctuation: getIntakeFluctuation5Years(students),
      foreignMetric: calculateForeignStudentsMetric(students),
      intakeMetric: calculateActiveIntakeMetric(students),
      totalActive: calculateTotalActiveStudents(students),
    };

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStudentKpis = (req, res) => {
  try {
    const students = getEnrichedStudents();
    const totalActive = calculateTotalActiveStudents(students);
    const foreign = calculateForeignStudentsMetric(students);
    const intake = calculateActiveIntakeMetric(students);
    const intakeTrend = calculateFiveYearIntakeTrend(students);

    res.json({
      success: true,
      data: {
        totalActive,
        foreign,
        intake,
        intakeTrend,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
