import { useState } from 'react';
import { OnTimeS1Section } from './components/OnTimeS1Section';
import { OnTimeS2Section } from './components/OnTimeS2Section';

export const OnTimeGraduationView = ({
  onTimeRateS1 = { rate: '82.4%', onTimeCount: 140, totalIntake: 170, cohortLabel: '2016-2020' },
  onTimeRateS2 = { rate: '88.5%', onTimeCount: 23, totalS2: 26, cohortLabel: '2018-2022' },
  onTimeCohortData = [],
  onTimeCohortDataS2 = [],
  onTimeChartData = [],
  onTimeChartDataS2 = [],
}) => {
  const [activeOnTimeTab, setActiveOnTimeTab] = useState('s1');

  const s1Obj = typeof onTimeRateS1 === 'object' && onTimeRateS1 !== null
    ? onTimeRateS1
    : { rate: String(onTimeRateS1 || '82.4%'), onTimeCount: 140, totalIntake: 170, cohortLabel: '2016-2020' };

  const s2Obj = typeof onTimeRateS2 === 'object' && onTimeRateS2 !== null
    ? onTimeRateS2
    : { rate: String(onTimeRateS2 || '88.5%'), onTimeCount: 23, totalS2: 26, cohortLabel: '2018-2022' };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
              Sarjana (S1) — Lulus Tepat Waktu
            </span>
            <div className="font-metric-display text-2xl font-extrabold text-primary mt-1">
              {s1Obj.rate || '82.4%'}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              {s1Obj.onTimeCount || 140} dari {s1Obj.totalIntake || 170} mhs ({s1Obj.cohortLabel || '2016-2020'})
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary-fixed text-primary shrink-0">
            S1 (4 Thn)
          </span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
              Magister (S2) — Lulus Tepat Waktu
            </span>
            <div className="font-metric-display text-2xl font-extrabold text-purple-700 mt-1">
              {s2Obj.rate || '88.5%'}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              {s2Obj.onTimeCount || 23} dari {s2Obj.totalS2 || 26} mhs ({s2Obj.cohortLabel || '2018-2022'})
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 shrink-0">
            S2 (2 Thn)
          </span>
        </div>
      </div>

      <div className="flex gap-4 border-b border-surface-container-high">
        <button
          onClick={() => setActiveOnTimeTab('s1')}
          className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-colors relative cursor-pointer ${
            activeOnTimeTab === 's1'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          Sarjana (S1) — 4 Tahun
          {activeOnTimeTab === 's1' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveOnTimeTab('s2')}
          className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-colors relative cursor-pointer ${
            activeOnTimeTab === 's2'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          Magister (S2) — 2 Tahun
          {activeOnTimeTab === 's2' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
      </div>

      {activeOnTimeTab === 's1' && (
        <OnTimeS1Section
          onTimeChartData={onTimeChartData}
          onTimeCohortData={onTimeCohortData}
        />
      )}

      {activeOnTimeTab === 's2' && (
        <OnTimeS2Section
          onTimeChartDataS2={onTimeChartDataS2}
          onTimeCohortDataS2={onTimeCohortDataS2}
        />
      )}
    </div>
  );
};

export default OnTimeGraduationView;
