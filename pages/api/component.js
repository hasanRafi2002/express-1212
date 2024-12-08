import { connectToDatabase } from '../../lib/mongo';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const collection = db.collection('component');

  try {
    if (req.method === 'GET') {
      const componentData = await collection.find().toArray();
      res.status(200).json(componentData);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error retrieving component data', error: error.message });
  }
}
