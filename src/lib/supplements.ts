
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
    recommended: true
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
    recommended: true
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
    recommended: true
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
    recommended: false
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
    recommended: false
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
    recommended: false
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
    recommended: false
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
    recommended: false
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

// Get supplements by IDs
export const getSupplementsByIds = (ids: string[]): Supplement[] => {
  return supplements.filter(supplement => ids.includes(supplement.id));
};
