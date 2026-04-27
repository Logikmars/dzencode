import { Pool, type QueryResultRow } from 'pg';

declare global {
  var postgresPool: Pool | undefined;
}

const connectionString = normalizeConnectionString(process.env.DATABASE_URL);

function normalizeConnectionString(rawConnectionString?: string) {
  if (!rawConnectionString) {
    return null;
  }

  const url = new URL(rawConnectionString);

  if (url.hostname === 'localhost') {
    url.hostname = '127.0.0.1';
  }

  return url.toString();
}

const pool =
  connectionString ?
    global.postgresPool ??
    new Pool({
      connectionString,
      connectionTimeoutMillis: 1500,
      ssl: process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    })
  : null;

if (pool && process.env.NODE_ENV !== 'production') {
  global.postgresPool = pool;
}

export function hasDatabaseConnection() {
  return Boolean(pool);
}

export async function query<T extends QueryResultRow>(text: string, params: unknown[] = []) {
  if (!pool) {
    throw new Error('DATABASE_URL is not configured.');
  }

  return pool.query<T>(text, params);
}
