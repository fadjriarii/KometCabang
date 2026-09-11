import { apiClient } from './apiClient';

export const StudentService = {
  getStudentsRepository: (params) => apiClient.getStudentsRepository(params),
  getExecutiveMetrics: () => apiClient.getStudentKpis(),
};

export default StudentService;
