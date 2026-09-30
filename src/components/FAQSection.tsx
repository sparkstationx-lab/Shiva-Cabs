import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/cabData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 bg-white border-t border-stone-200 scroll-mt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Common questions about bookings, fares, and cabs.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4 font-semibold text-stone-900 text-sm hover:text-amber-700 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-600' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-200/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
