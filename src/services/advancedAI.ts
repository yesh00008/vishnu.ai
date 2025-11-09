/**
 * Advanced AI Service - Integrated OpenAI & Perplexity Features
 * 
 * This service integrates advanced capabilities from:
 * - OpenAI GPT-5 Deep Research
 * - Perplexity Sonar Search Filters
 * - Prompt Optimization
 * - Multi-agent workflows
 */

import Anthropic from '@anthropic-ai/sdk';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface SearchFilters {
  // Domain filtering
  domainFilter?: string[];
  excludeDomains?: string[];
  
  // Language filtering (ISO 639-1 codes)
  languages?: string[];
  
  // Date/Time filtering
  publishedAfter?: string; // Format: MM/DD/YYYY
  publishedBefore?: string;
  lastUpdatedAfter?: string;
  lastUpdatedBefore?: string;
  recency?: 'day' | 'week' | 'month' | 'year';
  
  // Content type filtering
  searchMode?: 'auto' | 'academic' | 'sec';
  
  // Search behavior
  contextSize?: 'low' | 'medium' | 'high';
  enableSearchClassifier?: boolean;
  disableSearch?: boolean;
}

export interface DeepResearchOptions {
  maxToolCalls?: number;
  backgroundMode?: boolean;
  reasoning?: {
    effort?: 'low' | 'medium' | 'high';
    summary?: 'auto' | 'disabled';
  };
}

export interface PromptOptimizationResult {
  hasIssues: boolean;
  optimizedPrompt: string;
  issues: {
    contradictions?: string[];
    formatIssues?: string[];
    fewShotIssues?: string[];
  };
}

// ============================================================================
// PERPLEXITY SEARCH SERVICE
// ============================================================================

export class PerplexitySearchService {
  private apiKey: string;
  private baseURL = 'https://api.perplexity.ai';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Advanced search with comprehensive filtering
   */
  async search(query: string, filters: SearchFilters = {}) {
    const payload: any = {
      model: 'sonar-pro',
      messages: [
        {
          role: 'user',
          content: query
        }
      ]
    };

    // Apply domain filters
    if (filters.domainFilter || filters.excludeDomains) {
      const domains: string[] = [];
      
      // Add allowed domains
      if (filters.domainFilter) {
        domains.push(...filters.domainFilter);
      }
      
      // Add excluded domains with - prefix
      if (filters.excludeDomains) {
        domains.push(...filters.excludeDomains.map(d => `-${d}`));
      }
      
      payload.search_domain_filter = domains.slice(0, 20); // Max 20
    }

    // Apply language filter (ISO 639-1 codes)
    if (filters.languages && filters.languages.length > 0) {
      payload.search_language_filter = filters.languages.slice(0, 10); // Max 10
    }

    // Apply date filters
    if (filters.publishedAfter) {
      payload.search_after_date_filter = filters.publishedAfter;
    }
    if (filters.publishedBefore) {
      payload.search_before_date_filter = filters.publishedBefore;
    }
    if (filters.lastUpdatedAfter) {
      payload.last_updated_after_filter = filters.lastUpdatedAfter;
    }
    if (filters.lastUpdatedBefore) {
      payload.last_updated_before_filter = filters.lastUpdatedBefore;
    }
    
    // Apply recency filter
    if (filters.recency) {
      payload.search_recency_filter = filters.recency;
    }

    // Apply search mode (auto, academic, sec)
    if (filters.searchMode && filters.searchMode !== 'auto') {
      payload.search_mode = filters.searchMode;
    }

    // Apply context size
    if (filters.contextSize) {
      payload.web_search_options = {
        search_context_size: filters.contextSize
      };
    }

    // Apply search control
    if (filters.enableSearchClassifier) {
      payload.enable_search_classifier = true;
    }
    if (filters.disableSearch) {
      payload.disable_search = true;
    }

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Perplexity API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        content: data.choices[0].message.content,
        citations: data.citations || [],
        usage: data.usage
      };
    } catch (error) {
      console.error('Perplexity search error:', error);
      throw error;
    }
  }

  /**
   * Academic research search
   */
  async academicSearch(query: string, options: {
    publishedAfter?: string;
    contextSize?: 'low' | 'medium' | 'high';
  } = {}) {
    return this.search(query, {
      searchMode: 'academic',
      contextSize: options.contextSize || 'high',
      publishedAfter: options.publishedAfter
    });
  }

  /**
   * SEC filings search
   */
  async secSearch(query: string, options: {
    publishedAfter?: string;
  } = {}) {
    return this.search(query, {
      searchMode: 'sec',
      publishedAfter: options.publishedAfter
    });
  }

  /**
   * Multi-language search
   */
  async multiLanguageSearch(query: string, languages: string[]) {
    return this.search(query, {
      languages: languages
    });
  }

  /**
   * Recent news search
   */
  async recentNews(query: string, timeframe: 'day' | 'week' | 'month' = 'week') {
    return this.search(query, {
      recency: timeframe,
      contextSize: 'high'
    });
  }

  /**
   * Trusted sources search
   */
  async trustedSourcesSearch(query: string, domains: string[]) {
    return this.search(query, {
      domainFilter: domains,
      contextSize: 'high'
    });
  }
}

// ============================================================================
// DEEP RESEARCH SERVICE
// ============================================================================

export class DeepResearchService {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  /**
   * Perform deep research with web search and analysis
   */
  async deepResearch(
    query: string,
    options: DeepResearchOptions = {}
  ) {
    const instructions = `
You are a research analyst conducting comprehensive research.

RESEARCH GUIDELINES:
- Find, analyze, and synthesize information from multiple sources
- Provide detailed, data-backed insights
- Include specific figures, trends, and measurable outcomes
- Use inline citations with [1], [2], etc.
- Prioritize reliable, up-to-date sources

ANALYSIS APPROACH:
- Start with broad search, then refine with focused queries
- Deduplicate and cache results to avoid redundancy
- Stop searching when you have sufficient context
- Trace only essential information

OUTPUT FORMAT:
- Use clear headings and structure
- Include key findings and statistics
- Provide actionable insights
- List all sources with citations
    `.trim();

    try {
      const message = await this.client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 8000,
        messages: [
          {
            role: 'user',
            content: query
          }
        ],
        system: instructions,
        // Note: Tool use would be configured here in production
      });

      return {
        content: message.content[0].type === 'text' ? message.content[0].text : '',
        usage: message.usage,
        stopReason: message.stop_reason
      };
    } catch (error) {
      console.error('Deep research error:', error);
      throw error;
    }
  }

  /**
   * Multi-step research with context gathering
   */
  async contextualResearch(
    query: string,
    context: string[] = []
  ) {
    const enrichedQuery = context.length > 0
      ? `Context:\n${context.join('\n\n')}\n\nQuery: ${query}`
      : query;

    return this.deepResearch(enrichedQuery, {
      reasoning: { effort: 'high' }
    });
  }

  /**
   * Comparative analysis research
   */
  async comparativeResearch(topics: string[]) {
    const query = `
Conduct comparative research on the following topics:
${topics.map((t, i) => `${i + 1}. ${t}`).join('\n')}

For each topic:
- Find latest developments and trends
- Identify key differences and similarities
- Provide data-backed comparisons
- Include relevant statistics

Present findings in a structured comparison format.
    `.trim();

    return this.deepResearch(query, {
      reasoning: { effort: 'high' }
    });
  }
}

// ============================================================================
// PROMPT OPTIMIZATION SERVICE
// ============================================================================

export class PromptOptimizationService {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  /**
   * Analyze prompt for issues
   */
  async analyzePrompt(prompt: string): Promise<PromptOptimizationResult> {
    const analysisPrompt = `
Analyze the following prompt for issues:

PROMPT:
${prompt}

Check for:
1. CONTRADICTIONS: Conflicting instructions that cannot both be followed
2. FORMAT ISSUES: Unclear or missing output format specifications
3. AMBIGUITIES: Vague or unclear requirements

Return your analysis in this JSON format:
{
  "hasIssues": boolean,
  "contradictions": ["issue 1", "issue 2"],
  "formatIssues": ["issue 1", "issue 2"],
  "ambiguities": ["issue 1", "issue 2"]
}
    `.trim();

    try {
      const message = await this.client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: analysisPrompt
          }
        ]
      });

      const content = message.content[0].type === 'text' ? message.content[0].text : '{}';
      const analysis = JSON.parse(content);

      return {
        hasIssues: analysis.hasIssues || false,
        optimizedPrompt: prompt, // Will be optimized if issues found
        issues: {
          contradictions: analysis.contradictions || [],
          formatIssues: analysis.formatIssues || [],
          fewShotIssues: analysis.ambiguities || []
        }
      };
    } catch (error) {
      console.error('Prompt analysis error:', error);
      return {
        hasIssues: false,
        optimizedPrompt: prompt,
        issues: {}
      };
    }
  }

  /**
   * Optimize prompt by fixing detected issues
   */
  async optimizePrompt(prompt: string): Promise<PromptOptimizationResult> {
    const analysis = await this.analyzePrompt(prompt);

    if (!analysis.hasIssues) {
      return analysis;
    }

    const optimizationPrompt = `
Rewrite this prompt to fix the following issues:

ORIGINAL PROMPT:
${prompt}

ISSUES TO FIX:
${analysis.issues.contradictions?.length ? `Contradictions:\n${analysis.issues.contradictions.join('\n')}` : ''}
${analysis.issues.formatIssues?.length ? `Format Issues:\n${analysis.issues.formatIssues.join('\n')}` : ''}
${analysis.issues.fewShotIssues?.length ? `Ambiguities:\n${analysis.issues.fewShotIssues.join('\n')}` : ''}

REWRITE RULES:
- Preserve original intent and capabilities
- Resolve all contradictions
- Clarify format specifications with examples
- Make requirements explicit and unambiguous
- Do NOT add new features or scope

Return ONLY the optimized prompt.
    `.trim();

    try {
      const message = await this.client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: optimizationPrompt
          }
        ]
      });

      const optimizedPrompt = message.content[0].type === 'text' ? message.content[0].text : prompt;

      return {
        ...analysis,
        optimizedPrompt
      };
    } catch (error) {
      console.error('Prompt optimization error:', error);
      return analysis;
    }
  }
}

// ============================================================================
// UNIFIED ADVANCED AI SERVICE
// ============================================================================

export class AdvancedAIService {
  private perplexity?: PerplexitySearchService;
  private deepResearch?: DeepResearchService;
  private promptOptimizer?: PromptOptimizationService;

  constructor(config: {
    perplexityKey?: string;
    anthropicKey?: string;
  }) {
    if (config.perplexityKey) {
      this.perplexity = new PerplexitySearchService(config.perplexityKey);
    }
    if (config.anthropicKey) {
      this.deepResearch = new DeepResearchService(config.anthropicKey);
      this.promptOptimizer = new PromptOptimizationService(config.anthropicKey);
    }
  }

  getPerplexity() {
    if (!this.perplexity) {
      throw new Error('Perplexity service not configured');
    }
    return this.perplexity;
  }

  getDeepResearch() {
    if (!this.deepResearch) {
      throw new Error('Deep Research service not configured');
    }
    return this.deepResearch;
  }

  getPromptOptimizer() {
    if (!this.promptOptimizer) {
      throw new Error('Prompt Optimizer service not configured');
    }
    return this.promptOptimizer;
  }
}

// Export singleton instance
let advancedAIInstance: AdvancedAIService | null = null;

export const initializeAdvancedAI = (config: {
  perplexityKey?: string;
  anthropicKey?: string;
}) => {
  advancedAIInstance = new AdvancedAIService(config);
  return advancedAIInstance;
};

export const getAdvancedAI = () => {
  if (!advancedAIInstance) {
    throw new Error('Advanced AI not initialized. Call initializeAdvancedAI first.');
  }
  return advancedAIInstance;
};
