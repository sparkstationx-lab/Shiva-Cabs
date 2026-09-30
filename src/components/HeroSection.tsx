import React from 'react';
import { HERO_IMAGE, SHIVA_LOGO } from '../data/cabData';

interface HeroSectionProps {
  onBookClick: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookClick, onContactClick }) => {
  return (
    <section className="relative min-h-[500px] sm:min-h-[560px] flex items-center justify-center text-center overflow-hidden">
      {/* Background Image with Dark Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Shiva Cabs chauffeur vehicle"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-stone-950/75" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-16 text-white flex flex-col items-center">
        <img
          src={SHIVA_LOGO}
          alt="Shiva Cabs"
          className="h-16 sm:h-20 w-auto object-contain mb-4 drop-shadow-md rounded-lg"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />

        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-white mb-3">
          Shiva Cabs
        </h1>
        
        <p className="text-base sm:text-xl text-stone-200 font-medium mb-8 max-w-xl">
          Reliable, Safe & Affordable Rides Anytime, Anywhere.
        </p>

        {/* 2 Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer font-heading"
          >
            Book Cab
          </button>

          <button
            onClick={onContactClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-bold text-sm rounded-xl border border-white/30 backdrop-blur-xs transition-all cursor-pointer font-heading"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

