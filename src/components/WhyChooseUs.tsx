import React from 'react';
import { 
  Clock, 
  Sparkles, 
  BadgePercent, 
  UserCheck, 
  Star, 
  Quote,
  ShieldCheck
} from 'lucide-react';
import { TESTIMONIALS } from '../data/cabData';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="features" className="py-16 sm:py-24 bg-stone-50 border-t border-stone-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold tracking-wider uppercase text-amber-700 block mb-2">
            The Shivay Cabs Promise
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-heading">
            Built on Reliability, Punctuality, and Safety
          </h2>
          <p className="mt-3 text-base text-stone-600">
            We understand how crucial airport timings, outstation family plans, and business meetings are. That is why our fleet operations are built around zero-stress travel.
          </p>
        </div>

        {/* 4 Pillars with human editorial numbering */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-amber-600 font-mono font-bold text-sm mb-3">01.</div>
              <h3 className="text-lg font-bold text-stone-900 font-heading mb-2">
                On-Time Pickup Guarantee
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Drivers arrive 10-15 minutes ahead of schedule. Your chauffeur and vehicle registration details are dispatched via SMS & WhatsApp 30 minutes in advance.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 text-xs font-medium text-stone-500">
              <span className="text-stone-900 font-bold font-mono">99.4%</span> Punctuality record in 2026
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-amber-600 font-mono font-bold text-sm mb-3">02.</div>
              <h3 className="text-lg font-bold text-stone-900 font-heading mb-2">
                Sanitized & Clean Fleet
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every vehicle goes through complete vacuuming, exterior wash, and sanitization before departure. Fresh cabin, working AC, and generous boot space guaranteed.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 text-xs font-medium text-stone-500">
              <span className="text-stone-900 font-bold font-mono">100%</span> Detailed before long trips
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-amber-600 font-mono font-bold text-sm mb-3">03.</div>
              <h3 className="text-lg font-bold text-stone-900 font-heading mb-2">
                Transparent Pricing
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                No hidden night surcharges or surge fees during rain or festivals. What you see is what you pay, with automated GST tax invoices provided on request.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 text-xs font-medium text-stone-500">
              Zero surge multipliers
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-amber-600 font-mono font-bold text-sm mb-3">04.</div>
              <h3 className="text-lg font-bold text-stone-900 font-heading mb-2">
                Verified & Polite Chauffeurs
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Our drivers are background-verified, highway-experienced, and trained in polite passenger etiquette. Family-friendly and courteous at all times.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 text-xs font-medium text-stone-500">
              Police verified & route trained
            </div>
          </div>

        </div>

        {/* Claim-to-Proof Adjacency: Attributable Testimonials */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Customer Experiences
              </span>
              <h3 className="text-2xl font-bold font-heading text-stone-900 mt-1">
                Trusted by Daily Commuters & Vacationers Alike
              </h3>
            </div>
            
            <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1 text-stone-800 text-xs font-mono">4.9 / 5.0 (2,400+ Verified Rides)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
                <div>
                  <Quote className="w-6 h-6 text-amber-500/40 mb-3" />
                  <p className="text-xs text-stone-700 leading-relaxed mb-4">
                    "{t.comment}"
                  </p>
                </div>
                
                <div className="pt-3 border-t border-stone-200/80">
                  <div className="text-xs font-bold text-stone-900 font-heading">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {t.role} · {t.company}
                  </div>
                  <div className="text-[10px] text-amber-700 font-medium mt-1">
                    Route: {t.trip}
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
