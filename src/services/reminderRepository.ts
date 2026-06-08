import { query } from './dbClient';
import { Reminder } from '../types';

export async function createReminder(reminder: Reminder) {
  const sql = `
    INSERT INTO reminders (id, trip_id, title, description, remind_at, type, status, metadata, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, now(), now())
    RETURNING *
  `;

  const result = await query<Reminder>(sql, [
    reminder.id,
    reminder.tripId,
    reminder.title,
    reminder.description,
    reminder.remindAt,
    reminder.type,
    reminder.status || 'pending',
    reminder.metadata || {}
  ]);

  return result.rows[0];
}

export async function getPendingReminders(tripId: string) {
  const sql = `
    SELECT * FROM reminders
    WHERE trip_id = $1 AND status = 'pending' AND remind_at >= now()
    ORDER BY remind_at
  `;

  const result = await query<Reminder>(sql, [tripId]);
  return result.rows;
}

export async function markReminderSent(reminderId: string) {
  const sql = `
    UPDATE reminders
    SET status = 'sent', updated_at = now()
    WHERE id = $1
    RETURNING *
  `;

  const result = await query<Reminder>(sql, [reminderId]);
  return result.rows[0];
}

export async function getDueReminders(tripId?: string) {
  const sql = tripId
    ? `SELECT * FROM reminders WHERE trip_id = $1 AND status = 'pending' AND remind_at <= now() ORDER BY remind_at`
    : `SELECT * FROM reminders WHERE status = 'pending' AND remind_at <= now() ORDER BY remind_at`;

  const params = tripId ? [tripId] : [];
  const result = await query<Reminder>(sql, params);
  return result.rows;
}

export async function markReminderScheduled(reminderId: string) {
  const sql = `
    UPDATE reminders
    SET status = 'scheduled', updated_at = now()
    WHERE id = $1
    RETURNING *
  `;

  const result = await query<Reminder>(sql, [reminderId]);
  return result.rows[0];
}
