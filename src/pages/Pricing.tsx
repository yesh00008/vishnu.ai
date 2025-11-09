import { Navbar } from "@/components/Navbar";
import { VishnuLogo } from "@/components/VishnuLogo";
import { NavLink } from "@/components/NavLink";
import { Check, Github, Heart } from "lucide-react";

const Pricing = () => {
  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-background text-foreground pt-16">
      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-6 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-primary font-semibold">✨ 100% FREE Until December 1st, 2025</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-foreground">
            100% Free & Open Source
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Vishnu AI is completely free to use, modify, and distribute. No hidden costs, ever.
          </p>
        </div>

        {/* Open Source Card */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="p-12 rounded-lg bg-muted/50 border-2 border-primary text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
              <Github className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Open Source</h2>
            <p className="text-2xl font-bold mb-2 text-primary">₹0 Forever</p>
            <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-primary font-semibold">🎉 Celebrating Open Source!</p>
              <p className="text-sm text-muted-foreground mt-1">
                Completely FREE until December 1st, 2025 and beyond
              </p>
            </div>
            <p className="text-muted-foreground mb-8">
              No hidden costs, no subscription fees, completely free and always will be
            </p>
            
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4">What You Get:</h4>
              <ul className="space-y-3 text-left max-w-md mx-auto">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>Unlimited research queries</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>AI-powered search and analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>Full access to source code</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>Self-hosting capabilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>Commercial use allowed</span>
                </li>
              </ul>
            </div>

            <div className="mb-8 p-4 bg-muted rounded-lg border border-border/40">
              <h4 className="text-sm font-semibold mb-3 text-muted-foreground">To use Vishnu AI, you'll need:</h4>
              <ul className="space-y-2 text-sm text-left max-w-md mx-auto">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Bytez API Key (for Qwen AI) - Free tier available</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Google Search API Key - Free tier available</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink to="/signup">
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-8 py-3 font-semibold transition inline-flex items-center gap-2 w-full sm:w-auto">
                  Start Using Now
                </button>
              </NavLink>
              <a 
                href="https://github.com/yesh00008/vishnu-query-nexus" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-muted hover:bg-muted/80 text-foreground rounded-lg px-8 py-3 font-semibold transition inline-flex items-center gap-2 justify-center"
              >
                <Github className="w-5 h-5" />
                View Source Code
              </a>
            </div>
          </div>
        </div>

        {/* Why Open Source */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Open Source?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-lg bg-muted/50 border border-border/40 text-center">
              <div className="text-4xl mb-4">🔓</div>
              <h3 className="text-xl font-bold mb-3">Transparency</h3>
              <p className="text-muted-foreground">
                All code is publicly available. No black boxes, no hidden algorithms. You can see exactly how Vishnu AI works.
              </p>
            </div>
            <div className="p-8 rounded-lg bg-muted/50 border border-border/40 text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3">Community Driven</h3>
              <p className="text-muted-foreground">
                Built by developers, for developers. Anyone can contribute, suggest features, or report issues.
              </p>
            </div>
            <div className="p-8 rounded-lg bg-muted/50 border border-border/40 text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-3">Privacy First</h3>
              <p className="text-muted-foreground">
                Your data stays on your device. No tracking, no analytics, no data selling. Complete privacy guaranteed.
              </p>
            </div>
          </div>
        </div>

        {/* Support the Project */}
        <div className="p-12 rounded-lg bg-muted/50 border border-border/40 text-center">
          <Heart className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Support the Project</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Vishnu AI is free and always will be. If you find it useful, consider:
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-background p-6 rounded-lg border border-border/40">
              <h3 className="font-bold mb-2">⭐ Star on GitHub</h3>
              <p className="text-sm text-muted-foreground">Help us grow by starring the repository</p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border/40">
              <h3 className="font-bold mb-2">🤝 Contribute</h3>
              <p className="text-sm text-muted-foreground">Submit bug fixes, features, or documentation</p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border/40">
              <h3 className="font-bold mb-2">📢 Spread the Word</h3>
              <p className="text-sm text-muted-foreground">Share Vishnu AI with friends and colleagues</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="p-6 rounded-lg bg-muted/50 border border-border/40">
              <h3 className="text-xl font-bold mb-2">Is it really free?</h3>
              <p className="text-muted-foreground">Yes! 100% free, no credit card required, no hidden fees. The code is open source under MIT license.</p>
            </div>
            <div className="p-6 rounded-lg bg-muted/50 border border-border/40">
              <h3 className="text-xl font-bold mb-2">Can I use it for commercial purposes?</h3>
              <p className="text-muted-foreground">Absolutely! You can use, modify, and distribute Vishnu AI for any purpose, including commercial use.</p>
            </div>
            <div className="p-6 rounded-lg bg-muted/50 border border-border/40">
              <h3 className="text-xl font-bold mb-2">How can I self-host it?</h3>
              <p className="text-muted-foreground">Clone the GitHub repository, set up your API keys, and deploy to any hosting platform. Full instructions in our <NavLink to="/docs" className="text-primary hover:underline">documentation</NavLink>.</p>
            </div>
            <div className="p-6 rounded-lg bg-muted/50 border border-border/40">
              <h3 className="text-xl font-bold mb-2">Do I need API keys?</h3>
              <p className="text-muted-foreground">Yes, you'll need a Bytez API key and Google Search API. Both offer free tiers to get started.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col items-center gap-4">
            <a 
              href="https://linkedin.com/company/vishnu-aii" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span className="text-sm">Follow us on LinkedIn - Vishnu AI</span>
            </a>
            <p className="text-center text-muted-foreground text-sm">
              © 2025 Vishnu AI. All rights reserved. Open Source Project.
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Pricing;
