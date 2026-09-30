import React, { useState, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Star, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Car
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { BookingForm } from './components/BookingForm';
import { FleetSection } from './components/FleetSection';
import { PopularRoutesSection } from './components/PopularRoutesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { MobileStickyBar } from './components/MobileStickyBar';

import { VehicleId, BookingRecord, PopularRoute } from './types/booking';
import { HERO_IMAGE, CONTACT_INFO } from './data/cabData';

export default function App() {
  const [selectedVehicleId, setSelectedVehicleId] = useState<VehicleId>('sedan');
  const [bookingConfirmation, setBookingConfirmation] = useState<BookingRecord | null>(null);
  const [initialRoute, setInitialRoute] = useState<{ from: string; to: string } | null>(null);

  const bookingRef = useRef<HTMLDivElement>(null);

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectVehicle = (id: VehicleId) => {
    setSelectedVehicleId(id);
    scrollToBooking();
  };

  const handleSelectRoute = (route: PopularRoute) => {
    setInitialRoute({ from: route.from, to: route.to });
    if (route.category === 'Airport') {
      setSelectedVehicleId('sedan');
    }
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col relative selection:bg-amber-500 selection:text-stone-950">
      
      {/* Top Bar */}
      <Navbar onBookNowClick={scrollToBooking} />

      {/* Main Hero Section */}
      <section className="relative bg-stone-950 text-white overflow-hidden py-12 lg:py-20">
        
        {/* Background Image with Measured Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="Shiva Cabs chauffeur awaiting passenger at airport terminal"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/90 to-stone-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Narrative Zone (5 cols) */}
            <div className="lg:col-span-5 space-y-6 pt-4 lg:pt-8">
              
              {/* Regional trust marker */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Premier 24/7 Chauffeur & Taxi Service</span>
              </div>

              {/* Display Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight font-heading text-white leading-tight" style={{ textWrap: 'balance' }}>
                Reliable City, Airport & Outstation Cabs.
              </h1>

              {/* Supporting Value Proposition */}
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Enjoy transparent pricing, well-maintained air-conditioned vehicles, and verified chauffeurs. Never face sudden cancellations or surge pricing again.
              </p>

              {/* Trust Metrics Adjacency */}
              <div className="pt-2 border-t border-stone-800 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-bold font-mono text-amber-400">99.4%</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">On-Time Arrival</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-white">Zero</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">Surge Pricing</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-white">24/7</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">Live Dispatch</div>
                </div>
              </div>

              {/* Quick Contact Micro-Card in Hero */}
              <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 text-xs text-stone-300 flex items-center justify-between gap-4">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-stone-400 font-semibold">Immediate Booking Needed?</span>
                  <span className="font-mono text-sm font-bold text-white">{CONTACT_INFO.primaryPhone}</span>
                </div>
                <a
                  href={`tel:${CONTACT_INFO.cleanPhone}`}
                  className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-amber-400 hover:text-white border border-stone-700 rounded-lg font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Dispatch</span>
                </a>
              </div>

            </div>

            {/* Right Booking Card Zone (7 cols) */}
            <div className="lg:col-span-7">
              <BookingForm 
                selectedVehicleId={selectedVehicleId}
                onVehicleChange={setSelectedVehicleId}
                onBookingSuccess={(record) => setBookingConfirmation(record)}
                initialRoute={initialRoute}
              />
            </div>

          </div>

        </div>
      </section>

      {/* Fleet Showcase */}
      <FleetSection onSelectVehicle={handleSelectVehicle} />

      {/* Popular Routes & Fixed Tariffs */}
      <PopularRoutesSection onSelectRoute={handleSelectRoute} />

      {/* Why Choose Us & Testimonials */}
      <WhyChooseUs />

      {/* Comprehensive Customer Contact Information */}
      <ContactSection />

      {/* FAQ Accordion */}
      <FAQSection />

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Bar */}
      <MobileStickyBar onBookClick={scrollToBooking} />

      {/* Booking Confirmation Slip Modal */}
      {bookingConfirmation && (
        <BookingConfirmationModal
          booking={bookingConfirmation}
          onClose={() => setBookingConfirmation(null)}
        />
      )}

    </div>
  );
}
