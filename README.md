# Vishnu AI - Advanced Deep Web Search Engine

**AI-powered intelligent search engine with deep web content extraction**

## 🚀 Features

- **Intelligent Search**: Google Custom Search API integration for comprehensive results
- **Deep Web Scraping**: Advanced content extraction with firewall bypass capabilities
  - 6 CORS proxy rotation for reliability
  - 5 rotating user agents to avoid detection
  - Access denied detection and smart retry logic
- **AI-Powered Responses**: Qwen 2.5 72B Instruct via Bytez.js for intelligent answer generation
  - Simulated streaming for real-time results
  - Plain text output with markdown stripping
  - Context-aware summarization
  - Top 5 most relevant sources from different domains per query
- **Persistent Memory**: localStorage-based chat history and bookmarks
  - Auto-save after each search
  - Export/import data as JSON
  - Search history management
- **Glassmorphism UI**: Modern glass-effect design with smooth animations
- **Source Verification**: Smart filtering (only shows successfully extracted content with 50+ words)

## � Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI Components**: Shadcn/ui + Tailwind CSS
- **AI Engine**: Qwen 2.5 72B Instruct (via Bytez.js)
- **Search**: Google Custom Search API
- **Web Scraping**: Custom multi-source scraper
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Deployment**: Vercel

## 📦 Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd vishnu.ai

# Install dependencies
npm install

# Set up environment variables
# Copy .env and add your API keys
# IMPORTANT: You need a Bytez API key for AI features

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔑 Required API Keys

### Bytez API (Required for AI Features)
- **What**: API key for Qwen AI via Bytez.js
- **Get it**: https://bytez.io
- **Free Tier**: Yes, check Bytez website for details

### Google Search API (Required for Search)
- **What**: Custom Search JSON API key
- **Get it**: https://console.cloud.google.com/apis/credentials
- **Also need**: Custom Search Engine ID

## 🚀 GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages.

### Automatic Deployment
Every push to the `main` branch automatically triggers a deployment:
1. GitHub Actions builds the project
2. Deploys to GitHub Pages
3. Available at: `https://<your-username>.github.io/vishnu.ai/`

### Manual Setup Steps
1. Go to repository Settings → Pages
2. Under "Build and deployment":
   - Source: GitHub Actions
3. Push to `main` branch to trigger deployment

### Local Testing
```sh
# Build with production base path
npm run build

# Preview production build
npm run preview
```

## 🔧 Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vishnu.ai.git
   cd vishnu.ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_BYTEZ_API_KEY=your_bytez_api_key
   VITE_GOOGLE_SEARCH_API_KEY=your_google_api_key
   VITE_GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id
   ```

4. **Get API Keys**
   - **Bytez API**: Sign up at [Bytez.io](https://bytez.io) to get your API key
   - **Google Search**: Follow instructions in `GOOGLE_SEARCH_SETUP.md`
   - **Firebase**: Follow instructions in `FIREBASE_SETUP.md`

## 📁 Project Structure

```
src/
├── components/       # UI components
│   ├── ui/          # shadcn/ui components
│   └── NavLink.tsx  # Navigation component
├── pages/           # Page components
│   ├── Index.tsx    # Main search interface
│   └── NotFound.tsx # 404 page
├── services/        # Business logic
│   ├── googleSearch.ts   # Google API integration
│   ├── mistralAI.ts      # AI chat functionality
│   ├── webScraper.ts     # Content extraction
│   └── localStorage.ts   # Data persistence
├── hooks/           # React hooks
└── lib/             # Utilities
```

## 🎨 Glassmorphism Theme

Pure glass-effect design with:
- Enhanced backdrop blur (30px)
- Transparent backgrounds with subtle gradients
- Border highlights with inner glow
- Smooth animations (float, slide-up, shimmer)

## 💾 Data Storage

- **Chat History**: 100 items max
- **Saved Searches**: 50 items max
- **Bookmarks**: 100 items max
- **Export/Import**: JSON format with timestamps

## 🔒 Privacy

All data stored locally in browser. No external tracking or analytics.

---

Built with ❤️ by Vishnu AI
