import React, { useState } from 'react';
import { Phone, Menu, X, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../data/cabData';

interface NavbarProps {
  onBookNowClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookNowClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <a 
            href="#" 
            className="text-2xl font-bold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap font-heading flex items-center gap-2"
          >
            <span className="w-9 h-9 rounded-lg bg-amber-500 text-stone-950 font-black text-lg flex items-center justify-center shadow-inner">
              S
            </span>
            <span>Shiva Cabs</span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300">
            <a 
              href="#booking" 
              className="hover:text-amber-400 transition-colors py-1"
            >
              Book Ride
            </a>
            <a 
              href="#fleet" 
              className="hover:text-amber-400 transition-colors py-1"
            >
              Our Fleet
            </a>
            <a 
              href="#tariffs" 
              className="hover:text-amber-400 transition-colors py-1"
            >
              Tariffs
            </a>
            <a 
              href="#features" 
              className="hover:text-amber-400 transition-colors py-1"
            >
              Why Shiva
            </a>
            <a 
              href="#contact" 
              className="hover:text-amber-400 transition-colors py-1"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-4">
            <a 
              href={`tel:${CONTACT_INFO.cleanPhone}`}
              className="flex items-center gap-2 text-xs font-semibold text-stone-300 hover:text-white px-3 py-2 rounded-lg bg-stone-800/80 hover:bg-stone-800 border border-stone-700/60 transition-colors whitespace-nowrap"
              title="Call our 24/7 Booking Helpline"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="tabular-nums">{CONTACT_INFO.primaryPhone}</span>
            </a>

            <button
              onClick={onBookNowClick}
              className="px-5 py-2.5 text-sm font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded-lg shadow-md hover:shadow-amber-500/20 transition-all whitespace-nowrap cursor-pointer font-heading"
            >
              Instant Booking
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-stone-800 bg-stone-900 px-4 pt-3 pb-5 space-y-3">
          <nav className="flex flex-col space-y-2 text-base font-medium text-stone-200">
            <a 
              href="#booking" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-800 hover:text-amber-400"
            >
              Book a Ride
            </a>
            <a 
              href="#fleet" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-800 hover:text-amber-400"
            >
              Our Fleet
            </a>
            <a 
              href="#tariffs" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-800 hover:text-amber-400"
            >
              Popular Tariffs
            </a>
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-800 hover:text-amber-400"
            >
              Why Choose Shiva Cabs
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-800 hover:text-amber-400"
            >
              Customer Contact & Support
            </a>
          </nav>
          
          <div className="pt-2 flex flex-col gap-2">
            <a 
              href={`tel:${CONTACT_INFO.cleanPhone}`}
              className="flex items-center justify-center gap-2 py-3 rounded-lg bg-stone-800 text-stone-100 font-semibold text-sm border border-stone-700"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Helpline: {CONTACT_INFO.primaryPhone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookNowClick();
              }}
              className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm text-center shadow-md font-heading"
            >
              Book Cab Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
