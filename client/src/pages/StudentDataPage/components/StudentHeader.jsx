import React from 'react';

export const StudentHeader = ({ onExport }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-surface-container-high">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="font-headline-xl text-headline-xl font-bold text-on-surface tracking-tight">
            Student Data Repository
          </h1>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mt-1">
          Longitudinal tracking of active enrollment, semester progress, nationality distribution, and
          academic standing under Higher Education Database (PDDikti) standards.
        </p>
      </div>
      <div className="flex items-center gap-3 self-start md:self-auto">
        <button
          id="export-btn"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold transition shadow-sm cursor-pointer"
          type="button"
          onClick={onExport}
        >
          <span className="material-symbols-outlined text-[19px]">download</span>
          <span>Export (CSV / Excel)</span>
        </button>
      </div>
    </div>
  );
};
