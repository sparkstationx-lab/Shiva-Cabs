import React from 'react';
import { Phone } from 'lucide-react';
import { CONTACT_INFO, SHIVA_LOGO } from '../data/cabData';

export const Navbar: React.FC = () => {
  return (
    <header className="bg-stone-900 border-b border-stone-800 text-stone-100 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <a href="#" className="text-xl font-bold tracking-tight text-white font-heading flex items-center gap-2.5">
          <img 
            src={SHIVA_LOGO} 
            alt="Shivay Cabs Logo" 
            className="h-9 w-auto max-w-[120px] object-contain rounded-md bg-stone-950/40 p-0.5"
            onError={(e) => {
              // Graceful fallback if not loaded
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <span>Shivay Cabs</span>
        </a>

        {/* Clean Nav Links */}
        <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-stone-300">
          <a href="#booking" className="hover:text-amber-400 transition-colors">
            Book Cab
          </a>
          <a href="#about" className="hover:text-amber-400 transition-colors">
            About
          </a>
          <a href="#faq" className="hover:text-amber-400 transition-colors">
            FAQ
          </a>
          <a href="#contact" className="hover:text-amber-400 transition-colors">
            Contact Us
          </a>
          <a 
            href={`tel:${CONTACT_INFO.cleanPhone}`}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 font-mono text-xs font-semibold border border-stone-700 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{CONTACT_INFO.primaryPhone}</span>
          </a>
        </nav>

      </div>
    </header>
  );
};
