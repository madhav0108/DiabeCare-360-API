const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;  // Use environment variable
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

module.exports = connect;
