import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO } from '../data/cabData';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setSent(true);
  };

  return (
    <section id="contact" className="py-16 bg-stone-50 border-t border-stone-200 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900">
            Contact Us
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Reach out directly or send us a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Direct Contact Information */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-stone-900 mb-2 font-heading">
              Customer Information
            </h3>

            <a 
              href={`tel:${CONTACT_INFO.cleanPhone}`}
              className="p-4 bg-white rounded-xl border border-stone-200 flex items-center gap-4 hover:border-amber-500 transition-colors shadow-2xs"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-stone-500 block">24/7 Phone Helpline</span>
                <span className="text-base font-bold font-mono text-stone-900">{CONTACT_INFO.primaryPhone}</span>
              </div>
            </a>

            <a 
              href={`https://wa.me/${CONTACT_INFO.cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white rounded-xl border border-stone-200 flex items-center gap-4 hover:border-emerald-500 transition-colors shadow-2xs"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-stone-500 block">WhatsApp Support</span>
                <span className="text-base font-bold font-mono text-stone-900">{CONTACT_INFO.secondaryPhone}</span>
              </div>
            </a>

            <a 
              href={`mailto:${CONTACT_INFO.email}`}
              className="p-4 bg-white rounded-xl border border-stone-200 flex items-center gap-4 hover:border-stone-400 transition-colors shadow-2xs"
            >
              <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-stone-500 block">Email Address</span>
                <span className="text-xs font-semibold text-stone-900">{CONTACT_INFO.email}</span>
              </div>
            </a>

            <div className="p-4 bg-white rounded-xl border border-stone-200 flex items-center gap-4 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-stone-500 block">Office Location</span>
                <span className="text-xs font-medium text-stone-800">
                  {CONTACT_INFO.address.street}, {CONTACT_INFO.address.city}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs">
            <h3 className="text-base font-bold text-stone-900 mb-1 font-heading">
              Send a Message
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              We respond promptly to all booking queries.
            </p>

            {sent ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-sm font-bold text-stone-900">Message Sent Successfully</p>
                <p className="text-xs text-stone-500">Thank you, {name}. Our team will call you shortly.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setName('');
                    setPhone('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="mt-3 text-xs text-amber-700 font-semibold hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="Enter 10-digit number"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter email (optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Message *</label>
                  <textarea
                    rows={3}
                    placeholder="How can we help you?"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>Submit Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
