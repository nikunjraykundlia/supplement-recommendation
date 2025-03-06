
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] pt-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent/30 rounded-bl-[100px] -z-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/10 rounded-tr-[100px] -z-10 blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 h-full">
        <div className="flex flex-col items-center justify-center text-center h-full pt-12 pb-24">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent text-accent-foreground mb-8 animate-slide-down animation-delay-100">
            <span className="text-sm font-medium">Personalized supplement plans for your wellness journey</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold max-w-6xl mx-auto leading-tight mb-6 animate-slide-down animation-delay-200 text-balance">
            Build Your Perfect <span className="text-primary">Supplement Plan</span> With Confidence
          </h1>
          
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-12 text-foreground/80 animate-slide-down animation-delay-300 text-balance">
            Receive personalized recommendations based on your unique health profile, track your progress, and optimize your wellness routine.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-slide-down animation-delay-400">
            <Link
              to="/assessment"
              className={cn(
                "inline-flex items-center justify-center px-8 py-3 rounded-full",
                "bg-primary text-primary-foreground font-medium",
                "transition-all-200 hover:scale-105 hover:shadow-lg"
              )}
            >
              Start Your Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <Link
              to="/dashboard"
              className={cn(
                "inline-flex items-center justify-center px-8 py-3 rounded-full",
                "bg-background border border-border text-foreground font-medium",
                "transition-all-200 hover:bg-muted"
              )}
            >
              View Demo Dashboard
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scrolling indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-pulse-subtle">
        <div className="flex flex-col items-center">
          <span className="text-sm text-foreground/60 mb-2">Scroll to learn more</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-foreground/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
