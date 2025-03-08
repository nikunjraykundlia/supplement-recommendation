
import { Supplement, supplements } from "./supplements";

// Define assessment data interface
export interface AssessmentData {
  age: string;
  goals: string[];
  lifestyle: string;
  concerns: string[];
  // Advanced assessment fields
  deficiencies?: string[];
  dietaryPreferences?: string[];
  medicalHistory?: string[];
  medications?: string[];
  allergies?: string[];
  stressLevel?: string;
  sleepQuality?: string;
  energyLevel?: string;
  // New fields for specialized questions
  skinConcerns?: string[];
  cognitiveGoals?: string[];
  respiratoryIssues?: string[];
}

// Get time since assessment (for weekly assessment score)
export const getTimeSinceAssessment = (): number => {
  const lastAssessment = localStorage.getItem("lastAssessmentDate");
  if (!lastAssessment) return 0;
  
  const lastDate = new Date(lastAssessment);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - lastDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

// Check if assessment can be retaken - always returns true as we removed the 24-hour rule
export const canRetakeAssessment = (): boolean => {
  return true;
};

// Get time remaining until next assessment - not needed anymore, but kept for compatibility
export const getTimeUntilNextAssessment = (): string => {
  return "now";
};

// Calculate weekly assessment score based on supplement intake
export const calculateWeeklyAssessmentScore = (): number => {
  // Get user's supplement intake records from local storage
  const intakeRecords = localStorage.getItem("supplementIntakeRecords");
  if (!intakeRecords) return 0;
  
  const records = JSON.parse(intakeRecords);
  const now = new Date();
  const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
  
  // Filter records from the past week
  const weekRecords = records.filter((record: any) => {
    const recordDate = new Date(record.date);
    return recordDate >= oneWeekAgo;
  });
  
  // Calculate compliance percentage
  if (weekRecords.length === 0) return 0;
  
  const totalRecords = weekRecords.length;
  const takenRecords = weekRecords.filter((record: any) => record.taken).length;
  
  return Math.round((takenRecords / totalRecords) * 100);
};

// AI recommendation engine (enhanced)
export const getRecommendedSupplementsForUser = (assessmentData: AssessmentData): Supplement[] => {
  // This is an enhanced recommendation algorithm that accounts for new supplements and assessment factors
  
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
    scores["coq10"] += 4;
    scores["l-theanine"] += 2;
  }
  
  if (assessmentData.goals.includes("Immune Support")) {
    scores["vitamin-d3"] += 5;
    scores["zinc"] += 4;
    scores["vitamin-c"] += 4;
  }
  
  if (assessmentData.goals.includes("Muscle Recovery")) {
    scores["magnesium-glycinate"] += 4;
    scores["omega-3"] += 3;
  }
  
  if (assessmentData.goals.includes("Better Sleep")) {
    scores["magnesium-glycinate"] += 5;
    scores["l-theanine"] += 4;
    scores["ashwagandha"] += 4;
  }
  
  if (assessmentData.goals.includes("Brain Function")) {
    scores["omega-3"] += 5;
    scores["l-theanine"] += 4;
    scores["vitamin-b-complex"] += 3;
  }
  
  if (assessmentData.goals.includes("Stress Management")) {
    scores["ashwagandha"] += 5;
    scores["l-theanine"] += 4;
    scores["magnesium-glycinate"] += 3;
  }
  
  if (assessmentData.goals.includes("Metabolic Health")) {
    scores["berberine"] += 5;
    scores["magnesium-glycinate"] += 3;
    scores["zinc"] += 2;
  }
  
  if (assessmentData.goals.includes("Heart Health")) {
    scores["coq10"] += 5;
    scores["omega-3"] += 5;
    scores["vitamin-k2"] += 4;
    scores["berberine"] += 3;
  }
  
  // Score supplements based on lifestyle
  if (assessmentData.lifestyle === "Very Active") {
    scores["magnesium-glycinate"] += 4;
    scores["omega-3"] += 3;
    scores["vitamin-b-complex"] += 3;
    scores["coq10"] += 3;
  } else if (assessmentData.lifestyle === "Sedentary") {
    scores["vitamin-d3"] += 4;
    scores["omega-3"] += 2;
    scores["berberine"] += 2;
  }
  
  // Score supplements based on concerns
  if (assessmentData.concerns.includes("Joint Pain")) {
    scores["omega-3"] += 5;
    scores["turmeric"] += 5;
    scores["vitamin-d3"] += 3;
  }
  
  if (assessmentData.concerns.includes("Digestive Issues")) {
    scores["probiotics"] += 5;
    scores["berberine"] += 3;
  }
  
  if (assessmentData.concerns.includes("Low Energy")) {
    scores["vitamin-b-complex"] += 5;
    scores["vitamin-d3"] += 3;
    scores["coq10"] += 4;
  }
  
  if (assessmentData.concerns.includes("Poor Sleep")) {
    scores["magnesium-glycinate"] += 5;
    scores["l-theanine"] += 4;
    scores["ashwagandha"] += 4;
  }
  
  if (assessmentData.concerns.includes("Brain Fog")) {
    scores["omega-3"] += 4;
    scores["vitamin-b-complex"] += 4;
    scores["l-theanine"] += 3;
  }
  
  if (assessmentData.concerns.includes("Stress")) {
    scores["ashwagandha"] += 5;
    scores["l-theanine"] += 4;
    scores["magnesium-glycinate"] += 4;
  }
  
  if (assessmentData.concerns.includes("Blood Sugar Issues")) {
    scores["berberine"] += 5;
    scores["magnesium-glycinate"] += 3;
    scores["zinc"] += 2;
  }
  
  if (assessmentData.concerns.includes("Heart Health Concerns")) {
    scores["coq10"] += 5;
    scores["omega-3"] += 5;
    scores["vitamin-k2"] += 4;
  }
  
  if (assessmentData.concerns.includes("Anxiety")) {
    scores["ashwagandha"] += 5;
    scores["l-theanine"] += 5;
    scores["magnesium-glycinate"] += 4;
  }
  
  // Score supplements based on deficiencies
  if (assessmentData.deficiencies) {
    if (assessmentData.deficiencies.includes("Vitamin D")) {
      scores["vitamin-d3"] += 5;
    }
    
    if (assessmentData.deficiencies.includes("Magnesium")) {
      scores["magnesium-glycinate"] += 5;
    }
    
    if (assessmentData.deficiencies.includes("Zinc")) {
      scores["zinc"] += 5;
    }
    
    if (assessmentData.deficiencies.includes("Vitamin B12")) {
      scores["vitamin-b-complex"] += 5;
    }
    
    if (assessmentData.deficiencies.includes("Omega-3")) {
      scores["omega-3"] += 5;
    }
    
    if (assessmentData.deficiencies.includes("Vitamin K")) {
      scores["vitamin-k2"] += 5;
    }
    
    if (assessmentData.deficiencies.includes("CoQ10")) {
      scores["coq10"] += 5;
    }
  }
  
  // Score supplements based on sleep quality
  if (assessmentData.sleepQuality) {
    if (assessmentData.sleepQuality === "Poor" || assessmentData.sleepQuality === "Fair") {
      scores["magnesium-glycinate"] += 4;
      scores["l-theanine"] += 3;
      scores["ashwagandha"] += 3;
    }
  }
  
  // Score supplements based on stress level
  if (assessmentData.stressLevel) {
    if (assessmentData.stressLevel === "High" || assessmentData.stressLevel === "Very High") {
      scores["ashwagandha"] += 5;
      scores["l-theanine"] += 4;
      scores["magnesium-glycinate"] += 3;
    }
  }
  
  // Score supplements based on energy level
  if (assessmentData.energyLevel) {
    if (assessmentData.energyLevel === "Low" || assessmentData.energyLevel === "Very Low") {
      scores["vitamin-b-complex"] += 4;
      scores["coq10"] += 4;
      scores["vitamin-d3"] += 3;
    }
  }
  
  // Sort supplements by score and take top 3-4
  const sortedSupplements = recommendedSupplements.sort((a, b) => {
    return (scores[b.id] || 0) - (scores[a.id] || 0);
  });
  
  // Only return supplements that have at least some relevance
  let result = sortedSupplements.filter(supp => (scores[supp.id] || 0) > 0);
  
  // If no supplements match (unlikely but possible), return the default recommendations
  if (result.length === 0) {
    result = supplements.filter(supp => supp.recommended);
  }
  
  // Limit to 4 supplements
  result = result.slice(0, 4);
  
  // Mark these as recommended
  result.forEach(supp => {
    supp.recommended = true;
  });
  
  // Save assessment date for weekly assessment score calculation
  localStorage.setItem("lastAssessmentDate", new Date().toISOString());
  
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

// Get supplements by IDs - This function was missing and needed to be exported
export const getSupplementsByIds = (ids: string[]): Supplement[] => {
  return supplements.filter(supplement => ids.includes(supplement.id));
};

// Record supplement intake
export const recordSupplementIntake = (supplementId: string, date: string, taken: boolean, timeOfDay: string): void => {
  // Get existing records
  const existingRecords = localStorage.getItem("supplementIntakeRecords");
  const records = existingRecords ? JSON.parse(existingRecords) : [];
  
  // Check if a record already exists for this supplement, date, and time of day
  const existingRecordIndex = records.findIndex((record: any) => 
    record.supplementId === supplementId && 
    record.date === date && 
    record.timeOfDay === timeOfDay
  );
  
  if (existingRecordIndex >= 0) {
    // Update existing record
    records[existingRecordIndex].taken = taken;
  } else {
    // Add new record
    records.push({
      supplementId,
      date,
      taken,
      timeOfDay
    });
  }
  
  // Save updated records
  localStorage.setItem("supplementIntakeRecords", JSON.stringify(records));
};

// Get supplement intake records for a specific date range
export const getSupplementIntakeRecords = (startDate: string, endDate: string): any[] => {
  const existingRecords = localStorage.getItem("supplementIntakeRecords");
  if (!existingRecords) return [];
  
  const records = JSON.parse(existingRecords);
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return records.filter((record: any) => {
    const recordDate = new Date(record.date);
    return recordDate >= start && recordDate <= end;
  });
};

// Get dates when all supplements were taken
export const getCompletedDates = (): Date[] => {
  const userSupplements = getUserSupplements();
  if (userSupplements.length === 0) return [];
  
  const existingRecords = localStorage.getItem("supplementIntakeRecords");
  if (!existingRecords) return [];
  
  const records = JSON.parse(existingRecords);
  const completedDates: { [date: string]: Set<string> } = {};
  
  // Group records by date and supplement
  records.forEach((record: any) => {
    if (record.taken) {
      if (!completedDates[record.date]) {
        completedDates[record.date] = new Set<string>();
      }
      completedDates[record.date].add(record.supplementId);
    }
  });
  
  // Find dates where all user supplements were taken
  return Object.entries(completedDates)
    .filter(([_, supplementSet]) => {
      // Check if all user supplements were taken on this date
      return userSupplements.every(suppId => supplementSet.has(suppId));
    })
    .map(([date, _]) => new Date(date));
};
