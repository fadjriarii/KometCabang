import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { SuccessTooltip } from './StudySuccessTooltips';

export const StudySuccessS1Section = ({ successCohortData = [], successChartData = [] }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2.5 p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs text-emerald-950">
        <span className="material-symbols-outlined text-[18px] text-emerald-700 shrink-0 mt-0.5">info</span>
        <div>
          <p className="font-semibold text-emerald-900">Evaluasi Keberhasilan Studi (S1):</p>
          <p className="text-emerald-800/90 text-[11px] mt-0.5 leading-relaxed">
            Tabel menyajikan data 6 angkatan secara individual (satu per satu). Persentase dihitung untuk 5 angkatan yang telah melewati siklus studi 7 tahun. Angkatan terbaru ({successCohortData[0]?.cohort || 2022}) berstatus sedang berjalan sehingga belum dihitung dalam persentase.
          </p>
        </div>
      </div>

      <div className="bg-surface-container-low/40 border border-surface-container-high/60 rounded-xl p-5">
        <h4 className="font-headline-sm text-sm font-bold text-on-surface uppercase tracking-wider mb-1 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
          Tingkat Keberhasilan Studi per Angkatan (S1)
        </h4>
        <p className="text-xs text-on-surface-variant mb-4">
          Rasio mahasiswa S1 yang lulus dalam batas 7 tahun terhadap total intake angkatan (6 angkatan terakhir)
        </p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={successChartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="cohortLabel" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
              <RechartsTooltip content={<SuccessTooltip />} />
              <Bar dataKey="rate" name="Keberhasilan Studi (%)" fill="#059669" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-surface-container-low/30 border border-surface-container-high/60 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <h5 className="text-xs font-bold text-on-surface uppercase tracking-wider">
            Tabel Evaluasi Keberhasilan Studi — S1 (6 Angkatan)
          </h5>
          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Batas Maks. 7 Thn</span>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-container-low/80 border-b border-surface-container-high text-outline text-[11px] font-semibold">
            <tr>
              <th className="py-2.5 px-4">Angkatan</th>
              <th className="py-2.5 px-4 text-right">Lulus Dalam 7 Tahun</th>
              <th className="py-2.5 px-4 text-right">Intake Mahasiswa</th>
              <th className="py-2.5 px-4 text-right">Tingkat Keberhasilan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-high/60 bg-surface-container-lowest font-medium">
            {successCohortData.map((row) => (
              <tr key={row.cohort} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="py-2.5 px-4 text-on-surface font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span>{row.cohortLabel}</span>
                    {row.isIncomplete && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Sedang Berjalan
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-2.5 px-4 text-right text-emerald-700 font-bold tabular-nums">
                  {row.successCount} mhs
                </td>
                <td className="py-2.5 px-4 text-right text-primary font-semibold tabular-nums">{row.intake} mhs</td>
                <td className="py-2.5 px-4 text-right font-extrabold text-emerald-700 tabular-nums">
                  {row.isIncomplete ? (
                    <span className="text-outline font-semibold italic" title="Masa studi maksimal (7 tahun) masih berjalan">-*</span>
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

export default StudySuccessS1Section;
