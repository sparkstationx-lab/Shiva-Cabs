import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { CONTACT_INFO } from '../data/cabData';

interface MobileStickyBarProps {
  onBookClick: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onBookClick }) => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 px-4 py-2.5 flex items-center justify-between gap-3 shadow-lg">
      <a
        href={`tel:${CONTACT_INFO.cleanPhone}`}
        className="flex-1 py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 font-semibold text-xs flex items-center justify-center gap-2 border border-stone-700 active:scale-98 transition-transform"
      >
        <Phone className="w-3.5 h-3.5 text-amber-400" />
        <span>Call 24/7</span>
      </a>

      <button
        onClick={onBookClick}
        className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-transform font-heading"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Book Cab</span>
      </button>
    </div>
  );
};
