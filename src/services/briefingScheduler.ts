import { generateDailyBriefing } from './itineraryService';
import { queueWhatsAppNotification } from './notificationsService';
import { DEFAULT_TRIP_ID } from './constants';

export async function scheduleDailyBriefing(date: string, tripId: string = DEFAULT_TRIP_ID, sendAt?: string) {
  const briefing = generateDailyBriefing(date);
  const scheduledAt = sendAt || `${date}T06:30:00+09:00`;

  const notification = await queueWhatsAppNotification(tripId, briefing, scheduledAt);
  return notification;
}
