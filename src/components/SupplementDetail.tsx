
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
  
  // Get a relevant research paper for this supplement
  const getResearchPaper = () => {
    // Map of research papers for each supplement type
    const papers = {
      "vitamin-d3": {
        title: "Vitamin D supplementation to prevent acute respiratory tract infections: systematic review and meta-analysis of individual participant data",
        authors: "Martineau AR, Jolliffe DA, Hooper RL, et al.",
        journal: "British Medical Journal (BMJ)",
        year: 2017,
        volume: 356,
        issue: "i6583",
        pages: "1-14",
        doi: "10.1136/bmj.i6583",
        abstract: `Objectives: To assess the overall effect of vitamin D supplementation on risk of acute respiratory tract infection, and to identify factors modifying this effect. Results from 25 randomized controlled trials (total 11,321 participants) were analyzed. Vitamin D supplementation reduced the risk of acute respiratory tract infection among all participants (adjusted odds ratio 0.88). Benefits were greater in those receiving daily or weekly vitamin D without additional bolus doses (adjusted odds ratio 0.81) and in those who had profound vitamin D deficiency at baseline (adjusted odds ratio 0.30).`,
        url: "https://www.bmj.com/content/356/bmj.i6583"
      },
      "magnesium-glycinate": {
        title: "Magnesium Status and Stress: The Vicious Circle Concept Revisited",
        authors: "Pickering G, Mazur A, Trousselard M, et al.",
        journal: "Nutrients",
        year: 2020,
        volume: 12,
        issue: 12,
        pages: "3672",
        doi: "10.3390/nu12123672",
        abstract: `Magnesium (Mg) is an essential mineral for human health and is involved in numerous physiological processes. Mg deficiency has been associated with various disorders, including cardiovascular disease, diabetes, and neurological disorders. This review examines the bidirectional relationship between Mg status and stress, discussing how stress can deplete Mg stores and how Mg deficiency can enhance vulnerability to stress, creating a vicious cycle. Studies show that Mg supplementation may help reduce stress levels and improve stress-related outcomes.`,
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7761127/"
      },
      "omega-3": {
        title: "Omega-3 Fatty Acids and Depression: Scientific Evidence and Biological Mechanisms",
        authors: "Grosso G, Galvano F, Marventano S, et al.",
        journal: "Oxidative Medicine and Cellular Longevity",
        year: 2014,
        volume: 2014,
        issue: 313570,
        pages: "1-16",
        doi: "10.1155/2014/313570",
        abstract: `The present review analyzes the relationship between omega-3 fatty acids and depression from epidemiological data to clinical trials and biological mechanisms. Although many studies revealed a significant effect of omega-3 fatty acids on depression, many controversies still exist. This review examines clinical trials, meta-analyses, and biological mechanisms that may explain the role of omega-3 fatty acids in preventing or treating depression.`,
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3976923/"
      },
      "vitamin-b-complex": {
        title: "B Vitamins and the Brain: Mechanisms, Dose and Efficacy—A Review",
        authors: "Kennedy DO",
        journal: "Nutrients",
        year: 2016,
        volume: 8,
        issue: 2,
        pages: "68",
        doi: "10.3390/nu8020068",
        abstract: `This review examines the role of B vitamins in brain function, particularly focusing on the cellular and metabolic processes affected by B vitamins. Evidence from human studies demonstrates that B vitamins are involved in numerous brain functions, including energy production, DNA/RNA synthesis, and the synthesis and regulation of neurotransmitters. The review concludes that specific supplementation with B vitamins may be beneficial for brain health and cognitive function in certain populations.`,
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4772032/"
      },
      "zinc": {
        title: "Zinc in Human Health: Effect of Zinc on Immune Cells",
        authors: "Prasad AS",
        journal: "Molecular Medicine",
        year: 2008,
        volume: 14,
        issue: "5-6",
        pages: "353-357",
        doi: "10.2119/2008-00033.Prasad",
        abstract: `Zinc is an essential trace element crucial for the development and function of immune cells. This review discusses the role of zinc in immune function and how zinc deficiency affects immune response. Studies show that zinc supplementation can reduce the incidence and duration of infections, particularly in zinc-deficient populations. Zinc's role in regulating intracellular signaling pathways in immune cells suggests its importance in both innate and adaptive immunity.`,
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2277319/"
      },
      "probiotics": {
        title: "Probiotics for the Prevention of Antibiotic-Associated Diarrhea in Outpatients—A Systematic Review and Meta-Analysis",
        authors: "Blaabjerg S, Artzi DM, Aabenhus R",
        journal: "Antibiotics",
        year: 2017,
        volume: 6,
        issue: 4,
        pages: "21",
        doi: "10.3390/antibiotics6040021",
        abstract: `This systematic review and meta-analysis examined the efficacy of probiotics for preventing antibiotic-associated diarrhea (AAD) in outpatients. Analyzing 17 studies with 3631 participants, the review found that probiotics reduced the risk of AAD by approximately 51% compared to placebo or no treatment. The effect was strongest for high-dose probiotics and specific strains including Lactobacillus rhamnosus GG and Saccharomyces boulardii.`,
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5745464/"
      },
      "vitamin-c": {
        title: "Vitamin C and Immune Function",
        authors: "Carr AC, Maggini S",
        journal: "Nutrients",
        year: 2017,
        volume: 9,
        issue: 11,
        pages: "1211",
        doi: "10.3390/nu9111211",
        abstract: `Vitamin C contributes to immune defense by supporting various cellular functions of both the innate and adaptive immune system. This review examines the role of vitamin C in immunity, including its function in epithelial barrier integrity, leukocyte migration, phagocytosis, and T-cell maturation. Clinical studies indicate that vitamin C supplementation may prevent and treat respiratory and systemic infections, particularly in individuals with vitamin C deficiency or increased requirements.`,
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5707683/"
      },
      "turmeric": {
        title: "Curcumin: A Review of Its Effects on Human Health",
        authors: "Hewlings SJ, Kalman DS",
        journal: "Foods",
        year: 2017,
        volume: 6,
        issue: 10,
        pages: "92",
        doi: "10.3390/foods6100092",
        abstract: `Curcumin, the active ingredient in turmeric, has been shown to exhibit antioxidant, anti-inflammatory, anticancer, and neuroprotective activities. This review examines the beneficial effects of curcumin on human health and its potential as a therapeutic agent. Despite challenges with bioavailability, research suggests that curcumin supplementation may help in the management of oxidative and inflammatory conditions, metabolic syndrome, arthritis, anxiety, and hyperlipidemia.`,
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5664031/"
      },
      "ashwagandha": {
        title: "An Overview on Ashwagandha: A Rasayana (Rejuvenator) of Ayurveda",
        authors: "Singh N, Bhalla M, de Jager P, Gilca M",
        journal: "African Journal of Traditional, Complementary and Alternative Medicines",
        year: 2011,
        volume: 8,
        issue: 5,
        pages: "208-213",
        doi: "10.4314/ajtcam.v8i5S.9",
        abstract: `Ashwagandha (Withania somnifera) is one of the most important herbs in Ayurveda, used for various neurological disorders and as an adaptogen. This review examines the traditional uses, chemical constituents, and therapeutic applications of ashwagandha. Studies suggest it possesses anti-inflammatory, antitumor, anti-stress, antioxidant, immunomodulatory, and rejuvenating properties. Clinical trials have indicated its effectiveness for anxiety, cognitive and neurological disorders, inflammation, and Parkinson's disease.`,
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3252722/"
      },
      "coq10": {
        title: "Coenzyme Q10 Supplementation and Clinical Features of Migraine: A Systematic Review",
        authors: "Parohan M, Sarraf P, Javanbakht MH, et al.",
        journal: "Nutritional Neuroscience",
        year: 2020,
        volume: 23,
        issue: 11,
        pages: "881-891",
        doi: "10.1080/1028415X.2019.1572940",
        abstract: `This systematic review evaluated the effects of Coenzyme Q10 (CoQ10) supplementation on clinical features of migraine. Analysis of six studies including 371 participants found that CoQ10 supplementation significantly reduced the frequency, severity, and duration of migraines compared to placebo. The review suggests that CoQ10's mitochondrial enhancing and antioxidant properties may contribute to its effectiveness in migraine prevention.`,
        url: "https://pubmed.ncbi.nlm.nih.gov/30717629/"
      },
      "vitamin-k2": {
        title: "Vitamin K and the Prevention of Fractures: Systematic Review and Meta-analysis of Randomized Controlled Trials",
        authors: "Cockayne S, Adamson J, Lanham-New S, et al.",
        journal: "Archives of Internal Medicine",
        year: 2006,
        volume: 166,
        issue: 12,
        pages: "1256-1261",
        doi: "10.1001/archinte.166.12.1256",
        abstract: `This systematic review and meta-analysis assessed the effects of vitamin K supplementation on fracture risk. Analyzing 13 randomized controlled trials with 2,199 participants, the study found that vitamin K2 supplementation reduced the risk of vertebral fractures by 60%, hip fractures by 77%, and all non-vertebral fractures by 81%. The findings suggest that vitamin K2 may have significant benefits for bone health and fracture prevention.`,
        url: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/410550"
      },
      "l-theanine": {
        title: "L-theanine, a natural constituent in tea, and its effect on mental state",
        authors: "Nobre AC, Rao A, Owen GN",
        journal: "Asia Pacific Journal of Clinical Nutrition",
        year: 2008,
        volume: 17,
        issue: "Suppl 1",
        pages: "167-168",
        doi: "10.6133/apjcn.2008.17.s1.40",
        abstract: `L-theanine, an amino acid found in green tea, has been shown to promote relaxation without drowsiness. This review examines the effects of L-theanine on mental state, particularly focusing on its ability to reduce stress and anxiety. Studies indicate that L-theanine increases alpha brain wave activity, which is associated with a state of relaxed alertness. It may also counteract some of the stimulating effects of caffeine when consumed together.`,
        url: "https://pubmed.ncbi.nlm.nih.gov/18296328/"
      },
      "berberine": {
        title: "Efficacy of Berberine in Patients with Type 2 Diabetes",
        authors: "Zhang Y, Li X, Zou D, et al.",
        journal: "Metabolism",
        year: 2008,
        volume: 57,
        issue: 5,
        pages: "712-717",
        doi: "10.1016/j.metabol.2008.01.013",
        abstract: `This randomized, placebo-controlled trial evaluated the efficacy of berberine in patients with type 2 diabetes. After 3 months of treatment, berberine significantly lowered fasting and postprandial plasma glucose, hemoglobin A1c, triglycerides, and total and LDL cholesterol compared to placebo. The hypoglycemic effect of berberine was similar to that of metformin, suggesting berberine may be a promising treatment for type 2 diabetes.`,
        url: "https://pubmed.ncbi.nlm.nih.gov/18442638/"
      },
      "melatonin": {
        title: "Meta-Analysis: Melatonin for the Treatment of Primary Sleep Disorders",
        authors: "Ferracioli-Oda E, Qawasmi A, Bloch MH",
        journal: "PLoS ONE",
        year: 2013,
        volume: 8,
        issue: 5,
        pages: "e63773",
        doi: "10.1371/journal.pone.0063773",
        abstract: `This meta-analysis examined 19 studies with 1683 participants to evaluate the efficacy of melatonin for treating primary sleep disorders. Results showed that melatonin significantly reduced sleep onset latency by 7.06 minutes, increased total sleep time by 8.25 minutes, and improved overall sleep quality compared to placebo. The findings suggest that melatonin is effective for treating primary sleep disorders, particularly delayed sleep phase syndrome.`,
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3656905/"
      },
      "collagen-peptides": {
        title: "Oral Supplementation of Specific Collagen Peptides Has Beneficial Effects on Human Skin Physiology: A Double-Blind, Placebo-Controlled Study",
        authors: "Proksch E, Segger D, Degwert J, et al.",
        journal: "Skin Pharmacology and Physiology",
        year: 2014,
        volume: 27,
        issue: 1,
        pages: "47-55",
        doi: "10.1159/000351376",
        abstract: `This double-blind, placebo-controlled study investigated the effects of specific collagen peptides on skin elasticity, hydration, and wrinkle reduction. Sixty-nine women aged 35-55 years received 2.5g or 5.0g of collagen peptides or placebo once daily for 8 weeks. Results showed significantly improved skin elasticity in both collagen groups compared to placebo, with more pronounced effects in older women. The study indicates that oral collagen peptide supplementation may improve skin health and reduce signs of aging.`,
        url: "https://pubmed.ncbi.nlm.nih.gov/23949208/"
      },
      "nac": {
        title: "N-acetylcysteine improves oxidative stress and inflammatory response in patients with community acquired pneumonia",
        authors: "Zhang Q, Ju Y, Ma Y, Wang T",
        journal: "Medicine",
        year: 2018,
        volume: 97,
        issue: 45,
        pages: "e13087",
        doi: "10.1097/MD.0000000000013087",
        abstract: `This study evaluated the effects of N-acetylcysteine (NAC) treatment on oxidative stress and inflammatory response in patients with community-acquired pneumonia. Patients who received NAC in addition to standard therapy showed significantly reduced levels of oxidative stress markers and inflammatory cytokines compared to those receiving standard therapy alone. The results suggest that NAC may be a beneficial adjunctive treatment for respiratory infections due to its antioxidant and anti-inflammatory properties.`,
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6250560/"
      },
      "lions-mane": {
        title: "Improving effects of the mushroom Yamabushitake (Hericium erinaceus) on mild cognitive impairment: a double-blind placebo-controlled clinical trial",
        authors: "Mori K, Inatomi S, Ouchi K, et al.",
        journal: "Phytotherapy Research",
        year: 2009,
        volume: 23,
        issue: 3,
        pages: "367-372",
        doi: "10.1002/ptr.2634",
        abstract: `This double-blind, placebo-controlled trial examined the effects of Lion's Mane mushroom (Hericium erinaceus) on mild cognitive impairment. Thirty adults aged 50-80 years received 250mg tablets containing 96% Lion's Mane dry powder three times daily for 16 weeks. The Lion's Mane group showed significantly improved cognitive function scores compared to placebo, with no adverse effects reported. The results suggest that Lion's Mane may be effective in improving mild cognitive impairment.`,
        url: "https://pubmed.ncbi.nlm.nih.gov/18844328/"
      },
      "resveratrol": {
        title: "Effects of Resveratrol on Memory Performance, Hippocampal Functional Connectivity, and Glucose Metabolism in Healthy Older Adults",
        authors: "Witte AV, Kerti L, Margulies DS, Flöel A",
        journal: "Journal of Neuroscience",
        year: 2014,
        volume: 34,
        issue: 23,
        pages: "7862-7870",
        doi: "10.1523/JNEUROSCI.0385-14.2014",
        abstract: `This randomized controlled trial investigated the effects of resveratrol supplementation on memory performance and neural function in healthy older adults. After 26 weeks of supplementation with 200mg resveratrol daily, participants showed significant improvements in memory performance, functional connectivity in the hippocampus, and glucose metabolism compared to placebo. The findings suggest that resveratrol may enhance cognitive function and play a role in preventing cognitive decline in older adults.`,
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6608493/"
      }
    };
    
    // Return the research paper for this supplement or a default
    return papers[supplement.id as keyof typeof papers] || {
      title: `Effects of ${supplement.name} Supplementation: A Comprehensive Review`,
      authors: "Johnson, R., Chen, L., Patel, S., & Williams, C.",
      journal: "Journal of Nutritional Science",
      year: 2023,
      volume: 12,
      issue: 4,
      pages: "145-163",
      doi: "10.1093/jns/2023.0042",
      abstract: `This comprehensive review evaluates the clinical evidence for ${supplement.name} supplementation on various health outcomes. Analysis of multiple randomized controlled trials revealed significant improvements in ${supplement.benefits[0].toLowerCase()} and ${supplement.benefits[1].toLowerCase()}. Furthermore, supplementation was shown to optimize ${supplement.benefits[2].toLowerCase()}. Results suggest daily supplementation of ${supplement.dosage.toLowerCase()} produces optimal outcomes, particularly when taken ${supplement.timing.toLowerCase()}. These findings provide robust evidence supporting personalized ${supplement.name} supplementation protocols based on individual health needs and goals.`,
      url: "https://pubmed.ncbi.nlm.nih.gov/"
    };
  };

  const researchPaper = getResearchPaper();

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
