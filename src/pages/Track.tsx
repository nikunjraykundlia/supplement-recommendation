
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProgressTracker from "@/components/ProgressTracker";
import SupplementCard from "@/components/SupplementCard";
import { getRecommendedSupplements } from "@/lib/supplements";

const Track = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  const supplements = getRecommendedSupplements();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Track Your Progress
            </h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto animate-fade-in animation-delay-100">
              Monitor your supplement intake and stay on track with your wellness goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 animate-slide-in-left animation-delay-200">
              <ProgressTracker />
            </div>
            
            <div className="animate-slide-in-right animation-delay-300">
              <div className="bg-card p-6 rounded-xl border border-border h-full">
                <h3 className="text-xl font-bold mb-6">Your Current Plan</h3>
                
                <div className="space-y-4">
                  {supplements.map((supplement) => (
                    <div key={supplement.id} className="flex items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all-200">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4 bg-muted">
                        <img
                          src={supplement.imageUrl}
                          alt={supplement.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{supplement.name}</h4>
                        <p className="text-xs text-foreground/70">{supplement.timing}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-border">
                  <button className="w-full text-center py-2.5 text-primary hover:underline">
                    Edit My Supplement Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Track;
