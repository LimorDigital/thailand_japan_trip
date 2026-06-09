import { Router } from 'express';
import { createPackingReminder, sendReminder } from '../services/reminderService';
import { createReminder } from '../services/reminderRepository';
import { DEFAULT_TRIP_ID } from '../services/constants';

const router = Router();

router.post('/packing', async (req, res, next) => {
  try {
    const reminder = createPackingReminder();
    await createReminder(reminder);
    await sendReminder(reminder);
    res.json({ status: 'sent', reminder });
  } catch (error) {
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const reminder = req.body;
    if (!reminder?.id || !reminder?.tripId || !reminder?.title || !reminder?.remindAt || !reminder?.type) {
      return res.status(400).json({ error: 'Missing required reminder fields.' });
    }
    const created = await createReminder(reminder);
    res.status(201).json({ status: 'created', reminder: created });
  } catch (error) {
    next(error);
  }
});

router.post('/test', async (req, res, next) => {
  try {
    const reminder = {
      id: 'reminder-test',
      tripId: DEFAULT_TRIP_ID,
      title: 'Test travel reminder',
      description: 'זוהי תזכורת בדיקה עבור העוזר האישי.',
      remindAt: new Date().toISOString(),
      type: 'test',
      status: 'pending' as const
    };
    await sendReminder(reminder);
    res.json({ status: 'sent', reminder });
  } catch (error) {
    next(error);
  }
});

export default router;
