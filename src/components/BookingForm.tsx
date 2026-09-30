import React, { useState, useId, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Phone, 
  User, 
  ArrowRight,
  MessageCircle,
  CheckCircle2
} from 'lucide-react';
import { TripType, VehicleId, BookingRecord } from '../types/booking';
import { VEHICLE_OPTIONS, CONTACT_INFO } from '../data/cabData';

interface BookingFormProps {
  onBookingSuccess: (record: BookingRecord) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onBookingSuccess }) => {
  const pickupId = useId();
  const dropId = useId();

  const [tripType, setTripType] = useState<TripType>('one-way');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const [pickupDate, setPickupDate] = useState(todayStr);
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnDate, setReturnDate] = useState(todayStr);
  const [returnTime, setReturnTime] = useState('18:00');
  
  const [vehicleId, setVehicleId] = useState<VehicleId>('sedan');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedVehicle = useMemo(() => {
    return VEHICLE_OPTIONS.find(v => v.id === vehicleId) || VEHICLE_OPTIONS[0];
  }, [vehicleId]);

  // Clean estimated distance & fare calculation
  const estimatedKm = useMemo(() => {
    const combined = (pickupLocation + ' ' + dropLocation).toLowerCase();
    if (tripType === 'airport' || combined.includes('airport')) return 35;
    if (tripType === 'round-trip') return 120;
    if (combined.includes('outstation')) return 160;
    return 25;
  }, [tripType, pickupLocation, dropLocation]);

  const estimatedFare = useMemo(() => {
    const multiplier = tripType === 'round-trip' ? 1.8 : 1;
    const raw = estimatedKm * selectedVehicle.baseRatePerKm * multiplier;
    return Math.max(Math.round(raw), selectedVehicle.minFare);
  }, [estimatedKm, selectedVehicle, tripType]);

  const validate = () => {
    const err: Record<string, string> = {};
    if (!pickupLocation.trim()) err.pickupLocation = 'Enter pickup location';
    if (!dropLocation.trim()) err.dropLocation = 'Enter drop location';
    if (!customerName.trim()) err.customerName = 'Enter your name';
    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) err.customerPhone = 'Enter valid 10-digit number';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const record: BookingRecord = {
        bookingId: 'SHV-' + Math.floor(100000 + Math.random() * 900000),
        createdAt: new Date().toLocaleDateString(),
        tripType,
        pickupLocation,
        dropLocation,
        pickupDate,
        pickupTime,
        returnDate: tripType === 'round-trip' ? returnDate : undefined,
        returnTime: tripType === 'round-trip' ? returnTime : undefined,
        vehicleId,
        passengerCount: selectedVehicle.passengers,
        luggageCount: selectedVehicle.luggage,
        customerName,
        customerPhone,
        customerEmail: '',
        specialInstructions: '',
        estimatedDistanceKm: estimatedKm,
        estimatedFare,
        discount: 0,
        finalFare: estimatedFare,
        status: 'Confirmed'
      };
      setIsSubmitting(false);
      onBookingSuccess(record);
    }, 300);
  };

  const handleWhatsApp = () => {
    if (!validate()) return;
    const msg = `*Shiva Cabs Booking*
Pickup: ${pickupLocation}
Drop: ${dropLocation}
Date: ${pickupDate} at ${pickupTime}
Cab: ${selectedVehicle.name} (${selectedVehicle.models})
Name: ${customerName}
Phone: ${customerPhone}
Estimated Fare: ₹${estimatedFare}`;
    window.open(`https://wa.me/${CONTACT_INFO.cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div id="booking" className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
      
      {/* Trip Type Tabs */}
      <div className="flex bg-stone-100 p-1 rounded-xl mb-6 max-w-md mx-auto">
        {(['one-way', 'round-trip', 'airport'] as TripType[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setTripType(type)}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg capitalize transition-colors cursor-pointer text-center ${
              tripType === type
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {type === 'airport' ? 'Airport' : type.replace('-', ' ')}
          </button>
        ))}
      </div>

      <form onSubmit={handleBook} className="space-y-5">
        
        {/* Pickup & Drop Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={pickupId} className="block text-xs font-semibold text-stone-700 mb-1">
              Pickup Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                id={pickupId}
                type="text"
                placeholder="Enter pickup address or airport"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border outline-none transition-colors ${
                  errors.pickupLocation ? 'border-red-400 bg-red-50/20' : 'border-stone-300 focus:border-amber-500'
                }`}
              />
            </div>
            {errors.pickupLocation && (
              <p className="text-xs text-red-600 mt-1">{errors.pickupLocation}</p>
            )}
          </div>

          <div>
            <label htmlFor={dropId} className="block text-xs font-semibold text-stone-700 mb-1">
              Drop Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                id={dropId}
                type="text"
                placeholder="Enter drop destination"
                value={dropLocation}
                onChange={(e) => setDropLocation(e.target.value)}
                className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border outline-none transition-colors ${
                  errors.dropLocation ? 'border-red-400 bg-red-50/20' : 'border-stone-300 focus:border-amber-500'
                }`}
              />
            </div>
            {errors.dropLocation && (
              <p className="text-xs text-red-600 mt-1">{errors.dropLocation}</p>
            )}
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Date</label>
            <input
              type="date"
              min={todayStr}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Time</label>
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 outline-none focus:border-amber-500"
            />
          </div>

          {tripType === 'round-trip' ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Return Date</label>
                <input
                  type="date"
                  min={pickupDate}
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Return Time</label>
                <input
                  type="time"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 outline-none focus:border-amber-500"
                />
              </div>
            </>
          ) : (
            <div className="col-span-2 flex items-end">
              <span className="text-xs text-stone-500 pb-2.5">
                Approx. distance: <strong className="text-stone-800 font-mono">{estimatedKm} km</strong>
              </span>
            </div>
          )}
        </div>

        {/* Vehicle Selection */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-2">Select Vehicle</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {VEHICLE_OPTIONS.slice(0, 3).map((v) => {
              const isSelected = vehicleId === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVehicleId(v.id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-amber-500 bg-amber-50/40 ring-1 ring-amber-500' 
                      : 'border-stone-200 hover:border-stone-300 bg-stone-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-stone-900 text-sm">
                    <span>{v.name}</span>
                    <span className="text-xs font-mono font-semibold text-stone-700">₹{v.baseRatePerKm}/km</span>
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">{v.models}</div>
                  <div className="text-[11px] text-stone-500 mt-2 flex items-center gap-1">
                    <Users className="w-3 h-3" /> Max {v.passengers} seats
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Customer Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
            <input
              type="text"
              placeholder="Full name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className={`w-full px-3 py-2.5 text-sm rounded-xl border outline-none ${
                errors.customerName ? 'border-red-400 bg-red-50/20' : 'border-stone-300 focus:border-amber-500'
              }`}
            />
            {errors.customerName && (
              <p className="text-xs text-red-600 mt-1">{errors.customerName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="10-digit mobile number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className={`w-full px-3 py-2.5 text-sm rounded-xl border outline-none font-mono ${
                errors.customerPhone ? 'border-red-400 bg-red-50/20' : 'border-stone-300 focus:border-amber-500'
              }`}
            />
            {errors.customerPhone && (
              <p className="text-xs text-red-600 mt-1">{errors.customerPhone}</p>
            )}
          </div>
        </div>

        {/* Fare & Submit Actions */}
        <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-stone-500 block">Estimated Fare</span>
            <span className="text-2xl font-bold font-mono text-stone-900">₹{estimatedFare}</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex-1 sm:flex-none py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Booking</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 sm:flex-none py-2.5 px-5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <span>{isSubmitting ? 'Booking...' : 'Confirm Cab'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
