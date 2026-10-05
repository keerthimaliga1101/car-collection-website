import React, { useState } from 'react';
import { X, Check, ArrowUpRight, Bookmark, Scale, Calendar } from 'lucide-react';
import { CarItem } from '../data/collections';
import { ImageWithFallback } from './ImageWithFallback';

interface VehicleAccessionModalProps {
  car: CarItem | null;
  onClose: () => void;
  isSavedInDossier: boolean;
  onToggleDossier: (carId: string) => void;
  isCompared: boolean;
  onToggleCompare: (carId: string) => void;
  onRequestViewing: (car: CarItem) => void;
  dossierNote: string;
  onSaveNote: (carId: string, note: string) => void;
}

export const VehicleAccessionModal: React.FC<VehicleAccessionModalProps> = ({
  car,
  onClose,
  isSavedInDossier,
  onToggleDossier,
  isCompared,
  onToggleCompare,
  onRequestViewing,
  dossierNote,
  onSaveNote,
}) => {
  const [activeTab, setActiveTab] = useState<'specifications' | 'provenance' | 'telemetry'>('specifications');
  const [noteDraft, setNoteDraft] = useState(dossierNote);
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  if (!car) return null;

  const powerToWeight = Math.round((car.specs.horsepower / car.specs.curbWeightKg) * 1000);
  const specificOutput = Math.round((car.specs.horsepower / (car.specs.displacementCc / 1000)) * 10) / 10;

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveNote(car.id, noteDraft);
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accession-modal-title"
    >
      <div className="relative w-full max-w-6xl bg-[#FBF9F5] border border-[#D6CEBE] text-[#181615] my-auto max-h-[92vh] overflow-y-auto">
        {/* Top Utility Strip */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FBF9F5]/95 backdrop-blur-xs border-b border-[#E5E0D8]">
          <div className="flex items-center gap-2 text-xs text-[#68625D] font-mono-tabular">
            <span>{car.accessionNumber}</span>
            <span aria-hidden="true">·</span>
            <span>Chassis {car.chassisNumber}</span>
            <span aria-hidden="true">·</span>
            <span>{car.galleryWing}</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#181615] hover:text-[#8C2D19] transition-colors whitespace-nowrap cursor-pointer"
            aria-label="Close accession record"
          >
            <span>Close Record</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main 2-Column Museum Accession & Contiguous Acquisition Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Visual Presentation & Curatorial Essay (7 cols) */}
          <div className="lg:col-span-7 p-6 md:p-8 lg:border-r border-[#E5E0D8]">
            <div className="bg-[#EFECE6] border border-[#E5E0D8]">
              <ImageWithFallback
                src={car.image}
                alt={`${car.year} ${car.marque} ${car.model}`}
                title={`${car.year} ${car.marque} ${car.model}`}
                subtitle={`Chassis ${car.chassisNumber}`}
                className="w-full aspect-4/3 object-cover"
                containerClassName="relative overflow-hidden bg-[#EFECE6]"
              />
            </div>
            <p className="text-xs font-display italic text-[#68625D] mt-2.5">
              {car.imageCaption}
            </p>

            {/* Curatorial Monograph Essay */}
            <div className="mt-8 pt-6 border-t border-[#E5E0D8]">
              <div className="text-xs text-[#68625D] mb-2">
                Curatorial Monograph · {car.collectionName}
              </div>
              <p className="text-[15px] leading-relaxed text-[#292524] max-w-prose first-letter:text-4xl first-letter:font-display first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-[#8C2D19]">
                {car.curatorialSummary}
              </p>
              <p className="text-sm leading-relaxed text-[#57534E] mt-4 max-w-prose">
                {car.architecturalNote}
              </p>
            </div>

            {/* Interactive Section Switcher: Specifications / Provenance / Mechanical Telemetry */}
            <div className="mt-8 pt-6 border-t border-[#E5E0D8]">
              <div className="flex items-center gap-1 p-1 bg-[#EFECE6] rounded-md w-fit mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('specifications')}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'specifications'
                      ? 'bg-[#FBF9F5] text-[#181615] shadow-2xs'
                      : 'text-[#68625D] hover:text-[#181615]'
                  }`}
                >
                  Detailed Specifications
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('provenance')}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'provenance'
                      ? 'bg-[#FBF9F5] text-[#181615] shadow-2xs'
                      : 'text-[#68625D] hover:text-[#181615]'
                  }`}
                >
                  Chain of Provenance ({car.provenance.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('telemetry')}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'telemetry'
                      ? 'bg-[#FBF9F5] text-[#181615] shadow-2xs'
                      : 'text-[#68625D] hover:text-[#181615]'
                  }`}
                >
                  Engineering Ratios & Features
                </button>
              </div>

              {activeTab === 'specifications' && (
                <dl className="divide-y divide-[#E5E0D8] border-t border-b border-[#E5E0D8] text-sm">
                  <div className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-[#68625D]">Engine Type</dt>
                    <dd className="col-span-2 text-[#181615] font-medium">
                      {car.specs.engineConfiguration} ({car.specs.displacementCc.toLocaleString()} cc)
                    </dd>
                  </div>
                  <div className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-[#68625D]">Horsepower</dt>
                    <dd className="col-span-2 text-[#181615] font-mono-tabular font-semibold">
                      {car.specs.horsepower} HP @ {car.specs.rpmRedline.toLocaleString()} RPM
                    </dd>
                  </div>
                  <div className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-[#68625D]">Torque</dt>
                    <dd className="col-span-2 text-[#181615] font-mono-tabular">
                      {car.specs.torqueNm} Nm ({car.specs.torqueLbFt} lb-ft)
                    </dd>
                  </div>
                  <div className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-[#68625D]">Fuel Efficiency (City / Hwy)</dt>
                    <dd className="col-span-2 text-[#181615] font-mono-tabular">
                      {car.specs.fuelEfficiencyFormatted}
                    </dd>
                  </div>
                  <div className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-[#68625D]">Transmission</dt>
                    <dd className="col-span-2 text-[#181615]">{car.specs.transmission}</dd>
                  </div>
                  <div className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-[#68625D]">Drivetrain</dt>
                    <dd className="col-span-2 text-[#181615] font-mono-tabular">
                      {car.specs.drivetrain} · Balance {car.specs.weightDistribution}
                    </dd>
                  </div>
                  <div className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-[#68625D]">Dimensions (L × W × H)</dt>
                    <dd className="col-span-2 text-[#181615] font-mono-tabular">
                      {car.specs.dimensions.formatted}
                    </dd>
                  </div>
                  <div className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-[#68625D]">Wheelbase</dt>
                    <dd className="col-span-2 text-[#181615] font-mono-tabular">
                      {car.specs.wheelbaseMm.toLocaleString()} mm ({(car.specs.wheelbaseMm / 25.4).toFixed(1)} in)
                    </dd>
                  </div>
                  <div className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-[#68625D]">Curb Weight</dt>
                    <dd className="col-span-2 text-[#181615] font-mono-tabular">
                      {car.specs.curbWeightKg.toLocaleString()} kg ({car.specs.curbWeightLbs.toLocaleString()} lbs)
                    </dd>
                  </div>
                  <div className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-[#68625D]">Coachbuilder & Livery</dt>
                    <dd className="col-span-2 text-[#181615]">
                      {car.coachbuilder} · {car.exteriorFinish}
                    </dd>
                  </div>
                  <div className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-[#68625D]">Heritage Certification</dt>
                    <dd className="col-span-2 text-[#181615]">{car.certification}</dd>
                  </div>
                </dl>
              )}

              {activeTab === 'provenance' && (
                <div className="space-y-4">
                  {car.provenance.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#F3EFEA] border border-[#E5E0D8] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#68625D] font-mono-tabular">
                          <span className="font-semibold text-[#8C2D19]">{item.year}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.location}</span>
                        </div>
                        <div className="text-sm font-semibold text-[#181615] mt-1">
                          {item.custodianOrEvent}
                        </div>
                        <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
                          {item.documentationNote}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'telemetry' && (
                <div className="space-y-5 p-5 bg-[#F3EFEA] border border-[#E5E0D8]">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-[#57534E]">Power-to-Weight Ratio</span>
                      <span className="font-mono-tabular font-medium text-[#181615]">
                        {powerToWeight} HP / Tonne
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#E5E0D8] overflow-hidden">
                      <div
                        className="h-full bg-[#8C2D19]"
                        style={{ width: `${Math.min(100, (powerToWeight / 600) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-[#57534E]">Specific Volumetric Output</span>
                      <span className="font-mono-tabular font-medium text-[#181615]">
                        {specificOutput} HP / Liter
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#E5E0D8] overflow-hidden">
                      <div
                        className="h-full bg-[#181615]"
                        style={{ width: `${Math.min(100, (specificOutput / 180) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-[#57534E]">Acoustic Redline Ceiling</span>
                      <span className="font-mono-tabular font-medium text-[#181615]">
                        {car.specs.rpmRedline.toLocaleString()} RPM
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#E5E0D8] overflow-hidden">
                      <div
                        className="h-full bg-[#78350F]"
                        style={{ width: `${Math.min(100, (car.specs.rpmRedline / 9500) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5E0D8]">
                    <div className="text-xs font-semibold text-[#181615] mb-2">
                      Distinguishing Mechanical & Coachwork Features
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#57534E]">
                      {car.keyFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#8C2D19] font-mono-tabular">0{idx + 1}.</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Contiguous Acquisition & Archival Dossier Module (5 cols) */}
          <div className="lg:col-span-5 p-6 md:p-8 bg-[#F3EFEA]/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#68625D]">
                <span>{car.year}</span>
                <span aria-hidden="true">·</span>
                <span>{car.countryOfOrigin}</span>
                <span aria-hidden="true">·</span>
                <span>{car.unitNumber}</span>
              </div>

              <h2
                id="accession-modal-title"
                className="font-display text-3xl md:text-4xl font-medium text-[#181615] mt-2 balance-text"
              >
                {car.marque} {car.model}
              </h2>
              <p className="text-sm text-[#68625D] mt-1">{car.designation}</p>

              {/* Valuation & Status Block */}
              <div className="mt-6 p-5 bg-[#FBF9F5] border border-[#E5E0D8]">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#68625D]">Archival Valuation Estimate</span>
                  <span className="text-xs font-medium text-[#8C2D19]">
                    {car.availabilityStatus}
                  </span>
                </div>
                <div className="text-2xl md:text-3xl font-mono-tabular font-semibold text-[#181615] mt-1">
                  ${car.valuationUsd.toLocaleString()}
                </div>
                <div className="text-xs text-[#68625D] mt-2">
                  Includes factory build sheets, metallurgical report, and climate-vault transit coordination.
                </div>
              </div>

              {/* Key Telemetry Summary Grid */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3.5 bg-[#FBF9F5] border border-[#E5E0D8]">
                  <div className="text-xs text-[#68625D]">Production Rarity</div>
                  <div className="text-sm font-mono-tabular font-semibold text-[#181615] mt-0.5">
                    {car.productionTotal} Units Globally
                  </div>
                </div>
                <div className="p-3.5 bg-[#FBF9F5] border border-[#E5E0D8]">
                  <div className="text-xs text-[#68625D]">Chassis Serial</div>
                  <div className="text-sm font-mono-tabular font-semibold text-[#181615] mt-0.5 truncate">
                    {car.chassisNumber}
                  </div>
                </div>
              </div>

              {/* Primary Contiguous CTAs */}
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onRequestViewing(car);
                  }}
                  className="w-full py-3 px-5 bg-[#8C2D19] hover:bg-[#722313] text-white text-xs font-medium tracking-wide rounded transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Private Vault Inspection</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onToggleDossier(car.id)}
                    className={`py-2.5 px-4 text-xs font-medium rounded border transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                      isSavedInDossier
                        ? 'bg-[#181615] text-white border-[#181615]'
                        : 'bg-[#FBF9F5] text-[#181615] border-[#D6CEBE] hover:border-[#181615]'
                    }`}
                  >
                    {isSavedInDossier ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                    <span>{isSavedInDossier ? 'In Private Dossier' : 'Save to Dossier'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleCompare(car.id)}
                    className={`py-2.5 px-4 text-xs font-medium rounded border transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                      isCompared
                        ? 'bg-[#78350F] text-white border-[#78350F]'
                        : 'bg-[#FBF9F5] text-[#181615] border-[#D6CEBE] hover:border-[#181615]'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>{isCompared ? 'Comparing Specs' : 'Compare Specs'}</span>
                  </button>
                </div>
              </div>

              {/* Collector's Archival Margin Note */}
              <form onSubmit={handleSaveNote} className="mt-6 pt-6 border-t border-[#E5E0D8]">
                <label
                  htmlFor="collector-note"
                  className="block text-xs font-medium text-[#181615] mb-1.5"
                >
                  Collector’s Dossier Margin Note (Saved Locally)
                </label>
                <textarea
                  id="collector-note"
                  rows={3}
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  placeholder="Record inspection questions, chassis observations, or bidding ceiling..."
                  className="w-full p-3 text-xs bg-[#FBF9F5] border border-[#D6CEBE] rounded text-[#181615] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#8C2D19]"
                />
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] text-[#68625D]">
                    {noteSavedFeedback ? 'Margin note recorded in your Private Dossier.' : 'Attached to Chassis ' + car.chassisNumber}
                  </span>
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-medium bg-[#181615] text-white rounded hover:bg-[#292524] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Save Note
                  </button>
                </div>
              </form>
            </div>

            {/* Bottom Institutional Guarantee */}
            <div className="mt-8 pt-4 border-t border-[#E5E0D8] text-xs text-[#68625D] leading-relaxed">
              Every vehicle in the Aurelia Vault is accompanied by metallurgical paint-depth logs, borescope cylinder recordings, and original customs documentation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
