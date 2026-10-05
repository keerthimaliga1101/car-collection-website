import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, ShieldCheck } from 'lucide-react';
import { CarItem } from '../data/collections';

interface ViewingConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCar: CarItem | null;
  dossierCars: CarItem[];
}

export const ViewingConciergeModal: React.FC<ViewingConciergeModalProps> = ({
  isOpen,
  onClose,
  preselectedCar,
  dossierCars,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [vaultLocation, setVaultLocation] = useState('Milan — North Travertine Pavilion');
  const [preferredDate, setPreferredDate] = useState('2026-10-18');
  const [inquiryType, setInquiryType] = useState<'private-inspection' | 'private-treaty-offer' | 'metallurgical-dossier'>('private-inspection');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);

  if (!isOpen) return null;

  const subjectVehicles = preselectedCar
    ? [preselectedCar]
    : dossierCars.length > 0
    ? dossierCars
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please provide your full name for vault security accreditation.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid institutional or private email address.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMessage('Please provide a direct telephone number for our Chief Archivist.');
      return;
    }

    const refCode = `AV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedReference(refCode);
  };

  const handleResetAndClose = () => {
    setSubmittedReference(null);
    setErrorMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="concierge-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-[#FBF9F5] border border-[#D6CEBE] text-[#181615] p-6 md:p-8 my-auto">
        <div className="flex items-start justify-between pb-5 border-b border-[#E5E0D8]">
          <div>
            <div className="text-xs text-[#68625D] font-mono-tabular">
              Private Treaty & Archival Concierge
            </div>
            <h2
              id="concierge-modal-title"
              className="font-display text-2xl md:text-3xl font-medium text-[#181615] mt-1"
            >
              {submittedReference
                ? 'Vault Accreditation Confirmed'
                : 'Arrange Private Pavilion Inspection'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-1.5 text-[#68625D] hover:text-[#181615] transition-colors cursor-pointer"
            aria-label="Close concierge modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedReference ? (
          <div className="py-6 space-y-6">
            <div className="p-5 bg-[#F3EFEA] border border-[#D6CEBE] flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-[#14532D] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono-tabular text-[#68625D]">
                  Accreditation Protocol Reference: <strong className="text-[#181615]">{submittedReference}</strong>
                </div>
                <h3 className="font-display text-xl font-medium text-[#181615] mt-1">
                  Private Viewing Reserved for {fullName}
                </h3>
                <p className="text-xs text-[#57534E] mt-1.5 leading-relaxed">
                  Our Senior Specialist will transmit the encrypted metallurgical dossier and security gate credentials to <strong>{email}</strong> prior to your appointment on <span className="font-mono-tabular">{preferredDate}</span>.
                </p>
              </div>
            </div>

            <dl className="divide-y divide-[#E5E0D8] border-t border-b border-[#E5E0D8] text-xs">
              <div className="py-2.5 flex justify-between">
                <dt className="text-[#68625D]">Selected Sanctuary</dt>
                <dd className="font-medium text-[#181615]">{vaultLocation}</dd>
              </div>
              <div className="py-2.5 flex justify-between">
                <dt className="text-[#68625D]">Consultation Format</dt>
                <dd className="font-medium text-[#181615]">
                  {inquiryType === 'private-inspection'
                    ? 'Hoist & Borescope Physical Inspection'
                    : inquiryType === 'private-treaty-offer'
                    ? 'Private Treaty Acquisition Proposal'
                    : 'Certified Archival Red-Book Transfer'}
                </dd>
              </div>
              <div className="py-2.5 flex justify-between">
                <dt className="text-[#68625D]">Subject Chassis</dt>
                <dd className="font-mono-tabular text-[#181615] text-right">
                  {subjectVehicles.length > 0
                    ? subjectVehicles.map((c) => `${c.year} ${c.marque} ${c.model} (#${c.chassisNumber})`).join(', ')
                    : 'Full Four-Collection Curatorial Walkthrough'}
                </dd>
              </div>
            </dl>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-5 py-2.5 bg-[#181615] text-white text-xs font-medium rounded hover:bg-[#292524] transition-colors whitespace-nowrap cursor-pointer"
              >
                Return to Exhibition
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
            {/* Subject Vehicles Banner */}
            <div className="p-4 bg-[#F3EFEA] border border-[#E5E0D8]">
              <div className="text-xs text-[#68625D]">Subject Chassis for Inspection</div>
              {subjectVehicles.length > 0 ? (
                <div className="mt-1.5 space-y-1">
                  {subjectVehicles.map((car) => (
                    <div
                      key={car.id}
                      className="flex items-center justify-between text-xs font-medium text-[#181615]"
                    >
                      <span>
                        {car.year} {car.marque} {car.model} · <span className="font-mono-tabular text-[#68625D]">Chassis {car.chassisNumber}</span>
                      </span>
                      <span className="font-mono-tabular">${car.valuationUsd.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs font-medium text-[#181615] mt-1">
                  General Curatorial Walkthrough — All 4 Archival Collections
                </div>
              )}
            </div>

            {errorMessage && (
              <div className="p-3 bg-[#FEF2F2] border border-[#991B1B] text-xs text-[#991B1B]">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#181615] mb-1">
                  Collector / Representative Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g., Lady Helena Vance"
                  className="w-full px-3.5 py-2 text-xs bg-[#FBF9F5] border border-[#D6CEBE] rounded text-[#181615] focus:outline-none focus:border-[#8C2D19]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#181615] mb-1">
                  Family Office / Collection Name (Optional)
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g., Fondation Automobiles Historiques"
                  className="w-full px-3.5 py-2 text-xs bg-[#FBF9F5] border border-[#D6CEBE] rounded text-[#181615] focus:outline-none focus:border-[#8C2D19]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#181615] mb-1">
                  Private Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="collector@domain.ch"
                  className="w-full px-3.5 py-2 text-xs bg-[#FBF9F5] border border-[#D6CEBE] rounded text-[#181615] focus:outline-none focus:border-[#8C2D19]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#181615] mb-1">
                  Direct Telephone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+41 22 819 0400"
                  className="w-full px-3.5 py-2 text-xs bg-[#FBF9F5] border border-[#D6CEBE] rounded text-[#181615] font-mono-tabular focus:outline-none focus:border-[#8C2D19]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#181615] mb-1">
                  Sanctuary Location
                </label>
                <select
                  value={vaultLocation}
                  onChange={(e) => setVaultLocation(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#FBF9F5] border border-[#D6CEBE] rounded text-[#181615] focus:outline-none focus:border-[#8C2D19]"
                >
                  <option value="Milan — North Travertine Pavilion">Milan — North Travertine Pavilion</option>
                  <option value="Geneva — Subterranean Slate Vault">Geneva — Subterranean Slate Vault</option>
                  <option value="St. Moritz — Alpine Climate Rotunda">St. Moritz — Alpine Climate Rotunda</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#181615] mb-1">
                  Preferred Viewing Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#FBF9F5] border border-[#D6CEBE] rounded text-[#181615] font-mono-tabular focus:outline-none focus:border-[#8C2D19]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#181615] mb-1.5">
                Protocol Requirement
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setInquiryType('private-inspection')}
                  className={`py-2 px-3 text-xs font-medium border rounded text-left transition-colors cursor-pointer ${
                    inquiryType === 'private-inspection'
                      ? 'bg-[#181615] text-white border-[#181615]'
                      : 'bg-[#FBF9F5] text-[#181615] border-[#D6CEBE]'
                  }`}
                >
                  Physical Hoist Viewing
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryType('private-treaty-offer')}
                  className={`py-2 px-3 text-xs font-medium border rounded text-left transition-colors cursor-pointer ${
                    inquiryType === 'private-treaty-offer'
                      ? 'bg-[#181615] text-white border-[#181615]'
                      : 'bg-[#FBF9F5] text-[#181615] border-[#D6CEBE]'
                  }`}
                >
                  Private Treaty Acquisition
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryType('metallurgical-dossier')}
                  className={`py-2 px-3 text-xs font-medium border rounded text-left transition-colors cursor-pointer ${
                    inquiryType === 'metallurgical-dossier'
                      ? 'bg-[#181615] text-white border-[#181615]'
                      : 'bg-[#FBF9F5] text-[#181615] border-[#D6CEBE]'
                  }`}
                >
                  Metallurgical & Classiche Files
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#181615] mb-1">
                Specialist Instructions (Hydraulic Lift, Paint Micrometer, Cold-Start Request)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specify if independent marquee specialist will accompany you..."
                className="w-full px-3.5 py-2 text-xs bg-[#FBF9F5] border border-[#D6CEBE] rounded text-[#181615] focus:outline-none focus:border-[#8C2D19]"
              />
            </div>

            <div className="pt-3 border-t border-[#E5E0D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#68625D]">
                <ShieldCheck className="w-4 h-4 text-[#8C2D19] shrink-0" />
                <span>Strict NDA & Private Treaty Discretion Guaranteed</span>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#8C2D19] hover:bg-[#722313] text-white text-xs font-medium rounded transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm Vault Accreditation</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
