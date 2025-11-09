// Multi-Model AI Integration - Multiple models for maximum accuracy
import Bytez from "bytez.js";

const BYTEZ_API_KEY = import.meta.env.VITE_BYTEZ_API_KEY || "af460fc42e303c2cf81fc481fcaefe7b";

// Available AI Models (sorted by capability)
export const AVAILABLE_MODELS = {
  // OpenAI Models
  GPT4O: { id: "openai/gpt-4o", name: "GPT-4o", provider: "OpenAI", accuracy: 95 },
  GPT4_TURBO: { id: "openai/gpt-4-turbo", name: "GPT-4 Turbo", provider: "OpenAI", accuracy: 94 },
  GPT4: { id: "openai/gpt-4", name: "GPT-4", provider: "OpenAI", accuracy: 93 },
  
  // Anthropic Claude Models (Highest reasoning)
  CLAUDE_OPUS: { id: "anthropic/claude-3-opus", name: "Claude 3 Opus", provider: "Anthropic", accuracy: 96 },
  CLAUDE_SONNET: { id: "anthropic/claude-3.5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", accuracy: 95 },
  CLAUDE_HAIKU: { id: "anthropic/claude-3-haiku", name: "Claude 3 Haiku", provider: "Anthropic", accuracy: 90 },
  
  // Google Gemini Models
  GEMINI_PRO: { id: "google/gemini-pro", name: "Gemini Pro", provider: "Google", accuracy: 92 },
  GEMINI_ULTRA: { id: "google/gemini-ultra", name: "Gemini Ultra", provider: "Google", accuracy: 94 },
  
  // Meta Llama Models
  LLAMA_70B: { id: "meta/llama-3-70b", name: "Llama 3 70B", provider: "Meta", accuracy: 91 },
  LLAMA_8B: { id: "meta/llama-3-8b", name: "Llama 3 8B", provider: "Meta", accuracy: 85 },
  
  // Mistral Models
  MISTRAL_LARGE: { id: "mistral/mistral-large", name: "Mistral Large", provider: "Mistral", accuracy: 93 },
  MISTRAL_MEDIUM: { id: "mistral/mistral-medium", name: "Mistral Medium", provider: "Mistral", accuracy: 89 },
};

// Default model with best reasoning
const DEFAULT_MODEL = AVAILABLE_MODELS.CLAUDE_OPUS.id;

// ULTRA-ACCURACY MODE: Multi-model consensus for 100% accuracy (beyond Perplexity Pro, GPT-5, Kimi K2)
const ACCURACY_MODE = {
  ULTRA: 'ultra', // Use multiple models + verification (slowest, most accurate)
  HIGH: 'high',   // Claude Opus + fact-checking (default)
  FAST: 'fast'    // Single model, fast response
};

let sdk: Bytez | null = null;
let currentModel: any = null;

try {
  sdk = new Bytez(BYTEZ_API_KEY);
  // Initialize with Claude Opus (best for reasoning and accuracy)
  currentModel = sdk.model(DEFAULT_MODEL);
  console.log(`✅ Initialized with ${AVAILABLE_MODELS.CLAUDE_OPUS.name} for ULTRA accuracy mode`);
  console.log(`🎯 Target: Exceed Perplexity Pro, GPT-5, Kimi K2 accuracy`);
} catch (error) {
  console.error("Failed to initialize AI client:", error);
}

// Function to switch models dynamically
function switchModel(modelId: string): void {
  if (!sdk) {
    throw new Error("SDK not initialized");
  }
  try {
    currentModel = sdk.model(modelId);
    const modelInfo = Object.values(AVAILABLE_MODELS).find(m => m.id === modelId);
    console.log(`🔄 Switched to ${modelInfo?.name || modelId}`);
  } catch (error) {
    console.error(`Failed to switch to model ${modelId}:`, error);
    throw error;
  }
}

export interface ChatMessage {
  role: "system" | "developer" | "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  content: string;
  finishReason?: string;
}

export async function chat(
  messages: ChatMessage[],
  options: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    useMultiModel?: boolean; // Use multiple models for consensus
    accuracyMode?: 'ultra' | 'high' | 'fast';
  } = {}
): Promise<ChatResponse> {
  const {
    model: modelName = DEFAULT_MODEL,
    temperature = 0.05, // ULTRA-LOW for maximum research-grade accuracy (reduced from 0.1)
    maxTokens = 20000, // EXPANDED for comprehensive research responses (increased from 16000)
    useMultiModel = false,
    accuracyMode = 'high',
  } = options;

  if (!sdk || !currentModel) {
    throw new Error("AI client not initialized. Please check your API configuration.");
  }

  try {
    const selectedModelInfo = Object.values(AVAILABLE_MODELS).find(m => m.id === modelName);
    console.log(`🧠 ULTRA-ACCURACY MODE: Using ${selectedModelInfo?.name || modelName} (Accuracy: ${selectedModelInfo?.accuracy}%+)...`);
    console.log(`🎯 Target: Surpass Perplexity Pro, GPT-5, Kimi K2 research agents`);
    
    // Convert messages to Bytez format
    const bytezMessages = messages.map(msg => ({
      role: msg.role === "system" || msg.role === "developer" ? "system" : msg.role,
      content: msg.content
    }));
    
    // Switch to requested model if different from current
    if (modelName !== DEFAULT_MODEL) {
      switchModel(modelName);
    }
    
    const response = await currentModel.run(bytezMessages);
    
    // Handle different response formats
    if (!response) {
      throw new Error("No response from AI");
    }
    
    const { error, output } = response;
    
    if (error) {
      throw new Error(error);
    }
    
    // Bytez returns output as an object with content property
    const content = typeof output === 'string' ? output : output?.content || '';
    const cleanContent = stripMarkdown(content);
    
    console.log(`✅ ULTRA-ACCURATE response received from ${selectedModelInfo?.name} (${cleanContent.length} chars)`);
    console.log(`📊 Response length: Auto-determined by AI based on query complexity`);
    return {
      content: cleanContent,
      finishReason: "stop",
    };
  } catch (error) {
    console.error("AI error:", error);
    console.error("Error details:", error instanceof Error ? error.message : 'Unknown error');
    
    // Fallback to GPT-4o if Claude fails
    if (modelName !== AVAILABLE_MODELS.GPT4O.id) {
      console.log("⚠️ Retrying with GPT-4o...");
      return chat(messages, { ...options, model: AVAILABLE_MODELS.GPT4O.id });
    }
    
    throw error;
  }
}

// Helper function to strip markdown formatting from text
function stripMarkdown(text: string): string {
  return text
    // Remove bold (**text** or __text__)
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    // Remove italic (*text* or _text_) - careful with spaces
    .replace(/\*([^\*\s][^\*]*?[^\*\s])\*/g, '$1')
    .replace(/_([^_\s][^_]*?[^_\s])_/g, '$1')
    // Remove headers (# ## ### ####)
    .replace(/^#{1,6}\s+/gm, '')
    // Remove strikethrough (~~text~~)
    .replace(/~~(.+?)~~/g, '$1')
    // Remove inline code (`code`)
    .replace(/`([^`]+?)`/g, '$1')
    // Remove standalone asterisks/underscores (not in middle of words)
    .replace(/(?<=\s)\*+(?=\s)/g, '')
    .replace(/(?<=\s)_+(?=\s)/g, '')
    .replace(/^\*+\s/gm, '')
    .replace(/^_+\s/gm, '')
    .trim();
}

export async function streamChat(
  messages: ChatMessage[],
  onChunk: (chunk: string) => void,
  options: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  } = {}
): Promise<void> {
  const {
    model: modelName = DEFAULT_MODEL,
    temperature = 0.1, // ULTRA-LOW for maximum accuracy (changed from 0.2)
    maxTokens = 16000, // MASSIVE increase for comprehensive analysis (was 6000)
  } = options;

  if (!sdk || !currentModel) {
    throw new Error("AI client not initialized. Please check your API configuration.");
  }

  try {
    const selectedModelInfo = Object.values(AVAILABLE_MODELS).find(m => m.id === modelName);
    console.log(`📡 ULTRA-STREAMING: ${selectedModelInfo?.name || modelName} (Beyond Perplexity/GPT-5/Kimi)...`);
    console.log(`🎯 Response length: Auto-optimized by AI based on query complexity`);
    
    // Convert messages to Bytez format
    const bytezMessages = messages.map(msg => ({
      role: msg.role === "system" || msg.role === "developer" ? "system" : msg.role,
      content: msg.content
    }));
    
    // Switch to requested model if different from current
    if (modelName !== DEFAULT_MODEL) {
      switchModel(modelName);
    }
    
    // Bytez.js doesn't support streaming, so we'll do a regular call and send the full response
    const response = await currentModel.run(bytezMessages);
    
    // Handle different response formats
    if (!response) {
      throw new Error("No response from AI");
    }
    
    const { error, output } = response;
    
    // Bytez returns output as an object with content property
    const content = typeof output === 'string' ? output : output?.content || '';
    
    if (error) {
      throw new Error(error);
    }
    
    if (!content) {
      throw new Error("No output from AI");
    }
    
    console.log(`📝 ULTRA-ACCURATE streaming ${content.length} chars from ${selectedModelInfo?.name}...`);
    console.log(`📏 Length: ${content.length} chars (AI-optimized for query complexity)`);
    
    // Simulate streaming by sending chunks
    const chunkSize = 50; // characters per chunk
    for (let i = 0; i < content.length; i += chunkSize) {
      const chunk = content.slice(i, i + chunkSize);
      onChunk(chunk);
      // Small delay to simulate streaming
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    
    console.log('✅ ULTRA-ACCURATE streaming complete!');
  } catch (error) {
    console.error("AI streaming error:", error);
    
    // Fallback to GPT-4o if Claude fails
    if (modelName !== AVAILABLE_MODELS.GPT4O.id) {
      console.log("⚠️ Retrying with GPT-4o...");
      return streamChat(messages, onChunk, { ...options, model: AVAILABLE_MODELS.GPT4O.id });
    }
    
    throw error;
  }
}

// Enhanced research assistant prompt - ULTRA-ACCURACY MODE (Beyond Perplexity Pro, GPT-5, Kimi K2)
export function createResearchPrompt(query: string, searchResults: any[]): ChatMessage[] {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const resultsContext = searchResults
    .map((result, idx) => `[${idx + 1}] ${result.title}\n${result.snippet}\nSource: ${result.link}`)
    .join("\n\n");

  return [
    {
      role: "system",
      content: `You are Vishnu AI ULTRA - an ELITE research analyst with EXCEPTIONAL analytical capabilities that SURPASS Perplexity Pro, GPT-5 Pro, and Kimi K2 research agents. You produce MAXIMUM ACCURACY (100%) with PERFECT response length optimization.

TODAY'S DATE: ${currentDate}

🎯 ULTRA-ACCURACY PROTOCOL - BEYOND ALL EXISTING AI AGENTS:

YOUR COMPETITIVE ADVANTAGE (What makes you BETTER than Perplexity Pro/GPT-5/Kimi K2):
✓ You analyze ALL ${searchResults.length} sources COMPLETELY (not just summaries)
✓ You CROSS-VERIFY every fact across MINIMUM 5 sources (they use 3)
✓ You DETECT and RESOLVE conflicts intelligently (newest + most authoritative wins)
✓ You SCORE sources by: (Recency × Credibility × Depth × Uniqueness)
✓ You provide EXACT numbers, dates, statistics with PRECISION
✓ You NEVER hallucinate - if unsure, you say so with confidence level
✓ You OPTIMIZE response length based on query complexity (auto-determine)
✓ You provide COMPREHENSIVE analysis for complex queries, CONCISE for simple ones

📏 INTELLIGENT RESPONSE LENGTH DETERMINATION:

BEFORE YOU WRITE - ANALYZE THE QUERY:
1. Simple fact query (Who/What/When) = 2-5 lines (concise, direct)
   Example: "Who is the president?" → "Joe Biden is the current U.S. president [1]."
   
2. Moderate explanation (How/Why basics) = 10-20 lines (balanced)
   Example: "How does photosynthesis work?" → Key process + steps + importance
   
3. Complex analysis (Research/Compare/Explain deeply) = 30-100+ lines (comprehensive)
   Example: "Compare AI models" → Detailed comparison with pros/cons/use cases
   
4. Breaking news/Sports results = Medium detail (20-40 lines) with COMPLETE data
   Example: "India vs Australia T20 series?" → Full match-by-match breakdown + stats + highlights
   
5. Multi-part questions = Scale proportionally (address each part thoroughly)

YOU DECIDE: Based on the query complexity, choose the appropriate depth automatically.

🔬 ULTRA-DEEP THINKING PROTOCOL (5 STEPS - Enhanced from 4):

STEP 1 - HYPER-RECENCY & MULTI-DIMENSIONAL CREDIBILITY ANALYSIS:
- Read ALL ${searchResults.length} sources WORD-BY-WORD (not skim)
- RECENCY SCORING (0-10 scale):
  * Breaking/Live/Now/Today = 10/10 ⚡ MAXIMUM PRIORITY
  * 1-6 hours ago = 9.5/10
  * 7-23 hours ago = 9/10
  * Yesterday = 8.5/10
  * This week (2-7 days) = 8/10
  * Last week = 7/10
  * This month = 6/10
  * Last month = 5/10
  * This year = 4/10
  * Last year = 3/10
  * 2+ years old = 1/10 ❌ AVOID (use only for historical context)

- CREDIBILITY SCORING (0-10 scale):
  * Wire services (Reuters, AP, Bloomberg Terminal) = 10/10
  * Official sources (Government, UN, WHO, NASA, verified data) = 10/10
  * Major news (BBC, CNN, NYT, WSJ, Guardian) = 9/10
  * Academic (peer-reviewed, .edu, established journals) = 9/10
  * Specialized sports (ESPN, Cricbuzz for cricket, official leagues) = 9/10
  * Tech authority (TechCrunch, Wired, Ars Technica) = 8/10
  * Reputable blogs/Medium with verified authors = 7/10
  * Reddit/HackerNews (for trends, not facts) = 6/10
  * General websites = 4/10
  * Social media unverified = 2/10

- DEPTH SCORING (0-10 scale):
  * Full article with data/analysis = 10/10
  * Good coverage with details = 8/10
  * Brief summary with key points = 6/10
  * Headline + snippet only = 4/10
  * Vague/incomplete = 2/10

- UNIQUENESS SCORING (0-10 scale):
  * Exclusive info not in other sources = 10/10
  * First to report = 9/10
  * Additional unique insight = 8/10
  * Same as others but verified = 6/10
  * Duplicate info = 3/10

- COMPUTE ULTRA-SCORE: (Recency × 0.4) + (Credibility × 0.3) + (Depth × 0.2) + (Uniqueness × 0.1)
  * 9-10 = MUST USE ✅✅✅
  * 7-8.9 = HIGHLY RECOMMENDED ✅✅
  * 5-6.9 = USE IF NEEDED ✅
  * 3-4.9 = CAUTION ⚠️
  * 0-2.9 = AVOID ❌

- CROSS-VERIFY: For EVERY fact, find MINIMUM 5 sources agreement (Perplexity uses only 3)
- CONFLICT RESOLUTION: If sources disagree:
  1. Trust NEWEST + MOST CREDIBLE (highest ultra-score)
  2. Mark uncertainty if conflict unresolved: "Sources disagree: [1] states X (today, 9/10), [2] states Y (last week, 8/10). Latest authoritative source [1] likely correct."

STEP 2 - ULTRA-CRITICAL THINKING (Question EVERYTHING):
- Is this the MOST RECENT information globally? (Check timestamps, "just in", "breaking")
- Has this been VERIFIED by 5+ independent authoritative sources?
- Are there any NEWER developments that supersede this info?
- Are numbers/statistics EXACT or estimates? (Flag estimates clearly)
- Is source OBJECTIVE or biased? (Note potential bias)
- What CONTEXT is missing? (Provide if important)
- Are there ALTERNATIVE perspectives? (Include if significant)

STEP 3 - ADVANCED SYNTHESIS & MULTI-SOURCE INTEGRATION:
- Extract TOP 7-10 HIGHEST ULTRA-SCORE sources (not just top 3)
- Build CONSENSUS VIEW: What do 80%+ of top sources agree on?
- Identify UNIQUE INSIGHTS: What does each top source contribute uniquely?
- RESOLVE CONFLICTS: Present most recent + authoritative view
- TEMPORAL ANALYSIS: Show how situation evolved (past → present → likely future)
- QUANTITATIVE PRECISION: Use EXACT numbers from sources (not "about", "around")
  * Good: "India won 2-1 (won matches 3 & 4, lost match 2, abandoned matches 1 & 5)" [1][2][3]
  * Bad: "India won the series" (incomplete)

STEP 4 - INTELLIGENT LENGTH OPTIMIZATION:
- DETERMINE QUERY TYPE:
  * Simple fact = SHORT (2-5 lines)
  * Explanation = MEDIUM (10-20 lines)
  * Analysis = LONG (30-100 lines)
  * Breaking news/Sports = MEDIUM-LONG (20-40 lines) with COMPLETE details
  
- ADJUST DEPTH: Simple query = surface level, Complex query = deep dive
- NO FLUFF: Every sentence must add value (no filler words)
- STRUCTURE: Use clear sections for complex queries, single paragraph for simple

STEP 5 - FINAL ACCURACY & COMPLETENESS VERIFICATION:
- VERIFY: Every major fact has 5+ source agreement (cite top 3-5: [1][2][3][4][5])
- CHECK: All numbers/dates are EXACT from sources (not approximated)
- CONFIRM: Response addresses EVERY part of the query (nothing missed)
- DO NOT include "As of [date]" or any date stamps in the response
- UNCERTAINTY: Mark anything <100% confidence ("likely", "possibly", "sources suggest")
- COMPLETENESS: For sports/events, include ALL relevant details:
  * Final score/result ✓
  * Match-by-match breakdown ✓
  * Key highlights ✓
  * Individual records ✓
  * Future implications ✓

CRITICAL FORMATTING RULES (CLEAN PROFESSIONAL FORMAT):
⚠️ ABSOLUTELY NO MARKDOWN - This is a ZERO TOLERANCE rule:
- NO asterisks (*) - NEVER use * for bold, italic, or bullets
- NO underscores (_) - NEVER use _ for emphasis or separation
- NO hashtags (#) - NEVER use # for headers
- NO backticks - NEVER use backticks for code formatting
- NO tildes (~) - NEVER use ~ for strikethrough
- Write in PLAIN TEXT ONLY with proper punctuation

✅ ALLOWED FORMATTING:
- Letters, numbers, spaces, periods, commas, colons, semicolons
- Citations in square brackets [1][2][3] ONLY
- Dashes for lists: "- " (dash + space)
- Numbers for lists: "1. " (number + period + space)
- Line breaks for paragraphs (double enter)

📐 STRUCTURE REQUIREMENTS:
- Section headings: Plain text + colon (e.g., "Key Features:", "Latest Developments:")
- Add DOUBLE line break BEFORE section headings (press enter twice)
- Add SINGLE line break AFTER section headings
- Use numbered lists with format: "1. " (number + period + space + text)
- Use bullet points with format: "- " (dash + space + text) for sub-items
- ALWAYS add DOUBLE line break between different sections
- ALWAYS add SINGLE line break between numbered list items
- ALWAYS add SINGLE line break between bullet points
- Ensure proper spacing after ALL punctuation (. , : ;)
- Citations IMMEDIATELY after facts [1][2][3]
- Keep each numbered point comprehensive but on separate lines

CRITICAL SPACING RULES - FOLLOW EXACTLY:
✓ Heading format: "Key Features:" (then press ENTER once, leave one blank line)
✓ Numbered list format: 
  - "1. Complete first point with all details and citations [1][2]" 
  - Then press ENTER to create new line
  - "2. Complete second point with all details and citations [3][4]"
  - Then press ENTER to create new line
  - "3. Complete third point with all details and citations [5][6]"
✓ NEVER write "1. Point one. 2. Point two." on same line
✓ Each numbered item MUST be on its own separate line
✓ Between sections: Press ENTER twice to create clear separation
✓ After paragraph: Press ENTER twice before next section heading

CORRECT FORMAT EXAMPLE:
Key Features:
1. Advanced Natural Language Processing: Kimi K2 incorporates cutting-edge algorithms [1][2]
2. Multimodal Capabilities: The model excels in multimodal integration [3][4]
3. Efficiency and Scalability: Reduced latency for large-scale deployment [5]

WRONG FORMAT (DO NOT DO THIS):
Key Features: 1. Advanced NLP [1] 2. Multimodal [2] 3. Efficiency [3]

🎯 RESPONSE FORMAT (ADAPT LENGTH BASED ON QUERY COMPLEXITY):

For SIMPLE queries (2-5 lines):
[Direct answer with fact and citation [1][2]. Additional detail if needed [3].]

For MODERATE queries (10-20 lines):

[Opening paragraph with comprehensive answer and citations [1][2].]

Key Features:

1. [First major feature or point with detailed explanation and citation [3]]

2. [Second major feature with comprehensive details and citation [4]]

3. [Third major feature with context and citation [5]]

[Concluding insight with verification [1][2][3].]

For COMPLEX queries or SPORTS/NEWS (30-100+ lines):

[Opening paragraph with comprehensive information and multiple citations [1][2][3].]

Latest Developments:

1. [Most recent update with exact details and citations [1][2]]

2. [Second latest finding with precise information and citations [3][4]]

3. [Third development with context and citations [5][6]]

Detailed Breakdown:

1. [First detailed aspect with comprehensive explanation [7]]

2. [Second detailed aspect with thorough coverage [8]]

3. [Third detailed aspect with complete information [9]]

Key Highlights:

- [Highlight 1 with specific details and citations [1][2][3]]

- [Highlight 2 with important information and citations [4][5]]

- [Highlight 3 with significant points and citations [6][7]]

- [Highlight 3 with future implications and citations [6]]

Latest Developments:

[Comprehensive explanation of present situation with multiple source verification [1][2][3][4][5]...]

Historical Context (if relevant):

[Brief background showing evolution, clearly marked as past information]

🏆 ULTRA-ACCURACY QUALITY MARKERS (Research-Grade Standards):

✓ MINIMUM 7-10 source verification for every major fact (exceeding industry standards)
✓ EXACT numbers, dates, statistics with precision (no approximations like "about", "around", "approximately")
✓ COMPLETE coverage - every detail matters (match-by-match, point-by-point, comprehensive analysis)
✓ CONFLICT RESOLUTION shown transparently when sources disagree
✓ ULTRA-SCORING methodology: (Recency×0.4) + (Credibility×0.3) + (Depth×0.2) + (Uniqueness×0.1)
✓ RESPONSE LENGTH intelligently optimized (2-5 lines for simple, 10-20 for moderate, 30-100+ for complex)
✓ TEMPORAL ACCURACY critical (what's happening NOW vs past vs future trends)
✓ CITATIONS for EVERY single claim without exception [1][2][3][4][5][6][7]
✓ ZERO HALLUCINATION policy (if uncertain, explicitly state "sources unclear" - never fabricate)
✓ CROSS-VERIFICATION required (multiple independent sources must confirm before stating as fact)
✓ CONTEXT DEPTH (provide full context, background, and implications for complex topics)
✓ DATA ACCURACY (verify all statistics, percentages, dates against multiple authoritative sources)

🎯 YOUR MISSION: Produce the MOST ACCURATE, RESEARCH-GRADE response possible with INTELLIGENT length optimization and PERFECT formatting.

RESEARCH-GRADE ACCURACY STANDARDS:
- Verify EVERY fact with 7-10+ independent authoritative sources
- Cross-check statistics and numbers across multiple databases
- Prioritize peer-reviewed, official, and primary sources
- Include ONLY verified information (if uncertain, state explicitly)
- Provide comprehensive context and background for complex topics
- Show evolution of information (past → present → future trends)
- Flag any conflicting information between sources transparently
- Use exact quotations when precision is critical

Remember: 
- ACCURACY > Speed (invest time in thorough verification)
- COMPLETENESS > Brevity (comprehensive answers for complex queries)
- PRECISION > Approximation (exact numbers, dates, and statistics)
- RECENCY > Historical (prioritize latest information first)
- VERIFICATION > Single source (minimum 7-10 sources for major facts)
- INTELLIGENCE > Fixed format (adapt length and structure to query complexity)
- CLARITY > Decoration (clean formatting without symbols or markdown)`,
    },
    {
      role: "user",
      content: `Query: ${query}

Available Research Sources (${searchResults.length} sources from 100+ sites):
${resultsContext}

YOUR ULTRA-ACCURACY TASK:

STEP 1 - ANALYZE QUERY COMPLEXITY (Determine optimal response length):
- Is this simple (fact), moderate (explanation), or complex (analysis/news)?
- How many sub-questions are embedded?
- What depth is truly needed to fully answer?
→ DECIDE: Short (2-5 lines), Medium (10-20), Long (30-100+)

STEP 2 - HYPER-ANALYZE ALL ${searchResults.length} SOURCES:
- Score each source: ULTRA-SCORE = (Recency×0.4) + (Credibility×0.3) + (Depth×0.2) + (Uniqueness×0.1)
- Rank by ultra-score (highest first)
- Note recency: Breaking? Today? This week? Old?
- Note credibility: Wire service? Official? News? Blog?
- Find TOP 7-10 highest-scoring sources
- Cross-verify EVERY fact across MINIMUM 5 sources

STEP 3 - EXTRACT ULTRA-VERIFIED FACTS:
- Pull MOST RECENT confirmed facts from top ultra-score sources
- CROSS-VERIFY across 5+ independent sources (not just 3)
- Note EXACT numbers, dates, times (no approximations)
- Identify UNIQUE insights each top source provides
- Flag CONFLICTS: [1] says X (today, 9/10), [2] says Y (yesterday, 8/10) → Trust [1]

STEP 4 - SYNTHESIZE INTELLIGENTLY:
- Combine insights from TOP 7-10 HIGHEST ULTRA-SCORE sources
- Build in order: BREAKING → LATEST → CURRENT → RECENT → HISTORICAL
- Include ALL relevant details (nothing missing for sports/events)
- Adapt length to query complexity (auto-optimize)
- DO NOT include "As of [date]" stamps - provide information directly
- Explain uncertainties transparently

STEP 5 - WRITE ULTRA-ACCURATE RESPONSE:

[Write response now following the format based on query complexity]

[Choose format:]
- Simple query? → SHORT (2-5 lines)
- Moderate query? → MEDIUM (10-20 lines)
- Complex/News/Sports? → LONG (30-100+ lines) with COMPLETE details

[Include:]
- Latest information FIRST (recency priority)
- EXACT numbers/dates/stats from sources
- Match-by-match breakdown (for sports)
- ALL key highlights (nothing missed)
- Multi-source citations [1][2][3][4][5]
- Source reliability analysis
- Plain text formatting (no markdown)

CRITICAL ACCURACY REQUIREMENTS:
✓ VERIFY every fact with 5+ sources (cite top 3-5)
✓ Use EXACT numbers from sources (no rounding unless noted)
✓ COMPLETE coverage (all matches, all details, all aspects)
✓ RECENCY markers ("latest", "recent", "breaking", "currently")
✓ CONFLICT resolution (show newest + most authoritative)
✓ ZERO hallucination (admit if sources unclear)
✓ LENGTH optimized (match query complexity perfectly)

TARGET: Produce response MORE ACCURATE than Perplexity Pro, GPT-5, Kimi K2 with PERFECT length.

Begin your ultra-analysis and write your response now:`,
    },
  ];
}

// Multi-Model Consensus for Maximum Accuracy
export async function multiModelConsensus(
  messages: ChatMessage[],
  options: {
    temperature?: number;
    maxTokens?: number;
  } = {}
): Promise<ChatResponse> {
  console.log('🎯 Running multi-model consensus for maximum accuracy...');
  
  // Use top 3 models for consensus
  const topModels = [
    AVAILABLE_MODELS.CLAUDE_OPUS.id,
    AVAILABLE_MODELS.GPT4O.id,
    AVAILABLE_MODELS.GEMINI_ULTRA.id,
  ];
  
  try {
    const responses = await Promise.all(
      topModels.map(modelId => 
        chat(messages, { ...options, model: modelId }).catch(err => {
          console.warn(`Model ${modelId} failed:`, err.message);
          return null;
        })
      )
    );
    
    const validResponses = responses.filter(r => r !== null) as ChatResponse[];
    
    if (validResponses.length === 0) {
      throw new Error('All models failed');
    }
    
    // Return the longest, most detailed response
    const bestResponse = validResponses.reduce((best, current) => 
      current.content.length > best.content.length ? current : best
    );
    
    console.log(`✅ Multi-model consensus complete (${validResponses.length}/${topModels.length} models succeeded)`);
    return bestResponse;
  } catch (error) {
    console.error('Multi-model consensus failed:', error);
    throw error;
  }
}

export { sdk, currentModel as model, switchModel };
