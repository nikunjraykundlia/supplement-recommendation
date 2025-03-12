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

// Calculate a composite assessment score based on all user data
export const calculateCompositeScore = (): number => {
  // Get all relevant user data
  const complianceScore = calculateWeeklyAssessmentScore();
  const assessmentHistory = getAssessmentHistory();
  
  // If no history exists, return just the compliance score or 0
  if (assessmentHistory.length === 0) {
    return complianceScore || 0;
  }
  
  // Calculate assessment progress component (20% weight)
  const progressComponent = (() => {
    if (assessmentHistory.length < 2) return 50; // Neutral score for single assessment
    
    const initialScore = assessmentHistory[0].complianceScore || 0;
    const latestScore = assessmentHistory[assessmentHistory.length - 1].complianceScore || 0;
    const progressDelta = latestScore - initialScore;
    
    // Scale progress from -100 to +100 range to 0-100 range
    return Math.min(Math.max((progressDelta + 100) / 2, 0), 100);
  })();
  
  // Calculate consistency component (30% weight)
  const consistencyComponent = (() => {
    // If less than 3 assessments, give benefit of doubt
    if (assessmentHistory.length < 3) return 70;
    
    // Get last 5 assessments or all if less than 5
    const recentAssessments = assessmentHistory.slice(-5);
    const scores = recentAssessments.map(a => a.complianceScore || 0);
    
    // Calculate standard deviation (lower is better - more consistent)
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const squaredDiffs = scores.map(score => Math.pow(score - mean, 2));
    const variance = squaredDiffs.reduce((a, b) => a + b, 0) / scores.length;
    const stdDev = Math.sqrt(variance);
    
    // Convert stdDev to a 0-100 score (0 stdDev = 100 score, 50+ stdDev = 0 score)
    return Math.max(0, 100 - (stdDev * 2));
  })();
  
  // Calculate recency component (20% weight)
  const recencyComponent = (() => {
    const lastAssessmentDate = new Date(assessmentHistory[assessmentHistory.length - 1].date);
    const now = new Date();
    const daysSinceLastAssessment = Math.floor((now.getTime() - lastAssessmentDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Score decreases the longer it's been since last assessment
    // 0 days = 100 score, 30+ days = 0 score
    return Math.max(0, 100 - (daysSinceLastAssessment * (100/30)));
  })();
  
  // Current compliance score component (30% weight)
  const currentScoreComponent = complianceScore || 0;
  
  // Calculate composite score with weights
  const compositeScore = (
    (progressComponent * 0.2) + 
    (consistencyComponent * 0.3) + 
    (recencyComponent * 0.2) + 
    (currentScoreComponent * 0.3)
  );
  
  // Return normalized score (0-100)
  return Math.round(Math.max(0, Math.min(100, compositeScore)));
};

// Advanced weighting factors for different assessment components
const WEIGHTING_FACTORS = {
  GOALS: 1.0,
  CONCERNS: 1.2,
  DEFICIENCIES: 1.5,
  LIFESTYLE: 0.8,
  AGE: 0.7,
  SLEEP: 0.9,
  STRESS: 0.9,
  ENERGY: 0.9,
  DIETARY: 0.7,
  MEDICAL_HISTORY: 1.0,
  SKIN: 0.8,
  COGNITIVE: 0.8,
  RESPIRATORY: 0.8
};

// Enhanced AI recommendation engine with multiple algorithms
export const getRecommendedSupplementsForUser = (assessmentData: AssessmentData): Supplement[] => {
  // Start with all supplements
  let recommendedSupplements: Supplement[] = [...supplements];
  
  // Use three different recommendation algorithms and combine their results
  const scoreBasedRecommendations = getScoreBasedRecommendations(assessmentData);
  const collaborativeRecommendations = getCollaborativeRecommendations(assessmentData);
  const ruleBasedRecommendations = getRuleBasedRecommendations(assessmentData);
  
  // Combine the recommendations using a weighted ensemble approach
  const finalRecommendations = combineRecommendations([
    { recommendations: scoreBasedRecommendations, weight: 0.5 },
    { recommendations: collaborativeRecommendations, weight: 0.3 },
    { recommendations: ruleBasedRecommendations, weight: 0.2 }
  ]);
  
  // Limit to 5 supplements for more personalized approach
  const result = finalRecommendations.slice(0, 5);
  
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
  
  console.log("Final recommendations:", result.map(r => r.name));
  
  return result;
};

// Algorithm 1: Score-based recommendations (Enhanced from original)
const getScoreBasedRecommendations = (assessmentData: AssessmentData): Supplement[] => {
  let scores: { [key: string]: number } = {};
  
  // Initialize scores
  supplements.forEach(supp => {
    scores[supp.id] = 0;
  });
  
  // Score supplements based on goals with improved weighting
  if (assessmentData.goals && assessmentData.goals.length > 0) {
    const goalWeight = WEIGHTING_FACTORS.GOALS;
    
    // Goal-based scoring
    if (assessmentData.goals.includes("Energy Boost")) {
      scores["vitamin-b-complex"] += 5 * goalWeight;
      scores["magnesium-glycinate"] += 3 * goalWeight;
      scores["coq10"] += 4 * goalWeight;
      scores["l-theanine"] += 2 * goalWeight;
      scores["iron"] += 4 * goalWeight;
      scores["creatine"] += 3 * goalWeight;
      scores["rhodiola"] += 4 * goalWeight; // Added
    }
    
    if (assessmentData.goals.includes("Immune Support")) {
      scores["vitamin-d3"] += 5 * goalWeight;
      scores["zinc"] += 4 * goalWeight;
      scores["vitamin-c"] += 5 * goalWeight; // Increased
      scores["selenium"] += 4 * goalWeight;
      scores["quercetin"] += 3 * goalWeight;
      scores["probiotics"] += 4 * goalWeight; // Added
    }
    
    if (assessmentData.goals.includes("Muscle Recovery")) {
      scores["magnesium-glycinate"] += 4 * goalWeight;
      scores["omega-3"] += 3 * goalWeight;
      scores["creatine"] += 5 * goalWeight;
      scores["glutamine"] += 5 * goalWeight; // Increased
      scores["vitamin-d3"] += 3 * goalWeight; // Added
      scores["zinc"] += 3 * goalWeight; // Added
    }
    
    if (assessmentData.goals.includes("Better Sleep")) {
      scores["magnesium-glycinate"] += 5 * goalWeight;
      scores["l-theanine"] += 4 * goalWeight;
      scores["ashwagandha"] += 4 * goalWeight;
      scores["melatonin"] += 5 * goalWeight;
      scores["5-htp"] += 3 * goalWeight;
      scores["ginger"] += 2 * goalWeight; // Added for digestive calm
    }
    
    if (assessmentData.goals.includes("Brain Function")) {
      scores["omega-3"] += 5 * goalWeight;
      scores["l-theanine"] += 4 * goalWeight;
      scores["vitamin-b-complex"] += 4 * goalWeight; // Increased
      scores["lions-mane"] += 5 * goalWeight;
      scores["creatine"] += 3 * goalWeight;
      scores["resveratrol"] += 3 * goalWeight; // Added
    }
    
    if (assessmentData.goals.includes("Stress Management")) {
      scores["ashwagandha"] += 5 * goalWeight;
      scores["l-theanine"] += 5 * goalWeight; // Increased
      scores["magnesium-glycinate"] += 4 * goalWeight; // Increased
      scores["rhodiola"] += 4 * goalWeight;
      scores["5-htp"] += 3 * goalWeight;
      scores["vitamin-b-complex"] += 3 * goalWeight; // Added
    }
    
    if (assessmentData.goals.includes("Metabolic Health")) {
      scores["berberine"] += 5 * goalWeight;
      scores["magnesium-glycinate"] += 3 * goalWeight;
      scores["zinc"] += 2 * goalWeight;
      scores["alpha-lipoic-acid"] += 4 * goalWeight;
      scores["chromium"] += 3 * goalWeight;
      scores["omega-3"] += 3 * goalWeight; // Added
    }
    
    if (assessmentData.goals.includes("Heart Health")) {
      scores["coq10"] += 5 * goalWeight;
      scores["omega-3"] += 5 * goalWeight;
      scores["vitamin-k2"] += 4 * goalWeight;
      scores["berberine"] += 3 * goalWeight;
      scores["quercetin"] += 3 * goalWeight;
      scores["magnesium-glycinate"] += 4 * goalWeight; // Added
      scores["resveratrol"] += 4 * goalWeight; // Added
    }
    
    if (assessmentData.goals.includes("Skin Health")) {
      scores["collagen-peptides"] += 5 * goalWeight;
      scores["vitamin-c"] += 4 * goalWeight;
      scores["biotin"] += 5 * goalWeight;
      scores["vitamin-e"] += 4 * goalWeight;
      scores["omega-3"] += 3 * goalWeight;
      scores["zinc"] += 3 * goalWeight; // Added
    }
    
    if (assessmentData.goals.includes("Longevity")) {
      scores["resveratrol"] += 5 * goalWeight;
      scores["coq10"] += 4 * goalWeight;
      scores["nac"] += 4 * goalWeight;
      scores["omega-3"] += 3 * goalWeight;
      scores["vitamin-d3"] += 3 * goalWeight;
      scores["vitamin-k2"] += 3 * goalWeight; // Added
      scores["berberine"] += 3 * goalWeight; // Added
    }
    
    if (assessmentData.goals.includes("Respiratory Health")) {
      scores["nac"] += 5 * goalWeight;
      scores["vitamin-c"] += 5 * goalWeight; // Increased
      scores["vitamin-d3"] += 4 * goalWeight;
      scores["quercetin"] += 5 * goalWeight; // Increased
      scores["omega-3"] += 3 * goalWeight;
      scores["zinc"] += 4 * goalWeight; // Added
    }
  }
  
  // Score supplements based on lifestyle with adjusted weighting
  if (assessmentData.lifestyle) {
    const lifestyleWeight = WEIGHTING_FACTORS.LIFESTYLE;
    
    if (assessmentData.lifestyle === "Very Active") {
      scores["magnesium-glycinate"] += 4 * lifestyleWeight;
      scores["omega-3"] += 3 * lifestyleWeight;
      scores["vitamin-b-complex"] += 3 * lifestyleWeight;
      scores["coq10"] += 3 * lifestyleWeight;
      scores["creatine"] += 5 * lifestyleWeight;
      scores["glutamine"] += 4 * lifestyleWeight;
      scores["vitamin-d3"] += 3 * lifestyleWeight; // Added
      scores["zinc"] += 3 * lifestyleWeight; // Added
    } else if (assessmentData.lifestyle === "Moderately Active") {
      scores["vitamin-d3"] += 3 * lifestyleWeight;
      scores["magnesium-glycinate"] += 3 * lifestyleWeight;
      scores["vitamin-b-complex"] += 3 * lifestyleWeight;
      scores["omega-3"] += 3 * lifestyleWeight;
      scores["zinc"] += 2 * lifestyleWeight;
    } else if (assessmentData.lifestyle === "Sedentary") {
      scores["vitamin-d3"] += 5 * lifestyleWeight; // Increased
      scores["omega-3"] += 3 * lifestyleWeight; // Increased
      scores["berberine"] += 3 * lifestyleWeight; // Increased
      scores["coq10"] += 3 * lifestyleWeight;
      scores["vitamin-b-complex"] += 3 * lifestyleWeight; // Added
      scores["magnesium-glycinate"] += 3 * lifestyleWeight; // Added
    }
  }
  
  // Score supplements based on concerns with improved weighting
  if (assessmentData.concerns && assessmentData.concerns.length > 0) {
    const concernWeight = WEIGHTING_FACTORS.CONCERNS;
    
    if (assessmentData.concerns.includes("Joint Pain")) {
      scores["omega-3"] += 5 * concernWeight;
      scores["turmeric"] += 5 * concernWeight;
      scores["vitamin-d3"] += 3 * concernWeight;
      scores["msm"] += 5 * concernWeight;
      scores["collagen-peptides"] += 5 * concernWeight; // Increased
      scores["magnesium-glycinate"] += 3 * concernWeight; // Added
    }
    
    if (assessmentData.concerns.includes("Digestive Issues")) {
      scores["probiotics"] += 5 * concernWeight;
      scores["berberine"] += 3 * concernWeight;
      scores["glutamine"] += 5 * concernWeight; // Increased
      scores["ginger"] += 4 * concernWeight;
      scores["zinc"] += 2 * concernWeight; // Added
      scores["magnesium-glycinate"] += 3 * concernWeight; // Added
    }
    
    if (assessmentData.concerns.includes("Low Energy")) {
      scores["vitamin-b-complex"] += 5 * concernWeight;
      scores["vitamin-d3"] += 4 * concernWeight; // Increased
      scores["coq10"] += 4 * concernWeight;
      scores["iron"] += 5 * concernWeight;
      scores["creatine"] += 3 * concernWeight;
      scores["rhodiola"] += 4 * concernWeight; // Added
      scores["magnesium-glycinate"] += 3 * concernWeight; // Added
    }
    
    if (assessmentData.concerns.includes("Poor Sleep")) {
      scores["magnesium-glycinate"] += 5 * concernWeight;
      scores["l-theanine"] += 4 * concernWeight;
      scores["ashwagandha"] += 4 * concernWeight;
      scores["melatonin"] += 5 * concernWeight;
      scores["5-htp"] += 3 * concernWeight;
      scores["zinc"] += 2 * concernWeight; // Added
      scores["vitamin-d3"] += 2 * concernWeight; // Added
    }
    
    if (assessmentData.concerns.includes("Brain Fog")) {
      scores["omega-3"] += 5 * concernWeight; // Increased
      scores["vitamin-b-complex"] += 4 * concernWeight;
      scores["l-theanine"] += 3 * concernWeight;
      scores["lions-mane"] += 5 * concernWeight;
      scores["rhodiola"] += 4 * concernWeight; // Increased
      scores["vitamin-d3"] += 3 * concernWeight; // Added
      scores["coq10"] += 3 * concernWeight; // Added
    }
    
    // ... other concerns with similar adjustments
    
    if (assessmentData.concerns.includes("Stress")) {
      scores["ashwagandha"] += 5 * concernWeight;
      scores["l-theanine"] += 5 * concernWeight; // Increased
      scores["magnesium-glycinate"] += 4 * concernWeight;
      scores["rhodiola"] += 4 * concernWeight;
      scores["5-htp"] += 3 * concernWeight;
      scores["vitamin-b-complex"] += 4 * concernWeight; // Added
    }
    
    if (assessmentData.concerns.includes("Blood Sugar Issues")) {
      scores["berberine"] += 5 * concernWeight;
      scores["magnesium-glycinate"] += 3 * concernWeight;
      scores["zinc"] += 2 * concernWeight;
      scores["alpha-lipoic-acid"] += 4 * concernWeight;
      scores["chromium"] += 4 * concernWeight; // Added
      scores["omega-3"] += 3 * concernWeight; // Added
      scores["vitamin-d3"] += 3 * concernWeight; // Added
    }
    
    if (assessmentData.concerns.includes("Heart Health Concerns")) {
      scores["coq10"] += 5 * concernWeight;
      scores["omega-3"] += 5 * concernWeight;
      scores["vitamin-k2"] += 4 * concernWeight;
      scores["quercetin"] += 3 * concernWeight;
      scores["magnesium-glycinate"] += 4 * concernWeight; // Added
      scores["berberine"] += 3 * concernWeight; // Added
      scores["resveratrol"] += 4 * concernWeight; // Added
    }
    
    if (assessmentData.concerns.includes("Anxiety")) {
      scores["ashwagandha"] += 5 * concernWeight;
      scores["l-theanine"] += 5 * concernWeight;
      scores["magnesium-glycinate"] += 5 * concernWeight; // Increased
      scores["5-htp"] += 4 * concernWeight;
      scores["rhodiola"] += 3 * concernWeight;
      scores["vitamin-b-complex"] += 3 * concernWeight; // Added
      scores["vitamin-d3"] += 3 * concernWeight; // Added
    }
    
    if (assessmentData.concerns.includes("Respiratory Issues")) {
      scores["nac"] += 5 * concernWeight;
      scores["vitamin-c"] += 5 * concernWeight; // Increased
      scores["vitamin-d3"] += 5 * concernWeight; // Increased
      scores["quercetin"] += 5 * concernWeight; // Increased
      scores["zinc"] += 4 * concernWeight; // Added
      scores["omega-3"] += 3 * concernWeight; // Added
    }
    
    if (assessmentData.concerns.includes("Aging Concerns")) {
      scores["resveratrol"] += 5 * concernWeight;
      scores["coq10"] += 4 * concernWeight;
      scores["omega-3"] += 3 * concernWeight;
      scores["vitamin-d3"] += 3 * concernWeight;
      scores["collagen-peptides"] += 4 * concernWeight;
      scores["vitamin-k2"] += 3 * concernWeight; // Added
      scores["nac"] += 3 * concernWeight; // Added
    }
  }
  
  // Score supplements based on deficiencies with high weighting
  if (assessmentData.deficiencies && assessmentData.deficiencies.length > 0) {
    const deficiencyWeight = WEIGHTING_FACTORS.DEFICIENCIES;
    
    assessmentData.deficiencies.forEach(deficiency => {
      switch(deficiency) {
        case "Vitamin D":
          scores["vitamin-d3"] += 5 * deficiencyWeight;
          break;
        case "Magnesium":
          scores["magnesium-glycinate"] += 5 * deficiencyWeight;
          break;
        case "Zinc":
          scores["zinc"] += 5 * deficiencyWeight;
          break;
        case "Vitamin B12":
          scores["vitamin-b-complex"] += 5 * deficiencyWeight;
          break;
        case "Omega-3":
          scores["omega-3"] += 5 * deficiencyWeight;
          break;
        case "Vitamin K":
          scores["vitamin-k2"] += 5 * deficiencyWeight;
          break;
        case "CoQ10":
          scores["coq10"] += 5 * deficiencyWeight;
          break;
        case "Iron":
          scores["iron"] += 5 * deficiencyWeight;
          break;
        case "Vitamin E":
          scores["vitamin-e"] += 5 * deficiencyWeight;
          break;
        case "Selenium":
          scores["selenium"] += 5 * deficiencyWeight;
          break;
        case "Antioxidants":
          scores["vitamin-c"] += 4 * deficiencyWeight;
          scores["vitamin-e"] += 4 * deficiencyWeight;
          scores["selenium"] += 4 * deficiencyWeight;
          scores["alpha-lipoic-acid"] += 4 * deficiencyWeight;
          scores["resveratrol"] += 4 * deficiencyWeight;
          break;
        case "Collagen":
          scores["collagen-peptides"] += 5 * deficiencyWeight;
          scores["vitamin-c"] += 3 * deficiencyWeight;
          break;
      }
    });
  }
  
  // Additional factors: Age
  if (assessmentData.age) {
    const ageWeight = WEIGHTING_FACTORS.AGE;
    const age = parseInt(assessmentData.age);
    
    if (age >= 50) {
      scores["vitamin-d3"] += 4 * ageWeight;
      scores["vitamin-b-complex"] += 3 * ageWeight;
      scores["coq10"] += 4 * ageWeight;
      scores["omega-3"] += 3 * ageWeight;
      scores["magnesium-glycinate"] += 3 * ageWeight;
      scores["vitamin-k2"] += 3 * ageWeight;
    } else if (age >= 30) {
      scores["vitamin-d3"] += 3 * ageWeight;
      scores["magnesium-glycinate"] += 3 * ageWeight;
      scores["vitamin-b-complex"] += 2 * ageWeight;
    } else {
      scores["vitamin-b-complex"] += 2 * ageWeight;
      scores["magnesium-glycinate"] += 2 * ageWeight;
      scores["zinc"] += 2 * ageWeight;
    }
  }
  
  // ... additional scoring factors for sleep quality, stress level, etc.
  
  // Sort supplements by score
  const sortedSupplements = [...supplements].sort((a, b) => {
    return (scores[b.id] || 0) - (scores[a.id] || 0);
  });
  
  // Only return supplements that have relevance
  return sortedSupplements.filter(supp => (scores[supp.id] || 0) > 0);
};

// Algorithm 2: Collaborative filtering-like approach
const getCollaborativeRecommendations = (assessmentData: AssessmentData): Supplement[] => {
  // Define "user profiles" that represent common health profiles
  const userProfiles = [
    {
      name: "Athletic Performance",
      supplements: ["creatine", "protein", "omega-3", "vitamin-d3", "magnesium-glycinate", "zinc"],
      match: (data: AssessmentData) => 
        data.lifestyle === "Very Active" && 
        (data.goals.includes("Muscle Recovery") || data.goals.includes("Energy Boost"))
    },
    {
      name: "Brain Health",
      supplements: ["omega-3", "lions-mane", "vitamin-b-complex", "l-theanine", "vitamin-d3"],
      match: (data: AssessmentData) => 
        (data.goals.includes("Brain Function") || data.concerns.includes("Brain Fog")) &&
        (data.cognitiveGoals?.includes("Memory Enhancement") || 
         data.cognitiveGoals?.includes("Focus Improvement"))
    },
    {
      name: "Sleep Optimization",
      supplements: ["magnesium-glycinate", "l-theanine", "melatonin", "ashwagandha", "5-htp"],
      match: (data: AssessmentData) => 
        data.goals.includes("Better Sleep") || 
        data.concerns.includes("Poor Sleep") ||
        data.sleepQuality === "Poor"
    },
    {
      name: "Stress Management",
      supplements: ["ashwagandha", "l-theanine", "rhodiola", "magnesium-glycinate", "vitamin-b-complex"],
      match: (data: AssessmentData) => 
        data.goals.includes("Stress Management") || 
        data.concerns.includes("Stress") ||
        data.concerns.includes("Anxiety") ||
        data.stressLevel === "High" || 
        data.stressLevel === "Very High"
    },
    {
      name: "Immune Support",
      supplements: ["vitamin-c", "zinc", "vitamin-d3", "quercetin", "probiotics"],
      match: (data: AssessmentData) => 
        data.goals.includes("Immune Support") || 
        data.respiratoryIssues?.includes("Frequent Colds") ||
        data.concerns.includes("Respiratory Issues")
    },
    {
      name: "Heart Health",
      supplements: ["coq10", "omega-3", "vitamin-k2", "berberine", "magnesium-glycinate"],
      match: (data: AssessmentData) => 
        data.goals.includes("Heart Health") || 
        data.concerns.includes("Heart Health Concerns")
    },
    {
      name: "Aging Well",
      supplements: ["resveratrol", "nac", "coq10", "vitamin-d3", "omega-3"],
      match: (data: AssessmentData) => 
        data.goals.includes("Longevity") || 
        data.concerns.includes("Aging Concerns") ||
        (parseInt(assessmentData.age) >= 50)
    },
    {
      name: "Metabolic Health",
      supplements: ["berberine", "alpha-lipoic-acid", "chromium", "magnesium-glycinate", "omega-3"],
      match: (data: AssessmentData) => 
        data.goals.includes("Metabolic Health") || 
        data.concerns.includes("Blood Sugar Issues")
    },
    {
      name: "Joint Support",
      supplements: ["omega-3", "turmeric", "collagen-peptides", "msm", "vitamin-d3"],
      match: (data: AssessmentData) => 
        data.concerns.includes("Joint Pain")
    },
    {
      name: "Skin Health",
      supplements: ["collagen-peptides", "vitamin-c", "biotin", "vitamin-e", "omega-3"],
      match: (data: AssessmentData) => 
        data.goals.includes("Skin Health") || 
        (data.skinConcerns && data.skinConcerns.length > 0)
    }
  ];
  
  // Find matching profiles and collect supplement recommendations
  const supplementScores: { [key: string]: number } = {};
  let totalMatchScore = 0;
  
  userProfiles.forEach(profile => {
    // Calculate how well this profile matches the user
    const isMatch = profile.match(assessmentData);
    
    if (isMatch) {
      totalMatchScore++;
      
      // Add supplements from this profile to the recommendations
      profile.supplements.forEach(suppId => {
        supplementScores[suppId] = (supplementScores[suppId] || 0) + 1;
      });
    }
  });
  
  // If no profiles matched, return empty array
  if (totalMatchScore === 0) {
    return [];
  }
  
  // Convert scores to supplements and sort
  const recommendedSupplements = supplements
    .filter(supp => supplementScores[supp.id])
    .sort((a, b) => (supplementScores[b.id] || 0) - (supplementScores[a.id] || 0));
  
  return recommendedSupplements;
};

// Algorithm 3: Rule-based expert system
const getRuleBasedRecommendations = (assessmentData: AssessmentData): Supplement[] => {
  // Essential supplements that almost everyone can benefit from
  const essential = ["vitamin-d3", "magnesium-glycinate", "omega-3"];
  
  // Condition-specific rules
  const rules: Array<{
    condition: (data: AssessmentData) => boolean,
    supplements: string[]
  }> = [
    // Age-based rules
    {
      condition: (data) => parseInt(data.age) >= 50,
      supplements: ["vitamin-b-complex", "coq10", "vitamin-k2"]
    },
    {
      condition: (data) => parseInt(data.age) >= 30 && parseInt(data.age) < 50,
      supplements: ["coq10", "vitamin-b-complex"]
    },
    
    // Lifestyle-based rules
    {
      condition: (data) => data.lifestyle === "Very Active",
      supplements: ["creatine", "zinc", "vitamin-b-complex"]
    },
    {
      condition: (data) => data.lifestyle === "Sedentary",
      supplements: ["vitamin-d3", "vitamin-b-complex"]
    },
    
    // Concern-based rules
    {
      condition: (data) => data.concerns.includes("Joint Pain"),
      supplements: ["turmeric", "collagen-peptides", "msm"]
    },
    {
      condition: (data) => data.concerns.includes("Digestive Issues"),
      supplements: ["probiotics", "glutamine", "ginger"]
    },
    {
      condition: (data) => data.concerns.includes("Low Energy"),
      supplements: ["vitamin-b-complex", "iron", "rhodiola"]
    },
    {
      condition: (data) => data.concerns.includes("Poor Sleep"),
      supplements: ["magnesium-glycinate", "melatonin", "l-theanine"]
    },
    {
      condition: (data) => data.concerns.includes("Brain Fog"),
      supplements: ["lions-mane", "omega-3", "vitamin-b-complex"]
    },
    {
      condition: (data) => data.concerns.includes("Stress") || data.concerns.includes("Anxiety"),
      supplements: ["ashwagandha", "l-theanine", "rhodiola"]
    },
    {
      condition: (data) => data.concerns.includes("Blood Sugar Issues"),
      supplements: ["berberine", "alpha-lipoic-acid", "chromium"]
    },
    {
      condition: (data) => data.concerns.includes("Heart Health Concerns"),
      supplements: ["coq10", "omega-3", "vitamin-k2"]
    },
    {
      condition: (data) => data.concerns.includes("Respiratory Issues"),
      supplements: ["nac", "vitamin-c", "quercetin"]
    },
    
    // Goal-based rules
    {
      condition: (data) => data.goals.includes("Energy Boost"),
      supplements: ["vitamin-b-complex", "coq10", "rhodiola"]
    },
    {
      condition: (data) => data.goals.includes("Immune Support"),
      supplements: ["vitamin-c", "zinc", "vitamin-d3"]
    },
    {
      condition: (data) => data.goals.includes("Muscle Recovery"),
      supplements: ["creatine", "glutamine", "magnesium-glycinate"]
    },
    {
      condition: (data) => data.goals.includes("Better Sleep"),
      supplements: ["magnesium-glycinate", "melatonin", "ashwagandha"]
    },
    {
      condition: (data) => data.goals.includes("Brain Function"),
      supplements: ["lions-mane", "omega-3", "l-theanine"]
    },
    {
      condition: (data) => data.goals.includes("Stress Management"),
      supplements: ["ashwagandha", "l-theanine", "rhodiola"]
    },
    {
      condition: (data) => data.goals.includes("Metabolic Health"),
      supplements: ["berberine", "alpha-lipoic-acid", "chromium"]
    },
    {
      condition: (data) => data.goals.includes("Heart Health"),
      supplements: ["coq10", "omega-3", "vitamin-k2"]
    },
    {
      condition: (data) => data.goals.includes("Skin Health"),
      supplements: ["collagen-peptides", "vitamin-c", "biotin"]
    },
    {
      condition: (data) => data.goals.includes("Longevity"),
      supplements: ["resveratrol", "nac", "coq10"]
    },
    
    // Special condition rules
    {
      condition: (data) => data.deficiencies?.includes("Vitamin D"),
      supplements: ["vitamin-d3"]
    },
    {
      condition: (data) => data.deficiencies?.includes("Magnesium"),
      supplements: ["magnesium-glycinate"]
    },
    {
      condition: (data) => data.deficiencies?.includes("Vitamin B12"),
      supplements: ["vitamin-b-complex"]
    },
    {
      condition: (data) => data.sleepQuality === "Poor" || data.sleepQuality === "Fair",
      supplements: ["magnesium-glycinate", "melatonin", "ashwagandha"]
    },
    {
      condition: (data) => data.stressLevel === "High" || data.stressLevel === "Very High",
      supplements: ["ashwagandha", "l-theanine", "rhodiola"]
    },
    {
      condition: (data) => data.energyLevel === "Low" || data.energyLevel === "Very Low",
      supplements: ["vitamin-b-complex", "coq10", "rhodiola"]
    }
  ];
  
  // Start with essential supplements
  const recommendedIds = new Set<string>(essential);
  
  // Apply all matching rules
  rules.forEach(rule => {
    if (rule.condition(assessmentData)) {
      rule.supplements.forEach(supp => recommendedIds.add(supp));
    }
  });
  
  // Convert to supplement objects
  return supplements.filter(supp => recommendedIds.has(supp.id));
};

// Combine multiple recommendation algorithms using an ensemble approach
const combineRecommendations = (
  algorithmResults: Array<{recommendations: Supplement[], weight: number}>
): Supplement[] => {
  const supplementScores: { [key: string]: number } = {};
  
  // Calculate weighted scores across all algorithms
  algorithmResults.forEach(result => {
    const { recommendations, weight } = result;
    recommendations.forEach((supp, index) => {
      // Higher position gets higher score (inverse ranking)
      const positionScore = recommendations.length - index;
      supplementScores[supp.id] = (supplementScores[supp.id] || 0) + (positionScore * weight);
    });
  });
  
  // Sort supplements by their combined scores
  return supplements
    .filter(supp => supplementScores[supp.id])
    .sort((a, b) => (supplementScores[b.id] || 0) - (supplementScores[a.id] || 0));
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
