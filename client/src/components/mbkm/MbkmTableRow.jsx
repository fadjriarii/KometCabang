import { ActivityBadge } from './ActivityBadge';

const StatusAktifitasBadge = ({ status }) => {
  const s = String(status || '').trim().toLowerCase();

  if (s === 'selesai') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
        <span>Selesai</span>
      </span>
    );
  }

  if (s === 'evaluasi') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
        <span>Evaluasi</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-fixed/40 text-primary border border-primary/20 whitespace-nowrap">
      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
      <span>Sedang Berjalan</span>
    </span>
  );
};

export const MbkmTableRow = ({ item, index }) => {
  const jenjang = String(item.jenjang || 'S1').toUpperCase();
  const isS2 = jenjang.includes('S2');

  return (
    <tr className="hover:bg-surface-container-low/40 transition-colors">
      <td className="py-3 px-4 text-outline font-mono text-center">{index}</td>
      <td className="py-3 px-4 font-mono font-bold text-on-surface selectable-text">{item.nim}</td>
      <td className="py-3 px-4 font-semibold text-on-surface selectable-text">{item.nama}</td>
      <td className="py-3 px-4 text-center">
        <span className="px-2 py-0.5 rounded-md bg-surface-container font-mono text-xs font-semibold text-on-surface">
          {item.angkatan || '-'}
        </span>
      </td>
      <td className="py-3 px-4 text-on-surface font-medium">{item.program_studi || '-'}</td>
      <td className="py-3 px-4 text-on-surface-variant">{item.fakultas || '-'}</td>
      <td className="py-3 px-4 text-center">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border whitespace-nowrap ${
            isS2
              ? 'bg-purple-50 text-purple-700 border-purple-200'
              : 'bg-sky-50 text-sky-700 border-sky-200'
          }`}
        >
          {jenjang}
        </span>
      </td>
      <td className="py-3 px-4">
        <ActivityBadge activity={item.jenis_aktifitas || item.jenis_kegiatan} />
      </td>
      <td className="py-3 px-4 text-on-surface font-semibold max-w-[220px] truncate" title={item.mitra}>
        {item.mitra || '-'}
      </td>
      <td className="py-3 px-4">
        <StatusAktifitasBadge status={item.status_aktifitas || item.status_kegiatan} />
      </td>
    </tr>
  );
};

export default MbkmTableRow;
