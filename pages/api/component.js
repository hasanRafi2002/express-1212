// pages/api/component.js
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  const db = client.db('myDatabase');
  const componentCollection = db.collection('component');

  if (req.method === 'GET') {
    try {
      const componentData = await componentCollection.find().toArray();
      res.status(200).json(componentData);
    } catch (error) {
      console.error('Error retrieving component data:', error);
      res.status(500).json({ message: 'Error retrieving component data' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
