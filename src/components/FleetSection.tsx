import React from 'react';
import { Users, Briefcase, Check, ArrowUpRight, Wind, Shield } from 'lucide-react';
import { VEHICLE_OPTIONS } from '../data/cabData';
import { VehicleId } from '../types/booking';

interface FleetSectionProps {
  onSelectVehicle: (id: VehicleId) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ onSelectVehicle }) => {
  return (
    <section id="fleet" className="py-16 sm:py-24 bg-stone-100/70 border-t border-b border-stone-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-wider uppercase text-amber-700 block mb-2">
            The Shivaye Cabs Fleet
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-heading">
            Pristine Vehicles for Every Journey & Group Size
          </h2>
          <p className="mt-3 text-base text-stone-600">
            From punctual airport sedans to heavy-duty Innova SUVs and VIP luxury cars. Every vehicle is thoroughly detailed, sanitized, and chauffeured by verified professionals.
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VEHICLE_OPTIONS.slice(0, 3).map((cab) => (
            <div
              key={cab.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              {/* Image Container with Fallback */}
              <div className="relative aspect-[4/3] bg-stone-200 overflow-hidden group">
                <img
                  src={cab.image}
                  alt={cab.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Clean price overlay */}
                <div className="absolute bottom-3 left-3 bg-stone-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-lg border border-stone-700/80">
                  <span className="text-[11px] text-stone-300 block uppercase tracking-wider">Starting at</span>
                  <span className="text-base font-bold font-mono text-amber-400">
                    ₹{cab.baseRatePerKm}
                    <span className="text-xs font-normal text-stone-300"> / km</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-stone-900 font-heading">
                        {cab.name}
                      </h3>
                      <p className="text-xs text-stone-500 font-medium">
                        {cab.models}
                      </p>
                    </div>
                  </div>

                  {/* Clean unboxed metadata with subtle typographic separators */}
                  <div className="flex items-center gap-2 text-xs text-stone-600 mt-2 mb-4 py-2 border-y border-stone-100">
                    <span className="flex items-center gap-1 font-medium">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      {cab.passengers} Passengers
                    </span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Briefcase className="w-3.5 h-3.5 text-stone-400" />
                      {cab.luggage} Luggage Bags
                    </span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Wind className="w-3.5 h-3.5 text-stone-400" />
                      AC
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {cab.tagline}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-1.5 mb-6 text-xs text-stone-600">
                    {cab.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <button
                  type="button"
                  onClick={() => onSelectVehicle(cab.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-white font-semibold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer group/btn font-heading"
                >
                  <span>Select & Calculate Fare</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Large Group Note */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-stone-900 font-heading">
                Traveling with a larger group or wedding party?
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                We provide 12 to 26 seater Tempo Travellers and Urbania buses with high-roof air conditioning and ample boot space.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectVehicle('tempo')}
            className="py-2.5 px-5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors"
          >
            Check Tempo Traveller Availability
          </button>
        </div>

      </div>
    </section>
  );
};
