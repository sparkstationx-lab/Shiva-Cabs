import { VehicleOption, PopularRoute } from '../types/booking';

// Generated image assets
import heroCabImg from '../assets/images/hero_shiva_cabs_1790779191686.jpg';
import fleetSedanImg from '../assets/images/fleet_sedan_car_1790779207882.jpg';
import fleetSuvImg from '../assets/images/fleet_innova_suv_1790779219742.jpg';
import fleetLuxuryImg from '../assets/images/fleet_luxury_sedan_1790779233106.jpg';
import shivaLogoImg from '../assets/images/logoshiva.png';

export const HERO_IMAGE = heroCabImg;
export const SHIVA_LOGO = shivaLogoImg;

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'sedan',
    name: 'Executive Sedan',
    models: 'Swift Dzire, Toyota Etios, Hyundai Aura',
    category: 'Comfort & Efficiency',
    tagline: 'Ideal for city rides, airport drops, and small family road journeys.',
    passengers: 4,
    luggage: 2,
    baseRatePerKm: 12,
    minFare: 750,
    image: fleetSedanImg,
    features: ['High-efficiency AC', 'Clean sanitized cabin', 'Bottle holder & boot space', 'Experienced verified driver']
  },
  {
    id: 'suv',
    name: 'Prime SUV / MUV',
    models: 'Toyota Innova Crysta, Maruti Ertiga, Kia Carens',
    category: 'Family & Group Travel',
    tagline: 'Extra legroom, heavy boot capacity, and smooth highway stability.',
    passengers: 6,
    luggage: 4,
    baseRatePerKm: 18,
    minFare: 1250,
    image: fleetSuvImg,
    features: ['Captain seats available', 'Dual AC vents', 'Ample luggage carrier', 'Great for hills & long tours']
  },
  {
    id: 'luxury',
    name: 'Chauffeur Luxury',
    models: 'Mercedes C-Class, Toyota Camry, BMW 3 Series',
    category: 'VIP & Corporate Chauffeur',
    tagline: 'Supreme comfort with suited chauffeurs, bottled water, and quiet ride.',
    passengers: 4,
    luggage: 3,
    baseRatePerKm: 28,
    minFare: 2400,
    image: fleetLuxuryImg,
    features: ['Premium leather upholstery', 'Complimentary packaged water & newspaper', 'Uniformed executive chauffeur', 'Airport VIP terminal pickup']
  },
  {
    id: 'tempo',
    name: 'Tempo Traveller',
    models: 'Force Urbania, Tempo Traveller 12-17 Seater',
    category: 'Events & Pilgrimages',
    tagline: 'Large group travel for family weddings, corporate team outings, and pilgrimages.',
    passengers: 14,
    luggage: 10,
    baseRatePerKm: 26,
    minFare: 3500,
    image: fleetSuvImg,
    features: ['Pushback reclining seats', 'High-roof AC cabin', 'PA audio system', 'Dedicated luggage compartment']
  }
];

export const POPULAR_ROUTES: PopularRoute[] = [
  {
    id: 'route-1',
    from: 'City Center / MG Road',
    to: 'International Airport (T1 / T2)',
    distanceKm: 38,
    duration: '50-65 mins',
    sedanFare: 899,
    suvFare: 1499,
    category: 'Airport'
  },
  {
    id: 'route-2',
    from: 'Central Railway Station',
    to: 'Electronic City / Tech Park Hub',
    distanceKm: 26,
    duration: '40-50 mins',
    sedanFare: 649,
    suvFare: 1099,
    category: 'City'
  },
  {
    id: 'route-3',
    from: 'Metro Downtown',
    to: 'Heritage Palace / Old Fort Zone',
    distanceKm: 18,
    duration: '35 mins',
    sedanFare: 499,
    suvFare: 850,
    category: 'City'
  },
  {
    id: 'route-4',
    from: 'City Center',
    to: 'Mysore Heritage Corridor',
    distanceKm: 145,
    duration: '2.5 - 3 hrs',
    sedanFare: 2699,
    suvFare: 3899,
    category: 'Outstation'
  },
  {
    id: 'route-5',
    from: 'City Airport',
    to: 'Coorg Hill Sanctuary',
    distanceKm: 260,
    duration: '5 hrs',
    sedanFare: 4899,
    suvFare: 6999,
    category: 'Outstation'
  },
  {
    id: 'route-6',
    from: 'Metro Station',
    to: 'Tirupati Pilgrimage Gate',
    distanceKm: 250,
    duration: '4.5 hrs',
    sedanFare: 4699,
    suvFare: 6799,
    category: 'Outstation'
  }
];

export const RENTAL_PACKAGES = [
  { id: '4hr-40km', label: 'Local Half Day (4 Hours / 40 km)', sedan: 1200, suv: 1800 },
  { id: '8hr-80km', label: 'Local Full Day (8 Hours / 80 km)', sedan: 2100, suv: 3100 },
  { id: '12hr-120km', label: 'Extended Day (12 Hours / 120 km)', sedan: 2900, suv: 4200 }
];

export const LOCATION_SUGGESTIONS = [
  'International Airport Terminal 1',
  'International Airport Terminal 2',
  'Central Railway Station',
  'City Centre / Mahatma Gandhi Road',
  'Cyber City & IT Technology Park',
  'South Extension / Commercial Hub',
  'Grand Hyatt / Luxury Hotel Zone',
  'Interstate Bus Terminal (ISBT)',
  'Old City Heritage Gate',
  'University Campus Main Gate'
];

export const CONTACT_INFO = {
  brandName: 'Shivay Cabs',
  tagline: 'Reliable Journeys, Transparent Pricing',
  primaryPhone: '+91 98765 43210',
  secondaryPhone: '+91 98765 43211',
  tollFree: '1800-200-7448',
  whatsappNumber: '+91 98765 43210',
  cleanPhone: '919876543210',
  email: 'bookings@shivaycabs.com',
  supportEmail: 'support@shivaycabs.com',
  address: {
    street: 'Plot 42, Airport Gateway Commercial Complex',
    area: 'Terminal Road, Sector 18',
    city: 'Metro City, 560001',
    state: 'Karnataka, India',
    landmarks: 'Adjacent to Airport Express Metro Pillar #142'
  },
  hours: '24 Hours / 7 Days a week (Year-round dispatch & assistance)'
};

export const TESTIMONIALS = [
  {
    name: 'Rajesh K. Sharma',
    role: 'Frequent Business Traveler',
    company: 'Fintech Solutions Ltd.',
    trip: 'Airport Pickup & Drop',
    comment: 'Booked Shivay Cabs for 4 am airport transfers multiple times. Driver arrives 10 minutes early, cab is spotless, and billing is completely straightforward with no surprise surge fares.',
    rating: 5
  },
  {
    name: 'Pooja Venkatesh',
    role: 'Family Outstation Trip',
    company: 'Bangalore Resident',
    trip: 'Round-trip to Coorg (Innova Crysta)',
    comment: 'The Innova provided by Shivay Cabs was immaculate. Our driver, Ramesh, was extremely courteous and drove carefully on winding mountain roads. Highly recommended for family vacations!',
    rating: 5
  },
  {
    name: 'Vikramaditya Rao',
    role: 'Corporate Fleet Coordinator',
    company: 'Apex Technologies',
    trip: 'Corporate Event Fleet',
    comment: 'We relied on Shivay Cabs for our 3-day annual investor summit. 12 cabs synchronized seamlessly. Instant receipts, polite chauffeurs, and outstanding dispatch coordination.',
    rating: 5
  }
];

export const FAQS = [
  {
    q: 'How do I receive driver and cab details after booking?',
    a: 'Once your booking is confirmed, you immediately receive a booking reference. Your driver name, mobile number, and vehicle registration number are dispatched via SMS and WhatsApp 30 to 45 minutes prior to scheduled pickup.'
  },
  {
    q: 'Are tolls, state taxes, and parking fees included in the fare?',
    a: 'For city airport transfers and fixed package routes, all standard tolls are transparently calculated. For custom outstation trips, highway toll taxes and parking tickets are paid as actuals at toll booths or added with a clear printed slip without hidden markup.'
  },
  {
    q: 'Can I cancel or reschedule my booking? Is there a fee?',
    a: 'You can cancel or reschedule your ride free of charge up to 2 hours before the scheduled pickup time. We do not charge cancellation penalties for flights delayed by airlines.'
  },
  {
    q: 'Are Shivay Cabs sanitized and GPS enabled?',
    a: 'Yes, 100% of our fleet is equipped with live GPS tracking and emergency panic assistance. Every vehicle undergoes interior cleaning and sanitization after each scheduled trip.'
  },
  {
    q: 'Do you offer night service and emergency booking?',
    a: 'Yes, our dispatch desk and 24/7 helpline operate around the clock. You can call or WhatsApp our helpline at any hour for immediate or advance cab arrangements.'
  }
];
