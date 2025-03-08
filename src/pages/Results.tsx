
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight, BookOpen, BookmarkCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import SupplementCard from "@/components/SupplementCard";
import AiExplanation from "@/components/AiExplanation";
import { getRecommendedSupplementsForUser, saveUserSupplements } from "@/lib/ai-recommender";
import { Supplement } from "@/lib/supplements";
import { cn } from "@/lib/utils";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);
  const [addedSupplements, setAddedSupplements] = useState<string[]>([]);
  const assessmentData = location.state?.assessmentData;
  
  useEffect(() => {
    // Check if assessment data exists
    if (!assessmentData) {
      navigate("/assessment");
      return;
    }
    
    // Fetch personalized recommendations
    const fetchRecommendations = async () => {
      try {
        // Artificial delay to simulate AI processing
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const recommendedSupplements = getRecommendedSupplementsForUser(assessmentData);
        setSupplements(recommendedSupplements);
        
        // Automatically add all recommended supplements to the user's plan
        const supplementIds = recommendedSupplements.map(s => s.id);
        setAddedSupplements(supplementIds);
        saveUserSupplements(supplementIds);
        
        // Show a success message to inform the user
        toast.success("All recommended supplements have been added to your plan!");
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        toast.error("Failed to generate recommendations. Please try again.");
        setLoading(false);
      }
    };
    
    fetchRecommendations();
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [assessmentData, navigate]);

  const handleAddSupplement = (id: string) => {
    setAddedSupplements(prev => {
      const updated = [...prev, id];
      saveUserSupplements(updated);
      return updated;
    });
  };
  
  const handleRemoveSupplement = (id: string) => {
    setAddedSupplements(prev => {
      const updated = prev.filter(item => item !== id);
      saveUserSupplements(updated);
      return updated;
    });
  };

  const handleViewTracker = () => {
    navigate("/track");
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent text-accent-foreground mb-6 animate-fade-in">
              <span className="text-sm font-medium">Your personalized plan is ready</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in animation-delay-100">
              Your AI-Recommended Supplements
            </h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto animate-fade-in animation-delay-200">
              Based on your detailed health assessment, we've created a personalized supplement plan to address your specific needs.
              <span className="block mt-2 font-medium text-primary">All supplements have been automatically added to your plan!</span>
            </p>
            
            <div className="mt-6 flex justify-center space-x-4">
              <button 
                onClick={toggleExplanation}
                className="flex items-center gap-2 py-2 px-4 rounded-lg border border-border hover:bg-muted transition-all-200"
              >
                <BookOpen className="w-4 h-4" />
                <span>{showExplanation ? "Hide" : "View"} Scientific Explanation</span>
              </button>
              
              <button 
                onClick={handleViewTracker}
                className="flex items-center gap-2 py-2 px-4 rounded-lg border border-primary text-primary hover:bg-primary/5 transition-all-200"
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>Go to Supplement Tracker</span>
              </button>
            </div>
          </div>
          
          {showExplanation && (
            <div className="max-w-3xl mx-auto mb-12 animate-fade-in">
              <AiExplanation assessmentData={assessmentData} />
            </div>
          )}
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[500px] bg-muted rounded-xl"></div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {supplements.map((supplement, index) => (
                  <div key={supplement.id} className={`animate-blur-in animation-delay-${index * 100}`}>
                    <SupplementCard
                      supplement={supplement}
                      isAdded={addedSupplements.includes(supplement.id)}
                      onAdd={handleAddSupplement}
                      onRemove={handleRemoveSupplement}
                      alreadyAdded={true}
                    />
                  </div>
                ))}
              </div>
              
              <div className="text-center animate-slide-up animation-delay-500">
                <button
                  onClick={handleViewTracker}
                  className={cn(
                    "inline-flex items-center justify-center px-8 py-3 rounded-full",
                    "bg-primary text-primary-foreground font-medium",
                    "transition-all-200 hover:scale-105 hover:shadow-lg"
                  )}
                >
                  Track Your Supplements
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Results;
