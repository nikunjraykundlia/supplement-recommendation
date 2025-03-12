
import { useState, useEffect } from "react";
import { Plus, Check, Info } from "lucide-react";
import { Supplement } from "@/lib/supplements";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
  const [imageFailed, setImageFailed] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  // High-quality fallback images for different supplement categories
  const categoryFallbackImages = {
    "Vitamin": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "Mineral": "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "Essential Fatty Acid": "https://images.unsplash.com/photo-1535185384036-28bbc8035f28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "Herbal": "https://images.unsplash.com/photo-1615485500704-8e990f9900e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "Adaptogen": "https://images.unsplash.com/photo-1611075384322-404243d037c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "Antioxidant": "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "Medicinal Mushroom": "https://images.unsplash.com/photo-1607469256565-921a7272dbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "Sleep Aid": "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "Amino Acid": "https://images.unsplash.com/photo-1546430783-fe4b9c159e52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "Digestive Health": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "Joint Support": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "Mood Support": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "Performance": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "Polyphenol": "https://images.unsplash.com/photo-1552526881-5517a57b6d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "Structural Protein": "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "Superfood": "https://images.unsplash.com/photo-1597736595206-99a8c173964f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  };

  // Default fallback for categories not in our map
  const defaultFallback = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
  
  // Get appropriate fallback based on supplement category
  const getFallbackImage = () => {
    return categoryFallbackImages[supplement.category as keyof typeof categoryFallbackImages] || defaultFallback;
  };

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
    setImageFailed(true);
    setImageLoaded(false);
    
    // Try different fallback image based on category
    const fallbackSrc = getFallbackImage();
    const imgElement = document.getElementById(`supp-img-${supplement.id}`) as HTMLImageElement;
    
    if (imgElement) {
      imgElement.src = fallbackSrc;
    }
    
    // After a short delay, mark as loaded
    setTimeout(() => {
      setImageLoaded(true);
    }, 300);
    
    // Increment retry count to avoid infinite loops
    setRetryCount(prev => prev + 1);
  };

  // Clean up effect for images that never load
  useEffect(() => {
    if (imageFailed && retryCount > 2) {
      // After multiple retries, just show it as loaded with fallback
      setImageLoaded(true);
    }
  }, [imageFailed, retryCount]);

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
          id={`supp-img-${supplement.id}`}
          src={supplement.imageUrl || getFallbackImage()}
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
