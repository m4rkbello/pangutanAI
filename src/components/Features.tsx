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
    description: 'DeepSeek R1 excels at complex problem-solving, logical reasoning, and multi-step analysis.',
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
    title: 'Real-Time Streaming',
    description: 'Watch responses appear character-by-character for a natural, conversational experience.',
    highlight: '< 100ms first token latency',
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
    description: 'Your conversations stay private. No training data used from your chats.',
    highlight: 'Enterprise-grade security',
  },
];

export function Features() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose DeepSeek AI?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Built for developers, researchers, and anyone who needs powerful AI assistance
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {feature.description}
              </p>
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                {feature.highlight}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}