export interface Traveler {
  id: string;
  firstName: string;
  lastName: string;
  role: 'adult' | 'child';
  phone?: string;
  preferences?: Record<string, unknown>;
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  notes?: string;
}

export interface Accommodation {
  id: string;
  tripId: string;
  name: string;
  address?: string;
  city?: string;
  checkIn?: string;
  checkOut?: string;
  confirmationNumber?: string;
  bookingUrl?: string;
  notes?: string;
}

export interface Flight {
  id: string;
  tripId: string;
  airline?: string;
  flightNumber?: string;
  departureAirport?: string;
  arrivalAirport?: string;
  departureTime?: string;
  arrivalTime?: string;
  seatClass?: string;
  confirmationNumber?: string;
  status?: string;
  bookingUrl?: string;
  notes?: string;
}

export interface Transportation {
  id: string;
  tripId: string;
  type?: string;
  provider?: string;
  fromLocation?: string;
  toLocation?: string;
  departureTime?: string;
  arrivalTime?: string;
  duration?: string;
  confirmationNumber?: string;
  bookingUrl?: string;
  notes?: string;
}

export interface Attraction {
  id: string;
  tripId: string;
  name: string;
  location?: string;
  date?: string;
  time?: string;
  bookingStatus?: string;
  confirmationNumber?: string;
  reservationUrl?: string;
  notes?: string;
}

export interface Reminder {
  id: string;
  tripId: string;
  title: string;
  description?: string;
  remindAt: string;
  type: string;
  status?: 'pending' | 'sent' | 'canceled';
  metadata?: Record<string, unknown>;
}

export interface ItineraryItem {
  id: string;
  tripId: string;
  dayDate: string;
  startTime?: string;
  endTime?: string;
  title: string;
  category?: string;
  description?: string;
  location?: string;
  relatedEntityType?: string;
  relatedEntityId?: string;
  notes?: string;
}

export interface NotificationRecord {
  id: string;
  tripId: string;
  channel: string;
  message: string;
  status: 'queued' | 'sent' | 'failed';
  scheduledAt?: string;
  sentAt?: string;
  metadata?: Record<string, unknown>;
}
