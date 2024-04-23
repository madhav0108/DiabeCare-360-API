const express = require('express');
const connect = require('./db');  // Import your database connection
const app = express();

connect().then(client => {
  const collection = client.db("test").collection("devices");

  app.get('/', async (req, res) => {
    const documents = await collection.find({}).toArray();
    res.send(documents);
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
