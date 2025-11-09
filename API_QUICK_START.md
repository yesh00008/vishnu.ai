# Vishnu.AI API - Quick Start Guide

## 🚀 Getting Started with the API

### Step 1: Generate an API Key

```typescript
import { generateApiKey } from '@/services/apiService';

// Generate a free tier API key
const apiKey = generateApiKey('your-user-id', 'free');

console.log('Your API Key:', apiKey.key);
// Output: vsh_free_abc123xyz...

console.log('Expires:', new Date(apiKey.expiresAt));
// Output: November 9, 2026
```

### Step 2: Make Your First API Request

```typescript
import { processApiRequest } from '@/services/apiService';

const response = await processApiRequest({
  query: 'What is machine learning?',
  apiKey: 'vsh_free_abc123xyz...',
  options: {
    maxResults: 50,
    language: 'en',
    region: 'us'
  }
});

if (response.success) {
  console.log('Answer:', response.data.answer);
  console.log('Sources:', response.data.sources);
  console.log('Processing Time:', response.data.processingTime + 'ms');
  console.log('Remaining Requests:', response.rateLimit.remaining);
} else {
  console.error('Error:', response.error.message);
}
```

### Step 3: Check Your Usage

```typescript
import { getApiUsage } from '@/services/apiService';

const usage = getApiUsage('vsh_free_abc123xyz...');

console.log('Requests Used:', usage.requestCount);
console.log('Daily Limit:', usage.requestLimit);
console.log('Tier:', usage.tier);
console.log('Resets At:', new Date(usage.resetTime));
```

---

## 📊 API Tiers & Pricing

| Feature | Free | Business | Enterprise |
|---------|------|----------|------------|
| **Requests/Day** | 100 | 10,000 | 100,000 |
| **Requests/Hour** | 10 | 500 | 5,000 |
| **Max Tokens** | 5,000 | 15,000 | 30,000 |
| **Support** | Community | Email | Dedicated |
| **Price** | $0 | $49/mo | Custom |

---

## 🔑 API Key Management

### List All Keys for a User

```typescript
import { getUserApiKeys } from '@/services/apiService';

const keys = getUserApiKeys('your-user-id');

keys.forEach(key => {
  console.log('Key:', key.key);
  console.log('Tier:', key.tier);
  console.log('Requests:', key.requestCount);
  console.log('Expires:', new Date(key.expiresAt));
});
```

### Revoke an API Key

```typescript
import { revokeApiKey } from '@/services/apiService';

const success = revokeApiKey('vsh_free_abc123xyz...');

if (success) {
  console.log('API key revoked successfully');
} else {
  console.log('API key not found');
}
```

---

## 🌐 REST API Endpoints (Production Ready)

### Base URL
```
https://api.vishnu.ai/v1
```

### Authentication
All requests require an Authorization header:
```
Authorization: Bearer vsh_free_abc123xyz...
```

---

### POST /api/v1/search

Perform a research query with AI-powered multi-source search.

**Request:**
```bash
curl -X POST https://api.vishnu.ai/v1/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "query": "What are the latest developments in quantum computing?",
    "options": {
      "maxResults": 50,
      "language": "en",
      "region": "us"
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "query": "What are the latest developments in quantum computing?",
    "answer": "As of November 9, 2025, quantum computing has made significant advances...",
    "sources": [
      {
        "title": "Quantum Computing Breakthrough",
        "url": "https://example.com/article",
        "snippet": "..."
      }
    ],
    "timestamp": "2025-11-09T12:00:00Z",
    "processingTime": 2300
  },
  "rateLimit": {
    "remaining": 99,
    "reset": "2025-11-10T00:00:00Z"
  }
}
```

---

### GET /api/v1/usage

Get current API usage statistics.

**Request:**
```bash
curl -X GET https://api.vishnu.ai/v1/usage \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "requestCount": 42,
    "requestLimit": 100,
    "tier": "free",
    "resetTime": "2025-11-10T00:00:00Z"
  }
}
```

---

### POST /api/v1/keys

Generate a new API key.

**Request:**
```bash
curl -X POST https://api.vishnu.ai/v1/keys \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "tier": "business"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "key": "vsh_business_xyz789abc...",
    "userId": "user123",
    "createdAt": "2025-11-09T12:00:00Z",
    "expiresAt": "2026-11-09T12:00:00Z",
    "tier": "business"
  }
}
```

---

## 📝 Code Examples

### JavaScript/TypeScript

```typescript
async function searchVishnu(query: string, apiKey: string) {
  const response = await fetch('https://api.vishnu.ai/v1/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({ query })
  });

  const data = await response.json();
  
  if (data.success) {
    return data.data.answer;
  } else {
    throw new Error(data.error.message);
  }
}

// Usage
const answer = await searchVishnu('What is AI?', 'vsh_free_...');
console.log(answer);
```

### Python

```python
import requests

def search_vishnu(query: str, api_key: str) -> dict:
    url = 'https://api.vishnu.ai/v1/search'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}'
    }
    data = {'query': query}
    
    response = requests.post(url, json=data, headers=headers)
    result = response.json()
    
    if result['success']:
        return result['data']
    else:
        raise Exception(result['error']['message'])

# Usage
answer = search_vishnu('What is AI?', 'vsh_free_...')
print(answer['answer'])
```

### cURL

```bash
#!/bin/bash

API_KEY="vsh_free_abc123xyz..."
QUERY="What is artificial intelligence?"

curl -X POST https://api.vishnu.ai/v1/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d "{\"query\": \"$QUERY\"}" \
  | jq '.data.answer'
```

---

## ⚠️ Error Handling

### Common Error Codes

| Code | Message | Solution |
|------|---------|----------|
| `AUTH_ERROR` | Invalid API key | Check your API key is correct |
| `AUTH_ERROR` | API key has expired | Generate a new API key |
| `AUTH_ERROR` | Rate limit exceeded | Wait for quota reset |
| `NO_RESULTS` | No search results found | Try a different query |
| `INTERNAL_ERROR` | Server error | Retry or contact support |

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "AUTH_ERROR",
    "message": "Rate limit exceeded. Daily quota exhausted."
  }
}
```

### Example Error Handling

```typescript
try {
  const response = await processApiRequest({ query, apiKey });
  
  if (!response.success) {
    switch (response.error?.code) {
      case 'AUTH_ERROR':
        console.error('Authentication failed:', response.error.message);
        break;
      case 'NO_RESULTS':
        console.warn('No results found for query');
        break;
      case 'INTERNAL_ERROR':
        console.error('Server error, please retry');
        break;
    }
  }
} catch (error) {
  console.error('Request failed:', error);
}
```

---

## 🔒 Security Best Practices

### 1. Keep API Keys Secret
```typescript
// ❌ DON'T: Expose in frontend code
const API_KEY = 'vsh_free_abc123xyz...';

// ✅ DO: Use environment variables
const API_KEY = process.env.VISHNU_API_KEY;
```

### 2. Use HTTPS Only
```typescript
// ❌ DON'T: Use HTTP
fetch('http://api.vishnu.ai/v1/search', ...)

// ✅ DO: Always use HTTPS
fetch('https://api.vishnu.ai/v1/search', ...)
```

### 3. Rotate Keys Regularly
```typescript
// Generate new key every 6 months
const newKey = generateApiKey(userId, tier);
revokeApiKey(oldKey);
```

### 4. Monitor Usage
```typescript
// Check usage regularly
const usage = getApiUsage(apiKey);
if (usage.requestCount > usage.requestLimit * 0.9) {
  console.warn('Approaching rate limit!');
}
```

---

## 📈 Rate Limiting

### How It Works

1. **Daily Quota**: Resets every 24 hours at midnight UTC
2. **Hourly Quota**: Resets every hour
3. **Soft Limits**: Warnings at 80% usage
4. **Hard Limits**: Requests blocked at 100%

### Check Rate Limits in Response

```typescript
const response = await processApiRequest({ query, apiKey });

console.log('Remaining:', response.rateLimit.remaining);
console.log('Resets:', new Date(response.rateLimit.reset));

// Calculate percentage used
const limit = response.rateLimit.remaining + 1; // +1 for current request
const used = 1;
const percentage = (used / limit) * 100;

if (percentage > 80) {
  console.warn('You have used 80% of your quota!');
}
```

---

## 🎯 Best Practices

### 1. Cache Results
```typescript
const cache = new Map<string, any>();

async function searchWithCache(query: string, apiKey: string) {
  // Check cache first
  if (cache.has(query)) {
    return cache.get(query);
  }
  
  // Make API request
  const response = await processApiRequest({ query, apiKey });
  
  // Cache for 1 hour
  if (response.success) {
    cache.set(query, response.data);
    setTimeout(() => cache.delete(query), 3600000);
  }
  
  return response.data;
}
```

### 2. Batch Similar Queries
```typescript
// ❌ DON'T: Make many similar requests
await search('What is AI?');
await search('What is Artificial Intelligence?');
await search('Define AI');

// ✅ DO: Combine into one comprehensive query
await search('What is AI (Artificial Intelligence)? Provide a comprehensive definition.');
```

### 3. Handle Errors Gracefully
```typescript
async function robustSearch(query: string, apiKey: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await processApiRequest({ query, apiKey });
      if (response.success) return response.data;
      
      // Wait before retry if rate limited
      if (response.error?.code === 'AUTH_ERROR') {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
}
```

---

## 📚 Additional Resources

- **Full Documentation**: Export `API_DOCUMENTATION` from `apiService.ts`
- **Support**: support@vishnu.ai
- **Status Page**: https://status.vishnu.ai
- **Changelog**: https://vishnu.ai/changelog

---

## 🆘 Troubleshooting

### Issue: "Invalid API key"
**Solution**: Verify your API key is correct and hasn't expired.

### Issue: "Rate limit exceeded"
**Solution**: Upgrade to Business/Enterprise tier or wait for quota reset.

### Issue: "No search results"
**Solution**: Rephrase your query to be more specific.

### Issue: "Slow response times"
**Solution**: Complex queries take longer. Consider simplifying or using caching.

---

**Last Updated**: November 9, 2025
**API Version**: 1.0
**Status**: ✅ Production Ready
