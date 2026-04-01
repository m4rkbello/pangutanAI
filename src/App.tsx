import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Features />
      </main>
    </div>
  );
}

export default App;