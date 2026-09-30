import React from 'react';
import { Clock, ShieldCheck, Car, CreditCard } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white border-t border-stone-200 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900">
            About Shiva Cabs
          </h2>
          <p className="text-sm text-stone-600 mt-2 max-w-xl mx-auto">
            We provide prompt, dependable, and affordable taxi services for local travel, airport pickups, and outstation journeys.
          </p>
        </div>

        {/* 4 Clean Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
            <Clock className="w-6 h-6 text-amber-600 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-stone-900 mb-1">24/7 Availability</h3>
            <p className="text-xs text-stone-500">Cabs ready round the clock for emergencies and early flights.</p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
            <Car className="w-6 h-6 text-amber-600 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-stone-900 mb-1">Clean & Sanitized</h3>
            <p className="text-xs text-stone-500">Well-maintained air-conditioned sedans, SUVs, and luxury cars.</p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
            <ShieldCheck className="w-6 h-6 text-amber-600 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-stone-900 mb-1">Verified Drivers</h3>
            <p className="text-xs text-stone-500">Courteous, police-verified chauffeurs with highway experience.</p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
            <CreditCard className="w-6 h-6 text-amber-600 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-stone-900 mb-1">Fixed & Fair Rates</h3>
            <p className="text-xs text-stone-500">Transparent billing with zero surge charges and no hidden fees.</p>
          </div>

        </div>

      </div>
    </section>
  );
};
