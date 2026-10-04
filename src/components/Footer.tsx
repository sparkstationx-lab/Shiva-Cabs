import React from 'react';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';
import { CONTACT_INFO } from '../data/cabData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-24 sm:pb-16 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <a href="#" className="text-xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-amber-500 text-stone-950 font-black text-sm flex items-center justify-center">
                S
              </span>
              <span>Shivay Cabs</span>
            </a>
            <p className="text-stone-400 text-xs leading-relaxed">
              Premium, dependable car rental and taxi services. Connecting airports, city centers, and outstation destinations with verified chauffeurs.
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-stone-400 font-mono">
                Govt. Registered Taxi Permit Carrier
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Services
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#booking" className="hover:text-amber-400 transition-colors">Airport Transfers (T1 & T2)</a></li>
              <li><a href="#tariffs" className="hover:text-amber-400 transition-colors">One-Way Intercity Cabs</a></li>
              <li><a href="#tariffs" className="hover:text-amber-400 transition-colors">Outstation Round Trips</a></li>
              <li><a href="#tariffs" className="hover:text-amber-400 transition-colors">8 Hours / 80 Km Local Rental</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Corporate Employee Mobility</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Wedding & Group Tempo Travellers</a></li>
            </ul>
          </div>

          {/* Fleet models */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Fleet Categories
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Executive Sedan (Dzire / Etios)</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Prime SUV (Innova Crysta / Ertiga)</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">VIP Luxury (Camry / Mercedes)</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Tempo Traveller (12-17 Seater)</a></li>
              <li><a href="#booking" className="hover:text-amber-400 transition-colors">Zero-Surge Rate Card</a></li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              24/7 Dispatch Hub
            </h4>
            <div className="space-y-2.5 text-stone-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`tel:${CONTACT_INFO.cleanPhone}`} className="hover:text-white font-mono">
                  {CONTACT_INFO.primaryPhone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white">
                  {CONTACT_INFO.email}
                </a>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.address.street}, {CONTACT_INFO.address.city}</span>
              </p>
              <div className="pt-2 text-[11px] text-amber-400/90 font-medium">
                Helpline Toll-Free: {CONTACT_INFO.tollFree}
              </div>
            </div>
          </div>

        </div>

        {/* Quiet Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} Shivay Cabs Mobility Services. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-stone-300">Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-stone-300">Terms of Carriage</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-stone-300">Driver Partner Code</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
