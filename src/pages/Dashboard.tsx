
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import SupplementCard from "@/components/SupplementCard";
import SupplementDetail from "@/components/SupplementDetail";
import WeeklyCompliance from "@/components/WeeklyCompliance";
import { getRecommendedSupplements, Supplement } from "@/lib/supplements";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSupplement, setSelectedSupplement] = useState<Supplement | null>(null);
  
  useEffect(() => {
    // Simulate API call
    const fetchSupplements = async () => {
      // Artificial delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      const recommendedSupplements = getRecommendedSupplements();
      setSupplements(recommendedSupplements);
      
      // Set the first supplement as selected by default
      if (recommendedSupplements.length > 0) {
        setSelectedSupplement(recommendedSupplements[0]);
      }
      
      setLoading(false);
    };
    
    fetchSupplements();
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  const [addedSupplements, setAddedSupplements] = useState<string[]>([]);
  
  const handleAddSupplement = (id: string) => {
    setAddedSupplements(prev => [...prev, id]);
  };
  
  const handleRemoveSupplement = (id: string) => {
    setAddedSupplements(prev => prev.filter(item => item !== id));
  };

  const handleSelectSupplement = (supplement: Supplement) => {
    setSelectedSupplement(supplement);
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
              Your Recommended Supplements
            </h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto animate-fade-in animation-delay-200">
              Based on your assessment, we've curated these recommendations to help you achieve your wellness goals.
            </p>
            
            {user && (
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
              
              <div className="mb-12 animate-slide-up animation-delay-500">
                <WeeklyCompliance />
              </div>
              
              <div className="text-center animate-slide-up animation-delay-600">
                <Link
                  to="/track"
                  className={cn(
                    "inline-flex items-center justify-center px-8 py-3 rounded-full",
                    "bg-primary text-primary-foreground font-medium",
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
