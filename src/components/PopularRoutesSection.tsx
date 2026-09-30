import React from 'react';
import { Plane, Navigation, Clock, ArrowRight } from 'lucide-react';
import { POPULAR_ROUTES, RENTAL_PACKAGES } from '../data/cabData';
import { PopularRoute } from '../types/booking';

interface PopularRoutesSectionProps {
  onSelectRoute: (route: PopularRoute) => void;
}

export const PopularRoutesSection: React.FC<PopularRoutesSectionProps> = ({ onSelectRoute }) => {
  return (
    <section id="tariffs" className="py-16 sm:py-24 bg-white scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-wider uppercase text-amber-700 block mb-2">
              Fixed & Transparent Tariffs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-heading">
              Popular Routes & Airport Specials
            </h2>
            <p className="mt-3 text-base text-stone-600">
              Clear upfront estimates with zero surge pricing during peak hours or rainfall. Toll estimates and driver allowances are clearly detailed.
            </p>
          </div>

          <div className="text-xs text-stone-500 bg-stone-50 border border-stone-200 px-4 py-2 rounded-xl self-start md:self-auto">
            <span>Includes luggage assistance & AC comfort</span>
          </div>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_ROUTES.map((route) => (
            <div
              key={route.id}
              className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Clean unboxed tag */}
                <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                  <span className="flex items-center gap-1 font-semibold text-stone-700">
                    {route.category === 'Airport' ? (
                      <Plane className="w-3.5 h-3.5 text-amber-600" />
                    ) : (
                      <Navigation className="w-3.5 h-3.5 text-stone-400" />
                    )}
                    {route.category} Transfer
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-stone-400" />
                    {route.duration}
                  </span>
                </div>

                <div className="space-y-1 mb-4">
                  <div className="text-sm font-semibold text-stone-900 line-clamp-1">
                    {route.from}
                  </div>
                  <div className="text-xs text-stone-400">to</div>
                  <div className="text-base font-bold text-stone-950 font-heading line-clamp-1">
                    {route.to}
                  </div>
                </div>

                {/* Distance */}
                <div className="text-xs text-stone-500 pb-3 border-b border-stone-200">
                  Approx. <span className="font-mono font-medium text-stone-800">{route.distanceKm} km</span> one-way
                </div>
              </div>

              {/* Fares & Action */}
              <div className="mt-4 pt-2">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[11px] text-stone-500 block uppercase">Sedan</span>
                    <span className="text-base font-bold font-mono text-stone-900">
                      ₹{route.sedanFare}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-stone-500 block uppercase">Innova SUV</span>
                    <span className="text-base font-bold font-mono text-stone-900">
                      ₹{route.suvFare}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectRoute(route)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white border border-stone-300 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-950 text-stone-800 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors font-heading"
                >
                  <span>Book This Transfer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Hourly Rental Package Table */}
        <div className="mt-12 bg-stone-900 text-white rounded-2xl p-6 sm:p-8 border border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                City Sightseeing & Business Meetings
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading mt-1">
                Local Hourly Rental Packages
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm">
              Keep the cab at your disposal with unlimited stops within package limits. Extra kms and extra hours are billed transparently.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {RENTAL_PACKAGES.map((pkg) => (
              <div key={pkg.id} className="bg-stone-800/90 border border-stone-700/80 rounded-xl p-4">
                <span className="text-xs font-medium text-stone-300 block mb-2">{pkg.label}</span>
                <div className="flex items-baseline justify-between mt-3 pt-3 border-t border-stone-700">
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase">Sedan</span>
                    <span className="text-lg font-bold font-mono text-amber-400">₹{pkg.sedan}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 block uppercase">Innova SUV</span>
                    <span className="text-lg font-bold font-mono text-white">₹{pkg.suv}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
