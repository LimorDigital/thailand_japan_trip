import { Accommodation, Attraction, Flight } from '../types';
import { queueWhatsAppNotification } from './notificationsService';

function getSendTimeForEvent(eventTime?: string, defaultOffsetHours = 12) {
  if (!eventTime) {
    return new Date().toISOString();
  }
  const eventDate = new Date(eventTime);
  const scheduledDate = new Date(eventDate.getTime() - defaultOffsetHours * 60 * 60 * 1000);
  return scheduledDate.toISOString();
}

export async function scheduleAccommodationReminder(accommodation: Accommodation) {
  const title = `צ'ק-אין במלון ${accommodation.name}`;
  const description = `צ'ק-אין ב-${accommodation.name} ב-${accommodation.city} בתאריך ${accommodation.checkIn || 'אחר'}.`;
  const scheduledAt = getSendTimeForEvent(accommodation.checkIn, 12);

  return queueWhatsAppNotification(
    accommodation.tripId,
    `${title}\n${description}`,
    scheduledAt
  );
}

export async function scheduleFlightReminder(flight: Flight) {
  const departureAt = flight.departureTime;
  const title = `טיסה ${flight.flightNumber || ''}`;
  const description = `טיסה מ-${flight.departureAirport} ל-${flight.arrivalAirport} בתאריך ${departureAt || 'לא ידוע'}.`;
  const scheduledAt = getSendTimeForEvent(departureAt, 3);

  return queueWhatsAppNotification(
    flight.tripId,
    `${title}\n${description}`,
    scheduledAt
  );
}

export async function scheduleAttractionReminder(attraction: Attraction) {
  const dateTime = attraction.time || attraction.date;
  const title = `תזכורת לאטרקציה: ${attraction.name}`;
  const description = `הזמנה ל${attraction.name}${attraction.location ? ` ב-${attraction.location}` : ''}${dateTime ? ` ב-${dateTime}` : ''}.`;
  const scheduledAt = getSendTimeForEvent(dateTime, 12);

  return queueWhatsAppNotification(
    attraction.tripId,
    `${title}\n${description}`,
    scheduledAt
  );
}
