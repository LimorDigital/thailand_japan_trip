import { generateDailyBriefing } from './itineraryService';
import { queueWhatsAppNotification } from './notificationsService';

export async function scheduleDailyBriefing(date: string, tripId: string = 'trip-2026-japan-thailand', sendAt?: string) {
  const briefing = generateDailyBriefing(date);
  const scheduledAt = sendAt || `${date}T06:30:00+09:00`;

  const notification = await queueWhatsAppNotification(tripId, briefing, scheduledAt);
  return notification;
}
