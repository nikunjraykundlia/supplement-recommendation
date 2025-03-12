import getAIGeneratedSupplementImage from './aiImageGenerator';

export interface Supplement {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  dosage: string;
  timing: string;
  imageUrl: string;
  recommended: boolean;
  scientific_references?: string[];
}

// Get a reliable supplement image URL that won't fail to load
const getSupplementImageUrl = (supplement: string, category: string = "Vitamin"): string => {
  return getAIGeneratedSupplementImage(supplement, category);
};

export const supplements: Supplement[] = [
  {
    id: "vitamin-d3",
    name: "Vitamin D3",
    category: "Vitamin",
    description: "Essential for bone health and immune function.",
    benefits: [
      "Supports bone health and calcium absorption",
      "Boosts immune system function",
      "May improve mood and energy levels"
    ],
    dosage: "2000 IU daily",
    timing: "Morning with food",
    imageUrl: getSupplementImageUrl("vitamin-d3", "Vitamin"),
    recommended: true,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6121423/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7281985/"
    ]
  },
  {
    id: "magnesium-glycinate",
    name: "Magnesium Glycinate",
    category: "Mineral",
    description: "Supports muscle and nerve function, energy production.",
    benefits: [
      "Promotes muscle relaxation and recovery",
      "Supports healthy sleep patterns",
      "Helps maintain heart health"
    ],
    dosage: "400mg daily",
    timing: "Evening before bed",
    imageUrl: getSupplementImageUrl("magnesium-glycinate", "Mineral"),
    recommended: true,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5637834/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6024559/"
    ]
  },
  {
    id: "omega-3",
    name: "Omega-3 Fish Oil",
    category: "Essential Fatty Acid",
    description: "Supports heart, brain, and joint health.",
    benefits: [
      "Supports cardiovascular health",
      "Promotes brain function and cognitive health",
      "May reduce inflammation and joint pain"
    ],
    dosage: "1000mg daily",
    timing: "With meals",
    imageUrl: getSupplementImageUrl("omega-3", "Essential Fatty Acid"),
    recommended: true,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3262608/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4153275/"
    ]
  },
  {
    id: "vitamin-b-complex",
    name: "Vitamin B Complex",
    category: "Vitamin",
    description: "Supports energy production and nervous system function.",
    benefits: [
      "Enhances energy levels and reduces fatigue",
      "Supports nervous system health",
      "Promotes healthy metabolism"
    ],
    dosage: "1 capsule daily",
    timing: "Morning with breakfast",
    imageUrl: getSupplementImageUrl("vitamin-b-complex", "Vitamin"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4772032/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6930825/"
    ]
  },
  {
    id: "zinc",
    name: "Zinc",
    category: "Mineral",
    description: "Essential for immune function and protein synthesis.",
    benefits: [
      "Supports immune system function",
      "Promotes wound healing",
      "Essential for protein synthesis and growth"
    ],
    dosage: "15mg daily",
    timing: "With food",
    imageUrl: getSupplementImageUrl("zinc", "Mineral"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2820120/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6370289/"
    ]
  },
  {
    id: "probiotics",
    name: "Probiotics",
    category: "Digestive Health",
    description: "Supports gut health and immune function.",
    benefits: [
      "Promotes healthy gut flora",
      "Supports digestive health",
      "May enhance immune function"
    ],
    dosage: "10 billion CFU daily",
    timing: "Morning before breakfast",
    imageUrl: getSupplementImageUrl("probiotics", "Digestive Health"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6340058/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6306248/"
    ]
  },
  {
    id: "vitamin-c",
    name: "Vitamin C",
    category: "Vitamin",
    description: "Powerful antioxidant supporting immune health.",
    benefits: [
      "Enhances immune system function",
      "Acts as an antioxidant to protect cells",
      "Supports collagen production for skin health"
    ],
    dosage: "500-1000mg daily",
    timing: "Throughout the day with meals",
    imageUrl: getSupplementImageUrl("vitamin-c", "Vitamin"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5707683/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6099636/"
    ]
  },
  {
    id: "turmeric",
    name: "Turmeric Curcumin",
    category: "Herbal",
    description: "Natural anti-inflammatory and antioxidant supplement.",
    benefits: [
      "Reduces inflammation and joint pain",
      "Provides powerful antioxidant protection",
      "Supports brain health and cognitive function"
    ],
    dosage: "500-1000mg daily",
    timing: "With food containing some fat",
    imageUrl: getSupplementImageUrl("turmeric", "Herbal"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5664031/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5664031/"
    ]
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha",
    category: "Adaptogen",
    description: "Ayurvedic herb that helps the body manage stress and anxiety.",
    benefits: [
      "Reduces cortisol levels and stress",
      "May improve sleep quality",
      "Supports adrenal function and energy levels"
    ],
    dosage: "300-500mg daily",
    timing: "Morning or evening",
    imageUrl: getSupplementImageUrl("ashwagandha", "Adaptogen"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6979308/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6750292/"
    ]
  },
  {
    id: "coq10",
    name: "Coenzyme Q10",
    category: "Antioxidant",
    description: "Natural antioxidant that helps generate energy in cells.",
    benefits: [
      "Supports cellular energy production",
      "Acts as an antioxidant",
      "May support heart health"
    ],
    dosage: "100-200mg daily",
    timing: "With a meal containing fat",
    imageUrl: getSupplementImageUrl("coq10", "Antioxidant"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6131403/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5807419/"
    ]
  },
  {
    id: "vitamin-k2",
    name: "Vitamin K2",
    category: "Vitamin",
    description: "Essential for proper calcium utilization and bone health.",
    benefits: [
      "Directs calcium to bones instead of arteries",
      "Supports heart health",
      "Works synergistically with vitamin D3"
    ],
    dosage: "100-200mcg daily",
    timing: "With food containing fat",
    imageUrl: getSupplementImageUrl("vitamin-k2", "Vitamin"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4566462/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5494092/"
    ]
  },
  {
    id: "l-theanine",
    name: "L-Theanine",
    category: "Amino Acid",
    description: "Natural compound found in tea leaves that promotes relaxation without drowsiness.",
    benefits: [
      "Promotes relaxation and reduces stress",
      "Improves focus when combined with caffeine",
      "May support better sleep quality"
    ],
    dosage: "200-400mg daily",
    timing: "Morning or evening",
    imageUrl: getSupplementImageUrl("l-theanine", "Amino Acid"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6836118/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4787341/"
    ]
  },
  {
    id: "berberine",
    name: "Berberine",
    category: "Herbal",
    description: "Plant compound that has powerful effects on metabolic health.",
    benefits: [
      "Supports healthy blood sugar levels",
      "May improve cholesterol and triglyceride levels",
      "Supports gut health"
    ],
    dosage: "500mg 2-3 times daily",
    timing: "Before meals",
    imageUrl: getSupplementImageUrl("berberine", "Herbal"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6587018/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4377376/"
    ]
  },
  {
    id: "melatonin",
    name: "Melatonin",
    category: "Sleep Aid",
    description: "Natural hormone that regulates sleep-wake cycle and supports quality sleep.",
    benefits: [
      "Promotes faster sleep onset",
      "Helps regulate sleep-wake cycles",
      "May improve overall sleep quality"
    ],
    dosage: "1-3mg before bedtime",
    timing: "30-60 minutes before sleep",
    imageUrl: getSupplementImageUrl("melatonin", "Sleep Aid"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6057895/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5409706/"
    ]
  },
  {
    id: "collagen-peptides",
    name: "Collagen Peptides",
    category: "Structural Protein",
    description: "Supports skin elasticity, joint health, and connective tissues.",
    benefits: [
      "Promotes skin elasticity and hydration",
      "Supports joint health and mobility",
      "May strengthen hair and nails"
    ],
    dosage: "10-20g daily",
    timing: "Any time of day, consistently",
    imageUrl: getSupplementImageUrl("collagen-peptides", "Structural Protein"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6835901/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6891674/"
    ]
  },
  {
    id: "nac",
    name: "N-Acetyl Cysteine (NAC)",
    category: "Amino Acid",
    description: "Powerful antioxidant that supports respiratory health and detoxification.",
    benefits: [
      "Supports respiratory health",
      "Promotes liver detoxification",
      "Acts as a precursor to glutathione, a master antioxidant"
    ],
    dosage: "600-1200mg daily",
    timing: "With or without food",
    imageUrl: getSupplementImageUrl("nac", "Amino Acid"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6562654/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5241507/"
    ]
  },
  {
    id: "lions-mane",
    name: "Lion's Mane Mushroom",
    category: "Medicinal Mushroom",
    description: "Cognitive-enhancing fungus that supports brain health and nervous system function.",
    benefits: [
      "Supports cognitive function and memory",
      "May promote nerve growth factor production",
      "Provides neuroprotective properties"
    ],
    dosage: "500-1000mg daily",
    timing: "Morning or afternoon with food",
    imageUrl: getSupplementImageUrl("lions-mane", "Medicinal Mushroom"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6438434/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5987239/"
    ]
  },
  {
    id: "resveratrol",
    name: "Resveratrol",
    category: "Polyphenol",
    description: "Plant compound with antioxidant properties that may promote longevity and cardiovascular health.",
    benefits: [
      "Supports cardiovascular health",
      "Provides antioxidant protection",
      "May activate longevity genes"
    ],
    dosage: "150-500mg daily",
    timing: "With meals",
    imageUrl: getSupplementImageUrl("resveratrol", "Polyphenol"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6164842/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4030174/"
    ]
  },
  {
    id: "rhodiola",
    name: "Rhodiola Rosea",
    category: "Adaptogen",
    description: "Powerful adaptogen that enhances physical and mental performance under stress.",
    benefits: [
      "Reduces physical and mental fatigue",
      "Improves stress resilience and adaptation",
      "Enhances cognitive function and mental clarity"
    ],
    dosage: "200-600mg daily",
    timing: "Morning, preferably before breakfast",
    imageUrl: getSupplementImageUrl("rhodiola", "Adaptogen"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5836007/",
      "https://pubmed.ncbi.nlm.nih.gov/30002792/"
    ]
  },
  {
    id: "spirulina",
    name: "Spirulina",
    category: "Superfood",
    description: "Nutrient-dense blue-green algae with powerful antioxidant properties.",
    benefits: [
      "Provides complete protein with all essential amino acids",
      "Contains powerful antioxidants like phycocyanin",
      "Supports immune function and reduces inflammation"
    ],
    dosage: "1-3g daily",
    timing: "Morning or afternoon with food",
    imageUrl: getSupplementImageUrl("spirulina", "Superfood"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3136577/",
      "https://pubmed.ncbi.nlm.nih.gov/25006989/"
    ]
  },
  {
    id: "alpha-lipoic-acid",
    name: "Alpha Lipoic Acid",
    category: "Antioxidant",
    description: "Powerful antioxidant that functions in both water and fat-soluble environments.",
    benefits: [
      "Recycles other antioxidants like vitamins C and E",
      "Supports healthy glucose metabolism",
      "May improve nerve function and reduce oxidative stress"
    ],
    dosage: "300-600mg daily",
    timing: "With meals",
    imageUrl: getSupplementImageUrl("alpha-lipoic-acid", "Antioxidant"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6723188/",
      "https://pubmed.ncbi.nlm.nih.gov/28809836/"
    ]
  },
  {
    id: "quercetin",
    name: "Quercetin",
    category: "Antioxidant",
    description: "A plant flavonoid with anti-inflammatory and antihistamine properties.",
    benefits: [
      "Natural antihistamine for allergy relief",
      "Powerful antioxidant that fights free radicals",
      "May support cardiovascular health"
    ],
    dosage: "500-1000mg daily",
    timing: "With meals",
    imageUrl: getSupplementImageUrl("quercetin", "Antioxidant"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6273625/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7254783/"
    ]
  },
  {
    id: "selenium",
    name: "Selenium",
    category: "Mineral",
    description: "Essential trace mineral important for cognitive function and immune health.",
    benefits: [
      "Supports thyroid function",
      "Powerful antioxidant when combined with vitamin E",
      "Helps maintain immune system"
    ],
    dosage: "50-200mcg daily",
    timing: "With food",
    imageUrl: getSupplementImageUrl("selenium", "Mineral"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6163284/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5307254/"
    ]
  },
  {
    id: "vitamin-e",
    name: "Vitamin E",
    category: "Vitamin",
    description: "Fat-soluble antioxidant that protects cells from oxidative damage.",
    benefits: [
      "Protects cells from oxidative damage",
      "Supports skin health",
      "May benefit heart and blood vessel health"
    ],
    dosage: "15-30mg (22-45 IU) daily",
    timing: "With a meal containing fat",
    imageUrl: getSupplementImageUrl("vitamin-e", "Vitamin"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6266234/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3997530/"
    ]
  },
  {
    id: "biotin",
    name: "Biotin",
    category: "Vitamin",
    description: "B vitamin essential for energy metabolism and maintaining healthy hair, skin, and nails.",
    benefits: [
      "Supports hair, skin, and nail health",
      "Essential for carbohydrate and fat metabolism",
      "May help with brittle nails and hair loss"
    ],
    dosage: "5000mcg daily",
    timing: "Any time of day with food",
    imageUrl: getSupplementImageUrl("biotin", "Vitamin"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6380979/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5582478/"
    ]
  },
  {
    id: "glutamine",
    name: "L-Glutamine",
    category: "Amino Acid",
    description: "Amino acid that supports intestinal health and immune function.",
    benefits: [
      "Supports gut health and intestinal barrier function",
      "Aids in muscle recovery after exercise",
      "Supports immune system function"
    ],
    dosage: "5-10g daily",
    timing: "Between meals",
    imageUrl: getSupplementImageUrl("glutamine", "Amino Acid"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5946267/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6266414/"
    ]
  },
  {
    id: "iron",
    name: "Iron",
    category: "Mineral",
    description: "Essential mineral needed for oxygen transport and energy production.",
    benefits: [
      "Critical for red blood cell formation and oxygen transport",
      "Supports energy production and reduces fatigue",
      "Essential for cognitive function"
    ],
    dosage: "15-45mg daily (under medical supervision)",
    timing: "On an empty stomach with vitamin C",
    imageUrl: getSupplementImageUrl("iron", "Mineral"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5986027/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6142249/"
    ]
  },
  {
    id: "creatine",
    name: "Creatine Monohydrate",
    category: "Performance",
    description: "Natural compound that enhances high-intensity exercise performance and cognitive function.",
    benefits: [
      "Increases strength and power output",
      "Enhances muscle recovery and growth",
      "May support brain health and cognitive function"
    ],
    dosage: "3-5g daily",
    timing: "Any time of day, consistently",
    imageUrl: getSupplementImageUrl("creatine", "Performance"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6950923/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6093191/"
    ]
  },
  {
    id: "5-htp",
    name: "5-HTP",
    category: "Mood Support",
    description: "Precursor to serotonin that may help regulate mood, sleep, and appetite.",
    benefits: [
      "May support healthy mood and reduce symptoms of mild depression",
      "Can improve sleep quality",
      "May help reduce appetite and support weight management"
    ],
    dosage: "50-200mg daily",
    timing: "Before bedtime",
    imageUrl: getSupplementImageUrl("5-htp", "Mood Support"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3415362/",
      "https://pubmed.ncbi.nlm.nih.gov/27824481/"
    ]
  },
  {
    id: "ginger",
    name: "Ginger Root",
    category: "Herbal",
    description: "Natural anti-inflammatory and digestive aid with multiple health benefits.",
    benefits: [
      "Reduces nausea and digestive discomfort",
      "Has anti-inflammatory properties",
      "May support joint health and mobility"
    ],
    dosage: "500-1000mg daily",
    timing: "With meals",
    imageUrl: getSupplementImageUrl("ginger", "Herbal"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6616534/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7019938/"
    ]
  },
  {
    id: "msm",
    name: "MSM (Methylsulfonylmethane)",
    category: "Joint Support",
    description: "Organic sulfur compound that supports joint health and inflammation reduction.",
    benefits: [
      "Supports joint health and mobility",
      "Reduces inflammation and oxidative stress",
      "May support healthy skin, hair, and nails"
    ],
    dosage: "1000-3000mg daily",
    timing: "With meals",
    imageUrl: getSupplementImageUrl("msm", "Joint Support"),
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5372953/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4252399/"
    ]
  }
];

export const getRecommendedSupplements = (): Supplement[] => {
  return supplements.filter(supplement => supplement.recommended);
};

export const getAllSupplements = (): Supplement[] => {
  return supplements;
};

export const getSupplementById = (id: string): Supplement | undefined => {
  return supplements.find(supplement => supplement.id === id);
};

export const getSupplementsByIds = (ids: string[]): Supplement[] => {
  return supplements.filter(supplement => ids.includes(supplement.id));
};
