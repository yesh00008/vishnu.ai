import { chat, AVAILABLE_MODELS } from './mistralAI';

export interface BenchmarkQuestion {
  id: string;
  category: string;
  question: string;
  expectedAnswer: string;
  keywords: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ModelScore {
  modelName: string;
  accuracy: number;
  avgResponseTime: number;
  relevanceScore: number;
  coherenceScore: number;
  factualityScore: number;
  completenessScore: number;
  overallScore: number;
  passRate: number;
  testResults: TestResult[];
}

export interface TestResult {
  questionId: string;
  question: string;
  response: string;
  responseTime: number;
  accuracyScore: number;
  relevanceScore: number;
  passed: boolean;
}

export const BENCHMARK_DATASET: BenchmarkQuestion[] = [
  {
    id: 'q1',
    category: 'General Knowledge',
    question: 'What is the capital of France?',
    expectedAnswer: 'Paris',
    keywords: ['Paris', 'capital', 'France'],
    difficulty: 'easy'
  },
  {
    id: 'q2',
    category: 'Science',
    question: 'Explain the theory of relativity in simple terms.',
    expectedAnswer: 'The theory of relativity describes how space and time are linked for objects moving at consistent speeds. Special relativity shows that time passes differently for objects moving at different speeds, and nothing can travel faster than light.',
    keywords: ['Einstein', 'space', 'time', 'speed', 'light', 'physics'],
    difficulty: 'hard'
  },
  {
    id: 'q3',
    category: 'Mathematics',
    question: 'What is the Pythagorean theorem?',
    expectedAnswer: 'In a right-angled triangle, the square of the hypotenuse equals the sum of squares of the other two sides: a² + b² = c²',
    keywords: ['right triangle', 'hypotenuse', 'square', 'a² + b² = c²'],
    difficulty: 'medium'
  },
  {
    id: 'q4',
    category: 'Programming',
    question: 'What is the difference between == and === in JavaScript?',
    expectedAnswer: '== compares values with type coercion, while === compares both value and type without coercion.',
    keywords: ['type coercion', 'strict equality', 'value', 'type', 'comparison'],
    difficulty: 'medium'
  },
  {
    id: 'q5',
    category: 'History',
    question: 'When did World War II end?',
    expectedAnswer: '1945',
    keywords: ['1945', 'September', 'World War', 'WWII'],
    difficulty: 'easy'
  },
  {
    id: 'q6',
    category: 'Technology',
    question: 'What is machine learning?',
    expectedAnswer: 'Machine learning is a subset of AI that enables systems to learn and improve from experience without being explicitly programmed, using algorithms to identify patterns in data.',
    keywords: ['AI', 'algorithms', 'patterns', 'data', 'learn', 'experience'],
    difficulty: 'medium'
  },
  {
    id: 'q7',
    category: 'Geography',
    question: 'What is the largest ocean on Earth?',
    expectedAnswer: 'Pacific Ocean',
    keywords: ['Pacific', 'ocean', 'largest'],
    difficulty: 'easy'
  },
  {
    id: 'q8',
    category: 'Complex Reasoning',
    question: 'If you have 3 apples and you take away 2, how many do you have?',
    expectedAnswer: '2 apples (the ones you took)',
    keywords: ['2', 'two', 'took away'],
    difficulty: 'medium'
  },
  {
    id: 'q9',
    category: 'Science',
    question: 'What is DNA and what does it do?',
    expectedAnswer: 'DNA (Deoxyribonucleic acid) is a molecule that carries genetic instructions for growth, development, functioning, and reproduction of all living organisms.',
    keywords: ['genetic', 'instructions', 'molecule', 'heredity', 'genes'],
    difficulty: 'hard'
  },
  {
    id: 'q10',
    category: 'Current Affairs',
    question: 'What is climate change?',
    expectedAnswer: 'Climate change refers to long-term shifts in global temperatures and weather patterns, primarily caused by human activities like burning fossil fuels.',
    keywords: ['temperature', 'weather', 'global', 'carbon', 'greenhouse', 'emissions'],
    difficulty: 'medium'
  },
  {
    id: 'q11',
    category: 'Logic',
    question: 'What comes next in the sequence: 2, 4, 8, 16, ?',
    expectedAnswer: '32 (each number is doubled)',
    keywords: ['32', 'double', 'multiply'],
    difficulty: 'easy'
  },
  {
    id: 'q12',
    category: 'Ethics',
    question: 'What is the trolley problem in ethics?',
    expectedAnswer: 'A thought experiment where one must choose between doing nothing and allowing a trolley to kill five people, or pulling a lever to divert it to kill one person instead.',
    keywords: ['dilemma', 'choice', 'five', 'one', 'moral', 'utilitarian'],
    difficulty: 'hard'
  },
  {
    id: 'q13',
    category: 'Language',
    question: 'What is a palindrome?',
    expectedAnswer: 'A word, phrase, or sequence that reads the same backward as forward, like "radar" or "level".',
    keywords: ['backward', 'forward', 'same', 'reads'],
    difficulty: 'easy'
  },
  {
    id: 'q14',
    category: 'Economics',
    question: 'What is inflation?',
    expectedAnswer: 'Inflation is the rate at which the general level of prices for goods and services rises, causing purchasing power to fall.',
    keywords: ['prices', 'purchasing power', 'currency', 'rise', 'decrease'],
    difficulty: 'medium'
  },
  {
    id: 'q15',
    category: 'Philosophy',
    question: 'What is the meaning of "I think, therefore I am"?',
    expectedAnswer: 'Descartes\' philosophical statement meaning that the very act of thinking proves one\'s existence.',
    keywords: ['Descartes', 'existence', 'thinking', 'cogito', 'consciousness'],
    difficulty: 'hard'
  }
];

export const MODEL_CONFIGS = {
  'Vishnu AI': { id: 'qwen-2.5-72b-instruct', service: 'bytez', isVishnu: true },
  'GPT-4 Turbo': { id: 'gpt-4-turbo', service: 'bytez' },
  'GPT-4o Mini': { id: 'gpt-4o-mini', service: 'bytez' },
  'Claude 3.5 Sonnet': { id: 'claude-3-5-sonnet-20241022', service: 'bytez' },
  'Claude 3 Opus': { id: 'claude-3-opus-20240229', service: 'bytez' },
  'Gemini 2.0 Flash': { id: 'gemini-2.0-flash-exp', service: 'bytez' },
  'Gemini 1.5 Pro': { id: 'gemini-1.5-pro', service: 'bytez' },
  'Llama 3.3 70B': { id: 'llama-3.3-70b-versatile', service: 'bytez' },
  'Mistral Large': { id: 'mistral-large-latest', service: 'bytez' },
  'DeepSeek V3': { id: 'deepseek-chat', service: 'bytez' },
  'Command R+': { id: 'command-r-plus', service: 'bytez' },
};

function calculateRelevanceScore(response: string, keywords: string[]): number {
  const lowerResponse = response.toLowerCase();
  const matchedKeywords = keywords.filter(keyword => 
    lowerResponse.includes(keyword.toLowerCase())
  );
  return (matchedKeywords.length / keywords.length) * 100;
}

function calculateCoherenceScore(response: string): number {
  const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length === 0) return 0;
  
  const avgSentenceLength = response.length / sentences.length;
  const hasGoodStructure = avgSentenceLength > 20 && avgSentenceLength < 200;
  const hasPunctuation = /[.!?]/.test(response);
  
  let score = 50;
  if (hasGoodStructure) score += 25;
  if (hasPunctuation) score += 25;
  
  return Math.min(score, 100);
}

function calculateFactualityScore(response: string, expectedAnswer: string): number {
  const lowerResponse = response.toLowerCase();
  const lowerExpected = expectedAnswer.toLowerCase();
  
  const expectedWords = lowerExpected.split(/\s+/);
  const matchedWords = expectedWords.filter(word => 
    word.length > 3 && lowerResponse.includes(word)
  );
  
  return Math.min((matchedWords.length / Math.max(expectedWords.length, 1)) * 100, 100);
}

function calculateCompletenessScore(response: string, difficulty: string): number {
  const wordCount = response.split(/\s+/).length;
  
  const minWords = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 15 : 25;
  const idealWords = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 50 : 100;
  
  if (wordCount < minWords) return (wordCount / minWords) * 50;
  if (wordCount >= idealWords) return 100;
  
  return 50 + ((wordCount - minWords) / (idealWords - minWords)) * 50;
}

async function testModelOnQuestion(
  modelName: string, 
  question: BenchmarkQuestion,
  onProgress?: (progress: string) => void
): Promise<TestResult> {
  const startTime = Date.now();
  
  try {
    onProgress?.(`Testing ${modelName} on: ${question.question.substring(0, 50)}...`);
    
    const modelConfig = MODEL_CONFIGS[modelName as keyof typeof MODEL_CONFIGS];
    const response = await chat(
      [{ role: 'user', content: question.question }],
      modelConfig.id
    );
    
    const responseTime = Date.now() - startTime;
    const responseText = response.content;
    
    const relevanceScore = calculateRelevanceScore(responseText, question.keywords);
    const coherenceScore = calculateCoherenceScore(responseText);
    const factualityScore = calculateFactualityScore(responseText, question.expectedAnswer);
    const completenessScore = calculateCompletenessScore(responseText, question.difficulty);
    
    const accuracyScore = (relevanceScore * 0.3 + factualityScore * 0.5 + completenessScore * 0.2);
    const passed = accuracyScore >= 60;
    
    return {
      questionId: question.id,
      question: question.question,
      response: responseText,
      responseTime,
      accuracyScore,
      relevanceScore,
      passed
    };
  } catch (error) {
    console.error(`Error testing ${modelName}:`, error);
    return {
      questionId: question.id,
      question: question.question,
      response: 'Error: Failed to get response',
      responseTime: Date.now() - startTime,
      accuracyScore: 0,
      relevanceScore: 0,
      passed: false
    };
  }
}

export async function benchmarkModel(
  modelName: string,
  onProgress?: (progress: string) => void
): Promise<ModelScore> {
  onProgress?.(`Starting benchmark for ${modelName}...`);
  
  const testResults: TestResult[] = [];
  
  for (let i = 0; i < BENCHMARK_DATASET.length; i++) {
    const question = BENCHMARK_DATASET[i];
    onProgress?.(`[${i + 1}/${BENCHMARK_DATASET.length}] Testing ${modelName}...`);
    
    const result = await testModelOnQuestion(modelName, question, onProgress);
    testResults.push(result);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  const totalAccuracy = testResults.reduce((sum, r) => sum + r.accuracyScore, 0);
  const totalRelevance = testResults.reduce((sum, r) => sum + r.relevanceScore, 0);
  const totalResponseTime = testResults.reduce((sum, r) => sum + r.responseTime, 0);
  const passedTests = testResults.filter(r => r.passed).length;
  
  const accuracy = totalAccuracy / testResults.length;
  const relevanceScore = totalRelevance / testResults.length;
  const avgResponseTime = totalResponseTime / testResults.length;
  const passRate = (passedTests / testResults.length) * 100;
  
  const coherenceScore = testResults.reduce((sum, r) => {
    return sum + calculateCoherenceScore(r.response);
  }, 0) / testResults.length;
  
  const factualityScore = testResults.reduce((sum, r, i) => {
    return sum + calculateFactualityScore(r.response, BENCHMARK_DATASET[i].expectedAnswer);
  }, 0) / testResults.length;
  
  const completenessScore = testResults.reduce((sum, r, i) => {
    return sum + calculateCompletenessScore(r.response, BENCHMARK_DATASET[i].difficulty);
  }, 0) / testResults.length;
  
  const overallScore = (
    accuracy * 0.30 +
    relevanceScore * 0.20 +
    coherenceScore * 0.15 +
    factualityScore * 0.20 +
    completenessScore * 0.15
  );
  
  onProgress?.(`✓ Completed benchmark for ${modelName}`);
  
  return {
    modelName,
    accuracy: Math.round(accuracy * 100) / 100,
    avgResponseTime: Math.round(avgResponseTime),
    relevanceScore: Math.round(relevanceScore * 100) / 100,
    coherenceScore: Math.round(coherenceScore * 100) / 100,
    factualityScore: Math.round(factualityScore * 100) / 100,
    completenessScore: Math.round(completenessScore * 100) / 100,
    overallScore: Math.round(overallScore * 100) / 100,
    passRate: Math.round(passRate * 100) / 100,
    testResults
  };
}

export async function benchmarkAllModels(
  onProgress?: (progress: string) => void
): Promise<ModelScore[]> {
  const results: ModelScore[] = [];
  
  for (const modelName of Object.keys(MODEL_CONFIGS)) {
    try {
      const score = await benchmarkModel(modelName, onProgress);
      results.push(score);
    } catch (error) {
      console.error(`Failed to benchmark ${modelName}:`, error);
    }
  }
  
  return results.sort((a, b) => b.overallScore - a.overallScore);
}

export function generateResearchPaperData(scores: ModelScore[]) {
  return {
    title: "Comparative Analysis of Large Language Models: A Comprehensive Benchmark Study",
    abstract: `This study presents a comprehensive evaluation of ${scores.length} state-of-the-art large language models across multiple dimensions including accuracy, relevance, coherence, factuality, and completeness. Models were tested on a diverse dataset of ${BENCHMARK_DATASET.length} questions spanning ${new Set(BENCHMARK_DATASET.map(q => q.category)).size} different categories.`,
    methodology: {
      dataset: `${BENCHMARK_DATASET.length} questions across ${new Set(BENCHMARK_DATASET.map(q => q.category)).size} categories`,
      metrics: ['Accuracy', 'Relevance', 'Coherence', 'Factuality', 'Completeness', 'Response Time', 'Pass Rate'],
      scoring: 'Weighted average with accuracy (30%), factuality (20%), relevance (20%), coherence (15%), and completeness (15%)'
    },
    results: scores,
    topPerformer: scores[0],
    categories: Array.from(new Set(BENCHMARK_DATASET.map(q => q.category)))
  };
}
