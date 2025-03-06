
import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import Navbar from "@/components/Navbar";

const Index = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureSection />
      </main>
      
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">W</span>
            </div>
            <span className="font-display font-medium">Wellness Architect</span>
          </div>
          <p className="text-sm text-foreground/60">
            &copy; {new Date().getFullYear()} Wellness Architect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
