import { Card } from './ui/card';

interface Feature {
  icon: string;
  title: string;
  description: string;
  highlight: string;
}

const features: Feature[] = [
  {
    icon: '🧠',
    title: 'Advanced Reasoning',
    description: 'Powered by Google Gemini 2.5 Flash for complex problem-solving and logical reasoning.',
    highlight: 'State-of-the-art performance',
  },
  {
    icon: '💻',
    title: 'Code Generation',
    description: 'Generate, debug, and optimize code in Python, JavaScript, Java, C++, and more.',
    highlight: '90%+ accuracy on coding benchmarks',
  },
  {
    icon: '📚',
    title: '1M Token Context',
    description: 'Process entire books, lengthy research papers, or large codebases in one conversation.',
    highlight: 'Handle massive documents',
  },
  {
    icon: '⚡',
    title: 'Fast Responses',
    description: 'Lightning-fast responses with Google\'s optimized infrastructure.',
    highlight: '< 500ms latency',
  },
  {
    icon: '🌍',
    title: 'Multilingual Support',
    description: 'Communicate fluently in English, Chinese, Spanish, French, German, and more.',
    highlight: '50+ languages supported',
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    description: 'Your conversations stay private. Google\'s enterprise-grade security.',
    highlight: 'Secure by default',
  },
];

export function Features() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
            Why Choose PangutanAI?
          </h2>
          <p className="text-xl text-gray-300">
            Built for developers, researchers, and anyone who needs powerful AI assistance
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-neon-blue/30 hover:shadow-[0_8px_32px_rgba(0,243,255,0.1)] transition-all duration-500 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-neon-purple/0 to-neon-pink/0 group-hover:from-neon-blue/5 group-hover:via-neon-purple/5 group-hover:to-neon-pink/5 transition-all duration-500" />
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-neon-blue transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-white/60 mb-3">
                {feature.description}
              </p>
              <span className="text-sm text-neon-blue/70 group-hover:text-neon-pink transition-colors duration-300 font-medium">
                {feature.highlight}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}