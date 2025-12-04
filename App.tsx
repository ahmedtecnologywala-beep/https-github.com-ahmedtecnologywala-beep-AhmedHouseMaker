import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Generator from './components/Generator';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>('home');

  useEffect(() => {
    // Scroll to top on view change
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header currentView={currentView} setView={setView} />
      
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero onStart={() => setView('generator')} />
            <Features />
            <Pricing />
          </>
        )}
        
        {currentView === 'features' && <Features />}
        
        {/* Pass initialView prop to switch tabs inside Generator */}
        {currentView === 'generator' && <Generator initialView="new" />}
        {currentView === 'saved' && <Generator initialView="saved" />}
        
        {currentView === 'pricing' && <Pricing />}
        
        {currentView === 'contact' && <Contact />}
      </main>

      <Footer />
    </div>
  );
};

export default App;