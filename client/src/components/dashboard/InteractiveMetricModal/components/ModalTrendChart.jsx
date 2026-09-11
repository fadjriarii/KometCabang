import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts';

const ModalChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-surface-container-high bg-white px-3 py-2 shadow-xl">
      <p className="text-xs font-semibold text-on-surface">{label}</p>
      <p className="text-xs text-on-surface-variant tabular-nums mt-0.5">
        Capaian: <span className="font-bold text-primary">{item.payload?.val || item.value}</span>
      </p>
      {item.payload?.delta && (
        <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
          Delta: {item.payload.delta}
        </p>
      )}
    </div>
  );
};

export const ModalTrendChart = ({ points = [] }) => {
  const [chartType, setChartType] = useState('area');

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <h4 className="font-headline-sm text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary"></span> Visualisasi Tren Data (5
          Tahun Terakhir)
        </h4>
        <div className="inline-flex items-center rounded-lg border border-surface-container-high bg-surface-container-low p-0.5">
          <button
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              chartType === 'area'
                ? 'bg-white text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
            onClick={() => setChartType('area')}
          >
            📈 Line Chart
          </button>
          <button
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              chartType === 'bar'
                ? 'bg-white text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
            onClick={() => setChartType('bar')}
          >
            📊 Bar Chart
          </button>
        </div>
      </div>

      <div className="bg-surface-container-low/50 border border-surface-container-high/60 rounded-xl p-4">
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart
                data={points}
                margin={{ top: 12, right: 12, bottom: 0, left: -20 }}
              >
                <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="3 3" />
                <XAxis
                  dataKey="short"
                  tick={{ fontSize: 10, fill: '#6f7882' }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: '#6f7882' }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={true}
                />
                <RechartsTooltip content={<ModalChartTooltip />} />
                <Bar
                  dataKey="num"
                  fill="#006192"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive
                />
              </BarChart>
            ) : (
              <AreaChart
                data={points}
                margin={{ top: 12, right: 12, bottom: 0, left: -20 }}
              >
                <defs>
                  <linearGradient id="modalAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#006192" stopOpacity={0.32} />
                    <stop offset="100%" stopColor="#006192" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="3 3" />
                <XAxis
                  dataKey="short"
                  tick={{ fontSize: 10, fill: '#6f7882' }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: '#6f7882' }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={true}
                />
                <RechartsTooltip content={<ModalChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="num"
                  stroke="#006192"
                  strokeWidth={2.5}
                  fill="url(#modalAreaGradient)"
                  dot={{ r: 3.5, fill: '#006192', strokeWidth: 0 }}
                  activeDot={{ r: 5.5, fill: '#006192', stroke: '#cce5ff', strokeWidth: 2 }}
                  isAnimationActive
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ModalTrendChart;
