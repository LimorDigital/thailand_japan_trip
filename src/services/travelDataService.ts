import { Accommodation, Attraction, Flight, Traveler, Trip } from '../types';

const travelers: Traveler[] = [
  { id: 'traveler-limor', firstName: 'Limor', lastName: 'Gurevich', role: 'adult' },
  { id: 'traveler-daniel', firstName: 'Daniel', lastName: 'Gurevich', role: 'adult' },
  { id: 'traveler-beeri', firstName: 'Beeri', lastName: 'Gurevich', role: 'child' },
  { id: 'traveler-alex', firstName: 'Alex', lastName: 'Gurevich', role: 'child' }
];

const trip: Trip = {
  id: 'trip-2026-japan-thailand',
  name: 'Japan & Thailand Family Travel 2026',
  destination: 'Thailand and Japan',
  startDate: '2026-06-25',
  endDate: '2026-08-31',
  notes: 'Koh Phangan עבור רגיעה ובית חוף, ואחר כך טיול משפחתי ביפן עם טבע, תרבות וחוויה ייחודית.'
};

const accommodations: Accommodation[] = [
  {
    id: 'accom-haneda',
    tripId: trip.id,
    name: 'Villa Fontaine Grand Haneda Airport',
    city: 'Haneda',
    checkIn: '2026-08-01T15:00:00+09:00',
    checkOut: '2026-08-02T11:00:00+09:00'
  },
  {
    id: 'accom-morioka',
    tripId: trip.id,
    name: 'Art Hotel Morioka',
    city: 'Morioka',
    checkIn: '2026-08-02T15:00:00+09:00',
    checkOut: '2026-08-05T11:00:00+09:00'
  },
  {
    id: 'accom-sendai',
    tripId: trip.id,
    name: 'Hotel Keihan Sendai',
    city: 'Sendai',
    checkIn: '2026-08-05T15:00:00+09:00',
    checkOut: '2026-08-08T11:00:00+09:00'
  },
  {
    id: 'accom-takayama',
    tripId: trip.id,
    name: 'KURANE VILLA SANMACHI Takayama',
    city: 'Takayama',
    checkIn: '2026-08-08T15:00:00+09:00',
    checkOut: '2026-08-15T11:00:00+09:00'
  },
  {
    id: 'accom-kyoto',
    tripId: trip.id,
    name: 'Cochien Imperial Garden Kyoto',
    city: 'Kyoto',
    checkIn: '2026-08-15T15:00:00+09:00',
    checkOut: '2026-08-22T11:00:00+09:00'
  }
];

const flights: Flight[] = [
  {
    id: 'flight-return-kix-ath',
    tripId: trip.id,
    airline: 'Unknown',
    flightNumber: 'Unknown',
    departureAirport: 'KIX',
    arrivalAirport: 'ATH',
    departureTime: '2026-08-31T18:40:00+09:00',
    arrivalTime: '2026-09-01T06:15:00+03:00',
    confirmationNumber: '',
    status: 'confirmed'
  }
];

const attractions: Attraction[] = [
  { id: 'attraction-usj', tripId: trip.id, name: 'Universal Studios Japan', bookingStatus: 'pending' },
  { id: 'attraction-pokemon-cafe', tripId: trip.id, name: 'Pokemon Cafe', bookingStatus: 'pending' },
  { id: 'attraction-sanrio-cafe', tripId: trip.id, name: 'Sanrio Cafe', bookingStatus: 'pending' },
  { id: 'attraction-kyoto-traditional', tripId: trip.id, name: 'Kyoto traditional experiences', bookingStatus: 'pending' },
  { id: 'attraction-uji', tripId: trip.id, name: 'Uji day trip', bookingStatus: 'pending' },
  { id: 'attraction-amanohashidate', tripId: trip.id, name: 'Amanohashidate day trip', bookingStatus: 'pending' },
  { id: 'attraction-ine', tripId: trip.id, name: 'Ine fishing village', bookingStatus: 'pending' },
  { id: 'attraction-kawaguchiko', tripId: trip.id, name: 'Lake Kawaguchiko', bookingStatus: 'pending' },
  { id: 'attraction-fuji', tripId: trip.id, name: 'Mount Fuji views', bookingStatus: 'pending' }
];

export function getTravelers(): Traveler[] {
  return travelers;
}

export function getTrip(): Trip {
  return trip;
}

export function getAccommodations(): Accommodation[] {
  return accommodations;
}

export function getFlights(): Flight[] {
  return flights;
}

export function getAttractions(): Attraction[] {
  return attractions;
}
