import { query } from './dbClient';
import { NotificationRecord } from '../types';

export async function createNotification(notification: Omit<NotificationRecord, 'id' | 'created_at' | 'updated_at'>) {
  const sql = `
    INSERT INTO notifications (trip_id, channel, message, status, scheduled_at, metadata, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, now(), now())
    RETURNING *
  `;

  const result = await query<NotificationRecord>(sql, [
    notification.tripId,
    notification.channel,
    notification.message,
    notification.status || 'queued',
    notification.scheduledAt,
    notification.metadata || {}
  ]);

  return result.rows[0];
}

export async function getQueuedNotifications(tripId?: string) {
  const sql = tripId
    ? 'SELECT * FROM notifications WHERE status = $1 AND scheduled_at <= now() AND trip_id = $2 ORDER BY scheduled_at'
    : 'SELECT * FROM notifications WHERE status = $1 AND scheduled_at <= now() ORDER BY scheduled_at';
  const params = tripId ? ['queued', tripId] : ['queued'];
  const result = await query<NotificationRecord>(sql, params);
  return result.rows;
}

export async function markNotificationSent(notificationId: string) {
  const sql = `
    UPDATE notifications
    SET status = 'sent', sent_at = now(), updated_at = now()
    WHERE id = $1
    RETURNING *
  `;
  const result = await query<NotificationRecord>(sql, [notificationId]);
  return result.rows[0];
}

export async function markNotificationFailed(notificationId: string, errorMessage: string) {
  const sql = `
    UPDATE notifications
    SET status = 'failed', metadata = jsonb_set(metadata, '{error}', to_jsonb($2::text)), updated_at = now()
    WHERE id = $1
    RETURNING *
  `;
  const result = await query<NotificationRecord>(sql, [notificationId, errorMessage]);
  return result.rows[0];
}
