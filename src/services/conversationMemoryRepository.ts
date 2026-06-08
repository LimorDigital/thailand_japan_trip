import { query } from './dbClient';

interface ConversationMemory {
  id: string;
  trip_id: string;
  memory_type: string;
  key: string;
  value: unknown;
  source: string;
  updated_at: string;
}

export async function getConversationMemory(tripId: string, key: string) {
  const sql = `
    SELECT * FROM conversation_memory
    WHERE trip_id = $1 AND memory_type = 'chat_history' AND key = $2
    LIMIT 1
  `;
  const result = await query<ConversationMemory>(sql, [tripId, key]);
  return result.rows[0];
}

export async function saveConversationMemory(tripId: string, key: string, value: unknown) {
  const existing = await getConversationMemory(tripId, key);
  if (existing) {
    const sql = `
      UPDATE conversation_memory
      SET value = $1, source = 'whatsapp', updated_at = now()
      WHERE id = $2
      RETURNING *
    `;

    const result = await query<ConversationMemory>(sql, [value, existing.id]);
    return result.rows[0];
  }

  const sql = `
    INSERT INTO conversation_memory (trip_id, memory_type, key, value, source, updated_at)
    VALUES ($1, 'chat_history', $2, $3, 'whatsapp', now())
    RETURNING *
  `;
  const result = await query<ConversationMemory>(sql, [tripId, key, value]);
  return result.rows[0];
}

export async function appendConversationHistory(tripId: string, key: string, message: { role: 'user' | 'assistant'; text: string }) {
  const existing = await getConversationMemory(tripId, key);
  const history = Array.isArray(existing?.value) ? existing.value as Array<{ role: string; text: string }> : [];
  const nextHistory = [...history, message].slice(-12);
  await saveConversationMemory(tripId, key, nextHistory);
  return nextHistory;
}

export async function getConversationHistory(tripId: string, key: string) {
  const existing = await getConversationMemory(tripId, key);
  return Array.isArray(existing?.value) ? existing.value as Array<{ role: string; text: string }> : [];
}
