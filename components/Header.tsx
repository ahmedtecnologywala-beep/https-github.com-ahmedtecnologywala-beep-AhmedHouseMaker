import React, { useState } from 'react';
import { Menu, X, LayoutTemplate } from 'lucide-react';
import { ViewState } from '../types';

interface HeaderProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { label: string; value: ViewState }[] = [
    { label: 'Home', value: 'home' },
    { label: 'Features', value: 'features' },
    { label: 'Saved Projects', value: 'saved' },
    { label: 'Pricing', value: 'pricing' },
    { label: 'Contact', value: 'contact' },
  ];

  const handleNav = (view: ViewState) => {
    setView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => handleNav('home')}
          >
            <div className="bg-brand-accent p-2 rounded-lg mr-3 group-hover:bg-white transition-colors">
              <LayoutTemplate className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-none">Ahmed</h1>
              <span className="text-xs text-brand-accent font-semibold tracking-wider">HOUSE MAKER</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNav(item.value)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  currentView === item.value
                    ? 'text-brand-accent font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleNav('generator')}
              className="hidden md:block bg-brand-accent text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-white transition-colors shadow-lg shadow-brand-accent/20"
            >
              Get Started
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-400 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-gray border-t border-gray-800 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNav(item.value)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentView === item.value
                    ? 'bg-brand-accent/10 text-brand-accent'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('generator')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-black bg-brand-accent mt-4"
            >
              Start Project
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;