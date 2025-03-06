
import { useState } from "react";
import { Plus, Check, Info } from "lucide-react";
import { Supplement } from "@/lib/supplements";
import { cn } from "@/lib/utils";

interface SupplementCardProps {
  supplement: Supplement;
  isAdded?: boolean;
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
}

const SupplementCard = ({ 
  supplement, 
  isAdded = false, 
  onAdd, 
  onRemove 
}: SupplementCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleAddRemove = () => {
    if (isAdded && onRemove) {
      onRemove(supplement.id);
    } else if (onAdd) {
      onAdd(supplement.id);
    }
  };

  return (
    <div className={cn(
      "rounded-xl overflow-hidden transition-all-300",
      "border border-border bg-card hover:shadow-lg",
      showDetails ? "ring-1 ring-primary/20" : ""
    )}>
      <div className="relative h-48 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <span className="text-muted-foreground">Loading...</span>
          </div>
        )}
        <img
          src={supplement.imageUrl}
          alt={supplement.name}
          className={cn(
            "w-full h-full object-cover transition-all-300",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute top-3 left-3 bg-card/80 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full">
          {supplement.category}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold">{supplement.name}</h3>
          <button
            onClick={toggleDetails}
            className={cn(
              "p-2 rounded-full transition-all-200",
              showDetails 
                ? "bg-primary/10 text-primary" 
                : "hover:bg-muted"
            )}
            aria-label="Toggle details"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
        
        <p className="mt-2 text-sm text-foreground/70">
          {supplement.description}
        </p>
        
        <div className={cn(
          "mt-4 space-y-4 overflow-hidden transition-all-300",
          showDetails ? "max-h-96" : "max-h-0"
        )}>
          <div>
            <h4 className="font-medium mb-2">Benefits</h4>
            <ul className="space-y-1">
              {supplement.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" />
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
            className={cn(
              "w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full transition-all-200",
              isAdded 
                ? "bg-accent text-foreground hover:bg-accent/80" 
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {isAdded ? (
              <>
                <Check className="w-5 h-5" />
                <span>Added to Plan</span>
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
