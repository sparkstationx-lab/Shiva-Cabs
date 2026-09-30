export type TripType = 'one-way' | 'round-trip' | 'airport' | 'rental';

export type VehicleId = 'sedan' | 'suv' | 'luxury' | 'tempo';

export interface VehicleOption {
  id: VehicleId;
  name: string;
  models: string;
  category: string;
  tagline: string;
  passengers: number;
  luggage: number;
  baseRatePerKm: number;
  minFare: number;
  image: string;
  features: string[];
}

export interface BookingFormData {
  tripType: TripType;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  returnTime?: string;
  rentalPackage?: string;
  vehicleId: VehicleId;
  passengerCount: number;
  luggageCount: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  specialInstructions: string;
  promoCode?: string;
}

export interface BookingRecord extends BookingFormData {
  bookingId: string;
  createdAt: string;
  estimatedDistanceKm: number;
  estimatedFare: number;
  discount: number;
  finalFare: number;
  status: 'Confirmed' | 'Dispatched' | 'Completed';
}

export interface PopularRoute {
  id: string;
  from: string;
  to: string;
  distanceKm: number;
  duration: string;
  sedanFare: number;
  suvFare: number;
  category: 'Airport' | 'Outstation' | 'City';
}
