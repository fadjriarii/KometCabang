import { StatusBadge } from './StatusBadge';

export const StudentTableRow = ({ item, index }) => {
  const isNonWni =
    String(item.kewarganegaraan || '').toLowerCase().includes('asing') ||
    (item.kewarganegaraan && !String(item.kewarganegaraan).toLowerCase().includes('indonesia'));

  return (
    <tr className="hover:bg-surface-container-low/40 transition-colors">
      <td className="py-3 px-4 text-outline font-mono text-center">{index}</td>
      <td className="py-3 px-4 font-mono font-bold text-on-surface selectable-text">{item.nim}</td>
      <td className="py-3 px-4 font-semibold text-on-surface selectable-text">{item.nama}</td>
      <td className="py-3 px-4 text-center">
        <span className="px-2 py-0.5 rounded-md bg-surface-container font-mono text-xs font-semibold text-on-surface">
          {item.angkatan || item.cohort || '-'}
        </span>
      </td>
      <td className="py-3 px-4 text-on-surface-variant whitespace-nowrap">{item.periode || '-'}</td>
      <td className="py-3 px-4 text-on-surface font-medium">{item.program_studi || '-'}</td>
      <td className="py-3 px-4 text-on-surface-variant">{item.fakultas || '-'}</td>
      <td className="py-3 px-4 text-center font-bold text-primary">
        {item.semester !== undefined && item.semester !== null ? item.semester : '-'}
      </td>
      <td className="py-3 px-4">
        {isNonWni ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="material-symbols-outlined text-[13px]">public</span>
            <span>{item.kewarganegaraan || 'Non-WNI'}</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium text-on-surface-variant">
            <span>{item.kewarganegaraan || 'Indonesia'}</span>
          </span>
        )}
      </td>
      <td className="py-3 px-4">
        <StatusBadge status={item.status_keaktifan || item.status} />
      </td>
    </tr>
  );
};

export default StudentTableRow;
