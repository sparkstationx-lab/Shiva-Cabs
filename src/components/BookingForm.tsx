import React, { useState, useId, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Car, 
  Users, 
  Briefcase, 
  Phone, 
  User, 
  Tag, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  HelpCircle,
  Info
} from 'lucide-react';
import { 
  TripType, 
  VehicleId, 
  BookingFormData, 
  BookingRecord 
} from '../types/booking';
import { 
  VEHICLE_OPTIONS, 
  RENTAL_PACKAGES, 
  LOCATION_SUGGESTIONS, 
  CONTACT_INFO 
} from '../data/cabData';

interface BookingFormProps {
  selectedVehicleId: VehicleId;
  onVehicleChange: (id: VehicleId) => void;
  onBookingSuccess: (record: BookingRecord) => void;
  initialRoute?: { from: string; to: string } | null;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  selectedVehicleId,
  onVehicleChange,
  onBookingSuccess,
  initialRoute
}) => {
  const pickupId = useId();
  const dropId = useId();

  // Form states
  const [tripType, setTripType] = useState<TripType>('one-way');
  const [pickupLocation, setPickupLocation] = useState(initialRoute?.from || '');
  const [dropLocation, setDropLocation] = useState(initialRoute?.to || '');
  
  // Set default dates
  const todayStr = useMemo(() => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }, []);

  const [pickupDate, setPickupDate] = useState(todayStr);
  const [pickupTime, setPickupTime] = useState('09:00');
  const [returnDate, setReturnDate] = useState(todayStr);
  const [returnTime, setReturnTime] = useState('18:00');
  const [rentalPackage, setRentalPackage] = useState(RENTAL_PACKAGES[1].id); // 8hr/80km default

  const [passengerCount, setPassengerCount] = useState(1);
  const [luggageCount, setLuggageCount] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Promo code
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountAmount: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync if initialRoute changes
  React.useEffect(() => {
    if (initialRoute) {
      setPickupLocation(initialRoute.from);
      setDropLocation(initialRoute.to);
    }
  }, [initialRoute]);

  // Selected vehicle obj
  const currentVehicle = useMemo(() => {
    return VEHICLE_OPTIONS.find(v => v.id === selectedVehicleId) || VEHICLE_OPTIONS[0];
  }, [selectedVehicleId]);

  // Calculate realistic distance estimate
  const estimatedKm = useMemo(() => {
    if (tripType === 'rental') {
      if (rentalPackage === '4hr-40km') return 40;
      if (rentalPackage === '8hr-80km') return 80;
      return 120;
    }
    
    // Heuristic based on text content
    const combined = (pickupLocation + ' ' + dropLocation).toLowerCase();
    let base = 28;
    if (tripType === 'airport' || combined.includes('airport')) {
      base = 38;
    } else if (tripType === 'round-trip') {
      base = 120;
    } else if (combined.includes('outstation') || combined.includes('coorg') || combined.includes('mysore') || combined.includes('tirupati')) {
      base = 180;
    } else if (combined.includes('railway') || combined.includes('station')) {
      base = 22;
    }
    return base;
  }, [tripType, rentalPackage, pickupLocation, dropLocation]);

  // Estimated fare calculation
  const fareBreakdown = useMemo(() => {
    let subtotal = 0;

    if (tripType === 'rental') {
      const pkg = RENTAL_PACKAGES.find(p => p.id === rentalPackage) || RENTAL_PACKAGES[1];
      subtotal = selectedVehicleId === 'suv' ? pkg.suv : selectedVehicleId === 'luxury' ? pkg.suv * 1.5 : pkg.sedan;
    } else {
      let multiplier = 1;
      if (tripType === 'round-trip') multiplier = 1.8; // discounted return
      const rawDistanceCost = estimatedKm * currentVehicle.baseRatePerKm * multiplier;
      subtotal = Math.max(rawDistanceCost, currentVehicle.minFare);
    }

    // Taxes (5% GST for passenger transport)
    const taxes = Math.round(subtotal * 0.05);
    
    // Promo discount
    const discount = appliedPromo ? appliedPromo.discountAmount : 0;
    const total = Math.max(subtotal + taxes - discount, currentVehicle.minFare);

    return {
      subtotal: Math.round(subtotal),
      taxes,
      discount,
      total: Math.round(total)
    };
  }, [tripType, rentalPackage, selectedVehicleId, estimatedKm, currentVehicle, appliedPromo]);

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    
    if (code === 'SHIVA50') {
      setAppliedPromo({ code, discountAmount: 50 });
    } else if (code === 'WELCOME10') {
      const discount = Math.round(fareBreakdown.subtotal * 0.1);
      setAppliedPromo({ code, discountAmount: discount });
    } else if (code === 'AIRPORT100') {
      setAppliedPromo({ code, discountAmount: 100 });
    } else {
      setPromoError('Invalid coupon code. Try SHIVA50 or WELCOME10.');
    }
  };

  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};
    if (!pickupLocation.trim()) {
      errs.pickupLocation = 'Please specify pickup address or area.';
    }
    if (tripType !== 'rental' && !dropLocation.trim()) {
      errs.dropLocation = 'Please specify destination or drop-off point.';
    }
    if (!pickupDate) {
      errs.pickupDate = 'Date is required.';
    }
    if (!pickupTime) {
      errs.pickupTime = 'Time is required.';
    }
    if (!customerName.trim()) {
      errs.customerName = 'Please enter passenger full name.';
    }
    
    const phoneClean = customerPhone.replace(/\D/g, '');
    if (!phoneClean || phoneClean.length < 10) {
      errs.customerPhone = 'Valid 10-digit phone number is required for dispatch SMS.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const randomRef = 'SHV-' + Math.floor(100000 + Math.random() * 900000);
      const record: BookingRecord = {
        bookingId: randomRef,
        createdAt: new Date().toLocaleString(),
        tripType,
        pickupLocation,
        dropLocation: tripType === 'rental' ? `Package: ${rentalPackage}` : dropLocation,
        pickupDate,
        pickupTime,
        returnDate: tripType === 'round-trip' ? returnDate : undefined,
        returnTime: tripType === 'round-trip' ? returnTime : undefined,
        rentalPackage: tripType === 'rental' ? rentalPackage : undefined,
        vehicleId: selectedVehicleId,
        passengerCount,
        luggageCount,
        customerName,
        customerPhone,
        customerEmail,
        specialInstructions,
        promoCode: appliedPromo?.code,
        estimatedDistanceKm: estimatedKm,
        estimatedFare: fareBreakdown.subtotal,
        discount: fareBreakdown.discount,
        finalFare: fareBreakdown.total,
        status: 'Confirmed'
      };

      setIsSubmitting(false);
      onBookingSuccess(record);
    }, 450);
  };

  const handleWhatsAppBooking = () => {
    if (!validateForm()) return;

    const message = `*Shiva Cabs Booking Request*
📍 *Pickup:* ${pickupLocation}
🏁 *Drop:* ${tripType === 'rental' ? `Rental: ${rentalPackage}` : dropLocation}
📅 *Date & Time:* ${pickupDate} at ${pickupTime}
🚘 *Vehicle:* ${currentVehicle.name} (${currentVehicle.models})
👤 *Name:* ${customerName}
📞 *Phone:* ${customerPhone}
💰 *Est. Fare:* ₹${fareBreakdown.total}
Trip Type: ${tripType.toUpperCase()}
Instructions: ${specialInstructions || 'None'}`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${CONTACT_INFO.cleanPhone}?text=${encoded}`, '_blank');
  };

  return (
    <div id="booking" className="scroll-mt-24">
      <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
        
        {/* Header / Trip Type Selector */}
        <div className="bg-stone-900 p-4 sm:p-6 text-white border-b border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading">
                Book Your Cab Instantly
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm mt-0.5">
                Guaranteed on-time pickup · Clean vehicles · Zero cancellation fee
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-amber-400 bg-stone-800/90 px-3 py-1.5 rounded-lg border border-stone-700/80 self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-semibold">All-Inclusive Transparent Fares</span>
            </div>
          </div>

          {/* Trip Type Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-stone-800/80 rounded-xl">
            <button
              type="button"
              onClick={() => setTripType('one-way')}
              className={`py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap text-center ${
                tripType === 'one-way'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
              }`}
            >
              One-Way Trip
            </button>
            <button
              type="button"
              onClick={() => setTripType('round-trip')}
              className={`py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap text-center ${
                tripType === 'round-trip'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
              }`}
            >
              Round-Trip
            </button>
            <button
              type="button"
              onClick={() => setTripType('airport')}
              className={`py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap text-center ${
                tripType === 'airport'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
              }`}
            >
              Airport Transfer
            </button>
            <button
              type="button"
              onClick={() => setTripType('rental')}
              className={`py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap text-center ${
                tripType === 'rental'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
              }`}
            >
              Hourly Rental
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitBooking} className="p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* Pickup & Drop Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Pickup */}
            <div>
              <label htmlFor={pickupId} className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  Pickup Location *
                </span>
                <span className="text-[11px] font-normal text-stone-400 lowercase">airport, hotel, landmark</span>
              </label>
              <input
                id={pickupId}
                type="text"
                placeholder="e.g. Terminal 2, MG Road Metro, or Home Address"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-stone-50/50 focus:bg-white transition-all outline-none focus:ring-2 ${
                  errors.pickupLocation 
                    ? 'border-red-400 focus:ring-red-200' 
                    : 'border-stone-300 focus:border-amber-500 focus:ring-amber-200'
                }`}
              />
              {errors.pickupLocation && (
                <p className="text-xs text-red-600 mt-1 font-medium">{errors.pickupLocation}</p>
              )}

              {/* Quick suggestions */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="text-[11px] text-stone-400 self-center">Popular:</span>
                {LOCATION_SUGGESTIONS.slice(0, 3).map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setPickupLocation(loc)}
                    className="text-[11px] px-2 py-0.5 bg-stone-100 hover:bg-amber-100 hover:text-amber-900 text-stone-600 rounded transition-colors"
                  >
                    {loc.split(' ')[0]} {loc.split(' ')[1] || ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Drop / Destination or Rental Package */}
            {tripType === 'rental' ? (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  Select Rental Duration *
                </label>
                <div className="space-y-2">
                  {RENTAL_PACKAGES.map((pkg) => (
                    <label
                      key={pkg.id}
                      className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                        rentalPackage === pkg.id 
                          ? 'border-amber-500 bg-amber-50/50 text-stone-900 font-semibold' 
                          : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="rentalPackage"
                          checked={rentalPackage === pkg.id}
                          onChange={() => setRentalPackage(pkg.id)}
                          className="accent-amber-500 w-4 h-4"
                        />
                        <span className="text-xs sm:text-sm">{pkg.label}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-stone-800">
                        ₹{selectedVehicleId === 'suv' ? pkg.suv : pkg.sedan}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor={dropId} className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    Drop Location *
                  </span>
                  <span className="text-[11px] font-normal text-stone-400 lowercase">destination area or city</span>
                </label>
                <input
                  id={dropId}
                  type="text"
                  placeholder="e.g. Airport, Outstation City, Office"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-stone-50/50 focus:bg-white transition-all outline-none focus:ring-2 ${
                    errors.dropLocation 
                      ? 'border-red-400 focus:ring-red-200' 
                      : 'border-stone-300 focus:border-amber-500 focus:ring-amber-200'
                  }`}
                />
                {errors.dropLocation && (
                  <p className="text-xs text-red-600 mt-1 font-medium">{errors.dropLocation}</p>
                )}

                {/* Quick suggestions */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[11px] text-stone-400 self-center">Popular:</span>
                  {LOCATION_SUGGESTIONS.slice(3, 6).map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setDropLocation(loc)}
                      className="text-[11px] px-2 py-0.5 bg-stone-100 hover:bg-amber-100 hover:text-amber-900 text-stone-600 rounded transition-colors"
                    >
                      {loc.split(' ')[0]} {loc.split(' ')[1] || ''}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-500" />
                Pickup Date *
              </label>
              <input
                type="date"
                min={todayStr}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-500" />
                Pickup Time *
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
              />
            </div>

            {tripType === 'round-trip' ? (
              <>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-500" />
                    Return Date *
                  </label>
                  <input
                    type="date"
                    min={pickupDate}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                    Return Time *
                  </label>
                  <input
                    type="time"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-stone-500" />
                    Passengers
                  </label>
                  <select
                    value={passengerCount}
                    onChange={(e) => setPassengerCount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 12, 14].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-stone-500" />
                    Luggage Bags
                  </label>
                  <select
                    value={luggageCount}
                    onChange={(e) => setLuggageCount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none cursor-pointer"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Bag' : 'Bags'}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>

          {/* Vehicle Category Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2.5 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-stone-600" />
              Choose Cab Category
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {VEHICLE_OPTIONS.map((veh) => {
                const isSelected = selectedVehicleId === veh.id;
                return (
                  <button
                    key={veh.id}
                    type="button"
                    onClick={() => onVehicleChange(veh.id)}
                    className={`relative text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/30'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-stone-900 font-heading">
                          {veh.name}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-amber-600" />
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 line-clamp-1">
                        {veh.models}
                      </p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-stone-500 flex items-center gap-1">
                        <Users className="w-3 h-3" /> Max {veh.passengers}
                      </span>
                      <span className="font-semibold text-stone-900 font-mono">
                        ₹{veh.baseRatePerKm}/km
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customer Details */}
          <div className="pt-2 border-t border-stone-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">
              Passenger & Contact Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
                  <User className="w-3 h-3 text-stone-400" />
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Suresh Kumar"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={`w-full px-3 py-2 text-sm rounded-xl border bg-stone-50/50 focus:bg-white focus:ring-2 outline-none ${
                    errors.customerName 
                      ? 'border-red-400 focus:ring-red-200' 
                      : 'border-stone-300 focus:border-amber-500 focus:ring-amber-200'
                  }`}
                />
                {errors.customerName && (
                  <p className="text-xs text-red-600 mt-1">{errors.customerName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-stone-400" />
                  Mobile Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210 (10 digits)"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className={`w-full px-3 py-2 text-sm rounded-xl border bg-stone-50/50 focus:bg-white focus:ring-2 outline-none font-mono ${
                    errors.customerPhone 
                      ? 'border-red-400 focus:ring-red-200' 
                      : 'border-stone-300 focus:border-amber-500 focus:ring-amber-200'
                  }`}
                />
                {errors.customerPhone && (
                  <p className="text-xs text-red-600 mt-1">{errors.customerPhone}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="For PDF tax invoice"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                />
              </div>
            </div>

            {/* Special notes */}
            <div className="mt-3">
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Flight Number / Pickup Landmark / Special Request
              </label>
              <input
                type="text"
                placeholder="e.g. Flight 6E-243 arrival, elderly passenger assistance, baby seat needed"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
              />
            </div>
          </div>

          {/* Live Fare Estimation & Promo Code Block */}
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Promo Code input */}
            <div className="w-full md:w-72">
              <div className="flex items-center gap-1.5 mb-1 text-xs font-semibold text-stone-700">
                <Tag className="w-3.5 h-3.5 text-amber-600" />
                <span>Have a Promo Code?</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Try SHIVA50 or WELCOME10"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs uppercase font-mono rounded-lg border border-stone-300 bg-white outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shrink-0"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <p className="text-[11px] text-emerald-600 font-medium mt-1">
                  ✓ Code {appliedPromo.code} applied (-₹{appliedPromo.discountAmount})
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-red-500 font-medium mt-1">
                  {promoError}
                </p>
              )}
            </div>

            {/* Fare Summary Display */}
            <div className="flex items-center justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-stone-200">
              <div className="text-right">
                <div className="text-[11px] text-stone-500">
                  Estimated Distance: <span className="font-mono font-medium text-stone-800">{estimatedKm} km</span>
                </div>
                <div className="text-xs text-stone-500">
                  Base + Taxes (5% GST): <span className="font-mono">₹{fareBreakdown.subtotal + fareBreakdown.taxes}</span>
                </div>
                {appliedPromo && (
                  <div className="text-xs text-emerald-600 font-medium">
                    Discount: -₹{appliedPromo.discountAmount}
                  </div>
                )}
              </div>

              <div className="text-right pl-4 border-l border-stone-300">
                <span className="block text-[11px] uppercase tracking-wider font-semibold text-stone-500">
                  Total Payable
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-mono">
                  ₹{fareBreakdown.total}
                </span>
              </div>
            </div>

          </div>

          {/* Primary Submit Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 py-3.5 px-6 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-heading text-base disabled:opacity-75"
            >
              {isSubmitting ? (
                <span>Generating Booking...</span>
              ) : (
                <>
                  <span>Confirm & Book Cab</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleWhatsAppBooking}
              className="w-full sm:w-auto py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap text-sm"
              title="Quickly send details via WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book via WhatsApp</span>
            </button>
          </div>

          {/* Guarantee Note */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-500 pt-2 border-t border-stone-100">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Zero cancellation charges up to 2 hrs
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Pay to driver via UPI / Cash / Card
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Driver contact sent 30 mins before pickup
            </span>
          </div>

        </form>

      </div>
    </div>
  );
};
