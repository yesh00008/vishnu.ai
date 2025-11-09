// Web Content Extraction Service - Using ScraperAPI
import type { SearchResult } from './googleSearch';

const SCRAPER_API_KEY = import.meta.env.VITE_SCRAPER_API_KEY || 'f8fea5cc6fa992a2141fa89571775ad3';

export interface ExtractedContent {
  url: string;
  title: string;
  text: string;
  snippet: string;
  wordCount: number;
  success: boolean;
  metadata?: {
    author?: string;
    publishDate?: string;
    images?: string[];
    headings?: string[];
    fallback?: string;
  };
}

// Advanced AI-powered HTML parser with multiple extraction strategies
function parseHTML(html: string, url: string): ExtractedContent {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Strategy 1: Extract title (multiple fallbacks)
  const title = 
    doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
    doc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ||
    doc.querySelector('title')?.textContent ||
    doc.querySelector('h1')?.textContent ||
    new URL(url).hostname;

  // Strategy 2: Extract metadata
  const metadata = {
    author: doc.querySelector('meta[name="author"]')?.getAttribute('content') ||
            doc.querySelector('[rel="author"]')?.textContent || undefined,
    publishDate: doc.querySelector('meta[property="article:published_time"]')?.getAttribute('content') ||
                 doc.querySelector('time')?.getAttribute('datetime') || undefined,
    images: Array.from(doc.querySelectorAll('meta[property="og:image"], img[src]'))
      .map(el => el.getAttribute('content') || el.getAttribute('src'))
      .filter(Boolean)
      .slice(0, 5) as string[],
    headings: Array.from(doc.querySelectorAll('h1, h2, h3'))
      .map(el => el.textContent?.trim())
      .filter(Boolean)
      .slice(0, 10) as string[],
  };

  // Strategy 3: Extract main content using AI-like selectors (prioritized)
  const contentSelectors = [
    // High priority - article content
    'article[role="main"]',
    'article.post-content',
    'article.entry-content',
    'div[role="main"]',
    'main article',
    
    // Medium priority - common CMS patterns
    '.post-content',
    '.entry-content',
    '.article-content',
    '.content-body',
    '.story-body',
    '.article-body',
    '#article-body',
    '#main-content',
    '.main-content',
    
    // Semantic HTML5
    'article',
    'main',
    '[role="main"]',
    
    // News sites
    '.article__body',
    '.story__content',
    '.article-text',
    
    // Fallbacks
    '#content',
    '.content',
    'body',
  ];

  let text = '';
  let selectedContent: Element | null = null;

  for (const selector of contentSelectors) {
    const element = doc.querySelector(selector);
    if (element) {
      selectedContent = element;
      const cloned = element.cloneNode(true) as HTMLElement;
      
      // Remove noise elements (AI-powered cleanup)
      cloned.querySelectorAll(`
        script, style, noscript, iframe, 
        nav, header, footer, aside, 
        .advertisement, .ad, .ads, [class*="ad-"], [id*="ad-"],
        .sidebar, .related, .comments, .social-share,
        .cookie-banner, .newsletter, .popup, .modal,
        [aria-hidden="true"], [style*="display: none"]
      `).forEach(el => el.remove());
      
      text = cloned.textContent || '';
      
      // If we got substantial content, break
      if (text.length > 500) break;
    }
  }

  // Strategy 4: Advanced text cleanup (preserve structure)
  text = text
    // Normalize whitespace but preserve paragraphs
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    // Remove excessive spaces
    .replace(/^\s+/gm, '')
    .replace(/\s+$/gm, '')
    .trim();

  // Strategy 5: Content quality check and enhancement
  if (text.length < 200 && selectedContent) {
    // Fallback: Extract all visible text with better formatting
    const walker = document.createTreeWalker(
      selectedContent,
      NodeFilter.SHOW_TEXT,
      null
    );
    
    const textNodes: string[] = [];
    let node;
    while (node = walker.nextNode()) {
      const content = node.textContent?.trim();
      if (content && content.length > 10) {
        textNodes.push(content);
      }
    }
    text = textNodes.join(' ');
  }

  // Strategy 6: Intelligent truncation (keep full sentences)
  if (text.length > 5000) {
    const truncated = text.substring(0, 5000);
    const lastPeriod = truncated.lastIndexOf('.');
    text = lastPeriod > 4000 ? truncated.substring(0, lastPeriod + 1) : truncated + '...';
  }

  // Create intelligent snippet (first meaningful paragraph)
  const paragraphs = text.split('\n\n').filter(p => p.length > 50);
  const snippet = paragraphs[0]?.substring(0, 300) || text.substring(0, 300);

  return {
    url,
    title: title.trim(),
    text,
    snippet: snippet + (snippet.length < text.length ? '...' : ''),
    wordCount: text.split(/\s+/).filter(w => w.length > 0).length,
    success: text.length > 100,
    metadata,
  };
}

// ScraperAPI extraction with intelligent retry
export async function extractWebContent(url: string): Promise<ExtractedContent> {
  const TIMEOUT_MS = 8000; // 8 second timeout
  const MAX_RETRIES = 2;
  
  for (let retry = 0; retry < MAX_RETRIES; retry++) {
    try {
      const scraperUrl = `https://api.scraperapi.com/?api_key=${SCRAPER_API_KEY}&url=${encodeURIComponent(url)}`;
      
      console.log(`Extracting content from: ${url} (attempt ${retry + 1}/${MAX_RETRIES})`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
      
      const response = await fetch(scraperUrl, {
        method: 'GET',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const html = await response.text();
        const parsed = parseHTML(html, url);
        
        if (parsed.text.length > 100) {
          console.log(`✓ Extracted ${parsed.wordCount} words from ${url}`);
          return parsed;
        }
      }
      
      // If response not ok or content too short, retry
      if (retry < MAX_RETRIES - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
      }
    } catch (error) {
      console.log(`✗ Extraction attempt ${retry + 1} failed for ${url}:`, error instanceof Error ? error.message : 'Unknown error');
      
      if (retry === MAX_RETRIES - 1) {
        // Last attempt failed - return minimal content
        return {
          url,
          title: new URL(url).hostname,
          text: "",
          snippet: "",
          wordCount: 0,
          success: false,
        };
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
    }
  }
  
  // All retries failed
  console.log(`✗ All extraction attempts failed for ${url}`);
  return {
    url,
    title: new URL(url).hostname,
    text: "",
    snippet: "",
    wordCount: 0,
    success: false,
  };
}

// PARALLEL BATCH EXTRACTION using ScraperAPI - Extract from TOP 10 sites
export async function extractMultipleContents(
  results: SearchResult[]
): Promise<ExtractedContent[]> {
  const TOP_N = 10; // Extract from top 10 most relevant sites
  const startTime = Date.now();
  
  console.log(`⚡ Extracting content from TOP ${TOP_N} sources using ScraperAPI...`);

  // Filter out invalid/empty URLs and ensure different domains
  const seenDomains = new Set<string>();
  const validResults = results.filter(r => {
    try {
      if (!r.link || r.link.trim() === '') return false;
      const url = new URL(r.link);
      const hostname = url.hostname.toLowerCase();
      
      // Skip search engine results
      if (hostname.includes('google.com/search') || 
          hostname.includes('bing.com/search') ||
          hostname.includes('yahoo.com/search')) {
        return false;
      }
      
      // Ensure unique domains
      if (seenDomains.has(hostname)) {
        return false;
      }
      seenDomains.add(hostname);
      return true;
    } catch {
      return false;
    }
  }).slice(0, TOP_N); // Take only top 10 from different domains

  console.log(`  Processing ${validResults.length} URLs from different domains in parallel...`);
  console.log(`  Sources: ${validResults.map(r => r.displayLink).join(', ')}`);
  
  // Extract all in parallel for maximum speed (all 10 at once)
  const extractionPromises = validResults.map(async (result) => {
    try {
      const content = await extractWebContent(result.link);
      
      // If extraction failed, use search snippet as fallback
      if (!content.success && result.snippet) {
        const cleanSnippet = result.snippet.trim();
        if (cleanSnippet.length > 20) {
          return {
            ...content,
            text: cleanSnippet,
            snippet: cleanSnippet.substring(0, 300),
            wordCount: cleanSnippet.split(/\s+/).length,
            success: true,
            metadata: {
              ...content.metadata,
              fallback: 'search-snippet',
            },
          };
        }
      }
      
      return content;
    } catch (error) {
      // Fallback to search data
      return {
        url: result.link,
        title: result.title,
        text: result.snippet || "",
        snippet: result.snippet?.substring(0, 300) || "",
        wordCount: result.snippet?.split(/\s+/).length || 0,
        success: !!result.snippet,
        metadata: { fallback: 'search-only' },
      };
    }
  });
  
  const extracted = await Promise.all(extractionPromises);
  
  // Success analytics
  const successCount = extracted.filter(c => c.success).length;
  const totalWords = extracted.reduce((sum, c) => sum + c.wordCount, 0);
  const avgWordsPerSource = Math.round(totalWords / extracted.length);
  const elapsedMs = Date.now() - startTime;

  console.log(`✅ Extraction complete!`);
  console.log(`   📊 Success: ${successCount}/${extracted.length} sources`);
  console.log(`   📝 Total words: ${totalWords.toLocaleString()} (avg: ${avgWordsPerSource} per source)`);
  console.log(`   ⏱️  Time: ${(elapsedMs / 1000).toFixed(1)}s`);
  console.log(`   🎯 Full content: ${extracted.filter(c => c.wordCount > 200).length} sources`);

  return extracted;
}

export function summarizeContent(content: ExtractedContent): string {
  return `**${content.title}**\n${content.snippet}\n*Source: ${content.url}*\n*Words: ${content.wordCount}*`;
}
