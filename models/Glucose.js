// models/Glucose.js
const mongoose = require('mongoose');

const glucoseSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User model
    level: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Glucose', glucoseSchema, 'glucose');
