import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Book, Zap, Code, Database, Shield, Rocket, ChevronRight, Settings, FileCode, GitBranch, Cloud, Users, AlertCircle, Sparkles, Search, Brain } from 'lucide-react';
import { Navbar } from "@/components/Navbar";

export default function Docs() {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: Book },
    { id: 'quickstart', title: 'Quick Start', icon: Zap },
    { id: 'advanced', title: 'Advanced Features', icon: Sparkles },
    { id: 'installation', title: 'Installation', icon: Code },
    { id: 'configuration', title: 'Configuration', icon: Settings },
    { id: 'features', title: 'Features', icon: FileCode },
    { id: 'api', title: 'API Reference', icon: Database },
    { id: 'bestpractices', title: 'Best Practices', icon: GitBranch },
    { id: 'security', title: 'Security', icon: Shield },
    { id: 'deployment', title: 'Deployment', icon: Rocket },
    { id: 'troubleshooting', title: 'Troubleshooting', icon: AlertCircle },
    { id: 'contributing', title: 'Contributing', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="border-b border-border/40 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Documentation</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
            Everything you need to know about Vishnu AI. Learn how to get started, integrate with your workflow, and build powerful research applications.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex gap-8 lg:gap-12">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="sticky top-8 space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {section.title}
                  </button>
                );
              })}
            </nav>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="prose prose-slate max-w-none">
              {activeSection === 'introduction' && (
                <section id="introduction">
                  <h2 className="text-3xl font-bold text-foreground mb-6">Introduction</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Vishnu AI is an advanced research assistant that helps you find, analyze, and synthesize information from across the web. Built with cutting-edge AI technology, it provides accurate, sourced answers to your research questions.
                  </p>
                  
                  <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">Key Features</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">AI-Powered Research:</strong> Advanced natural language processing to understand complex queries</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Source Citations:</strong> Every answer includes verifiable sources and references</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Real-time Data:</strong> Access to current information from across the internet</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Privacy First:</strong> Your research queries and data remain private and secure</span>
                    </li>
                  </ul>

                  <div className="mt-8 p-6 bg-muted/50 rounded-lg border border-border/40">
                    <h4 className="text-lg font-semibold text-foreground mb-3">Getting Started</h4>
                    <p className="text-muted-foreground mb-4">
                      Ready to start researching? Jump to the <button onClick={() => setActiveSection('quickstart')} className="text-primary hover:underline font-medium">Quick Start Guide</button> to begin using Vishnu AI in minutes.
                    </p>
                  </div>
                </section>
              )}

              {activeSection === 'quickstart' && (
                <section id="quickstart">
                  <h2 className="text-3xl font-bold text-foreground mb-6">Quick Start</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Get up and running with Vishnu AI in just a few steps. Follow this guide to start your first research query.
                  </p>

                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-lg">1</div>
                        <h3 className="text-xl font-semibold text-foreground">Create an Account</h3>
                      </div>
                      <div className="ml-14 p-4 bg-muted/30 rounded-lg border border-border/40">
                        <p className="text-muted-foreground mb-3">Sign up for a free account to get started:</p>
                        <NavLink to="/signup" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                          Sign Up Now
                          <ChevronRight className="h-4 w-4" />
                        </NavLink>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-lg">2</div>
                        <h3 className="text-xl font-semibold text-foreground">Navigate to Research</h3>
                      </div>
                      <div className="ml-14 p-4 bg-muted/30 rounded-lg border border-border/40">
                        <p className="text-muted-foreground">
                          Go to the <NavLink to="/research" className="text-primary hover:underline font-medium">Research page</NavLink> from the navigation menu.
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-lg">3</div>
                        <h3 className="text-xl font-semibold text-foreground">Enter Your Query</h3>
                      </div>
                      <div className="ml-14 p-4 bg-muted/30 rounded-lg border border-border/40">
                        <p className="text-muted-foreground mb-3">Type your research question in natural language. For example:</p>
                        <div className="bg-background p-3 rounded border border-border/40 font-mono text-sm text-foreground">
                          "What are the latest developments in quantum computing?"
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-lg">4</div>
                        <h3 className="text-xl font-semibold text-foreground">Review Results</h3>
                      </div>
                      <div className="ml-14 p-4 bg-muted/30 rounded-lg border border-border/40">
                        <p className="text-muted-foreground">
                          Vishnu AI will analyze multiple sources and provide a comprehensive answer with citations. Click on sources to verify information.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {activeSection === 'advanced' && (
                <section id="advanced">
                  <h2 className="text-3xl font-bold text-foreground mb-6">Advanced Features</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Unlock the full potential of vishnu.ai with advanced search filters, deep research capabilities, and prompt optimization tools powered by cutting-edge AI models.
                  </p>

                  <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Search className="w-6 h-6 text-primary" />
                    Advanced Search with Perplexity
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Vishnu.ai integrates with Perplexity Sonar API to provide advanced search capabilities with sophisticated filtering options.
                  </p>

                  <div className="space-y-6 mb-8">
                    <div className="bg-muted/30 rounded-lg p-6 border border-border/40">
                      <h4 className="text-xl font-semibold text-foreground mb-3">Domain Filtering</h4>
                      <p className="text-muted-foreground mb-4">
                        Control which domains are included or excluded from search results (max 20 domains).
                      </p>
                      <div className="bg-background p-4 rounded-lg border border-border/40">
                        <pre className="text-sm text-foreground overflow-x-auto">
                          <code>{`import { getAdvancedAI } from '@/services/advancedAI';

const ai = getAdvancedAI();

// Search only trusted sources
const results = await ai.perplexity.search(
  "latest AI developments",
  {
    domainFilter: {
      allowList: [
        "arxiv.org",
        "nature.com",
        "sciencedirect.com",
        "ieee.org"
      ]
    }
  }
);`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-6 border border-border/40">
                      <h4 className="text-xl font-semibold text-foreground mb-3">Language Filtering</h4>
                      <p className="text-muted-foreground mb-4">
                        Search in multiple languages using ISO 639-1 language codes (max 10 languages).
                      </p>
                      <div className="bg-background p-4 rounded-lg border border-border/40 mb-4">
                        <pre className="text-sm text-foreground overflow-x-auto">
                          <code>{`// Multi-language search
const results = await ai.perplexity.search(
  "climate change research",
  {
    languageFilter: ["en", "es", "fr", "de"],
    contextSize: "high"
  }
);`}</code>
                        </pre>
                      </div>
                      
                      <h5 className="font-semibold text-foreground mb-3">Supported Languages:</h5>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span><code>en</code> - English</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span><code>es</code> - Spanish</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span><code>fr</code> - French</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span><code>de</code> - German</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span><code>zh</code> - Chinese</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span><code>ja</code> - Japanese</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span><code>ko</code> - Korean</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span><code>ar</code> - Arabic</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span><code>ru</code> - Russian</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span><code>pt</code> - Portuguese</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span><code>it</code> - Italian</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span><code>nl</code> - Dutch</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-6 border border-border/40">
                      <h4 className="text-xl font-semibold text-foreground mb-3">Academic & Research Mode</h4>
                      <p className="text-muted-foreground mb-4">
                        Search scholarly sources including peer-reviewed papers, academic journals, and research institutions.
                      </p>
                      <div className="bg-background p-4 rounded-lg border border-border/40">
                        <pre className="text-sm text-foreground overflow-x-auto">
                          <code>{`// Academic search
const research = await ai.perplexity.academicSearch(
  "quantum computing applications",
  { contextSize: "high" }
);

// Returns peer-reviewed sources with citations
console.log(research.citations);`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-6 border border-border/40">
                      <h4 className="text-xl font-semibold text-foreground mb-3">SEC Filings Search</h4>
                      <p className="text-muted-foreground mb-4">
                        Search SEC filings and financial documents for company research and analysis.
                      </p>
                      <div className="bg-background p-4 rounded-lg border border-border/40">
                        <pre className="text-sm text-foreground overflow-x-auto">
                          <code>{`// SEC filings search
const filings = await ai.perplexity.secSearch(
  "Tesla Q4 2024 earnings",
  { contextSize: "high" }
);`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-6 border border-border/40">
                      <h4 className="text-xl font-semibold text-foreground mb-3">Date Range Filtering</h4>
                      <p className="text-muted-foreground mb-4">
                        Filter results by publication date or last updated date using YYYY-MM-DD format.
                      </p>
                      <div className="bg-background p-4 rounded-lg border border-border/40">
                        <pre className="text-sm text-foreground overflow-x-auto">
                          <code>{`// Recent news from last 7 days
const news = await ai.perplexity.recentNews(
  "AI breakthroughs",
  7
);

// Custom date range
const historical = await ai.perplexity.search(
  "COVID-19 vaccine development",
  {
    dateFilter: {
      publishedAfter: "2020-01-01",
      publishedBefore: "2021-12-31"
    }
  }
);`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2 mt-12">
                    <Brain className="w-6 h-6 text-primary" />
                    Deep Research
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Conduct comprehensive multi-step research using advanced AI workflows that gather context, synthesize information, and provide inline citations.
                  </p>

                  <div className="space-y-6 mb-8">
                    <div className="bg-muted/30 rounded-lg p-6 border border-border/40">
                      <h4 className="text-xl font-semibold text-foreground mb-3">Multi-Step Research</h4>
                      <div className="bg-background p-4 rounded-lg border border-border/40">
                        <pre className="text-sm text-foreground overflow-x-auto">
                          <code>{`// Deep research with web search
const research = await ai.deepResearch.deepResearch(
  "What are the latest developments in quantum computing?",
  {
    webSearch: true,
    maxSteps: 3
  }
);

console.log(research.answer);
console.log(research.steps); // See research process
console.log(research.sources); // View all sources`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-6 border border-border/40">
                      <h4 className="text-xl font-semibold text-foreground mb-3">Contextual Research</h4>
                      <p className="text-muted-foreground mb-4">
                        Provide context from previous research or documents to get more accurate results.
                      </p>
                      <div className="bg-background p-4 rounded-lg border border-border/40">
                        <pre className="text-sm text-foreground overflow-x-auto">
                          <code>{`// Research with context
const followUp = await ai.deepResearch.contextualResearch(
  "How does this compare to classical computing?",
  [previousResearch.answer],
  { webSearch: true }
);`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-6 border border-border/40">
                      <h4 className="text-xl font-semibold text-foreground mb-3">Comparative Analysis</h4>
                      <div className="bg-background p-4 rounded-lg border border-border/40">
                        <pre className="text-sm text-foreground overflow-x-auto">
                          <code>{`// Compare multiple topics
const comparison = await ai.deepResearch.comparativeResearch(
  ["GPT-4", "Claude 3", "Gemini Pro"],
  "capabilities and limitations"
);`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2 mt-12">
                    <Sparkles className="w-6 h-6 text-primary" />
                    Prompt Optimization
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Automatically detect and fix issues in your prompts including contradictions, format problems, and ambiguities.
                  </p>

                  <div className="space-y-6 mb-8">
                    <div className="bg-muted/30 rounded-lg p-6 border border-border/40">
                      <h4 className="text-xl font-semibold text-foreground mb-3">Analyze Prompts</h4>
                      <div className="bg-background p-4 rounded-lg border border-border/40">
                        <pre className="text-sm text-foreground overflow-x-auto">
                          <code>{`// Analyze for issues
const analysis = await ai.promptOptimization.analyzePrompt(
  "Write a short detailed comprehensive brief summary"
);

console.log(analysis.contradictions);
console.log(analysis.formatIssues);
console.log(analysis.ambiguities);`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-6 border border-border/40">
                      <h4 className="text-xl font-semibold text-foreground mb-3">Optimize Automatically</h4>
                      <div className="bg-background p-4 rounded-lg border border-border/40">
                        <pre className="text-sm text-foreground overflow-x-auto">
                          <code>{`// Optimize and get improved version
const optimized = await ai.promptOptimization.optimizePrompt(
  "Write a short detailed comprehensive brief summary"
);

console.log(optimized.originalPrompt);
console.log(optimized.optimizedPrompt);
console.log(optimized.improvements); // What was fixed`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-6 border border-border/40">
                      <h4 className="text-xl font-semibold text-foreground mb-3">Common Issues Detected</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span><strong>Contradictions:</strong> Conflicting instructions like "be brief" and "be comprehensive"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span><strong>Format Issues:</strong> Unclear or missing format specifications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span><strong>Ambiguities:</strong> Vague terms that need clarification</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span><strong>Missing Context:</strong> Prompts that need additional background information</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4 mt-12">Best Practices</h3>
                  <div className="grid gap-4">
                    <div className="bg-muted/30 rounded-lg p-6 border border-border/40">
                      <h4 className="text-lg font-semibold text-foreground mb-3">Search Optimization</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span>Use domain filtering to focus on authoritative sources</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span>Set appropriate context size (low/medium/high) based on query complexity</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span>Use academic mode for research papers and scholarly sources</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span>Apply date filters for time-sensitive information</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-6 border border-border/40">
                      <h4 className="text-lg font-semibold text-foreground mb-3">Deep Research Tips</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span>Break complex questions into multiple research steps</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span>Provide context from previous research for follow-up questions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span>Always verify sources and check citations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span>Use comparative research for evaluating multiple options</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-6 border border-border/40">
                      <h4 className="text-lg font-semibold text-foreground mb-3">Prompt Engineering</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span>Run analysis on complex prompts before use</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span>Fix contradictions to get consistent results</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span>Be specific about desired format and structure</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span>Include examples in prompts for better results</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              )}

              {activeSection === 'installation' && (
                <section id="installation">
                  <h2 className="text-3xl font-bold text-foreground mb-6">Installation</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    For developers looking to integrate Vishnu AI into their applications or self-host the platform.
                  </p>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Prerequisites</h3>
                  <ul className="space-y-2 text-muted-foreground mb-8">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Node.js 18.0 or higher</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>npm or bun package manager</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Firebase account (for authentication and database)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>API keys for AI services (Mistral AI recommended)</span>
                    </li>
                  </ul>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Clone the Repository</h3>
                  <div className="bg-background p-4 rounded-lg border border-border/40 mb-8">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      <code>{`git clone https://github.com/yourusername/vishnu.ai.git
cd vishnu.ai`}</code>
                    </pre>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Install Dependencies</h3>
                  <div className="bg-background p-4 rounded-lg border border-border/40 mb-8">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      <code>{`npm install
# or
bun install`}</code>
                    </pre>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Configure Environment</h3>
                  <p className="text-muted-foreground mb-4">Create a <code className="px-2 py-1 bg-muted rounded text-sm">.env</code> file in the root directory:</p>
                  <div className="bg-background p-4 rounded-lg border border-border/40 mb-8">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      <code>{`VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_MISTRAL_API_KEY=your_mistral_api_key`}</code>
                    </pre>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Start Development Server</h3>
                  <div className="bg-background p-4 rounded-lg border border-border/40 mb-8">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      <code>{`npm run dev
# or
bun dev`}</code>
                    </pre>
                  </div>

                  <p className="text-muted-foreground">
                    The application will be available at <code className="px-2 py-1 bg-muted rounded text-sm">http://localhost:5173</code>
                  </p>
                </section>
              )}

              {activeSection === 'configuration' && (
                <section id="configuration">
                  <h2 className="text-3xl font-bold text-foreground mb-6">Configuration</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Customize Vishnu AI to match your specific requirements and integrate with your existing infrastructure.
                  </p>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Environment Variables</h3>
                  <p className="text-muted-foreground mb-4">Configure the following environment variables for optimal functionality:</p>
                  
                  <div className="space-y-6 mb-8">
                    <div className="p-4 bg-muted/30 rounded-lg border border-border/40">
                      <h4 className="font-semibold text-foreground mb-2">Firebase Configuration</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><code className="px-2 py-1 bg-background rounded">VITE_FIREBASE_API_KEY</code> - Your Firebase API key</li>
                        <li><code className="px-2 py-1 bg-background rounded">VITE_FIREBASE_AUTH_DOMAIN</code> - Firebase auth domain</li>
                        <li><code className="px-2 py-1 bg-background rounded">VITE_FIREBASE_PROJECT_ID</code> - Firebase project ID</li>
                        <li><code className="px-2 py-1 bg-background rounded">VITE_FIREBASE_STORAGE_BUCKET</code> - Firebase storage bucket</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-lg border border-border/40">
                      <h4 className="font-semibold text-foreground mb-2">AI Service Configuration</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><code className="px-2 py-1 bg-background rounded">VITE_MISTRAL_API_KEY</code> - Mistral AI API key for natural language processing</li>
                        <li><code className="px-2 py-1 bg-background rounded">VITE_GOOGLE_SEARCH_API_KEY</code> - Google Custom Search API key</li>
                        <li><code className="px-2 py-1 bg-background rounded">VITE_GOOGLE_SEARCH_ENGINE_ID</code> - Google Custom Search Engine ID</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Application Settings</h3>
                  <p className="text-muted-foreground mb-4">Customize application behavior through configuration files:</p>
                  
                  <div className="bg-background p-4 rounded-lg border border-border/40 mb-8">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      <code>{`// config/app.config.ts
export const appConfig = {
  maxSearchResults: 10,
  searchTimeout: 30000, // 30 seconds
  enableCaching: true,
  cacheExpiration: 3600000, // 1 hour
  maxConcurrentRequests: 5,
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
};`}</code>
                    </pre>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Search Configuration</h3>
                  <p className="text-muted-foreground mb-4">Configure search behavior and result processing:</p>
                  
                  <div className="bg-background p-4 rounded-lg border border-border/40 mb-4">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      <code>{`// config/search.config.ts
export const searchConfig = {
  providers: ['google', 'bing', 'duckduckgo'],
  filters: {
    language: 'en',
    region: 'us',
    safeSearch: 'moderate'
  },
  ranking: {
    relevanceWeight: 0.6,
    freshnessWeight: 0.2,
    authorityWeight: 0.2
  }
};`}</code>
                    </pre>
                  </div>
                </section>
              )}

              {activeSection === 'features' && (
                <section id="features">
                  <h2 className="text-3xl font-bold text-foreground mb-6">Features</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Explore the powerful features that make Vishnu AI your ultimate research companion.
                  </p>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">AI-Powered Search</h3>
                  <p className="text-muted-foreground mb-4">
                    Advanced natural language understanding processes your queries to deliver precise, contextually relevant results.
                  </p>
                  <ul className="space-y-3 text-muted-foreground mb-8">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Semantic Search:</strong> Understands the meaning behind your queries, not just keywords</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Multi-Source Aggregation:</strong> Searches across 15+ sources simultaneously</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Real-time Streaming:</strong> Results appear as they're discovered, no waiting</span>
                    </li>
                  </ul>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Source Verification</h3>
                  <p className="text-muted-foreground mb-4">
                    Every result includes comprehensive source attribution and credibility indicators.
                  </p>
                  <div className="bg-background p-4 rounded-lg border border-border/40 mb-8">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      <code>{`// Example: Source metadata
{
  "title": "Research Paper Title",
  "url": "https://example.com/paper",
  "domain": "example.com",
  "publishDate": "2024-01-15",
  "author": "Dr. Jane Smith",
  "credibilityScore": 0.95,
  "citations": 342
}`}</code>
                    </pre>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Smart Caching</h3>
                  <p className="text-muted-foreground mb-4">
                    Intelligent caching system reduces API calls and improves response times for frequently accessed queries.
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-8">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>LocalStorage-based caching for instant retrieval</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Configurable cache expiration policies</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Automatic cache invalidation for stale data</span>
                    </li>
                  </ul>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Export & Share</h3>
                  <p className="text-muted-foreground mb-4">
                    Export your research results in multiple formats or share them with your team.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="p-4 bg-muted/30 rounded-lg border border-border/40">
                      <h4 className="font-semibold text-foreground mb-2">Markdown</h4>
                      <p className="text-sm text-muted-foreground">Export as markdown with proper formatting and citations</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg border border-border/40">
                      <h4 className="font-semibold text-foreground mb-2">JSON</h4>
                      <p className="text-sm text-muted-foreground">Structured data export for further processing</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg border border-border/40">
                      <h4 className="font-semibold text-foreground mb-2">PDF</h4>
                      <p className="text-sm text-muted-foreground">Print-ready documents with formatted citations</p>
                    </div>
                  </div>
                </section>
              )}

              {activeSection === 'bestpractices' && (
                <section id="bestpractices">
                  <h2 className="text-3xl font-bold text-foreground mb-6">Best Practices</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Follow these guidelines to get the most out of Vishnu AI and ensure optimal performance.
                  </p>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Query Formulation</h3>
                  <div className="space-y-4 mb-8">
                    <div className="p-4 bg-muted/30 rounded-lg border border-border/40">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <span className="text-green-500">✓</span> Good: Specific and contextual
                      </h4>
                      <code className="text-sm text-muted-foreground">
                        "What are the latest advancements in quantum computing for cryptography applications published in 2024?"
                      </code>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg border border-border/40">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <span className="text-red-500">✗</span> Avoid: Too vague or broad
                      </h4>
                      <code className="text-sm text-muted-foreground">
                        "quantum computing"
                      </code>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Performance Optimization</h3>
                  <ul className="space-y-3 text-muted-foreground mb-8">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Enable Caching:</strong> Reduce API calls by enabling smart caching for frequently searched topics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Batch Queries:</strong> When possible, combine related searches into a single comprehensive query</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Filter Early:</strong> Use date ranges and domain filters to narrow results and improve relevance</span>
                    </li>
                  </ul>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Source Verification</h3>
                  <p className="text-muted-foreground mb-4">
                    Always verify critical information from multiple sources:
                  </p>
                  <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 mb-8">
                    <h4 className="font-semibold text-foreground mb-3">Verification Checklist</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>✓ Check publication date and author credentials</li>
                      <li>✓ Cross-reference with at least 2-3 other sources</li>
                      <li>✓ Verify domain authority and reputation</li>
                      <li>✓ Look for peer-reviewed or cited sources</li>
                      <li>✓ Be aware of potential bias or conflicts of interest</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">API Usage Guidelines</h3>
                  <p className="text-muted-foreground mb-4">
                    Respect rate limits and implement proper error handling:
                  </p>
                  <div className="bg-background p-4 rounded-lg border border-border/40 mb-4">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      <code>{`// Example: Proper error handling
try {
  const results = await searchAPI.query(query);
  processResults(results);
} catch (error) {
  if (error.code === 'RATE_LIMIT_EXCEEDED') {
    await delay(error.retryAfter);
    return retry();
  }
  handleError(error);
}`}</code>
                    </pre>
                  </div>
                </section>
              )}

              {activeSection === 'api' && (
                <section id="api">
                  <h2 className="text-3xl font-bold text-foreground mb-6">API Reference</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Comprehensive API documentation for integrating Vishnu AI into your applications.
                  </p>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Research Query</h3>
                  <div className="bg-background p-4 rounded-lg border border-border/40 mb-6">
                    <p className="text-sm text-muted-foreground mb-2">POST</p>
                    <code className="text-foreground">/api/research</code>
                  </div>
                  <p className="text-muted-foreground mb-4">Submit a research query and receive AI-generated analysis with sources.</p>
                  
                  <h4 className="text-lg font-semibold text-foreground mb-3">Request Body</h4>
                  <div className="bg-background p-4 rounded-lg border border-border/40 mb-6">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      <code>{`{
  "query": "string",
  "maxSources": "number (optional, default: 10)",
  "depth": "shallow | medium | deep (optional, default: medium)"
}`}</code>
                    </pre>
                  </div>

                  <h4 className="text-lg font-semibold text-foreground mb-3">Response</h4>
                  <div className="bg-background p-4 rounded-lg border border-border/40 mb-8">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      <code>{`{
  "answer": "string",
  "sources": [
    {
      "title": "string",
      "url": "string",
      "snippet": "string"
    }
  ],
  "confidence": "number (0-1)"
}`}</code>
                    </pre>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4 mt-12">Authentication</h3>
                  <p className="text-muted-foreground mb-4">
                    All API requests require authentication using Firebase ID tokens. Include the token in the Authorization header:
                  </p>
                  <div className="bg-background p-4 rounded-lg border border-border/40 mb-8">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      <code>{`Authorization: Bearer <your_firebase_id_token>`}</code>
                    </pre>
                  </div>
                </section>
              )}

              {activeSection === 'security' && (
                <section id="security">
                  <h2 className="text-3xl font-bold text-foreground mb-6">Security</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    We take security and privacy seriously. Here's how we protect your data and ensure safe usage.
                  </p>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Data Privacy</h3>
                  <ul className="space-y-3 text-muted-foreground mb-8">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Your research queries are processed securely and not shared with third parties</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>All data transmission is encrypted using industry-standard TLS protocols</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Search history can be deleted at any time from your profile</span>
                    </li>
                  </ul>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Authentication</h3>
                  <p className="text-muted-foreground mb-4">
                    We use Firebase Authentication to provide secure, reliable user authentication with support for:
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-8">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Email and password authentication</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>OAuth providers (Google, GitHub, etc.)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Multi-factor authentication (MFA) support</span>
                    </li>
                  </ul>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">API Security</h3>
                  <p className="text-muted-foreground mb-4">
                    All API endpoints are protected with:
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-8">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Rate limiting to prevent abuse</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Request validation and sanitization</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>CORS policies for cross-origin requests</span>
                    </li>
                  </ul>

                  <div className="mt-8 p-6 bg-muted/50 rounded-lg border border-border/40">
                    <h4 className="text-lg font-semibold text-foreground mb-3">Report Security Issues</h4>
                    <p className="text-muted-foreground">
                      If you discover a security vulnerability, please email us at <a href="mailto:security@vishnu.ai" className="text-primary hover:underline">security@vishnu.ai</a>. We appreciate responsible disclosure.
                    </p>
                  </div>
                </section>
              )}

              {activeSection === 'deployment' && (
                <section id="deployment">
                  <h2 className="text-3xl font-bold text-foreground mb-6">Deployment</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Deploy Vishnu AI to production environments using these recommended platforms and configurations.
                  </p>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Build for Production</h3>
                  <div className="bg-background p-4 rounded-lg border border-border/40 mb-8">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      <code>{`npm run build
# or
bun run build`}</code>
                    </pre>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Vercel Deployment</h3>
                  <p className="text-muted-foreground mb-4">Recommended for quick deployments:</p>
                  <div className="space-y-4 mb-8">
                    <div className="p-4 bg-muted/30 rounded-lg border border-border/40">
                      <p className="text-sm font-medium text-foreground mb-2">1. Install Vercel CLI</p>
                      <code className="text-sm text-muted-foreground">npm i -g vercel</code>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg border border-border/40">
                      <p className="text-sm font-medium text-foreground mb-2">2. Deploy</p>
                      <code className="text-sm text-muted-foreground">vercel</code>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Firebase Hosting</h3>
                  <p className="text-muted-foreground mb-4">Deploy alongside your Firebase backend:</p>
                  <div className="bg-background p-4 rounded-lg border border-border/40 mb-8">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      <code>{`firebase init hosting
firebase deploy --only hosting`}</code>
                    </pre>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Environment Variables</h3>
                  <p className="text-muted-foreground mb-4">
                    Ensure all environment variables are configured in your deployment platform:
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-8">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><code className="px-2 py-1 bg-muted rounded text-sm">VITE_FIREBASE_API_KEY</code></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><code className="px-2 py-1 bg-muted rounded text-sm">VITE_FIREBASE_AUTH_DOMAIN</code></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><code className="px-2 py-1 bg-muted rounded text-sm">VITE_FIREBASE_PROJECT_ID</code></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><code className="px-2 py-1 bg-muted rounded text-sm">VITE_MISTRAL_API_KEY</code></span>
                    </li>
                  </ul>

                  <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
                    <h4 className="text-lg font-semibold text-foreground mb-3">Performance Tips</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Enable compression for static assets</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Configure CDN for faster global delivery</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Set appropriate cache headers for static files</span>
                      </li>
                    </ul>
                  </div>
                </section>
              )}

              {activeSection === 'troubleshooting' && (
                <section id="troubleshooting">
                  <h2 className="text-3xl font-bold text-foreground mb-6">Troubleshooting</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Common issues and their solutions to help you resolve problems quickly.
                  </p>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">API Connection Issues</h3>
                  <div className="space-y-4 mb-8">
                    <div className="p-4 bg-muted/30 rounded-lg border border-border/40">
                      <h4 className="font-semibold text-foreground mb-2">Problem: "API Key Invalid" Error</h4>
                      <p className="text-sm text-muted-foreground mb-3">The application cannot authenticate with the AI service.</p>
                      <p className="text-sm font-semibold text-foreground mb-2">Solution:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Verify your API key is correctly set in the <code className="px-2 py-1 bg-background rounded">.env</code> file</li>
                        <li>• Ensure there are no extra spaces or quotes around the API key</li>
                        <li>• Check if the API key has the required permissions</li>
                        <li>• Regenerate the API key from your provider's dashboard if needed</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-lg border border-border/40">
                      <h4 className="font-semibold text-foreground mb-2">Problem: Rate Limit Exceeded</h4>
                      <p className="text-sm text-muted-foreground mb-3">Too many requests sent to the API in a short time.</p>
                      <p className="text-sm font-semibold text-foreground mb-2">Solution:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Enable caching to reduce API calls</li>
                        <li>• Implement request throttling</li>
                        <li>• Upgrade to a higher API tier if available</li>
                        <li>• Wait for the rate limit window to reset (typically 60 seconds)</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Search Quality Issues</h3>
                  <div className="space-y-4 mb-8">
                    <div className="p-4 bg-muted/30 rounded-lg border border-border/40">
                      <h4 className="font-semibold text-foreground mb-2">Problem: Irrelevant Results</h4>
                      <p className="text-sm text-muted-foreground mb-3">Search results don't match the intended query.</p>
                      <p className="text-sm font-semibold text-foreground mb-2">Solution:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Make your query more specific and detailed</li>
                        <li>• Use quotes for exact phrase matching</li>
                        <li>• Add context or domain keywords</li>
                        <li>• Use filters to narrow down by date, region, or domain</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-lg border border-border/40">
                      <h4 className="font-semibold text-foreground mb-2">Problem: No Results Found</h4>
                      <p className="text-sm text-muted-foreground mb-3">The search returns empty results.</p>
                      <p className="text-sm font-semibold text-foreground mb-2">Solution:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Try alternative keywords or synonyms</li>
                        <li>• Remove overly specific filters</li>
                        <li>• Check for typos in your query</li>
                        <li>• Broaden the search scope</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Performance Issues</h3>
                  <div className="p-4 bg-muted/30 rounded-lg border border-border/40 mb-8">
                    <h4 className="font-semibold text-foreground mb-2">Problem: Slow Response Times</h4>
                    <p className="text-sm text-muted-foreground mb-3">Searches take too long to complete.</p>
                    <p className="text-sm font-semibold text-foreground mb-2">Solutions:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Enable browser caching</li>
                      <li>• Reduce the number of concurrent search sources</li>
                      <li>• Check your internet connection speed</li>
                      <li>• Clear browser cache and local storage</li>
                      <li>• Use a CDN for static assets in production</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Getting Help</h3>
                  <p className="text-muted-foreground mb-4">
                    If you're still experiencing issues:
                  </p>
                  <ul className="space-y-3 text-muted-foreground mb-8">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Check the <a href="https://github.com/yesh00008/vishnu-query-nexus/issues" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">GitHub Issues</a> for similar problems</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Join our community discussions on GitHub</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Contact support at <a href="mailto:support@vishnu.ai" className="text-primary hover:underline">support@vishnu.ai</a></span>
                    </li>
                  </ul>
                </section>
              )}

              {activeSection === 'contributing' && (
                <section id="contributing">
                  <h2 className="text-3xl font-bold text-foreground mb-6">Contributing</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    We welcome contributions from the community! Here's how you can help make Vishnu AI better.
                  </p>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Ways to Contribute</h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="p-6 bg-muted/30 rounded-lg border border-border/40">
                      <h4 className="font-semibold text-foreground mb-3">🐛 Report Bugs</h4>
                      <p className="text-sm text-muted-foreground mb-3">Found a bug? Help us fix it by reporting it on GitHub with details about:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Steps to reproduce</li>
                        <li>• Expected vs actual behavior</li>
                        <li>• Screenshots if applicable</li>
                        <li>• Browser and OS information</li>
                      </ul>
                    </div>

                    <div className="p-6 bg-muted/30 rounded-lg border border-border/40">
                      <h4 className="font-semibold text-foreground mb-3">💡 Suggest Features</h4>
                      <p className="text-sm text-muted-foreground mb-3">Have an idea for a new feature? Create a feature request with:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Clear description of the feature</li>
                        <li>• Use case and benefits</li>
                        <li>• Mockups or examples if possible</li>
                        <li>• Implementation suggestions</li>
                      </ul>
                    </div>

                    <div className="p-6 bg-muted/30 rounded-lg border border-border/40">
                      <h4 className="font-semibold text-foreground mb-3">📝 Improve Documentation</h4>
                      <p className="text-sm text-muted-foreground mb-3">Help others learn Vishnu AI by:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Fixing typos and errors</li>
                        <li>• Adding examples and tutorials</li>
                        <li>• Translating documentation</li>
                        <li>• Writing guides for common tasks</li>
                      </ul>
                    </div>

                    <div className="p-6 bg-muted/30 rounded-lg border border-border/40">
                      <h4 className="font-semibold text-foreground mb-3">🔨 Submit Code</h4>
                      <p className="text-sm text-muted-foreground mb-3">Contribute code improvements:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Bug fixes</li>
                        <li>• New features</li>
                        <li>• Performance improvements</li>
                        <li>• Test coverage</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Development Workflow</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-lg">1</div>
                      <h4 className="text-lg font-semibold text-foreground">Fork the Repository</h4>
                    </div>
                    <div className="ml-14 p-4 bg-background rounded-lg border border-border/40">
                      <code className="text-sm text-foreground">
                        git clone https://github.com/your-username/vishnu-query-nexus.git
                      </code>
                    </div>

                    <div className="flex items-center gap-4 mb-4 mt-6">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-lg">2</div>
                      <h4 className="text-lg font-semibold text-foreground">Create a Branch</h4>
                    </div>
                    <div className="ml-14 p-4 bg-background rounded-lg border border-border/40">
                      <code className="text-sm text-foreground">
                        git checkout -b feature/your-feature-name
                      </code>
                    </div>

                    <div className="flex items-center gap-4 mb-4 mt-6">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-lg">3</div>
                      <h4 className="text-lg font-semibold text-foreground">Make Your Changes</h4>
                    </div>
                    <div className="ml-14 p-4 bg-muted/30 rounded-lg border border-border/40">
                      <p className="text-sm text-muted-foreground">Follow our coding standards and write tests for new features.</p>
                    </div>

                    <div className="flex items-center gap-4 mb-4 mt-6">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-lg">4</div>
                      <h4 className="text-lg font-semibold text-foreground">Submit a Pull Request</h4>
                    </div>
                    <div className="ml-14 p-4 bg-muted/30 rounded-lg border border-border/40">
                      <p className="text-sm text-muted-foreground mb-3">Create a pull request with a clear title and description. Include:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• What changed and why</li>
                        <li>• Related issue numbers</li>
                        <li>• Screenshots for UI changes</li>
                        <li>• Test results</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">Code Guidelines</h3>
                  <ul className="space-y-3 text-muted-foreground mb-8">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">TypeScript:</strong> Use TypeScript for all new code with proper type definitions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Components:</strong> Follow React best practices and use functional components with hooks</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Styling:</strong> Use Tailwind CSS utility classes, avoid inline styles</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Testing:</strong> Write unit tests for utilities and integration tests for components</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Documentation:</strong> Document complex logic and public APIs</span>
                    </li>
                  </ul>

                  <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-foreground mb-3">📜 Code of Conduct</h4>
                    <p className="text-muted-foreground mb-3">
                      We are committed to providing a welcoming and inclusive environment. Please be respectful, professional, and constructive in all interactions.
                    </p>
                    <a href="https://github.com/yesh00008/vishnu-query-nexus/blob/main/CODE_OF_CONDUCT.md" className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                      Read our full Code of Conduct →
                    </a>
                  </div>
                </section>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
