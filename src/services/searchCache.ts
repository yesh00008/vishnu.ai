// Search Results Cache to reduce Google API calls
import type { SearchResult } from './googleSearch';

interface CacheEntry {
  results: SearchResult[];
  timestamp: number;
}

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
const cache = new Map<string, CacheEntry>();

export function getCachedResults(query: string): SearchResult[] | null {
  const normalizedQuery = query.toLowerCase().trim();
  const entry = cache.get(normalizedQuery);
  
  if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
    console.log(`✓ Using cached results for: "${query}"`);
    return entry.results;
  }
  
  return null;
}

export function setCachedResults(query: string, results: SearchResult[]): void {
  const normalizedQuery = query.toLowerCase().trim();
  cache.set(normalizedQuery, {
    results,
    timestamp: Date.now(),
  });
  console.log(`✓ Cached ${results.length} results for: "${query}"`);
}

export function clearCache(): void {
  cache.clear();
  console.log('✓ Search cache cleared');
}

export function getCacheStats(): { size: number; keys: string[] } {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
  };
}
