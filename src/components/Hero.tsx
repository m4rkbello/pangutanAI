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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black" />
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-96 h-48 sm:h-96 bg-neon-blue/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-neon-pink/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-[600px] h-64 sm:h-[600px] bg-neon-purple/10 rounded-full blur-3xl animate-float" />

      <div className="container relative mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6 animate-float">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-neon-blue/10 backdrop-blur-sm border border-neon-blue/30 text-neon-blue text-xs sm:text-sm">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
              <span>Powered by Google Gemini 2.5 Flash</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-white via-neon-blue to-neon-pink bg-clip-text text-transparent animate-gradient-shift">
                PangutanAI
              </span>
              <br />
              <span className="text-white">Your Intelligent</span>
              <br />
              <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent animate-gradient-shift">
                AI Assistant
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-lg mx-auto lg:mx-0">
              Powered by Google Gemini 2.5 Flash - Free, fast, and intelligent responses with 1M token context.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button variant="neon" size="lg" className="w-full sm:w-auto text-base sm:text-lg">
                Get Started Free
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue">
                View Documentation
              </Button>
            </div>
          </div>

          {/* Right Card */}
          <Card className="relative p-4 sm:p-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden group hover:border-neon-blue/30 hover:shadow-[0_8px_40px_rgba(0,243,255,0.15)] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            
            {/* Card Header */}
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/10">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-neon-blue animate-pulse" />
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-neon-pink" />
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-neon-purple" />
              <span className="ml-2 text-xs sm:text-sm text-white/60">Try PangutanAI Now</span>
            </div>

            {/* Response Area */}
            <div 
              ref={responseRef}
              className="min-h-[150px] sm:min-h-[200px] max-h-[200px] sm:max-h-[300px] overflow-y-auto mb-3 p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              {response ? (
                <div className="prose prose-sm sm:prose-base prose-invert max-w-none">
                  <ReactMarkdown>{response}</ReactMarkdown>
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-neon-blue/50 animate-pulse" />
                  <p className="text-sm sm:text-base text-white/60">Ask me anything!</p>
                  <p className="text-xs sm:text-sm text-white/40 mt-2">Try "What can you do?" or "Write a React component"</p>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <textarea
                value={question}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask Gemini anything..."
                className="flex-1 p-2 sm:p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 resize-none focus:outline-none focus:border-neon-blue/50 focus:shadow-[0_0_20px_rgba(0,243,255,0.1)] transition-all duration-300 text-sm sm:text-base min-h-[60px] sm:min-h-[80px]"
                rows={2}
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !question.trim()}
                variant="neon"
                className="px-3 sm:px-4"
              >
                {isLoading ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : <Send className="w-4 h-4 sm:w-5 sm:h-5" />}
              </Button>
            </div>

            <p className="text-[10px] sm:text-xs text-white/40 mt-3 text-center">
              Powered by Google Gemini 2.5 Flash • Free tier: 15 requests/minute
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}