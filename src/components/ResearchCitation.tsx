
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Example research paper citation - in a real app, this might come from a database
const researchPaper = {
  title: "Efficacy of Vitamin D3 Supplementation on Mental Health & Immune Function: A Comprehensive Review",
  authors: "Johnson, R., Chen, L., Patel, S., & Williams, C.",
  journal: "Journal of Nutritional Science",
  year: 2023,
  volume: 12,
  issue: 4,
  pages: "145-163",
  doi: "10.1093/jns/2023.0042",
  abstract: `This comprehensive review evaluates the clinical evidence for vitamin D supplementation on mental health outcomes and immune function. Analysis of 47 randomized controlled trials (n=5,832) revealed significant improvements in mood disorders with vitamin D3 supplementation (mean effect size: 0.42, 95% CI: 0.25-0.58) among deficient individuals (<30 nmol/L). Further, supplementation demonstrated enhanced immune markers including increased T cell function and reduced inflammatory cytokines. Results suggest daily supplementation of 2000-4000 IU produces optimal outcomes for mental wellbeing and immune resilience, particularly in high-risk populations. These findings provide robust evidence supporting personalized vitamin D supplementation protocols based on baseline serum levels.`,
  url: "https://example.com/journal/vitamin-d-mental-health-review"
};

const ResearchCitation = () => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Scientific Research</CardTitle>
        <CardDescription>
          Evidence-based supplement recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">{researchPaper.title}</h3>
          
          <div className="text-sm text-muted-foreground">
            <p>{researchPaper.authors}</p>
            <p>
              {researchPaper.journal}, {researchPaper.year}, 
              Vol. {researchPaper.volume}({researchPaper.issue}), pp. {researchPaper.pages}
            </p>
            <p>DOI: {researchPaper.doi}</p>
          </div>
          
          <div className={cn(
            "overflow-hidden transition-all duration-300",
            expanded ? "max-h-96" : "max-h-24"
          )}>
            <h4 className="font-medium mb-2">Abstract</h4>
            <p className="text-sm text-foreground/80">
              {researchPaper.abstract}
            </p>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
            className="w-full mt-2 flex items-center justify-center"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Read More
              </>
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <p className="text-xs text-muted-foreground">
          Last updated: June 2023
        </p>
        <a 
          href={researchPaper.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline flex items-center text-sm"
        >
          View Full Paper
          <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </CardFooter>
    </Card>
  );
};

export default ResearchCitation;
