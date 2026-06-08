import { runAllMigrations } from '../services/dbMigration';

async function main() {
  try {
    const files = await runAllMigrations();
    console.log('Ran migrations:', files);
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

main();
