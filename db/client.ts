import { DB_NAME } from '@/constants/db';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite/next';

const tasksDB = openDatabaseSync(DB_NAME, { enableChangeListener: true });

export const db = drizzle(tasksDB);
