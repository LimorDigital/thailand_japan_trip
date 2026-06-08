import { getDueReminders, markReminderScheduled } from './reminderRepository';
import { queueWhatsAppNotification } from './notificationsService';

export async function scheduleDueReminders(tripId?: string) {
  const dueReminders = await getDueReminders(tripId);
  const results: Array<{ reminderId: string; notificationId?: string; status: string }> = [];

  for (const reminder of dueReminders) {
    try {
      const notification = await queueWhatsAppNotification(
        reminder.tripId,
        `תזכורת: ${reminder.title}\n${reminder.description || ''}`.trim(),
        reminder.remindAt,
        reminder.metadata?.['recipient'] as string | undefined
      );

      await markReminderScheduled(reminder.id);
      results.push({ reminderId: reminder.id, notificationId: notification.id, status: 'scheduled' });
    } catch (error: any) {
      results.push({ reminderId: reminder.id, status: `failed: ${error.message || 'unknown'}` });
    }
  }

  return results;
}
