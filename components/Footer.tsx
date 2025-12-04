import React from 'react';
import { LayoutTemplate, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center mb-4">
                <LayoutTemplate className="h-8 w-8 text-brand-accent mr-2" />
                <span className="text-xl font-bold">Ahmed House Maker</span>
             </div>
             <p className="text-gray-400 text-sm">
               Empowering homeowners with instant, professional, and optimized floor plans using Artificial Intelligence.
             </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-accent">Features</a></li>
              <li><a href="#" className="hover:text-brand-accent">Pricing</a></li>
              <li><a href="#" className="hover:text-brand-accent">Success Stories</a></li>
              <li><a href="#" className="hover:text-brand-accent">Find Architects</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-accent">Documentation</a></li>
              <li><a href="#" className="hover:text-brand-accent">Guides</a></li>
              <li><a href="#" className="hover:text-brand-accent">API Status</a></li>
              <li><a href="#" className="hover:text-brand-accent">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-accent">Privacy</a></li>
              <li><a href="#" className="hover:text-brand-accent">Terms</a></li>
            </ul>
            <div className="mt-6 flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-brand-accent cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-brand-accent cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-brand-accent cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-brand-accent cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-900 pt-8 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Ahmed House Maker. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;