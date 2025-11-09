import { Navbar } from "@/components/Navbar";
import { VishnuLogo } from "@/components/VishnuLogo";
import { NavLink } from "@/components/NavLink";
import { Github, Star, GitFork, Users } from "lucide-react";

const Contributors = () => {
  // This would normally come from GitHub API
  const contributors = [
    {
      name: "Yashwanth Thotakura",
      role: "Founder & Lead Developer",
      avatar: "https://github.com/yesh00008.png",
      github: "https://github.com/yesh00008",
      linkedin: "https://www.linkedin.com/in/thotakurayashwanth/",
      contributions: 1247
    }
  ];

  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-background text-foreground pt-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-primary">
            Contributors
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the amazing people making Vishnu AI possible
          </p>
        </div>

        {/* Open Source Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-lg bg-muted/50 text-center border border-border/40">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <p className="text-3xl font-bold mb-1">100+</p>
            <p className="text-muted-foreground text-sm">GitHub Stars</p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50 text-center border border-border/40">
            <GitFork className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-3xl font-bold mb-1">50+</p>
            <p className="text-muted-foreground text-sm">Forks</p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50 text-center border border-border/40">
            <Users className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <p className="text-3xl font-bold mb-1">{contributors.length}</p>
            <p className="text-muted-foreground text-sm">Contributors</p>
          </div>
          <div className="p-6 rounded-lg bg-muted/50 text-center border border-border/40">
            <Github className="w-8 h-8 text-foreground mx-auto mb-3" />
            <p className="text-3xl font-bold mb-1">1000+</p>
            <p className="text-muted-foreground text-sm">Commits</p>
          </div>
        </div>

        {/* Contributors List */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Core Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contributors.map((contributor, index) => (
              <div key={index} className="p-8 rounded-lg bg-muted/50 border border-border/40 hover:bg-muted transition group">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary">
                    <img 
                      src={contributor.avatar} 
                      alt={contributor.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(contributor.name)}&size=128&background=ff6b6b&color=fff`;
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{contributor.name}</h3>
                  <p className="text-primary text-sm mb-3">{contributor.role}</p>
                  <p className="text-muted-foreground text-sm mb-4">{contributor.contributions} contributions</p>
                  
                  <div className="flex justify-center gap-3">
                    {contributor.github && (
                      <a 
                        href={contributor.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {contributor.linkedin && (
                      <a 
                        href={contributor.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Become a Contributor */}
        <div className="p-12 rounded-lg bg-muted/50 border border-border/40 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Contribute?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Vishnu AI is completely open source! We welcome contributions from developers around the world. 
            Check out our GitHub repository to get started.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://github.com/yesh00008/vishnu-query-nexus" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-8 py-3 font-semibold transition inline-flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
            <button className="bg-muted hover:bg-muted/80 text-foreground rounded-lg px-8 py-3 font-semibold transition">
              Read Contribution Guide
            </button>
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

export default Contributors;
