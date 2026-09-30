import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Building2, 
  ShieldCheck,
  Headphones
} from 'lucide-react';
import { CONTACT_INFO } from '../data/cabData';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setError('Please provide your name, phone number, and query message.');
      return;
    }
    setError('');
    setIsSent(true);
    setTimeout(() => {
      // Keep sent notification
    }, 400);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white border-t border-stone-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-wider uppercase text-amber-700 block mb-2">
            24/7 Customer Help & Dispatch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-heading">
            Always Here When You Need a Ride
          </h2>
          <p className="mt-3 text-base text-stone-600">
            Have a custom travel requirement, early-morning flight pickup, wedding event fleet need, or corporate account query? Reach out directly via phone, WhatsApp, or email.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Phone / WhatsApp / Physical Hub Info (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Call Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Primary Helpline */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center mb-3">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                    24/7 Booking Helpline
                  </span>
                  <a 
                    href={`tel:${CONTACT_INFO.cleanPhone}`}
                    className="text-xl sm:text-2xl font-bold font-mono text-stone-950 hover:text-amber-700 transition-colors mt-1 block"
                  >
                    {CONTACT_INFO.primaryPhone}
                  </a>
                  <p className="text-xs text-stone-600 mt-1">
                    Instant cab dispatch, airport pickups, and round-the-clock booking desk.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-amber-200">
                  <a 
                    href={`tel:${CONTACT_INFO.cleanPhone}`}
                    className="text-xs font-bold text-amber-900 flex items-center gap-1.5 hover:underline"
                  >
                    <span>Tap to Call Now</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

              {/* WhatsApp Support */}
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                    WhatsApp Quick Desk
                  </span>
                  <a 
                    href={`https://wa.me/${CONTACT_INFO.cleanPhone}?text=Hi%20Shiva%20Cabs,%20I%20would%20like%20to%20inquire%20about%20a%20cab%20booking.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl sm:text-2xl font-bold font-mono text-stone-950 hover:text-emerald-700 transition-colors mt-1 block"
                  >
                    {CONTACT_INFO.secondaryPhone}
                  </a>
                  <p className="text-xs text-stone-600 mt-1">
                    Share your live pickup location, request tariff cards, or get instant driver updates.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-200">
                  <a 
                    href={`https://wa.me/${CONTACT_INFO.cleanPhone}?text=Hi%20Shiva%20Cabs,%20I%20would%20like%20to%20inquire%20about%20a%20cab%20booking.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 hover:underline"
                  >
                    <span>Chat on WhatsApp</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Hub Details & Operating Hours */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
              
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-stone-200 text-stone-700 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-stone-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 font-heading">
                    Central Mobility Hub & Dispatch Office
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {CONTACT_INFO.address.street}, {CONTACT_INFO.address.area}, {CONTACT_INFO.address.city}, {CONTACT_INFO.address.state}
                  </p>
                  <p className="text-[11px] text-amber-800 font-medium mt-1">
                    Landmark: {CONTACT_INFO.address.landmarks}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-stone-800 block">Dispatch Hours</span>
                    <span className="text-xs text-stone-500">{CONTACT_INFO.hours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-stone-800 block">Official Inquiries</span>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-xs text-stone-600 hover:text-amber-600 transition-colors block">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-stone-200">
                <Headphones className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-stone-800 block">Toll-Free Helpline</span>
                  <span className="text-xs text-stone-600 font-mono">{CONTACT_INFO.tollFree} (Nationwide 24/7)</span>
                </div>
              </div>

            </div>

            {/* Corporate & Event Fleet Banner */}
            <div className="p-4 rounded-xl bg-stone-900 text-white flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="text-xs font-bold font-heading block">Corporate & Monthly Contracts</span>
                  <span className="text-[11px] text-stone-300">GST billing, monthly credit cycles, and dedicated fleet managers.</span>
                </div>
              </div>
              <a 
                href={`mailto:${CONTACT_INFO.email}?subject=Corporate%20Fleet%20Partnership`}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg whitespace-nowrap transition-colors"
              >
                Inquire
              </a>
            </div>

          </div>

          {/* Right Column: Direct Message / Inquiry Form (5 cols) */}
          <div className="lg:col-span-5 bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200">
            <h3 className="text-lg font-bold text-stone-900 font-heading mb-1">
              Send an Inquiry or Message
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Our operations coordinator will respond to your phone or email within 15 minutes.
            </p>

            {isSent ? (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-emerald-950 font-heading">
                  Inquiry Received!
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Thank you, <strong>{name}</strong>. A Shiva Cabs fleet supervisor will contact you at <strong>{phone}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSent(false);
                    setMessage('');
                  }}
                  className="mt-2 text-xs font-semibold text-emerald-900 hover:underline cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                {error && (
                  <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Chandra"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Trip or Inquiry Category
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none cursor-pointer"
                  >
                    <option value="General Inquiry">General Booking Inquiry</option>
                    <option value="Airport Pickup">Advance Airport Pickup Request</option>
                    <option value="Outstation Tour">Custom Multi-day Outstation Tour</option>
                    <option value="Wedding Fleet">Wedding & Event Fleet Booking</option>
                    <option value="Corporate Tie-up">Corporate Billing & Monthly Account</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Trip Details or Question *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us your dates, pickup location, vehicle preferences, or any questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer font-heading"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>Send Message to Shiva Cabs</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
