import { Reminder } from '../types';
import { sendWhatsAppText } from './whatsappClient';
import { DEFAULT_TRIP_ID } from './constants';

const defaultWhatsAppNumber = process.env.TRAVELER_WHATSAPP_NUMBER || '';

export function buildReminderMessage(reminder: Reminder): string {
  const base = [
    `תזכורת: ${reminder.title}`,
    reminder.description ? reminder.description : undefined,
    `מתי: ${new Date(reminder.remindAt).toLocaleString('he-IL', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Tokyo' })}`
  ].filter(Boolean);

  return base.join('\n');
}

export async function sendReminder(reminder: Reminder) {
  if (!defaultWhatsAppNumber) {
    throw new Error('TRAVELER_WHATSAPP_NUMBER is not configured.');
  }

  const message = buildReminderMessage(reminder);
  await sendWhatsAppText(defaultWhatsAppNumber, message);
}

export function createPackingReminder(): Reminder {
  const remindAt = new Date('2026-06-24T20:00:00+09:00').toISOString();

  return {
    id: 'reminder-packing-thailand',
    tripId: DEFAULT_TRIP_ID,
    title: 'תזכורת לאריזה לפני העזיבה לקו פאנגאן',
    description: 'ארזו בגדי ים, קרם הגנה, בגדים קלים, מסמכי נסיעה, מטענים, תרופות וציוד חיוני לילדים.',
    remindAt,
    type: 'packing',
    status: 'pending',
    metadata: {
      destination: 'Koh Phangan'
    }
  };
}
