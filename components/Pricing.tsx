import React from 'react';
import { Check, Zap, Sparkles, Infinity } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <section className="bg-white py-24 bg-gradient-to-b from-black to-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Pricing Plans</h2>
          <p className="mt-4 text-xl text-gray-400">Professional architecture for everyone.</p>
        </div>
        
        <div className="mt-16 max-w-lg mx-auto">
          {/* Single Free Tier Card */}
          <div className="rounded-2xl shadow-2xl bg-brand-gray border border-gray-700 flex flex-col p-8 relative overflow-hidden group hover:border-brand-accent transition-all duration-300">
             
             {/* Glow Effect */}
             <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-brand-accent/20 blur-2xl group-hover:bg-brand-accent/30 transition-all"></div>
             
             <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Ahmed House Maker</h3>
                <span className="bg-brand-accent text-black text-xs font-bold px-3 py-1 rounded-full uppercase">Free Forever</span>
             </div>
             
             <div className="mt-6 flex items-baseline">
                <span className="text-6xl font-extrabold text-white">Free</span>
             </div>
             <p className="mt-2 text-gray-400">No credit card required. No hidden fees.</p>

             <div className="mt-8 border-t border-gray-700 pt-8">
                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-4">What's Included</h4>
                <ul className="space-y-4">
                   {[
                     "Unlimited Floor Plan Generations",
                     "All Style Options (Luxury, Modern, etc.)",
                     "3D Exterior & Interior Renders",
                     "Structural Blueprints & Maps",
                     "Cost Estimation",
                     "Download High-Res Images"
                   ].map((item, i) => (
                     <li key={i} className="flex items-start">
                        <Check className="w-5 h-5 text-brand-accent flex-shrink-0 mr-3" />
                        <span className="text-gray-300">{item}</span>
                     </li>
                   ))}
                </ul>
             </div>

             <button className="mt-8 w-full bg-brand-accent text-black font-bold py-4 px-6 rounded-lg hover:bg-white transition-colors shadow-lg shadow-brand-accent/20 flex items-center justify-center">
                <Zap className="w-5 h-5 mr-2" /> Start Designing Now
             </button>
          </div>

          <div className="mt-8 text-center">
             <div className="inline-flex items-center space-x-2 text-gray-500">
                <Infinity className="w-5 h-5" />
                <span>Unlimited Projects • Unlimited Downloads</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;