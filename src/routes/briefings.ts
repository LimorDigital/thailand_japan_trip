import { Router } from 'express';
import { generateDailyBriefing } from '../services/itineraryService';
import { sendWhatsAppText } from '../services/whatsappClient';

const router = Router();

router.post('/daily', async (req, res, next) => {
  try {
    const date = req.body.date || new Date().toISOString().slice(0, 10);
    const briefing = generateDailyBriefing(date);
    const to = process.env.TRAVELER_WHATSAPP_NUMBER;
    if (!to) {
      throw new Error('TRAVELER_WHATSAPP_NUMBER is not configured.');
    }
    await sendWhatsAppText(to, briefing);
    res.json({ status: 'sent', briefing });
  } catch (error) {
    next(error);
  }
});

export default router;
