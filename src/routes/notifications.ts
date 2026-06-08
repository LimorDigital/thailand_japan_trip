import { Router } from 'express';
import { createNotification, getQueuedNotifications } from '../services/notificationsRepository';
import { processQueuedNotifications } from '../services/notificationsService';

const router = Router();

router.post('/create', async (req, res, next) => {
  try {
    const notification = await createNotification(req.body);
    res.status(201).json({ notification });
  } catch (error) {
    next(error);
  }
});

router.get('/queued', async (req, res, next) => {
  try {
    const tripId = req.query.tripId as string | undefined;
    const notifications = await getQueuedNotifications(tripId);
    res.json({ notifications });
  } catch (error) {
    next(error);
  }
});

router.post('/dispatch', async (req, res, next) => {
  try {
    const tripId = req.body.tripId as string | undefined;
    const results = await processQueuedNotifications(tripId);
    res.json({ results });
  } catch (error) {
    next(error);
  }
});

export default router;
