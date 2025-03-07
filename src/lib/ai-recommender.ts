
import { Supplement, supplements } from "./supplements";

// Define assessment data interface
export interface AssessmentData {
  age: string;
  goals: string[];
  lifestyle: string;
  concerns: string[];
  // Advanced assessment fields (will be implemented in the future)
  deficiencies?: string[];
  dietaryPreferences?: string[];
  medicalHistory?: string[];
  medications?: string[];
  allergies?: string[];
}

// Check if assessment can be retaken - always returns true now as we removed the 24-hour rule
export const canRetakeAssessment = (): boolean => {
  return true;
};

// Get time remaining until next assessment - not needed anymore, but kept for compatibility
export const getTimeUntilNextAssessment = (): string => {
  return "now";
};

// AI recommendation engine (simulated)
export const getRecommendedSupplementsForUser = (assessmentData: AssessmentData): Supplement[] => {
  // This is a simplified recommendation algorithm that can be enhanced in the future
  // with more sophisticated AI/ML models
  
  // Start with all supplements
  let recommendedSupplements: Supplement[] = [...supplements];
  let scores: { [key: string]: number } = {};
  
  // Initialize scores
  recommendedSupplements.forEach(supp => {
    scores[supp.id] = 0;
  });
  
  // Score supplements based on goals
  if (assessmentData.goals.includes("Energy Boost")) {
    scores["vitamin-b-complex"] += 5;
    scores["magnesium-glycinate"] += 3;
  }
  
  if (assessmentData.goals.includes("Immune Support")) {
    scores["vitamin-d3"] += 5;
    scores["zinc"] += 4;
    scores["vitamin-c"] += 4; // Note: This supplement doesn't exist yet
  }
  
  if (assessmentData.goals.includes("Muscle Recovery")) {
    scores["magnesium-glycinate"] += 4;
    scores["omega-3"] += 3;
    scores["protein"] += 5; // Note: This supplement doesn't exist yet
  }
  
  if (assessmentData.goals.includes("Better Sleep")) {
    scores["magnesium-glycinate"] += 5;
    scores["melatonin"] += 5; // Note: This supplement doesn't exist yet
  }
  
  // Score supplements based on lifestyle
  if (assessmentData.lifestyle === "Very Active") {
    scores["magnesium-glycinate"] += 4;
    scores["omega-3"] += 3;
    scores["vitamin-b-complex"] += 3;
  } else if (assessmentData.lifestyle === "Sedentary") {
    scores["vitamin-d3"] += 4;
    scores["omega-3"] += 2;
  }
  
  // Score supplements based on concerns
  if (assessmentData.concerns.includes("Joint Pain")) {
    scores["omega-3"] += 5;
    scores["turmeric"] += 5; // Note: This supplement doesn't exist yet
  }
  
  if (assessmentData.concerns.includes("Digestive Issues")) {
    scores["probiotics"] += 5;
    scores["digestive-enzymes"] += 4; // Note: This supplement doesn't exist yet
  }
  
  if (assessmentData.concerns.includes("Low Energy")) {
    scores["vitamin-b-complex"] += 5;
    scores["iron"] += 4; // Note: This supplement doesn't exist yet
    scores["vitamin-d3"] += 3;
  }
  
  if (assessmentData.concerns.includes("Poor Sleep")) {
    scores["magnesium-glycinate"] += 5;
    scores["melatonin"] += 5; // Note: This supplement doesn't exist yet
  }
  
  // Sort supplements by score and take top 3
  const sortedSupplements = recommendedSupplements.sort((a, b) => {
    return (scores[b.id] || 0) - (scores[a.id] || 0);
  });
  
  // Only return supplements that have at least some relevance
  let result = sortedSupplements.filter(supp => (scores[supp.id] || 0) > 0);
  
  // If no supplements match (unlikely but possible), return the default recommendations
  if (result.length === 0) {
    result = supplements.filter(supp => supp.recommended);
  }
  
  // Limit to 3 supplements for now
  result = result.slice(0, 3);
  
  // Mark these as recommended
  result.forEach(supp => {
    supp.recommended = true;
  });
  
  return result;
};

// Get user's saved supplements
export const getUserSupplements = (): string[] => {
  const savedSupplements = localStorage.getItem("userSupplements");
  return savedSupplements ? JSON.parse(savedSupplements) : [];
};

// Save user supplements
export const saveUserSupplements = (supplementIds: string[]): void => {
  localStorage.setItem("userSupplements", JSON.stringify(supplementIds));
};
