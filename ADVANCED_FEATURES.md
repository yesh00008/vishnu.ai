# Advanced AI Features Documentation

This document covers the advanced AI features integrated into Vishnu.AI from OpenAI and Perplexity documentation.

## 🚀 Features Overview

### 1. **Perplexity Search Filters**
- Domain filtering (allow/deny specific websites)
- Language filtering (multi-language support)
- Date range filtering (publication & update dates)
- Academic mode (scholarly sources)
- SEC filings mode (financial documents)
- Search control (enable/disable search)

### 2. **Deep Research**
- Comprehensive multi-step research
- Web search integration
- Source synthesis and analysis
- Inline citations
- Data-backed insights

### 3. **Prompt Optimization**
- Automatic contradiction detection
- Format specification analysis
- Ambiguity resolution
- Prompt rewriting

---

## 📚 Quick Start

### Initialize Services

```typescript
import { initializeAdvancedAI } from '@/services/advancedAI';

// Initialize with API keys
const ai = initializeAdvancedAI({
  perplexityKey: 'your-perplexity-api-key',
  anthropicKey: 'your-anthropic-api-key' // Optional
});
```

---

## 🔍 Perplexity Search Examples

### Basic Search with Filters

```typescript
const perplexity = ai.getPerplexity();

const result = await perplexity.search(
  "Latest AI developments",
  {
    recency: 'week',
    contextSize: 'high',
    languages: ['en']
  }
);

console.log(result.content);
console.log(result.citations);
```

### Academic Research

```typescript
// Search academic sources only
const research = await perplexity.academicSearch(
  "quantum computing breakthroughs",
  {
    publishedAfter: '1/1/2024',
    contextSize: 'high'
  }
);
```

### Trusted Sources Search

```typescript
// Search only specific domains
const news = await perplexity.trustedSourcesSearch(
  "climate change policies",
  ['nature.com', 'science.org', 'bbc.com']
);
```

### Multi-Language Search

```typescript
// Search across multiple languages
const global = await perplexity.multiLanguageSearch(
  "renewable energy innovations",
  ['en', 'fr', 'de', 'es'] // English, French, German, Spanish
);
```

### SEC Filings Search

```typescript
// Search SEC financial documents
const filings = await perplexity.secSearch(
  "Apple Inc latest 10-K filing",
  {
    publishedAfter: '1/1/2024'
  }
);
```

### Domain Filtering

```typescript
// Include specific domains
const filtered = await perplexity.search(
  "AI safety research",
  {
    domainFilter: [
      'openai.com',
      'anthropic.com',
      'deepmind.com'
    ]
  }
);

// Exclude specific domains
const excluded = await perplexity.search(
  "tech news",
  {
    excludeDomains: [
      'reddit.com',
      'pinterest.com',
      'quora.com'
    ]
  }
);
```

### Date Range Filtering

```typescript
// Filter by publication date
const dated = await perplexity.search(
  "COVID-19 research",
  {
    publishedAfter: '3/1/2024',
    publishedBefore: '3/31/2024'
  }
);

// Filter by last updated date
const updated = await perplexity.search(
  "React documentation",
  {
    lastUpdatedAfter: '1/1/2024'
  }
);
```

### Advanced Filtering Combination

```typescript
const advanced = await perplexity.search(
  "machine learning frameworks",
  {
    // Domain control
    domainFilter: ['github.com', 'arxiv.org'],
    excludeDomains: ['reddit.com'],
    
    // Language
    languages: ['en'],
    
    // Date filters
    publishedAfter: '1/1/2023',
    lastUpdatedAfter: '1/1/2024',
    
    // Search behavior
    searchMode: 'academic',
    contextSize: 'high',
    enableSearchClassifier: true
  }
);
```

---

## 🔬 Deep Research Examples

### Comprehensive Research

```typescript
const deepResearch = ai.getDeepResearch();

const analysis = await deepResearch.deepResearch(
  "Analyze the economic impact of AI on healthcare systems",
  {
    reasoning: { effort: 'high' }
  }
);

console.log(analysis.content);
```

### Contextual Research

```typescript
const context = [
  "Previous finding: AI reduces diagnostic errors by 30%",
  "Current healthcare spending: $4 trillion annually"
];

const research = await deepResearch.contextualResearch(
  "How will AI impact healthcare costs over next 5 years?",
  context
);
```

### Comparative Research

```typescript
const comparison = await deepResearch.comparativeResearch([
  "GPT-4 capabilities",
  "Claude 3 capabilities",
  "Gemini capabilities"
]);
```

---

## ✨ Prompt Optimization Examples

### Analyze Prompt

```typescript
const optimizer = ai.getPromptOptimizer();

const analysis = await optimizer.analyzePrompt(`
  Always respond in English.
  Never respond in English.
  Be concise and detailed.
`);

if (analysis.hasIssues) {
  console.log('Contradictions:', analysis.issues.contradictions);
  console.log('Format Issues:', analysis.issues.formatIssues);
}
```

### Optimize Prompt

```typescript
const result = await optimizer.optimizePrompt(`
  You are a helpful assistant.
  Respond with JSON.
  Include user feedback.
  Keep responses short.
`);

if (result.hasIssues) {
  console.log('Original Issues:', result.issues);
  console.log('Optimized Prompt:', result.optimizedPrompt);
}
```

---

## 🎯 Search Filter Reference

### Language Codes (ISO 639-1)

| Language | Code | Language | Code |
|----------|------|----------|------|
| English | `en` | Spanish | `es` |
| French | `fr` | German | `de` |
| Chinese | `zh` | Japanese | `ja` |
| Korean | `ko` | Arabic | `ar` |
| Russian | `ru` | Portuguese | `pt` |
| Italian | `it` | Dutch | `nl` |

### Search Modes

- `'auto'` - Default behavior
- `'academic'` - Scholarly sources only
- `'sec'` - SEC filings only

### Context Sizes

- `'low'` - Fast, minimal context
- `'medium'` - Balanced (default)
- `'high'` - Comprehensive, detailed

### Recency Options

- `'day'` - Past 24 hours
- `'week'` - Past 7 days
- `'month'` - Past 30 days
- `'year'` - Past 365 days

---

## 💡 Use Cases

### 1. Real-time News Monitoring

```typescript
const breakingNews = await perplexity.recentNews(
  "artificial intelligence regulation",
  'day'
);
```

### 2. Academic Literature Review

```typescript
const literature = await perplexity.academicSearch(
  "deep learning natural language processing",
  {
    publishedAfter: '1/1/2023',
    contextSize: 'high'
  }
);
```

### 3. Financial Analysis

```typescript
const financial = await perplexity.secSearch(
  "Tesla quarterly earnings",
  { publishedAfter: '1/1/2024' }
);
```

### 4. Multi-Regional Research

```typescript
const regional = await perplexity.multiLanguageSearch(
  "electric vehicle adoption rates",
  ['en', 'zh', 'ja', 'de'] // US, China, Japan, Germany
);
```

### 5. Quality Content Filtering

```typescript
const quality = await perplexity.search(
  "best practices software architecture",
  {
    domainFilter: [
      'martinfowler.com',
      'github.com',
      'stackoverflow.com'
    ],
    lastUpdatedAfter: '1/1/2023',
    contextSize: 'high'
  }
);
```

---

## 🔒 Best Practices

### 1. **Search Optimization**

- Use `contextSize: 'low'` for simple queries
- Use `contextSize: 'high'` for research
- Enable `searchClassifier` for mixed workloads

### 2. **Language Filtering**

- Maximum 10 language codes per request
- Always use lowercase ISO 639-1 codes
- Validate codes client-side

### 3. **Domain Filtering**

- Maximum 20 domains per request
- Use simple domain names (e.g., `example.com`)
- Can't mix allowlist and denylist

### 4. **Date Formatting**

- Use `MM/DD/YYYY` format
- Can't combine `recency` with specific dates
- Validate dates client-side

### 5. **Performance**

- Fewer filters = faster responses
- Academic mode may be slower
- Cache results when appropriate

---

## 🚨 Error Handling

```typescript
try {
  const result = await perplexity.search(query, filters);
  console.log(result.content);
} catch (error) {
  if (error.message.includes('API error')) {
    console.error('API Error:', error);
  } else if (error.message.includes('Invalid')) {
    console.error('Invalid parameters:', error);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

---

## 📊 Response Formats

### Search Response

```typescript
{
  content: string;      // Generated response
  citations: Array<{    // Source citations
    title: string;
    url: string;
    snippet: string;
  }>;
  usage: {              // Token usage
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}
```

### Research Response

```typescript
{
  content: string;      // Research findings
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
  stopReason: string;
}
```

---

## 🔗 Integration Example

```typescript
import { getAdvancedAI } from '@/services/advancedAI';

async function comprehensiveResearch(topic: string) {
  const ai = getAdvancedAI();
  const perplexity = ai.getPerplexity();
  
  // 1. Get recent news
  const news = await perplexity.recentNews(topic, 'week');
  
  // 2. Get academic insights
  const academic = await perplexity.academicSearch(topic, {
    publishedAfter: '1/1/2023'
  });
  
  // 3. Get global perspectives
  const global = await perplexity.multiLanguageSearch(topic, [
    'en', 'zh', 'es', 'ar'
  ]);
  
  return {
    recentNews: news.content,
    academicInsights: academic.content,
    globalPerspectives: global.content,
    allCitations: [
      ...news.citations,
      ...academic.citations,
      ...global.citations
    ]
  };
}
```

---

## 📝 Environment Variables

Add these to your `.env` file:

```env
# Perplexity API
VITE_PERPLEXITY_API_KEY=your_perplexity_key

# Anthropic API (for deep research)
VITE_ANTHROPIC_API_KEY=your_anthropic_key
```

---

## 🎓 Additional Resources

- [Perplexity API Docs](https://docs.perplexity.ai/)
- [OpenAI Deep Research](https://platform.openai.com/docs/guides/deep-research)
- [GPT-5 Prompting Guide](https://cookbook.openai.com/examples/gpt-5/gpt-5_prompting_guide)
- [Prompt Optimization](https://cookbook.openai.com/examples/optimize_prompts)

---

## 🤝 Support

For issues or questions:
1. Check the [Advanced Features Guide](./ADVANCED_FEATURES.md)
2. Review [API Documentation](./API_DOCS.md)
3. Open an issue on GitHub
