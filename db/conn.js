// db/conn.js
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

// .env
const client = new MongoClient(uri);

let dbConnection;

module.exports = {
  //  server.js
  connectToServer: async (callback) => {
    try {
      await client.connect();
      
      dbConnection = client.db('cse341');
      console.log('✅ Connected to MongoDB');
      return callback();
    } catch (err) {
      console.error('❌ Mongo connection error:', err);
      return callback(err);
    }
  },

  // conexion
  getDb: () => dbConnection,
};
