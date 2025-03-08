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
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1535185384036-28bbc8035f28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1550572017-edd951b55104?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1615485500704-8e990f9900e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1611075384322-404243d037c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1546430783-fe4b9c159e52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    recommended: false,
    scientific_references: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6164842/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4030174/"
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
