import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { OnTimeTooltip } from './OnTimeTooltips';

export const OnTimeS1Section = ({ onTimeCohortData = [], onTimeChartData = [] }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2.5 p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-950">
        <span className="material-symbols-outlined text-[18px] text-amber-700 shrink-0 mt-0.5">info</span>
        <div>
          <p className="font-semibold text-amber-900">Evaluasi Kelulusan Tepat Waktu (S1):</p>
          <p className="text-amber-800/90 text-[11px] mt-0.5 leading-relaxed">
            Tabel menyajikan data 6 angkatan secara individual (satu per satu). Persentase dihitung untuk 5 angkatan yang telah menyelesaikan masa studi 4 tahun. Angkatan terbaru ({onTimeCohortData[0]?.cohort || 2022}) berstatus sedang berjalan sehingga belum dihitung dalam persentase.
          </p>
        </div>
      </div>

      <div className="bg-surface-container-low/40 border border-surface-container-high/60 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h4 className="font-headline-sm text-sm font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
              Persentase Kelulusan Tepat Waktu per Angkatan (S1)
            </h4>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Tren kelulusan tepat 4 tahun untuk 6 angkatan terakhir
            </p>
          </div>
          <div className="inline-flex items-center gap-3 text-xs bg-white px-3 py-1.5 rounded-lg border border-surface-container-high shadow-xs">
            <span className="flex items-center gap-1.5 font-medium text-on-surface">
              <span className="w-3 h-3 rounded bg-amber-500/40 border border-amber-600" /> % Tepat Waktu
            </span>
            <span className="flex items-center gap-1.5 font-medium text-on-surface">
              <span className="w-3 h-3 rounded bg-primary/20 border border-primary" /> Total Intake
            </span>
          </div>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={onTimeChartData} margin={{ top: 16, right: 24, bottom: 8, left: -10 }}>
              <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="3 3" />
              <XAxis dataKey="cohortLabel" tick={{ fontSize: 11, fill: '#6f7882' }} tickLine={false} />
              <YAxis yAxisId="left" unit="%" tick={{ fontSize: 11, fill: '#6f7882' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#6f7882' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <RechartsTooltip content={<OnTimeTooltip />} />
              <Bar yAxisId="right" dataKey="intake" name="Total Intake Angkatan" fill="#006192" opacity={0.25} radius={[4, 4, 0, 0]} barSize={36} />
              <Area yAxisId="left" type="monotone" dataKey="rate" name="% Tepat Waktu" stroke="#d97706" strokeWidth={3} fill="#d97706" fillOpacity={0.15} dot={{ r: 4.5, fill: '#d97706' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-surface-container-low/30 border border-surface-container-high/60 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <h5 className="text-xs font-bold text-on-surface uppercase tracking-wider">
            Tabel Evaluasi Kelulusan Tepat Waktu — S1 (6 Angkatan)
          </h5>
          <span className="text-[11px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">Tepat Waktu = 4 Thn</span>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-container-low/80 border-b border-surface-container-high text-outline text-[11px] font-semibold">
            <tr>
              <th className="py-2.5 px-4">Angkatan</th>
              <th className="py-2.5 px-4 text-center">Tahun Lulus Tepat</th>
              <th className="py-2.5 px-4 text-right">Lulus &lt; 4 Thn</th>
              <th className="py-2.5 px-4 text-right">Lulus Tepat (4 Thn)</th>
              <th className="py-2.5 px-4 text-right">Lulus &gt; 4 Thn</th>
              <th className="py-2.5 px-4 text-right">Intake</th>
              <th className="py-2.5 px-4 text-right">% Tepat Waktu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-high/60 bg-surface-container-lowest font-medium">
            {onTimeCohortData.map((row) => (
              <tr key={row.cohort} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="py-2.5 px-4 text-on-surface font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span>{row.cohortLabel}</span>
                    {row.isIncomplete && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                        Sedang Berjalan
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-2.5 px-4 text-center text-on-surface-variant font-medium">
                  {row.tahunLulusTepat}
                  {row.isIncomplete ? '*' : ''}
                </td>
                <td className="py-2.5 px-4 text-right text-sky-700 font-semibold tabular-nums">{row.fastCount || 0} mhs</td>
                <td className="py-2.5 px-4 text-right text-emerald-700 font-bold tabular-nums">
                  {row.onTimeCount} mhs
                </td>
                <td className="py-2.5 px-4 text-right text-rose-600 tabular-nums">{row.lateCount} mhs</td>
                <td className="py-2.5 px-4 text-right text-primary font-semibold tabular-nums">{row.intake} mhs</td>
                <td className="py-2.5 px-4 text-right font-extrabold text-amber-700 tabular-nums">
                  {row.isIncomplete ? (
                    <span className="text-outline font-semibold italic" title="Data kelulusan reguler belum lengkap">-*</span>
                  ) : (
                    row.rateFormatted
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OnTimeS1Section;
