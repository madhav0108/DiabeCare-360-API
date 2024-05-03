const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI; // Ensure this is correctly set in your environment

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

module.exports = mongoose;
