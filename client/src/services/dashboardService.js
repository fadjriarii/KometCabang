import { apiClient } from './apiClient';

export const DashboardService = {
  getDashboardMetrics: () => apiClient.getExecutiveSummary(),
  getMetricModalDetails: (metricKey) => apiClient.getMetricModalDetails(metricKey),
};

export default DashboardService;
