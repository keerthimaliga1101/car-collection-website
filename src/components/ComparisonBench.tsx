import React, { useState } from 'react';
import { X, ArrowUpRight, Plus, Check } from 'lucide-react';
import { CarItem } from '../data/collections';
import { ImageWithFallback } from './ImageWithFallback';

interface ComparisonBenchProps {
  comparedCars: CarItem[];
  allCars: CarItem[];
  onRemoveFromCompare: (carId: string) => void;
  onAddCarToCompare: (carId: string) => void;
  onSetComparisonPreset: (carIds: string[]) => void;
  onClearCompare: () => void;
  onInspectCar: (car: CarItem) => void;
}

interface ComparisonRow {
  id: string;
  label: string;
  category: 'Specifications' | 'Dimensions & Mass' | 'Performance & Rarity';
  getValue: (car: CarItem) => string;
  getRawValue?: (car: CarItem) => number | string;
  highlightLeader?: 'max' | 'min';
  leaderLabel?: string;
}

export const ComparisonBench: React.FC<ComparisonBenchProps> = ({
  comparedCars,
  allCars,
  onRemoveFromCompare,
  onAddCarToCompare,
  onSetComparisonPreset,
  onClearCompare,
  onInspectCar,
}) => {
  const [highlightDifferences, setHighlightDifferences] = useState<boolean>(true);
  const [showDifferencesOnly, setShowDifferencesOnly] = useState<boolean>(false);

  const availableToAdd = allCars.filter(
    (c) => !comparedCars.some((selected) => selected.id === c.id)
  );

  const rows: ComparisonRow[] = [
    {
      id: 'engine-type',
      label: 'Engine Type',
      category: 'Specifications',
      getValue: (c) => `${c.specs.engineConfiguration} (${c.specs.displacementCc.toLocaleString()} cc)`,
      getRawValue: (c) => c.specs.engineConfiguration,
    },
    {
      id: 'horsepower',
      label: 'Horsepower',
      category: 'Specifications',
      getValue: (c) => `${c.specs.horsepower} HP @ ${c.specs.rpmRedline.toLocaleString()} RPM`,
      getRawValue: (c) => c.specs.horsepower,
      highlightLeader: 'max',
      leaderLabel: 'Highest Output',
    },
    {
      id: 'torque',
      label: 'Torque',
      category: 'Specifications',
      getValue: (c) => `${c.specs.torqueNm} Nm (${c.specs.torqueLbFt} lb-ft)`,
      getRawValue: (c) => c.specs.torqueNm,
      highlightLeader: 'max',
      leaderLabel: 'Peak Torque',
    },
    {
      id: 'fuel-efficiency',
      label: 'Fuel Efficiency (City / Highway)',
      category: 'Specifications',
      getValue: (c) => `${c.specs.fuelEfficiencyCityMpg} mpg city / ${c.specs.fuelEfficiencyHwyMpg} mpg hwy`,
      getRawValue: (c) => c.specs.fuelEfficiencyHwyMpg,
      highlightLeader: 'max',
      leaderLabel: 'Highest Efficiency',
    },
    {
      id: 'transmission',
      label: 'Transmission',
      category: 'Specifications',
      getValue: (c) => c.specs.transmission,
      getRawValue: (c) => c.specs.transmission,
    },
    {
      id: 'drivetrain',
      label: 'Drivetrain',
      category: 'Specifications',
      getValue: (c) => `${c.specs.drivetrain} (${c.specs.weightDistribution})`,
      getRawValue: (c) => c.specs.drivetrain,
    },
    {
      id: 'dimensions',
      label: 'Dimensions (Length × Width × Height)',
      category: 'Dimensions & Mass',
      getValue: (c) =>
        `L: ${c.specs.dimensions.lengthMm.toLocaleString()} mm × W: ${c.specs.dimensions.widthMm.toLocaleString()} mm × H: ${c.specs.dimensions.heightMm.toLocaleString()} mm`,
      getRawValue: (c) => c.specs.dimensions.formatted,
    },
    {
      id: 'wheelbase',
      label: 'Wheelbase',
      category: 'Dimensions & Mass',
      getValue: (c) =>
        `${c.specs.wheelbaseMm.toLocaleString()} mm (${(c.specs.wheelbaseMm / 25.4).toFixed(1)} in)`,
      getRawValue: (c) => c.specs.wheelbaseMm,
      highlightLeader: 'max',
      leaderLabel: 'Longest Wheelbase',
    },
    {
      id: 'curb-weight',
      label: 'Curb Weight',
      category: 'Dimensions & Mass',
      getValue: (c) =>
        `${c.specs.curbWeightKg.toLocaleString()} kg (${c.specs.curbWeightLbs.toLocaleString()} lbs)`,
      getRawValue: (c) => c.specs.curbWeightKg,
      highlightLeader: 'min',
      leaderLabel: 'Lightest Chassis',
    },
    {
      id: 'acceleration',
      label: '0–100 km/h Acceleration',
      category: 'Performance & Rarity',
      getValue: (c) => `${c.specs.zeroToHundredSec} seconds`,
      getRawValue: (c) => c.specs.zeroToHundredSec,
      highlightLeader: 'min',
      leaderLabel: 'Quickest Sprint',
    },
    {
      id: 'top-speed',
      label: 'Maximum Velocity',
      category: 'Performance & Rarity',
      getValue: (c) => `${c.specs.topSpeedKmh} km/h (${Math.round(c.specs.topSpeedKmh * 0.621371)} mph)`,
      getRawValue: (c) => c.specs.topSpeedKmh,
      highlightLeader: 'max',
      leaderLabel: 'Highest Top Speed',
    },
    {
      id: 'production-rarity',
      label: 'Production Allocation',
      category: 'Performance & Rarity',
      getValue: (c) => `${c.productionTotal} Units (${c.unitNumber})`,
      getRawValue: (c) => c.productionTotal,
      highlightLeader: 'min',
      leaderLabel: 'Rarest Production',
    },
    {
      id: 'valuation',
      label: 'Archival Valuation',
      category: 'Performance & Rarity',
      getValue: (c) => `$${c.valuationUsd.toLocaleString()}`,
      getRawValue: (c) => c.valuationUsd,
    },
  ];

  // Determine if a row has differences across the currently selected cars
  const isRowDifferent = (row: ComparisonRow): boolean => {
    if (comparedCars.length < 2) return false;
    const rawValues = comparedCars.map((car) =>
      row.getRawValue ? row.getRawValue(car) : row.getValue(car)
    );
    return new Set(rawValues).size > 1;
  };

  // Determine if a specific cell holds the leading value in a numeric comparison
  const isCellLeader = (row: ComparisonRow, car: CarItem): boolean => {
    if (comparedCars.length < 2 || !row.highlightLeader || !row.getRawValue) return false;
    if (!isRowDifferent(row)) return false;

    const numericValues = comparedCars
      .map((c) => Number(row.getRawValue!(c)))
      .filter((v) => !Number.isNaN(v));
    if (numericValues.length < 2) return false;

    const target =
      row.highlightLeader === 'max'
        ? Math.max(...numericValues)
        : Math.min(...numericValues);
    return Number(row.getRawValue(car)) === target;
  };

  const visibleRows = showDifferencesOnly
    ? rows.filter((row) => isRowDifferent(row))
    : rows;

  const differingRowCount = rows.filter((r) => isRowDifferent(r)).length;

  return (
    <section
      id="comparison-bench"
      className="py-16 md:py-24 border-t border-[#E5E0D8] bg-[#F3EFEA]/60"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5E0D8]">
          <div>
            <div className="text-xs text-[#68625D] mb-2">
              04. Compare Cars — Side-by-Side Archival Matrix
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#181615] balance-text">
              Compare 2 to 3 Collection Vehicles
            </h2>
            <p className="text-sm text-[#57534E] mt-2 max-w-2xl leading-relaxed">
              Select 2 or 3 cars from across our collections to inspect their specifications and distinguishing features side-by-side. Differing parameters and category leaders are automatically highlighted.
            </p>
          </div>

          {/* Interactive Comparison Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Highlight Differences Toggle */}
            <button
              type="button"
              onClick={() => setHighlightDifferences((prev) => !prev)}
              className={`px-3.5 py-2 text-xs font-medium rounded border transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                highlightDifferences
                  ? 'bg-[#181615] text-white border-[#181615]'
                  : 'bg-[#FBF9F5] text-[#181615] border-[#D6CEBE]'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${highlightDifferences ? 'opacity-100' : 'opacity-0'}`} />
              <span>Highlight Differences ({differingRowCount})</span>
            </button>

            {/* Filter to Differences Only */}
            <button
              type="button"
              disabled={comparedCars.length < 2}
              onClick={() => setShowDifferencesOnly((prev) => !prev)}
              className={`px-3.5 py-2 text-xs font-medium rounded border transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                showDifferencesOnly
                  ? 'bg-[#8C2D19] text-white border-[#8C2D19]'
                  : 'bg-[#FBF9F5] text-[#181615] border-[#D6CEBE] hover:border-[#181615]'
              }`}
            >
              {showDifferencesOnly ? 'Showing Differences Only' : 'Filter to Differences Only'}
            </button>

            {comparedCars.length > 0 && (
              <button
                type="button"
                onClick={onClearCompare}
                className="px-3.5 py-2 text-xs font-medium text-[#68625D] hover:text-[#181615] border border-[#D6CEBE] rounded bg-[#FBF9F5] transition-colors whitespace-nowrap cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Curated Preset Comparison Pairings & Vehicle Selector */}
        <div className="py-5 border-b border-[#E5E0D8] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#68625D] mr-1">Curated Comparison Trios:</span>
            <button
              type="button"
              onClick={() =>
                onSetComparisonPreset([
                  'ferrari-250-gt-swb-1961',
                  'mclaren-f1-1995',
                  'porsche-911-gt1-strassenversion-1997',
                ])
              }
              className="px-3 py-1.5 text-xs font-medium bg-[#FBF9F5] hover:bg-[#EFECE6] text-[#181615] border border-[#D6CEBE] rounded transition-colors whitespace-nowrap cursor-pointer"
            >
              Cross-Era Icons (1961 vs 1995 vs 1997)
            </button>
            <button
              type="button"
              onClick={() =>
                onSetComparisonPreset([
                  'lancia-delta-s4-stradale-1985',
                  'porsche-959-komfort-1987',
                  'audi-sport-quattro-1984',
                ])
              }
              className="px-3 py-1.5 text-xs font-medium bg-[#FBF9F5] hover:bg-[#EFECE6] text-[#181615] border border-[#D6CEBE] rounded transition-colors whitespace-nowrap cursor-pointer"
            >
              Group B Rally Trio
            </button>
            <button
              type="button"
              onClick={() =>
                onSetComparisonPreset([
                  'porsche-carrera-gt-2005',
                  'mclaren-f1-1995',
                  'lexus-lfa-nurburgring-2012',
                ])
              }
              className="px-3 py-1.5 text-xs font-medium bg-[#FBF9F5] hover:bg-[#EFECE6] text-[#181615] border border-[#D6CEBE] rounded transition-colors whitespace-nowrap cursor-pointer"
            >
              Analog V10 & V12 Hypercars
            </button>
          </div>

          {comparedCars.length < 3 && availableToAdd.length > 0 && (
            <div className="flex items-center gap-2">
              <label htmlFor="add-compare-select" className="sr-only">
                Add vehicle to comparison
              </label>
              <select
                id="add-compare-select"
                value=""
                onChange={(e) => {
                  if (e.target.value) {
                    onAddCarToCompare(e.target.value);
                  }
                }}
                className="px-3.5 py-1.5 text-xs bg-[#FBF9F5] border border-[#D6CEBE] rounded text-[#181615] focus:outline-none focus:border-[#8C2D19]"
              >
                <option value="">+ Add Car to Compare ({comparedCars.length}/3 Selected)</option>
                {availableToAdd.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.year} {car.marque} {car.model} ({car.collectionName})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Status Notice if fewer than 2 cars selected */}
        {comparedCars.length < 2 && (
          <div className="mt-6 p-4 bg-[#FBF9F5] border border-[#D6CEBE] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-[#57534E]">
              <strong className="text-[#181615]">Select at least 2 cars to highlight specification differences:</strong>{' '}
              You currently have {comparedCars.length} {comparedCars.length === 1 ? 'car' : 'cars'} selected. Use the selector in any empty column below or load a Curated Comparison Trio above.
            </div>
          </div>
        )}

        {/* Comparison Table */}
        <div className="mt-6 overflow-x-auto bg-[#FBF9F5] border border-[#E5E0D8]">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-[#E5E0D8]">
                <th className="w-1/4 p-5 bg-[#F3EFEA]/60 align-top">
                  <div className="text-xs font-medium text-[#68625D]">
                    Specification & Feature Matrix
                  </div>
                  <p className="text-xs text-[#78716C] font-normal mt-1.5 leading-relaxed">
                    Comparing {comparedCars.length} of 3 slots. Rows with differing specifications across selected cars are marked with <span className="font-mono-tabular text-[#8C2D19] font-medium">Δ Differs</span>.
                  </p>
                </th>
                {[0, 1, 2].map((slotIndex) => {
                  const car = comparedCars[slotIndex];
                  return (
                    <th
                      key={slotIndex}
                      className="w-1/4 p-5 border-l border-[#E5E0D8] align-top"
                    >
                      {car ? (
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="text-[11px] font-mono-tabular text-[#68625D]">
                              Slot 0{slotIndex + 1} · {car.accessionNumber}
                            </span>
                            <button
                              type="button"
                              onClick={() => onRemoveFromCompare(car.id)}
                              className="text-[#68625D] hover:text-[#8C2D19] transition-colors cursor-pointer"
                              aria-label={`Remove ${car.marque} ${car.model} from comparison`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="aspect-4/3 mb-3 bg-[#EFECE6] border border-[#E5E0D8]">
                            <ImageWithFallback
                              src={car.image}
                              alt={`${car.year} ${car.marque} ${car.model}`}
                              className="w-full h-full object-cover"
                              containerClassName="w-full h-full overflow-hidden"
                            />
                          </div>
                          <div className="text-xs text-[#68625D]">
                            {car.year} · {car.countryOfOrigin} · {car.collectionName}
                          </div>
                          <div className="font-display text-xl font-medium text-[#181615] mt-0.5">
                            {car.marque} {car.model}
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="font-mono-tabular text-sm font-semibold text-[#8C2D19]">
                              ${car.valuationUsd.toLocaleString()}
                            </span>
                            <button
                              type="button"
                              onClick={() => onInspectCar(car)}
                              className="text-xs font-medium text-[#181615] hover:text-[#8C2D19] flex items-center gap-1 cursor-pointer"
                            >
                              <span>Full Dossier</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full min-h-[230px] flex flex-col items-center justify-center text-center p-4 border border-dashed border-[#D6CEBE] bg-[#F3EFEA]/30">
                          <Plus className="w-5 h-5 text-[#A8A29E] mb-2" />
                          <span className="text-xs font-medium text-[#181615]">
                            Comparison Slot 0{slotIndex + 1}
                          </span>
                          <span className="text-[11px] text-[#68625D] mt-1 mb-3">
                            Choose a car from the vault to compare:
                          </span>
                          <select
                            aria-label={`Select car for comparison slot ${slotIndex + 1}`}
                            value=""
                            onChange={(e) => {
                              if (e.target.value) {
                                onAddCarToCompare(e.target.value);
                              }
                            }}
                            className="w-full max-w-[210px] px-2.5 py-1.5 text-xs bg-[#FBF9F5] border border-[#D6CEBE] rounded text-[#181615] font-normal focus:outline-none focus:border-[#8C2D19]"
                          >
                            <option value="">Select vehicle...</option>
                            {availableToAdd.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.year} {item.marque} {item.model}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8] text-xs">
              {visibleRows.map((row) => {
                const differs = isRowDifferent(row);
                const rowHighlighted = highlightDifferences && differs;

                return (
                  <tr
                    key={row.id}
                    className={
                      rowHighlighted
                        ? 'bg-[#FDF8F4]'
                        : 'bg-[#FBF9F5]'
                    }
                  >
                    <td
                      className={`p-4 font-medium text-[#181615] ${
                        rowHighlighted
                          ? 'border-l-2 border-l-[#8C2D19] bg-[#F9EFE8]/70'
                          : 'bg-[#F3EFEA]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span>{row.label}</span>
                        {comparedCars.length >= 2 && (
                          <span
                            className={`text-[11px] font-mono-tabular ${
                              differs ? 'text-[#8C2D19] font-semibold' : 'text-[#78716C]'
                            }`}
                          >
                            {differs ? 'Δ Differs' : '= Identical'}
                          </span>
                        )}
                      </div>
                    </td>
                    {[0, 1, 2].map((slotIdx) => {
                      const car = comparedCars[slotIdx];
                      const leader = car ? isCellLeader(row, car) : false;

                      return (
                        <td
                          key={slotIdx}
                          className={`p-4 border-l border-[#E5E0D8] font-mono-tabular align-top ${
                            leader && highlightDifferences
                              ? 'bg-[#F5E6DC]/65 font-semibold text-[#181615]'
                              : 'text-[#292524]'
                          }`}
                        >
                          {car ? (
                            <div>
                              <div>{row.getValue(car)}</div>
                              {leader && highlightDifferences && row.leaderLabel && (
                                <div className="text-[11px] text-[#8C2D19] font-sans font-medium mt-1">
                                  ★ {row.leaderLabel}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-[#A8A29E]">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {/* Distinguishing Features Comparison Row */}
              <tr className="bg-[#FBF9F5]">
                <td className="p-4 bg-[#F3EFEA]/40 font-medium text-[#181615] align-top">
                  <div className="flex items-center justify-between gap-2">
                    <span>Key Engineering & Coachwork Features</span>
                    {comparedCars.length >= 2 && (
                      <span className="text-[11px] font-mono-tabular text-[#8C2D19] font-semibold">
                        Δ Unique Specs
                      </span>
                    )}
                  </div>
                </td>
                {[0, 1, 2].map((slotIdx) => {
                  const car = comparedCars[slotIdx];
                  return (
                    <td
                      key={slotIdx}
                      className="p-4 border-l border-[#E5E0D8] text-[#292524] align-top"
                    >
                      {car ? (
                        <ul className="space-y-1.5">
                          {car.keyFeatures.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-1.5 leading-relaxed">
                              <span className="font-mono-tabular text-[#8C2D19] shrink-0">
                                0{fIdx + 1}.
                              </span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-[#A8A29E]">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
