import {
  getDashboardSummaryMetrics,
  getInteractiveMetricDetail,
} from '../services/dashboardCalculationService.js';

export const getExecutiveSummary = (req, res) => {
  try {
    const summary = getDashboardSummaryMetrics();
    res.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMetricModalDetails = (req, res) => {
  try {
    const { metricKey } = req.params;
    const details = getInteractiveMetricDetail(metricKey);
    res.json({
      success: true,
      data: details,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
