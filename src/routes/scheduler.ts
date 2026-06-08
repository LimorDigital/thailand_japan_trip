import { Router } from 'express';
import { scheduleDueReminders } from '../services/reminderScheduler';
import { scheduleDailyBriefing } from '../services/briefingScheduler';
import { processQueuedNotifications } from '../services/notificationsService';

const router = Router();

router.post('/run', async (req, res, next) => {
  try {
    const tripId = req.body.tripId as string | undefined;
    const reminders = await scheduleDueReminders(tripId);
    const notifications = await processQueuedNotifications(tripId);
    res.json({ reminders, notifications });
  } catch (error) {
    next(error);
  }
});

router.post('/daily', async (req, res, next) => {
  try {
    const date = req.body.date;
    if (!date) {
      return res.status(400).json({ error: 'Missing required field: date' });
    }
    const tripId = req.body.tripId as string | undefined;
    const sendAt = req.body.sendAt as string | undefined;
    const notification = await scheduleDailyBriefing(date, tripId, sendAt);
    res.status(201).json({ notification });
  } catch (error) {
    next(error);
  }
});

export default router;
