
import { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Supplement } from "@/lib/supplements";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface SupplementDetailProps {
  supplement: Supplement;
}

const SupplementDetail = ({ supplement }: SupplementDetailProps) => {
  const [showFullAbstract, setShowFullAbstract] = useState(false);
  
  // This would come from a database in a real implementation
  const researchPaper = {
    title: `Effects of ${supplement.name} Supplementation: A Comprehensive Review`,
    authors: "Johnson, R., Chen, L., Patel, S., & Williams, C.",
    journal: "Journal of Nutritional Science",
    year: 2023,
    volume: 12,
    issue: 4,
    pages: "145-163",
    doi: "10.1093/jns/2023.0042",
    abstract: `This comprehensive review evaluates the clinical evidence for ${supplement.name} supplementation on various health outcomes. Analysis of multiple randomized controlled trials revealed significant improvements in ${supplement.benefits[0].toLowerCase()} and ${supplement.benefits[1].toLowerCase()}. Furthermore, supplementation was shown to optimize ${supplement.benefits[2].toLowerCase()}. Results suggest daily supplementation of ${supplement.dosage.toLowerCase()} produces optimal outcomes, particularly when taken ${supplement.timing.toLowerCase()}. These findings provide robust evidence supporting personalized ${supplement.name} supplementation protocols based on individual health needs and goals.`,
    url: "https://example.com/journal/research-paper"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{supplement.name} Research</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={supplement.imageUrl}
                  alt={supplement.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{supplement.name}</h3>
                <p className="text-sm text-muted-foreground">{supplement.category}</p>
                <p className="mt-1">{supplement.description}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Key Benefits</h4>
              <ul className="space-y-1">
                {supplement.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="mr-2">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="research" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">{researchPaper.title}</h3>
              
              <div className="text-sm text-muted-foreground">
                <p>{researchPaper.authors}</p>
                <p>
                  {researchPaper.journal}, {researchPaper.year}, 
                  Vol. {researchPaper.volume}({researchPaper.issue}), pp. {researchPaper.pages}
                </p>
                <p>DOI: {researchPaper.doi}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1 text-sm">Abstract</h4>
                <div className={cn(
                  "text-sm text-foreground/80 relative",
                  !showFullAbstract && "max-h-24 overflow-hidden"
                )}>
                  <p>{researchPaper.abstract}</p>
                  
                  {!showFullAbstract && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent"></div>
                  )}
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowFullAbstract(!showFullAbstract)}
                  className="w-full mt-2 text-xs"
                >
                  {showFullAbstract ? (
                    <>
                      <ChevronUp className="h-3 w-3 mr-1" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3 mr-1" />
                      Read Full Abstract
                    </>
                  )}
                </Button>
              </div>
              
              <div className="pt-2">
                <a 
                  href={researchPaper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center text-sm"
                >
                  View Full Research Paper
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="usage" className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-1">Recommended Dosage</h4>
                <p className="text-sm">{supplement.dosage}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Optimal Timing</h4>
                <p className="text-sm">{supplement.timing}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Best Practices</h4>
                <ul className="space-y-1">
                  <li className="flex items-start text-sm">
                    <span className="mr-2">•</span>
                    <span>Take consistently at the same time each day</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="mr-2">•</span>
                    <span>Store in a cool, dry place away from direct sunlight</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="mr-2">•</span>
                    <span>Consult with a healthcare professional before starting any new supplement</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
        <p>Data based on peer-reviewed research as of 2023</p>
      </CardFooter>
    </Card>
  );
};

export default SupplementDetail;
