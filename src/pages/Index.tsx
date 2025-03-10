
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Flask, Sparkles, Brain, Battery, Shield, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Index = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      title: "Cognitive Enhancement",
      description: "Formulations designed to improve focus, memory, and overall brain function."
    },
    {
      icon: <Battery className="w-8 h-8 text-green-500" />,
      title: "Energy Optimization",
      description: "Targeted supplements that enhance cellular energy production and vitality."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Immune Support",
      description: "Science-backed compounds that strengthen your body's natural defenses."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-amber-500" />,
      title: "Personalized Plans",
      description: "Custom supplement recommendations based on your unique health profile."
    }
  ];

  const testimonials = [
    {
      quote: "The personalized approach to supplements changed everything for me. I've never felt better.",
      author: "Sarah K., 34",
      rating: 5
    },
    {
      quote: "As a fitness professional, I'm extremely careful about what I put in my body. Supplement Alchemist is the gold standard.",
      author: "Michael T., 29",
      rating: 5
    },
    {
      quote: "I appreciate the science-based approach and real research behind each recommendation.",
      author: "Dr. Jennifer L., 42",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-24 sm:pt-48 sm:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center justify-center mb-8 lg:justify-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-600 bg-opacity-10">
                  <Flask className="w-6 h-6 text-purple-600" />
                </div>
                <span className="ml-3 text-lg font-medium text-purple-600">Science-Backed Solutions</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                Transform Your Health with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                  Precision Supplements
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0">
                Discover your personalized supplement regimen based on cutting-edge science and your unique health profile.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link to="/assessment">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
                    Take the Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Create Account
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-2 text-sm">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-${200 + (i * 100)}`}></div>
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  Join <span className="font-medium">1,200+</span> users optimizing their health
                </span>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl lg:max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-indigo-600/30 mix-blend-overlay"></div>
                <img 
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Supplement bottles" 
                  className="w-full"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-xl opacity-70"></div>
              <div className="absolute -bottom-8 right-10 w-40 h-40 bg-indigo-200 dark:bg-indigo-900/30 rounded-full blur-xl opacity-70"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              The Supplement Alchemist Difference
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Our approach combines scientific research with personalized assessment to create the perfect supplement regimen for your body.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={cn(
                  "p-8 rounded-xl border border-gray-100 dark:border-gray-800",
                  "bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300",
                  "flex flex-col items-center text-center"
                )}
              >
                <div className="mb-5 p-3 rounded-2xl bg-gray-50 dark:bg-gray-700">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              How Supplement Alchemist Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Our scientifically proven process takes the guesswork out of supplement selection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Complete Assessment",
                description: "Answer questions about your health, goals, and lifestyle."
              },
              {
                step: "02",
                title: "Receive Analysis",
                description: "Our algorithm analyzes your responses using peer-reviewed research."
              },
              {
                step: "03",
                title: "Follow Your Plan",
                description: "Get your personalized supplement plan and track your progress."
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="p-6 rounded-xl bg-white dark:bg-gray-700 shadow-sm h-full">
                  <div className="inline-block text-sm font-semibold text-purple-600 dark:text-purple-400 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="h-5 w-5 text-purple-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-14">
            <Link to="/assessment">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                Start Your Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6">
              <Award className="h-6 w-6 text-amber-500 mr-2" />
              <span className="text-lg font-medium text-amber-500">Trusted by Thousands</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What Our Users Are Saying
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-8 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-amber-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-700 to-indigo-700 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl mb-10 text-purple-100">
              Join thousands of users who have discovered their optimal supplement regimen
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/assessment">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 w-full sm:w-auto">
                  Take Free Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-purple-600 w-full sm:w-auto">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
              <div className="text-white font-bold text-lg">SA</div>
            </div>
            <span className="font-display font-medium text-gray-900 dark:text-white text-lg">Supplement Alchemist</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Supplement Alchemist. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
