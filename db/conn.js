// db/conn.js
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

// crea el cliente con la URI del .env
const client = new MongoClient(uri);

let dbConnection;

module.exports = {
  // esta es la función que usa server.js
  connectToServer: async (callback) => {
    try {
      await client.connect();
      // 👇 este nombre debe ser igual al de tu URL (/cse341)
      dbConnection = client.db('cse341');
      console.log('✅ Connected to MongoDB');
      return callback();
    } catch (err) {
      console.error('❌ Mongo connection error:', err);
      return callback(err);
    }
  },

  // para usar la conexión en las rutas
  getDb: () => dbConnection,
};
