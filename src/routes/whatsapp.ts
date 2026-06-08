import { Router } from 'express';
import config from '../config';
import { handleIncomingWhatsAppMessage } from '../handlers/whatsappHandler';

const router = Router();

router.get('/whatsapp', (req, res) => {
  const mode = req.query['hub.mode'];
  const verifyToken = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && verifyToken === config.whatsapp.verifyToken) {
    return res.status(200).send(challenge as string);
  }

  return res.sendStatus(403);
});

router.post('/whatsapp', async (req, res, next) => {
  try {
    const result = await handleIncomingWhatsAppMessage(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
