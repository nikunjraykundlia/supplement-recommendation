
import { useState, useEffect } from "react";
import { Plus, Check, Info } from "lucide-react";
import { Supplement } from "@/lib/supplements";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import getAIGeneratedSupplementImage from "@/lib/aiImageGenerator";

interface SupplementCardProps {
  supplement: Supplement;
  isAdded?: boolean;
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
  alreadyAdded?: boolean;
}

const SupplementCard = ({ 
  supplement, 
  isAdded = false, 
  onAdd, 
  onRemove,
  alreadyAdded = false
}: SupplementCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(supplement.imageUrl);
  
  // Ensure we have an image that will load
  useEffect(() => {
    // Make sure we have a valid image URL
    if (!currentImageUrl || currentImageUrl === '') {
      const backupImage = getAIGeneratedSupplementImage(supplement.name, supplement.category);
      setCurrentImageUrl(backupImage);
    }
  }, [supplement, currentImageUrl]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleAddRemove = () => {
    if (isAdded && onRemove) {
      onRemove(supplement.id);
      toast.success(`Removed ${supplement.name} from your plan`);
    } else if (onAdd) {
      onAdd(supplement.id);
      toast.success(`Added ${supplement.name} to your plan`);
    }
  };

  const handleImageError = () => {
    console.log(`Image failed to load for ${supplement.name}, using AI-generated fallback`);
    // If the primary image fails, use our guaranteed AI image generator
    const fallbackImage = getAIGeneratedSupplementImage(supplement.name, supplement.category);
    setCurrentImageUrl(fallbackImage);
  };

  return (
    <div className={cn(
      "rounded-xl overflow-hidden transition-all duration-300",
      "border border-border bg-card hover:shadow-lg",
      showDetails ? "ring-2 ring-purple-600/30" : ""
    )}>
      <div className="relative h-48 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-slate-100 dark:from-purple-950/20 dark:to-slate-900/60 animate-pulse flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin"></div>
              <span className="text-muted-foreground text-sm mt-2">Loading image...</span>
            </div>
          </div>
        )}
        <img
          src={currentImageUrl}
          alt={supplement.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-300",
            imageLoaded ? "opacity-100" : "opacity-0",
            "shadow-inner"
          )}
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
        />
        
        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        
        <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full shadow-sm">
          {supplement.category}
        </div>
        
        <div className="absolute bottom-3 left-3 text-white">
          <h3 className="text-xl font-bold drop-shadow-md">{supplement.name}</h3>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start">
          <p className="text-sm text-foreground/70 mt-2">
            {supplement.description}
          </p>
          <button
            onClick={toggleDetails}
            className={cn(
              "p-2 rounded-full transition-all duration-200 ml-2 flex-shrink-0",
              showDetails 
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" 
                : "hover:bg-muted"
            )}
            aria-label="Toggle details"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
        
        <div className={cn(
          "mt-4 space-y-4 overflow-hidden transition-all duration-300",
          showDetails ? "max-h-96" : "max-h-0"
        )}>
          <div>
            <h4 className="font-medium mb-2">Benefits</h4>
            <ul className="space-y-1">
              {supplement.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-1">Recommended Dosage</h4>
              <p className="text-sm">{supplement.dosage}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Timing</h4>
              <p className="text-sm">{supplement.timing}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={handleAddRemove}
            disabled={alreadyAdded}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full transition-all duration-200",
              isAdded 
                ? alreadyAdded 
                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 cursor-default" 
                  : "bg-accent text-foreground hover:bg-accent/80"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            )}
          >
            {isAdded ? (
              <>
                <Check className="w-5 h-5" />
                <span>{alreadyAdded ? "Automatically Added" : "Added to Plan"}</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                <span>Add to Plan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplementCard;
