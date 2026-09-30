import React from 'react';
import { 
  CheckCircle2, 
  X, 
  Printer, 
  MessageCircle, 
  MapPin, 
  Calendar, 
  Clock, 
  Car, 
  User, 
  Phone, 
  ShieldCheck, 
  Copy,
  Check
} from 'lucide-react';
import { BookingRecord } from '../types/booking';
import { VEHICLE_OPTIONS, CONTACT_INFO } from '../data/cabData';

interface BookingConfirmationModalProps {
  booking: BookingRecord;
  onClose: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  booking,
  onClose
}) => {
  const [copied, setCopied] = React.useState(false);
  const vehicle = VEHICLE_OPTIONS.find(v => v.id === booking.vehicleId) || VEHICLE_OPTIONS[0];

  const handleCopyId = () => {
    navigator.clipboard.writeText(booking.bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = `Shiva Cabs Booking Confirmed!
Booking ID: ${booking.bookingId}
Vehicle: ${vehicle.name}
Pickup: ${booking.pickupLocation}
Drop: ${booking.dropLocation}
Date & Time: ${booking.pickupDate} at ${booking.pickupTime}
Total Fare: ₹${booking.finalFare}
Helpline: ${CONTACT_INFO.primaryPhone}`;

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-stone-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
                Booking Confirmed
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading">
                Thank You, {booking.customerName}!
              </h3>
            </div>
          </div>
        </div>

        {/* Modal Content / Printable Slip */}
        <div className="p-6 space-y-5 print:p-0">
          
          {/* Reference Banner */}
          <div className="flex items-center justify-between p-3.5 bg-amber-50 rounded-xl border border-amber-200/80">
            <div>
              <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider block">
                Booking Reference Number
              </span>
              <span className="text-lg font-mono font-bold text-stone-900">
                {booking.bookingId}
              </span>
            </div>
            <button
              onClick={handleCopyId}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-stone-700 hover:bg-amber-100 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Copy ID</span>
                </>
              )}
            </button>
          </div>

          {/* Itinerary Details */}
          <div className="space-y-3 text-sm border-t border-b border-stone-200 py-4">
            
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-stone-500 uppercase block">Pickup Location</span>
                <span className="font-medium text-stone-900">{booking.pickupLocation}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-stone-500 uppercase block">Drop-Off Destination</span>
                <span className="font-medium text-stone-900">{booking.dropLocation}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-stone-400" />
                <div>
                  <span className="text-xs text-stone-500 block">Date</span>
                  <span className="font-medium text-stone-900">{booking.pickupDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-stone-400" />
                <div>
                  <span className="text-xs text-stone-500 block">Scheduled Time</span>
                  <span className="font-medium text-stone-900">{booking.pickupTime}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-stone-400" />
                <div>
                  <span className="text-xs text-stone-500 block">Cab Category</span>
                  <span className="font-medium text-stone-900">{vehicle.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-stone-400" />
                <div>
                  <span className="text-xs text-stone-500 block">Contact Phone</span>
                  <span className="font-medium text-stone-900 font-mono">{booking.customerPhone}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Fare Summary */}
          <div className="flex items-center justify-between px-2">
            <div>
              <span className="text-xs text-stone-500 block">Trip Type: {booking.tripType.toUpperCase()}</span>
              <span className="text-xs text-stone-500">Pay direct to driver via Cash or UPI</span>
            </div>
            <div className="text-right">
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block">Total Fare</span>
              <span className="text-2xl font-bold font-mono text-stone-950">₹{booking.finalFare}</span>
            </div>
          </div>

          {/* Dispatch Notice Box */}
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-900 block mb-0.5">What happens next?</span>
              Driver details (Chauffeur Name, Mobile, and Cab Plate Number) will be automatically sent to <strong className="font-mono">{booking.customerPhone}</strong> approximately 30 minutes before your pickup.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2 print:hidden">
            <button
              onClick={handleShareWhatsApp}
              className="w-full sm:flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </button>

            <button
              onClick={handlePrint}
              className="w-full sm:w-auto py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer border border-stone-300"
            >
              <Printer className="w-4 h-4" />
              <span>Print Slip</span>
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
