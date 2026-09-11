import { useState } from 'react';
import { StudySuccessS1Section } from './components/StudySuccessS1Section';
import { StudySuccessS2Section } from './components/StudySuccessS2Section';

export const StudySuccessView = ({
  studySuccessRateS1 = { rate: '91.2%', successCount: 155, totalIntake: 170, cohortLabel: '2016-2020' },
  studySuccessRateS2 = { rate: '94.0%', successCount: 24, totalS2: 26, cohortLabel: '2018-2022' },
  successCohortData = [],
  successCohortDataS2 = [],
  successChartData = [],
  successChartDataS2 = [],
}) => {
  const [activeSuccessTab, setActiveSuccessTab] = useState('s1');

  const s1Obj = typeof studySuccessRateS1 === 'object' && studySuccessRateS1 !== null
    ? studySuccessRateS1
    : { rate: String(studySuccessRateS1 || '91.2%'), successCount: 155, totalIntake: 170, cohortLabel: '2016-2020' };

  const s2Obj = typeof studySuccessRateS2 === 'object' && studySuccessRateS2 !== null
    ? studySuccessRateS2
    : { rate: String(studySuccessRateS2 || '94.0%'), successCount: 24, totalS2: 26, cohortLabel: '2018-2022' };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
              Sarjana (S1) — Keberhasilan Studi
            </span>
            <div className="font-metric-display text-2xl font-extrabold text-emerald-700 mt-1">
              {s1Obj.rate || '91.2%'}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              {s1Obj.successCount || 155} dari {s1Obj.totalIntake || 170} mhs ({s1Obj.cohortLabel || '2016-2020'})
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 shrink-0">
            S1 (Maks. 7 Thn)
          </span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
              Magister (S2) — Keberhasilan Studi
            </span>
            <div className="font-metric-display text-2xl font-extrabold text-purple-700 mt-1">
              {s2Obj.rate || '94.0%'}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              {s2Obj.successCount || 24} dari {s2Obj.totalS2 || 26} mhs ({s2Obj.cohortLabel || '2018-2022'})
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 shrink-0">
            S2 (Maks. 4 Thn)
          </span>
        </div>
      </div>

      <div className="flex gap-4 border-b border-surface-container-high">
        <button
          onClick={() => setActiveSuccessTab('s1')}
          className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-colors relative cursor-pointer ${
            activeSuccessTab === 's1'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          Sarjana (S1) — Maks. 7 Tahun
          {activeSuccessTab === 's1' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveSuccessTab('s2')}
          className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-colors relative cursor-pointer ${
            activeSuccessTab === 's2'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          Magister (S2) — Maks. 4 Tahun
          {activeSuccessTab === 's2' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
      </div>

      {activeSuccessTab === 's1' && (
        <StudySuccessS1Section
          successChartData={successChartData}
          successCohortData={successCohortData}
        />
      )}

      {activeSuccessTab === 's2' && (
        <StudySuccessS2Section
          successChartDataS2={successChartDataS2}
          successCohortDataS2={successCohortDataS2}
        />
      )}
    </div>
  );
};

export default StudySuccessView;
