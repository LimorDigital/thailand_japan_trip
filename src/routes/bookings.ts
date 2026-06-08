import { Router } from 'express';
import { createAccommodation, createAttraction, createFlight, getAccommodations, getAttractions, getFlights } from '../services/bookingRepository';
import { scheduleAccommodationReminder, scheduleAttractionReminder, scheduleFlightReminder } from '../services/bookingNotificationService';

const router = Router();

router.get('/accommodations', async (req, res, next) => {
  try {
    const tripId = req.query.tripId as string | undefined;
    const accommodations = await getAccommodations(tripId);
    res.json({ accommodations });
  } catch (error) {
    next(error);
  }
});

router.post('/accommodations', async (req, res, next) => {
  try {
    const created = await createAccommodation(req.body);
    await scheduleAccommodationReminder(created);
    res.status(201).json({ accommodation: created });
  } catch (error) {
    next(error);
  }
});

router.get('/flights', async (req, res, next) => {
  try {
    const tripId = req.query.tripId as string | undefined;
    const flights = await getFlights(tripId);
    res.json({ flights });
  } catch (error) {
    next(error);
  }
});

router.post('/flights', async (req, res, next) => {
  try {
    const created = await createFlight(req.body);
    await scheduleFlightReminder(created);
    res.status(201).json({ flight: created });
  } catch (error) {
    next(error);
  }
});

router.get('/attractions', async (req, res, next) => {
  try {
    const tripId = req.query.tripId as string | undefined;
    const attractions = await getAttractions(tripId);
    res.json({ attractions });
  } catch (error) {
    next(error);
  }
});

router.post('/attractions', async (req, res, next) => {
  try {
    const created = await createAttraction(req.body);
    await scheduleAttractionReminder(created);
    res.status(201).json({ attraction: created });
  } catch (error) {
    next(error);
  }
});

export default router;
