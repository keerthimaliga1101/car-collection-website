import React from 'react';
import { X, Trash2, ArrowUpRight, Calendar, FileText } from 'lucide-react';
import { CarItem } from '../data/collections';
import { ImageWithFallback } from './ImageWithFallback';

interface PrivateDossierDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedCars: CarItem[];
  dossierNotes: Record<string, string>;
  onRemoveCar: (carId: string) => void;
  onClearAll: () => void;
  onInspectCar: (car: CarItem) => void;
  onBookPortfolioViewing: () => void;
}

export const PrivateDossierDrawer: React.FC<PrivateDossierDrawerProps> = ({
  isOpen,
  onClose,
  savedCars,
  dossierNotes,
  onRemoveCar,
  onClearAll,
  onInspectCar,
  onBookPortfolioViewing,
}) => {
  if (!isOpen) return null;

  const totalValuation = savedCars.reduce((acc, item) => acc + item.valuationUsd, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Private Collector Dossier"
    >
      <div className="w-full max-w-lg bg-[#FBF9F5] border-l border-[#D6CEBE] h-full flex flex-col justify-between text-[#181615] shadow-2xl">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#E5E0D8] flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-medium text-[#181615]">
              Private Acquisition Dossier
            </h2>
            <p className="text-xs text-[#68625D] mt-0.5 font-mono-tabular">
              {savedCars.length} {savedCars.length === 1 ? 'Chassis Selected' : 'Chassis Selected'} · Aggregate Valuation ${totalValuation.toLocaleString()}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#68625D] hover:text-[#181615] transition-colors cursor-pointer"
            aria-label="Close dossier drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {savedCars.length === 0 ? (
            <div className="py-16 text-center border border-dashed border-[#D6CEBE] p-8 bg-[#F3EFEA]/40">
              <FileText className="w-8 h-8 text-[#A8A29E] mx-auto mb-3 stroke-[1.25]" />
              <h3 className="font-display text-xl font-medium text-[#181615]">
                Your Archival Dossier is Empty
              </h3>
              <p className="text-xs text-[#68625D] mt-2 max-w-xs mx-auto leading-relaxed">
                Select vehicles from any of our four curated collections to compile a custom acquisition portfolio, record chassis notes, or arrange a private pavilion viewing.
              </p>
            </div>
          ) : (
            savedCars.map((car) => (
              <div
                key={car.id}
                className="p-4 bg-[#F3EFEA] border border-[#E5E0D8] flex flex-col gap-3"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-20 shrink-0 bg-[#EFECE6] border border-[#E5E0D8]">
                    <ImageWithFallback
                      src={car.image}
                      alt={`${car.year} ${car.marque} ${car.model}`}
                      className="w-full h-full object-cover"
                      containerClassName="w-full h-full overflow-hidden"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono-tabular text-[#68625D]">
                        {car.year} · Chassis {car.chassisNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveCar(car.id)}
                        className="text-[#68625D] hover:text-[#8C2D19] transition-colors cursor-pointer"
                        aria-label={`Remove ${car.marque} ${car.model} from dossier`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h3 className="font-display text-lg font-medium text-[#181615] truncate">
                      {car.marque} {car.model}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-mono-tabular font-semibold text-[#181615]">
                        ${car.valuationUsd.toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onInspectCar(car);
                        }}
                        className="text-xs font-medium text-[#8C2D19] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open Record</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {dossierNotes[car.id] && (
                  <div className="pt-2 border-t border-[#E5E0D8] text-xs text-[#57534E] italic">
                    “{dossierNotes[car.id]}”
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-[#E5E0D8] bg-[#F3EFEA]">
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-xs text-[#68625D]">Aggregate Portfolio Estimate</span>
            <span className="text-xl font-mono-tabular font-semibold text-[#181615]">
              ${totalValuation.toLocaleString()}
            </span>
          </div>

          <div className="space-y-2.5">
            <button
              type="button"
              disabled={savedCars.length === 0}
              onClick={() => {
                onClose();
                onBookPortfolioViewing();
              }}
              className="w-full py-3 px-4 bg-[#8C2D19] hover:bg-[#722313] disabled:bg-[#D6CEBE] disabled:text-[#78716C] text-white text-xs font-medium rounded transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer disabled:cursor-not-allowed"
            >
              <Calendar className="w-4 h-4" />
              <span>Arrange Private Pavilion Viewing</span>
            </button>

            {savedCars.length > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="w-full py-2 px-4 text-xs text-[#68625D] hover:text-[#181615] transition-colors whitespace-nowrap cursor-pointer"
              >
                Clear Dossier Selection
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
