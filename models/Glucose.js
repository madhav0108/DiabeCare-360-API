// models/Glucose.js
const mongoose = require('mongoose');

const glucoseSchema = new mongoose.Schema({
    id: { type: String, required: true },  // Using String to store UUID
    level: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Glucose', glucoseSchema);
