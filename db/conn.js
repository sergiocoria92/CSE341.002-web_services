// db/conn.js — ES Modules
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Missing environment variable MONGODB_URI');
}

const client = new MongoClient(uri);
let _db;

/**
 * Connect once and keep the DB reference.
 * If your connection string does not include a DB name,
 * set MONGODB_DB in your .env (optional).
 */
export function connectToServer(cb) {
  (async () => {
    try {
      if (!_db) {
        await client.connect();
        const dbName = process.env.MONGODB_DB; // optional override
        _db = dbName ? client.db(dbName) : client.db();
      }
      console.log('✅ Connected to MongoDB');
      cb && cb();
    } catch (err) {
      console.error('❌ Mongo connection error:', err);
      cb ? cb(err) : null;
    }
  })();
}

/** Get the initialized DB instance. */
export function getDb() {
  if (!_db) {
    throw new Error('DB not initialized. Call connectToServer() first.');
  }
  return _db;
}

/** (Optional) Close the client when shutting down the app. */
export async function closeClient() {
  if (client) {
    await client.close();
    _db = undefined;
  }
}
