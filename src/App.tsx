import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BookingForm } from './components/BookingForm';
import { AboutSection } from './components/AboutSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { BookingRecord } from './types/booking';
import { CONTACT_INFO } from './data/cabData';

export default function App() {
  const [bookingConfirmation, setBookingConfirmation] = useState<BookingRecord | null>(null);

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans">
      
      {/* Top Bar */}
      <Navbar />

      {/* 1. Hero Section */}
      <HeroSection 
        onBookClick={scrollToBooking}
        onContactClick={scrollToContact}
      />

      {/* 2. Booking Form Section */}
      <section className="py-12 sm:py-16 max-w-4xl w-full mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900">
            Book Your Ride
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Instant fare calculation with zero hidden fees.
          </p>
        </div>
        <BookingForm onBookingSuccess={(record) => setBookingConfirmation(record)} />
      </section>

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. FAQ Section */}
      <FAQSection />

      {/* 5. Contact Section & Form */}
      <ContactSection />

      {/* Simple Footer */}
      <footer className="bg-stone-900 text-stone-400 py-6 border-t border-stone-800 text-xs text-center">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Shivay Cabs. All rights reserved.</div>
          <div className="font-mono text-stone-300">24/7 Helpline: {CONTACT_INFO.primaryPhone}</div>
        </div>
      </footer>

      {/* Booking Confirmation Receipt */}
      {bookingConfirmation && (
        <BookingConfirmationModal
          booking={bookingConfirmation}
          onClose={() => setBookingConfirmation(null)}
        />
      )}

    </div>
  );
}
