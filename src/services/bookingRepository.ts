import { Accommodation, Attraction, Flight } from '../types';
import { query } from './dbClient';

export async function getAccommodations(tripId?: string) {
  const sql = tripId
    ? 'SELECT * FROM accommodations WHERE trip_id = $1 ORDER BY check_in'
    : 'SELECT * FROM accommodations ORDER BY check_in';
  const result = await query<Accommodation>(sql, tripId ? [tripId] : []);
  return result.rows;
}

export async function createAccommodation(accommodation: Accommodation) {
  const sql = `
    INSERT INTO accommodations (id, trip_id, name, address, city, check_in, check_out, confirmation_number, booking_url, notes, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, now(), now())
    RETURNING *
  `;
  const result = await query<Accommodation>(sql, [
    accommodation.id,
    accommodation.tripId,
    accommodation.name,
    accommodation.address,
    accommodation.city,
    accommodation.checkIn,
    accommodation.checkOut,
    accommodation.confirmationNumber,
    accommodation.bookingUrl,
    accommodation.notes
  ]);
  return result.rows[0];
}

export async function getFlights(tripId?: string) {
  const sql = tripId
    ? 'SELECT * FROM flights WHERE trip_id = $1 ORDER BY departure_time'
    : 'SELECT * FROM flights ORDER BY departure_time';
  const result = await query<Flight>(sql, tripId ? [tripId] : []);
  return result.rows;
}

export async function createFlight(flight: Flight) {
  const sql = `
    INSERT INTO flights (id, trip_id, airline, flight_number, departure_airport, arrival_airport, departure_time, arrival_time, seat_class, confirmation_number, status, booking_url, notes, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, now(), now())
    RETURNING *
  `;
  const result = await query<Flight>(sql, [
    flight.id,
    flight.tripId,
    flight.airline,
    flight.flightNumber,
    flight.departureAirport,
    flight.arrivalAirport,
    flight.departureTime,
    flight.arrivalTime,
    flight.seatClass,
    flight.confirmationNumber,
    flight.status,
    flight.bookingUrl,
    flight.notes
  ]);
  return result.rows[0];
}

export async function getAttractions(tripId?: string) {
  const sql = tripId
    ? 'SELECT * FROM attractions WHERE trip_id = $1 ORDER BY date'
    : 'SELECT * FROM attractions ORDER BY date';
  const result = await query<Attraction>(sql, tripId ? [tripId] : []);
  return result.rows;
}

export async function createAttraction(attraction: Attraction) {
  const sql = `
    INSERT INTO attractions (id, trip_id, name, location, date, time, booking_status, confirmation_number, reservation_url, notes, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, now(), now())
    RETURNING *
  `;
  const result = await query<Attraction>(sql, [
    attraction.id,
    attraction.tripId,
    attraction.name,
    attraction.location,
    attraction.date,
    attraction.time,
    attraction.bookingStatus,
    attraction.confirmationNumber,
    attraction.reservationUrl,
    attraction.notes
  ]);
  return result.rows[0];
}
