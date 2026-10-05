export type CollectionId =
  | 'coachbuilt-gt'
  | 'group-b-homologation'
  | 'analog-hypercars'
  | 'endurance-prototypes';

export interface ProvenanceRecord {
  year: string;
  location: string;
  custodianOrEvent: string;
  documentationNote: string;
}

export interface CarItem {
  id: string;
  accessionNumber: string;
  collectionId: CollectionId;
  collectionName: string;
  year: number;
  marque: string;
  model: string;
  designation: string;
  chassisNumber: string;
  coachbuilder: string;
  countryOfOrigin: string;
  exteriorFinish: string;
  interiorTrim: string;
  productionTotal: number;
  unitNumber: string;
  valuationUsd: number;
  availabilityStatus: 'Available for Private Treaty' | 'On Archival Loan' | 'Reserved for Inspection';
  galleryWing: string;
  image: string;
  imageCaption: string;
  specs: {
    engineConfiguration: string;
    displacementCc: number;
    aspiration: 'Naturally Aspirated' | 'Twin-Turbocharged' | 'Turbo + Supercharged';
    horsepower: number;
    rpmRedline: number;
    torqueNm: number;
    torqueLbFt: number;
    fuelEfficiencyCityMpg: number;
    fuelEfficiencyHwyMpg: number;
    fuelEfficiencyFormatted: string;
    transmission: string;
    drivetrain: 'RWD' | 'AWD';
    dimensions: {
      lengthMm: number;
      widthMm: number;
      heightMm: number;
      formatted: string;
    };
    wheelbaseMm: number;
    curbWeightKg: number;
    curbWeightLbs: number;
    topSpeedKmh: number;
    zeroToHundredSec: number;
    weightDistribution: string;
  };
  keyFeatures: string[];
  curatorialSummary: string;
  architecturalNote: string;
  provenance: ProvenanceRecord[];
  certification: string;
}

export interface CuratedCollection {
  id: CollectionId;
  indexNumber: string;
  title: string;
  subtitle: string;
  eraSpan: string;
  curatorName: string;
  curatorTitle: string;
  galleryLocation: string;
  heroImage: string;
  figureCaption: string;
  openingDropCapEssay: string;
  secondaryNarrative: string;
  pullQuote: string;
  pullQuoteAttribution: string;
  keyThemes: string[];
  totalValuationUsd: number;
  vehicleCount: number;
}

export const HERO_VAULT_IMAGE = '/src/assets/images/hero_atelier_vault_1791195412173.jpg';

export const CURATED_COLLECTIONS: CuratedCollection[] = [
  {
    id: 'coachbuilt-gt',
    indexNumber: '01',
    title: 'The Coachbuilt Grand Tourer Era',
    subtitle: 'Hand-Hammered Aluminum & Continental Velocity',
    eraSpan: '1954 – 1968',
    curatorName: 'Dr. Lorenzo Valenti',
    curatorTitle: 'Chief Archivist, Coachwork & Post-War Touring',
    galleryLocation: 'North Travertine Pavilion · Milan & Geneva Vaults',
    heroImage: '/src/assets/images/car_classic_gt_1791195425881.jpg',
    figureCaption: 'Fig. 01 — 1961 Coachbuilt Berlinetta resting on warm limestone after a 2,400-hour bare-metal restoration.',
    openingDropCapEssay:
      'During the golden fifteen-year window between 1954 and 1968, the European grand tourer achieved an unrepeatable equilibrium between competition pedigree and tailoring. Before wind-tunnel homogenization dictated identical silhouettes, master panel-beaters in Modena, Turin, and Newport Pagnell shaped alloy sheets over wooden bucks by eye and mallet.',
    secondaryNarrative:
      'Every automobile in this collection retains its original matching-numbers engine block, factory build sheets, and documented period race or salon history. These machines were engineered to cross the Alps at dawn and arrive at the Villa d’Este lawn by afternoon without changing spark plugs or tires.',
    pullQuote:
      'True coachbuilding is sculpture that happens to house twelve cylinders and a gated five-speed gearbox.',
    pullQuoteAttribution: 'Dr. Lorenzo Valenti, Exhibition Monograph Vol. XIV',
    keyThemes: [
      'Hand-rolled Peraluman 25 alloy bodywork',
      'Colombo & Marek multi-carburetor inline-six and V12 engines',
      'Borrani wire-spoke knock-off wheels',
    ],
    totalValuationUsd: 16850000,
    vehicleCount: 3,
  },
  {
    id: 'group-b-homologation',
    indexNumber: '02',
    title: 'Group B & Rally Homologation Icons',
    subtitle: 'Kevlar Composite Flares & All-Surface Engineering',
    eraSpan: '1982 – 1991',
    curatorName: 'Henrik Lindqvist',
    curatorTitle: 'Curator of Motorsport Homologation',
    galleryLocation: 'Subterranean Slate Gallery · Wing B',
    heroImage: '/src/assets/images/car_homologation_rally_1791195438868.jpg',
    figureCaption: 'Fig. 02 — 1985 Group B Stradale homologation special displaying functional NACA ducting and box-flared Kevlar arches.',
    openingDropCapEssay:
      'FISA’s 1982 Group B regulations required manufacturers to build just two hundred road-going examples to homologate radial spaceframe monsters for the World Rally Championship. The resulting street cars were sparse, visceral engineering exercises featuring tubular chromoly subframes, twin-charging systems, and aerodynamic turbofan wheels.',
    secondaryNarrative:
      'Our homologation archive preserves low-mileage, unmodified road versions alongside FIA-certificated tarmac specification evolutions. None have suffered aftermarket modifications, preserving the fragile Kevlar weave patterns and factory inspection markings in the engine bay.',
    pullQuote:
      'Group B dissolved the boundary between aerospace metallurgy and forest gravel stages.',
    pullQuoteAttribution: 'Henrik Lindqvist, Homologation Archive Notes',
    keyThemes: [
      '200-unit FIA Group B & Group A production rules',
      'Compound supercharger-plus-turbocharger induction',
      'Kevlar-epoxy bodywork & magnesium speedline wheels',
    ],
    totalValuationUsd: 4920000,
    vehicleCount: 3,
  },
  {
    id: 'analog-hypercars',
    indexNumber: '03',
    title: 'Analog V10 & V12 Hypercars',
    subtitle: 'High-Revving Naturally Aspirated Monoliths',
    eraSpan: '1994 – 2012',
    curatorName: 'Claire Moreau-Vance',
    curatorTitle: 'Director of Modern Classics & Carbon Architecture',
    galleryLocation: 'Central Basalt Hall · Acoustic Chamber',
    heroImage: '/src/assets/images/car_analog_hypercar_1791195450702.jpg',
    figureCaption: 'Fig. 03 — 2004 Carbon-Monocoque V10 Hypercar featuring beechwood shift knob and ceramic composite clutch.',
    openingDropCapEssay:
      'Prior to the widespread adoption of dual-clutch gearboxes, hybrid torque-fill, and electric power steering, a brief epoch of analog hypercars combined Formula One carbon-fiber monocoques with unassisted driver controls and screaming naturally aspirated ten- and twelve-cylinder powerplants.',
    secondaryNarrative:
      'Curated for acoustic purity and mechanical feedback, each vehicle in Collection 03 revs past 8,000 RPM and demands deliberate physical engagement. This chapter represents the final summation of pure internal-combustion driver stewardship.',
    pullQuote:
      'An 8,400 RPM redline controlled through an unboosted pedal box and a gated lever is an endangered cultural artifact.',
    pullQuoteAttribution: 'Claire Moreau-Vance, Curatorial Symposium 2026',
    keyThemes: [
      'Autoclave-cured pre-preg carbon-fiber chassis tubs',
      'Motorsport-derived dry-sump V10 and V12 engines',
      'Manual three-pedal and hydraulic tactile interfaces',
    ],
    totalValuationUsd: 26300000,
    vehicleCount: 3,
  },
  {
    id: 'endurance-prototypes',
    indexNumber: '04',
    title: 'Le Mans Endurance Prototypes',
    subtitle: 'Mulsanne Straight Aerodynamics & GT1 Straßenversion',
    eraSpan: '1966 – 1999',
    curatorName: 'Sebastien De Vries',
    curatorTitle: 'Senior Specialist, Sarthe & Endurance Provenance',
    galleryLocation: 'East Alabaster Rotunda · Sarthe Wing',
    heroImage: '/src/assets/images/car_endurance_prototype_1791195462712.jpg',
    figureCaption: 'Fig. 04 — 1997 GT1 Straßenversion homologation prototype with roof-mounted ram-air plenum and ground-effect diffuser.',
    openingDropCapEssay:
      'Twenty-four hours at La Sarthe has historically served as the ultimate crucible for aerodynamic efficiency, brake thermal management, and structural endurance. Occasionally, regulatory loopholes compelled racing departments in Weissach, Affalterbach, and Dearborn to fit license-plate brackets and turn signals onto full-blooded Le Mans prototypes.',
    secondaryNarrative:
      'Collection 04 brings together ultra-rare GT1 road-registered prototypes and sixties endurance icons. With production runs frequently numbering fewer than twenty-five examples globally, these machines occupy the apex of blue-chip automotive collecting.',
    pullQuote:
      'When a prototype built for 330 km/h on the Mulsanne Straight is handed a chassis plate for public roads, automotive mythology is born.',
    pullQuoteAttribution: 'Sebastien De Vries, Endurance Provenance Dossier',
    keyThemes: [
      'Sub-25 unit FIA GT1 street homologation',
      'Carbon-ceramic braking & pushrod inboard suspension',
      'Documented Le Mans test day and wind-tunnel lineage',
    ],
    totalValuationUsd: 33900000,
    vehicleCount: 3,
  },
];

export const CURATED_CARS: CarItem[] = [
  // COLLECTION 01: COACHBUILT GT
  {
    id: 'ferrari-250-gt-swb-1961',
    accessionNumber: 'ACC. 2026.01.01',
    collectionId: 'coachbuilt-gt',
    collectionName: 'The Coachbuilt Grand Tourer Era',
    year: 1961,
    marque: 'Ferrari',
    model: '250 GT SWB Berlinetta',
    designation: 'Passo Corto Scaglietti',
    chassisNumber: '2735 GT',
    coachbuilder: 'Carrozzeria Scaglietti (Pininfarina Design)',
    countryOfOrigin: 'Italy',
    exteriorFinish: 'Argento Auteuil Metallic',
    interiorTrim: 'Pelle Rossa Connolly Vaumol',
    productionTotal: 165,
    unitNumber: '1 of 74 Lusso Steel/Alloy Examples',
    valuationUsd: 9250000,
    availabilityStatus: 'Available for Private Treaty',
    galleryWing: 'North Travertine Pavilion · Bay 01',
    image: HERO_VAULT_IMAGE,
    imageCaption: 'Chassis 2735 GT photographed in the North Travertine Pavilion at late afternoon.',
    specs: {
      engineConfiguration: '3.0L 60° Colombo Tipo 168 V12 (Naturally Aspirated)',
      displacementCc: 2953,
      aspiration: 'Naturally Aspirated',
      horsepower: 280,
      rpmRedline: 7000,
      torqueNm: 275,
      torqueLbFt: 203,
      fuelEfficiencyCityMpg: 10,
      fuelEfficiencyHwyMpg: 15,
      fuelEfficiencyFormatted: '10 mpg city / 15 mpg hwy (23.5 / 15.7 L/100km)',
      transmission: '4-Speed All-Synchromesh Manual + Overdrive',
      drivetrain: 'RWD',
      dimensions: {
        lengthMm: 4165,
        widthMm: 1680,
        heightMm: 1260,
        formatted: '4,165 × 1,680 × 1,260 mm',
      },
      wheelbaseMm: 2400,
      curbWeightKg: 1030,
      curbWeightLbs: 2271,
      topSpeedKmh: 252,
      zeroToHundredSec: 5.8,
      weightDistribution: '49% Front / 51% Rear',
    },
    keyFeatures: [
      'Triple Weber 40 DCL6 twin-choke downdraft carburetors',
      'Borrani RW 3591 knock-off wire-spoke alloy wheels',
      'Four-wheel Dunlop servo-assisted disc brakes',
      'Hand-hammered aluminum hood, doors, and trunk lid',
      'Ferrari Classiche Red Book certified matching numbers',
    ],
    curatorialSummary:
      'Delivered new to Milan in June 1961 in Argento Auteuil over red Connolly leather. The short-wheelbase (2,400 mm) 250 GT represents the definitive dual-purpose post-war Berlinetta, pairing triple Weber 40 DCL6 carburetors with four-wheel Dunlop disc brakes.',
    architecturalNote:
      'Retains original Scaglietti stamping numbers on hood, decklid, and door skins, verified by Ferrari Classiche Red Book lithography.',
    provenance: [
      {
        year: '1961',
        location: 'Milan, Italy',
        custodianOrEvent: 'Count Edoardo Visconti di Modrone',
        documentationNote: 'Original bill of sale from Crepaldi Automobili and ACI registration ledger.',
      },
      {
        year: '1978',
        location: 'Gstaad, Switzerland',
        custodianOrEvent: 'Private Alpine Collection',
        documentationNote: 'Preserved in climate-controlled dry storage for 34 years; original upholstery retained.',
      },
      {
        year: '2021',
        location: 'Cernobbio, Lake Como',
        custodianOrEvent: 'Concorso d’Eleganza Villa d’Este',
        documentationNote: 'Awarded First in Class for Post-War Closed Berlinettas.',
      },
    ],
    certification: 'Ferrari Classiche Red Book (#FC-2735-A) & FIVA Identity Card Class A/3',
  },
  {
    id: 'aston-martin-db5-vantage-1964',
    accessionNumber: 'ACC. 2026.01.02',
    collectionId: 'coachbuilt-gt',
    collectionName: 'The Coachbuilt Grand Tourer Era',
    year: 1964,
    marque: 'Aston Martin',
    model: 'DB5 Vantage Coupé',
    designation: 'Superleggera Touring',
    chassisNumber: 'DB5/1682/R',
    coachbuilder: 'Carrozzeria Touring Superleggera',
    countryOfOrigin: 'United Kingdom',
    exteriorFinish: 'Goodwood Almond Green',
    interiorTrim: 'Natural Tan Connolly Hide',
    productionTotal: 65,
    unitNumber: '1 of 65 Factory Vantage Specification',
    valuationUsd: 1650000,
    availabilityStatus: 'Available for Private Treaty',
    galleryWing: 'North Travertine Pavilion · Bay 02',
    image: '/src/assets/images/car_classic_gt_1791195425881.jpg',
    imageCaption: 'Factory Vantage-spec DB5/1682/R displaying Superleggera tube-frame aluminum coachwork.',
    specs: {
      engineConfiguration: '4.0L Tadek Marek DOHC Inline-6 (Triple Weber)',
      displacementCc: 3995,
      aspiration: 'Naturally Aspirated',
      horsepower: 325,
      rpmRedline: 5750,
      torqueNm: 415,
      torqueLbFt: 306,
      fuelEfficiencyCityMpg: 12,
      fuelEfficiencyHwyMpg: 17,
      fuelEfficiencyFormatted: '12 mpg city / 17 mpg hwy (19.6 / 13.8 L/100km)',
      transmission: 'ZF 5-Speed All-Synchromesh Manual',
      drivetrain: 'RWD',
      dimensions: {
        lengthMm: 4572,
        widthMm: 1676,
        heightMm: 1346,
        formatted: '4,572 × 1,676 × 1,346 mm',
      },
      wheelbaseMm: 2489,
      curbWeightKg: 1468,
      curbWeightLbs: 3236,
      topSpeedKmh: 248,
      zeroToHundredSec: 6.3,
      weightDistribution: '51% Front / 49% Rear',
    },
    keyFeatures: [
      'Patented Carrozzeria Touring Superleggera tubular lattice frame',
      'Factory Vantage specification with triple Weber 45 DCOE carburetors',
      'ZF 5-speed close-ratio gearbox & Powr-Lok limited-slip differential',
      'Armstrong Selectaride cockpit-adjustable rear dampers',
      '72-spoke chrome knock-off wire wheels & Smiths instrumentation',
    ],
    curatorialSummary:
      'Constructed under license from Milan’s Carrozzeria Touring using the patented Superleggera small-diameter tubular lattice supporting hand-formed magnesium-aluminum panels. Upgraded from new with triple twin-choke Weber 45 DCOE carburetors and revised camshaft profiles.',
    architecturalNote:
      'Matching chassis, cylinder head, and ZF gearbox stampings confirmed by British Motor Industry Heritage Trust certificate.',
    provenance: [
      {
        year: '1964',
        location: 'London, United Kingdom',
        custodianOrEvent: 'Cyril Williams Ltd. Delivery',
        documentationNote: 'Dispatched April 14, 1964 with factory chrome wire wheels and Motorola radio.',
      },
      {
        year: '2019',
        location: 'Newport Pagnell, UK',
        custodianOrEvent: 'Aston Martin Works Service Restoration',
        documentationNote: 'Complete 3,100-hour bare-metal commission documented in leather-bound photographic folio.',
      },
    ],
    certification: 'Aston Martin Assured Provenance Certificate of Authenticity',
  },
  {
    id: 'mercedes-300sl-alloy-1956',
    accessionNumber: 'ACC. 2026.01.03',
    collectionId: 'coachbuilt-gt',
    collectionName: 'The Coachbuilt Grand Tourer Era',
    year: 1956,
    marque: 'Mercedes-Benz',
    model: '300 SL Gullwing',
    designation: 'W198 Leichtmetall-Ausführung',
    chassisNumber: '198.040.5500318',
    coachbuilder: 'Sindelfingen Special Works',
    countryOfOrigin: 'Germany',
    exteriorFinish: 'Silbergrau Metallic (DB 180)',
    interiorTrim: 'Blue-Gray Tartan & Gabardine',
    productionTotal: 29,
    unitNumber: '1 of 29 All-Aluminum Alloy Gullwings',
    valuationUsd: 5950000,
    availabilityStatus: 'Reserved for Inspection',
    galleryWing: 'North Travertine Pavilion · Bay 03',
    image: HERO_VAULT_IMAGE,
    imageCaption: 'W198 Alloy Gullwing featuring Plexiglas side glazing and NSL competition camshaft.',
    specs: {
      engineConfiguration: '3.0L M198 Dry-Sump SOHC Inline-6 (Bosch Direct Injection)',
      displacementCc: 2996,
      aspiration: 'Naturally Aspirated',
      horsepower: 240,
      rpmRedline: 6400,
      torqueNm: 294,
      torqueLbFt: 217,
      fuelEfficiencyCityMpg: 13,
      fuelEfficiencyHwyMpg: 19,
      fuelEfficiencyFormatted: '13 mpg city / 19 mpg hwy (18.1 / 12.4 L/100km)',
      transmission: '4-Speed Close-Ratio Manual',
      drivetrain: 'RWD',
      dimensions: {
        lengthMm: 4520,
        widthMm: 1790,
        heightMm: 1300,
        formatted: '4,520 × 1,790 × 1,300 mm',
      },
      wheelbaseMm: 2400,
      curbWeightKg: 1188,
      curbWeightLbs: 2619,
      topSpeedKmh: 260,
      zeroToHundredSec: 6.9,
      weightDistribution: '48% Front / 52% Rear',
    },
    keyFeatures: [
      '1 of 29 Leichtmetall all-aluminum alloy outer body shells (-95 kg)',
      'Bosch mechanical direct fuel injection & NSL competition camshaft',
      '3D tubular steel spaceframe necessitating roof-hinged Gullwing doors',
      'Rudge center-lock knock-off wheels & Plexiglas side and rear glazing',
      'Tilt-away ivory steering wheel & fitted 2-piece Karl Baisch luggage',
    ],
    curatorialSummary:
      'Ordered at the personal urging of Rudolf Uhlenhaut, only 29 examples of the W198 Coupé were bodied entirely in light-alloy aluminum skin with Plexiglas windows, shedding 95 kilograms over the standard steel Gullwing and receiving the high-compression NSL competition engine.',
    architecturalNote:
      'Equipped with original Rudge center-lock knock-off wheels, vented front drum backing plates, and factory belly pans.',
    provenance: [
      {
        year: '1956',
        location: 'Lausanne, Switzerland',
        custodianOrEvent: 'Private Swiss Amateur Hillclimb Entry',
        documentationNote: 'Competed in the 1956 Ollon-Villars hillclimb without bodywork damage.',
      },
      {
        year: '2016',
        location: 'Fellbach, Germany',
        custodianOrEvent: 'Mercedes-Benz Classic Center Audit',
        documentationNote: 'Metallurgical X-ray and stamping verification confirming original alloy panels.',
      },
    ],
    certification: 'Mercedes-Benz Classic Manufacturer Expertise Dossier',
  },

  // COLLECTION 02: GROUP B & HOMOLOGATION
  {
    id: 'lancia-delta-s4-stradale-1985',
    accessionNumber: 'ACC. 2026.02.01',
    collectionId: 'group-b-homologation',
    collectionName: 'Group B & Rally Homologation Icons',
    year: 1985,
    marque: 'Lancia',
    model: 'Delta S4 Stradale',
    designation: 'Tipo SE038 Abarth Homologation',
    chassisNumber: 'ZLA038AR000000114',
    coachbuilder: 'Abarth & C. Corso Marche / Savio',
    countryOfOrigin: 'Italy',
    exteriorFinish: 'Bianco Corse Pastel',
    interiorTrim: 'Grigio Alcantara Sound-Insulated Cockpit',
    productionTotal: 200,
    unitNumber: 'Chassis #114 of 200 FIA Homologation Series',
    valuationUsd: 1180000,
    availabilityStatus: 'Available for Private Treaty',
    galleryWing: 'Subterranean Slate Gallery · Bay 04',
    image: '/src/assets/images/car_homologation_rally_1791195438868.jpg',
    imageCaption: 'Lancia Delta S4 Stradale with clamshell rear Kevlar-composite canopy and twin-charged Abarth four-cylinder.',
    specs: {
      engineConfiguration: '1.8L Mid-Mounted Abarth 233 ATR 18S DOHC Inline-4 (Twin-Charged)',
      displacementCc: 1759,
      aspiration: 'Turbo + Supercharged',
      horsepower: 250,
      rpmRedline: 7200,
      torqueNm: 291,
      torqueLbFt: 215,
      fuelEfficiencyCityMpg: 14,
      fuelEfficiencyHwyMpg: 20,
      fuelEfficiencyFormatted: '14 mpg city / 20 mpg hwy (16.8 / 11.8 L/100km)',
      transmission: '5-Speed Manual + Ferguson Viscous Center Diff',
      drivetrain: 'AWD',
      dimensions: {
        lengthMm: 4005,
        widthMm: 1800,
        heightMm: 1400,
        formatted: '4,005 × 1,800 × 1,400 mm',
      },
      wheelbaseMm: 2440,
      curbWeightKg: 1200,
      curbWeightLbs: 2646,
      topSpeedKmh: 225,
      zeroToHundredSec: 5.6,
      weightDistribution: '44% Front / 56% Rear',
    },
    keyFeatures: [
      'Compound Abarth Volumex supercharger + KKK K26 turbocharger system',
      'Chromoly tubular spaceframe with front and rear clamshell Kevlar panels',
      'Permanent all-wheel drive with 30:70 front-to-rear torque split',
      'Dual air-to-air intercoolers fed by roof-pillar NACA ducts',
      '16-inch Speedline magnesium rally-derived wheels',
    ],
    curatorialSummary:
      'Engineered by Claudio Lombardi at Abarth, the Delta S4 pioneered compound forced induction—pairing an Abarth Volumex R18 positive-displacement supercharger for immediate low-RPM response with a KKK K26 turbocharger for top-end delivery, mounted longitudinally inside a chromoly tubular spaceframe.',
    architecturalNote:
      'Shows 6,420 original kilometers from new. Retains factory Pirelli Corsa tires on secondary storage wheelset and original Abarth leather tool roll.',
    provenance: [
      {
        year: '1986',
        location: 'Turin, Italy',
        custodianOrEvent: 'Concessionaria Lancia Bocca',
        documentationNote: 'Registered to prominent industrialist in Piedmont; kept in heated villa garage.',
      },
      {
        year: '2023',
        location: 'Turin, Italy',
        custodianOrEvent: 'Lancia Classiche Certification',
        documentationNote: 'Awarded Certificato di Autenticità following mechanical inspection at Officine Classiche.',
      },
    ],
    certification: 'Lancia Classiche Certificato di Autenticità & ASI Targa Oro',
  },
  {
    id: 'porsche-959-komfort-1987',
    accessionNumber: 'ACC. 2026.02.02',
    collectionId: 'group-b-homologation',
    collectionName: 'Group B & Rally Homologation Icons',
    year: 1987,
    marque: 'Porsche',
    model: '959 Komfort',
    designation: 'Gruppe B Technological Flagship',
    chassisNumber: 'WP0ZZZ95ZHS900087',
    coachbuilder: 'Karosseriewerk Baur / Weissach',
    countryOfOrigin: 'Germany',
    exteriorFinish: 'Grand Prix White (L908)',
    interiorTrim: 'Tri-Tone Burgundy & Silver-Gray Leather',
    productionTotal: 292,
    unitNumber: '1 of 292 Customer Production Examples',
    valuationUsd: 2190000,
    availabilityStatus: 'Available for Private Treaty',
    galleryWing: 'Subterranean Slate Gallery · Bay 05',
    image: '/src/assets/images/car_homologation_rally_1791195438868.jpg',
    imageCaption: 'Porsche 959 featuring hollow-spoke magnesium wheels with integrated tire-pressure monitoring.',
    specs: {
      engineConfiguration: '2.85L Type 959/50 Water/Air-Cooled Flat-6 (Sequential Twin-Turbo)',
      displacementCc: 2849,
      aspiration: 'Twin-Turbocharged',
      horsepower: 450,
      rpmRedline: 7300,
      torqueNm: 500,
      torqueLbFt: 369,
      fuelEfficiencyCityMpg: 13,
      fuelEfficiencyHwyMpg: 19,
      fuelEfficiencyFormatted: '13 mpg city / 19 mpg hwy (18.1 / 12.4 L/100km)',
      transmission: '6-Speed BorgWarner Manual (With Terrain G-Gear)',
      drivetrain: 'AWD',
      dimensions: {
        lengthMm: 4260,
        widthMm: 1840,
        heightMm: 1280,
        formatted: '4,260 × 1,840 × 1,280 mm',
      },
      wheelbaseMm: 2272,
      curbWeightKg: 1450,
      curbWeightLbs: 3197,
      topSpeedKmh: 317,
      zeroToHundredSec: 3.7,
      weightDistribution: '40% Front / 60% Rear',
    },
    keyFeatures: [
      'Sequential twin KKK turbochargers with titanium connecting rods',
      'PSK electronically variable 4-mode all-wheel-drive system',
      'Aramid-Kevlar & Nomex composite aerodynamic body shell (0.31 Cd)',
      'Active hydropneumatic ride-height & damping control (120–180 mm)',
      'Hollow-spoke magnesium center-lock wheels with integrated TPMS',
    ],
    curatorialSummary:
      'Born from Helmuth Bott’s Group B development program, the 959 introduced sequential twin-turbocharging, electronically variable PSK all-wheel drive, active ride-height suspension, and an Aramid-Kevlar composite body shell with zero aerodynamic lift at 317 km/h.',
    architecturalNote:
      'Unmodified Komfort specification with factory Bilstein hydraulic level control intact and recent major engine-out service at Porsche Classic Stuttgart.',
    provenance: [
      {
        year: '1987',
        location: 'Zuffenhausen, Germany',
        custodianOrEvent: 'VIP Factory Handover',
        documentationNote: 'Signed service book stamped at Weissach after initial 2,000 km running-in inspection.',
      },
      {
        year: '2024',
        location: 'Stuttgart, Germany',
        custodianOrEvent: 'Porsche Classic Factory Commissioning',
        documentationNote: 'Complete hydraulic accumulator renewal and dyno verification.',
      },
    ],
    certification: 'Porsche Classic Technical Certificate & Kardex Copy',
  },
  {
    id: 'audi-sport-quattro-1984',
    accessionNumber: 'ACC. 2026.02.03',
    collectionId: 'group-b-homologation',
    collectionName: 'Group B & Rally Homologation Icons',
    year: 1984,
    marque: 'Audi',
    model: 'Sport quattro',
    designation: 'Typ 85 Short-Wheelbase Homologation',
    chassisNumber: 'WAUZZZ85ZFA905042',
    coachbuilder: 'Baur Stuttgart / Ingolstadt Motorsport',
    countryOfOrigin: 'Germany',
    exteriorFinish: 'Alpinweiß (L90E)',
    interiorTrim: 'Anthracite Recaro Leather & Jacquard',
    productionTotal: 214,
    unitNumber: '1 of 164 Private Customer Road Cars',
    valuationUsd: 1550000,
    availabilityStatus: 'On Archival Loan',
    galleryWing: 'Subterranean Slate Gallery · Bay 06',
    image: '/src/assets/images/car_homologation_rally_1791195438868.jpg',
    imageCaption: 'Short-wheelbase Audi Sport quattro showing steeper raked Audi 80 windshield and 9-inch Ronal wheels.',
    specs: {
      engineConfiguration: '2.1L Alloy-Block KW 20-Valve DOHC Inline-5 (KKK K27 Turbo)',
      displacementCc: 2133,
      aspiration: 'Twin-Turbocharged',
      horsepower: 306,
      rpmRedline: 7000,
      torqueNm: 350,
      torqueLbFt: 258,
      fuelEfficiencyCityMpg: 15,
      fuelEfficiencyHwyMpg: 22,
      fuelEfficiencyFormatted: '15 mpg city / 22 mpg hwy (15.7 / 10.7 L/100km)',
      transmission: '5-Speed Manual + Pneumatic Locking Differentials',
      drivetrain: 'AWD',
      dimensions: {
        lengthMm: 4164,
        widthMm: 1790,
        heightMm: 1345,
        formatted: '4,164 × 1,790 × 1,345 mm',
      },
      wheelbaseMm: 2204,
      curbWeightKg: 1300,
      curbWeightLbs: 2866,
      topSpeedKmh: 250,
      zeroToHundredSec: 4.9,
      weightDistribution: '58% Front / 42% Rear',
    },
    keyFeatures: [
      'Shortened 2,204 mm wheelbase (-320 mm vs. standard Ur-quattro)',
      'All-aluminum 20-valve DOHC 5-cylinder engine with KKK K27 turbocharger',
      'Carbon-Kevlar laminated composite fenders, roof, and hood',
      'Steeper raked Audi 80 windshield to eliminate rally night-stage glare',
      '9Jx15 Ronal multi-spoke wheels & switchable ABS braking system',
    ],
    curatorialSummary:
      'With 320 millimeters sectioned out of the standard quattro wheelbase and a steeper windshield angle derived from the Audi 80 to eliminate cockpit glare, the Sport quattro paired an all-aluminum 20-valve five-cylinder engine with resin-impregnated Aramid body panels.',
    architecturalNote:
      'Preserves original Bosch Kevlar-cased auxiliary driving lamps and factory 9Jx15 Ronal multi-spoke wheels.',
    provenance: [
      {
        year: '1985',
        location: 'Munich, Germany',
        custodianOrEvent: 'First Owner Delivery',
        documentationNote: 'Original Fahrzeugbrief with single Bavarian family ownership until 2018.',
      },
      {
        year: '2022',
        location: 'Ingolstadt, Germany',
        custodianOrEvent: 'Audi Tradition Heritage Inspection',
        documentationNote: 'Confirmed matching-numbers KW alloy engine block (#KW-0049).',
      },
    ],
    certification: 'Audi Tradition Birth Certificate & FIA Historic Technical Passport',
  },

  // COLLECTION 03: ANALOG HYPERCARS
  {
    id: 'porsche-carrera-gt-2005',
    accessionNumber: 'ACC. 2026.03.01',
    collectionId: 'analog-hypercars',
    collectionName: 'Analog V10 & V12 Hypercars',
    year: 2005,
    marque: 'Porsche',
    model: 'Carrera GT',
    designation: 'Type 980 Carbon Monocoque',
    chassisNumber: 'WP0CA29845L001108',
    coachbuilder: 'Porsche Leipzig / ATR Composites Italy',
    countryOfOrigin: 'Germany',
    exteriorFinish: 'GT Silver Metallic (LM7Z)',
    interiorTrim: 'Ascot Brown Natural Leather & Birch Ash',
    productionTotal: 1270,
    unitNumber: 'Plaque #0842 of 1,270 Produced',
    valuationUsd: 1680000,
    availabilityStatus: 'Available for Private Treaty',
    galleryWing: 'Central Basalt Hall · Bay 07',
    image: '/src/assets/images/car_analog_hypercar_1791195450702.jpg',
    imageCaption: '2005 Porsche Carrera GT in GT Silver Metallic over Ascot Brown leather with laminated beechwood shifter.',
    specs: {
      engineConfiguration: '5.7L 68° Type M80/01 Dry-Sump V10 (Naturally Aspirated)',
      displacementCc: 5733,
      aspiration: 'Naturally Aspirated',
      horsepower: 612,
      rpmRedline: 8400,
      torqueNm: 590,
      torqueLbFt: 435,
      fuelEfficiencyCityMpg: 9,
      fuelEfficiencyHwyMpg: 15,
      fuelEfficiencyFormatted: '9 mpg city / 15 mpg hwy (26.1 / 15.7 L/100km)',
      transmission: '6-Speed Transverse Manual + PCCC Ceramic Clutch',
      drivetrain: 'RWD',
      dimensions: {
        lengthMm: 4613,
        widthMm: 1921,
        heightMm: 1166,
        formatted: '4,613 × 1,921 × 1,166 mm',
      },
      wheelbaseMm: 2730,
      curbWeightKg: 1380,
      curbWeightLbs: 3042,
      topSpeedKmh: 330,
      zeroToHundredSec: 3.5,
      weightDistribution: '41% Front / 59% Rear',
    },
    keyFeatures: [
      'Le Mans LMP1-derived 5.7-liter titanium-rod V10 revving to 8,400 RPM',
      'Full autoclave-cured CFRP monocoque tub and carbon engine carrier',
      '169 mm Porsche Ceramic Composite Clutch (PCCC) & PCCB ceramic brakes',
      'Laminated birch-and-beechwood shift knob honoring the Porsche 917',
      'Removable two-piece carbon-fiber Targa roof panels stored in front trunk',
    ],
    curatorialSummary:
      'Constructed around a secret 1990s Formula One and Le Mans LMP1 5.7-liter V10 engine program, the Carrera GT uses a pure carbon-fiber monocoque and engine subframe with an ultra-compact 169-millimeter Porsche Ceramic Composite Clutch (PCCC) enabling a notoriously low center of gravity.',
    architecturalNote:
      'Accompanied by complete 7-piece fitted Ascot Brown luggage set, laminated beech/ash gear knob, and recent APB suspension recall completion.',
    provenance: [
      {
        year: '2005',
        location: 'Zurich, Switzerland',
        custodianOrEvent: 'AMAG Porsche Zentrum Delivery',
        documentationNote: 'Delivered new with factory fitted luggage and indoor satin car cover.',
      },
      {
        year: '2025',
        location: 'Geneva, Switzerland',
        custodianOrEvent: 'Annual Service & Clutch Micrometer Check',
        documentationNote: 'PCCC clutch measured at 30.2 mm (96% remaining life); 4,180 km total mileage.',
      },
    ],
    certification: 'Porsche Classic Certificate of Authenticity & Full Service Ledger',
  },
  {
    id: 'mclaren-f1-1995',
    accessionNumber: 'ACC. 2026.03.02',
    collectionId: 'analog-hypercars',
    collectionName: 'Analog V10 & V12 Hypercars',
    year: 1995,
    marque: 'McLaren',
    model: 'F1 Coupé',
    designation: 'Gordon Murray Central-Seat Monocoque',
    chassisNumber: 'SA9AB5AC4S1048039',
    coachbuilder: 'McLaren Cars Ltd. Woking',
    countryOfOrigin: 'United Kingdom',
    exteriorFinish: 'Magnesium Silver',
    interiorTrim: 'Dark Charcoal Connolly & Red Driver Bucket',
    productionTotal: 64,
    unitNumber: 'Chassis #039 of 64 Standard Road Cars',
    valuationUsd: 21500000,
    availabilityStatus: 'Reserved for Inspection',
    galleryWing: 'Central Basalt Hall · Bay 08',
    image: '/src/assets/images/car_analog_hypercar_1791195450702.jpg',
    imageCaption: 'Central-driving-position McLaren F1 featuring 24-karat gold foil engine bay thermal shielding.',
    specs: {
      engineConfiguration: '6.1L 60° BMW M S70/2 Dry-Sump V12 (Naturally Aspirated)',
      displacementCc: 6064,
      aspiration: 'Naturally Aspirated',
      horsepower: 627,
      rpmRedline: 7500,
      torqueNm: 650,
      torqueLbFt: 479,
      fuelEfficiencyCityMpg: 11,
      fuelEfficiencyHwyMpg: 16,
      fuelEfficiencyFormatted: '11 mpg city / 16 mpg hwy (21.4 / 14.7 L/100km)',
      transmission: '6-Speed Weismann Transverse Manual',
      drivetrain: 'RWD',
      dimensions: {
        lengthMm: 4287,
        widthMm: 1820,
        heightMm: 1140,
        formatted: '4,287 × 1,820 × 1,140 mm',
      },
      wheelbaseMm: 2718,
      curbWeightKg: 1138,
      curbWeightLbs: 2509,
      topSpeedKmh: 386,
      zeroToHundredSec: 3.2,
      weightDistribution: '41.5% Front / 58.5% Rear',
    },
    keyFeatures: [
      'Central three-abreast seating layout with dihedral butterfly doors',
      '24-karat gold foil engine bay heat reflection lining (16 grams)',
      'World-record 386.4 km/h (240.1 mph) naturally aspirated top speed',
      'Active ground-effect boundary-layer suction fans & dynamic rear brake airbrake',
      'Complete Facom titanium tool roll & numbered TAG Heuer 6000 watch',
    ],
    curatorialSummary:
      'Designed by Gordon Murray and styled by Peter Stevens without a single compromise to mass or packaging, the McLaren F1 was the world’s first production road car built around a full carbon-fiber monocoque, housing a 627-horsepower Paul Rosche-designed BMW V12 lined in 16 grams of 24-karat gold foil.',
    architecturalNote:
      'Includes original Facom titanium tool chest, TAG Heuer 6000 chronograph engraved with Chassis #039, and bespoke Kenwood lightweight 10-disc CD changer.',
    provenance: [
      {
        year: '1995',
        location: 'Woking, Surrey, UK',
        custodianOrEvent: 'Park Lane Showroom Handover',
        documentationNote: 'Commissioned in Magnesium Silver; driver seat molded to original custodian.',
      },
      {
        year: '2023',
        location: 'Woking, Surrey, UK',
        custodianOrEvent: 'McLaren Special Operations (MSO) Heritage Service',
        documentationNote: 'Fuel cell bladder certification, gold foil heatshield refurbishment, and telemetry download.',
      },
    ],
    certification: 'McLaren Special Operations (MSO) Heritage Provenance Passport',
  },
  {
    id: 'lexus-lfa-nurburgring-2012',
    accessionNumber: 'ACC. 2026.03.03',
    collectionId: 'analog-hypercars',
    collectionName: 'Analog V10 & V12 Hypercars',
    year: 2012,
    marque: 'Lexus',
    model: 'LFA Nürburgring Package',
    designation: 'LFA Works Carbon-Loom Edition',
    chassisNumber: 'JTHHX8BH2C1000319',
    coachbuilder: 'Motomachi LFA Works Plant',
    countryOfOrigin: 'Japan',
    exteriorFinish: 'Whitest White (079)',
    interiorTrim: 'Black Alcantara & Carbon-Kevlar Shells',
    productionTotal: 64,
    unitNumber: 'Badge #319 · 1 of 64 Nürburgring Package Units',
    valuationUsd: 3120000,
    availabilityStatus: 'Available for Private Treaty',
    galleryWing: 'Central Basalt Hall · Bay 09',
    image: '/src/assets/images/car_analog_hypercar_1791195450702.jpg',
    imageCaption: 'Lexus LFA Nürburgring Package featuring fixed carbon rear wing, canards, and Yamaha-tuned 1LR-GUE V10.',
    specs: {
      engineConfiguration: '4.8L 72° Yamaha-Co-Developed 1LR-GUE V10 (Naturally Aspirated)',
      displacementCc: 4805,
      aspiration: 'Naturally Aspirated',
      horsepower: 571,
      rpmRedline: 9000,
      torqueNm: 480,
      torqueLbFt: 354,
      fuelEfficiencyCityMpg: 11,
      fuelEfficiencyHwyMpg: 16,
      fuelEfficiencyFormatted: '11 mpg city / 16 mpg hwy (21.4 / 14.7 L/100km)',
      transmission: '6-Speed Aisin ASG Rear-Transaxle Automated Manual',
      drivetrain: 'RWD',
      dimensions: {
        lengthMm: 4505,
        widthMm: 1895,
        heightMm: 1220,
        formatted: '4,505 × 1,895 × 1,220 mm',
      },
      wheelbaseMm: 2605,
      curbWeightKg: 1480,
      curbWeightLbs: 3263,
      topSpeedKmh: 325,
      zeroToHundredSec: 3.6,
      weightDistribution: '48% Front / 52% Rear',
    },
    keyFeatures: [
      '72° V10 revving from idle to 9,000 RPM redline in 0.6 seconds',
      'Yamaha Musical Instrument division acoustic surge tank & triple titanium exhaust',
      'In-house 3D-laser-woven CFRP carbon-fiber central monocoque',
      'Nürburgring Package fixed CFRP rear wing, front dive planes, & +10 HP calibration',
      'Forged magnesium BBS mesh wheels with Bridgestone Potenza RE070 tires',
    ],
    curatorialSummary:
      'Capable of revving from idle to its 9,000 RPM fuel cutoff in 0.6 seconds—requiring a digital TFT tachometer because an analog needle could not physically keep pace—the LFA’s 72-degree V10 was acoustically tuned by Yamaha’s musical instrument division and mounted inside an in-house 3D-woven CFRP cabin.',
    architecturalNote:
      'Equipped with the rare Nürburgring Package adding 10 horsepower, faster 0.15-second gearshifts, BBS forged magnesium wheels, and fixed carbon-fiber aero elements.',
    provenance: [
      {
        year: '2012',
        location: 'Tokyo, Japan',
        custodianOrEvent: 'Motomachi LFA Works Delivery',
        documentationNote: 'Delivered with signed inspection plaque from Master Takumi builder.',
      },
      {
        year: '2024',
        location: 'Zurich, Switzerland',
        custodianOrEvent: 'Private Acoustic Vault Acquisition',
        documentationNote: 'Verified 2,890 kilometers from new with original paint protection film.',
      },
    ],
    certification: 'Motomachi LFA Works Master Build Ledger & Takumi Certificate',
  },

  // COLLECTION 04: LE MANS ENDURANCE PROTOTYPES
  {
    id: 'porsche-911-gt1-strassenversion-1997',
    accessionNumber: 'ACC. 2026.04.01',
    collectionId: 'endurance-prototypes',
    collectionName: 'Le Mans Endurance Prototypes',
    year: 1997,
    marque: 'Porsche',
    model: '911 GT1 Straßenversion',
    designation: '993-Generation FIA GT1 Street Prototype',
    chassisNumber: 'WP0ZZZ99ZWS396011',
    coachbuilder: 'Porsche Motorsport Weissach',
    countryOfOrigin: 'Germany',
    exteriorFinish: 'Arctic Silver Metallic (L92U)',
    interiorTrim: 'Black Nomex & Carbon Kevlar Recaro Buckets',
    productionTotal: 21,
    unitNumber: '1 of 21 Street-Legal 911 GT1 Prototypes',
    valuationUsd: 11400000,
    availabilityStatus: 'Available for Private Treaty',
    galleryWing: 'East Alabaster Rotunda · Bay 10',
    image: '/src/assets/images/car_endurance_prototype_1791195462712.jpg',
    imageCaption: '1997 Porsche 911 GT1 Straßenversion uniting a 993 front clip with a 962 Group C mid-engine tail.',
    specs: {
      engineConfiguration: '3.2L Mid-Mounted Type M96/80 Water-Cooled Flat-6 (Twin-Turbo)',
      displacementCc: 3164,
      aspiration: 'Twin-Turbocharged',
      horsepower: 544,
      rpmRedline: 7200,
      torqueNm: 600,
      torqueLbFt: 443,
      fuelEfficiencyCityMpg: 10,
      fuelEfficiencyHwyMpg: 15,
      fuelEfficiencyFormatted: '10 mpg city / 15 mpg hwy (23.5 / 15.7 L/100km)',
      transmission: '6-Speed Type G96/80 Motorsport Synchromesh Manual',
      drivetrain: 'RWD',
      dimensions: {
        lengthMm: 4710,
        widthMm: 1950,
        heightMm: 1170,
        formatted: '4,710 × 1,950 × 1,170 mm',
      },
      wheelbaseMm: 2500,
      curbWeightKg: 1150,
      curbWeightLbs: 2535,
      topSpeedKmh: 310,
      zeroToHundredSec: 3.7,
      weightDistribution: '39% Front / 61% Rear',
    },
    keyFeatures: [
      'Mid-mounted water-cooled 4-valve twin-turbo flat-six derived from the 962 Group C',
      'Pushrod horizontal coilover rear suspension & carbon-kevlar bodywork',
      'Roof-mounted ram-air induction scoop feeding twin KKK turbochargers',
      '1 of 21 road-homologated examples worldwide built by Porsche Motorsport',
      '380 mm perforated brake rotors with 8-piston aluminum monobloc calipers',
    ],
    curatorialSummary:
      'To exploit FIA GT1 regulations at Le Mans, Norbert Singer’s engineering team mated the front steel structure of a 993-generation 911 to the rear tubular subframe and water-cooled twin-turbo flat-six of the legendary 962 Group C prototype, creating a mid-engined Le Mans contender legally registered for road use.',
    architecturalNote:
      'One of only 21 customer Straßenversion cars built; retains factory speed-sensitive power steering, three-piece 18-inch BBS center-mesh wheels, and Weissach build binder.',
    provenance: [
      {
        year: '1997',
        location: 'Weissach, Germany',
        custodianOrEvent: 'Porsche Motorsport Exclusive Delivery',
        documentationNote: 'Hand-assembled alongside the 1997 Le Mans factory works entries.',
      },
      {
        year: '2021',
        location: 'St. Moritz, Switzerland',
        custodianOrEvent: 'The I.C.E. St. Moritz Concours',
        documentationNote: 'Exhibited in the Racing Legends class; Best of Show nominee.',
      },
    ],
    certification: 'Porsche Motorsport Weissach Authenticity Dossier',
  },
  {
    id: 'mercedes-clk-gtr-strassenversion-1998',
    accessionNumber: 'ACC. 2026.04.02',
    collectionId: 'endurance-prototypes',
    collectionName: 'Le Mans Endurance Prototypes',
    year: 1998,
    marque: 'Mercedes-Benz',
    model: 'AMG CLK GTR Straßenversion',
    designation: 'HWA FIA GT1 Championship Homologation',
    chassisNumber: 'WDB2973971Y000014',
    coachbuilder: 'AMG / HWA Affalterbach',
    countryOfOrigin: 'Germany',
    exteriorFinish: 'Brillantsilber Metallic (744)',
    interiorTrim: 'Anthracite Tartan Plaid & Fitted Leather',
    productionTotal: 20,
    unitNumber: 'Coupé #14 of 20 Produced by HWA',
    valuationUsd: 13200000,
    availabilityStatus: 'Reserved for Inspection',
    galleryWing: 'East Alabaster Rotunda · Bay 11',
    image: '/src/assets/images/car_endurance_prototype_1791195462712.jpg',
    imageCaption: '1998 Mercedes-Benz AMG CLK GTR Straßenversion #14 with dihedral doors and 6.9-liter V12.',
    specs: {
      engineConfiguration: '6.9L 60° AMG M297 Dry-Sump V12 (Naturally Aspirated)',
      displacementCc: 6898,
      aspiration: 'Naturally Aspirated',
      horsepower: 612,
      rpmRedline: 7200,
      torqueNm: 775,
      torqueLbFt: 572,
      fuelEfficiencyCityMpg: 8,
      fuelEfficiencyHwyMpg: 13,
      fuelEfficiencyFormatted: '8 mpg city / 13 mpg hwy (29.4 / 18.1 L/100km)',
      transmission: '6-Speed Xtrac Sequential with Steering Paddles',
      drivetrain: 'RWD',
      dimensions: {
        lengthMm: 4855,
        widthMm: 1950,
        heightMm: 1100,
        formatted: '4,855 × 1,950 × 1,100 mm',
      },
      wheelbaseMm: 2670,
      curbWeightKg: 1440,
      curbWeightLbs: 3175,
      topSpeedKmh: 344,
      zeroToHundredSec: 3.8,
      weightDistribution: '42% Front / 58% Rear',
    },
    keyFeatures: [
      'Carbon-fiber & aluminum honeycomb monocoque chassis built by HWA',
      'Stressed-member 6.9-liter AMG V12 delivering 775 Nm (572 lb-ft) of torque',
      '6-speed Xtrac motorsport sequential transaxle with paddle shift',
      'Upward-swinging butterfly doors with integrated sill storage lockers',
      '300 SL-homage tartan plaid interior & onboard pneumatic jack receivers',
    ],
    curatorialSummary:
      'Designed and built in just 128 days by AMG and HWA to dominate the 1997 FIA GT Championship, the CLK GTR shares only its headlamps, tail lamps, and grille badge with a production W208 CLK. Beneath its autoclave-cured carbon skin sits a stressed 6.9-liter V12 and formula-style pullrod suspension.',
    architecturalNote:
      'Ordered new with rare 300 SL-inspired Anthracite Tartan upholstery over custom-molded carbon sills housing dual storage compartments.',
    provenance: [
      {
        year: '1999',
        location: 'Affalterbach, Germany',
        custodianOrEvent: 'HWA AG Completion & Road Registration',
        documentationNote: 'Accompanied by original wooden crate containing torque wrench, pneumatic air-jack lance, and wheel sockets.',
      },
      {
        year: '2024',
        location: 'Affalterbach, Germany',
        custodianOrEvent: 'HWA Factory Recommissioning',
        documentationNote: 'Full Xtrac sequential gearbox inspection and fire-suppression bottle recertification.',
      },
    ],
    certification: 'HWA AG & Mercedes-Benz Classic Factory Authenticity Certificate',
  },
  {
    id: 'ford-gt40-mk1-road-1966',
    accessionNumber: 'ACC. 2026.04.03',
    collectionId: 'endurance-prototypes',
    collectionName: 'Le Mans Endurance Prototypes',
    year: 1966,
    marque: 'Ford',
    model: 'GT40 Mk I Road Coupé',
    designation: 'FAV Slough Street Specification',
    chassisNumber: 'P/1051',
    coachbuilder: 'Ford Advanced Vehicles (FAV) / Abbey Panels',
    countryOfOrigin: 'United Kingdom / USA',
    exteriorFinish: 'Platinum Metallic (Concourse Silver)',
    interiorTrim: 'Black Ventilated Brass-Eyelet Vinyl',
    productionTotal: 31,
    unitNumber: '1 of 31 Factory Mk I Road Cars',
    valuationUsd: 9300000,
    availabilityStatus: 'Available for Private Treaty',
    galleryWing: 'East Alabaster Rotunda · Bay 12',
    image: '/src/assets/images/car_endurance_prototype_1791195462712.jpg',
    imageCaption: '1966 Ford GT40 Mk I Road Car P/1051 featuring Borrani wire wheels and quartet of Weber 48 IDA carburetors.',
    specs: {
      engineConfiguration: '4.7L 90° Ford 289 High-Performance OHV V8 (Quad Weber 48 IDA)',
      displacementCc: 4727,
      aspiration: 'Naturally Aspirated',
      horsepower: 335,
      rpmRedline: 6500,
      torqueNm: 440,
      torqueLbFt: 325,
      fuelEfficiencyCityMpg: 9,
      fuelEfficiencyHwyMpg: 14,
      fuelEfficiencyFormatted: '9 mpg city / 14 mpg hwy (26.1 / 16.8 L/100km)',
      transmission: 'ZF 5DS-25 5-Speed Dog-Leg Manual Transaxle',
      drivetrain: 'RWD',
      dimensions: {
        lengthMm: 4064,
        widthMm: 1778,
        heightMm: 1029,
        formatted: '4,064 × 1,778 × 1,029 mm',
      },
      wheelbaseMm: 2413,
      curbWeightKg: 1085,
      curbWeightLbs: 2392,
      topSpeedKmh: 264,
      zeroToHundredSec: 5.1,
      weightDistribution: '43% Front / 57% Rear',
    },
    keyFeatures: [
      '40.5-inch (1,029 mm) roof height Abbey Panels steel semi-monocoque chassis',
      '289 cu.in. V8 with four twin-choke Weber 48 IDA carburetors & bundle-of-snakes exhaust',
      'ZF 5DS-25 5-speed transaxle & Borrani center-lock wire wheels',
      'Brass-grommet ventilated seats & aircraft-toggle center instrument console',
      '1 of 31 factory street-specification Mk I GT40s built at Slough',
    ],
    curatorialSummary:
      'Standing exactly 40.5 inches from pavement to roof peak, P/1051 is one of only 31 factory road-trimmed Mk I GT40s built by Ford Advanced Vehicles in Slough, England. Fitted from new with a quartet of downdraft Weber 48 IDA carburetors, full leather-trimmed dashboard, and Borrani knock-off wire wheels.',
    architecturalNote:
      'Unrestored original Abbey Panels steel semi-monocoque tub with original brass chassis plate and bundle-of-snakes crossover exhaust.',
    provenance: [
      {
        year: '1966',
        location: 'Geneva, Switzerland',
        custodianOrEvent: 'Ford Motor Company (Switzerland) Promotional Tour',
        documentationNote: 'Displayed at Geneva Salon and road-tested by European motoring press.',
      },
      {
        year: '2018',
        location: 'Goodwood, United Kingdom',
        custodianOrEvent: 'Goodwood Revival Whitsun Trophy Exhibition',
        documentationNote: 'Demonstrated on circuit; verified by Ronnie Spain historical monograph.',
      },
    ],
    certification: 'Ronnie Spain GT40 Historical Dossier & FIA HTP Papers',
  },
];
