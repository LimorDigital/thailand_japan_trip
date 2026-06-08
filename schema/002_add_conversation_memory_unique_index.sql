-- Add unique constraint for conversation memory upsert support

ALTER TABLE conversation_memory
ADD CONSTRAINT conversation_memory_unique_trip_type_key
UNIQUE (trip_id, memory_type, key);
