import { apiClient } from './apiClient';

export const GraduateService = {
  getGraduatesRepository: (params) => apiClient.getGraduatesRepository(params),
  getGraduateKpis: () => apiClient.getGraduateKpis(),
};

export default GraduateService;
