import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function Hero() {
  const [question, setQuestion] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const responseRef = useRef<HTMLDivElement>(null); // Fixed: Added proper HTMLDivElement type

  // Auto-scroll when new content arrives
  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response]);

  const handleSendMessage = async () => {
    if (!question.trim() || isStreaming) return;

    setResponse('');
    setIsStreaming(true);

    try {
      const endpoint = 'https://api.deepseek.com/v1/chat/completions';
      const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY as string;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: question }],
          stream: true,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder('utf-8');
      let accumulated = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.startsWith('data: '));

        for (const line of lines) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              accumulated += delta;
              setResponse(accumulated);
            }
          } catch (e) {
            // Ignore parse errors for incomplete chunks
            console.debug('Parse error:', e);
          }
        }
      }
    } catch (error) {
      console.error('API Error:', error);
      setResponse('Sorry, there was an error connecting to DeepSeek. Please try again later.');
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950 dark:via-background dark:to-purple-950" />
      
      {/* Animated Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container relative mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Powered by DeepSeek R1</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
              Your Intelligent
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}AI Assistant
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
              Experience advanced reasoning, code generation, and real-time answers—completely free. No login required.
            </p>
            
            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm">
                🧠 1M Token Context
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm">
                💻 Code Generation
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm">
                ✨ Free Forever
              </span>
            </div>
          </div>
          
          {/* Right Side - Live Demo Chat */}
          <Card className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-2xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-sm text-gray-500">Try DeepSeek Now</span>
            </div>
            
            {/* Response Area */}
            <div 
              ref={responseRef}
              className="min-h-[200px] max-h-[300px] overflow-y-auto mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
            >
              {response ? (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{response}</ReactMarkdown>
                  {isStreaming && <span className="inline-block w-1 h-4 bg-blue-500 animate-pulse ml-1" />}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  Ask me anything! Try "What can DeepSeek do?" or "Write a React component"
                </p>
              )}
            </div>
            
            {/* Input Area */}
            <div className="flex gap-2">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                placeholder="Ask DeepSeek anything..."
                className="flex-1 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                disabled={isStreaming}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isStreaming || !question.trim()}
                className="self-end"
              >
                {isStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
            
            <p className="text-xs text-gray-400 mt-3 text-center">
              Demo uses DeepSeek API • Responses are streamed in real-time
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}