import { Pool, QueryResultRow } from 'pg';
import config from '../config';

const pool = new Pool({
  connectionString: config.db.connectionString,
  ssl: config.db.connectionString ? { rejectUnauthorized: false } : false
});

export async function query<T extends QueryResultRow>(text: string, params?: unknown[]) {
  return pool.query<T>(text, params);
}

export default pool;
