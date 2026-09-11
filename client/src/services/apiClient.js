const API_BASE = '/api';

export const buildQueryString = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '' && value !== 'all') {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          query.append(key, value.join(','));
        }
      } else {
        query.append(key, String(value));
      }
    }
  });
  const qs = query.toString();
  return qs ? `?${qs}` : '';
};

export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || `Request failed with status ${res.status}`);
  }

  const json = await res.json();
  if (json.data !== undefined) {
    if (json.metrics !== undefined || json.pagination !== undefined || json.filterOptions !== undefined) {
      return json;
    }
    return json.data;
  }
  return json;
}

export const apiClient = {
  getExecutiveSummary: () => apiFetch('/executive-summary'),
  getMetricModalDetails: (metricKey) => apiFetch(`/executive-summary/modal/${metricKey}`),
  getStudentsRepository: (params) => apiFetch(`/students${buildQueryString(params)}`),
  getStudentKpis: () => apiFetch('/students/kpis'),
  getStudentAnalytics: () => apiFetch('/students/analytics'),
  getGraduatesRepository: (params) => apiFetch(`/graduates${buildQueryString(params)}`),
  getGraduateKpis: () => apiFetch('/graduates/kpis'),
  getGraduateAnalytics: (params) => apiFetch(`/graduates/analytics${buildQueryString(params)}`),
  getMbkmRepository: (params) => apiFetch(`/mbkm${buildQueryString(params)}`),
  getMbkmKpis: () => apiFetch('/mbkm/kpis'),
  getMbkmAnalytics: () => apiFetch('/mbkm/analytics'),
};

export default apiClient;
