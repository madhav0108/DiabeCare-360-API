// models/Dietary.js
const mongoose = require('mongoose');

const dietarySchema = new mongoose.Schema({
    id: { type: String, required: true },  // Using String to store UUID
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    carbs: { type: Number, required: true },
    protein: { type: Number, required: true },
    fat: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dietary', dietarySchema);
