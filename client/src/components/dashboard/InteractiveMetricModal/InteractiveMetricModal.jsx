import { useEffect, useState } from 'react';
import { apiClient } from '@/services/apiClient';
import { ModalHeader } from './components/ModalHeader';
import { ModalFormulaBox } from './components/ModalFormulaBox';
import { ModalTrendChart } from './components/ModalTrendChart';
import { ModalAuditTable } from './components/ModalAuditTable';

export const InteractiveMetricModal = ({ metricKey, originRect, onClose }) => {
  const [metricData, setMetricData] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!metricKey) {
      setIsAnimating(false);
      setMetricData(null);
      return;
    }

    let isMounted = true;
    apiClient.getMetricModalDetails(metricKey)
      .then((res) => {
        if (isMounted) {
          setMetricData(res);
          const t = setTimeout(() => setIsAnimating(true), 16);
          return () => clearTimeout(t);
        }
      })
      .catch((err) => {
        console.error('Failed to load metric details', err);
      });

    return () => {
      isMounted = false;
    };
  }, [metricKey]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 280);
  };

  if (!metricKey || !metricData) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-0 transition-opacity duration-300 ease-out ${
        isAnimating ? 'bg-black/50 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
      }`}
      id="metric-modal-backdrop"
      onClick={(e) => {
        if (e.target.id === 'metric-modal-backdrop') {
          handleClose();
        }
      }}
    >
      <div
        style={{
          transform: isAnimating ? 'translate(0, 0) scale(1)' : 'translate(0, 20px) scale(0.95)',
          opacity: isAnimating ? 1 : 0,
          transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 250ms ease-out',
        }}
        className="w-[min(92vw,48rem)] max-h-[90vh] z-50 bg-surface-container-lowest shadow-2xl rounded-2xl border border-outline-variant/40 overflow-hidden flex flex-col will-change-transform"
        id="metric-modal-box"
      >
        <ModalHeader data={metricData} onClose={handleClose} />

        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <ModalFormulaBox data={metricData} />
          <ModalTrendChart points={metricData.points || []} />
          <ModalAuditTable points={metricData.points || []} />
        </div>

        <div className="p-4 border-t border-surface-container-high bg-surface-container-low/40 flex items-center justify-between text-xs shrink-0">
          <span className="text-[11px] text-outline">Sumber data: Sevima Cloud Feeder & PDDIKTI Sync</span>
          <button
            className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-lg font-semibold transition-colors cursor-pointer"
            type="button"
            onClick={handleClose}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMetricModal;
