export const DISEASE_CLASSES = [
  'Bacterial Blight',
  'Curl Virus',
  'Healthy Leaf',
  'Herbicide Growth Damage',
  'Leaf Hopper Jassids',
  'Leaf Redding',
  'Leaf Variegation'
];

export const DISEASE_DETAILS = {
  'Bacterial Blight': {
    category: 'Bacterial Disease',
    pathogen: 'Xanthomonas citri pv. malvacearum',
    severity: 'High',
    color: '#EF4444',
    badgeBg: 'bg-red-50 text-red-700 border-red-200',
    description:
      'A destructive bacterial disease causing angular leaf spots, black arm on stems, and boll rot in cotton plants.',
    symptoms: [
      'Water-soaked, angular leaf spots restricted by leaf veins',
      'Spots turn reddish-brown to dark black with necrotic centers',
      'Premature leaf shedding and defoliation',
      'Black lesions on petiole and stem (Black Arm phase)'
    ],
    management: [
      'Use certified pathogen-free seeds treated with recommended bactericides',
      'Adopt crop rotation with non-host crops to break bacterial cycle',
      'Avoid overhead sprinkler irrigation to reduce moisture spread',
      'Destroy crop residue post-harvest and maintain field sanitation'
    ]
  },
  'Curl Virus': {
    category: 'Viral Disease',
    pathogen: 'Cotton Leaf Curl Virus (CLCuV) / Begomovirus',
    severity: 'Critical',
    color: '#F97316',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    description:
      'A debilitating viral infection transmitted by whiteflies (Bemisia tabaci) leading to severe stunting and leaf deformation.',
    symptoms: [
      'Upward or downward curling of leaf margins',
      'Thickening and swelling of main and secondary veins',
      'Enations (small leaf-like cup structures) on the underside of leaves',
      'Severe plant stunting, reduced flowering, and boll shedding'
    ],
    management: [
      'Manage whitefly populations using yellow sticky traps and integrated pest strategies',
      'Eradicate alternative weed hosts and infected ratoon cotton plants',
      'Plant resistant or tolerant hybrid cotton cultivars',
      'Sow crops early in the season to evade peak insect vector populations'
    ]
  },
  'Healthy Leaf': {
    category: 'Optimal Health',
    pathogen: 'None',
    severity: 'None',
    color: '#16A34A',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description:
      'The leaf exhibits vibrant green pigmentation, normal venation, turgid structure, and no visible lesions or distress.',
    symptoms: [
      'Uniform green coloration across the entire leaf blade',
      'Intact leaf margins without curling or yellowing',
      'Absence of bacterial lesions, fungal spots, or insect punctures',
      'Healthy vigor, optimal transpiration, and robust growth'
    ],
    management: [
      'Maintain balanced N-P-K nutrient schedules according to soil test reports',
      'Provide regular, regulated irrigation avoiding moisture stress or waterlogging',
      'Conduct routine field scouting for early pest or disease detection',
      'Practice preventive weed control and maintain soil organic health'
    ]
  },
  'Herbicide Growth Damage': {
    category: 'Chemical / Physiological Injury',
    pathogen: 'Non-pathogenic (Chemical drift / residue)',
    severity: 'Moderate',
    color: '#EAB308',
    badgeBg: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    description:
      'Damage caused by herbicide drift, residual soil carryover, or accidental exposure to non-selective herbicides like 2,4-D or Glyphosate.',
    symptoms: [
      'Strapping, feathering, or "shoe-stringing" of young leaves',
      'Epinasty (downward twisting and curling of stems and petioles)',
      'Chlorotic mottling or interveinal yellowing along margins',
      'Stunted terminal buds and irregular growth patterns'
    ],
    management: [
      'Use dedicated sprayers and thoroughly clean tanks before applying cotton inputs',
      'Apply herbicides during calm weather to prevent spray drift from adjacent fields',
      'Avoid high spray pressures that generate ultra-fine driftable droplets',
      'Apply mild foliar biostimulants or zinc/nitrogen sprays to support recovery'
    ]
  },
  'Leaf Hopper Jassids': {
    category: 'Insect Pest Damage',
    pathogen: 'Amrasca biguttula biguttula (Jassids)',
    severity: 'Moderate to High',
    color: '#8B5CF6',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    description:
      'Sap-sucking pest damage characterized by phytotoxic saliva injection into cotton foliage, resulting in "hopperburn".',
    symptoms: [
      'Yellowing along the outer edges of lower and middle leaves',
      'Margins curve downwards and develop reddish-brown scorched edges',
      'Progressive browning resembling edge burn ("hopperburn")',
      'Brittle, dry leaves that drop prematurely under heavy infestation'
    ],
    management: [
      'Encourage natural biological predators like ladybird beetles and lacewings',
      'Install yellow sticky traps across the field to monitor hopper thresholds',
      'Select hairy leaf cotton varieties which naturally deter jassid oviposition',
      'Apply neem-based formulations or recommended botanical repellents'
    ]
  },
  'Leaf Redding': {
    category: 'Nutritional / Abiotic Disorder',
    pathogen: 'Physiological (Magnesium deficiency / low temperature)',
    severity: 'Moderate',
    color: '#DC2626',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    description:
      'A physiological disorder triggered by magnesium deficiency, sudden drop in night temperatures, or waterlogging during boll development.',
    symptoms: [
      'Interveinal purplish-red discoloration while main veins remain green',
      'Lower and middle canopy leaves turn bright red or bronze',
      'Leaves become thick, brittle, and shed prematurely',
      'Reduced photosynthetic capacity directly affecting boll weight'
    ],
    management: [
      'Foliar spray of 1% to 2% Magnesium Sulphate (MgSO4) during squaring and boll development',
      'Ensure proper field drainage to prevent root asphyxiation and poor nutrient uptake',
      'Apply balanced potassium and nitrogen fertilizers during peak reproductive stages',
      'Incorporate organic manure to boost cation exchange capacity in soil'
    ]
  },
  'Leaf Variegation': {
    category: 'Genetic / Physiological Variation',
    pathogen: 'Genetic chimera / Abiotic anomaly',
    severity: 'Low',
    color: '#06B6D4',
    badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    description:
      'Irregular white, yellow, or pale green sectoral discoloration on leaf blades due to localized chlorophyll deficiency or somatic mutation.',
    symptoms: [
      'Distinct marbled patches or zones of albino/chlorophyll-deficient tissue',
      'Sharply defined boundaries between dark green and pale leaf sectors',
      'Typically isolated to specific leaves or branches without spreading',
      'No fungal spores, bacterial oozes, or pest feeding punctures present'
    ],
    management: [
      'Monitor plants to ensure variegation is benign genetic chimera and not viral mosaic',
      'Maintain standard crop nutrition; no specialized treatment required',
      'Document affected varieties for seed purity records',
      'If coupled with stunting, test for suspected latent viral strains'
    ]
  }
};
