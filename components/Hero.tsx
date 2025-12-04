import React from 'react';
import { ArrowRight, CheckCircle, Zap, Share2 } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-accent/10 blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-900/10 blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* Content */}
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-brand-accent/30 bg-brand-accent/10 text-brand-accent text-xs font-semibold mb-6">
              <span className="flex h-2 w-2 rounded-full bg-brand-accent mr-2 animate-pulse"></span>
              AI-Powered Architecture
            </div>
            
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block text-brand-accent xl:inline">Ahmed House Maker</span>
            </h1>
            
            <p className="mt-4 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Ahmed House Maker generates professional floor layouts, structural blueprints, 3D room visualizations, and dark-themed designs instantly.
            </p>
            
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <div className="space-y-4 sm:space-y-0 sm:inline-flex sm:space-x-4">
                <button
                  onClick={onStart}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-brand-accent hover:bg-white md:py-4 md:text-lg md:px-10 shadow-xl shadow-brand-accent/20 transition-all transform hover:-translate-y-1"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={() => {}} 
                  className="w-full flex items-center justify-center px-8 py-3 border border-gray-700 text-base font-medium rounded-md text-gray-300 bg-transparent hover:bg-gray-800 md:py-4 md:text-lg md:px-10"
                >
                  See Demo
                </button>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start space-x-6 text-gray-600 grayscale opacity-70">
                <div className="flex items-center space-x-1">
                    <span className="font-bold text-lg">HOUZZ</span>
                </div>
                <div className="flex items-center space-x-1">
                    <span className="font-bold text-lg">ARCHDAILY</span>
                </div>
                <div className="flex items-center space-x-1">
                    <span className="font-bold text-lg">ZAMEEN</span>
                </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                <img
                  className="w-full opacity-80 hover:opacity-100 transition-opacity duration-500"
                  src="https://picsum.photos/800/600?grayscale" 
                  alt="Modern House Blueprint"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                
                {/* Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-gray-900/90 backdrop-blur-md p-4 rounded-lg shadow-2xl border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-white">Generated Layout A</span>
                        <span className="text-xs bg-green-900/50 text-green-400 border border-green-800 px-2 py-0.5 rounded-full">Optimized</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
                        <div className="bg-brand-accent h-1.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>Space Efficiency</span>
                        <span>98%</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Key Features */}
        <div className="mt-20 border-t border-gray-800 pt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start group">
             <div className="p-3 bg-gray-800 rounded-xl mb-4 text-brand-accent group-hover:bg-brand-accent group-hover:text-black transition-colors">
                <Zap size={24} />
             </div>
             <h3 className="text-lg font-bold text-white">Auto Floor Plans</h3>
             <p className="text-sm text-gray-400 mt-2">Generate multiple layout options instantly from just your plot dimensions.</p>
          </div>
          <div className="flex flex-col items-center md:items-start group">
             <div className="p-3 bg-gray-800 rounded-xl mb-4 text-brand-accent group-hover:bg-brand-accent group-hover:text-black transition-colors">
                <CheckCircle size={24} />
             </div>
             <h3 className="text-lg font-bold text-white">3D & Structure</h3>
             <p className="text-sm text-gray-400 mt-2">AI generates 3D renders and Structural Blueprints for every project.</p>
          </div>
          <div className="flex flex-col items-center md:items-start group">
             <div className="p-3 bg-gray-800 rounded-xl mb-4 text-brand-accent group-hover:bg-brand-accent group-hover:text-black transition-colors">
                <Share2 size={24} />
             </div>
             <h3 className="text-lg font-bold text-white">Free & Unlimited</h3>
             <p className="text-sm text-gray-400 mt-2">Create as many projects as you want. Totally free for everyone.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;