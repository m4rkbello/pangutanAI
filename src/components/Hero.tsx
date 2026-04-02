import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function Hero() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const responseRef = useRef(null);

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response]);

  const handleSendMessage = async () => {
    if (!question.trim() || isLoading) return;

    setResponse('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error('Gemini API key not found');
      }

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: question }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || `API Error: ${res.status}`);
      }

      const data = await res.json();
      const assistantResponse = data.candidates[0]?.content?.parts[0]?.text || 'No response generated';
      setResponse(assistantResponse);

    } catch (error) {
      console.error('API Error:', error);
      setResponse('Sorry, there was an error connecting to Gemini. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950 dark:via-background dark:to-purple-950" />
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container relative mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Powered by Google Gemini 2.0</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
                PangutanAI<br></br>
              Your Intelligent
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}AI Assistant
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
              Powered by Google Gemini 2.0 Flash - Free, fast, and intelligent responses.
            </p>
          </div>
          
          <Card className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-2xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-sm text-gray-500">Try PangutanAI Now</span>
            </div>
            
            <div 
              ref={responseRef}
              className="min-h-[200px] max-h-[300px] overflow-y-auto mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
            >
              {response ? (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{response}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  Ask me anything! Try "What can you do?" or "Write a React component"
                </p>
              )}
            </div>
            
            <div className="flex gap-2">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                placeholder="Ask Gemini anything..."
                className="flex-1 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !question.trim()}
                className="self-end"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
            
            <p className="text-xs text-gray-400 mt-3 text-center">
              Powered by Google Gemini 2.0 Flash • Free tier • 1500 requests/day
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}