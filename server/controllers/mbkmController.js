import {
  getFilteredMbkmRepository,
  calculateMbkmParticipationRate,
  calculateTotalMbkmParticipants,
  groupMbkmByActivityType,
  groupMbkmByMitra,
  getMbkmAnalyticsData,
} from '../services/mbkmCalculationService.js';
import { mbkmData } from '../data/mbkmData.js';

export const getMbkmRepository = (req, res) => {
  try {
    const {
      search,
      faculties,
      prodis,
      activityType,
      status,
      page,
      limit,
      sortBy,
      sortOrder,
    } = req.query;

    const parsedFaculties = faculties ? (Array.isArray(faculties) ? faculties : faculties.split(',')) : [];
    const parsedProdis = prodis ? (Array.isArray(prodis) ? prodis : prodis.split(',')) : [];

    const result = getFilteredMbkmRepository({
      search,
      faculties: parsedFaculties,
      prodis: parsedProdis,
      activityType,
      status,
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

export const getMbkmAnalytics = (req, res) => {
  try {
    const data = getMbkmAnalyticsData();
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMbkmKpis = (req, res) => {
  try {
    const participation = calculateMbkmParticipationRate(mbkmData);
    const participants = calculateTotalMbkmParticipants(mbkmData);
    const activities = groupMbkmByActivityType(mbkmData);
    const mitras = groupMbkmByMitra(mbkmData);

    res.json({
      success: true,
      data: {
        participationRate: participation,
        participants,
        activityDistribution: activities,
        topMitras: mitras.slice(0, 10),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
