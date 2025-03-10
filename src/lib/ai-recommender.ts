
import { Supplement, supplements } from "./supplements";

// Define assessment data interface with more detailed user information
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
  // Specialized questions
  skinConcerns?: string[];
  cognitiveGoals?: string[];
  respiratoryIssues?: string[];
}

// Add user profile interface for avatar and data tracking
export interface UserProfile {
  userId: string;
  displayName?: string;
  email?: string;
  avatar?: string;
  deficiencies?: string[];
  strengthAreas?: string[];
  assessmentHistory?: Assessment[];
  complianceScore?: number;
  lastAssessment?: string;
  joinedDate?: string;
}

export interface Assessment {
  date: string;
  data: AssessmentData;
  recommendations: string[];
  complianceScore?: number;
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

// Check if assessment can be retaken
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

// Enhanced AI recommendation engine
export const getRecommendedSupplementsForUser = (assessmentData: AssessmentData): Supplement[] => {
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
    scores["iron"] += 4;
    scores["creatine"] += 3;
  }
  
  if (assessmentData.goals.includes("Immune Support")) {
    scores["vitamin-d3"] += 5;
    scores["zinc"] += 4;
    scores["vitamin-c"] += 4;
    scores["selenium"] += 4;
    scores["quercetin"] += 3;
  }
  
  if (assessmentData.goals.includes("Muscle Recovery")) {
    scores["magnesium-glycinate"] += 4;
    scores["omega-3"] += 3;
    scores["creatine"] += 5;
    scores["glutamine"] += 4;
  }
  
  if (assessmentData.goals.includes("Better Sleep")) {
    scores["magnesium-glycinate"] += 5;
    scores["l-theanine"] += 4;
    scores["ashwagandha"] += 4;
    scores["melatonin"] += 5;
    scores["5-htp"] += 3;
  }
  
  if (assessmentData.goals.includes("Brain Function")) {
    scores["omega-3"] += 5;
    scores["l-theanine"] += 4;
    scores["vitamin-b-complex"] += 3;
    scores["lions-mane"] += 5;
    scores["creatine"] += 2;
  }
  
  if (assessmentData.goals.includes("Stress Management")) {
    scores["ashwagandha"] += 5;
    scores["l-theanine"] += 4;
    scores["magnesium-glycinate"] += 3;
    scores["rhodiola"] += 4;
    scores["5-htp"] += 3;
  }
  
  if (assessmentData.goals.includes("Metabolic Health")) {
    scores["berberine"] += 5;
    scores["magnesium-glycinate"] += 3;
    scores["zinc"] += 2;
    scores["alpha-lipoic-acid"] += 4;
    scores["chromium"] += 3;
  }
  
  if (assessmentData.goals.includes("Heart Health")) {
    scores["coq10"] += 5;
    scores["omega-3"] += 5;
    scores["vitamin-k2"] += 4;
    scores["berberine"] += 3;
    scores["quercetin"] += 3;
  }
  
  if (assessmentData.goals.includes("Skin Health")) {
    scores["collagen-peptides"] += 5;
    scores["vitamin-c"] += 4;
    scores["biotin"] += 5;
    scores["vitamin-e"] += 4;
    scores["omega-3"] += 3;
  }
  
  if (assessmentData.goals.includes("Longevity")) {
    scores["resveratrol"] += 5;
    scores["coq10"] += 4;
    scores["nac"] += 4;
    scores["omega-3"] += 3;
    scores["vitamin-d3"] += 3;
  }
  
  if (assessmentData.goals.includes("Respiratory Health")) {
    scores["nac"] += 5;
    scores["vitamin-c"] += 4;
    scores["vitamin-d3"] += 4;
    scores["quercetin"] += 4;
    scores["omega-3"] += 3;
  }

  // Score supplements based on lifestyle
  if (assessmentData.lifestyle === "Very Active") {
    scores["magnesium-glycinate"] += 4;
    scores["omega-3"] += 3;
    scores["vitamin-b-complex"] += 3;
    scores["coq10"] += 3;
    scores["creatine"] += 5;
    scores["glutamine"] += 4;
  } else if (assessmentData.lifestyle === "Sedentary") {
    scores["vitamin-d3"] += 4;
    scores["omega-3"] += 2;
    scores["berberine"] += 2;
    scores["coq10"] += 3;
  }
  
  // Score supplements based on concerns
  if (assessmentData.concerns.includes("Joint Pain")) {
    scores["omega-3"] += 5;
    scores["turmeric"] += 5;
    scores["vitamin-d3"] += 3;
    scores["msm"] += 5;
    scores["collagen-peptides"] += 4;
  }
  
  if (assessmentData.concerns.includes("Digestive Issues")) {
    scores["probiotics"] += 5;
    scores["berberine"] += 3;
    scores["glutamine"] += 4;
    scores["ginger"] += 4;
  }
  
  if (assessmentData.concerns.includes("Low Energy")) {
    scores["vitamin-b-complex"] += 5;
    scores["vitamin-d3"] += 3;
    scores["coq10"] += 4;
    scores["iron"] += 5;
    scores["creatine"] += 3;
  }
  
  if (assessmentData.concerns.includes("Poor Sleep")) {
    scores["magnesium-glycinate"] += 5;
    scores["l-theanine"] += 4;
    scores["ashwagandha"] += 4;
    scores["melatonin"] += 5;
    scores["5-htp"] += 3;
  }
  
  if (assessmentData.concerns.includes("Brain Fog")) {
    scores["omega-3"] += 4;
    scores["vitamin-b-complex"] += 4;
    scores["l-theanine"] += 3;
    scores["lions-mane"] += 5;
    scores["rhodiola"] += 3;
  }
  
  if (assessmentData.concerns.includes("Stress")) {
    scores["ashwagandha"] += 5;
    scores["l-theanine"] += 4;
    scores["magnesium-glycinate"] += 4;
    scores["rhodiola"] += 4;
    scores["5-htp"] += 3;
  }
  
  if (assessmentData.concerns.includes("Blood Sugar Issues")) {
    scores["berberine"] += 5;
    scores["magnesium-glycinate"] += 3;
    scores["zinc"] += 2;
    scores["alpha-lipoic-acid"] += 4;
  }
  
  if (assessmentData.concerns.includes("Heart Health Concerns")) {
    scores["coq10"] += 5;
    scores["omega-3"] += 5;
    scores["vitamin-k2"] += 4;
    scores["quercetin"] += 3;
  }
  
  if (assessmentData.concerns.includes("Anxiety")) {
    scores["ashwagandha"] += 5;
    scores["l-theanine"] += 5;
    scores["magnesium-glycinate"] += 4;
    scores["5-htp"] += 4;
    scores["rhodiola"] += 3;
  }
  
  if (assessmentData.concerns.includes("Respiratory Issues")) {
    scores["nac"] += 5;
    scores["vitamin-c"] += 4;
    scores["vitamin-d3"] += 4;
    scores["quercetin"] += 4;
  }
  
  if (assessmentData.concerns.includes("Aging Concerns")) {
    scores["resveratrol"] += 5;
    scores["coq10"] += 4;
    scores["omega-3"] += 3;
    scores["vitamin-d3"] += 3;
    scores["collagen-peptides"] += 4;
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
    
    if (assessmentData.deficiencies.includes("Iron")) {
      scores["iron"] += 5;
    }
    
    if (assessmentData.deficiencies.includes("Vitamin E")) {
      scores["vitamin-e"] += 5;
    }
    
    if (assessmentData.deficiencies.includes("Selenium")) {
      scores["selenium"] += 5;
    }
    
    if (assessmentData.deficiencies.includes("Antioxidants")) {
      scores["vitamin-c"] += 4;
      scores["vitamin-e"] += 4;
      scores["selenium"] += 4;
      scores["alpha-lipoic-acid"] += 4;
      scores["resveratrol"] += 4;
    }
    
    if (assessmentData.deficiencies.includes("Collagen")) {
      scores["collagen-peptides"] += 5;
      scores["vitamin-c"] += 3;
    }
  }
  
  // Score supplements based on sleep quality
  if (assessmentData.sleepQuality) {
    if (assessmentData.sleepQuality === "Poor" || assessmentData.sleepQuality === "Fair") {
      scores["magnesium-glycinate"] += 4;
      scores["l-theanine"] += 3;
      scores["ashwagandha"] += 3;
      scores["melatonin"] += 4;
      scores["5-htp"] += 3;
    }
  }
  
  // Score supplements based on stress level
  if (assessmentData.stressLevel) {
    if (assessmentData.stressLevel === "High" || assessmentData.stressLevel === "Very High") {
      scores["ashwagandha"] += 5;
      scores["l-theanine"] += 4;
      scores["magnesium-glycinate"] += 3;
      scores["rhodiola"] += 4;
      scores["5-htp"] += 3;
    }
  }
  
  // Score supplements based on energy level
  if (assessmentData.energyLevel) {
    if (assessmentData.energyLevel === "Low" || assessmentData.energyLevel === "Very Low") {
      scores["vitamin-b-complex"] += 4;
      scores["coq10"] += 4;
      scores["vitamin-d3"] += 3;
      scores["iron"] += 4;
      scores["rhodiola"] += 3;
    }
  }
  
  // Score supplements based on skin concerns
  if (assessmentData.skinConcerns) {
    if (assessmentData.skinConcerns.includes("Aging/Wrinkles")) {
      scores["collagen-peptides"] += 5;
      scores["vitamin-c"] += 4;
      scores["vitamin-e"] += 4;
      scores["resveratrol"] += 3;
    }
    
    if (assessmentData.skinConcerns.includes("Dryness")) {
      scores["omega-3"] += 4;
      scores["vitamin-e"] += 4;
      scores["biotin"] += 3;
    }
    
    if (assessmentData.skinConcerns.includes("Elasticity Loss")) {
      scores["collagen-peptides"] += 5;
      scores["vitamin-c"] += 3;
      scores["biotin"] += 3;
    }
  }
  
  // Score supplements based on cognitive goals
  if (assessmentData.cognitiveGoals) {
    if (assessmentData.cognitiveGoals.includes("Memory Enhancement")) {
      scores["lions-mane"] += 5;
      scores["omega-3"] += 4;
      scores["vitamin-b-complex"] += 3;
    }
    
    if (assessmentData.cognitiveGoals.includes("Focus Improvement")) {
      scores["l-theanine"] += 4;
      scores["rhodiola"] += 4;
      scores["vitamin-b-complex"] += 3;
      scores["creatine"] += 3;
    }
    
    if (assessmentData.cognitiveGoals.includes("Neuroprotection")) {
      scores["omega-3"] += 4;
      scores["vitamin-e"] += 3;
      scores["lions-mane"] += 4;
      scores["resveratrol"] += 3;
    }
  }
  
  // Score supplements based on respiratory issues
  if (assessmentData.respiratoryIssues) {
    if (assessmentData.respiratoryIssues.includes("Frequent Colds")) {
      scores["vitamin-c"] += 5;
      scores["vitamin-d3"] += 4;
      scores["zinc"] += 4;
    }
    
    if (assessmentData.respiratoryIssues.includes("Seasonal Allergies")) {
      scores["quercetin"] += 5;
      scores["vitamin-c"] += 3;
      scores["nac"] += 3;
    }
    
    if (assessmentData.respiratoryIssues.includes("Asthma")) {
      scores["vitamin-d3"] += 4;
      scores["magnesium-glycinate"] += 3;
      scores["quercetin"] += 4;
      scores["omega-3"] += 4;
    }
  }
  
  // Sort supplements by score and take top recommendations
  const sortedSupplements = recommendedSupplements.sort((a, b) => {
    return (scores[b.id] || 0) - (scores[a.id] || 0);
  });
  
  // Only return supplements that have at least some relevance
  let result = sortedSupplements.filter(supp => (scores[supp.id] || 0) > 0);
  
  // If no supplements match (unlikely but possible), return the default recommendations
  if (result.length === 0) {
    result = supplements.filter(supp => supp.recommended);
  }
  
  // Limit to 5 supplements for more personalized approach
  result = result.slice(0, 5);
  
  // Mark these as recommended
  result.forEach(supp => {
    supp.recommended = true;
  });
  
  // Save recommendations to local storage for the avatar system
  saveUserDeficiencies(assessmentData, result);
  
  // Save assessment date for weekly assessment score calculation
  localStorage.setItem("lastAssessmentDate", new Date().toISOString());
  
  // Save assessment history
  saveAssessmentHistory(assessmentData, result);
  
  return result;
};

// Save user's current assessment to history
const saveAssessmentHistory = (assessmentData: AssessmentData, recommendations: Supplement[]) => {
  const history = localStorage.getItem("assessmentHistory");
  let assessmentHistory: Assessment[] = history ? JSON.parse(history) : [];
  
  const newAssessment: Assessment = {
    date: new Date().toISOString(),
    data: assessmentData,
    recommendations: recommendations.map(r => r.id),
    complianceScore: 0 // Initial score will be updated as user tracks supplement intake
  };
  
  assessmentHistory.push(newAssessment);
  localStorage.setItem("assessmentHistory", JSON.stringify(assessmentHistory));
};

// Save user deficiencies based on assessment results
const saveUserDeficiencies = (assessmentData: AssessmentData, recommendations: Supplement[]) => {
  let deficiencies: string[] = [];
  let strengthAreas: string[] = [];
  
  // Extract deficiencies from assessment data
  if (assessmentData.deficiencies && assessmentData.deficiencies.length > 0) {
    deficiencies = [...assessmentData.deficiencies];
  }
  
  // Infer deficiencies from concerns
  if (assessmentData.concerns) {
    if (assessmentData.concerns.includes("Low Energy")) {
      if (!deficiencies.includes("Vitamin B12")) deficiencies.push("Vitamin B12");
      if (!deficiencies.includes("Iron")) deficiencies.push("Iron");
    }
    
    if (assessmentData.concerns.includes("Poor Sleep")) {
      if (!deficiencies.includes("Magnesium")) deficiencies.push("Magnesium");
    }
    
    if (assessmentData.concerns.includes("Joint Pain")) {
      if (!deficiencies.includes("Omega-3")) deficiencies.push("Omega-3");
    }
    
    if (assessmentData.concerns.includes("Brain Fog")) {
      if (!deficiencies.includes("Omega-3")) deficiencies.push("Omega-3");
    }
  }
  
  // Infer strength areas from goals
  if (assessmentData.goals) {
    assessmentData.goals.forEach(goal => {
      if (!strengthAreas.includes(goal)) strengthAreas.push(goal);
    });
  }
  
  // Save to local storage for avatar display
  localStorage.setItem("userDeficiencies", JSON.stringify(deficiencies));
  localStorage.setItem("userStrengthAreas", JSON.stringify(strengthAreas));
  
  // Create or update user profile
  updateUserProfile({
    deficiencies,
    strengthAreas
  });
};

// Update the user's profile with new information
export const updateUserProfile = (profileData: Partial<UserProfile>) => {
  const profileStr = localStorage.getItem("userProfile");
  const profile: UserProfile = profileStr 
    ? JSON.parse(profileStr) 
    : { 
        userId: "user-" + Math.random().toString(36).substr(2, 9),
        joinedDate: new Date().toISOString()
      };
  
  // Update profile with new data
  const updatedProfile = {
    ...profile,
    ...profileData
  };
  
  localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
  return updatedProfile;
};

// Get the user profile
export const getUserProfile = (): UserProfile | null => {
  const profileStr = localStorage.getItem("userProfile");
  return profileStr ? JSON.parse(profileStr) : null;
};

// Get assessment history
export const getAssessmentHistory = (): Assessment[] => {
  const history = localStorage.getItem("assessmentHistory");
  return history ? JSON.parse(history) : [];
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

// Get supplements by IDs
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
  
  // Update compliance score in latest assessment
  updateComplianceScore();
};

// Update compliance score in user profile
const updateComplianceScore = () => {
  const score = calculateWeeklyAssessmentScore();
  
  // Update in user profile
  updateUserProfile({
    complianceScore: score
  });
  
  // Update in latest assessment
  const history = getAssessmentHistory();
  if (history.length > 0) {
    const latestAssessment = history[history.length - 1];
    latestAssessment.complianceScore = score;
    localStorage.setItem("assessmentHistory", JSON.stringify(history));
  }
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

// Get user's deficiencies
export const getUserDeficiencies = (): string[] => {
  const deficiencies = localStorage.getItem("userDeficiencies");
  return deficiencies ? JSON.parse(deficiencies) : [];
};

// Get user's strength areas
export const getUserStrengthAreas = (): string[] => {
  const strengths = localStorage.getItem("userStrengthAreas");
  return strengths ? JSON.parse(strengths) : [];
};
