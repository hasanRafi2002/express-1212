const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI);

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await client.connect();
    const db = client.db('myDatabase');
    const components = await db.collection('component').find().toArray();
    res.status(200).json(components);
  } catch (error) {
    console.error('Error fetching components:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
