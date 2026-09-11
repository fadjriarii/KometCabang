import {
  getFilteredGraduatesRepository,
  calculateTotalGraduatesCount,
  calculateAverageGpa,
  groupGpaByProgramStudi,
  calculateOnTimeGraduationRate,
  calculateStudySuccessRate,
  getGraduateAnalyticsData,
} from '../services/graduateCalculationService.js';
import { kelulusanData } from '../data/KomatQAmit_DB_DataDump.js';

export const getGraduatesRepository = (req, res) => {
  try {
    const {
      search,
      faculties,
      prodis,
      degree,
      predicate,
      yearRange,
      page,
      limit,
      sortBy,
      sortOrder,
    } = req.query;

    const parsedFaculties = faculties ? (Array.isArray(faculties) ? faculties : faculties.split(',')) : [];
    const parsedProdis = prodis ? (Array.isArray(prodis) ? prodis : prodis.split(',')) : [];

    const result = getFilteredGraduatesRepository({
      search,
      faculties: parsedFaculties,
      prodis: parsedProdis,
      degree,
      predicate,
      yearRange,
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

export const getGraduateAnalytics = (req, res) => {
  try {
    const data = getGraduateAnalyticsData();
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGraduateKpis = (req, res) => {
  try {
    const totalGraduates = calculateTotalGraduatesCount(kelulusanData);
    const averageGpaS1 = calculateAverageGpa(kelulusanData, 'S1');
    const averageGpaS2 = calculateAverageGpa(kelulusanData, 'S2');
    const onTimeGraduation = calculateOnTimeGraduationRate(kelulusanData);
    const studySuccess = calculateStudySuccessRate(kelulusanData);

    res.json({
      success: true,
      data: {
        totalGraduates,
        averageGpa: {
          s1: averageGpaS1,
          s2: averageGpaS2,
          combined: Number(((averageGpaS1 + averageGpaS2) / 2).toFixed(2)),
        },
        onTimeGraduation,
        studySuccess,
        gpaByProgram: groupGpaByProgramStudi(kelulusanData),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
