import config from '../config';
import { sendWhatsAppText } from './whatsappClient';
import { createNotification as saveNotification, getQueuedNotifications, markNotificationFailed, markNotificationSent } from './notificationsRepository';
import { NotificationRecord } from '../types';

export async function queueWhatsAppNotification(tripId: string, message: string, scheduledAt?: string, to?: string) {
  return saveNotification({
    tripId,
    channel: 'whatsapp',
    message,
    status: 'queued',
    scheduledAt: scheduledAt || new Date().toISOString(),
    metadata: { to: to || config.whatsapp.defaultRecipient }
  });
}

export async function processQueuedNotifications(tripId?: string) {
  const notifications = await getQueuedNotifications(tripId);
  const results: Array<{ notification: NotificationRecord; status: string }> = [];

  for (const notification of notifications) {
    try {
      if (notification.channel === 'whatsapp') {
        const to = (notification.metadata as any)?.to || config.whatsapp.defaultRecipient;
        if (!to) {
          throw new Error('WhatsApp recipient number is not configured.');
        }
        await sendWhatsAppText(to, notification.message);
      } else {
        throw new Error(`Unsupported channel: ${notification.channel}`);
      }

      const sent = await markNotificationSent(notification.id);
      results.push({ notification: sent, status: 'sent' });
    } catch (error: any) {
      const failed = await markNotificationFailed(notification.id, error.message || 'Unknown error');
      results.push({ notification: failed, status: 'failed' });
    }
  }

  return results;
}
