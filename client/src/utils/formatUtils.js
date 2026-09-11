export const formatGpa = (val) => {
  if (val === undefined || val === null || isNaN(Number(val))) return '0.00';
  return Number(val).toFixed(2);
};

export const formatNumber = (val) => {
  if (val === undefined || val === null || isNaN(Number(val))) return '0';
  return Number(val).toLocaleString('id-ID');
};

export const formatPercent = (val) => {
  if (val === undefined || val === null) return '0%';
  if (typeof val === 'string' && val.endsWith('%')) return val;
  if (isNaN(Number(val))) return '0%';
  return `${Number(val).toFixed(1)}%`;
};
