import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function Hero() {
  const [question, setQuestion] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response]);

  const handleSendMessage = async (): Promise<void> => {
    if (!question.trim() || isLoading) return;

    setResponse('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;
      
      if (!apiKey) {
        throw new Error('Gemini API key not found');
      }

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: question }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/30 to-black" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-pink/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-3xl animate-float" />
      <div className="container relative mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-float">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-sm mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Powered by Google Gemini 2.5 Flash</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-neon-blue to-neon-pink bg-clip-text text-transparent animate-gradient-shift">
                PangutanAI
              </span>
              <br />
              Your Intelligent
              <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
                {' '}AI Assistant
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
              Powered by Google Gemini 2.5 Flash - Free, fast, and intelligent responses with 1M token context.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button className="bg-gradient-to-r from-neon-blue to-neon-pink hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transition-all duration-300 text-lg px-8 py-6">
                Get Started Free
              </Button>
              <Button variant="outline" className="border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue transition-all duration-300 text-lg px-8 py-6">
                View Documentation
              </Button>
            </div>
          </div>
          <Card className="relative p-6 bg-black/60 backdrop-blur-xl border border-neon-blue/30 shadow-[0_0_50px_rgba(0,243,255,0.2)] rounded-2xl overflow-hidden group hover:shadow-[0_0_70px_rgba(255,0,228,0.3)] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neon-blue/20">
              <div className="w-3 h-3 rounded-full bg-neon-blue animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-neon-pink" />
              <div className="w-3 h-3 rounded-full bg-neon-purple" />
              <span className="ml-2 text-sm text-gray-400">Try PangutanAI Now</span>
            </div>
            <div 
              ref={responseRef}
              className="min-h-[200px] max-h-[300px] overflow-y-auto mb-4 p-4 bg-black/40 rounded-xl border border-neon-blue/20"
            >
              {response ? (
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>{response}</ReactMarkdown>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-neon-blue/50 animate-pulse" />
                  <p className="text-gray-400">Ask me anything!</p>
                  <p className="text-sm text-gray-500 mt-2">Try "What can you do?" or "Write a React component"</p>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <textarea
                value={question}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask Gemini anything..."
                className="flex-1 p-3 rounded-xl bg-black/40 border border-neon-blue/30 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-neon-blue focus:shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all duration-300"
                rows={2}
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !question.trim()}
                className="bg-gradient-to-r from-neon-blue to-neon-pink hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all duration-300"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Powered by Google Gemini 2.5 Flash • Free tier: 15 requests/minute
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}