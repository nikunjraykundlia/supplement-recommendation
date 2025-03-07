
import { useState } from "react";
import { ExternalLink, FilePlus, Search, Book, ChevronDown, ChevronUp } from "lucide-react";
import { Supplement, getSupplementsByIds, getUserSupplements } from "@/lib/supplements";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SupplementResearch = () => {
  const userSupplementIds = getUserSupplements();
  const supplements = getSupplementsByIds(userSupplementIds);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // This would come from a database in a real implementation
  const getResearchPaper = (supplement: Supplement) => {
    return {
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
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Research-Backed Supplement Information</CardTitle>
      </CardHeader>
      <CardContent>
        {supplements.length === 0 ? (
          <div className="text-center py-8">
            <Book className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No supplements in your plan yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Take the assessment to get personalized supplement recommendations
            </p>
            <Button variant="outline">Take Assessment</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {supplements.map((supplement) => {
              const paper = getResearchPaper(supplement);
              return (
                <div 
                  key={supplement.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <div 
                    className="flex items-start gap-4 p-4 cursor-pointer" 
                    onClick={() => toggleExpand(supplement.id)}
                  >
                    <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                      <img
                        src={supplement.imageUrl}
                        alt={supplement.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{supplement.name}</h3>
                        {expandedId === supplement.id ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{supplement.category}</p>
                      <p className="mt-1 text-sm line-clamp-2">{supplement.description}</p>
                    </div>
                  </div>
                  
                  {expandedId === supplement.id && (
                    <div className="p-4 pt-0 border-t mt-2 bg-muted/20">
                      <Tabs defaultValue="research">
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                          <TabsTrigger value="research">Research</TabsTrigger>
                          <TabsTrigger value="benefits">Benefits & Usage</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="research" className="space-y-4">
                          <div className="space-y-3">
                            <h3 className="font-semibold text-lg">{paper.title}</h3>
                            
                            <div className="text-sm text-muted-foreground">
                              <p>{paper.authors}</p>
                              <p>
                                {paper.journal}, {paper.year}, 
                                Vol. {paper.volume}({paper.issue}), pp. {paper.pages}
                              </p>
                              <p>DOI: {paper.doi}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-1 text-sm">Abstract</h4>
                              <p className="text-sm text-foreground/80">
                                {paper.abstract}
                              </p>
                            </div>
                            
                            <div className="pt-2">
                              <a 
                                href={paper.url}
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
                        
                        <TabsContent value="benefits" className="space-y-4">
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
                          
                          <div className="grid grid-cols-2 gap-4 pt-2">
                            <div>
                              <h4 className="font-medium mb-1 text-sm">Recommended Dosage</h4>
                              <p className="text-sm">{supplement.dosage}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-1 text-sm">Optimal Timing</h4>
                              <p className="text-sm">{supplement.timing}</p>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SupplementResearch;
