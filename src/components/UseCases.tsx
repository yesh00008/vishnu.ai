import { Book, Briefcase, Code, GraduationCap, LineChart, Newspaper, Shield, TrendingUp } from "lucide-react";

const UseCases = () => {
  const useCases = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Academic Research",
      description: "Deep literature reviews, paper discovery, citation analysis, and comprehensive research synthesis.",
      examples: ["Literature reviews", "Citation networks", "Academic databases", "Research synthesis"],
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Business Intelligence",
      description: "Market research, competitive analysis, industry trends, and strategic decision support.",
      examples: ["Market analysis", "Competitor tracking", "Industry reports", "Strategic insights"],
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Technical Documentation",
      description: "Code examples, API documentation, framework guides, and technical problem solving.",
      examples: ["Stack Overflow", "GitHub repos", "API docs", "Technical guides"],
    },
    {
      icon: <Newspaper className="w-8 h-8" />,
      title: "News & Current Events",
      description: "Real-time news aggregation, fact-checking, multi-perspective analysis, and trend monitoring.",
      examples: ["Breaking news", "Fact verification", "Multiple sources", "Timeline analysis"],
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Data Analysis",
      description: "Statistical research, dataset discovery, methodology review, and data-driven insights.",
      examples: ["Statistical data", "Research datasets", "Analysis methods", "Visualization"],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Legal & Compliance",
      description: "Legal research, case law analysis, regulatory compliance, and policy documentation.",
      examples: ["Case law", "Regulations", "Compliance docs", "Legal precedents"],
    },
    {
      icon: <Book className="w-8 h-8" />,
      title: "Content Creation",
      description: "Research for articles, fact-checking for journalism, background research, and source verification.",
      examples: ["Article research", "Source validation", "Background info", "Expert opinions"],
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Investment Research",
      description: "Financial analysis, company research, market trends, and investment opportunity evaluation.",
      examples: ["Company analysis", "Financial reports", "Market trends", "Investment data"],
    },
  ];

  return (
    <section className="my-20">
      <h2 className="text-4xl font-bold mb-6 text-center text-foreground">Use Cases</h2>
      <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
        Vishnu AI powers advanced research across multiple domains - from academic papers to business intelligence, all with verifiable sources and multi-source verification.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {useCases.map((useCase, index) => (
          <div
            key={index}
            className="glass-card rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all cursor-pointer border border-primary/10"
          >
            <div className="text-primary mb-4">{useCase.icon}</div>
            <h3 className="text-lg font-bold mb-3 text-foreground">{useCase.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {useCase.description}
            </p>
            <div className="space-y-2">
              {useCase.examples.map((example, idx) => (
                <div key={idx} className="text-xs text-foreground/70 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary"></span>
                  {example}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 glass-card rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4 text-foreground">Why Choose Vishnu AI?</h3>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">100+</div>
            <div className="text-sm text-muted-foreground">Sources per query</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">94.7%</div>
            <div className="text-sm text-muted-foreground">Accuracy rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">2.3s</div>
            <div className="text-sm text-muted-foreground">Average response time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
