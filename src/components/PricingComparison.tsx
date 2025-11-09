import { Check, X } from "lucide-react";

interface CompetitorPricing {
  name: string;
  price: string;
  features: { name: string; available: boolean }[];
}

const PricingComparison = () => {
  const competitors: CompetitorPricing[] = [
    {
      name: "Vishnu AI",
      price: "FREE until Dec 1, 2025",
      features: [
        { name: "100+ Google Dorks", available: true },
        { name: "Multi-Source Verification", available: true },
        { name: "Real-time Web Scraping", available: true },
        { name: "Mistral AI Integration", available: true },
        { name: "Unlimited Queries", available: true },
        { name: "Advanced Algorithms", available: true },
        { name: "Source Attribution", available: true },
      ],
    },
    {
      name: "Perplexity Pro",
      price: "$20/month",
      features: [
        { name: "100+ Google Dorks", available: false },
        { name: "Multi-Source Verification", available: true },
        { name: "Real-time Web Scraping", available: true },
        { name: "Mistral AI Integration", available: false },
        { name: "Unlimited Queries", available: true },
        { name: "Advanced Algorithms", available: false },
        { name: "Source Attribution", available: true },
      ],
    },
    {
      name: "Kimi-Researcher",
      price: "$25/month",
      features: [
        { name: "100+ Google Dorks", available: true },
        { name: "Multi-Source Verification", available: true },
        { name: "Real-time Web Scraping", available: true },
        { name: "Mistral AI Integration", available: false },
        { name: "Unlimited Queries", available: false },
        { name: "Advanced Algorithms", available: true },
        { name: "Source Attribution", available: true },
      ],
    },
    {
      name: "OpenAI o3",
      price: "$50/month",
      features: [
        { name: "100+ Google Dorks", available: false },
        { name: "Multi-Source Verification", available: false },
        { name: "Real-time Web Scraping", available: true },
        { name: "Mistral AI Integration", available: false },
        { name: "Unlimited Queries", available: false },
        { name: "Advanced Algorithms", available: true },
        { name: "Source Attribution", available: false },
      ],
    },
  ];

  return (
    <section className="my-20">
      <h2 className="text-4xl font-bold mb-8 text-center text-foreground">Pricing Comparison</h2>
      <p className="text-center text-muted-foreground mb-8">
        See how Vishnu AI compares to leading competitors - and it's completely free until December 1st, 2025!
      </p>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-foreground font-bold">Feature</th>
              {competitors.map((competitor) => (
                <th key={competitor.name} className="text-center p-4">
                  <div className="font-bold text-foreground">{competitor.name}</div>
                  <div className={`text-sm mt-1 ${competitor.name === 'Vishnu AI' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                    {competitor.price}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {competitors[0].features.map((_, featureIndex) => (
              <tr key={featureIndex} className="border-b border-border hover:bg-muted/5">
                <td className="p-4 text-foreground">
                  {competitors[0].features[featureIndex].name}
                </td>
                {competitors.map((competitor) => (
                  <td key={competitor.name} className="text-center p-4">
                    {competitor.features[featureIndex].available ? (
                      <Check className="w-5 h-5 text-primary mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 glass-card rounded-2xl p-6 text-center">
        <p className="text-lg font-semibold text-primary mb-2">
          🎉 Special Launch Offer
        </p>
        <p className="text-foreground">
          Vishnu AI is completely FREE until December 1st, 2025. No credit card required. Start researching today!
        </p>
      </div>
    </section>
  );
};

export default PricingComparison;
