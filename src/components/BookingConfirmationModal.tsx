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
  Phone,
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
    const text = `Shivaye Cabs Booking:
ID: ${booking.bookingId}
Vehicle: ${vehicle.name}
Pickup: ${booking.pickupLocation}
Drop: ${booking.dropLocation}
Date: ${booking.pickupDate} at ${booking.pickupTime}
Fare: ₹${booking.finalFare}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl border border-stone-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base font-heading">Booking Confirmed</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Slip details */}
        <div className="p-5 space-y-4 text-xs">
          
          <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200 font-mono">
            <div>
              <span className="text-[10px] text-stone-500 uppercase block">Booking ID</span>
              <span className="text-sm font-bold text-stone-900">{booking.bookingId}</span>
            </div>
            <button
              onClick={handleCopyId}
              className="flex items-center gap-1 text-[11px] font-semibold px-2 py-1 bg-white border border-stone-300 rounded text-stone-700 hover:bg-stone-100 cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="space-y-2 border-y border-stone-100 py-3">
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-500 block text-[10px]">Pickup</span>
                <span className="font-medium text-stone-900">{booking.pickupLocation}</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-500 block text-[10px]">Drop</span>
                <span className="font-medium text-stone-900">{booking.dropLocation}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <span className="text-stone-500 block text-[10px]">Date & Time</span>
                <span className="font-medium text-stone-900">{booking.pickupDate} {booking.pickupTime}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Vehicle</span>
                <span className="font-medium text-stone-900">{vehicle.name}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <span className="text-stone-500 block text-[10px]">Passenger</span>
                <span className="font-medium text-stone-900">{booking.customerName}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Total Fare</span>
                <span className="font-bold text-stone-950 text-sm font-mono">₹{booking.finalFare}</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-stone-500 text-center">
            Driver & cab details will be sent via SMS before pickup.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleShareWhatsApp}
              className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={handlePrint}
              className="py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-lg flex items-center justify-center gap-1.5 border border-stone-300 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="py-2 px-4 bg-stone-900 text-white font-semibold rounded-lg cursor-pointer"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
