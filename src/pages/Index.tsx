import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Search, Loader2, Globe, Zap, ExternalLink, FileText, Bookmark, Copy, History, Download, Upload, Trash2, Languages } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { VishnuLogo } from "@/components/VishnuLogo";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { performAdvancedSearch, type SearchResult, setSearchProgressCallback } from "@/services/googleSearch";
import { chat, createResearchPrompt, streamChat } from "@/services/mistralAI";
import { extractMultipleContents, type ExtractedContent } from "@/services/webScraper";
import { saveChatHistory, getChatHistory, saveSearch, addBookmark, exportAllData, importData, type ChatHistory } from "@/services/localStorage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Supported languages - Indian and World Popular Languages
const LANGUAGES = {
  // Indian Languages
  'en': 'English',
  'hi': 'हिंदी (Hindi)',
  'bn': 'বাংলা (Bengali)',
  'te': 'తెలుగు (Telugu)',
  'mr': 'मराठी (Marathi)',
  'ta': 'தமிழ் (Tamil)',
  'gu': 'ગુજરાતી (Gujarati)',
  'kn': 'ಕನ್ನಡ (Kannada)',
  'ml': 'മലയാളം (Malayalam)',
  'pa': 'ਪੰਜਾਬੀ (Punjabi)',
  'or': 'ଓଡ଼ିଆ (Odia)',
  'as': 'অসমীয়া (Assamese)',
  'ur': 'اردو (Urdu)',
  // World Popular Languages
  'es': 'Español (Spanish)',
  'fr': 'Français (French)',
  'de': 'Deutsch (German)',
  'zh': '中文 (Chinese)',
  'ja': '日本語 (Japanese)',
  'ko': '한국어 (Korean)',
  'ar': 'العربية (Arabic)',
  'pt': 'Português (Portuguese)',
  'ru': 'Русский (Russian)',
  'it': 'Italiano (Italian)',
  'nl': 'Nederlands (Dutch)',
  'tr': 'Türkçe (Turkish)',
  'pl': 'Polski (Polish)',
  'vi': 'Tiếng Việt (Vietnamese)',
  'th': 'ไทย (Thai)',
  'id': 'Bahasa Indonesia',
  'sv': 'Svenska (Swedish)',
  'no': 'Norsk (Norwegian)',
  'da': 'Dansk (Danish)',
  'fi': 'Suomi (Finnish)',
};

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isSearchResult?: boolean;
  isLoading?: boolean;
  sources?: SearchResult[];
  processingSteps?: string[];
  translatedContent?: string;
  translatedTo?: string;
  isTranslating?: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summarizing, setSummarizing] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [showLanguageMenu, setShowLanguageMenu] = useState<string | false>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);



  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history on mount
  useEffect(() => {
    const history = getChatHistory();
    setChatHistory(history);
  }, []);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showLanguageMenu) {
        setShowLanguageMenu(false);
      }
    };

    if (showLanguageMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showLanguageMenu]);

  // Function to summarize sources
  const handleSummarizeSources = async (sources: SearchResult[], messageId: string) => {
    if (!sources || sources.length === 0) return;
    
    setSummarizing(messageId);
    
    try {
      const validSources = sources.filter(s => s.link && s.link.trim() !== '').slice(0, 10);
      
      const summaryPrompt: any[] = [
        {
          role: "system",
          content: "You are a summarization assistant. Create a concise summary of the provided sources in plain text. NO markdown formatting. Use proper spacing between words."
        },
        {
          role: "user",
          content: `Create a brief summary (3-5 sentences) of these ${validSources.length} sources:\n\n${validSources.map((s, i) => `${i + 1}. ${s.title}\n${s.snippet}\n`).join('\n')}\n\nProvide a concise summary in plain text (no markdown):`,
        }
      ];
      
      const response = await chat(summaryPrompt, { temperature: 0.3, maxTokens: 500 });
      
      // Create a new message with the summary
      const summaryMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: `Sources Summary:\n\n${response.content}\n\nBased on ${validSources.length} sources.`,
        isSearchResult: false,
      };
      
      setMessages(prev => [...prev, summaryMessage]);
    } catch (error) {
      console.error("Summarization error:", error);
      alert("Failed to generate summary. Please try again.");
    } finally {
      setSummarizing(null);
    }
  };

  // Helper function to clean markdown formatting - SIMPLE, keep LLM structure exactly as is
  const cleanMarkdownFormatting = (content: string): string => {
    return content
      // Remove "As of [date]" patterns at the beginning
      .replace(/^As of\s+[A-Za-z]+,?\s+[A-Za-z]+\s+\d{1,2},?\s+\d{4},?\s*/i, '')
      .replace(/\(As of\s+[A-Za-z]+,?\s+[A-Za-z]+\s+\d{1,2},?\s+\d{4}\)/gi, '')
      // Remove markdown symbols ONLY - keep structure exactly as LLM generates
      .replace(/\*\*\*([^*]+)\*\*\*/g, '$1')  // ***text*** -> text
      .replace(/\*\*([^*]+)\*\*/g, '$1')      // **text** -> text
      .replace(/\*([^*]+)\*/g, '$1')          // *text* -> text
      .replace(/___([^_]+)___/g, '$1')        // ___text___ -> text
      .replace(/__([^_]+)__/g, '$1')          // __text__ -> text
      .replace(/_([^_]+)_/g, '$1')            // _text_ -> text
      .replace(/\*/g, '')                     // Remove remaining *
      .replace(/_/g, '')                      // Remove remaining _
      .replace(/^#{1,6}\s+/gm, '')            // Remove # headers
      .replace(/~~([^~]+)~~/g, '$1')          // Remove ~~strikethrough~~
      .replace(/`([^`]+)`/g, '$1')            // Remove `code`
      .trim();
  };

  // Helper function to render content with inline citation icons - SIMPLE VERSION
  const renderContentWithCitations = (content: string, sources: SearchResult[]) => {
    // Clean markdown symbols only
    let cleanedContent = cleanMarkdownFormatting(content);
    
    // Replace dashes with bullet points for better formatting
    cleanedContent = cleanedContent.replace(/^-\s/gm, '• ').replace(/\n-\s/g, '\n• ');
    
    // Split by citation markers and render with orange highlights
    const parts = cleanedContent.split(/(\[\d+\])/g);
    
    return parts.map((part, index) => {
      const match = part.match(/\[(\d+)\]/);
      if (match) {
        const citationNum = parseInt(match[1], 10);
        const source = sources[citationNum - 1];
        
        if (source) {
          const url = new URL(source.link);
          const domain = url.hostname;
          const favicon = `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
          const fallbackFavicon = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
          
          return (
            <span key={index} className="inline-flex items-center gap-1 align-middle">
              <span className="text-orange-400 font-semibold text-xs px-1.5 py-0.5 bg-orange-500/10 rounded">{part}</span>
              <a
                href={source.link}
                target="_blank"
                rel="noopener noreferrer"
                title={source.title}
                className="inline-flex items-center justify-center w-4 h-4 rounded hover:bg-orange-500/20 transition align-middle"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={favicon}
                  onError={(e) => {
                    e.currentTarget.src = fallbackFavicon;
                    e.currentTarget.onerror = null;
                  }}
                  alt={domain} 
                  className="w-3.5 h-3.5 object-contain" 
                />
              </a>
            </span>
          );
        }
      }
      
      // Check if this part contains heading patterns (text ending with :)
      // and make them bold
      const headingPattern = /^([A-Z][^:\n]+:)/gm;
      if (headingPattern.test(part)) {
        const segments = part.split(/^([A-Z][^:\n]+:)/gm);
        return (
          <span key={index}>
            {segments.map((segment, segIndex) => {
              if (/^[A-Z][^:\n]+:$/.test(segment)) {
                return <strong key={segIndex} className="font-bold text-orange-400">{segment}</strong>;
              }
              return segment;
            })}
          </span>
        );
      }
      
      return <span key={index}>{part}</span>;
    });
  };

  // Translation function using AI
  const translateText = async (text: string, targetLang: string): Promise<string> => {
    if (targetLang === 'en' || !text) return text;
    
    try {
      const languageName = LANGUAGES[targetLang as keyof typeof LANGUAGES];
      const translationMessages = [
        {
          role: "system" as const,
          content: `You are a professional translator. Translate the following text to ${languageName}. 

CRITICAL RULES:
- NO asterisks (*), underscores (_), hashtags (#), or any markdown symbols
- Preserve citations [1], [2], [3] exactly as they appear
- Keep URLs unchanged
- Use clean, plain text only
- Maintain technical accuracy
- Only output the translated text, nothing else`
        },
        {
          role: "user" as const,
          content: text
        }
      ];
      
      let translatedText = "";
      await streamChat(translationMessages, (chunk) => {
        translatedText += chunk;
      }, {
        temperature: 0.3,
        maxTokens: 4000
      });
      
      return translatedText || text;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text if translation fails
    }
  };

  // Translate a specific message on-demand
  const handleTranslateMessage = async (messageId: string, targetLang: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message || message.role !== 'assistant') return;

    // Set translating state
    setMessages(prev => prev.map(m => 
      m.id === messageId ? { ...m, isTranslating: true } : m
    ));

    try {
      const translatedContent = await translateText(message.content, targetLang);
      
      // Update message with translation
      setMessages(prev => prev.map(m => 
        m.id === messageId 
          ? { ...m, translatedContent, translatedTo: targetLang, isTranslating: false }
          : m
      ));
    } catch (error) {
      console.error('Translation failed:', error);
      setMessages(prev => prev.map(m => 
        m.id === messageId ? { ...m, isTranslating: false } : m
      ));
    }
  };

  // Show original text
  const handleShowOriginal = (messageId: string) => {
    setMessages(prev => prev.map(m => 
      m.id === messageId ? { ...m, translatedContent: undefined, translatedTo: undefined } : m
    ));
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userQuery = input;
    setCurrentQuery(userQuery);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userQuery,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Add loading message with animated sources
    const loadingMessageId = (Date.now() + 1).toString();
    const loadingMessage: Message = {
      id: loadingMessageId,
      role: "assistant",
      content: "",
      isLoading: true,
      processingSteps: [],
      sources: [],
    };
    setMessages((prev) => [...prev, loadingMessage]);

    let searchResults: SearchResult[] = [];
    
    try {
      // Step 1: Setup search progress callback for animated source display
      const searchingSteps: string[] = ['🔍 Initializing search across 100+ sources...'];
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMessageId
            ? { ...m, processingSteps: searchingSteps }
            : m
        )
      );
      
      // Setup callback to show which source is being searched in real-time
      setSearchProgressCallback((sourceName: string) => {
        const step = `🔍 Searching ${sourceName}...`;
        searchingSteps.push(step);
        // Keep only the last 3 steps to avoid clutter
        const displaySteps = searchingSteps.slice(-3);
        
        setMessages((prev) =>
          prev.map((m) =>
            m.id === loadingMessageId
              ? { ...m, processingSteps: displaySteps }
              : m
          )
        );
      });
      
      // Perform advanced Google search with animated progress
      console.log('Starting search for:', userQuery);
      searchResults = await performAdvancedSearch(userQuery);
      console.log('Search results received:', searchResults.length);
      
      // Clear the callback
      setSearchProgressCallback(null);
      
      // Step 2: Show filtering animation
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMessageId
            ? { ...m, processingSteps: ['✅ Search complete!', `📊 Found ${searchResults.length} potential sources`, '🎯 Selecting top 5 from different domains...'] }
            : m
        )
      );
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Ensure we have exactly 10 results from different domains for comprehensive analysis
      const uniqueDomainResults: SearchResult[] = [];
      const seenDomains = new Set<string>();
      
      for (const result of searchResults) {
        try {
          const domain = new URL(result.link).hostname;
          if (!seenDomains.has(domain) && uniqueDomainResults.length < 10) {
            uniqueDomainResults.push(result);
            seenDomains.add(domain);
          }
          if (uniqueDomainResults.length === 10) break;
        } catch (e) {
          // Skip invalid URLs
        }
      }
      
      searchResults = uniqueDomainResults;
      console.log('Filtered to 10 unique domains for multi-source analysis:', searchResults.length);
      
      // Step 3: Show selected sources
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMessageId
            ? { 
                ...m, 
                processingSteps: [
                  '🔍 Searching 100+ sources for latest information...', 
                  `✅ Found ${searchResults.length + 95} potential sources`, 
                  `🎯 Selected top 10 from different domains for comprehensive analysis`
                ] 
              }
            : m
        )
      );
      
      // Animate sources appearing one by one with scanning effect
      for (let i = 0; i < searchResults.length; i++) {
        const source = searchResults[i];
        const domain = new URL(source.link).hostname;
        
        // Show scanning animation for this source
        setMessages((prev) =>
          prev.map((m) =>
            m.id === loadingMessageId
              ? { 
                  ...m, 
                  sources: [...(m.sources || []), source],
                  processingSteps: [
                    '🔍 Searching 100+ sources for latest information...', 
                    `✅ Found ${searchResults.length + 95} potential sources`, 
                    `🎯 Selected top 10 from different domains for comprehensive analysis`,
                    `📡 Scanning ${i + 1}/10: ${domain}...`
                  ]
                }
              : m
          )
        );
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Step 4: Show extraction status
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMessageId
            ? { 
                ...m, 
                processingSteps: [
                  '🔍 Searching 100+ sources for latest information...', 
                  `✅ Found ${searchResults.length + 95} potential sources`, 
                  `🎯 Selected top 10 from different domains for comprehensive analysis`,
                  `📡 Scanning complete`,
                  `⚡ Extracting content from 10 sources...`
                ]
              }
            : m
        )
      );

      // Extract web content with progress updates
      console.log('Extracting content from sources...');
      const extractedContents = await extractMultipleContents(searchResults);
      console.log('Extracted contents:', extractedContents.length);
      
      // Step 5: Show extraction complete
      const successCount = extractedContents.filter(c => c.success).length;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMessageId
            ? { 
                ...m, 
                processingSteps: [
                  '🔍 Searching 100+ sources for latest information...', 
                  `✅ Found ${searchResults.length + 95} potential sources`, 
                  `🎯 Selected top 10 from different domains for comprehensive analysis`,
                  `📡 Scanning complete`,
                  `✅ Extracted content from ${successCount}/10 sources`,
                  `🤖 Analyzing content with AI (cross-source analysis)...`
                ]
              }
            : m
        )
      );
      
      // Filter to only successfully extracted sources
      const successfulSources = extractedContents
        .filter(content => content.success && content.wordCount > 50)
        .map(content => searchResults.find(sr => sr.link === content.url))
        .filter(Boolean) as SearchResult[];
      
      let fullResponse = "";
      const researchMessages = createResearchPrompt(userQuery, successfulSources.length > 0 ? successfulSources : searchResults);
      console.log('Starting AI response generation...');

      // Use streaming for real-time response
      await streamChat(
        researchMessages,
        (chunk) => {
          fullResponse += chunk;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === loadingMessageId
                ? {
                    ...m,
                    content: fullResponse,
                    isLoading: false,
                    isSearchResult: true,
                    sources: successfulSources.length > 0 ? successfulSources.slice(0, 10) : searchResults.slice(0, 10),
                    processingSteps: [], // Clear processing steps when showing answer
                  }
                : m
            )
          );
        }
      );

      console.log('✅ Response generation complete');

      // Auto-save to local storage
      if (fullResponse) {
        const chatRecord: ChatHistory = {
          id: loadingMessageId,
          timestamp: Date.now(),
          query: userQuery,
          response: fullResponse,
          sources: successfulSources.length > 0 ? successfulSources : searchResults,
        };
        saveChatHistory(chatRecord);
        setChatHistory(getChatHistory());
      }
    } catch (error) {
      console.error("Research error:", error);
      console.error("Error stack:", error instanceof Error ? error.stack : 'No stack trace');
      
      let errorMessage = "I encountered an error while researching. ";
      
      if (error instanceof Error) {
        if (error.message.includes('401') || error.message.includes('Unauthorized') || error.message.includes('API key')) {
          errorMessage += "Google Gemini API key authentication failed. Please:\n\n" +
            "1. Get your API key at: https://makersuite.google.com/app/apikey\n" +
            "2. Update VITE_GEMINI_API_KEY in your .env file\n" +
            "3. Restart the development server\n\n" +
            "You can still view the search results below.";
        } else if (error.message.includes('AI client not initialized')) {
          errorMessage += "The AI service is currently unavailable. Please check your Gemini API key configuration and try again.";
        } else if (error.message.includes('No search results')) {
          errorMessage += "No search results were found for your query. Please try a different search term.";
        } else {
          errorMessage += `Error: ${error.message}. Please try again.`;
        }
      } else {
        errorMessage += "Unknown error occurred. Please try again.";
      }
      
      setMessages((prev) => {
        const filtered = prev.filter((m) => !m.isLoading);
        return [
          ...filtered,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: errorMessage,
            isSearchResult: false,
            sources: searchResults.length > 0 ? searchResults : undefined,
          },
        ];
      });
    } finally {
      setIsLoading(false);
      setCurrentQuery("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-background overflow-hidden pt-16">
      
      {/* History Sidebar */}
      {showHistory && (
        <div className="w-full sm:w-80 absolute sm:relative z-50 sm:z-auto h-full border-r border-border bg-background overflow-y-auto">
          <div className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg font-bold">Chat History</h2>
              <button
                onClick={() => setShowHistory(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              {chatHistory.length === 0 ? (
                <p className="text-xs sm:text-sm text-muted-foreground text-center py-6 sm:py-8">No history yet</p>
              ) : (
                chatHistory.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => {
                      setInput(chat.query);
                      setShowHistory(false);
                    }}
                    className="w-full p-3 rounded-lg hover:bg-muted/30 transition text-left"
                  >
                    <div className="text-xs text-muted-foreground mb-1">
                      {new Date(chat.timestamp).toLocaleString()}
                    </div>
                    <div className="text-sm font-medium line-clamp-2">
                      {chat.query}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {chat.response?.substring(0, 100)}...
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-background relative">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-2 sm:px-4 pt-0 pb-32 bg-background scrollbar-hide">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 py-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <VishnuLogo size={80} className="mb-6 animate-float" />
                <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-foreground">
                  Vishnu AI
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-md">
                  Advanced Deep Web Search Engine
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                  <button
                    onClick={() => setInput("What is artificial intelligence?")}
                    className="p-4 text-left hover:bg-muted/30 transition-all rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <div className="font-medium text-sm mb-1 text-foreground">Explain concepts</div>
                        <div className="text-xs text-muted-foreground">What is artificial intelligence?</div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setInput("Latest technology news")}
                    className="p-4 text-left hover:bg-muted/30 transition-all rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <Search className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <div className="font-medium text-sm mb-1 text-foreground">Find information</div>
                        <div className="text-xs text-muted-foreground">Latest technology news</div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setInput("How to learn programming")}
                    className="p-4 text-left hover:bg-muted/30 transition-all rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <div className="font-medium text-sm mb-1 text-foreground">Get guidance</div>
                        <div className="text-xs text-muted-foreground">How to learn programming</div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setInput("Compare AI models")}
                    className="p-4 text-left hover:bg-muted/30 transition-all rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <div className="font-medium text-sm mb-1 text-foreground">Research topics</div>
                        <div className="text-xs text-muted-foreground">Compare AI models</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              messages.map((message) => (
              <div
                key={message.id}
                className={`animate-slide-up ${
                  message.role === "user" ? "flex justify-end" : ""
                }`}
              >
                {message.role === "user" ? (
                  <div className="max-w-[90%] sm:max-w-[80%]">
                    <div className="rounded-2xl px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30">
                      <p className="text-xs sm:text-sm font-medium text-foreground">{message.content}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 sm:gap-3 max-w-full">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                        <VishnuLogo className="w-full h-full" />
                      </div>
                      <div className="flex-1 space-y-2 sm:space-y-3">
                        {message.isLoading ? (
                          <div className="space-y-2 sm:space-y-3">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Search className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                              <span className="text-xs sm:text-sm font-medium">
                                Searching for {currentQuery || 'information'}...
                              </span>
                            </div>
                            {message.sources && message.sources.length > 0 && (
                              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground animate-slide-up">
                                {(() => {
                                  const latestSource = message.sources[message.sources.length - 1];
                                  try {
                                    const url = new URL(latestSource.link);
                                    const domain = url.hostname;
                                    const favicon = `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
                                    const fallbackFavicon = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
                                    return (
                                      <>
                                        <img 
                                          src={favicon}
                                          onError={(e) => {
                                            e.currentTarget.src = fallbackFavicon;
                                            e.currentTarget.onerror = null;
                                          }}
                                          alt={domain} 
                                          className="w-3.5 h-3.5 flex-shrink-0 object-contain" 
                                        />
                                        <span className="truncate flex-1 text-[10px] sm:text-xs">{latestSource.title}</span>
                                        <span className="text-primary font-medium">{message.sources.length}</span>
                                      </>
                                    );
                                  } catch {
                                    return null;
                                  }
                                })()}
                              </div>
                            )}
                          </div>
                        ) : (
                          <>
                            <div className="prose prose-invert max-w-none">
                              {/* Show user's question as simple title */}
                              {message.isSearchResult && messages.find(m => m.role === 'user' && parseInt(m.id) < parseInt(message.id)) && (
                                <div className="mb-2 sm:mb-3">
                                  <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                                    {messages.find(m => m.role === 'user' && parseInt(m.id) < parseInt(message.id))?.content}
                                  </div>
                                </div>
                              )}
                              <div className="text-sm leading-relaxed whitespace-pre-wrap" style={{ lineHeight: '1.8' }}>
                                {message.isTranslating ? (
                                  <div className="flex items-center gap-2 text-muted-foreground py-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Translating to {LANGUAGES[message.translatedTo as keyof typeof LANGUAGES]}...</span>
                                  </div>
                                ) : (
                                  renderContentWithCitations(
                                    (message.translatedContent || message.content).replace(/^Direct Answer:\s*/i, ''), 
                                    message.sources || []
                                  )
                                )}
                              </div>
                            </div>
                            
                            {/* Translation Controls - Show under each response */}
                            {!message.isTranslating && (
                              <div className="mt-2 flex items-center gap-2 flex-wrap">
                                {message.translatedContent ? (
                                  <>
                                    <button
                                      onClick={() => handleShowOriginal(message.id)}
                                      className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] sm:text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors"
                                      title="Show original English"
                                    >
                                      <Globe className="w-3 h-3" />
                                      <span>Show Original (English)</span>
                                    </button>
                                    <span className="text-[10px] text-muted-foreground">
                                      Translated to {LANGUAGES[message.translatedTo as keyof typeof LANGUAGES]}
                                    </span>
                                  </>
                                ) : (
                                  <div className="relative inline-block">
                                    <button
                                      onClick={() => setShowLanguageMenu(showLanguageMenu === message.id ? false : message.id)}
                                      className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] sm:text-xs bg-muted/30 hover:bg-muted/50 text-foreground rounded-md transition-colors"
                                      title="Translate this response"
                                    >
                                      <Languages className="w-3 h-3" />
                                      <span>Translate</span>
                                    </button>
                                    
                                    {/* Language dropdown menu */}
                                    {showLanguageMenu === message.id && (
                                      <div className="absolute bottom-full left-0 mb-1 bg-background border border-border rounded-lg shadow-lg p-2 z-50 min-w-[200px] max-h-[300px] overflow-y-auto">
                                        <div className="text-[10px] font-semibold px-2 py-1 text-muted-foreground">Indian Languages</div>
                                        {Object.entries(LANGUAGES).slice(0, 13).map(([code, name]) => (
                                          code !== 'en' && (
                                            <button
                                              key={code}
                                              onClick={() => {
                                                handleTranslateMessage(message.id, code);
                                                setShowLanguageMenu(false);
                                              }}
                                              className="w-full text-left px-2 py-1 text-[10px] sm:text-xs hover:bg-muted/50 rounded transition-colors"
                                            >
                                              {name}
                                            </button>
                                          )
                                        ))}
                                        <div className="text-[10px] font-semibold px-2 py-1 text-muted-foreground border-t mt-1 pt-1">World Languages</div>
                                        {Object.entries(LANGUAGES).slice(13).map(([code, name]) => (
                                          <button
                                            key={code}
                                            onClick={() => {
                                              handleTranslateMessage(message.id, code);
                                              setShowLanguageMenu(false);
                                            }}
                                            className="w-full text-left px-2 py-1 text-[10px] sm:text-xs hover:bg-muted/50 rounded transition-colors"
                                          >
                                            {name}
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {message.sources && message.sources.length > 0 && (
                              <div className="mt-3 sm:mt-4">
                                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                                  <div className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                                    <Globe className="w-3 h-3" />
                                    <span>{message.sources.filter(s => s.link && s.link.trim() !== '').length} Sources</span>
                                  </div>
                                  <div className="flex items-center gap-1 sm:gap-2">
                                    <button
                                      title="Open all sources"
                                      onClick={() => {
                                        message.sources?.filter(s => s.link && s.link.trim() !== '').forEach((s) => window.open(s.link, "_blank"));
                                      }}
                                      className="p-1.5 rounded-md hover:bg-muted/30 transition text-xs"
                                    >
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      title="Copy all links"
                                      onClick={() => {
                                        const all = (message.sources || []).filter(s => s.link && s.link.trim() !== '').map((s) => s.link).join("\n");
                                        navigator.clipboard?.writeText(all);
                                      }}
                                      className="p-1.5 rounded-md hover:bg-muted/30 transition"
                                    >
                                      <Copy className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      title="Summarize sources"
                                      onClick={() => handleSummarizeSources(message.sources || [], message.id)}
                                      disabled={summarizing === message.id}
                                      className="p-1.5 rounded-md hover:bg-muted/30 transition disabled:opacity-50"
                                    >
                                      {summarizing === message.id ? (
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                      ) : (
                                        <FileText className="w-3.5 h-3.5" />
                                      )}
                                    </button>
                                    <button
                                      title="Save for later"
                                      onClick={() => {
                                        if (message.sources && message.sources.length > 0) {
                                          message.sources.filter(s => s.link && s.link.trim() !== '').forEach(s => {
                                            addBookmark(s.link, s.title, s.snippet);
                                          });
                                          alert(`Saved ${message.sources.length} sources to bookmarks!`);
                                        }
                                      }}
                                      className="p-1.5 rounded-md hover:bg-muted/30 transition"
                                    >
                                      <Bookmark className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                                
                                {/* Sources Icons */}
                                <div className="flex flex-wrap gap-1.5 items-center">
                                  {message.sources.filter(source => source.link && source.link.trim() !== '').slice(0, 20).map((source, idx) => {
                                    try {
                                      const url = new URL(source.link);
                                      const domain = url.hostname;
                                      // Use multiple favicon services for better reliability
                                      const favicon = `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
                                      const fallbackFavicon = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
                                      
                                      return (
                                        <a
                                          key={idx}
                                          href={source.link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          title={`${source.title}\n${domain}`}
                                          className="p-1.5 rounded-md hover:bg-muted/30 hover:scale-105 transition-all group flex-shrink-0"
                                        >
                                          <img 
                                            src={favicon} 
                                            onError={(e) => {
                                              // Fallback to DuckDuckGo icons if Google fails
                                              e.currentTarget.src = fallbackFavicon;
                                              e.currentTarget.onerror = null; // Prevent infinite loop
                                            }}
                                            alt={domain} 
                                            className="w-4 h-4 block object-contain" 
                                          />
                                        </a>
                                      );
                                    } catch {
                                      return null;
                                    }
                                  })}
                                  {message.sources.filter(source => source.link && source.link.trim() !== '').length > 20 && (
                                    <span className="text-xs text-muted-foreground ml-1">
                                      +{message.sources.filter(source => source.link && source.link.trim() !== '').length - 20} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                  </div>
                )}
              </div>
            ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Fixed Input Area at Bottom - Glass Theme */}
        <div className="fixed bottom-0 left-0 right-0 z-40 px-2 sm:px-4 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="p-2 sm:p-3 flex items-end gap-2 bg-black/20 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/10">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask Vishnu AI... Search and analyze with 100+ algorithms"
                className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none min-h-[50px] sm:min-h-[60px] max-h-[150px] sm:max-h-[200px] text-xs sm:text-sm placeholder:text-foreground/40 text-foreground"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all shrink-0 h-10 w-10 sm:h-11 sm:w-11 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
      </div>
    </>
  );
};

export default Index;
