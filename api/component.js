import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;

export default async function handler(req, res) {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('myDatabase');
  const collection = db.collection('component');

  if (req.method === 'GET') {
    try {
      const components = await collection.find().toArray();
      res.status(200).json(components);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving component data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }

  await client.close();
}
