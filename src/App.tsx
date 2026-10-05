import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Bookmark,
  Scale,
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
} from 'lucide-react';
import {
  CURATED_COLLECTIONS,
  CURATED_CARS,
  HERO_VAULT_IMAGE,
  CarItem,
  CollectionId,
} from './data/collections';
import { ImageWithFallback } from './components/ImageWithFallback';
import { VehicleAccessionModal } from './components/VehicleAccessionModal';
import { PrivateDossierDrawer } from './components/PrivateDossierDrawer';
import { ViewingConciergeModal } from './components/ViewingConciergeModal';
import { DetailedSpecificationsSection } from './components/DetailedSpecificationsSection';
import { ComparisonBench } from './components/ComparisonBench';

export default function App() {
  // Active Collection in the Section 01 Monograph Spotlight
  const [activeSpotlightId, setActiveSpotlightId] = useState<CollectionId>('coachbuilt-gt');

  // Inventory Catalog Filters & Sorting
  const [catalogCollectionFilter, setCatalogCollectionFilter] = useState<CollectionId | 'all'>('all');
  const [powertrainFilter, setPowertrainFilter] = useState<'all' | 'na' | 'boosted' | 'rwd' | 'awd'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'year-asc' | 'year-desc' | 'valuation-desc' | 'hp-desc' | 'rarity-asc'>('year-asc');

  // Expanded inline specification cards in the catalog grid
  const [expandedSpecCardIds, setExpandedSpecCardIds] = useState<string[]>([
    'ferrari-250-gt-swb-1961',
  ]);

  // Private Dossier (Saved Cars & Margin Notes) persisted in localStorage
  const [dossierIds, setDossierIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aurelia_vault_dossier_ids');
      return saved ? JSON.parse(saved) : ['ferrari-250-gt-swb-1961', 'mclaren-f1-1995'];
    } catch {
      return ['ferrari-250-gt-swb-1961', 'mclaren-f1-1995'];
    }
  });

  const [dossierNotes, setDossierNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('aurelia_vault_dossier_notes');
      return saved
        ? JSON.parse(saved)
        : {
            'ferrari-250-gt-swb-1961':
              'Verify Ferrari Classiche Red Book lithography binder and Borrani RW 3591 wheel date codes during Milan viewing.',
          };
    } catch {
      return {};
    }
  });

  // Compare Cars Selection (2-3 cars, initialized with 3 cross-era icons)
  const [comparedCarIds, setComparedCarIds] = useState<string[]>([
    'ferrari-250-gt-swb-1961',
    'mclaren-f1-1995',
    'porsche-911-gt1-strassenversion-1997',
  ]);

  // Modals & Drawers
  const [inspectedCar, setInspectedCar] = useState<CarItem | null>(null);
  const [isDossierDrawerOpen, setIsDossierDrawerOpen] = useState(false);
  const [isConciergeModalOpen, setIsConciergeModalOpen] = useState(false);
  const [conciergePreselectedCar, setConciergePreselectedCar] = useState<CarItem | null>(null);
  const [compareToastMessage, setCompareToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('aurelia_vault_dossier_ids', JSON.stringify(dossierIds));
    } catch {
      // ignore storage errors
    }
  }, [dossierIds]);

  useEffect(() => {
    try {
      localStorage.setItem('aurelia_vault_dossier_notes', JSON.stringify(dossierNotes));
    } catch {
      // ignore storage errors
    }
  }, [dossierNotes]);

  const activeCollection = useMemo(
    () =>
      CURATED_COLLECTIONS.find((c) => c.id === activeSpotlightId) ||
      CURATED_COLLECTIONS[0],
    [activeSpotlightId]
  );

  const spotlightCars = useMemo(
    () => CURATED_CARS.filter((car) => car.collectionId === activeSpotlightId),
    [activeSpotlightId]
  );

  const filteredCatalogCars = useMemo(() => {
    return CURATED_CARS.filter((car) => {
      if (catalogCollectionFilter !== 'all' && car.collectionId !== catalogCollectionFilter) {
        return false;
      }
      if (powertrainFilter === 'na' && car.specs.aspiration !== 'Naturally Aspirated') {
        return false;
      }
      if (powertrainFilter === 'boosted' && car.specs.aspiration === 'Naturally Aspirated') {
        return false;
      }
      if (powertrainFilter === 'rwd' && car.specs.drivetrain !== 'RWD') {
        return false;
      }
      if (powertrainFilter === 'awd' && car.specs.drivetrain !== 'AWD') {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const match =
          car.marque.toLowerCase().includes(q) ||
          car.model.toLowerCase().includes(q) ||
          car.designation.toLowerCase().includes(q) ||
          car.chassisNumber.toLowerCase().includes(q) ||
          car.coachbuilder.toLowerCase().includes(q) ||
          String(car.year).includes(q) ||
          car.specs.engineConfiguration.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'year-asc') return a.year - b.year;
      if (sortBy === 'year-desc') return b.year - a.year;
      if (sortBy === 'valuation-desc') return b.valuationUsd - a.valuationUsd;
      if (sortBy === 'hp-desc') return b.specs.horsepower - a.specs.horsepower;
      if (sortBy === 'rarity-asc') return a.productionTotal - b.productionTotal;
      return 0;
    });
  }, [catalogCollectionFilter, powertrainFilter, searchQuery, sortBy]);

  const savedDossierCars = useMemo(
    () => CURATED_CARS.filter((car) => dossierIds.includes(car.id)),
    [dossierIds]
  );

  const comparedCars = useMemo(
    () =>
      comparedCarIds
        .map((id) => CURATED_CARS.find((c) => c.id === id))
        .filter((c): c is CarItem => Boolean(c)),
    [comparedCarIds]
  );

  const handleToggleDossier = (carId: string) => {
    setDossierIds((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  const handleToggleCompare = (carId: string) => {
    setComparedCarIds((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId);
      }
      if (prev.length >= 3) {
        setCompareToastMessage(
          'Comparison table holds up to 3 vehicles at once. Remove a vehicle first or replace one in the Compare Cars section.'
        );
        setTimeout(() => setCompareToastMessage(null), 4000);
        return prev;
      }
      return [...prev, carId];
    });
  };

  const handleToggleInlineSpecCard = (carId: string) => {
    setExpandedSpecCardIds((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  const handleSaveDossierNote = (carId: string, note: string) => {
    setDossierNotes((prev) => ({
      ...prev,
      [carId]: note,
    }));
    if (!dossierIds.includes(carId)) {
      setDossierIds((prev) => [...prev, carId]);
    }
  };

  const handleOpenConciergeForCar = (car: CarItem | null) => {
    setConciergePreselectedCar(car);
    setIsConciergeModalOpen(true);
  };

  const scrollToSection = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#181615]">
      {/* TOP BAR CONTRACT: Strictly 1 row, 3 zones (Brand Wordmark | 5 Nav Links | 2 Primary Actions) */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-xs border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-display text-2xl font-semibold tracking-tight text-[#181615] whitespace-nowrap shrink-0"
          >
            Aurelia Vault
          </a>

          {/* Zone 2: 5 clean text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-xs font-medium text-[#57534E]"
          >
            <a
              href="#collections"
              className="hover:text-[#181615] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Collections
            </a>
            <a
              href="#inventory"
              className="hover:text-[#181615] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Vault Inventory
            </a>
            <a
              href="#detailed-specifications"
              className="hover:text-[#181615] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Specifications
            </a>
            <a
              href="#comparison-bench"
              className="hover:text-[#181615] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Compare Cars ({comparedCarIds.length}/3)
            </a>
            <a
              href="#provenance"
              className="hover:text-[#181615] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Provenance
            </a>
          </nav>

          {/* Zone 3: 2 primary actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsDossierDrawerOpen(true)}
              className="px-3.5 py-2 text-xs font-medium text-[#181615] bg-[#F3EFEA] hover:bg-[#E5E0D8] border border-[#D6CEBE] rounded transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#8C2D19]" />
              <span>Private Dossier ({dossierIds.length})</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenConciergeForCar(null)}
              className="px-4 py-2 text-xs font-medium text-white bg-[#8C2D19] hover:bg-[#722313] rounded transition-colors whitespace-nowrap cursor-pointer"
            >
              Book Viewing
            </button>
          </div>
        </div>
      </header>

      {/* Toast alert if user tries to compare > 3 cars */}
      {compareToastMessage && (
        <div className="fixed top-20 right-6 z-50 max-w-sm bg-[#181615] text-white px-4 py-3 rounded shadow-lg border border-[#57534E] text-xs flex items-center justify-between gap-3">
          <span>{compareToastMessage}</span>
          <button
            type="button"
            onClick={() => setCompareToastMessage(null)}
            className="text-xs underline whitespace-nowrap cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      <main id="top" className="flex-1">
        {/* HERO SECTION */}
        <section className="relative border-b border-[#E5E0D8]">
          <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Typographic Carrier (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-2 text-xs text-[#68625D] font-mono-tabular">
                  <span>Archival Exhibition Monograph</span>
                  <span aria-hidden="true">·</span>
                  <span>Milan · Geneva · St. Moritz</span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-medium text-[#181615] leading-[1.08] balance-text">
                  Curated Automotive Collections of Mechanical Consequence.
                </h1>

                <p className="text-[15px] leading-relaxed text-[#57534E] max-w-xl">
                  Aurelia Vault preserves and brokers twelve historically significant automobiles across four thematic collections—from hand-hammered 1950s coachbuilt grand tourers and Group B rally homologation specials to screaming analog V10 hypercars and road-registered Le Mans GT1 prototypes.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => scrollToSection('collections')}
                    className="px-5 py-3 bg-[#8C2D19] hover:bg-[#722313] text-white text-xs font-medium rounded transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>Explore 4 Curated Collections</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('comparison-bench')}
                    className="px-4 py-3 bg-[#FBF9F5] hover:bg-[#F3EFEA] text-[#181615] border border-[#D6CEBE] text-xs font-medium rounded transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <Scale className="w-4 h-4 text-[#8C2D19]" />
                    <span>Compare Cars ({comparedCarIds.length}/3)</span>
                  </button>
                </div>

                {/* Key Archival Metrics */}
                <div className="pt-6 border-t border-[#E5E0D8] grid grid-cols-3 gap-4">
                  <div>
                    <div className="font-mono-tabular text-xl font-semibold text-[#181615]">
                      04
                    </div>
                    <div className="text-xs text-[#68625D] mt-0.5">
                      Thematic Collections
                    </div>
                  </div>
                  <div>
                    <div className="font-mono-tabular text-xl font-semibold text-[#181615]">
                      12
                    </div>
                    <div className="text-xs text-[#68625D] mt-0.5">
                      Matching-Numbers Cars
                    </div>
                  </div>
                  <div>
                    <div className="font-mono-tabular text-xl font-semibold text-[#181615]">
                      $81.9M
                    </div>
                    <div className="text-xs text-[#68625D] mt-0.5">
                      Archival Valuation
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Dominant 16:9 Visual Carrier (7 cols) */}
              <div className="lg:col-span-7">
                <div className="relative bg-[#EFECE6] border border-[#D6CEBE] overflow-hidden group">
                  <ImageWithFallback
                    src={HERO_VAULT_IMAGE}
                    alt="1961 Ferrari 250 GT SWB Berlinetta in the North Travertine Pavilion"
                    title="1961 Ferrari 250 GT SWB Berlinetta"
                    subtitle="Chassis 2735 GT · Collection 01"
                    className="w-full aspect-16/9 object-cover transition-transform duration-200 group-hover:scale-[1.01]"
                    containerClassName="relative overflow-hidden bg-[#EFECE6]"
                  />
                  {/* Measured Contrast Scrim for Overlay Caption */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <div className="text-xs text-stone-300 font-mono-tabular">
                        Flagship Accession · ACC. 2026.01.01 · Chassis 2735 GT
                      </div>
                      <div className="font-display text-2xl font-medium mt-0.5">
                        1961 Ferrari 250 GT SWB Berlinetta
                      </div>
                      <div className="text-xs text-stone-300 font-mono-tabular mt-0.5">
                        3.0L Colombo V12 · 280 HP · 1,030 kg · $9,250,000
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInspectedCar(CURATED_CARS[0])}
                      className="px-3.5 py-2 bg-white/95 hover:bg-white text-[#181615] text-xs font-medium rounded transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Inspect Chassis 2735 GT</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Utility Ribbon (Pattern A from Museum Reference) */}
          <div className="bg-[#F3EFEA] border-t border-[#E5E0D8] py-3 px-6">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-[#57534E]">
              <div className="flex flex-wrap items-center gap-2 font-mono-tabular">
                <span className="font-medium text-[#181615]">Pavilion Hours:</span>
                <span>Tue–Sun 10:00–19:00 CET</span>
                <span aria-hidden="true">·</span>
                <span>Private Hoist & Borescope Inspections by Appointment</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection('detailed-specifications')}
                  className="text-[#8C2D19] font-medium hover:underline cursor-pointer"
                >
                  Jump to Full Technical Specifications →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 01: CURATED CAR COLLECTIONS MONOGRAPH & CHAPTER SWITCHER */}
        <section id="collections" className="py-16 md:py-24 border-b border-[#E5E0D8]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="text-xs text-[#68625D] mb-2">
                  01. Curated Exhibition Wings
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-[#181615] balance-text">
                  Four Thematic Automotive Collections
                </h2>
              </div>
              <p className="text-sm text-[#57534E] max-w-md leading-relaxed">
                Select an exhibition chapter below to read the curatorial monograph and inspect the automobiles preserved within each wing.
              </p>
            </div>

            {/* Chapter Navigation Rail (Pattern E from Museum Reference) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
              {CURATED_COLLECTIONS.map((collection) => {
                const isActive = collection.id === activeSpotlightId;
                return (
                  <button
                    key={collection.id}
                    type="button"
                    onClick={() => setActiveSpotlightId(collection.id)}
                    className={`p-5 text-left border transition-colors cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'bg-[#181615] text-white border-[#181615]'
                        : 'bg-[#F3EFEA]/60 text-[#181615] border-[#E5E0D8] hover:border-[#D6CEBE]'
                    }`}
                  >
                    <div>
                      <div
                        className={`text-xs font-mono-tabular ${
                          isActive ? 'text-stone-300' : 'text-[#8C2D19]'
                        }`}
                      >
                        {collection.indexNumber} / {collection.eraSpan}
                      </div>
                      <h3 className="font-display text-xl font-medium mt-1.5">
                        {collection.title}
                      </h3>
                    </div>
                    <div
                      className={`mt-4 pt-3 border-t text-xs font-mono-tabular flex items-center justify-between ${
                        isActive
                          ? 'border-stone-700 text-stone-300'
                          : 'border-[#E5E0D8] text-[#68625D]'
                      }`}
                    >
                      <span>{collection.vehicleCount} Automobiles</span>
                      <span>${(collection.totalValuationUsd / 1000000).toFixed(1)}M</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Collection Monograph & Asymmetric Reading Canvas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start bg-[#F3EFEA]/50 border border-[#E5E0D8] p-6 md:p-10">
              {/* Left 7 Columns: Visual + Drop-Cap Curatorial Essay + Pull Quote */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-2 text-xs text-[#68625D] font-mono-tabular">
                  <span>Collection {activeCollection.indexNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeCollection.eraSpan}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeCollection.galleryLocation}</span>
                </div>

                <div>
                  <h3 className="font-display text-3xl md:text-4xl font-medium text-[#181615]">
                    {activeCollection.title}
                  </h3>
                  <p className="text-sm text-[#68625D] mt-1">
                    {activeCollection.subtitle}
                  </p>
                </div>

                <div className="bg-[#EFECE6] border border-[#E5E0D8]">
                  <ImageWithFallback
                    src={activeCollection.heroImage}
                    alt={activeCollection.title}
                    title={activeCollection.title}
                    subtitle={activeCollection.eraSpan}
                    className="w-full aspect-16/9 object-cover"
                    containerClassName="relative overflow-hidden bg-[#EFECE6]"
                  />
                </div>
                <p className="text-xs font-display italic text-[#68625D]">
                  {activeCollection.figureCaption}
                </p>

                {/* Drop-Cap Opening Paragraph */}
                <div className="pt-2 space-y-4 max-w-prose">
                  <p className="text-[15px] leading-relaxed text-[#292524] first-letter:text-5xl first-letter:font-display first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none first-letter:text-[#8C2D19]">
                    {activeCollection.openingDropCapEssay}
                  </p>
                  <p className="text-[15px] leading-relaxed text-[#57534E]">
                    {activeCollection.secondaryNarrative}
                  </p>
                </div>

                {/* Editorial Pull Quote */}
                <blockquote className="my-6 pl-5 border-l-2 border-[#8C2D19] py-1">
                  <p className="font-display text-2xl italic text-[#181615] leading-snug">
                    “{activeCollection.pullQuote}”
                  </p>
                  <footer className="text-xs text-[#68625D] mt-2">
                    — {activeCollection.pullQuoteAttribution}
                  </footer>
                </blockquote>
              </div>

              {/* Right 5 Columns: Collection Metadata & Vehicles in this Collection */}
              <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-[#E5E0D8] lg:pl-8">
                <div className="p-5 bg-[#FBF9F5] border border-[#E5E0D8]">
                  <div className="text-xs text-[#68625D]">Curatorial Stewardship</div>
                  <div className="font-display text-xl font-medium text-[#181615] mt-0.5">
                    {activeCollection.curatorName}
                  </div>
                  <div className="text-xs text-[#68625D]">
                    {activeCollection.curatorTitle}
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#E5E0D8]">
                    <div className="text-xs font-medium text-[#181615] mb-2">
                      Defining Architectural Themes
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#57534E]">
                      {activeCollection.keyThemes.map((theme, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="font-mono-tabular text-[#8C2D19]">0{idx + 1}.</span>
                          <span>{theme}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Vehicles belonging to this Collection */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[#181615]">
                      Automobiles in Collection {activeCollection.indexNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setCatalogCollectionFilter(activeCollection.id);
                        scrollToSection('inventory');
                      }}
                      className="text-xs font-medium text-[#8C2D19] hover:underline cursor-pointer"
                    >
                      Filter Catalog to Wing →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {spotlightCars.map((car) => (
                      <div
                        key={car.id}
                        className="p-4 bg-[#FBF9F5] border border-[#E5E0D8] hover:border-[#181615] transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs text-[#68625D] font-mono-tabular">
                          <span>{car.year} · Chassis {car.chassisNumber}</span>
                          <span>${car.valuationUsd.toLocaleString()}</span>
                        </div>
                        <div className="font-display text-xl font-medium text-[#181615] mt-0.5">
                          {car.marque} {car.model}
                        </div>
                        <div className="text-xs text-[#57534E] font-mono-tabular mt-1">
                          {car.specs.engineConfiguration.split('(')[0].trim()} · {car.specs.horsepower} HP · {car.specs.curbWeightKg.toLocaleString()} kg
                        </div>
                        <div className="mt-3 pt-2.5 border-t border-[#E5E0D8] flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => setInspectedCar(car)}
                            className="text-xs font-medium text-[#181615] hover:text-[#8C2D19] flex items-center gap-1 cursor-pointer"
                          >
                            <span>Inspect Accession Record</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleCompare(car.id)}
                            className={`text-xs font-medium cursor-pointer ${
                              comparedCarIds.includes(car.id)
                                ? 'text-[#8C2D19] font-semibold'
                                : 'text-[#68625D] hover:text-[#181615]'
                            }`}
                          >
                            {comparedCarIds.includes(car.id) ? '✓ In Compare' : '+ Compare'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: THE VAULT INVENTORY & FILTERABLE COLLECTION CATALOG */}
        <section id="inventory" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E5E0D8]">
              <div>
                <div className="text-xs text-[#68625D] mb-2">
                  02. Complete Archival Catalog
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-[#181615] balance-text">
                  Curated Automobiles Available for Inspection
                </h2>
              </div>

              {/* Search & Sort Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#68625D] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search marque, model, chassis..."
                    aria-label="Search vehicles"
                    className="pl-8 pr-3.5 py-2 text-xs bg-[#F3EFEA] border border-[#D6CEBE] rounded text-[#181615] placeholder:text-[#78716C] focus:outline-none focus:border-[#8C2D19] w-56"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#68625D]" />
                  <select
                    aria-label="Sort inventory"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="px-3 py-2 text-xs bg-[#F3EFEA] border border-[#D6CEBE] rounded text-[#181615] focus:outline-none focus:border-[#8C2D19]"
                  >
                    <option value="year-asc">Chronological (1956 → 2012)</option>
                    <option value="year-desc">Chronological (2012 → 1956)</option>
                    <option value="valuation-desc">Valuation: Highest First</option>
                    <option value="hp-desc">Horsepower: Highest First</option>
                    <option value="rarity-asc">Rarity: Lowest Production Run</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Interactive Segmented Filter Bar (Zero-Pill for static text; functional buttons for filters) */}
            <div className="py-5 border-b border-[#E5E0D8] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Collection Tabs */}
              <div className="flex flex-wrap items-center gap-1 p-1 bg-[#EFECE6] rounded-lg">
                <button
                  type="button"
                  onClick={() => setCatalogCollectionFilter('all')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    catalogCollectionFilter === 'all'
                      ? 'bg-[#FBF9F5] text-[#181615] shadow-2xs'
                      : 'text-[#68625D] hover:text-[#181615]'
                  }`}
                >
                  All Collections ({CURATED_CARS.length})
                </button>
                {CURATED_COLLECTIONS.map((col) => (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => setCatalogCollectionFilter(col.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      catalogCollectionFilter === col.id
                        ? 'bg-[#FBF9F5] text-[#181615] shadow-2xs'
                        : 'text-[#68625D] hover:text-[#181615]'
                    }`}
                  >
                    {col.indexNumber}. {col.title.replace('The ', '')}
                  </button>
                ))}
              </div>

              {/* Powertrain / Drivetrain Filter */}
              <div className="flex flex-wrap items-center gap-1 p-1 bg-[#EFECE6] rounded-lg">
                {(
                  [
                    { id: 'all', label: 'All Powertrains' },
                    { id: 'na', label: 'Naturally Aspirated' },
                    { id: 'boosted', label: 'Forced Induction' },
                    { id: 'rwd', label: 'RWD' },
                    { id: 'awd', label: 'AWD' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPowertrainFilter(item.id)}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      powertrainFilter === item.id
                        ? 'bg-[#FBF9F5] text-[#181615] shadow-2xs'
                        : 'text-[#68625D] hover:text-[#181615]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3-Column Featured Collection Grid */}
            {filteredCatalogCars.length === 0 ? (
              <div className="my-12 p-12 text-center bg-[#F3EFEA]/50 border border-[#E5E0D8]">
                <h3 className="font-display text-2xl font-medium text-[#181615]">
                  No Matching Chassis Found in the Archive
                </h3>
                <p className="text-xs text-[#68625D] mt-2">
                  Adjust your collection filter, powertrain selection, or search query to view available vehicles.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCatalogCollectionFilter('all');
                    setPowertrainFilter('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-[#181615] text-white text-xs font-medium rounded cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredCatalogCars.map((car) => {
                  const isSaved = dossierIds.includes(car.id);
                  const isCompared = comparedCarIds.includes(car.id);
                  const isSpecExpanded = expandedSpecCardIds.includes(car.id);

                  return (
                    <article
                      key={car.id}
                      className="bg-[#FBF9F5] border border-[#E5E0D8] flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5 hover:border-[#D6CEBE]"
                    >
                      <div>
                        {/* Card Image Slot (4:3) */}
                        <div
                          onClick={() => setInspectedCar(car)}
                          className="cursor-pointer bg-[#EFECE6] border-b border-[#E5E0D8] relative group"
                        >
                          <ImageWithFallback
                            src={car.image}
                            alt={`${car.year} ${car.marque} ${car.model}`}
                            title={`${car.year} ${car.marque} ${car.model}`}
                            subtitle={`Chassis ${car.chassisNumber}`}
                            className="w-full aspect-4/3 object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                            containerClassName="relative overflow-hidden bg-[#EFECE6]"
                          />
                        </div>

                        {/* Card Body: Unboxed Metadata & Typographic Hierarchy */}
                        <div className="p-6">
                          {/* Clean Unboxed Metadata with Middot Separators (No Pills!) */}
                          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#68625D] font-mono-tabular">
                            <span>{car.year}</span>
                            <span aria-hidden="true">·</span>
                            <span>Chassis {car.chassisNumber}</span>
                            <span aria-hidden="true">·</span>
                            <span>{car.productionTotal} Built</span>
                          </div>

                          <h3
                            onClick={() => setInspectedCar(car)}
                            className="font-display text-2xl font-medium text-[#181615] mt-1.5 hover:text-[#8C2D19] transition-colors cursor-pointer"
                          >
                            {car.marque} {car.model}
                          </h3>

                          <div className="text-xs text-[#68625D] mt-0.5">
                            {car.collectionName} · {car.availabilityStatus}
                          </div>

                          {/* Core Telemetry Bar */}
                          <div className="mt-4 pt-3 border-t border-[#E5E0D8] flex items-center justify-between text-xs font-mono-tabular text-[#292524]">
                            <span>{car.specs.horsepower} HP</span>
                            <span aria-hidden="true">·</span>
                            <span>{car.specs.torqueNm} Nm</span>
                            <span aria-hidden="true">·</span>
                            <span>{car.specs.drivetrain}</span>
                            <span aria-hidden="true">·</span>
                            <span>{car.specs.curbWeightKg.toLocaleString()} kg</span>
                          </div>

                          {/* Expandable Detailed Specifications Drawer inside each Card */}
                          <div className="mt-4 pt-3 border-t border-[#E5E0D8]">
                            <button
                              type="button"
                              onClick={() => handleToggleInlineSpecCard(car.id)}
                              className="w-full flex items-center justify-between text-xs font-medium text-[#57534E] hover:text-[#181615] transition-colors cursor-pointer"
                            >
                              <span>Detailed Specifications (9 Fields)</span>
                              {isSpecExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>

                            {isSpecExpanded && (
                              <dl className="mt-3 pt-3 border-t border-[#E5E0D8] space-y-2 text-xs">
                                <div className="flex justify-between gap-2">
                                  <dt className="text-[#68625D] shrink-0">Engine Type:</dt>
                                  <dd className="text-[#181615] text-right font-medium">
                                    {car.specs.engineConfiguration}
                                  </dd>
                                </div>
                                <div className="flex justify-between gap-2">
                                  <dt className="text-[#68625D]">Horsepower:</dt>
                                  <dd className="text-[#181615] font-mono-tabular">
                                    {car.specs.horsepower} HP @ {car.specs.rpmRedline.toLocaleString()} RPM
                                  </dd>
                                </div>
                                <div className="flex justify-between gap-2">
                                  <dt className="text-[#68625D]">Torque:</dt>
                                  <dd className="text-[#181615] font-mono-tabular">
                                    {car.specs.torqueNm} Nm ({car.specs.torqueLbFt} lb-ft)
                                  </dd>
                                </div>
                                <div className="flex justify-between gap-2">
                                  <dt className="text-[#68625D]">Fuel Efficiency:</dt>
                                  <dd className="text-[#181615] font-mono-tabular">
                                    {car.specs.fuelEfficiencyCityMpg} city / {car.specs.fuelEfficiencyHwyMpg} hwy mpg
                                  </dd>
                                </div>
                                <div className="flex justify-between gap-2">
                                  <dt className="text-[#68625D] shrink-0">Transmission:</dt>
                                  <dd className="text-[#181615] text-right">
                                    {car.specs.transmission}
                                  </dd>
                                </div>
                                <div className="flex justify-between gap-2">
                                  <dt className="text-[#68625D]">Drivetrain:</dt>
                                  <dd className="text-[#181615] font-mono-tabular">
                                    {car.specs.drivetrain} ({car.specs.weightDistribution})
                                  </dd>
                                </div>
                                <div className="flex justify-between gap-2">
                                  <dt className="text-[#68625D]">Dimensions (L×W×H):</dt>
                                  <dd className="text-[#181615] font-mono-tabular">
                                    {car.specs.dimensions.formatted}
                                  </dd>
                                </div>
                                <div className="flex justify-between gap-2">
                                  <dt className="text-[#68625D]">Wheelbase:</dt>
                                  <dd className="text-[#181615] font-mono-tabular">
                                    {car.specs.wheelbaseMm.toLocaleString()} mm
                                  </dd>
                                </div>
                                <div className="flex justify-between gap-2">
                                  <dt className="text-[#68625D]">Curb Weight:</dt>
                                  <dd className="text-[#181615] font-mono-tabular">
                                    {car.specs.curbWeightKg.toLocaleString()} kg ({car.specs.curbWeightLbs.toLocaleString()} lbs)
                                  </dd>
                                </div>
                              </dl>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer: Valuation & Action Buttons */}
                      <div className="px-6 py-4 bg-[#F3EFEA]/60 border-t border-[#E5E0D8] flex items-center justify-between gap-2">
                        <div>
                          <div className="text-[11px] text-[#68625D]">Valuation</div>
                          <div className="text-base font-mono-tabular font-semibold text-[#181615]">
                            ${car.valuationUsd.toLocaleString()}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleCompare(car.id)}
                            className={`px-2.5 py-1.5 text-xs font-medium rounded border transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                              isCompared
                                ? 'bg-[#8C2D19] text-white border-[#8C2D19]'
                                : 'bg-[#FBF9F5] text-[#181615] border-[#D6CEBE] hover:border-[#181615]'
                            }`}
                            title="Add or remove from Compare Cars table"
                          >
                            {isCompared ? <Check className="w-3.5 h-3.5" /> : <Scale className="w-3.5 h-3.5" />}
                            <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleDossier(car.id)}
                            className={`p-1.5 rounded border transition-colors cursor-pointer ${
                              isSaved
                                ? 'bg-[#181615] text-white border-[#181615]'
                                : 'bg-[#FBF9F5] text-[#181615] border-[#D6CEBE] hover:border-[#181615]'
                            }`}
                            aria-label={isSaved ? 'Remove from Private Dossier' : 'Save to Private Dossier'}
                            title={isSaved ? 'Saved in Private Dossier' : 'Save to Private Dossier'}
                          >
                            <Bookmark className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setInspectedCar(car)}
                            className="px-3 py-1.5 text-xs font-medium bg-[#181615] text-white rounded hover:bg-[#292524] transition-colors whitespace-nowrap cursor-pointer"
                          >
                            Dossier
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* SECTION 03: DETAILED SPECIFICATIONS DIRECTORY */}
        <DetailedSpecificationsSection
          cars={CURATED_CARS}
          comparedCarIds={comparedCarIds}
          onToggleCompare={handleToggleCompare}
          onInspectCar={(car) => setInspectedCar(car)}
          onJumpToCompare={() => scrollToSection('comparison-bench')}
        />

        {/* SECTION 04: COMPARE CARS (2-3 CARS SIDE-BY-SIDE WITH HIGHLIGHTED DIFFERENCES) */}
        <ComparisonBench
          comparedCars={comparedCars}
          allCars={CURATED_CARS}
          onRemoveFromCompare={(carId) =>
            setComparedCarIds((prev) => prev.filter((id) => id !== carId))
          }
          onAddCarToCompare={(carId) => handleToggleCompare(carId)}
          onSetComparisonPreset={(ids) => setComparedCarIds(ids)}
          onClearCompare={() => setComparedCarIds([])}
          onInspectCar={(car) => setInspectedCar(car)}
        />

        {/* SECTION 05: PROVENANCE PROTOCOL & ATTRIBUTABLE TESTIMONIALS */}
        <section id="provenance" className="py-16 md:py-24 border-t border-[#E5E0D8] bg-[#FBF9F5]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <div className="text-xs text-[#68625D] mb-2">
                  05. Archival Verification & Stewardship
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-[#181615] balance-text">
                  Metallurgical Rigor & Unbroken Chain of Custody
                </h2>
                <p className="text-sm text-[#57534E] mt-3 leading-relaxed">
                  Every vehicle inducted into the Aurelia Vault undergoes a 140-point non-destructive metallurgical and historical audit prior to cataloging. We reject re-stamped engine blocks, undocumented frame repairs, and unverified reproduction coachwork.
                </p>

                <dl className="mt-8 pt-6 border-t border-[#E5E0D8] grid grid-cols-2 gap-6">
                  <div>
                    <dt className="text-xs text-[#68625D]">Classiche & FIA Passports</dt>
                    <dd className="font-mono-tabular text-2xl font-semibold text-[#181615] mt-1">
                      100% Certified
                    </dd>
                    <dd className="text-xs text-[#68625D] mt-0.5">
                      Across all 12 cataloged chassis
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#68625D]">Borescope & Paint Audit</dt>
                    <dd className="font-mono-tabular text-2xl font-semibold text-[#181615] mt-1">
                      ±2 Microns
                    </dd>
                    <dd className="text-xs text-[#68625D] mt-0.5">
                      Ultrasonic alloy panel mapping
                    </dd>
                  </div>
                </dl>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => handleOpenConciergeForCar(null)}
                    className="px-5 py-3 bg-[#181615] hover:bg-[#292524] text-white text-xs font-medium rounded transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Private Sanctuary Appointment</span>
                  </button>
                </div>
              </div>

              {/* Attributable Collector & Institutional Testimonials (Claim-to-Proof Adjacency) */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-[#F3EFEA] border border-[#E5E0D8] flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono-tabular text-[#8C2D19]">
                      Acquisition Case Study · Chassis 2735 GT
                    </div>
                    <p className="font-display text-xl italic text-[#181615] mt-3 leading-relaxed">
                      “Before engaging Aurelia Vault, our foundation spent four years evaluating short-wheelbase Berlinettas with ambiguous gearbox stampings. Dr. Valenti’s team provided X-ray metallurgy logs and original 1961 Milan ACI registration folios within 48 hours, enabling a seamless private treaty acquisition.”
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#E5E0D8]">
                    <div className="text-xs font-semibold text-[#181615]">
                      Marcello & Beatrice Visconti
                    </div>
                    <div className="text-xs text-[#68625D]">
                      Trustees, Fondazione Scuderia Storica · Milan, Italy
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-[#F3EFEA] border border-[#E5E0D8] flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono-tabular text-[#8C2D19]">
                      Archival Loan & Homologation Audit · Wing B
                    </div>
                    <p className="font-display text-xl italic text-[#181615] mt-3 leading-relaxed">
                      “Sourcing an unmodified Group B Lancia Delta S4 Stradale with its original Abarth Volumex Plumbing and factory Speedline magnesium wheels is nearly impossible today. Aurelia Vault’s side-by-side specification telemetry and hoist inspection protocol set a new institutional benchmark.”
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#E5E0D8]">
                    <div className="text-xs font-semibold text-[#181615]">
                      Dr. Lukas Von Berg
                    </div>
                    <div className="text-xs text-[#68625D]">
                      Director of Collections, Alpine Motoring Museum · Zurich
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET FOOTER (No ornamental status tickers or fake background engines) */}
      <footer className="bg-[#181615] text-stone-300 py-12 border-t border-[#292524]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
            <div className="md:col-span-2">
              <div className="font-display text-2xl font-semibold text-white">
                Aurelia Vault
              </div>
              <p className="text-xs text-stone-400 mt-2 max-w-sm leading-relaxed">
                Curated Automotive Collections & Private Treaty Archival House. Sanctuaries in Milan, Geneva, and St. Moritz.
              </p>
            </div>

            <div>
              <div className="text-xs font-semibold text-white mb-3">
                Curated Collections
              </div>
              <ul className="space-y-2 text-xs text-stone-400">
                {CURATED_COLLECTIONS.map((col) => (
                  <li key={col.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSpotlightId(col.id);
                        scrollToSection('collections');
                      }}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {col.indexNumber}. {col.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold text-white mb-3">
                Archival Navigation
              </div>
              <ul className="space-y-2 text-xs text-stone-400">
                <li>
                  <a href="#inventory" className="hover:text-white transition-colors">
                    Complete Vault Inventory
                  </a>
                </li>
                <li>
                  <a href="#detailed-specifications" className="hover:text-white transition-colors">
                    Detailed Specifications Directory
                  </a>
                </li>
                <li>
                  <a href="#comparison-bench" className="hover:text-white transition-colors">
                    Compare Cars Matrix
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenConciergeForCar(null)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Arrange Private Viewing
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-500">
            <div>
              © {new Date().getFullYear()} Aurelia Vault S.A. All chassis numbers and historical monographs verified for archival reference.
            </div>
            <div className="flex items-center gap-4">
              <span>Milan Sanctuary</span>
              <span>·</span>
              <span>Geneva Free Port</span>
              <span>·</span>
              <span>St. Moritz Rotunda</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MODALS & DRAWERS */}
      <VehicleAccessionModal
        car={inspectedCar}
        onClose={() => setInspectedCar(null)}
        isSavedInDossier={inspectedCar ? dossierIds.includes(inspectedCar.id) : false}
        onToggleDossier={handleToggleDossier}
        isCompared={inspectedCar ? comparedCarIds.includes(inspectedCar.id) : false}
        onToggleCompare={handleToggleCompare}
        onRequestViewing={(car) => handleOpenConciergeForCar(car)}
        dossierNote={inspectedCar ? dossierNotes[inspectedCar.id] || '' : ''}
        onSaveNote={handleSaveDossierNote}
      />

      <PrivateDossierDrawer
        isOpen={isDossierDrawerOpen}
        onClose={() => setIsDossierDrawerOpen(false)}
        savedCars={savedDossierCars}
        dossierNotes={dossierNotes}
        onRemoveCar={(carId) => handleToggleDossier(carId)}
        onClearAll={() => setDossierIds([])}
        onInspectCar={(car) => setInspectedCar(car)}
        onBookPortfolioViewing={() => handleOpenConciergeForCar(null)}
      />

      <ViewingConciergeModal
        isOpen={isConciergeModalOpen}
        onClose={() => setIsConciergeModalOpen(false)}
        preselectedCar={conciergePreselectedCar}
        dossierCars={savedDossierCars}
      />
    </div>
  );
}
