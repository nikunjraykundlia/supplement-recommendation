
import { Check, Pill, Calendar, Heart, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: string;
}

const FeatureCard = ({ title, description, icon, delay }: FeatureCardProps) => (
  <div className={cn(
    "flex flex-col p-6 sm:p-8 rounded-2xl border border-border",
    "bg-card hover:shadow-lg transition-all-300",
    `animate-slide-up ${delay}`
  )}>
    <div className="rounded-full bg-accent p-3 w-fit mb-5">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-foreground/80">{description}</p>
  </div>
);

const FeatureSection = () => {
  const features = [
    {
      title: "Personalized Recommendations",
      description: "Receive supplement suggestions tailored to your unique health profile and wellness goals.",
      icon: <Pill className="h-6 w-6 text-accent-foreground" />,
      delay: "animation-delay-100"
    },
    {
      title: "Smart Tracking",
      description: "Log your supplement intake with ease and monitor your consistency over time.",
      icon: <Check className="h-6 w-6 text-accent-foreground" />,
      delay: "animation-delay-200"
    },
    {
      title: "Progress Monitoring",
      description: "Visualize your wellness journey with intuitive charts and meaningful metrics.",
      icon: <LineChart className="h-6 w-6 text-accent-foreground" />,
      delay: "animation-delay-300"
    },
    {
      title: "Timely Reminders",
      description: "Never miss a dose with customizable notifications tailored to your schedule.",
      icon: <Calendar className="h-6 w-6 text-accent-foreground" />,
      delay: "animation-delay-400"
    }
  ];

  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
            Designed for Your Wellness Journey
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-foreground/80 animate-slide-up animation-delay-100">
            Our platform combines scientific research with your personal health data to create a supplement plan that's uniquely yours.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 p-4 rounded-full bg-card border border-border animate-slide-up animation-delay-500">
            <Heart className="h-5 w-5 text-destructive" />
            <span className="text-sm font-medium">Trusted by health professionals and wellness enthusiasts</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
