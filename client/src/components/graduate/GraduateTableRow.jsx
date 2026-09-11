import { PredikatBadge } from './PredikatBadge';

export const GraduateTableRow = ({ item, index }) => {
  const jenjang = String(item.jenjang_clean || item.jenjang || 'S1').toUpperCase();
  const isS2 = jenjang.includes('S2');
  const ipkVal = item.ipk_clean !== undefined && item.ipk_clean !== null
    ? Number(item.ipk_clean)
    : (item.ipk !== undefined && item.ipk !== null ? Number(item.ipk) : null);

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
      <td className="py-3 px-4 text-on-surface font-medium">{item.program_studi_clean || item.program_studi || '-'}</td>
      <td className="py-3 px-4 text-on-surface-variant">{item.fakultas_clean || item.fakultas || '-'}</td>
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
      <td className="py-3 px-4 text-center font-bold text-on-surface">
        {item.tahun_lulus_clean || item.tahun_lulus || '-'}
      </td>
      <td className="py-3 px-4 text-center font-bold text-primary">
        {ipkVal !== null ? ipkVal.toFixed(2) : '-'}
      </td>
      <td className="py-3 px-4 text-center font-semibold text-on-surface-variant">
        {item.total_sks_clean || item.total_sks || '-'}
      </td>
      <td className="py-3 px-4">
        <PredikatBadge predikat={item.predikat_lulus_clean || item.predikat_lulus} ipk={ipkVal} />
      </td>
    </tr>
  );
};

export default GraduateTableRow;
