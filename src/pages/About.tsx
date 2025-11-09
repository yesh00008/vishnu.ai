import { Navbar } from "@/components/Navbar";
import { VishnuLogo } from "@/components/VishnuLogo";
import { NavLink } from "@/components/NavLink";
import { Target, Users, Rocket, Award } from "lucide-react";

const About = () => {
  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-background text-foreground pt-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-foreground">
            About Vishnu AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Open-source AI-powered deep web search engine that democratizes access to comprehensive information
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At Vishnu AI, we're on a mission to democratize access to information. We believe that everyone deserves 
              access to accurate, comprehensive, and real-time data from across the web.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By leveraging advanced AI technology and deep web scraping capabilities, we're building the future of 
              intelligent search that goes beyond traditional search engines.
            </p>
          </div>
          <div className="p-8 rounded-2xl">
            <div className="w-32 h-32 mx-auto mb-6">
              <VishnuLogo size={128} />
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary mb-2">10M+</p>
              <p className="text-muted-foreground">Searches Performed</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl text-center hover:bg-muted/30 transition">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Accuracy</h3>
              <p className="text-muted-foreground text-sm">Delivering precise and verified information</p>
            </div>
            <div className="p-6 rounded-2xl text-center hover:bg-muted/30 transition">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">User-First</h3>
              <p className="text-muted-foreground text-sm">Designed with users at the center</p>
            </div>
            <div className="p-6 rounded-2xl text-center hover:bg-muted/30 transition">
              <Rocket className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-muted-foreground text-sm">Pushing boundaries with AI technology</p>
            </div>
            <div className="p-6 rounded-2xl text-center hover:bg-muted/30 transition">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-muted-foreground text-sm">Committed to highest quality standards</p>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Meet the Founder</h2>
          <div className="p-8 rounded-2xl max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-primary">
                  <img 
                    src="https://github.com/yesh00008.png" 
                    alt="Yashwanth Thotakura"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=Yashwanth+Thotakura&size=192&background=ff6b6b&color=fff`;
                    }}
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-2">Yashwanth Thotakura</h3>
                <p className="text-primary mb-4">Founder & Lead Developer</p>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Passionate about democratizing information access through AI and open-source technology. 
                  Vishnu AI was created to provide everyone with powerful, intelligent search capabilities 
                  that go beyond traditional search engines, combining deep web scraping with advanced AI to 
                  deliver comprehensive, accurate results.
                </p>
                <div className="flex gap-4">
                  <a 
                    href="https://www.linkedin.com/in/thotakurayashwanth/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 text-sm font-semibold transition inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a 
                    href="https://x.com/yeshhhhhh7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/20 text-white rounded-full px-6 py-2 text-sm font-semibold transition inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    X / Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Info */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">About Vishnu AI Application</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">What is Vishnu AI?</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Vishnu AI is a completely open-source, AI-powered deep web search engine that revolutionizes how 
                people discover and access information online. Unlike traditional search engines, Vishnu AI combines:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <span className="text-primary font-semibold">Deep Web Scraping:</span> Access content from the top 10 most relevant sources including news sites, academic databases, and social platforms</li>
                <li>• <span className="text-primary font-semibold">AI-Powered Analysis:</span> Qwen 2.5 72B Instruct (via Bytez.js) processes and synthesizes information to provide contextual answers</li>
                <li>• <span className="text-primary font-semibold">Real-Time Results:</span> Get the latest information as it happens with streaming responses</li>
                <li>• <span className="text-primary font-semibold">Citation Tracking:</span> Every answer includes verifiable sources</li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Open Source & Free</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Vishnu AI is built on the principles of open source and transparency. The entire codebase is 
                publicly available, allowing developers worldwide to contribute, learn, and build upon the platform.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 100% Free and Open Source</li>
                <li>• No data tracking or selling</li>
                <li>• Community-driven development</li>
                <li>• Transparent algorithms</li>
                <li>• Self-hostable</li>
              </ul>
              <NavLink to="/contributors">
                <button className="mt-6 bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 font-semibold transition">
                  View Contributors
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col items-center gap-4">
            <a 
              href="https://linkedin.com/company/vishnu-aii" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-primary transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span className="text-sm">Follow us on LinkedIn - Vishnu AI</span>
            </a>
            <p className="text-center text-gray-400 text-sm">
              © 2025 Vishnu AI. All rights reserved. Open Source Project.
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default About;
