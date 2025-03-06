
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepProps {
  title: string;
  description: string;
  children: React.ReactNode;
  isActive: boolean;
  isCompleted: boolean;
  stepNumber: number;
}

const Step = ({ title, description, children, isActive, isCompleted, stepNumber }: StepProps) => (
  <div className={cn(
    "transition-all-300",
    isActive ? "opacity-100" : "opacity-50"
  )}>
    <div className="flex items-center mb-4">
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium mr-4 transition-all-200",
        isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
      )}>
        {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
      </div>
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-foreground/70">{description}</p>
      </div>
    </div>
    {isActive && (
      <div className="pl-14 animate-fade-in">
        {children}
      </div>
    )}
  </div>
);

interface OptionButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const OptionButton = ({ selected, onClick, children }: OptionButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "w-full text-left px-6 py-4 rounded-xl border transition-all-200",
      "flex items-center justify-between",
      selected 
        ? "border-primary bg-primary/5 text-primary font-medium" 
        : "border-border hover:border-primary/30 hover:bg-muted"
    )}
  >
    <span>{children}</span>
    {selected && <Check className="w-5 h-5 text-primary" />}
  </button>
);

const AssessmentForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    goals: [] as string[],
    lifestyle: "",
    concerns: [] as string[],
  });
  
  const goals = ["Energy Boost", "Immune Support", "Muscle Recovery", "Better Sleep", "Brain Function", "Stress Management"];
  const lifestyles = ["Very Active", "Moderately Active", "Lightly Active", "Sedentary"];
  const concerns = ["Joint Pain", "Digestive Issues", "Low Energy", "Poor Sleep", "Brain Fog", "Stress", "Vitamin Deficiency"];
  
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Submit and navigate to dashboard
      navigate("/dashboard");
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const toggleGoal = (goal: string) => {
    setFormData(prev => {
      const newGoals = prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal];
      return { ...prev, goals: newGoals };
    });
  };
  
  const toggleConcern = (concern: string) => {
    setFormData(prev => {
      const newConcerns = prev.concerns.includes(concern)
        ? prev.concerns.filter(c => c !== concern)
        : [...prev.concerns, concern];
      return { ...prev, concerns: newConcerns };
    });
  };
  
  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return formData.age !== "" && formData.goals.length > 0;
      case 2:
        return formData.lifestyle !== "";
      case 3:
        return formData.concerns.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-12">
        <Step
          title="About You"
          description="Tell us about yourself and your goals"
          isActive={currentStep === 1}
          isCompleted={currentStep > 1}
          stepNumber={1}
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="age" className="block text-sm font-medium mb-2">
                What is your age?
              </label>
              <input
                type="number"
                id="age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all-200"
                placeholder="Enter your age"
                min="18"
                max="120"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                What are your wellness goals? (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {goals.map((goal) => (
                  <OptionButton
                    key={goal}
                    selected={formData.goals.includes(goal)}
                    onClick={() => toggleGoal(goal)}
                  >
                    {goal}
                  </OptionButton>
                ))}
              </div>
            </div>
          </div>
        </Step>
        
        <Step
          title="Lifestyle"
          description="Tell us about your daily habits"
          isActive={currentStep === 2}
          isCompleted={currentStep > 2}
          stepNumber={2}
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                How would you describe your activity level?
              </label>
              <div className="space-y-3">
                {lifestyles.map((lifestyle) => (
                  <OptionButton
                    key={lifestyle}
                    selected={formData.lifestyle === lifestyle}
                    onClick={() => setFormData({ ...formData, lifestyle })}
                  >
                    {lifestyle}
                  </OptionButton>
                ))}
              </div>
            </div>
          </div>
        </Step>
        
        <Step
          title="Health Concerns"
          description="Let us know about any specific health issues"
          isActive={currentStep === 3}
          isCompleted={currentStep > 3}
          stepNumber={3}
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Do you have any specific health concerns? (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {concerns.map((concern) => (
                  <OptionButton
                    key={concern}
                    selected={formData.concerns.includes(concern)}
                    onClick={() => toggleConcern(concern)}
                  >
                    {concern}
                  </OptionButton>
                ))}
              </div>
            </div>
          </div>
        </Step>
      </div>
      
      <div className="mt-12 flex justify-between">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handlePreviousStep}
            className="inline-flex items-center px-6 py-3 border border-border rounded-full hover:bg-muted transition-all-200"
          >
            <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
            Back
          </button>
        ) : (
          <div></div>
        )}
        
        <button
          type="button"
          onClick={handleNextStep}
          disabled={!isStepComplete(currentStep)}
          className={cn(
            "inline-flex items-center px-8 py-3 rounded-full font-medium transition-all-200",
            isStepComplete(currentStep)
              ? "bg-primary text-primary-foreground hover:shadow-md"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          {currentStep < 3 ? (
            <>
              Next Step
              <ChevronRight className="w-5 h-5 ml-1" />
            </>
          ) : (
            <>
              Complete Assessment
              <ArrowRight className="w-5 h-5 ml-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AssessmentForm;
