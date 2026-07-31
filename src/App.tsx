import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { DemoChat } from './components/DemoChat';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <DemoChat />
      </main>
      <Footer />
    </div>
  );
}

export default App;