import { Link } from 'react-router-dom';

export const StudentOverviewSection = ({ studentOverview = {}, onOpenModal }) => {
  const getOriginRect = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  };

  const intl = studentOverview.intlStudents || {
    pct: '8.3%',
    target: '≥5%',
    count: 46,
    total: 554,
    barWidth: '33.2%',
  };

  const intake = studentOverview.intake || {
    count: 148,
    target: 160,
    filledPct: '92.5%',
  };

  const intakeGrowth = studentOverview.intakeGrowth || {
    rate: '+3.2%',
    label: 'Tumbuh Positif',
  };

  return (
    <div className="flex flex-col gap-3 pt-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎓</span>
          <h2 className="font-headline-lg text-headline-md font-bold text-on-surface">
            Student Overview
          </h2>
        </div>
        <Link
          className="font-label-md text-label-md text-primary hover:text-primary-container inline-flex items-center gap-1 font-semibold transition-colors"
          to="/student-data"
        >
          View Student Data <span className="material-symbols-outlined text-[16px]">groups</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card: Persentase Mahasiswa Asing */}
        <div
          className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-sm hover:border-primary hover:shadow-md transition-all cursor-pointer relative group flex flex-col justify-between"
          onClick={(e) => onOpenModal('intl_students', getOriginRect(e))}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">
                Persentase Mahasiswa Asing
              </h3>
              <span className="text-[11px] text-outline font-medium">
                Non-WNI Status Aktif / Total Aktif
              </span>
            </div>
            <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-surface-container-high"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="100, 100"
                  strokeWidth="3.5"
                />
                <path
                  className="text-primary transition-all duration-300"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray={`${String(intl.pct || '8.3').replace('%', '')}, 100`}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px] text-primary">public</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-metric-display text-3xl font-extrabold text-on-surface">
                {intl.pct}
              </span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                Target: {intl.target}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">
              <strong>{intl.count}</strong> mahasiswa non-WNI dari total{' '}
              <strong>{intl.total}</strong> student body aktif.
            </p>
            <div className="w-full bg-surface-container-high rounded-full h-2 mt-3 overflow-hidden">
              <div className="bg-primary h-2 rounded-full" style={{ width: intl.barWidth }}></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-outline mt-3 pt-2 border-t border-surface-container-high">
              <span>Formula: Non WNI / Total Aktif</span>
              <span className="text-primary font-semibold group-hover:underline flex items-center gap-0.5">
                Lihat Tren <span className="material-symbols-outlined text-[12px]">open_in_new</span>
              </span>
            </div>
          </div>
        </div>

        {/* Card: Student Intake */}
        <div
          className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-sm hover:border-primary hover:shadow-md transition-all cursor-pointer relative group flex flex-col justify-between"
          onClick={(e) => onOpenModal('student_intake', getOriginRect(e))}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">
                Student Intake
              </h3>
              <span className="text-[11px] text-outline font-medium">Semester 1 Status Aktif</span>
            </div>
            <div className="p-2 rounded-lg bg-surface-container text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-metric-display text-3xl font-extrabold text-on-surface">
                {intake.count}
              </span>
              <span className="text-xs text-on-surface-variant font-medium">maba aktif</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">
              Kapasitas terisi <strong>{intake.filledPct}</strong> dari target daya tampung {intake.target} kursi.
            </p>
            <div className="flex items-center justify-between text-xs mt-2 text-outline font-medium">
              <span>Target: {intake.target}</span>
              <span className="text-secondary font-semibold">{intake.filledPct} filled</span>
            </div>
            <div className="w-full bg-surface-container-high rounded-full h-2 mt-1 overflow-hidden">
              <div className="bg-secondary h-2 rounded-full" style={{ width: intake.filledPct }}></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-outline mt-3 pt-2 border-t border-surface-container-high">
              <span>Σ Mahasiswa Semester 1</span>
              <span className="text-primary font-semibold group-hover:underline flex items-center gap-0.5">
                Lihat Tren <span className="material-symbols-outlined text-[12px]">open_in_new</span>
              </span>
            </div>
          </div>
        </div>

        {/* Card: Persentase Penurunan Maba */}
        <div
          className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-sm hover:border-primary hover:shadow-md transition-all cursor-pointer relative group flex flex-col justify-between"
          onClick={(e) => onOpenModal('intake_growth', getOriginRect(e))}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">
                Persentase Penurunan Mahasiswa Baru (5 Thn)
              </h3>
              <span className="text-[11px] text-outline font-medium">
                Avg YoY Rate Formula ((B-A)/A)+...
              </span>
            </div>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">trending_up</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="font-metric-display text-3xl font-extrabold text-emerald-600">
                  {intakeGrowth.rate}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {intakeGrowth.label}
                </span>
              </div>
              <div className="w-24 h-8">
                <svg className="w-full h-full" viewBox="0 0 96 32">
                  <defs>
                    <linearGradient id="spark-grad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <polygon
                    fill="url(#spark-grad)"
                    points="0,28 10,25 22,23 34,22 46,18 58,16 70,12 82,10 96,6 96,32 0,32"
                  />
                  <path
                    d="M0,28 L10,25 L22,23 L34,22 L46,18 L58,16 L70,12 L82,10 L96,6"
                    fill="none"
                    stroke="#10b981"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                  <circle cx="96" cy="6" fill="#059669" r="3" />
                </svg>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">
              Rerata perubahan intake 5 tahun stabil dalam tren peningkatan penerimaan.
            </p>
            <div className="flex items-center justify-between text-[11px] text-outline mt-3 pt-2 border-t border-surface-container-high">
              <span>Sparkline 5 Tahun (Area Chart)</span>
              <span className="text-primary font-semibold group-hover:underline flex items-center gap-0.5">
                Lihat Tren <span className="material-symbols-outlined text-[12px]">open_in_new</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentOverviewSection;
