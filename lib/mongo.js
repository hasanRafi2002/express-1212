import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI);

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  await client.connect();
  const db = client.db('myDatabase'); // Your MongoDB database name
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
