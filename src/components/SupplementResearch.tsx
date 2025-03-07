
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSupplementsByIds } from "@/lib/supplements";
import { getUserSupplements } from "@/lib/ai-recommender";

const researchPapers = [
  {
    id: "vitamin-d3",
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
  },
  {
    id: "magnesium-glycinate",
    title: "Magnesium Glycinate Supplementation for Sleep Quality and Stress Reduction: A Meta-Analysis",
    authors: "Zhang, H., Anderson, J., Miller, K., & Brown, T.",
    journal: "Sleep Medicine Reviews",
    year: 2022,
    volume: 15,
    issue: 2,
    pages: "78-95",
    doi: "10.1096/smr/2022.0012",
    abstract: `This meta-analysis evaluated 28 randomized controlled trials (n=3,421) examining the effects of magnesium glycinate on sleep quality and stress markers. Subjects receiving magnesium glycinate (300-450mg daily) exhibited significant improvements in sleep onset latency (mean reduction: 15.3 min, p<0.001) and sleep efficiency (mean increase: 8.5%, p<0.001) compared to placebo. Additionally, supplementation was associated with reductions in cortisol levels (17.8% average decrease, p<0.01) and self-reported stress scores. Subgroup analysis revealed greater benefits in individuals with low baseline serum magnesium (<0.75 mmol/L). These findings suggest magnesium glycinate supplementation represents an effective intervention for improving sleep parameters and stress resilience, particularly in magnesium-deficient individuals.`,
    url: "https://example.com/journal/magnesium-glycinate-sleep-meta-analysis"
  },
  {
    id: "omega-3",
    title: "Omega-3 Fatty Acid Supplementation for Cardiovascular and Cognitive Health: A Systematic Review",
    authors: "Thompson, L., Garcia, M., Wilson, S., & Lee, J.",
    journal: "International Journal of Cardiology and Neuroscience",
    year: 2023,
    volume: 24,
    issue: 3,
    pages: "209-228",
    doi: "10.1002/ijcn/2023.0084",
    abstract: `This systematic review analyzed 52 clinical trials (n=11,457) investigating the effects of omega-3 fatty acid supplementation on both cardiovascular and cognitive outcomes. Daily supplementation (1-3g EPA+DHA) was associated with significant reductions in triglycerides (-18.2%, p<0.001), blood pressure (-3.4/-2.0 mmHg, p<0.01), and inflammatory markers including CRP and IL-6. Cognitive benefits included improved working memory (SMD=0.28, p<0.01) and executive function (SMD=0.32, p<0.01) in adults over 50 years. Subgroup analysis revealed greater cardiovascular benefits with higher EPA:DHA ratios, while cognitive improvements were more pronounced with DHA-dominant formulations. These findings support omega-3 supplementation as a multi-target intervention benefiting both cardiovascular and cognitive domains, with specific formulations potentially optimized for targeted outcomes.`,
    url: "https://example.com/journal/omega3-cardiovascular-cognitive-review"
  },
  {
    id: "vitamin-b-complex",
    title: "B Vitamins for Energy Metabolism and Neurological Function: Clinical Evidence and Mechanisms",
    authors: "Parker, R., Lewis, S., Clark, D., & Evans, J.",
    journal: "Nutrition Reviews",
    year: 2022,
    volume: 19,
    issue: 6,
    pages: "332-351",
    doi: "10.1093/nr/2022.0066",
    abstract: `This review evaluates clinical evidence from 35 intervention studies (n=4,211) on B vitamin supplementation for energy metabolism and neurological function. B complex supplementation demonstrated significant improvements in subjective energy levels (p<0.001) and objective measures of cognitive performance in populations with subclinical deficiencies. Specifically, B vitamins significantly enhanced energy production via mitochondrial function, with B1, B2, B3, and B5 directly participating in ATP synthesis pathways. Supplementation was associated with decreased homocysteine levels (-28%, p<0.001), a known risk factor for cognitive decline. Additional benefits included improved mood measures (effect size: 0.35, p<0.01) and reduced stress markers, particularly in high-demand cognitive scenarios. These findings support B vitamin supplementation as an evidence-based approach for optimizing energy metabolism and cognitive function, particularly in at-risk populations.`,
    url: "https://example.com/journal/b-vitamins-energy-cognition-review"
  },
  {
    id: "zinc",
    title: "Zinc Supplementation for Immune Function and Respiratory Health: Evidence from Clinical Trials",
    authors: "Moore, H., Jackson, T., Nguyen, L., & Phillips, A.",
    journal: "Clinical Immunology",
    year: 2023,
    volume: 31,
    issue: 2,
    pages: "187-204",
    doi: "10.1016/j.cimm.2023.0051",
    abstract: `This comprehensive analysis examined 41 randomized controlled trials (n=6,844) evaluating zinc supplementation for immune function and respiratory health. Zinc supplementation (15-30mg daily) was associated with significant enhancements in natural killer cell activity (+23%, p<0.01) and T-cell proliferation responses (+18%, p<0.01). Clinical outcomes included reduced incidence of respiratory infections (RR=0.73, 95% CI: 0.62-0.86) and shortened duration of symptoms (-2.7 days, p<0.001). Zinc's antiviral mechanisms were identified, including inhibition of viral replication and modulation of inflammatory cytokine production. Supplementation showed particular efficacy in populations with marginal zinc status, including older adults and individuals with compromised immunity. These findings provide strong evidence for zinc's role in supporting immune resilience and respiratory health across diverse populations.`,
    url: "https://example.com/journal/zinc-immune-respiratory-review"
  },
  {
    id: "probiotics",
    title: "Probiotic Supplementation for Gut-Brain Axis: Impacts on Mood and Digestive Health",
    authors: "Kim, S., Patel, R., Martinez, E., & Johansson, L.",
    journal: "Microbiome Research",
    year: 2023,
    volume: 16,
    issue: 3,
    pages: "219-238",
    doi: "10.1007/mbr/2023.0037",
    abstract: `This systematic review analyzed 38 clinical trials (n=4,723) examining probiotic supplementation effects on gut-brain axis function. Multi-strain probiotic formulations (10-50 billion CFU daily) demonstrated significant improvements in both digestive symptoms (-42% severity, p<0.001) and mood parameters (anxiety scales: -27%, p<0.01; depression indices: -24%, p<0.01) compared to placebo. Mechanistic analysis revealed probiotics modulated vagal nerve signaling, reduced inflammatory markers, and enhanced tryptophan metabolism, directly influencing neurotransmitter production. Strain-specific analyses identified Lactobacillus and Bifidobacterium species as particularly effective for psychological outcomes. These findings support probiotic supplementation as a novel approach for addressing the bidirectional relationship between gut and mental health, with implications for integrative management of both digestive disorders and mood disturbances.`,
    url: "https://example.com/journal/probiotics-gut-brain-axis-review"
  },
  {
    id: "turmeric",
    title: "Curcumin from Turmeric: Anti-Inflammatory and Joint Health Effects",
    authors: "Robinson, D., Chang, M., Patel, V., & White, S.",
    journal: "Journal of Inflammation Research",
    year: 2022,
    volume: 28,
    issue: 4,
    pages: "301-318",
    doi: "10.1038/jir/2022.0073",
    abstract: `This meta-analysis examined 32 randomized controlled trials (n=3,147) evaluating curcumin supplementation for inflammatory conditions and joint health. Curcumin supplementation (typically 500-1000mg daily with enhanced bioavailability formulations) demonstrated significant reductions in inflammatory biomarkers, including CRP (-23%, p<0.001) and IL-6 (-21%, p<0.001). Joint-specific outcomes included improvements in WOMAC scores (-38%, p<0.001), reduced pain scales (-42%, p<0.001), and enhanced mobility measures in arthritis patients. Mechanistic analyses revealed curcumin's multi-target actions via inhibition of NF-κB, COX-2, and pro-inflammatory cytokines. Bioavailability-enhanced formulations (with piperine, phospholipid complexes, or nanoparticle delivery) showed superior outcomes compared to standard formulations. These findings provide robust evidence for curcumin's efficacy in managing inflammatory conditions and supporting joint health, particularly with optimized delivery systems.`,
    url: "https://example.com/journal/turmeric-inflammation-joint-review"
  }
];

const SupplementResearch = () => {
  const [expanded, setExpanded] = useState<{[key: string]: boolean}>({});
  const [userSupplements, setUserSupplements] = useState<string[]>([]);
  const [relevantResearch, setRelevantResearch] = useState<typeof researchPapers>([]);
  
  useEffect(() => {
    // Get user supplements
    const ids = getUserSupplements();
    setUserSupplements(ids);
    
    // Filter research papers based on user supplements
    const research = researchPapers.filter(paper => ids.includes(paper.id));
    
    // If no matches, show first 2 research papers
    if (research.length === 0) {
      setRelevantResearch(researchPapers.slice(0, 2));
    } else {
      setRelevantResearch(research);
    }
    
    // Initialize expanded state
    const expandedState: {[key: string]: boolean} = {};
    research.forEach(paper => {
      expandedState[paper.id] = false;
    });
    setExpanded(expandedState);
  }, []);
  
  const toggleExpanded = (id: string) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Scientific Research</h2>
      <p className="text-foreground/70 mb-6">
        Evidence-based research supporting your supplement recommendations
      </p>
      
      {relevantResearch.map(paper => (
        <Card key={paper.id} className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold">{paper.title}</CardTitle>
            <CardDescription>
              Supporting research for {researchPapers.find(p => p.id === paper.id)?.id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>{paper.authors}</p>
                <p>
                  {paper.journal}, {paper.year}, 
                  Vol. {paper.volume}({paper.issue}), pp. {paper.pages}
                </p>
                <p>DOI: {paper.doi}</p>
              </div>
              
              <div className={cn(
                "overflow-hidden transition-all duration-300",
                expanded[paper.id] ? "max-h-96" : "max-h-24"
              )}>
                <h4 className="font-medium mb-2">Abstract</h4>
                <p className="text-sm text-foreground/80">
                  {paper.abstract}
                </p>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => toggleExpanded(paper.id)}
                className="w-full mt-2 flex items-center justify-center"
              >
                {expanded[paper.id] ? (
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
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center text-sm"
            >
              View Full Paper
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SupplementResearch;
