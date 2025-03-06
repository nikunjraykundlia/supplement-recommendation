
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import AssessmentForm from "@/components/AssessmentForm";

const Assessment = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Your Wellness Assessment
            </h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto animate-fade-in animation-delay-100">
              Let's create a personalized supplement plan based on your unique needs and goals.
            </p>
          </div>
          
          <div className="animate-slide-up animation-delay-200">
            <AssessmentForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Assessment;
