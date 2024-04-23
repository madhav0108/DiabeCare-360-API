const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://msharm51:Madhav94Aishwa8010@diabecare360.ivi7fpk.mongodb.net/";  // Your MongoDB Atlas connection string
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
