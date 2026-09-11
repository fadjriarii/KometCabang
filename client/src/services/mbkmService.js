import { apiClient } from './apiClient';

export const MbkmService = {
  getMbkmRepository: (params) => apiClient.getMbkmRepository(params),
  getMbkmKpis: () => apiClient.getMbkmKpis(),
};

export default MbkmService;
