// Local Storage Service for Chat Memory and Preferences

export interface ChatHistory {
  id: string;
  timestamp: number;
  query: string;
  response: string;
  sources?: any[];
}

export interface SavedSearch {
  id: string;
  timestamp: number;
  title: string;
  sources: any[];
}

export interface UserPreferences {
  theme?: 'dark' | 'light';
  maxHistoryItems?: number;
  autoSave?: boolean;
  searchLanguage?: string;
}

const STORAGE_KEYS = {
  CHAT_HISTORY: 'vishnu_chat_history',
  SAVED_SEARCHES: 'vishnu_saved_searches',
  PREFERENCES: 'vishnu_preferences',
  BOOKMARKS: 'vishnu_bookmarks',
};

// Chat History Management
export function saveChatHistory(chat: ChatHistory): void {
  try {
    const history = getChatHistory();
    history.unshift(chat);
    // Keep only last 100 chats
    const trimmed = history.slice(0, 100);
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
}

export function getChatHistory(): ChatHistory[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading chat history:', error);
    return [];
  }
}

export function clearChatHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
  } catch (error) {
    console.error('Error clearing chat history:', error);
  }
}

export function deleteChatById(id: string): void {
  try {
    const history = getChatHistory();
    const filtered = history.filter(chat => chat.id !== id);
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting chat:', error);
  }
}

// Saved Searches Management
export function saveSearch(search: SavedSearch): void {
  try {
    const searches = getSavedSearches();
    searches.unshift(search);
    // Keep only last 50 searches
    const trimmed = searches.slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.SAVED_SEARCHES, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Error saving search:', error);
  }
}

export function getSavedSearches(): SavedSearch[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SAVED_SEARCHES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading saved searches:', error);
    return [];
  }
}

export function deleteSearchById(id: string): void {
  try {
    const searches = getSavedSearches();
    const filtered = searches.filter(search => search.id !== id);
    localStorage.setItem(STORAGE_KEYS.SAVED_SEARCHES, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting search:', error);
  }
}

// Bookmarks Management
export function addBookmark(url: string, title: string, snippet?: string): void {
  try {
    const bookmarks = getBookmarks();
    const bookmark = {
      id: Date.now().toString(),
      url,
      title,
      snippet,
      timestamp: Date.now(),
    };
    bookmarks.unshift(bookmark);
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks.slice(0, 100)));
  } catch (error) {
    console.error('Error adding bookmark:', error);
  }
}

export function getBookmarks(): any[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading bookmarks:', error);
    return [];
  }
}

export function removeBookmark(id: string): void {
  try {
    const bookmarks = getBookmarks();
    const filtered = bookmarks.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing bookmark:', error);
  }
}

// User Preferences
export function savePreferences(prefs: UserPreferences): void {
  try {
    const current = getPreferences();
    const updated = { ...current, ...prefs };
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving preferences:', error);
  }
}

export function getPreferences(): UserPreferences {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    return data ? JSON.parse(data) : {
      theme: 'dark',
      maxHistoryItems: 100,
      autoSave: true,
      searchLanguage: 'en',
    };
  } catch (error) {
    console.error('Error loading preferences:', error);
    return {
      theme: 'dark',
      maxHistoryItems: 100,
      autoSave: true,
      searchLanguage: 'en',
    };
  }
}

// Export/Import Data
export function exportAllData(): string {
  try {
    const data = {
      chatHistory: getChatHistory(),
      savedSearches: getSavedSearches(),
      bookmarks: getBookmarks(),
      preferences: getPreferences(),
      exportDate: new Date().toISOString(),
      version: '1.0',
    };
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error exporting data:', error);
    return '';
  }
}

export function importData(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData);
    if (data.chatHistory) {
      localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(data.chatHistory));
    }
    if (data.savedSearches) {
      localStorage.setItem(STORAGE_KEYS.SAVED_SEARCHES, JSON.stringify(data.savedSearches));
    }
    if (data.bookmarks) {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(data.bookmarks));
    }
    if (data.preferences) {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(data.preferences));
    }
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
}

// Storage Usage
export function getStorageUsage(): { used: number; total: number; percentage: number } {
  try {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    const used = total;
    const maxStorage = 5 * 1024 * 1024; // 5MB typical limit
    return {
      used,
      total: maxStorage,
      percentage: (used / maxStorage) * 100,
    };
  } catch (error) {
    console.error('Error calculating storage:', error);
    return { used: 0, total: 0, percentage: 0 };
  }
}
