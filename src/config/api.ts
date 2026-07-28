// src/config/api.ts
export const getGeminiApiKey = (): string => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('Gemini API key is missing!');
    
    // Show user-friendly message in development
    if (import.meta.env.DEV) {
      console.warn('⚠️ Please add VITE_GEMINI_API_KEY to your .env file');
    }
    
    return '';
  }
  
  return apiKey;
};

export const isApiConfigured = (): boolean => {
  return !!getGeminiApiKey();
};