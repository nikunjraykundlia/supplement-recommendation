
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  type?: "icon" | "full";
  className?: string;
}

const Logo = ({ size = "md", type = "full", className }: LogoProps) => {
  const sizeClasses = {
    sm: type === "icon" ? "w-8 h-8" : "h-8",
    md: type === "icon" ? "w-10 h-10" : "h-10",
    lg: type === "icon" ? "w-14 h-14" : "h-14",
    xl: type === "icon" ? "w-20 h-20" : "h-20",
  };

  if (type === "icon") {
    return (
      <div className={cn("relative flex-shrink-0", sizeClasses[size], className)}>
        <img 
          src="/lovable-uploads/64eca7a3-abcd-4a73-90d5-176856b66059.png" 
          alt="Supplement Alchemist Logo" 
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn("relative flex-shrink-0", sizeClasses[size])}>
        <img 
          src="/lovable-uploads/64eca7a3-abcd-4a73-90d5-176856b66059.png" 
          alt="Supplement Alchemist Logo" 
          className="h-full w-auto"
        />
      </div>
      <span className={cn(
        "ml-3 font-display font-semibold", 
        size === "sm" ? "text-lg" : 
        size === "md" ? "text-xl" : 
        size === "lg" ? "text-2xl" : "text-3xl"
      )}>
        Supplement Alchemist
      </span>
    </div>
  );
};

export default Logo;
