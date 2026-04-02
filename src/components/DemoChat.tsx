import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Send, Loader2, StopCircle, Trash2, Sparkles, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function DemoChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | number | null>(null);
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

  const copyToClipboard = async (text: string, messageId: string | number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setError('Failed to copy to clipboard');
    }
  };

  const canMakeRequest = () => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime.current;
    const minInterval = 4000;
    
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
    
    if (!canMakeRequest()) return;
    
    if (cooldown) {
      setError('Please wait a moment before sending another message.');
      return;
    }

    const userMessage = { role: 'user', content: input, id: Date.now() };
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

      const modelName = 'gemini-2.5-flash';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: geminiMessages,
          generationConfig: { temperature: 0.7, maxOutputTokens: 2000 },
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
        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
      }

      const data = await response.json();
      const assistantResponse = data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I could not generate a response.';

      setMessages(prev => [...prev, { role: 'assistant', content: assistantResponse, id: Date.now() + 1 }]);

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
    <section id="demo" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
            Try PangutanAI Demo
          </h2>
          <p className="text-xl text-gray-300">
            Experience Google Gemini's capabilities in real-time
          </p>
        </div>

        <Card className="relative bg-black/60 backdrop-blur-xl border border-neon-blue/30 shadow-[0_0_50px_rgba(0,243,255,0.1)] rounded-2xl overflow-hidden">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-neon-blue/20">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${cooldown ? 'bg-yellow-500 animate-pulse' : 'bg-neon-blue animate-pulse'}`} />
              <span className="text-sm font-medium text-gray-300">
                {cooldown ? 'Rate Limited - Please Wait' : 'Google Gemini 2.5 Flash • Free'}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearChat}
              className="text-gray-400 hover:text-neon-pink transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="relative">
                  <Sparkles className="w-16 h-16 text-neon-blue/30 animate-pulse" />
                  <div className="absolute inset-0 blur-xl bg-neon-blue/20 rounded-full" />
                </div>
                <p className="text-lg text-gray-400 mt-4">Ask me anything!</p>
                <p className="text-sm text-gray-500 mt-2">Try: "What can you do?" or "Write a React component"</p>
                <p className="text-xs text-yellow-500/70 mt-4">⚠️ Free tier: 15 requests per minute. Please wait 4 seconds between messages.</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group`}
                >
                  <div className="relative max-w-[80%]">
                    <div
                      className={`p-3 rounded-xl ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white'
                          : 'bg-white/10 backdrop-blur-sm border border-neon-blue/20 text-gray-200'
                      }`}
                    >
                      <div className="prose prose-sm prose-invert max-w-none">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    </div>
                    {/* Copy Button */}
                    <button
                      onClick={() => copyToClipboard(msg.content, idx)}
                      className="absolute -top-2 -right-2 p-1.5 rounded-lg bg-gray-800/90 backdrop-blur-sm border border-neon-blue/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-neon-blue/20 hover:border-neon-blue"
                      aria-label="Copy message"
                    >
                      {copiedMessageId === idx ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-gray-300 hover:text-neon-blue" />
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                  <Loader2 className="w-5 h-5 animate-spin text-neon-blue" />
                </div>
              </div>
            )}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-neon-blue/20">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={cooldown ? "Please wait. Rate limit active..." : "Ask PangutanAI anything..."}
                className="flex-1 p-3 rounded-xl bg-black/40 border border-neon-blue/30 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-neon-blue focus:shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all duration-300"
                rows={2}
                disabled={isLoading || cooldown}
              />
              {isLoading ? (
                <Button onClick={stopGeneration} variant="destructive" className="bg-red-500/20 hover:bg-red-500/30 border-red-500/50">
                  <StopCircle className="w-5 h-5" />
                </Button>
              ) : (
                <Button onClick={sendMessage} disabled={!input.trim() || cooldown} className="bg-gradient-to-r from-neon-blue to-neon-pink hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all duration-300">
                  <Send className="w-5 h-5" />
                </Button>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Powered by Google Gemini 2.5 Flash • Free tier: 15 requests/minute • 1500 requests/day
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}