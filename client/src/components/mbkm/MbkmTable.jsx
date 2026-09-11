import { useRef, useState } from 'react';
import { TablePagination } from '@/components/common/TablePagination';
import { MbkmTableRow } from './MbkmTableRow';

export const MbkmTable = ({
  mbkmData = [],
  data = [],
  totalCount,
  currentPage = 1,
  pageSize = 50,
  totalPages,
  onPageChange,
  onPageSizeChange,
  loading = false,
}) => {
  const tableList = mbkmData.length > 0 ? mbkmData : data;
  const count = totalCount !== undefined ? totalCount : tableList.length;
  const computedTotalPages = totalPages || Math.max(1, Math.ceil(count / pageSize));

  // Horizontal scroll drag handlers
  const tableContainerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDraggingState, setIsDraggingState] = useState(false);

  const handleMouseDown = (e) => {
    if (e.target.closest('.selectable-text') || e.button !== 0 || !tableContainerRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - tableContainerRef.current.offsetLeft;
    scrollLeftRef.current = tableContainerRef.current.scrollLeft;
    setIsDraggingState(true);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !tableContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - tableContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    tableContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    setIsDraggingState(false);
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
      <div
        ref={tableContainerRef}
        className={`overflow-x-auto select-none ${isDraggingState ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        <table className="w-full text-left text-xs min-w-[950px]">
          <thead className="bg-surface-container-low/60 border-b border-surface-container-high text-outline text-[11px] font-semibold uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4 text-center w-12">No</th>
              <th className="py-3 px-4">NIM</th>
              <th className="py-3 px-4">Nama Mahasiswa</th>
              <th className="py-3 px-4 text-center">Batch</th>
              <th className="py-3 px-4">Program Studi</th>
              <th className="py-3 px-4">Fakultas</th>
              <th className="py-3 px-4 text-center">Jenjang</th>
              <th className="py-3 px-4">Jenis Aktivitas MBKM</th>
              <th className="py-3 px-4">Instansi Mitra</th>
              <th className="py-3 px-4">Status Kegiatan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-high/60 bg-surface-container-lowest font-medium">
            {tableList.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-12 text-outline">
                  {loading ? 'Memuat data MBKM...' : 'Tidak ada data MBKM yang cocok dengan filter.'}
                </td>
              </tr>
            ) : (
              tableList.map((item, idx) => (
                <MbkmTableRow
                  key={item.nim || item.id || idx}
                  item={item}
                  index={(currentPage - 1) * pageSize + idx + 1}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <TablePagination
        currentPage={currentPage}
        totalPages={computedTotalPages}
        pageSize={pageSize}
        totalItems={count}
        onPageChange={onPageChange || (() => {})}
        onPageSizeChange={onPageSizeChange || (() => {})}
      />
    </div>
  );
};

export default MbkmTable;
