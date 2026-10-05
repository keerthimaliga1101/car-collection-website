import React, { useState } from 'react';
import { Scale, ArrowUpRight, Check } from 'lucide-react';
import { CarItem, CollectionId, CURATED_COLLECTIONS } from '../data/collections';
import { ImageWithFallback } from './ImageWithFallback';

interface DetailedSpecificationsSectionProps {
  cars: CarItem[];
  comparedCarIds: string[];
  onToggleCompare: (carId: string) => void;
  onInspectCar: (car: CarItem) => void;
  onJumpToCompare: () => void;
}

export const DetailedSpecificationsSection: React.FC<DetailedSpecificationsSectionProps> = ({
  cars,
  comparedCarIds,
  onToggleCompare,
  onInspectCar,
  onJumpToCompare,
}) => {
  const [selectedCollection, setSelectedCollection] = useState<CollectionId | 'all'>('all');
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  const filteredCars =
    selectedCollection === 'all'
      ? cars
      : cars.filter((car) => car.collectionId === selectedCollection);

  const formatMmToInches = (mm: number) => `${(mm / 25.4).toFixed(1)} in`;

  return (
    <section
      id="detailed-specifications"
      className="py-16 md:py-24 border-t border-[#E5E0D8] bg-[#FBF9F5]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5E0D8]">
          <div>
            <div className="text-xs text-[#68625D] mb-2">
              03. Technical Homologation & Engineering Ledger
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#181615] balance-text">
              Detailed Specifications by Chassis
            </h2>
            <p className="text-sm text-[#57534E] mt-2 max-w-2xl leading-relaxed">
              Complete factory-verified technical specifications for every automobile in the Aurelia Vault—covering engine architecture, horsepower, torque, city/highway fuel efficiency, transmission, drivetrain, exterior dimensions, wheelbase, and curb weight.
            </p>
          </div>

          {/* Interactive Filter Controls & Unit Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Unit Toggle */}
            <div className="flex items-center gap-1 p-1 bg-[#EFECE6] rounded-md">
              <button
                type="button"
                onClick={() => setUnitSystem('metric')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  unitSystem === 'metric'
                    ? 'bg-[#FBF9F5] text-[#181615] shadow-2xs'
                    : 'text-[#68625D] hover:text-[#181615]'
                }`}
              >
                Metric (mm / kg / Nm)
              </button>
              <button
                type="button"
                onClick={() => setUnitSystem('imperial')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  unitSystem === 'imperial'
                    ? 'bg-[#FBF9F5] text-[#181615] shadow-2xs'
                    : 'text-[#68625D] hover:text-[#181615]'
                }`}
              >
                Imperial (in / lbs / lb-ft)
              </button>
            </div>

            {comparedCarIds.length >= 2 && (
              <button
                type="button"
                onClick={onJumpToCompare}
                className="px-4 py-2 text-xs font-medium bg-[#8C2D19] text-white rounded hover:bg-[#722313] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>View Comparison Table ({comparedCarIds.length}/3)</span>
              </button>
            )}
          </div>
        </div>

        {/* Collection Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-b border-[#E5E0D8]">
          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#EFECE6] rounded-lg">
            <button
              type="button"
              onClick={() => setSelectedCollection('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCollection === 'all'
                  ? 'bg-[#FBF9F5] text-[#181615] shadow-2xs'
                  : 'text-[#68625D] hover:text-[#181615]'
              }`}
            >
              All 12 Vehicles
            </button>
            {CURATED_COLLECTIONS.map((col) => (
              <button
                key={col.id}
                type="button"
                onClick={() => setSelectedCollection(col.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCollection === col.id
                    ? 'bg-[#FBF9F5] text-[#181615] shadow-2xs'
                    : 'text-[#68625D] hover:text-[#181615]'
                }`}
              >
                {col.indexNumber}. {col.title}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#68625D] font-mono-tabular">
            Showing {filteredCars.length} of {cars.length} Certified Specification Sheets
          </div>
        </div>

        {/* Detailed Specification Sheets Grid */}
        <div className="mt-8 space-y-6">
          {filteredCars.map((car) => {
            const isCompared = comparedCarIds.includes(car.id);
            const compareLimitReached = !isCompared && comparedCarIds.length >= 3;

            return (
              <article
                key={car.id}
                className="bg-[#F3EFEA]/60 border border-[#E5E0D8] p-6 md:p-8 transition-colors hover:border-[#D6CEBE]"
              >
                {/* Top Row: Identity, Collection Context & Actions */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#E5E0D8]">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-28 h-20 shrink-0 bg-[#EFECE6] border border-[#E5E0D8]">
                      <ImageWithFallback
                        src={car.image}
                        alt={`${car.year} ${car.marque} ${car.model}`}
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full overflow-hidden"
                      />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#68625D] font-mono-tabular">
                        <span>{car.accessionNumber}</span>
                        <span aria-hidden="true">·</span>
                        <span>{car.collectionName}</span>
                        <span aria-hidden="true">·</span>
                        <span>Chassis {car.chassisNumber}</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-medium text-[#181615] mt-1">
                        {car.year} {car.marque} {car.model}
                      </h3>
                      <p className="text-xs text-[#68625D] mt-0.5">
                        {car.designation} · Coachwork by {car.coachbuilder}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      disabled={compareLimitReached}
                      onClick={() => onToggleCompare(car.id)}
                      className={`px-4 py-2 text-xs font-medium rounded border transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                        isCompared
                          ? 'bg-[#8C2D19] text-white border-[#8C2D19]'
                          : compareLimitReached
                          ? 'bg-[#EFECE6] text-[#A8A29E] border-[#E5E0D8] cursor-not-allowed'
                          : 'bg-[#FBF9F5] text-[#181615] border-[#D6CEBE] hover:border-[#181615]'
                      }`}
                    >
                      {isCompared ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Selected for Comparison</span>
                        </>
                      ) : (
                        <>
                          <Scale className="w-3.5 h-3.5" />
                          <span>{compareLimitReached ? 'Compare Full (3/3)' : 'Add to Compare'}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onInspectCar(car)}
                      className="px-4 py-2 text-xs font-medium bg-[#181615] text-white rounded hover:bg-[#292524] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                    >
                      <span>Full Provenance Record</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Middle Row: 9 Mandatory Technical Specification Fields in a Clean Structured Grid */}
                <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5 py-6 border-b border-[#E5E0D8]">
                  {/* 1. Engine Type */}
                  <div className="border-l-2 border-[#D6CEBE] pl-3.5">
                    <dt className="text-xs text-[#68625D]">Engine Type</dt>
                    <dd className="text-sm font-medium text-[#181615] mt-0.5">
                      {car.specs.engineConfiguration}
                    </dd>
                    <dd className="text-xs font-mono-tabular text-[#68625D] mt-0.5">
                      {car.specs.displacementCc.toLocaleString()} cc · {car.specs.aspiration}
                    </dd>
                  </div>

                  {/* 2. Horsepower */}
                  <div className="border-l-2 border-[#D6CEBE] pl-3.5">
                    <dt className="text-xs text-[#68625D]">Horsepower</dt>
                    <dd className="text-sm font-mono-tabular font-semibold text-[#181615] mt-0.5">
                      {car.specs.horsepower} HP @ {car.specs.rpmRedline.toLocaleString()} RPM
                    </dd>
                    <dd className="text-xs font-mono-tabular text-[#68625D] mt-0.5">
                      Specific Output: {((car.specs.horsepower / car.specs.displacementCc) * 1000).toFixed(1)} HP/L
                    </dd>
                  </div>

                  {/* 3. Torque */}
                  <div className="border-l-2 border-[#D6CEBE] pl-3.5">
                    <dt className="text-xs text-[#68625D]">Torque</dt>
                    <dd className="text-sm font-mono-tabular font-semibold text-[#181615] mt-0.5">
                      {unitSystem === 'metric'
                        ? `${car.specs.torqueNm} Nm (${car.specs.torqueLbFt} lb-ft)`
                        : `${car.specs.torqueLbFt} lb-ft (${car.specs.torqueNm} Nm)`}
                    </dd>
                    <dd className="text-xs font-mono-tabular text-[#68625D] mt-0.5">
                      0–100 km/h: {car.specs.zeroToHundredSec} s · Top Speed: {car.specs.topSpeedKmh} km/h
                    </dd>
                  </div>

                  {/* 4. Fuel Efficiency (city/highway) */}
                  <div className="border-l-2 border-[#D6CEBE] pl-3.5">
                    <dt className="text-xs text-[#68625D]">Fuel Efficiency (City / Highway)</dt>
                    <dd className="text-sm font-mono-tabular font-medium text-[#181615] mt-0.5">
                      {car.specs.fuelEfficiencyCityMpg} mpg city / {car.specs.fuelEfficiencyHwyMpg} mpg highway
                    </dd>
                    <dd className="text-xs font-mono-tabular text-[#68625D] mt-0.5">
                      Combined Cycle: {car.specs.fuelEfficiencyFormatted.split('(')[1]?.replace(')', '') || 'Archival Cycle'}
                    </dd>
                  </div>

                  {/* 5. Transmission */}
                  <div className="border-l-2 border-[#D6CEBE] pl-3.5">
                    <dt className="text-xs text-[#68625D]">Transmission</dt>
                    <dd className="text-sm font-medium text-[#181615] mt-0.5">
                      {car.specs.transmission}
                    </dd>
                    <dd className="text-xs text-[#68625D] mt-0.5">
                      Factory matching gearbox serial stamping
                    </dd>
                  </div>

                  {/* 6. Drivetrain */}
                  <div className="border-l-2 border-[#D6CEBE] pl-3.5">
                    <dt className="text-xs text-[#68625D]">Drivetrain</dt>
                    <dd className="text-sm font-mono-tabular font-semibold text-[#181615] mt-0.5">
                      {car.specs.drivetrain === 'RWD'
                        ? 'Rear-Wheel Drive (RWD)'
                        : 'Permanent All-Wheel Drive (AWD)'}
                    </dd>
                    <dd className="text-xs font-mono-tabular text-[#68625D] mt-0.5">
                      Static Balance: {car.specs.weightDistribution}
                    </dd>
                  </div>

                  {/* 7. Dimensions (Length, Width, Height) */}
                  <div className="border-l-2 border-[#D6CEBE] pl-3.5">
                    <dt className="text-xs text-[#68625D]">Dimensions (Length × Width × Height)</dt>
                    <dd className="text-sm font-mono-tabular font-medium text-[#181615] mt-0.5">
                      {unitSystem === 'metric'
                        ? `L: ${car.specs.dimensions.lengthMm.toLocaleString()} mm · W: ${car.specs.dimensions.widthMm.toLocaleString()} mm · H: ${car.specs.dimensions.heightMm.toLocaleString()} mm`
                        : `L: ${formatMmToInches(car.specs.dimensions.lengthMm)} · W: ${formatMmToInches(car.specs.dimensions.widthMm)} · H: ${formatMmToInches(car.specs.dimensions.heightMm)}`}
                    </dd>
                    <dd className="text-xs font-mono-tabular text-[#68625D] mt-0.5">
                      Envelope: {car.specs.dimensions.formatted}
                    </dd>
                  </div>

                  {/* 8. Wheelbase */}
                  <div className="border-l-2 border-[#D6CEBE] pl-3.5">
                    <dt className="text-xs text-[#68625D]">Wheelbase</dt>
                    <dd className="text-sm font-mono-tabular font-semibold text-[#181615] mt-0.5">
                      {unitSystem === 'metric'
                        ? `${car.specs.wheelbaseMm.toLocaleString()} mm (${formatMmToInches(car.specs.wheelbaseMm)})`
                        : `${formatMmToInches(car.specs.wheelbaseMm)} (${car.specs.wheelbaseMm.toLocaleString()} mm)`}
                    </dd>
                    <dd className="text-xs text-[#68625D] mt-0.5">
                      Track-calibrated suspension geometry
                    </dd>
                  </div>

                  {/* 9. Curb Weight */}
                  <div className="border-l-2 border-[#D6CEBE] pl-3.5">
                    <dt className="text-xs text-[#68625D]">Curb Weight</dt>
                    <dd className="text-sm font-mono-tabular font-semibold text-[#181615] mt-0.5">
                      {unitSystem === 'metric'
                        ? `${car.specs.curbWeightKg.toLocaleString()} kg (${car.specs.curbWeightLbs.toLocaleString()} lbs)`
                        : `${car.specs.curbWeightLbs.toLocaleString()} lbs (${car.specs.curbWeightKg.toLocaleString()} kg)`}
                    </dd>
                    <dd className="text-xs font-mono-tabular text-[#68625D] mt-0.5">
                      Power-to-Weight: {Math.round((car.specs.horsepower / car.specs.curbWeightKg) * 1000)} HP/Tonne
                    </dd>
                  </div>
                </dl>

                {/* Bottom Row: Key Engineering Features */}
                <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="text-xs text-[#57534E]">
                    <span className="font-semibold text-[#181615] mr-2">Distinguishing Features:</span>
                    {car.keyFeatures.slice(0, 3).map((feat, idx) => (
                      <span key={idx}>
                        {idx > 0 && <span className="mx-2 text-[#A8A29E]">·</span>}
                        {feat}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs font-mono-tabular font-semibold text-[#8C2D19] shrink-0">
                    Valuation: ${car.valuationUsd.toLocaleString()}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
