import fs from 'fs';
import path from 'path';
import { query } from './dbClient';

export async function runMigration(fileName: string) {
  const filePath = path.join(__dirname, '..', 'schema', fileName);
  const sql = fs.readFileSync(filePath, 'utf8');
  await query(sql);
  return fileName;
}

export async function runAllMigrations() {
  const schemaDir = path.join(__dirname, '..', 'schema');
  const files = fs.readdirSync(schemaDir).filter((name) => name.endsWith('.sql')).sort();
  for (const file of files) {
    await runMigration(file);
  }
  return files;
}
