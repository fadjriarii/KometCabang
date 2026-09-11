import { Link } from 'react-router-dom';
import { GraduateGpaProdiCard } from './GraduateGpaProdiCard';
import { GraduateOverviewCards } from './GraduateOverviewCards';

export const GraduateOverviewSection = ({ graduateOverview = {}, onOpenModal }) => {
  const getOriginRect = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  };

  const gpaList = graduateOverview.gpaByProgram || [];
  const gpaS1 = graduateOverview.gpaS1 || '3.52';
  const gpaS2 = graduateOverview.gpaS2 || '3.76';
  const onTimeRate = graduateOverview.onTimeGradRate || '82.4%';
  const onTimeTarget = graduateOverview.onTimeTarget || '80%';
  const studySuccessRate = graduateOverview.studySuccessRate || '91.2%';
  const studySuccessTarget = graduateOverview.studySuccessTarget || '85%';

  return (
    <div className="flex flex-col gap-3 pt-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">📜</span>
          <h2 className="font-headline-lg text-headline-md font-bold text-on-surface">
            Graduate Overview
          </h2>
          <span className="text-xs text-outline font-normal">
            (IPK per Prodi, Sarjana S1, Magister S2, Lulus Tepat Waktu & Keberhasilan Studi)
          </span>
        </div>
        <Link
          className="font-label-md text-label-md text-primary hover:text-primary-container inline-flex items-center gap-1 font-semibold transition-colors"
          to="/graduate-data"
        >
          View Graduate Data <span className="material-symbols-outlined text-[16px]">school</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        <GraduateGpaProdiCard
          gpaList={gpaList}
          onOpenModal={onOpenModal}
          getOriginRect={getOriginRect}
        />

        <GraduateOverviewCards
          gpaS1={gpaS1}
          gpaS2={gpaS2}
          onTimeRate={onTimeRate}
          onTimeTarget={onTimeTarget}
          studySuccessRate={studySuccessRate}
          studySuccessTarget={studySuccessTarget}
          onOpenModal={onOpenModal}
          getOriginRect={getOriginRect}
        />
      </div>
    </div>
  );
};

export default GraduateOverviewSection;
