import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;

export default async function handler(req, res) {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('myDatabase'); // Replace with your actual database name
  const collection = db.collection('users-2'); // Replace with your actual collection name

  if (req.method === 'GET') {
    try {
      const users = await collection.find().toArray();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving users' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }

  await client.close();
}
