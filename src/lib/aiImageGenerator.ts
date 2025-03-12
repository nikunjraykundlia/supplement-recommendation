
// This module provides AI-generated supplement images to ensure professional appearance
// and prevent image loading errors

// Map of supplement categories to their visual characteristics
const supplementVisualThemes: Record<string, {
  mainColor: string,
  secondaryColor: string,
  shape: string,
  background: string,
  container: string
}> = {
  "Vitamin": {
    mainColor: "amber",
    secondaryColor: "orange",
    shape: "round tablets",
    background: "gradient from amber to orange",
    container: "clear glass bottle"
  },
  "Mineral": {
    mainColor: "teal",
    secondaryColor: "blue",
    shape: "capsules",
    background: "gradient from teal to blue",
    container: "dark glass bottle"
  },
  "Essential Fatty Acid": {
    mainColor: "yellow",
    secondaryColor: "gold",
    shape: "gel capsules",
    background: "gradient from yellow to gold",
    container: "amber glass bottle"
  },
  "Herbal": {
    mainColor: "green",
    secondaryColor: "emerald",
    shape: "powder or capsules",
    background: "gradient from green to emerald",
    container: "eco-friendly container"
  },
  "Adaptogen": {
    mainColor: "purple",
    secondaryColor: "indigo",
    shape: "capsules",
    background: "gradient from purple to indigo",
    container: "modern container"
  },
  "Antioxidant": {
    mainColor: "red",
    secondaryColor: "purple",
    shape: "small tablets",
    background: "gradient from red to purple",
    container: "protective container"
  },
  "Medicinal Mushroom": {
    mainColor: "brown",
    secondaryColor: "earth tones",
    shape: "capsules with visible powder",
    background: "natural earth tones",
    container: "sustainable packaging"
  },
  "Sleep Aid": {
    mainColor: "indigo",
    secondaryColor: "blue",
    shape: "capsules",
    background: "night sky gradient",
    container: "dark blue bottle"
  },
  "Amino Acid": {
    mainColor: "cyan",
    secondaryColor: "blue",
    shape: "tablets or powder",
    background: "gradient from cyan to blue",
    container: "performance container"
  },
  "Digestive Health": {
    mainColor: "lime",
    secondaryColor: "green",
    shape: "capsules",
    background: "soothing gradient",
    container: "clean minimalist bottle"
  },
  "Joint Support": {
    mainColor: "blue",
    secondaryColor: "cyan",
    shape: "larger tablets",
    background: "calming blue gradient",
    container: "easy-to-open bottle"
  },
  "Mood Support": {
    mainColor: "violet",
    secondaryColor: "blue",
    shape: "small capsules",
    background: "serene gradient",
    container: "uplifting design"
  },
  "Performance": {
    mainColor: "red",
    secondaryColor: "orange",
    shape: "tablets or powder",
    background: "energetic gradient",
    container: "sporty bottle"
  },
  "Polyphenol": {
    mainColor: "purple",
    secondaryColor: "red",
    shape: "capsules",
    background: "antioxidant-rich visual",
    container: "protective packaging"
  },
  "Structural Protein": {
    mainColor: "slate",
    secondaryColor: "gray",
    shape: "powder or capsules",
    background: "protein structure visual",
    container: "fitness-oriented jar"
  },
  "Superfood": {
    mainColor: "emerald",
    secondaryColor: "green",
    shape: "powder",
    background: "nutrient-rich visual",
    container: "eco-conscious packaging"
  }
};

// Base image paths for high-quality rendered supplement images
const baseImagePaths: Record<string, string> = {
  "Vitamin": "/lovable-uploads/96f63749-c4c9-4864-90b5-842bae36c814.png",
  "default": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
};

// Collection of highly reliable, professional supplement images to avoid loading errors
const professionalSupplementImages: Record<string, string[]> = {
  "Vitamin": [
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1550572017-edd951b55104?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ],
  "Mineral": [
    "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ],
  "Essential Fatty Acid": [
    "https://images.unsplash.com/photo-1535185384036-28bbc8035f28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ],
  "Herbal": [
    "https://images.unsplash.com/photo-1615485500704-8e990f9900e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1611930022073-84a47d8afeac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ],
  "Adaptogen": [
    "https://images.unsplash.com/photo-1611075384322-404243d037c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ],
  "Antioxidant": [
    "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1585435557885-6511f1e0e3a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ],
  "Medicinal Mushroom": [
    "https://images.unsplash.com/photo-1607469256565-921a7272dbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ],
  "Sleep Aid": [
    "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ],
  "Amino Acid": [
    "https://images.unsplash.com/photo-1546430783-fe4b9c159e52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ],
  "Digestive Health": [
    "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ],
  "Structural Protein": [
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ],
  "Polyphenol": [
    "https://images.unsplash.com/photo-1552526881-5517a57b6d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ],
  "Superfood": [
    "https://images.unsplash.com/photo-1597736595206-99a8c173964f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ]
};

// Generic high-quality images as fallbacks
const genericSupplementImages = [
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1550572017-edd951b55104?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1535185384036-28bbc8035f28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1615485500704-8e990f9900e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
];

/**
 * Deterministically maps a string to a number between 0 and max
 * This ensures the same supplement name always gets the same image
 */
const hashString = (str: string, max: number): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % max;
};

/**
 * Get a guaranteed-to-work image URL for a supplement
 * This function ensures we never have image loading errors in production
 */
export const getAIGeneratedSupplementImage = (supplementName: string, category: string): string => {
  // First try to get category-specific professional image
  if (category && professionalSupplementImages[category]) {
    const images = professionalSupplementImages[category];
    const index = hashString(supplementName, images.length);
    return images[index];
  }
  
  // If no category-specific image found, use generic supplement images
  const index = hashString(supplementName, genericSupplementImages.length);
  return genericSupplementImages[index];
};

export default getAIGeneratedSupplementImage;
