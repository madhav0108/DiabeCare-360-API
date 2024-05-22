// models/Glucose.js
const mongoose = require('mongoose');
const { Schema } = mongoose; // Import Schema

const glucoseSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User model
    level: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Glucose = mongoose.model('Glucose', glucoseSchema, 'glucose'); // Explicitly set collection name
module.exports = Glucose;
