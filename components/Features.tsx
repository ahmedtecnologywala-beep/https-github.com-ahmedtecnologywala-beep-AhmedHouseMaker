import React from 'react';
import { Cpu, Maximize, FileText, DollarSign, Layers, Sun } from 'lucide-react';

const featureList = [
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "AI Prompt-to-Plan",
    description: "Simply describe your dream home requirements and let our advanced AI generate structural layouts in seconds."
  },
  {
    icon: <Maximize className="w-6 h-6" />,
    title: "Custom Room Sizes",
    description: "Adjust bedroom, kitchen, and living area dimensions to perfectly fit your lifestyle and plot constraints."
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Structure & 3D",
    description: "Get comprehensive flat 2D blueprints, Structural drawings, and conceptual 3D massing."
  },
  {
    icon: <Sun className="w-6 h-6" />,
    title: "Ventilation Analysis",
    description: "Smart algorithms prioritize window placement and airflow to ensure a healthy living environment."
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Smart Cost Estimation",
    description: "Receive an instant breakdown of estimated material and construction costs based on current market rates."
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Export to PDF/CAD",
    description: "Download high-resolution PDFs or export standard file formats compatible with professional architectural software."
  }
];

const Features: React.FC = () => {
  return (
    <section className="bg-brand-black py-24 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-brand-accent font-semibold tracking-wide uppercase text-sm">Powerful Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Everything you need to plan your build
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
            From plot analysis to final blueprints, Ahmed House Maker streamlines the architectural process.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featureList.map((feature, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-brand-gray rounded-lg px-6 pb-8 h-full shadow-lg border border-gray-800 hover:border-brand-accent/50 transition-colors">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-brand-accent rounded-md shadow-lg">
                        <div className="text-black">
                          {feature.icon}
                        </div>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-white tracking-tight">{feature.title}</h3>
                    <p className="mt-5 text-base text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Visual Feature Showcase */}
        <div className="mt-24 bg-brand-gray rounded-2xl overflow-hidden shadow-2xl border border-gray-800 lg:grid lg:grid-cols-2">
            <div className="p-10 flex flex-col justify-center">
                 <h3 className="text-2xl font-bold text-white mb-4">Real-time Customization</h3>
                 <p className="text-gray-400 mb-6">
                     Modify your generated plans instantly. Change room sizes, swap kitchen locations, or add a garage with a single click. Our engine recalculates structural integrity instantly.
                 </p>
                 <button className="text-brand-accent font-semibold flex items-center hover:underline">
                     See how it works <span className="ml-2">→</span>
                 </button>
            </div>
            <div className="relative h-64 lg:h-auto bg-gray-900">
                 <img src="https://picsum.photos/800/600" className="absolute inset-0 w-full h-full object-cover opacity-80" alt="Editor Interface" />
            </div>
        </div>
      </div>
    </section>
  );
};

export default Features;