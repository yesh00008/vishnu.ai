// API Service for Vishnu.AI - Generate and manage API endpoints for business use

import { performGoogleSearch } from './googleSearch';
import { chat as mistralChat } from './mistralAI';

export interface ApiRequest {
  query: string;
  apiKey?: string;
  options?: {
    maxResults?: number;
    includeImages?: boolean;
    language?: string;
    region?: string;
  };
}

export interface ApiResponse {
  success: boolean;
  data?: {
    query: string;
    answer: string;
    sources: any[];
    timestamp: string;
    processingTime: number;
  };
  error?: {
    code: string;
    message: string;
  };
  rateLimit?: {
    remaining: number;
    reset: string;
  };
}

export interface ApiKey {
  key: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
  requestCount: number;
  requestLimit: number;
  tier: 'free' | 'business' | 'enterprise';
}

// API Rate Limits by Tier
const RATE_LIMITS = {
  free: {
    requestsPerDay: 100,
    requestsPerHour: 10,
    maxTokens: 5000,
  },
  business: {
    requestsPerDay: 10000,
    requestsPerHour: 500,
    maxTokens: 15000,
  },
  enterprise: {
    requestsPerDay: 100000,
    requestsPerHour: 5000,
    maxTokens: 30000,
  },
};

// In-memory storage for API keys (in production, use database)
const API_KEYS: Map<string, ApiKey> = new Map();

/**
 * Generate a new API key for a user
 */
export function generateApiKey(userId: string, tier: 'free' | 'business' | 'enterprise' = 'free'): ApiKey {
  const key = `vsh_${tier}_${generateRandomString(32)}`;
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 year

  const apiKey: ApiKey = {
    key,
    userId,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    requestCount: 0,
    requestLimit: RATE_LIMITS[tier].requestsPerDay,
    tier,
  };

  API_KEYS.set(key, apiKey);
  saveApiKeysToStorage();
  
  return apiKey;
}

/**
 * Validate API key and check rate limits
 */
function validateApiKey(apiKey: string): { valid: boolean; error?: string; key?: ApiKey } {
  const key = API_KEYS.get(apiKey);
  
  if (!key) {
    return { valid: false, error: 'Invalid API key' };
  }

  if (new Date() > new Date(key.expiresAt)) {
    return { valid: false, error: 'API key has expired' };
  }

  const limits = RATE_LIMITS[key.tier];
  if (key.requestCount >= limits.requestsPerDay) {
    return { valid: false, error: 'Rate limit exceeded. Daily quota exhausted.' };
  }

  return { valid: true, key };
}

/**
 * Process API request with authentication and rate limiting
 */
export async function processApiRequest(request: ApiRequest): Promise<ApiResponse> {
  const startTime = Date.now();

  try {
    // Validate API key if provided
    if (request.apiKey) {
      const validation = validateApiKey(request.apiKey);
      if (!validation.valid) {
        return {
          success: false,
          error: {
            code: 'AUTH_ERROR',
            message: validation.error || 'Authentication failed',
          },
        };
      }

      // Increment request count
      if (validation.key) {
        validation.key.requestCount++;
        saveApiKeysToStorage();
      }
    }

    // Perform search
    const searchResponse = await performGoogleSearch(request.query);

    if (!searchResponse || !searchResponse.results || searchResponse.results.length === 0) {
      return {
        success: false,
        error: {
          code: 'NO_RESULTS',
          message: 'No search results found for the query',
        },
      };
    }

    const searchResults = searchResponse.results;

    // Generate AI response
    const messages = [
      {
        role: 'user' as const,
        content: request.query,
      },
    ];

    const aiResponse = await mistralChat(messages, {
      maxTokens: request.apiKey 
        ? RATE_LIMITS[API_KEYS.get(request.apiKey)?.tier || 'free'].maxTokens 
        : 5000,
    });

    const processingTime = Date.now() - startTime;

    // Get rate limit info
    let rateLimit;
    if (request.apiKey) {
      const key = API_KEYS.get(request.apiKey);
      if (key) {
        const limits = RATE_LIMITS[key.tier];
        rateLimit = {
          remaining: limits.requestsPerDay - key.requestCount,
          reset: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        };
      }
    }

    return {
      success: true,
      data: {
        query: request.query,
        answer: aiResponse.content,
        sources: searchResults.slice(0, 10), // Return top 10 sources
        timestamp: new Date().toISOString(),
        processingTime,
      },
      rateLimit,
    };
  } catch (error) {
    console.error('API request error:', error);
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
    };
  }
}

/**
 * Get API usage statistics
 */
export function getApiUsage(apiKey: string): {
  requestCount: number;
  requestLimit: number;
  tier: string;
  resetTime: string;
} | null {
  const key = API_KEYS.get(apiKey);
  if (!key) return null;

  const limits = RATE_LIMITS[key.tier];
  return {
    requestCount: key.requestCount,
    requestLimit: limits.requestsPerDay,
    tier: key.tier,
    resetTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
}

/**
 * List all API keys for a user
 */
export function getUserApiKeys(userId: string): ApiKey[] {
  return Array.from(API_KEYS.values()).filter(key => key.userId === userId);
}

/**
 * Revoke an API key
 */
export function revokeApiKey(apiKey: string): boolean {
  const deleted = API_KEYS.delete(apiKey);
  if (deleted) {
    saveApiKeysToStorage();
  }
  return deleted;
}

/**
 * Generate random string for API keys
 */
function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Save API keys to localStorage
 */
function saveApiKeysToStorage(): void {
  try {
    const keysArray = Array.from(API_KEYS.entries());
    localStorage.setItem('vishnu_api_keys', JSON.stringify(keysArray));
  } catch (error) {
    console.error('Error saving API keys:', error);
  }
}

/**
 * Load API keys from localStorage
 */
function loadApiKeysFromStorage(): void {
  try {
    const stored = localStorage.getItem('vishnu_api_keys');
    if (stored) {
      const keysArray = JSON.parse(stored);
      API_KEYS.clear();
      keysArray.forEach(([key, value]: [string, ApiKey]) => {
        API_KEYS.set(key, value);
      });
    }
  } catch (error) {
    console.error('Error loading API keys:', error);
  }
}

// Load API keys on module initialization
loadApiKeysFromStorage();

/**
 * REST API endpoint simulator (for demonstration)
 * In production, this would be a proper backend endpoint
 */
export async function handleApiEndpoint(
  method: string,
  endpoint: string,
  headers: Record<string, string>,
  body?: any
): Promise<ApiResponse> {
  const apiKey = headers['Authorization']?.replace('Bearer ', '');

  switch (endpoint) {
    case '/api/v1/search':
      if (method === 'POST') {
        return processApiRequest({
          query: body.query,
          apiKey,
          options: body.options,
        });
      }
      break;

    case '/api/v1/usage':
      if (method === 'GET' && apiKey) {
        const usage = getApiUsage(apiKey);
        return {
          success: true,
          data: usage as any,
        };
      }
      break;

    case '/api/v1/keys':
      if (method === 'POST' && body.userId) {
        const newKey = generateApiKey(body.userId, body.tier || 'free');
        return {
          success: true,
          data: newKey as any,
        };
      }
      break;
  }

  return {
    success: false,
    error: {
      code: 'INVALID_ENDPOINT',
      message: 'Invalid API endpoint or method',
    },
  };
}

// Export API documentation
export const API_DOCUMENTATION = {
  version: '1.0',
  baseUrl: 'https://api.vishnu.ai/v1',
  authentication: 'Bearer token in Authorization header',
  endpoints: [
    {
      path: '/api/v1/search',
      method: 'POST',
      description: 'Perform a research query with AI-powered multi-source search',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY',
      },
      body: {
        query: 'string (required)',
        options: {
          maxResults: 'number (optional, default: 50)',
          includeImages: 'boolean (optional)',
          language: 'string (optional, default: en)',
          region: 'string (optional)',
        },
      },
      response: {
        success: 'boolean',
        data: {
          query: 'string',
          answer: 'string',
          sources: 'array',
          timestamp: 'string',
          processingTime: 'number',
        },
      },
    },
    {
      path: '/api/v1/usage',
      method: 'GET',
      description: 'Get API usage statistics',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
      },
      response: {
        requestCount: 'number',
        requestLimit: 'number',
        tier: 'string',
        resetTime: 'string',
      },
    },
    {
      path: '/api/v1/keys',
      method: 'POST',
      description: 'Generate a new API key',
      body: {
        userId: 'string (required)',
        tier: 'string (optional: free, business, enterprise)',
      },
      response: {
        key: 'string',
        userId: 'string',
        createdAt: 'string',
        expiresAt: 'string',
        tier: 'string',
      },
    },
  ],
  rateLimits: RATE_LIMITS,
};
