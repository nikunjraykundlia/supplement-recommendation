
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ClipboardList, Beaker } from "lucide-react";
import Navbar from "@/components/Navbar";
import SupplementCard from "@/components/SupplementCard";
import SupplementDetail from "@/components/SupplementDetail";
import { getRecommendedSupplements, Supplement } from "@/lib/supplements";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { getUserSupplements } from "@/lib/ai-recommender";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSupplement, setSelectedSupplement] = useState<Supplement | null>(null);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);
  
  useEffect(() => {
    // Check if the user has completed the assessment
    const checkAssessment = () => {
      const lastAssessmentDate = localStorage.getItem("lastAssessmentDate");
      const userSupplementIds = getUserSupplements();
      
      if (lastAssessmentDate && userSupplementIds.length > 0) {
        setHasCompletedAssessment(true);
        
        // Only fetch supplements if assessment is completed
        fetchSupplements();
      } else {
        setHasCompletedAssessment(false);
        setLoading(false);
      }
    };
    
    // Fetch only the recommended supplements for the user
    const fetchSupplements = async () => {
      try {
        // Artificial delay to simulate network request
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Get user's supplement IDs from local storage
        const userSupplementIds = getUserSupplements();
        
        // Get all recommended supplements
        const allSupplements = getRecommendedSupplements();
        
        // Filter to only show the user's recommended supplements
        const userRecommendedSupplements = allSupplements.filter(supp => 
          userSupplementIds.includes(supp.id)
        );
        
        setSupplements(userRecommendedSupplements);
        
        // Set the first supplement as selected by default if any exist
        if (userRecommendedSupplements.length > 0) {
          setSelectedSupplement(userRecommendedSupplements[0]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching supplements:", error);
        setLoading(false);
      }
    };
    
    checkAssessment();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  const [addedSupplements, setAddedSupplements] = useState<string[]>([]);
  
  // Load initially added supplements
  useEffect(() => {
    const userSupplementIds = getUserSupplements();
    setAddedSupplements(userSupplementIds);
  }, []);
  
  const handleAddSupplement = (id: string) => {
    setAddedSupplements(prev => [...prev, id]);
  };
  
  const handleRemoveSupplement = (id: string) => {
    setAddedSupplements(prev => prev.filter(item => item !== id));
  };

  const handleSelectSupplement = (supplement: Supplement) => {
    setSelectedSupplement(supplement);
  };

  const handleTakeAssessment = () => {
    navigate("/assessment");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-6 animate-fade-in">
              <Beaker className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Supplement Alchemist</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in animation-delay-100">
              {hasCompletedAssessment 
                ? "Your Recommended Supplements" 
                : "Complete the Assessment to Get Started"}
            </h1>
            
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto animate-fade-in animation-delay-200">
              {hasCompletedAssessment 
                ? "Based on your assessment, we've curated these recommendations to help you achieve your wellness goals."
                : "Take our comprehensive health assessment to receive personalized supplement recommendations tailored to your unique needs."}
            </p>
            
            {user && hasCompletedAssessment && (
              <p className="mt-2 text-primary font-medium animate-fade-in animation-delay-300">
                Welcome, {user.user_metadata.full_name || user.user_metadata.username}
              </p>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
              <div className="col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-[400px] bg-muted rounded-xl"></div>
                  ))}
                </div>
              </div>
              <div className="h-[400px] bg-muted rounded-xl"></div>
            </div>
          ) : !hasCompletedAssessment ? (
            <div className="max-w-2xl mx-auto rounded-xl border border-border bg-card p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <ClipboardList className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              
              <h2 className="text-2xl font-bold mb-4">No Assessment Results Found</h2>
              <p className="text-muted-foreground mb-8">
                To get personalized supplement recommendations, you need to complete our health assessment first. 
                The assessment takes just a few minutes and helps us understand your unique health profile.
              </p>
              
              <Button 
                onClick={handleTakeAssessment}
                className="bg-purple-600 hover:bg-purple-700 text-white"
                size="lg"
              >
                Take the Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {supplements.map((supplement, index) => (
                      <div 
                        key={supplement.id} 
                        className={`animate-blur-in animation-delay-${index * 100} cursor-pointer`}
                        onClick={() => handleSelectSupplement(supplement)}
                      >
                        <SupplementCard
                          supplement={supplement}
                          isAdded={addedSupplements.includes(supplement.id)}
                          onAdd={handleAddSupplement}
                          onRemove={handleRemoveSupplement}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="animate-slide-in-right animation-delay-400">
                  {selectedSupplement ? (
                    <SupplementDetail supplement={selectedSupplement} />
                  ) : (
                    <div className="h-full flex items-center justify-center p-8 bg-muted/50 rounded-xl border border-dashed">
                      <p className="text-muted-foreground text-center">
                        Select a supplement to view detailed research information
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center animate-slide-up animation-delay-600">
                <Link
                  to="/track"
                  className={cn(
                    "inline-flex items-center justify-center px-8 py-3 rounded-full",
                    "bg-purple-600 hover:bg-purple-700 text-white font-medium",
                    "transition-all-200 hover:scale-105 hover:shadow-lg"
                  )}
                >
                  Track Your Progress
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
