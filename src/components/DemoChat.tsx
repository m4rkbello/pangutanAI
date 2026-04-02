import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Send, Loader2, StopCircle, Trash2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function DemoChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(false);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);
  const lastRequestTime = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError('');
  };

  // Throttle function to limit request rate
  const canMakeRequest = () => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime.current;
    const minInterval = 4000; // 4 seconds between requests (15 RPM = 1 every 4 seconds)
    
    if (timeSinceLastRequest < minInterval) {
      const waitTime = Math.ceil((minInterval - timeSinceLastRequest) / 1000);
      setError(`Please wait ${waitTime} seconds between messages. Free tier limit: 15 requests per minute.`);
      return false;
    }
    
    lastRequestTime.current = now;
    return true;
  };

const sendMessage = async () => {
  if (!input.trim() || isLoading) return;
  
  // Check rate limit
  if (!canMakeRequest()) return;
  
  // Check cooldown from previous rate limit
  if (cooldown) {
    setError('Please wait a moment before sending another message.');
    return;
  }

  const userMessage = { role: 'user', content: input };
  setMessages(prev => [...prev, userMessage]);
  setInput('');
  setIsLoading(true);
  setError('');

  abortControllerRef.current = new AbortController();

  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('Gemini API key not found. Please check your .env file.');
    }

    const geminiMessages = messages.concat(userMessage).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // ✅ FIXED: Use a valid model name from your list
    // Options: 'gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.0-flash'
    const modelName = 'gemini-2.5-flash'; // Changed this line
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: geminiMessages,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000,
        },
      }),
      signal: abortControllerRef.current.signal,
    });

    if (response.status === 429) {
      setCooldown(true);
      setTimeout(() => setCooldown(false), 60000);
      throw new Error('Rate limit exceeded. Please wait 60 seconds before sending more messages.');
    }

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error?.message || `API Error: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const assistantResponse = data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I could not generate a response.';

    setMessages(prev => [...prev, { role: 'assistant', content: assistantResponse }]);

  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Request cancelled');
    } else {
      console.error('API Error:', error);
      setError(error.message || 'Failed to get response from Gemini. Please try again.');
      setMessages(prev => prev.slice(0, -1));
    }
  } finally {
    setIsLoading(false);
    abortControllerRef.current = null;
  }
};

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section id="demo" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Try PangutanAI Demo
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Experience Google Gemini's capabilities in real-time
          </p>
        </div>

        <Card className="bg-white dark:bg-gray-800 shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${cooldown ? 'bg-yellow-500 animate-pulse' : 'bg-green-500 animate-pulse'}`} />
              <span className="text-sm font-medium">
                {cooldown ? 'Rate Limited - Please Wait' : 'Google Gemini 2.0 Flash • Free'}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearChat}
              className="text-gray-500 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                <Sparkles className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-lg">Ask me anything!</p>
                <p className="text-sm mt-2">Try: "What can you do?" or "Write a React component"</p>
                <p className="text-xs mt-4 text-yellow-500">⚠️ Free tier: 15 requests per minute. Please wait 4 seconds between messages.</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}
            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={cooldown ? "Please wait. Rate limit active..." : "Ask PangutanAI anything..."}
                className="flex-1 p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
                disabled={isLoading || cooldown}
              />
              {isLoading ? (
                <Button onClick={stopGeneration} variant="destructive">
                  <StopCircle className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={sendMessage} disabled={!input.trim() || cooldown}>
                  <Send className="w-4 h-4" />
                </Button>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Powered by Google Gemini 2.0 Flash • Free tier: 15 requests/minute • 1500 requests/day
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}