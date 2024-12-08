import { connectToDatabase } from '../../lib/mongo';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const collection = db.collection('users-2');

  try {
    if (req.method === 'GET') {
      const users = await collection.find().toArray();
      res.status(200).json(users);
    } else if (req.method === 'POST') {
      const newUser = req.body;
      const result = await collection.insertOne(newUser);
      res.status(201).json({ message: 'User successfully added', id: result.insertedId });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
}
